# eslint-plugin-chai-expect-keywords

ESLint plugin that checks for unsupported keywords in chai.js expect() assertions. Cahi allows you to chain words to make readable assertions, but unfortunately you can include keywords that chai knows nothing about and it will not fail the test. This eslint plugin helps you catch any such unsupported chains.

# Installation

```
npm install eslint-plugin-chai-expect-keywords
```

# Rules

- `no-unsupported-keywords` - Prevent using unsupported keywords in the `expect()` chains

# Options

- `allowKeywords` adds an array of additional keywords to the allowed list
- `allowSinonChai` includes [sinon-chai](http://chaijs.com/plugins/sinon-chai/) keywords in the allowed list
- `allowChaiAsPromised` includes [chai-as-promised](https://github.com/domenic/chai-as-promised) keywords in the allowed list

# Configuration

Add a `plugins` section and specify `chai-expect-keywords` as a plugin:

```json
{
  "plugins": [
    "chai-expect-keywords"
  ]
}
```

Enable the rule:

```json
{
  "rules": {
    "chai-expect-keywords/no-unsupported-keywords": "error"
  }
}
```

Or with options:

```json
{
  "rules": {
    "chai-expect-keywords/no-unsupported-keywords": [ "error", { "allowKeywords": ["length"], "allowSinonChai": true, "allowChaiAsPromised": true } ]
  }
}
```

# License

eslint-plugin-chai-expect-keywords is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
