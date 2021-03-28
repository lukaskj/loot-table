import Item from "../Item";
import Random from "../utils/Random";
import RandomItem from "./RandomItem";

export default class Droptable {
   private dropTables: Array<TypeDropChance> = [];
   private random: Random;

   constructor(seed?: string) {
      this.random = new Random(seed);
   }

   public getDropTables(): Array<TypeDropChance> {
      return this.dropTables;
   }

   public addItem(item: TypeDropChance): Droptable {
      this.addDrop(item);
      return this;
   }

   public addDrop(drop: TypeDropChance): Droptable {
      this.dropTables.push(drop);
      return this;
   }

   public drop(itemQtyMax: number = 1, mandatory: boolean = true): Array<Item> {

      const dropTableClone = [...this.getDropTables()].sort((a: TypeDropChance, b: TypeDropChance) => b.chance - a.chance);

      const result: Array<Item> = [];

      for (let qty = 0; qty < itemQtyMax; qty++) {
         const roll: number = this.random.double() * 100;

         for (let i = 0; i < dropTableClone.length; i++) {
            const isMandatoryAndLastDrop: boolean = (mandatory && i == dropTableClone.length - 1);
            const table = isMandatoryAndLastDrop ? dropTableClone[0] : dropTableClone[i];
            if (table.chance >= roll || isMandatoryAndLastDrop) {
               let item = null;
               if (table.drop instanceof Item) {
                  item = table.drop;
               } else {
                  item = (table.drop as RandomItem).dropItem();
               }
               if (item) {
                  item.setRoll(roll);
               }
               result.push(item);
               break;
            }
         }
      }
      return result;
   }
}

export type TypeDropChance = {
   chance: number,
   drop: RandomItem | Item,
};

