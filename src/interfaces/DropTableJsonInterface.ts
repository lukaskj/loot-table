import { RandomItemJsonInterface } from "./RandomItemJsonInterface";

type JsonDropChance = {
  chance: number;
  item: RandomItemJsonInterface;
};

export interface DropTableJsonInterface {
  seed?: string;
  mandatory?: boolean;
  itemQtyMax?: number;
  dropTables: Array<JsonDropChance>;
}
