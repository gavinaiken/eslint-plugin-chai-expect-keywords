'use strict';

const plugin = {
  meta: {
    name: "eslint-plugin-chai-expect-keywords",
    version: "3.0.0"
  },
  rules: {
    'no-unsupported-keywords': require('./lib/rules/no-unsupported-keywords')
  },
  configs: {},
  processors: {}
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: {
    name: 'chai-expect-keywords/recommended',
    plugins: {
      'chai-expect-keywords': plugin
    },
    rules: {
      'chai-expect-keywords/no-unsupported-keywords': [
        'error'
      ]
    }
  },
  all: {
    name: 'chai-expect-keywords/all',
    plugins: {
      'chai-expect-keywords': plugin
    },
    rules: {
      'chai-expect-keywords/no-unsupported-keywords': [
        'error', {
          allowSinonChai: true,
          allowChaiAsPromised: true,
          allowChaiDOM: true,
          allowChaiExclude: true
        }
      ]
    }
  }
});

module.exports = plugin;
