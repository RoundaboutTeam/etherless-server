jest.genMockFromModule('../EthSmartManager.ts');
const EthSmartManager = {
  sendRunResult: jest.fn(() => {}),
  sendDeployResult: jest.fn(() => {}),
  sendDeleteResult: jest.fn(() => {}),
  sendEditResult: jest.fn(() => {}),
  onRun: jest.fn(() => {
    return true;
  }),
  onDeploy: jest.fn(() => {
    return true;
  }),
  onDelete: jest.fn(() => {
    return true;
  }),
  onEdit: jest.fn(() => {
    return true;
  }),
};

module.exports = EthSmartManager;
