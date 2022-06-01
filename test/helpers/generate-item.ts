import { faker } from "@faker-js/faker";

import { Item } from "../../src/entities/item";
import { Type } from "../../src/entities/type";
import { Attributes, Rarities, Types } from "../../src/predefined";
import { NonFunctionProperties } from "../../src/utils/non-function-properties";

export function generateItem(data?: Partial<NonFunctionProperties<Item>>): NonFunctionProperties<Item> {
  return {
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
    ...data,
  };
}
