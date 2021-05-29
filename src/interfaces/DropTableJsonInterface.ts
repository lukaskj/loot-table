import {DropChance} from "../drop/types";

export interface DropTableJsonInterface {
  seed?: string;
  mandatory?: boolean;
  itemQtyMax?:number;
  dropTables: Array<DropChance>;
}
