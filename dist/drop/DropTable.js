"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("../Item");
const Random_1 = require("../utils/Random");
const RandomItem_1 = require("./RandomItem");
class DropTable {
    constructor(seed) {
        this.dropTables = [];
        this.mandatory = false;
        this.itemQtyMax = 1;
        this.random = new Random_1.default(seed);
    }
    getDropTables() {
        return this.dropTables;
    }
    addItemDrop(drop) {
        this.dropTables.push(drop);
        return this;
    }
    setMandatory(mandatory) {
        this.mandatory = mandatory;
        return this;
    }
    setMaxItemQty(maxItemQty) {
        this.itemQtyMax = maxItemQty;
        return this;
    }
    drop() {
        const dropTableClone = [...this.getDropTables()].sort((a, b) => b.chance - a.chance);
        const result = [];
        for (let qty = 0; qty < this.itemQtyMax; qty++) {
            const roll = this.random.double() * 100;
            for (let i = 0; i < dropTableClone.length; i++) {
                const isMandatoryAndLastDrop = this.mandatory && i == dropTableClone.length - 1;
                const table = isMandatoryAndLastDrop ? dropTableClone[0] : dropTableClone[i];
                if (table.chance >= roll || isMandatoryAndLastDrop) {
                    let item = null;
                    if (table.drop instanceof Item_1.default) {
                        item = table.drop;
                    }
                    else {
                        item = table.drop.dropItem();
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
    static fromJson(dropTableJson) {
        var _a, _b;
        const dropTable = new DropTable(dropTableJson.seed);
        dropTable.setMandatory((_a = dropTableJson.mandatory) !== null && _a !== void 0 ? _a : false);
        dropTable.setMaxItemQty((_b = dropTableJson.itemQtyMax) !== null && _b !== void 0 ? _b : 1);
        for (const drop of dropTableJson.dropTables) {
            dropTable.addItemDrop({
                chance: drop.chance,
                drop: RandomItem_1.default.fromJson(drop.item),
            });
        }
        return dropTable;
    }
}
exports.default = DropTable;
//# sourceMappingURL=DropTable.js.map