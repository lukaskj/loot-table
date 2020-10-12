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


describe('DropTable test', () => {
   const dropTable: DropTable = new DropTable('drop-seed');
   const item: Item = new Item();
   item.setId('3214')
      .setItemLevel(20)
      .setRarity(Rarities.RarityRare)
      .setName('Test item');

   dropTable.addItem({ chance: 10, drop: item });

   test('DropTable drop item mandatory', () => {
      const itemsDropped = dropTable.drop(1, true);

      expect(itemsDropped).not.toBeNull();
      expect(itemsDropped).not.toEqual([]);
      expect(itemsDropped[0].getId()).toBe('3214');
      expect(itemsDropped[0].getItemLevel()).toBe(20);
      expect(itemsDropped[0].getRarity()).toEqual(Rarities.RarityRare);
   });
});