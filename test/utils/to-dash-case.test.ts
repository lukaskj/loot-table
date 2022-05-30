import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import { toDashCase } from "../../src/utils/to-dash-case";

describe("Utils", () => {
  describe("#toDashCase", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it("Should transform string to dash-case", () => {
      const data = "camelCaseString";
      const expected = "camel-case-string";
      const result = toDashCase(data);

      expect(result).toStrictEqual(expected);
    });

    it("Should return empty string if null is provided", () => {
      const data = null;
      const expected = "";
      const result = toDashCase(data as unknown as string);

      expect(result).toStrictEqual(expected);
    });

    it("Should return empty string if undefined is provided", () => {
      const data = undefined;
      const expected = "";
      const result = toDashCase(data as unknown as string);

      expect(result).toStrictEqual(expected);
    });
  });
});
