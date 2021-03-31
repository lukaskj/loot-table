import { DropTable, Item, Materials, RandomItem, Rarities, Slots, Types } from "../src";


describe("DropTable test", () => {
   const dropTable: DropTable = new DropTable("drop-seed");
   const item: Item = new Item();
   item.setId("3214")
      .setItemLevel(20)
      .setRarity(Rarities.RarityRare)
      .setName("Test item");

   dropTable.addItemDrop({ chance: 10, drop: item });

   test("DropTable drop item mandatory", () => {
      const itemsDropped = dropTable.drop(true, 1);

      expect(itemsDropped).not.toBeNull();
      expect(itemsDropped).not.toEqual([]);
      expect(itemsDropped[0].id).toBe("3214");
      expect(itemsDropped[0].itemLevel).toBe(20);
      expect(itemsDropped[0].rarity).toEqual(Rarities.RarityRare);
   });

   test("DropTable drop item not mandatory", () => {
      const itemsDropped = dropTable.drop(false, 2);

      expect(itemsDropped).not.toBeNull();
      expect(itemsDropped).toEqual([]);
   });

   test("DropTable with random item", () => {
      const drop: RandomItem = new RandomItem("random seed");
      drop.addType(Types.TypeShoulder, 100);
      drop.addMaterial(Materials.MaterialCloth, 100);
      drop.addSlot(Slots.SlotShoulder, 100);
      drop.addRarity(Rarities.RarityRare, 100);
      drop.setItemLevel(20);

      dropTable.addItemDrop({ chance: 60, drop: drop });

      const it: Array<Item> = dropTable.drop();
      expect(it[0].itemLevel).toBe(20);
      expect(it[0].rarity).toEqual(Rarities.RarityRare);
   });
});