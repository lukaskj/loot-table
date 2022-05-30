import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { isNullOrUndefined, isNullOrEmptyOrUndefined } from "../../src/utils/is-null-or-undefined";

describe("Utils", () => {
  describe("#isNullOrUndefined", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it("Should return true if input is null", () => {
      const data = null;
      const expected = true;
      const result = isNullOrUndefined(data);

      expect(result).toStrictEqual(expected);
    });

    it("Should return true if input is undefined", () => {
      const data = undefined;
      const expected = true;
      const result = isNullOrUndefined(data);

      expect(result).toStrictEqual(expected);
    });

    it("Should return false if input has value", () => {
      const data = faker.random.word();
      const expected = false;
      const result = isNullOrUndefined(data);

      expect(result).toStrictEqual(expected);
    });
  });

  describe("#isNullOrEmptyOrUndefined", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it("Should return true if input is null", () => {
      const data = null;
      const expected = true;
      const result = isNullOrEmptyOrUndefined(data);

      expect(result).toStrictEqual(expected);
    });

    it("Should return true if input is undefined", () => {
      const data = undefined;
      const expected = true;
      const result = isNullOrEmptyOrUndefined(data);

      expect(result).toStrictEqual(expected);
    });

    it("Should return true if input is empty", () => {
      const data = "";
      const expected = true;
      const result = isNullOrEmptyOrUndefined(data);

      expect(result).toStrictEqual(expected);
    });

    it("Should return false if input has value", () => {
      const data = faker.random.word();
      const expected = false;
      const result = isNullOrEmptyOrUndefined(data);

      expect(result).toStrictEqual(expected);
    });
  });
});
