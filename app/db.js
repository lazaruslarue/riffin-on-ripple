var neo4j = require('node-neo4j');

graphURL = process.env.GRAPHENDB_URL || 'GRAPHENEDB_URL=http://test:MhThACRdV1pnNGX9ZFl3@test.sb02.stations.graphenedb.com:24789';

module.exports = {

  db: new neo4j( graphURL ),

};