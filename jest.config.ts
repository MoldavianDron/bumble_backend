import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
  setupFiles: ["dotenv/config"],
};

export default config;
