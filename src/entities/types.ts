import { Attribute } from "../entities/attribute";
import { NonFunctionProperties } from "../utils/non-function-properties";
import { Item } from "./item";

export type IAttribute = NonFunctionProperties<Attribute>;
export type IItem = NonFunctionProperties<Item>;
