import { LootTable } from "../../src/entities/loot-table";
import { IRollable } from "../../src/interface/rollable";
import { generateLootTable } from "../helpers/loot-table-fixture";

describe("Entities", () => {
  describe("#LootTable", () => {
    it("Should drop one item when calling drop with one roll", () => {
      const SEED = "123456789abcd";
      const loot = generateLootTable();
      const lootTable = new LootTable(loot, SEED);

      const expectedLootDropped = loot.find((l) => l.chance === 50) as IRollable;

      const droppedLoot = lootTable.drop(1);

      expect(droppedLoot).not.toBeNull();
      expect(droppedLoot).toMatchObject(expectedLootDropped);
    });

    it("Should not drop one item when roll was not match with any of the chances", () => {
      const SEED = "123456789abcde";
      const loot = generateLootTable();
      const lootTable = new LootTable(loot, SEED);

      const droppedLoot = lootTable.drop(1);

      expect(droppedLoot).toBeNull();
    });

    it("Should drop one item when calling drop with more than one roll", () => {
      const SEED = "123456789abcde";
      const loot = generateLootTable();
      const lootTable = new LootTable(loot, SEED);

      const expectedLootDropped = loot.find((l) => l.chance === 30) as IRollable;

      const droppedLoot = lootTable.drop(2);

      expect(droppedLoot).not.toBeNull();
      expect(droppedLoot).toMatchObject(expectedLootDropped);
    });

    it("Should not drop any item when given no loot table", () => {
      const SEED = "123456789abcde";
      const lootTable = new LootTable(null, SEED);

      const droppedLoot = lootTable.drop();

      expect(droppedLoot).toBeNull();
    });

    describe("fromJSON", () => {
      it.todo("Should drop one item when calling drop with max equals one");
      it.todo("Should drop more items when calling drop with max more than one");
      it.todo("Should not drop any item when given no loot table");
    });
  });
});
