module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'never'],
        'space-before-function-paren': ['error', 'never'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'multiline-ternary': ['error', 'never'],
        'no-void': ['error', { allowAsStatement: true }]
    }
}
