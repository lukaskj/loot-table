/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

import { RandomItem } from "../../src/entities/random-item";
import { Attributes, Rarities, Types } from "../../src/predefined";
import { generateRandomItem } from "../helpers/item-fixture";

const SEED = "666";

describe.skip("Entities", () => {
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
      const data = generateRandomItem({ seed: SEED });
      const randomItem = new RandomItem(data);
      const item = randomItem.generateItem();
      const expected = {};

      expect(item).toEqual(expected);
    });

    test("Generate random item attribute with predefined value (not range)", () => {
      const data = generateRandomItem({ seed: SEED, attributes: [Attributes.AttributeArmor.withValue(50)] });
      const randomItem = new RandomItem(data);
      const item = randomItem.generateItem();
      const expected = {};

      expect(item).toEqual(expected);
    });
  });
});
