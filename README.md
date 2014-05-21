# This is an experiment with Neo4j's pathfinding capabilities.

I use a weighted Dijkstra's algorithm to find a transaction path in a field of currency trades. This implementation returns results (!!!), but after presenting what I thought was a solution, I have learned that they are not meaningful. I did my best to learn gracefully about how meaningless these results were, but alas... they're still meaningless. I'm still glad to have had the opportunity to dig deep into the Neo4j REST API and put together a reusable Angular + Node + Express + Neo4j stack for future projects.

It appears that the Neo4j REST API doesn't have the necessary features to provide the best path answer. That's not to say the answer can't be found, however. If I take this process any further I see two possible solutions that don't involve writing a Java extension to Neo4j (which is a fine solution as well). I would like to evaluate:

    1. Whether it's possible to use the [Traversal API](http://docs.neo4j.org/chunked/2.0.3/rest-api-traverse.html) and pass a javaScript filter to the PathExpander class. I've spent some time researching, but don't yet see a way to retain access to all the previous currency conversions in order to find the most ideal path. Still, writing a comprehensive pruning solution, seems like a bugger... though you could maybe optimize by eliminating any branch which reaches a currency node that has been found by another path which returns a better solution.
    2. last, if there's no solution that includes writing a clever filter, I would just return bid_price weights from the orders found with allSimplePaths() and use the Node.js server to calculate the cost of the paths.


## How to use it:

Launch it on Heroku, with a GrapheneDB instance. If you have some cash, spin up a real instance of the DB and use the CREATEGRAPH query. Alternatively, save some cash and start with a tiny model!

If you find you're unable to keep the DB running with a big set of data, then clear your db with
````
MATCH (n)-[r]-() DELETE r, n
````

And, you can start like this:

````
CREATE (Alpha:CURRENCY {name: "Alpha"}), (Beta:CURRENCY {name: "Beta"}), (Gamma:CURRENCY {name: "Gamma"}), (Delta:CURRENCY {name: "Delta"})

MERGE (Alpha)<-[ab:BID_WITH {bid_price: 10, bidrate: .10 }]-(:ORDER:BID {total: 0.05091, size: 0.05091, bid_price: 10, bid_with: "Alpha", buy: "Beta"})-[:WTB {bidrate: 0}]->(Beta)
MERGE (Alpha)<-[ad:BID_WITH {bid_price: 10, bidrate: .10 }]-(:ORDER:BID {total: 0.05124, size: 0.00032, bid_price: 10, bid_with: "Alpha", buy: "Delta"})-[:WTB {bidrate: 0}]->(Delta)
MERGE (Alpha)<-[ag:BID_WITH {bid_price: 51000, bidrate: 0.00002 }]-(:ORDER:BID {total: 0.09747, size: 0.04623, bid_price: 51000, bid_with: "Alpha", buy: "Gamma"})-[:WTB {bidrate: 0}]->(Gamma)
MERGE (Beta)<-[bg:BID_WITH {bid_price: 100, bidrate: .0100}]-(:ORDER:BID {total: 0.11674, size: 0.01926, bid_price: 100, bid_with: "Beta", buy: "Gamma"})-[:WTB {bidrate: 0}]->(Gamma)
MERGE (Delta)<-[dg:BID_WITH {bid_price: 1000, bidrate: .001000 }]-(:ORDER:BID {total: 0.11674, size: 0.01926, bid_price: 1000, bid_with: "Delta", buy: "Gamma"})-[:WTB {bidrate: 0}]->(Gamma)

MERGE (Alpha)<-[:ASK_FOR {ask_price: 10, bidrate: .10 }]-(:ORDER:ASK {total: 0.05091, size: 0.05091, ask_price: 10, ask_for: "Alpha", sell: "Beta"})-[:WTS {sellrate: 0}]->(Beta)
MERGE (Alpha)<-[:ASK_FOR {ask_price: 10, bidrate: .10 }]-(:ORDER:ASK {total: 0.05124, size: 0.00032, ask_price: 10, ask_for: "Alpha", sell: "Delta"})-[:WTS {sellrate: 0}]->(Delta)
MERGE (Alpha)<-[:ASK_FOR {ask_price: 51000, bidrate: 0.00002 }]-(:ORDER:ASK {total: 0.09747, size: 0.04623, ask_price: 51000, ask_for: "Alpha", sell: "Gamma"})-[:WTS {sellrate: 0}]->(Gamma)
MERGE (Beta)<-[:ASK_FOR {ask_price: 100, bidrate: .0100}]-(:ORDER:ASK {total: 0.11674, size: 0.01926, ask_price: 100, ask_for: "Beta", sell: "Gamma"})-[:WTS {sellrate: 0}]->(Gamma)
MERGE (Delta)<-[:ASK_FOR {ask_price: 1000, bidrate: .001000 }]-(:ORDER:ASK {total: 0.11674, size: 0.01926, ask_price: 1000, ask_for: "Delta", sell: "Gamma"})-[:WTS {sellrate: 0}]->(Gamma)
````

In the end, I used a graph just like the one above to disprove the algo's implementation.

