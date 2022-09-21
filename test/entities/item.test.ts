import { beforeEach, describe, it, jest } from "@jest/globals";
import crypto from "crypto";

import { Item } from "../../src/entities/item";
import { IItem } from "../../src/entities/types";
import { calculateAttributes } from "../../src/utils/calculate-attributes";
import { generateItem } from "../helpers/item-fixture";

describe("Entities", () => {
  describe("#Item", () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it("Should create a valid Item instance", () => {
      const data: IItem = generateItem();

      const baseAttributes = JSON.parse(JSON.stringify(data.attributes));
      const calculatedAttributes = calculateAttributes(baseAttributes, data.quality, data.rarity);

      const result = new Item(data);

      const expected = {
        ...data,
        attributes: calculatedAttributes.attributes,
        baseAttributes: calculatedAttributes.baseAttributes,
      };

      expect(result).toEqual(expected);
    });

    it("Should create an Item code based on Item name if no code and a name is provided", () => {
      const itemName = "Best item of all";
      const expectedItemCode = "best-item-of-all";

      const data: IItem = generateItem({
        name: itemName,
        code: null as unknown as string,
      });

      const baseAttributes = JSON.parse(JSON.stringify(data.attributes));
      const calculatedAttributes = calculateAttributes(baseAttributes, data.quality, data.rarity);

      const result = new Item(data);

      const expected = {
        ...data,
        code: expectedItemCode,
        attributes: calculatedAttributes.attributes,
        baseAttributes: calculatedAttributes.baseAttributes,
      };

      expect(result).toEqual(expected);
    });

    it("Should create a random uuid Item code if no code and no name is provided", () => {
      const ITEM_ID = "111222333444";
      jest.spyOn(crypto, "randomUUID").mockReturnValue(ITEM_ID);

      const data: IItem = generateItem({
        name: null as unknown as string,
        code: null as unknown as string,
      });

      const baseAttributes = JSON.parse(JSON.stringify(data.attributes));
      const calculatedAttributes = calculateAttributes(baseAttributes, data.quality, data.rarity);

      const result = new Item(data);

      const expected = {
        ...data,
        code: ITEM_ID,
        attributes: calculatedAttributes.attributes,
        baseAttributes: calculatedAttributes.baseAttributes,
      };

      expect(result).toEqual(expected);
      expect(crypto.randomUUID).toHaveBeenCalled();
    });

    it("Should create an Item ID based on Item name if no id and name is provided", () => {
      const ITEM_ID = "111222333444";
      jest.spyOn(crypto, "randomUUID").mockReturnValue(ITEM_ID);

      const data: IItem = generateItem({
        id: null,
      });

      const baseAttributes = JSON.parse(JSON.stringify(data.attributes));
      const calculatedAttributes = calculateAttributes(baseAttributes, data.quality, data.rarity);

      const result = new Item(data);

      const expected = {
        ...data,
        id: ITEM_ID,
        attributes: calculatedAttributes.attributes,
        baseAttributes: calculatedAttributes.baseAttributes,
      };

      expect(result).toEqual(expected);
      expect(crypto.randomUUID).toHaveBeenCalled();
    });

    it("Should create an item from JSON definition", () => {
      // given
      const itemJsonObject: IItem = generateItem();

      // when
      const generatedItem = Item.fromJson(itemJsonObject);
      const baseAttributes = JSON.parse(JSON.stringify(generatedItem.attributes));
      const calculatedAttributes = calculateAttributes(baseAttributes, generatedItem.quality, generatedItem.rarity);

      const expected = {
        ...itemJsonObject,
        attributes: calculatedAttributes.attributes,
        baseAttributes: calculatedAttributes.baseAttributes,
      };

      // then
      expect(generatedItem).not.toBeNull();
      expect(generatedItem).toMatchObject(expected);
    });
  });
});
