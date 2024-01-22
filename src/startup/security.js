const cors = require('cors');

function securitySetup(app, express) {
  app
    .use(cors())
    .use(express.json());
}

module.exports = securitySetup;
