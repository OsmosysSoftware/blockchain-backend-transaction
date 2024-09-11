const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('MessageStorageModule', (m) => {
  const MessageContract = m.contract('MessageStorage');

  return { MessageContract };
});