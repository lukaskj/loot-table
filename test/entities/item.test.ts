import { beforeEach, describe, it, jest } from "@jest/globals";
import crypto from "crypto";

import { Item } from "../../src/entities/item";
import { calculateAttributes } from "../../src/utils/calculate-attributes";
import { NonFunctionProperties } from "../../src/utils/non-function-properties";
import { generateItem } from "../helpers/generate-item";

describe("#Item", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("Should create a valid Item instance", () => {
    const data: NonFunctionProperties<Item> = generateItem();

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

    const data: NonFunctionProperties<Item> = generateItem({
      name: itemName,
      code: null,
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

    const data: NonFunctionProperties<Item> = generateItem({
      name: null,
      code: null,
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

    const data: NonFunctionProperties<Item> = generateItem({
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
});
