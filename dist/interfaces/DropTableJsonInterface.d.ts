import { RandomItemJsonInterface } from "./RandomItemJsonInterface";
declare type JsonDropChance = {
    chance: number;
    item: RandomItemJsonInterface;
};
export interface DropTableJsonInterface {
    seed?: string;
    mandatory?: boolean;
    itemQtyMax?: number;
    dropTables: Array<JsonDropChance>;
}
export {};
//# sourceMappingURL=DropTableJsonInterface.d.ts.map