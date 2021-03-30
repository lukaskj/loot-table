import { Random } from "../src";

describe("Random tests", function () {
   const SEED = "seed";

   test("double random", function () {
      const random: Random = new Random(SEED);
      const doubleRandom: number = random.double();
      expect(doubleRandom).not.toBeNull();
      expect(doubleRandom).toBeLessThan(1);
      expect(doubleRandom).toBeCloseTo(0, 1);
   });

   test("range between 0 and 100", () => {
      const random: Random = new Random(SEED);
      const range: number = random.range(0, 100);
      expect(range).not.toBeNull();
      expect(range).not.toBeLessThan(0);
      expect(range).toBe(3);
   });

   test("random max not inclusive", () => {
      const random: Random = new Random(SEED);
      const maxNotInclusive: number = random.max(100, false);
      expect(maxNotInclusive).not.toBeNull();
      expect(maxNotInclusive).not.toBeLessThan(0);
      expect(maxNotInclusive).toBe(3);
   });

   test("random max inclusive", () => {
      const random: Random = new Random(SEED);
      const maxInclusive: number = random.max(100, true);
      expect(maxInclusive).not.toBeNull();
      expect(maxInclusive).not.toBeLessThan(0);
      expect(maxInclusive).toBe(3);
   });

   test("random string", () => {
      const random: Random = new Random();
      const randomString: string = random.string(6);
      expect(randomString).not.toBeNull();
      expect(randomString.length).toBe(6);
   });
});