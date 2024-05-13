# eslint-plugin-chai-expect-keywords

ESLint plugin that checks for unsupported keywords in chai.js `expect()`
assertions. Chai allows you to chain words to make readable assertions,
but unfortunately you can include keywords that chai knows nothing about,
and it will not fail the test. This eslint plugin helps you catch any
such unsupported chains.

# Installation

```
npm install eslint-plugin-chai-expect-keywords
```

# Requirements

For version 2.x:

- Node.js 6 or above
- ESLint 4.x - 8.x

For version 3.x:

- Node.js 18 or above
- ESLint 9.x or above

# Rules

- `no-unsupported-keywords` - Prevent using unsupported keywords in the
  `expect()` chains

# Options

- `allowKeywords` adds an array of additional keywords to the allowed list
- `allowSinonChai` includes [sinon-chai](http://chaijs.com/plugins/sinon-chai/)
  keywords in the allowed list
- `allowChaiAsPromised` includes [chai-as-promised](https://github.com/domenic/chai-as-promised)
  keywords in the allowed list. (You may also find [eslint-plugin-chai-as-promised](https://github.com/fintechstudios/eslint-plugin-chai-as-promised) of interest in ensuring
  that `return` statements (or its `notify` method) are present as expected
  by `chai-as-promised`.)
- `allowChaiDOM` includes [chai-dom](https://github.com/nathanboktae/chai-dom)
  keywords in the allowed list
- `allowChaiExclude` includes [chai-exclude](https://github.com/mesaugat/chai-exclude)
  keywords in the allowed list

# Configuration

Import the plugin into your `eslint.config.js` file:

```js
import chaiExpectKeywords from 'eslint-plugin-chai-expect-keywords';
```

Add a `plugins` section and specify `chai-expect-keywords` as a plugin:

```js
  "plugins": {
      "chai-expect-keywords": chaiExpectKeywords
  },
```

Enable the rule:

```js
  "rules": {
    "chai-expect-keywords/no-unsupported-keywords": "error"
  }
```

Or with options:

```js
  "rules": {
    "chai-expect-keywords/no-unsupported-keywords": [ "error", {
      "allowKeywords": ["length"],
      "allowSinonChai": true,
      "allowChaiAsPromised": true,
      "allowChaiDOM": true,
      "allowChaiExclude": true
    } ]
  }
```

If you want the rule enabled with all its boolean options set to true, you can
avoid the steps of adding to `plugins` and `rules` and just include the all config in:

```js
import js from '@eslint/js';
import chaiExpectKeywords from 'eslint-plugin-chai-expect-keywords';

export default [
    js.configs.recommended,
    chaiExpectKeywords.configs.all,

```

Or if you want the rule only with no booleans set, use the "recommended" config:

```js
export default [
    chaiExpectKeywords.configs.recommended,
```

# License

`eslint-plugin-chai-expect-keywords` is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
