import Item from '../src/Item';
import Random from '../src/utils/Random';
import * as uuid from 'uuid';
import * as Attributes from '../src/Attributes';
import * as Materials from '../src/Materials';
import * as Rarities from '../src/Rarities';
import * as Types from '../src/Types';
import * as Slots from '../src/Slots';
import RandomItem from '../src/drop/RandomItem';



describe('RandomItem test', () => {
   const SEED = 'drop-seed';
   const drop = new RandomItem(SEED);
   test('if drop works', () => {
      drop.addRarity({ chance: 55, property: Rarities.RarityCommon })
         .addRarity({ chance: 32, property: Rarities.RarityUncommon })
         .addRarity({ chance: 10, property: Rarities.RarityRare })
         .addRarity({ chance: 3, property: Rarities.RarityEpic })
         .addRarity({ chance: 0.1, property: Rarities.RarityLegendary })
         .addType({ chance: 50, property: Types.TypeChest, value: { min: 1, max: 50 } })
         .addMaterial({ chance: 12, property: Materials.MaterialCloth })
         .addSlot({ chance: 20, property: Slots.SlotFoot })
         .addAttribute({ chance: 50, property: Attributes.AttributeArmor, value: { min: 1, max: 50 } })
         .addAttribute({ chance: 50, property: Attributes.AttributeAgility, value: { min: 1, max: 50 } })
         .addAttribute({ chance: 50, property: Attributes.AttributeHealth, value: { min: 1, max: 50 } })
         .addAttribute({ chance: 50, property: Attributes.AttributeIntelligence, value: { min: 1, max: 50 } })
         .addAttribute({ chance: 50, property: Attributes.AttributeStrength, value: { min: 1, max: 50 } });

      const item = drop.dropItem();

      expect(item).not.toBeNull();
      expect(item).toHaveProperty('_id');
      expect(item).toHaveProperty('_itemLevel');
      expect(item).toHaveProperty('_material');
      expect(item).toHaveProperty('_rarity');
      expect(item).toHaveProperty('_slot');
      expect(item).toHaveProperty('_type');
      expect(item).toHaveProperty('_defaultAttribute');
      if (item.getRarity().code != 'common') {
         expect(item).toHaveProperty('_attributes');
      }
   });

   test('if drop chance is correct', () => {
      const _drop = new RandomItem(SEED);
      _drop.addRarity({ chance: 100, property: Rarities.RarityRare });
      _drop.addType({ chance: 100, property: Types.TypeChest })
      const _item = _drop.dropItem();

      expect(_item.getRarity()).toBe(Rarities.RarityRare);
      expect(_item.getType()).toBe(Types.TypeChest);
   });
});