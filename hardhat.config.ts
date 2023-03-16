import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { merge } from "jquery";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// const config: HardhatUserConfig = {
//   paths: { tests: "tests" },
//   networks: { hardhat: { hardfork: "merge" } },
//   solidity: {
//     version: "0.8.18",
//     settings: {
//       optimizer: {
//         run: 0,
//         enabled: false,
//       },
//     },
//   },
// };

const config: HardhatUserConfig = {
  paths: { tests: "tests" },
  networks: { hardhat: { hardfork: "merge" } },
  solidity: "0.8.18",
};

export default config;
