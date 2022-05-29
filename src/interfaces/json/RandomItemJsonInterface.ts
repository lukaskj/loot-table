import { ChanceAttribute, ChanceMaterial, ChanceRarity, ChanceSlot, Range, ChanceType } from "./../../drop/types";

export interface RandomItemJsonInterface {
  seed?: string;
  name?: string;
  itemLevel?: Range | number;
  quality?: Range | number;
  rarities?: Array<ChanceRarity>;
  attributes?: Array<ChanceAttribute>;
  materials?: Array<ChanceMaterial>;
  slots?: Array<ChanceSlot>;
  types?: Array<ChanceType>;
}
