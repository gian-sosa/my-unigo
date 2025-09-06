import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";

export default [
  { ignores: ["dist", "*.config.js", "tailwind.config.js", "vite.config.js"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // REGLAS DE SEGURIDAD ESPECÍFICAS
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      "no-console": "warn", // Advertir sobre console.log en lugar de usar logger
      "no-debugger": "error",
      "no-alert": "warn",
      "no-unreachable": "error",

      // Validaciones de variables y objetos
      "no-undef": "error",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-global-assign": "error",
      "no-implicit-globals": "error",

      // Seguridad en JSX
      "react/no-danger": "error", // Prohibir dangerouslySetInnerHTML
      "react/no-danger-with-children": "error",
      "react/jsx-no-script-url": "error",
      "react/jsx-no-target-blank": "error",

      // Validaciones de props y estado
      "react/prop-types": "off", // No requerimos PropTypes
      "react/no-unescaped-entities": "warn",
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",

      // Hooks de React
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
