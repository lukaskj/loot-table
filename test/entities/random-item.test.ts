/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from "@faker-js/faker";
import crypto from "crypto";

import { RandomItem } from "../../src/entities/random-item";
import { Rarity } from "../../src/entities/rarity";
import { Type } from "../../src/entities/type";
import { IItem } from "../../src/entities/types";
import { Attributes, Rarities, Types } from "../../src/predefined";
import { calculateAttributes } from "../../src/utils/calculate-attributes";
import { generateRandomItem } from "../helpers/item-fixture";

const SEED = "666";

describe("Entities", () => {
  describe("#RandomItem", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    test("Random item instance", () => {
      const data = generateRandomItem({ seed: SEED });
      const randomItem = new RandomItem(data);

      expect(randomItem).toMatchObject(data);
    });

    test("Generate random item", () => {
      const ITEM_ID = "ITEM_ID_VALUE";
      jest.spyOn(crypto, "randomUUID").mockReturnValue(ITEM_ID);

      const ITEM_QUALITY = 23;
      const ITEM_LEVEL = 21;
      const ATTR_VALES: { [k: string]: number } = {
        hp: 72,
        as: 60,
        str: 95,
      };

      const data = generateRandomItem({ seed: SEED });
      const randomItem = new RandomItem(data);
      const item = randomItem.generateItem();

      const baseAttributes = data.attributes
        .filter((attr) => ["hp", "as", "str"].includes(attr.code))
        .map((attr) => {
          attr.value = ATTR_VALES[attr.code];
          return attr;
        });

      const calculatedAttributes = calculateAttributes(baseAttributes, ITEM_QUALITY, data.rarities[0]);
      calculatedAttributes.attributes.sort((a, b) => (b.chance ?? 0) - (a.chance ?? 0));

      const expected: IItem = {
        id: ITEM_ID,
        name: data.name,
        code: data.code,
        chance: undefined,
        roll: undefined,
        seed: SEED,
        level: ITEM_LEVEL,
        quality: ITEM_QUALITY,
        rarity: new Rarity(data.rarities[0]),
        type: new Type(data.types[0]),
        attributes: calculatedAttributes.attributes,
      };

      expect(item).toMatchObject(expected);
    });

    test.skip("Generate random item attribute with predefined value (not range)", () => {
      const data = generateRandomItem({ seed: SEED, attributes: [Attributes.AttributeArmor.withValue(50)] });
      const randomItem = new RandomItem(data);
      const item = randomItem.generateItem();
      const expected = {};

      expect(item).toEqual(expected);
    });
  });
});
