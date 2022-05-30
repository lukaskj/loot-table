import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { generateCode } from "../../src/utils/item-code";
import * as ToDashCase from "../../src/utils/to-dash-case";

describe("Utils", () => {
  describe("#itemCode generateCode", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it("Should return code if code is provided without name", () => {
      const data = {
        code: faker.random.word(),
        name: null,
      };

      const expected = data.code;

      const result = generateCode(data.code, data.name);

      expect(result).toStrictEqual(expected);
    });

    it("Should return code if code is provided with name", () => {
      const data = {
        code: faker.random.word(),
        name: faker.random.word(),
      };

      const expected = data.code;

      const result = generateCode(data.code, data.name);

      expect(result).toStrictEqual(expected);
    });

    it("Should return code based on name string if no code is provided", () => {
      const generatedName = faker.random.word().toLowerCase();
      jest.spyOn(ToDashCase, "toDashCase").mockReturnValue(generatedName);

      const data = {
        code: null,
        name: faker.random.word(),
      };

      const expected = generatedName;

      const result = generateCode(data.code, data.name);

      expect(result).toStrictEqual(expected);
      expect(ToDashCase.toDashCase).toHaveBeenCalledWith(data.name);
    });

    it("Should return uuid when code and name are not provided", () => {
      // could not mock or spyOn uuid nor uuid.v4
      const generatedName = faker.random.word().toLowerCase();
      jest.spyOn(ToDashCase, "toDashCase").mockReturnValue(generatedName);

      const data = {
        code: null,
        name: null,
      };

      const expected = generatedName;

      const result = generateCode(data.code, data.name);

      expect(result).not.toStrictEqual(expected);
      expect(ToDashCase.toDashCase).not.toHaveBeenCalledWith(data.name);
    });
  });
});
