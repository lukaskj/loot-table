import Item from "../Item";
import Random from "../rarity/utils/Random";
import Drop from "./Drop";

export default class {
   private dropTables: Array<Drop> = [];
   private random: Random;

   constructor(seed?: string) {
      this.random = new Random(seed);
   }

   public getDropTables(): Array<Drop> {
      return this.dropTables;
   }

   public addDrop(drop: Drop) {
      this.dropTables.push(drop);
   }

   public drop(itemQtyMax?: number, itemQtyMin?: number): Array<Item> {
      if (!itemQtyMin) {
         itemQtyMin = 0;
      }

      const dropTableClone = [...this.getDropTables()];
      const result: Array<Item> = [];
      for (let qty = itemQtyMin; qty < itemQtyMax; qty++) {
         for (const table of dropTableClone) {
            result.push(table.dropItem());
            // const itemLevel = this.random.range(table.get);
         }
      }
      return result;
   }
}


