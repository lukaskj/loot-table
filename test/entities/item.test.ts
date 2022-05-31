import { describe, it, jest, beforeEach } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { Item } from "../../src/entities/item";
import { NonFunctionProperties } from "../../src/utils/non-function-properties";
import { Attributes, Rarities, Types } from "../../src/predefined";
import { Type } from "../../src/entities/type";
import { calculateAttributes } from "../../src/utils/calculate-attributes";

describe("#Item", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("Should create a valid Item instance", () => {
    const data: NonFunctionProperties<Item> = {
      id: faker.datatype.uuid(),
      itemLevel: faker.datatype.number({ min: 10, max: 1000 }),
      name: faker.name.jobTitle(),
      code: faker.datatype.uuid(),
      quality: faker.datatype.number({ min: 1, max: 100 }),
      type: faker.helpers.arrayElement([Types.TypeChest, Types.TypeLegs, Types.TypeBoots]) as Type,
      rarity: faker.helpers.arrayElement([Rarities.RarityLegendary, Rarities.RarityUncommon, Rarities.RarityRare]),
      attributes: [
        Attributes.AttributeArmor.withValue(faker.datatype.number({ min: 1, max: 100 })),
        Attributes.AttributeHealth.withValue(faker.datatype.number({ min: 1, max: 100 })),
      ],
    };

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

  it.todo("Should create a random uuid Item code if no code and no name is provided");

  it.todo("Should create an Item code based on Item name if no code and name is provided");
});
