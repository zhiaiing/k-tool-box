module.exports = {
    extends: [
        "stylelint-config-recommended",
        "stylelint-config-recess-order",
        "stylelint-config-standard",
    ],
    "overrides": [
        {
            "files": "src/**/*.less",
            "customSyntax": "postcss-less"
        }
    ],
    rules: {
        // 在这里可以自定义的规则，覆盖默认的规则
    },
};
