import { ItemJsonInterface } from "./ItemJsonInterface";
import { RandomItemJsonInterface } from "./RandomItemJsonInterface";

export type RandomItemDropChance = {
  chance: number;
  randomItem: RandomItemJsonInterface;
};

export type ItemDropChance = {
  chance: number;
  item: ItemJsonInterface;
};

export interface DropTableJsonInterface {
  seed?: string;
  mandatory?: boolean;
  itemQtyMax?: number;
  dropTable: Array<RandomItemDropChance | ItemDropChance>;
}
