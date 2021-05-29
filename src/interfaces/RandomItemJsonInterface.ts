import { ChanceAttribute, ChanceMaterial, ChanceRarity, ChanceSlot, Range, ChanceType } from "../drop/types";

interface RandomItemJsonInterface {
    seed?: string,
    name?: string;
    itemLevel?: Range | number;
    quality?: Range | number;
    // items?: Array<ChanceItem>;
    rarities?: Array<ChanceRarity>;
    attributes?: Array<ChanceAttribute>;
    materials?: Array<ChanceMaterial>;
    slots?: Array<ChanceSlot>;
    types?: Array<ChanceType>;
}

export default RandomItemJsonInterface;