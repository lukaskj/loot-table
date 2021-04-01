import * as Attributes from "../src/Attributes";
import * as Materials from "../src/Materials";
import * as Rarities from "../src/Rarities";
import * as Types from "../src/Types";
import * as Slots from "../src/Slots";
import RandomItem from "../src/drop/RandomItem";



describe("RandomItem test", () => {
   const SEED = "drop-seed";
   const drop = new RandomItem(SEED);
   test("if drop works", () => {
      drop.addRarity(Rarities.RarityCommon, 55)
         .addRarity(Rarities.RarityUncommon, 32)
         .addRarity(Rarities.RarityRare, 10)
         .addRarity(Rarities.RarityEpic, 3)
         .addRarity(Rarities.RarityLegendary, 0)
         .addType(Types.TypeChest, 50)
         .addMaterial(Materials.MaterialCloth, 12)
         .addSlot(Slots.SlotFoot, 20)
         .addAttribute(Attributes.AttributeArmor, 50, 1, 50)
         .addAttribute(Attributes.AttributeAttackSpeed, 50, 1, 50)
         .addAttribute(Attributes.AttributeHealth, 50, 1, 50)
         .addAttribute(Attributes.AttributeIntelligence, 50, 1, 50)
         .addAttribute(Attributes.AttributeStrength, 50, 1, 50);

      const item = drop.dropItem();

      expect(item).not.toBeNull();
      expect(item).toHaveProperty("_id");
      expect(item).toHaveProperty("_itemLevel");
      expect(item).toHaveProperty("_material");
      expect(item).toHaveProperty("_rarity");
      expect(item).toHaveProperty("_slot");
      expect(item).toHaveProperty("_type");
      if (item.rarity.code != "common") {
         expect(item).toHaveProperty("_attributes");
      }
   });

   test("if drop chance is correct", () => {
      const _drop = new RandomItem(SEED);
      _drop.addRarity(Rarities.RarityRare, 100);
      _drop.addType(Types.TypeChest, 100);
      const _item = _drop.dropItem();

      expect(_item.rarity).toBe(Rarities.RarityRare);
      expect(_item.type).toBe(Types.TypeChest);
   });
});