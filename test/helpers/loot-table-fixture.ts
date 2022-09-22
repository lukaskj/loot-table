import { Loot } from "../../src/entities/loot-table";
import { generateItem } from "./item-fixture";

export function generateLootTable(): Loot {
  const item1 = generateItem();
  item1.chance = 20;
  const item2 = generateItem();
  item2.chance = 30;
  const item3 = generateItem();
  item3.chance = 50;

  return [item1, item2, item3];
}
