/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: {
        allowJs: true,
      },
    },
  },
  preset: "ts-jest",
  testMatch: ["**/*.test.{ts,tsx}"],
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
};
