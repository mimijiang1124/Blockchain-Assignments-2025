const XYZCoin = artifacts.require("XYZCoin");

module.exports = function(deployer) {
  deployer.deploy(
    XYZCoin,
    "XYZ Coin",
    "XYZ",
    0,
    1000
  );
};