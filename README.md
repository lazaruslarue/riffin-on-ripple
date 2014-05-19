# currency trade pathfinding

1. this is deployable on heroku
2. sdfsdf

### Create a graph of relationships


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

{ \
  "to" : "http://localhost:7474/db/data/node/155", \
  "cost_property" : "cost", \
  "relationships" : { \
    "type" : "to", \
    "direction" : "out" \
  }, \
  "algorithm" : "dijkstra" \
}

### find a path

[query-match](http://docs.neo4j.org/chunked/2.0.3/query-match.html)


MATCH p=shortestPath((n1:SEND)-[*..6]-(n2:RCVR)) return p;

http://docs.neo4j.org/chunked/stable/rest-api-graph-algos.html#rest-api-execute-a-dijkstra-algorithm-with-weights-on-relationships

MATCH (dol:CURRENCY { type:"USD" }),(btc:CURRENCY { type:"BTC" }),
  p = allShortestPaths((dol)-[*]-(btc))
RETURN p



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



===
 [ {
    "direction" : "all",
    "type" : "knows"
  }, {
    "direction" : "all",
    "type" : "loves"
  } ]
====

START n=node(34), m=node(36)
MATCH p=shortestPath(n-[:ASK*..1000]->m)
RETURN p,length(p);



====

MATCH (tobias { name: 'Tobias' }),(others)
WHERE others.name IN ['Andres', 'Peter'] AND (tobias)<--(others)
RETURN others


MATCH (n)
WHERE (n)-[:KNOWS]-({ name:'Tobias' })
RETURN n

MATCH (n)-[r]->()
WHERE n.name='Andres' AND type(r)=~ 'K.*'
RETURN r


match (origin:CURRENCY {name:"USD"}), (target:CURRENCY {name:"BTC"}), (origin)<-[ask:ASK]-(a:MAKER_ORDER), (target)<-[bid:BID]-(b:MAKER_ORDER)

return origin, target, ask, a, bid, b




match step=(sell:CURRENCY)<-[bid:BID]-(order:MAKER_ORDER)-[ask:ASK]->(buy:CURRENCY)
WHERE sell.type in ['BTC']

RETURN rels(step)



=== the big problem here is using the ASK / BID direction to limit the path options
<!--
MATCH (a:SEND)<-[:ACCEPTS]-(b:CURRENCY)<-[a:ASK]-[r*]-(n:RCVR), p=(b)-[:BID*1]-(m)-[:ASK]->(c:CURRENCY)
WHERE a.idStr IN ['1a','b2','something']
WITH COLLECT(DISTINCT b) AS GroupGs, FILTER(x IN NODES(p) WHERE NOT x:G) AS cs,COLLECT(c) AS gs
WHERE ALL(x IN gs WHERE x IN GroupGs)
RETURN cs -->


MATCH p=(n:CURRENCY)<-[bid:BID]-(order:MAKER_ORDER)-[ask:ASK]->(m:CURRENCY),(b:CURRENCY {type: "YEN"}), (c:CURRENCY {type: "USD"}), bunch=allShortestPaths(c<-[:ASK]-()-[*]-()-[:BID]->b)
WHERE (sender)<-[:HAS]-(b), (c)<-[a:ACCEPTS]-(getter:RCVR)
WITH COLLECT(DISTINCT order) AS orders, FILTER(x IN NODES(p) WHERE NOT x:G) AS cs,COLLECT(c) AS gs
WHERE ALL(x IN gs WHERE x IN GroupGs)
RETURN cs




MATCH p=(n:CURRENCY)<-[bid:BID]-(order:MAKER_ORDER)-[ask:ASK]->(m:CURRENCY),(b:CURRENCY {type: "YEN"}), (c:CURRENCY {type: "USD"})

RETURN p, n, bid, order, ask, m, b, c

CREATE (usd:CURRENCY {name: "USD"}), (jpy:CURRENCY {name: "JPY"}), (eur:CURRENCY {name: "EUR"}), (btc:CURRENCY {name: "BTC"})

MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy:"JPY", total: 1000.00000, size: 1000.00000, bid_price: 0.01000})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy:"JPY", total: 1100.00000, size: 100.00000,   bid_price: 0.01000})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy:"JPY", total: 1167.59800, size: 67.598920,   bid_price: 0.00978})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy:"JPY", total: 1368.14400, size: 200.54570,   bid_price: 0.00978})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy:"JPY", total: 1577.87000, size: 209.72550,   bid_price: 0.00968})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy:"JPY", total: 1815.30600, size: 237.43610,   bid_price: 0.00961})-[:WTB]->(jpy)

MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 20.00000 ,   size: 20.00000  , bid_price: 1.35203})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 157.05990,   size: 137.05990 , bid_price: 1.35000})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 160.61660,   size: 3.55670 ,   bid_price: 1.33170})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 237.27130,   size: 76.65464  , bid_price: 1.30030})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 238.96540,   size: 1.69413 ,   bid_price: 1.30020})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 248.96540,   size: 10.00000  , bid_price: 1.30010})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 363.87640,   size: 114.91100 , bid_price: 1.30000})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 1093.87600, size: 730.00000 , bid_price: 1.30000})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 1093.97100, size: 0.09522 ,   bid_price: 1.26030})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 1496.56800, size: 402.59700 , bid_price: 1.25000})-[:WTB]->(eur)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID { bid_with:"USD", buy: "EUR", total: 1501.09400, size: 4.52592 ,   bid_price: 1.20000})-[:WTB]->(eur)

MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:0.58307, size: 0.58307, bid_price: 434.41350, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:0.58547, size: 0.00240, bid_price: 425.34850, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:0.59679, size: 0.01132, bid_price: 425.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:1.40351, size: 0.80672, bid_price: 420.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:1.40361, size: 0.00010, bid_price: 420.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:1.65245, size: 0.24883, bid_price: 415.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:1.65519, size: 0.00274, bid_price: 408.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:1.77957, size: 0.12437, bid_price: 402.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:2.06008, size: 0.28050, bid_price: 400.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:4.06008, size: 2.00000, bid_price: 385.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:4.06385, size: 0.00376, bid_price: 378.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:4.23766, size: 0.17380, bid_price: 356.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:4.24284, size: 0.00517, bid_price: 348.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:4.24340, size: 0.00056, bid_price: 320.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:4.24743, size: 0.00403, bid_price: 320.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:4.25453, size: 0.00709, bid_price: 319.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:7.30084, size: 3.04631, bid_price: 303.16000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:7.30086, size: 0.00001, bid_price: 300.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:9.30086, size: 2.00000, bid_price: 300.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)
MERGE (btc)<-[:BID_WITH]-(:ORDER:BID {total:9.30419, size: 0.00333, bid_price: 300.00000, bid_with: "BTC", buy: "USD"})-[:WTB]->(usd)

MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.02642, size: 102.56450, total: 102.56450, ask_for:"USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03196, size: 66.93537, total:  169.49980, ask_for:"USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03196, size: 113.20850, total: 282.70840, ask_for:"USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03229, size: 77.40000, total:  360.10840, ask_for:"USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03312, size: 94.10223, total:  454.21060, ask_for:"USD", sell: "JPY"})-[:WTS]->(jpy)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 0.03395, size: 103.27250, total: 557.48320, ask_for:"USD", sell: "JPY"})-[:WTS]->(jpy)

MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 1.37000, size: 23.98949, total: 23.98949, ask_for: "USD", sell: "EUR" })-[:WTS]->(eur)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 1.38697, size: 19.59471, total: 43.58421, ask_for: "USD", sell: "EUR" })-[:WTS]->(eur)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 1.39999, size: 20.00000, total: 63.58421, ask_for: "USD", sell: "EUR" })-[:WTS]->(eur)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 1.40999, size: 26.99345, total: 90.57766, ask_for: "USD", sell: "EUR" })-[:WTS]->(eur)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 1.60000, size: 6.99400, total:  97.57166, ask_for: "USD", sell: "EUR" })-[:WTS]->(eur)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 1.65000, size: 8.72145, total: 106.29310, ask_for: "USD", sell: "EUR" })-[:WTS]->(eur)

MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 442.67510, size: 0.00235, total: 0.00235, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 445.50270, size: 0.58361, total: 0.58596, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 495.00000, size: 0.34202, total: 0.92799, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 500.00000, size: 0.20000, total: 1.12799, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 500.84000, size: 0.99800, total: 2.12599, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 515.00000, size: 0.19417, total: 2.32016, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 524.30000, size: 0.50000, total: 2.82016, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 530.00000, size: 0.18867, total: 3.00883, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 531.01000, size: 0.49628, total: 3.50512, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 535.00000, size: 0.18691, total: 3.69203, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 545.00000, size: 0.18348, total: 3.87551, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 550.00000, size: 1.00000, total: 4.87551, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 555.00000, size: 0.18018, total: 5.05569, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 565.00000, size: 0.17699, total: 5.23268, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 575.00000, size: 0.17391, total: 5.40659, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 578.00000, size: 0.50000, total: 5.90659, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 593.33000, size: 0.44204, total: 6.34864, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 599.99990, size: 0.00166, total: 6.35030, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 600.00000, size: 1.00000, total: 7.35030, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)
MERGE (usd)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 620.37000, size: 1.00000, total: 8.35030, ask_for:"USD", sell: "BTC"})-[:WTS]->(btc)

MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 338.88000, size: 0.27399, total: 0.27399, ask_for: "EUR" , sell: "BTC"})-[:WTS]->(btc)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 368.88000, size: 0.10000, total: 0.37399, ask_for: "EUR" , sell: "BTC"})-[:WTS]->(btc)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 400.00000, size: 0.01999, total: 0.39399, ask_for: "EUR" , sell: "BTC"})-[:WTS]->(btc)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 500.00000, size: 0.03779, total: 0.43179, ask_for: "EUR" , sell: "BTC"})-[:WTS]->(btc)
MERGE (eur)<-[:ASK_FOR]-(:ORDER:ASK {ask_price: 598.00000, size: 0.50000, total: 0.93179, ask_for: "EUR" , sell: "BTC"})-[:WTS]->(btc)


MERGE (usd)<-[:BID_WITH]-(:ORDER:BID {total: 1000.00000, size: 1000.00000, bid_price: 0.01000, bid_with:"USD", buy:"JPY"})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID {total: 1100.00000, size: 100.00000, bid_price:  0.01000, bid_with:"USD", buy:"JPY"})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID {total: 1167.59800, size: 67.59892, bid_price:   0.00978, bid_with:"USD", buy:"JPY"})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID {total: 1368.14400, size: 200.54570, bid_price:  0.00978, bid_with:"USD", buy:"JPY"})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID {total: 1577.87000, size: 209.72550, bid_price:  0.00968, bid_with:"USD", buy:"JPY"})-[:WTB]->(jpy)
MERGE (usd)<-[:BID_WITH]-(:ORDER:BID {total: 1815.30600, size: 237.43610, bid_price:  0.00961, bid_with:"USD", buy:"JPY"})-[:WTB]->(jpy)





match (o)<-[r1:BID_WITH]-(order)-[r2:WTB]->(o) delete r1, r2, order







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
