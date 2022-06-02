import { Attribute } from "../entities/attribute";
import { NonFunctionProperties } from "../utils/non-function-properties";
import { Item } from "./item";
import { RandomItem } from "./random-item";

export type IAttribute = NonFunctionProperties<Attribute>;
export type IItem = NonFunctionProperties<Item>;
export type IRandomItem = NonFunctionProperties<RandomItem>;
