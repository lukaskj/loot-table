import { describe, it, jest, beforeEach, expect } from "@jest/globals";
import { Attributes, Rarities } from "../../src/predefined";
import { calculateAttribute, calculateAttributes } from "../../src/utils/calculate-attributes";
// import { faker } from "@faker-js/faker";

describe("Utils", () => {
  describe("#calculateAttributes", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it("Should calculate corret attribute values based on quality and rarity", () => {
      const data = {
        rarity: Rarities.RarityEpic,
        itemQuality: 50,
        attribute: Attributes.AttributeHealth.withValue(100),
      };

      const expected = {
        baseAttribute: Attributes.AttributeHealth.withValue(100),
        attribute: Attributes.AttributeHealth.withValue(200), // 100 * 50% (itemQuality) * 4 (epic multiplier)
      };

      const result = calculateAttribute(data.attribute, data.itemQuality, data.rarity);

      expect(result).toEqual(expected);
    });

    it("Should calculate corret attributes based on quality and rarity", () => {
      const data = {
        rarity: Rarities.RarityAngelic,
        itemQuality: 75,
        attributes: [Attributes.AttributeAttackSpeed.withValue(23)],
      };

      const expected = {
        attributes: [Attributes.AttributeAttackSpeed.withValue(120.75)], // 23 * 75% (itemQuality) * 7 (Angelic multiplier)
        baseAttributes: [Attributes.AttributeAttackSpeed.withValue(23)],
      };

      const result = calculateAttributes(data.attributes, data.itemQuality, data.rarity);

      expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });
  });
});
