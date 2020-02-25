'use strict';

module.exports = {
  configs: {
    recommended: {
      plugins: ['chai-expect-keywords'],
      rules: {
        'chai-expect-keywords/no-unsupported-keywords': [
          'error', {
            allowSinonChai: true,
            allowChaiAsPromised: true,
            allowChaiDOM: true
          }
        ]
      }
    }
  },
  rules: {
    'no-unsupported-keywords': require('./lib/rules/no-unsupported-keywords')
  }
};
