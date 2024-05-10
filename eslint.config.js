const globals = require ('globals');
const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        'ignores': [
            '**/node_modules/*'
        ],
        'languageOptions': {
            ecmaVersion: 2022,
            globals: {
                ...globals.builtin,
                ...globals.node,
            },
        },
        'rules': {}
    }
];
