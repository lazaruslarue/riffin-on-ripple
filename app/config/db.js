var neo4j    = require('node-neo4j');

var neo4jurl = process.env.GRAPHENDB_URL || 'http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789'; //TODO: use localhost:7474 in case of localhost

module.exports = {

  db:           new neo4j( neo4jurl ),
  graphURL:     neo4jurl

};
