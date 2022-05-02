import { Item, RandomItem } from "..";
import { AttributeInterface } from "../Attributes";
import { MaterialInterface } from "../Materials";
import { RarityInterface } from "../Rarities";
import { SlotInterface } from "../Slots";
import { TypeInterface } from "../Types";
export interface Range {
    min: number;
    max: number;
}
export declare type Chance<T> = {
    chance: number;
    property: T;
    value?: Range | number;
};
export declare type ChanceRarity = {
    chance: number;
    rarity: RarityInterface;
    value?: Range | number;
};
export declare type ChanceAttribute = {
    chance: number;
    attribute: AttributeInterface;
    value?: Range | number;
};
export declare type ChanceMaterial = {
    chance: number;
    material: MaterialInterface;
    value?: Range | number;
};
export declare type ChanceSlot = {
    chance: number;
    slot: SlotInterface;
    value?: Range | number;
};
export declare type ChanceType = {
    chance: number;
    type: TypeInterface;
    value?: Range | number;
};
export declare type ChanceItem = {
    chance: number;
    item: Item;
    level?: Range;
};
export declare type DropChance = {
    chance: number;
    drop: RandomItem | Item;
};
//# sourceMappingURL=types.d.ts.map