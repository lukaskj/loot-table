import Item from "../Item";
import Random from "../utils/Random";
import RandomItem from "./RandomItem";
import { DropChance } from "./types";

export default class Droptable {
   private dropTables: Array<DropChance> = [];
   private random: Random;

   constructor(seed?: string) {
      this.random = new Random(seed);
   }

   public getDropTables(): Array<DropChance> {
      return this.dropTables;
   }

   public addItemDrop(drop: DropChance): Droptable {
      this.dropTables.push(drop);
      return this;
   }

   public drop(mandatory: boolean = false, itemQtyMax: number = 1): Array<Item> {

      const dropTableClone = [...this.getDropTables()].sort((a: DropChance, b: DropChance) => b.chance - a.chance);

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
