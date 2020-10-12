import Item from "../Item";
import Random from "../utils/Random";
import Drop from "./Drop";

export default class {
   private dropTables: Array<TypeDropChance> = [];
   private random: Random;

   constructor(seed?: string) {
      this.random = new Random(seed);
   }

   public getDropTables(): Array<TypeDropChance> {
      return this.dropTables;
   }

   public addDrop(drop: TypeDropChance) {
      this.dropTables.push(drop);
   }

   public drop(itemQtyMax?: number, mandatory: boolean = true): Array<Item> {

      const dropTableClone = this.getDropTables().sort((a: TypeDropChance, b: TypeDropChance) => b.chance - a.chance);

      const result: Array<Item> = [];

      for (let qty = 0; qty < itemQtyMax; qty++) {
         const roll: number = this.random.double() * 100;
         console.log(roll);
         for (let i = 0; i < dropTableClone.length; i++) {
            const table = dropTableClone[i];
            if (table.chance >= roll) {
               result.push(table.drop.dropItem());
               break;
            }
            // check mandatory item
            if (mandatory && i == dropTableClone.length - 1) {
               result.push(table.drop.dropItem());
               break;
            }
         }
      }
      return result;
   }
}

export type TypeDropChance = {
   chance: number,
   drop: Drop,
}

