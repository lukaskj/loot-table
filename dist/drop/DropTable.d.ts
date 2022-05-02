import { DropTableJsonInterface } from "../interfaces/DropTableJsonInterface";
import Item from "../Item";
import { DropChance } from "./types";
export default class DropTable {
    private dropTables;
    private random;
    private mandatory;
    private itemQtyMax;
    constructor(seed?: string);
    getDropTables(): Array<DropChance>;
    addItemDrop(drop: DropChance): DropTable;
    setMandatory(mandatory: boolean): DropTable;
    setMaxItemQty(maxItemQty: number): DropTable;
    drop(): Array<Item>;
    static fromJson(dropTableJson: DropTableJsonInterface): DropTable;
}
//# sourceMappingURL=DropTable.d.ts.map