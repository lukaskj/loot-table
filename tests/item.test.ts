import Item from '../src/Item';
import Random from '../src/utils/Random';
import * as uuid from 'uuid';
import * as Attributes from '../src/Attributes';
import * as Materials from '../src/Materials';
import * as Rarities from '../src/Rarities';
import * as Types from '../src/Types';
import * as Slots from '../src/Slots';
import RandomItem from '../src/drop/RandomItem';
import DropTable from '../src/drop/DropTable';

describe('Item', () => {
   test('basic item object and serialization', () => {
      const item: Item = new Item();
      item.setRarity(Rarities.RarityEpic);
      item.setItemLevel(10);
      item.setId('Item-ID');
      item.setType(Types.TypeLegs);
      item.setMaterial(Materials.MaterialLeather);
      item.addAttribute(Attributes.AttributeAgility, 10);
      item.setSlot(Slots.SlotLegs);


      const serialized = item.toJson();
      
      expect(serialized.level).toBe(10);
      expect(serialized.id).toBe('Item-ID');
      expect(serialized.rarity.code).toBe(Rarities.RarityEpic.code);
      expect(serialized.material.code).toBe(Materials.MaterialLeather.code);
      expect(serialized.type.code).toBe(Types.TypeLegs.code);
      expect(serialized.slot.code).toBe(Slots.SlotLegs.code);
   });
});