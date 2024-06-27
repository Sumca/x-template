import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import tsParser from '@typescript-eslint/parser';


export default [
  {
    languageOptions: {
      // 使用 TypeScript 解析器
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest', // ECMAScript 最新版本
        sourceType: 'module', // ECMAScript 模块
      },
      globals: globals.browser 
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    ignores: ["mock/**"]
  },
  {
    rules: {
      // "@typescript-eslint/no-var-requires": "off"
    },
    extends: [
      'eslint:recommended', // 使用 ESLint 推荐规则
      'plugin:@typescript-eslint/recommended', // 使用 @typescript-eslint 推荐规则
      'plugin:vue/vue3-recommended', // 使用 Vue 3 推荐规则
    ],
  },
];