import { expect } from 'chai';
import defi, { anotherTest } from './index';

describe("kafkesque", () => {
  it("should have tests", () => {
    defi();
    anotherTest();
    expect(true).to.be.true;
  });
});
