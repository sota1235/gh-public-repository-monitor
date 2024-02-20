module.exports = {
  roots: [
    "<rootDir>/src",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  prettierPath: null,
  moduleFileExtensions: [
    "ts",
    "js",
  ],
};
