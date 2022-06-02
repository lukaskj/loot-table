import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";

import { Type } from "../../src/entities/type";
import { IItem, IRandomItem } from "../../src/entities/types";
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

export function generateRandomItem(data?: Partial<IRandomItem>): IRandomItem {
  const minAttributeValue = 10;
  const maxAttributeValue = 150;

  return {
    name: faker.name.jobDescriptor(),
    code: randomUUID(),
    itemLevel: { min: 10, max: 100 },
    quality: { min: 10, max: 100 },
    types: [
      Types.TypeCape.withChance(50),
      Types.TypeLegs.withChance(50),
      Types.TypeBoots.withChance(50),
      Types.TypeShield.withChance(50),
    ],
    rarities: [
      Rarities.RarityCommon.withChance(50),
      Rarities.RarityUncommon.withChance(50),
      Rarities.RarityRare.withChance(60),
      Rarities.RarityEpic.withChance(70),
    ],
    attributes: [
      Attributes.AttributeStrength.withRange({ min: minAttributeValue, max: maxAttributeValue }).withChance(50),
      Attributes.AttributeAttackSpeed.withRange({ min: minAttributeValue, max: maxAttributeValue }).withChance(60),
      Attributes.AttributeIntelligence.withRange({ min: minAttributeValue, max: maxAttributeValue }).withChance(50),
      Attributes.AttributeHealth.withRange({ min: minAttributeValue, max: maxAttributeValue }).withChance(70),
      Attributes.AttributeCritChance.withRange({ min: minAttributeValue, max: maxAttributeValue }).withChance(50),
      Attributes.AttributeManaRegen.withRange({ min: minAttributeValue, max: maxAttributeValue }).withChance(50),
    ],
    ...data,
  };
}
