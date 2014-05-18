var neo4j = require('node-neo4j');

var dburl = process.env.GRAPHENDB_URL || 'http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789'; //TODO: use localhost:7474 in case

module.exports = {

  db:           new neo4j( dburl ),
  graphURL:     dburl

};
