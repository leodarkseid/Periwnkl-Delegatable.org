import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  paths: { tests: "tests"},
  solidity:{
    version: "0.8.15",
  settings: {
    optimizer:{
      runs: 10,
      enabled: true
    },
  },
}
};

export default config;
