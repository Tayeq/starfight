/** @type {import("eslint").Linter.Config} */
export default {
  extends: ['@repo/eslint-config/next.js'],
  parserOptions: {
    project: true,
  },
};
