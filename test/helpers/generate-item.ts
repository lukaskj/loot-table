import { faker } from "@faker-js/faker";

import { Type } from "../../src/entities/type";
import { IItem } from "../../src/entities/types";
import { Attributes, Rarities, Types } from "../../src/predefined";

export function generateItem(data?: Partial<IItem>): IItem {
  return {
    id: faker.datatype.uuid(),
    level: faker.datatype.number({ min: 10, max: 1000 }),
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
