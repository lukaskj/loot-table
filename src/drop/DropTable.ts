import { DropTableJsonInterface } from "../interfaces/DropTableJsonInterface";
import Item from "../Item";
import Random from "../utils/Random";
import RandomItem from "./RandomItem";
import { DropChance } from "./types";

export default class DropTable {
   private dropTables: Array<DropChance> = [];
   private random: Random;
   private mandatory: boolean = false;
   private itemQtyMax: number = 1;

   constructor(seed?: string) {
      this.random = new Random(seed);
   }

   public getDropTables(): Array<DropChance> {
      return this.dropTables;
   }

   public addItemDrop(drop: DropChance): DropTable {
      this.dropTables.push(drop);
      return this;
   }

   public setMandatory(mandatory: boolean): DropTable {
     this.mandatory = mandatory;
     return this;
   }

   public setMaxItemQty(maxItemQty: number): DropTable {
     this.itemQtyMax = maxItemQty;
     return this;
   }

   public drop(): Array<Item> {

      const dropTableClone = [...this.getDropTables()].sort((a: DropChance, b: DropChance) => b.chance - a.chance);

      const result: Array<Item> = [];

      for (let qty = 0; qty < this.itemQtyMax; qty++) {
         const roll: number = this.random.double() * 100;

         for (let i = 0; i < dropTableClone.length; i++) {
            const isMandatoryAndLastDrop: boolean = (this.mandatory && i == dropTableClone.length - 1);
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

   public static fromJson(dropTableJson: DropTableJsonInterface): DropTable {
     const dropTable: DropTable = new DropTable(dropTableJson.seed);
     dropTable.setMandatory(dropTableJson.mandatory ?? false);
     dropTable.setMaxItemQty(dropTableJson.itemQtyMax ?? 1);
     for (const drop of dropTableJson.dropTables) {
       dropTable.addItemDrop(drop);
     }
     return dropTable;
   }
}
