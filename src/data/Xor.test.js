import { expect } from 'chai';
import { Left, Right } from './Xor';

describe("Xor", () => {
  describe("fold", () => {
    it("should call the first argument when the Xor is left", () => {
      const xor = new Left("L");

      xor.fold(
        l => expect(l).to.equal("L"),
        r => expect(true).to.be.false
      );
    });

    it("should call the second argument when the Xor is right", () => {
      const xor = new Right("R");

      xor.fold(
        l => expect(true).to.be.false,
        r => expect(r).to.equal("R")
      );
    });
  });

  describe("map", () => {
    it("should transform the value when the Xor is left", () => {
      const xor = new Left("L");

      expect(xor.map(x => x + x).value).to.equal("LL")
    });

    it("should not transform the value when the Xor is right", () => {
      const xor = new Right("R");

      expect(xor.map(x => x + x).value).to.equal("R")
    });
  });

  describe("flatMap", () => {
    it("should transform the value when the Xor is left", () => {
      const xor = new Left("L")
        .flatMap(x => new Right(`=> ${x}`));

      expect(xor.value).to.equal("=> L");
      expect(xor.isLeft).to.be.false;
    });

    it("should yield the same reference when the Xor is right", () => {
      const xor = new Right("L")
        .flatMap(x => new Left(`=> ${x}`));

      expect(xor.value).to.equal("L");
      expect(xor.isLeft).to.be.false;
    });
  });

  describe("forEach", () => {
    it("should run the function when the Xor is left", () => {
      const xor = new Left("L");

      xor.forEach(v => expect(v).to.equal("L"))
    });

    it("should not run the function when the Xor is right", () => {
      const xor = new Right("L");

      xor.forEach(v => expect(true).to.be.false)
    });
  });

  describe("toString", () => {
    it("should show the type of the xor and its value", () => {
      const left = new Left("L")
      const right = new Right("R")

      expect(left.toString()).to.equal(`Left(L)`)
      expect(right.toString()).to.equal(`Right(R)`)
    });
  });
});
