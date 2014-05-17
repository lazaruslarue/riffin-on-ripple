# currency trade pathfinding

1. this is deployable on heroku
2. sdfsdf

### Create a graph of relationships

    MERGE (sender:SEND)-[:HAS {amt: 10}]->(bitcoin:CURRENCY {type: 'BTC'})
    MERGE (bitcoin)<-[:BID {price: 415, amt: 15}]-(A:MAKER)-[:ASK]->(dollar:CURRENCY {type: 'USD'})
    MERGE (bitcoin)<-[:BID {price: 326.77, amt: 15}]-(B:MAKER)-[:ASK]->(euro:CURRENCY {type: 'EUR'})
    MERGE (dollar)<-[:BID {price: 1.371, amt: 15}]-(C:MAKER)-[:ASK]->(euro)
    MERGE (dollar)<-[:BID {price: 0.01, amt: 15}]-(D:MAKER)-[:ASK]->(yen:CURRENCY {type: 'YEN'})
    MERGE (euro)<-[:BID {price: 0.007}]-(E:MAKER)-[:ASK]->(yen)
    MERGE (reciever:RCVR)-[:ACCEPTS]->(yen)


### find a path

[query-match](http://docs.neo4j.org/chunked/2.0.3/query-match.html)


MATCH p=shortestPath((n1:SEND)-[*..6]-(n2:RCVR)) return p;

http://docs.neo4j.org/chunked/stable/rest-api-graph-algos.html#rest-api-execute-a-dijkstra-algorithm-with-weights-on-relationships

MATCH (dol:CURRENCY { type:"USD" }),(btc:CURRENCY { type:"BTC" }),
  p = allShortestPaths((dol)-[*]-(btc))
RETURN p



### find the cost of a path


### verify path has enough money to fully execute the transaction

ls
