import { randomUUID } from "crypto";

import { IRollable } from "../interface/rollable";
import { Random } from "../utils/random";

export type Loot = Array<IRollable>;

const RandomKey = Symbol("random");
export class LootTable {
  private lootTable: Loot;
  private [RandomKey]: Random;
  private seed: string;

  constructor(lootTable: Loot | null, seed?: string) {
    this.lootTable = lootTable || [];
    this._sortLootByChance();
    this.seed = seed ?? randomUUID();
    this[RandomKey] = new Random(this.seed);
  }

  public setLootTable(lootTable: Loot): void {
    this.lootTable = lootTable;
    this._sortLootByChance();
  }

  public getLootTable(): Loot {
    return this.lootTable;
  }

  private _sortLootByChance(): void {
    this.lootTable = this.lootTable.sort((a, b) => (a.chance ?? 0) - (b.chance ?? 0));
  }

  public drop(rolls: number = 1): IRollable | null {
    const random = this[RandomKey];
    for (let i = 0; i < rolls; i++) {
      const roll = random.double() * 100;
      for (const loot of this.lootTable) {
        if ((loot.chance ?? 0) >= roll) {
          loot.roll = roll;
          return loot;
        }
      }
    }

    return null;
  }
}
