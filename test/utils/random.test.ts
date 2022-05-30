import { Random } from "../../src/utils/random";

const SEED = "custom_seed";

describe("Utils", () => {
  describe("#Random", () => {
    let randomInstance = new Random(SEED);
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
      randomInstance = new Random(SEED);
    });

    test("random string generation", () => {
      const expected = "CcFLRyCnHU";
      const result = randomInstance.string(10);

      expect(result).toStrictEqual(expected);
    });

    test("range min max inclusive", () => {
      const expected = 67;
      const result = randomInstance.range(50, 500, true);

      expect(result).toStrictEqual(expected);
    });

    test("range min max not inclusive", () => {
      const expected = 67;
      const result = randomInstance.range(50, 500, false);

      expect(result).toStrictEqual(expected);
    });

    test("max value inclusive", () => {
      const expected = 39;
      const result = randomInstance.max(1000, true);

      expect(result).toStrictEqual(expected);
    });

    test("max value not inclusive", () => {
      const expected = 39;
      const result = randomInstance.max(1000, true);

      expect(result).toStrictEqual(expected);
    });
  });
});
