# currency trade pathfinding

1. this is deployable on heroku
2. sdfsdf

### Create a graph of relationships

match (o)<-[r1:BID_WITH]-(order)-[r2:WTB]->(o) RETURN r1, r2, order
match (o)<-[r1:ASK_FOR]-(order)-[r2:WTS]->(o) RETURN r1, r2, order

currency nodes: --> 450 USD  451 JPY 452 EUR 453 BTC

small sample:
MERGE (eur)<-[:BID_WITH]-(:ORDER:BID {total: 0.05091, size: 0.05091, bid_price: 252.22000, bid_with: "EUR", buy: "BTC"})-[:WTB]->(btc)
MERGE (eur)<-[:BID_WITH]-(:ORDER:BID {total: 0.05124, size: 0.00032, bid_price: 200.15000, bid_with: "EUR", buy: "BTC"})-[:WTB]->(btc)
MERGE (eur)<-[:BID_WITH]-(:ORDER:BID {total: 0.09747, size: 0.04623, bid_price: 181.00000, bid_with: "EUR", buy: "BTC"})-[:WTB]->(btc)
MERGE (eur)<-[:BID_WITH]-(:ORDER:BID {total: 0.11674, size: 0.01926, bid_price: 180.00000, bid_with: "EUR", buy: "BTC"})-[:WTB]->(btc)

MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.02642, size: 102.56450, total: 102.56450, ask_for: "USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03196, size: 66.93537, total:  169.49980, ask_for: "USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03196, size: 113.20850, total: 282.70840, ask_for: "USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03229, size: 77.40000, total:  360.10840, ask_for: "USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03312, size: 94.10223, total:  454.21060, ask_for: "USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03395, size: 103.27250, total: 557.48320, ask_for: "USD", sell: "JPY"})-[:WTS]->(jpy)

MERGE (request)-[:ACCEPTS]->(jpy)

### use API to find nodes

curl -X POST -H "Content-Type: application/json" -d '{ "query" : "MATCH p=shortestPath((x:CURRENCY {type: {origin}})--(y:CURRENCY {type: {target}})) RETURN p","params" : { "origin" : "BTC",    "target" : "USD" }}' http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/cypher


### find a path

[query-match](http://docs.neo4j.org/chunked/2.0.3/query-match.html)

****
  MATCH path=(c:CURRENCY {name: "JPY"})<-[:WTB]-(os:ORDER)-[*]-(of:ORDER)-[:WTS]->(c2:CURRENCY {name: "EUR"} ) return path LIMIT 10
****
match path=shortestPath((c:CURRENCY {name: "JPY"})<-[:WTB]-(os:ORDER)-[*]-(of:ORDER)-[:WTS]->(c2:CURRENCY {name: "EUR"}) ) return path LIMIT 10
"Requires a pattern containing a single relationship"


### Lets add properties to our WTB, WTS, BID_WITH, ASK_FOR relations that allow us to keep track of our costs.

** When we find routes, we will optimize for small ask_price when sending && optimize for small bid_price when requesting **

MATCH (a:CURRENCY)<-[af:ASK_FOR]-(ask:ASK)-[sr:WTS]-(s:CURRENCY)
WITH sr AS sell, ask, af
SET sell.ask_price=ask.ask_price, af.ask_price=0, af.sellrate=0
return ask, sell, af


MATCH (w:CURRENCY)<-[bw:BID_WITH]-(bid:BID)-[br:WTB]-(b:CURRENCY)
WITH br AS buy, bw, bid
SET bw.bidrate=0, bw.bid_price=0, buy.bidrate=1/bid.bid_price, buy.bid_price=bid.bid_price
return buy, bid


### Now, let's API:

http://docs.neo4j.org/chunked/stable/rest-api-graph-algos.html#rest-api-execute-a-dijkstra-algorithm-with-weights-on-relationships

We did this with the simple model:
  MATCH p=shortestPath((n1:SEND)-[*..6]-(n2:RCVR)) return p;


  MATCH (dol:CURRENCY { type:"USD" }),(btc:CURRENCY { type:"BTC" }),
    p = allShortestPaths((dol)-[*]-(btc))
  RETURN p




node 450 USD  451 JPY 452 EUR 453 BTC


#### REQUEST EUR from DOL (one type of directions... )

curl -X POST -H "Content-Type: application/json" -d '{  "to" : "http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/451",  "cost_property" : "bid_price",  "relationships" : [    {      "type" : "WTB",      "direction" : "in"    }, {      "type" : "BID_WITH",      "direction" : "all"    }  ],  "algorithm" : "dijkstra"}' http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/453/path
DATA
{
  "to" : "http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/451",
  "cost_property" : "bid_price",
  "relationships" : [
    {
      "type" : "WTB",
      "direction" : "all"
    }, {
      "type" : "BID_WITH",
      "direction" : "all"
    }
  ],
  "algorithm" : "dijkstra"
}
RESPONSE
{
  "weight" : 181.20951,
  "start" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/453",
  "nodes" : [
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/453",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/612",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/452",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/470",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/450",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/459",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/451"
  ],
  "length" : 6,
  "relationships" : [
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/934",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/935",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/651",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/650",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/628",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/629"
  ],
  "end" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/451"
}


#### SEND DOL to EUR

curl -X POST -H "Content-Type: application/json" -d '{  "to" : "http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/451",  "cost_property" : "ask_price",  "relationships" : [    {      "type" : "WTS",      "direction" : "all"    }, {      "type" : "ASK_FOR",      "direction" : "all"    }  ],  "algorithm" : "dijkstra"}' http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/453/path

{
  "to" : "http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/451",
  "cost_property" : "ask_price",
  "relationships" : [
    {
      "type" : "WTS",
      "direction" : "all"
    }, {
      "type" : "ASK_FOR",
      "direction" : "all"
    }
  ],
  "algorithm" : "dijkstra"
}
RESPONSE
{
  "weight" : 340.27642,
  "start" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/453",
  "nodes" : [
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/453",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/613",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/452",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/544",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/450",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/491",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/451"
  ],
  "length" : 6,
  "relationships" : [
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/936",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/937",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/799",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/798",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/692",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/693"
  ],
  "end" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/451"
}



### find the cost of a path


### verify path has enough money to fully execute the transaction













Find a path:
- find a path from the sender to the requester

Get the cost of that path:
- what currencies are touched on that path (or rather, what :maker_orders)
- find the ASK:BID ratios for those currencies



=== find a short path
curl -X POST -H "Content-Type: application/json" -d '{ "query" : "MATCH p=shortestPath((x:CURRENCY {type: {origin}})--(y:CURRENCY {type: {target}})) RETURN p ","params" : { "origin" : "BTC",    "target" : "USD" }}' http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/cypher

{
  "columns" : [ "p" ],
  "data" : [ [ {
    "start" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/34",
    "nodes" : [ "http://test.sb02.stations.graphenedb.com:24789/db/data/node/34", "http://test.sb02.stations.graphenedb.com:24789/db/data/node/37", "http://test.sb02.stations.graphenedb.com:24789/db/data/node/36" ],
    "length" : 2,
    "relationships" : [ "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/39", "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/40" ],
    "end" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/36"
  } ] ]
}

=== find a path & its weight
curl -X POST -H "Content-Type: application/json" -d '{  "to" : "http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/44",  "cost_property" : "price",  "relationships" : [{    "type" : "ASK",    "direction" : "all"  }, {    "type" : "BID",    "direction" : "all"  } ],  "algorithm" : "dijkstra"}' http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/34/path

{
  "weight" : 326.777,
  "start" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/34",
  "nodes" : [
   "http://test.sb02.stations.graphenedb.com:24789/db/data/node/34",
   "http://test.sb02.stations.graphenedb.com:24789/db/data/node/38",
   "http://test.sb02.stations.graphenedb.com:24789/db/data/node/39",
   "http://test.sb02.stations.graphenedb.com:24789/db/data/node/46",
   "http://test.sb02.stations.graphenedb.com:24789/db/data/node/44" ],
  "length" : 4,
  "relationships" : [
   "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/41",
   "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/42",
   "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/53",
   "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/54" ],
  "end" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/44"
}


node 450 USD  451 JPY 452 EUR 453 BTC

curl -X POST -H "Content-Type: application/json" -d '{{{ your data here}}}' http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/34/path

{
  "to" : "http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/44",
  "cost_property" : "price",
  "relationships" : [
    {
      "type" : "WTB",
      "direction" : "IN"
    }, {
      "type" : "BID_WITH",
      "direction" : "OUT"
    }
  ],
  "algorithm" : "dijkstra"
}






=== goes from BTC to USD, but transits by using Ask & Bid relations to leave the current node.
curl -X POST -H "Content-Type: application/json" -d '{  "to" : "http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/36",  "cost_property" : "price",  "relationships" : [{    "type" : "ASK",    "direction" : "all"  }, {    "type" : "BID",    "direction" : "all"  } ],  "algorithm" : "dijkstra"}' http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/34/path

{
  "weight" : 326.787,
  "start" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/34",
  "nodes" : [
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/34",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/38",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/39",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/46",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/44",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/43",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/36"
  ],
  "length" : 6,
  "relationships" : [
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/41",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/42",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/53",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/54",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/50",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/49"
  ],
  "end" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/36"
}


nodes:
38
39
46
44
43
36

rels:
41
42
53
54
50
49




====

START n=node(34), m=node(36)
MATCH p=shortestPath(n-[:ASK*..1000]->m)
RETURN p,length(p);



=== the big problem here is using the ASK / BID direction to limit the path options
<!--
MATCH (a:SEND)<-[:ACCEPTS]-(b:CURRENCY)<-[a:ASK]-[r*]-(n:RCVR), p=(b)-[:BID*1]-(m)-[:ASK]->(c:CURRENCY)
WHERE a.idStr IN ['1a','b2','something']
WITH COLLECT(DISTINCT b) AS GroupGs, FILTER(x IN NODES(p) WHERE NOT x:G) AS cs,COLLECT(c) AS gs
WHERE ALL(x IN gs WHERE x IN GroupGs)
RETURN cs -->


<!-- MATCH p=(n:CURRENCY)<-[bid:BID]-(order:MAKER_ORDER)-[ask:ASK]->(m:CURRENCY),(b:CURRENCY {type: "YEN"}), (c:CURRENCY {type: "USD"}), bunch=allShortestPaths(c<-[:ASK]-()-[*]-()-[:BID]->b)
WHERE (sender)<-[:HAS]-(b), (c)<-[a:ACCEPTS]-(getter:RCVR)
WITH COLLECT(DISTINCT order) AS orders, FILTER(x IN NODES(p) WHERE NOT x:G) AS cs,COLLECT(c) AS gs
WHERE ALL(x IN gs WHERE x IN GroupGs)
RETURN cs

MATCH p=(n:CURRENCY)<-[bid:BID]-(order:MAKER_ORDER)-[ask:ASK]->(m:CURRENCY),(b:CURRENCY {type: "YEN"}), (c:CURRENCY {type: "USD"})

RETURN p, n, bid, order, ask, m, b, c
 -->
=====================



To start things off, I'm using a Node server to hit the [REST API][1], is it possible to access the Java [CostEvaluator Interface][2] using Cypher or the REST API? I'm unwilling to write this in Java (honesty, lol).

I've reviewed the docs pretty extensively, and I can't even find a place where cypher's ````allShortestPaths```` is documented. It'd be wonderful to know what arguments that could take, so if you know where i can read about those, please let me know in comments.

Moving on:

The graph is formed of patterns such as this: ````sub_path = (start:STEPNODE)<-[cost:COST_REL {cost}]-(axis_node:AXISNODE)-[:TRANSIT_TO]->(end:STEPNODE)````. There are only 14 ````(:STEPNODE)````, which helps constrain things a bit... but there may be many thousands of ````(:AXISNODE)````s. Each ````(:AXISNODE)```` has a unique relationship with any ````(:STEPNODE)```` pair.

````sub_path```` is a repeating pattern, in pseudo:````(node1:STEPNODE)-{sub_path_1_to_2 {cost}}-(node2:STEPNODE)-{sub_path_2_to_3 {cost}}-(node3:STEPNODE)-{sub_path_3_to_4 {cost}}-(node4:STEPNODE)````, but ````(node1:STEPNODE)-{sub_path_1_to_4 {cost}}-(node4:STEPNODE)```` may also exist.

Each sub path has an important ````{cost}```` which is measured on the ````[COST_REL]```` relationship. I'd like to find the least expensive path from ````(begin:STEPNODE)-[sub_path*1..5]->(end:STEPNODE)```` where the total cost is the sum of all ````{cost}````. I see this as being a matter of finding the sum of ````sub_path.cost````, but I haven't yet found a strategy that supports passing a ````sub_path```` or ````cost```` argument to allShortestPaths() or any similar function with Cypher. On the [Algo Endpoint][3] of the API, there's an argument for ````dijkstra```` with a ````cost_property```` but this endpoint doesn't seem to support passing a ````sub_path```` argument.

I'm find with a sub-optimal solution. But I would really like to avoid making more than a few API calls to find a cheap route through the

  [1]: http://docs.neo4j.org/chunked/stable/rest-api-cypher.html
  [2]: http://api.neo4j.org/1.6.1/org/neo4j/graphalgo/CostEvaluator.html
  [3]: http://docs.neo4j.org/chunked/stable/rest-api-graph-algos.html



============

curl -X POST -H "Content-Type: application/json" -d '{  "to" : "http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/451",  "cost_property" : "bid_price",  "relationships" : [    {      "type" : "WTB",      "direction" : "in"    }, {      "type" : "BID_WITH",      "direction" : "out"    }  ],  "algorithm" : "dijkstra"}' http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789/db/data/node/453/path
{
  "weight" : 210.65259999999998,
  "start" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/453",
  "nodes" : [
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/453",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/531",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/452",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/470",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/450",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/568",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/node/451"
  ],
  "length" : 6,
  "relationships" : [
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/773",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/772",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/651",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/650",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/847",
    "http://test.sb02.stations.graphenedb.com:24789/db/data/relationship/846"
  ],
  "end" : "http://test.sb02.stations.graphenedb.com:24789/db/data/node/451"
}
