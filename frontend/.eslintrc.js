module.exports = {
  root: true,
  extends: ["react-app", "react-app/jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["src/**/*.test.ts"],
};
