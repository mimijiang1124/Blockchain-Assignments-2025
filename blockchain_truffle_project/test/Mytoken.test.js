const MyToken = artifacts.require("MyToken");

contract("MyToken", (accounts) => {
  it("should return the token name", async () => {
    const instance = await MyToken.deployed();
    const name = await instance.name();
    assert.equal(name, "MyToken");
  });
});