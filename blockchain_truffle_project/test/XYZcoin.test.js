const XYZCoin = artifacts.require("XYZCoin");
const truffleAssert = require('truffle-assertions');

contract("XYZCoin", function (accounts) {
  const [owner, recipient, spender] = accounts;
  let token;
  const initialSupply = web3.utils.toWei('1000', 'ether');
  const transferAmount = web3.utils.toWei('100', 'ether'); // Random amount
  const approveAmount = web3.utils.toWei('50', 'ether'); // Random approve amount

  before(async () => {
    token = await XYZCoin.new(
      "XYZ Coin",
      "XYZ",
      18,
      web3.utils.toWei('1000', 'ether'),
      { from: owner }
    );
  });
//Question H
  // Test 1: The initial token balance of the creator account is equal to the total token supply
  it("should assign total supply to creator", async () => {
    const balance = await token.balanceOf(owner);
    assert.equal(balance.toString(), initialSupply, "Initial balance incorrect");
  });

  // Test 2: Tokens can be transferred using the transfer function
  it("should transfer tokens between accounts", async () => {
    const initialOwnerBalance = await token.balanceOf(owner);
    const initialRecipientBalance = await token.balanceOf(recipient);

    await token.transfer(recipient, transferAmount, { from: owner });

    const newOwnerBalance = await token.balanceOf(owner);
    const newRecipientBalance = await token.balanceOf(recipient);

    assert.equal(
      newRecipientBalance.toString(),
      web3.utils.toBN(initialRecipientBalance).add(web3.utils.toBN(transferAmount)).toString(),
      "Recipient didn't receive tokens"
    );
    assert.equal(
      newOwnerBalance.toString(),
      web3.utils.toBN(initialOwnerBalance).sub(web3.utils.toBN(transferAmount)).toString(),
      "Owner balance not deducted correctly"
    );
  });

  // Test 3: Allowance can be set and read
  it("should approve and read allowance", async () => {
    await token.approve(spender, approveAmount, { from: owner });
    const allowance = await token.allowance(owner, spender);
    assert.equal(allowance.toString(), approveAmount, "Allowance not set correctly");
  });

  // Test 4: Accounts can transfer tokens on behalf of other accounts Type test to run the test cases
  it("should transfer tokens on behalf of owner", async () => {
    const transferFromAmount = web3.utils.toWei('30', 'ether');
    await token.transferFrom(owner, recipient, transferFromAmount, { from: spender });

    const newAllowance = await token.allowance(owner, spender);
    assert.equal(
      newAllowance.toString(),
      web3.utils.toBN(approveAmount).sub(web3.utils.toBN(transferFromAmount)).toString(),
      "Allowance not deducted correctly"
    );
  });

// Question I
  // Test 1: An insufficient balance throws an error when trying to transfer tokens
  it("should revert when transferring with insufficient balance", async () => {
    const largeAmount = web3.utils.toWei('10000000', 'ether');
    await truffleAssert.reverts(
      token.transfer(owner, largeAmount, { from: recipient }),
      "Insufficient balance"
    );
  });

  // Test 2: Transferring from an account that has not explicitly authorized the transfer should revert the transaction
  it("should revert unauthorized transferFrom", async () => {
    await truffleAssert.reverts(
      token.transferFrom(owner, recipient, transferAmount, { from: recipient }),
      "Allowance exceeded"
    );
  });

  // Test 3: The transfer and transferFrom functions must fire the Transfer event (even for 0 valuetransfers)
  it("should emit Transfer event on transfer", async () => {
    const tx = await token.transfer(recipient, transferAmount, { from: owner });
    truffleAssert.eventEmitted(tx, 'Transfer', (ev) => {
      return ev.from === owner && 
             ev.to === recipient && 
             ev.value.toString() === transferAmount;
    });
  });

  it("should emit Transfer event for 0 value transfer", async () => {
    const tx = await token.transfer(recipient, 0, { from: owner });
    truffleAssert.eventEmitted(tx, 'Transfer');
  });

  // Test 4: The approve function must fire the Approval event
  it("should emit Approval event", async () => {
    const tx = await token.approve(spender, approveAmount, { from: owner });
    truffleAssert.eventEmitted(tx, 'Approval', (ev) => {
      return ev.owner === owner && 
             ev.spender === spender && 
             ev.value.toString() === approveAmount;
    });
  });
});