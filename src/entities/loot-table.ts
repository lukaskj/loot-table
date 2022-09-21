import { randomUUID } from "crypto";

import { IRollable } from "../interface/rollable";
import { Random } from "../utils/random";

type Loot = Array<IRollable>;

const RandomKey = Symbol("random");
export class LootTable {
  private lootTable: Loot;
  private [RandomKey]: Random;
  private seed: string;

  constructor(lootTable?: Loot, seed?: string) {
    this.lootTable = lootTable || [];
    this._sortLootByChance();
    this.seed = seed ?? randomUUID();
    this[RandomKey] = new Random(this.seed);
  }

  public setLootTable(lootTable: Loot): void {
    this.lootTable = lootTable;
    this._sortLootByChance();
  }

  private _sortLootByChance(): void {
    this.lootTable = this.lootTable.sort((a, b) => (b.chance ?? 0) - (a.chance ?? 0));
  }

  public drop(max: number = 1): IRollable | null {
    const random = this[RandomKey];
    for (let i = 0; i < max; i++) {
      const roll = random.double() * 100;
      for (const loot of this.lootTable) {
        if ((loot.chance ?? 0) >= roll) {
          return loot;
        }
      }
    }

    return null;
  }
}
