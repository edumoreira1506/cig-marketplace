import '@testing-library/jest-dom/extend-expect';
import '@Configs/i18n';

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
