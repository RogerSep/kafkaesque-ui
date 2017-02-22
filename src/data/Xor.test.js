import { Left, Right } from './Xor';

describe("Xor", () => {
  describe("fold", () => {
    it("should call the first argument when the Xor is left", () => {
      const xor = new Left("L");

      xor.fold(
        l => expect(l).toBe("L"),
        r => expect(true).toBe(false)
      );
    });

    it("should call the second argument when the Xor is right", () => {
      const xor = new Right("R");

      xor.fold(
        l => expect(true).toBe(false),
        r => expect(r).toBe("R")
      );
    });
  });

  describe("map", () => {
    it("should transform the value when the Xor is left", () => {
      const xor = new Left("L");

      expect(xor.map(x => x + x).value).toBe("LL")
    });

    it("should not transform the value when the Xor is right", () => {
      const xor = new Right("R");

      expect(xor.map(x => x + x).value).toBe("R")
    });
  });

  describe("flatMap", () => {
    it("should transform the value when the Xor is left", () => {
      const xor = new Left("L")
        .flatMap(x => new Right(`=> ${x}`));

      expect(xor.value).toBe("=> L");
      expect(xor.isLeft).toBe(false);
    });

    it("should yield the same reference when the Xor is right", () => {
      const xor = new Right("L")
        .flatMap(x => new Left(`=> ${x}`));

      expect(xor.value).toBe("L");
      expect(xor.isLeft).toBe(false);
    });
  });

  describe("forEach", () => {
    it("should run the function when the Xor is left", () => {
      const xor = new Left("L");

      xor.forEach(v => expect(v).toBe("L"));
    });

    it("should not run the function when the Xor is right", () => {
      const xor = new Right("L");

      xor.forEach(v => expect(true).toBe(false));
    });
  });

  describe("toString", () => {
    it("should show the type of the xor and its value", () => {
      const left = new Left("L")
      const right = new Right("R")

      expect(left.toString()).toBe(`Left(L)`)
      expect(right.toString()).toBe(`Right(R)`)
    });
  });
});
