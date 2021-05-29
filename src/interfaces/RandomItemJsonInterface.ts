import { TypeChanceAttribute, TypeChanceMaterial, TypeChanceRarity, TypeChanceSlot, TypeChanceType, TypeRange } from "../drop/types";

interface RandomItemJsonInterface {
    seed?: string,
    name?: string;
    itemLevel?: TypeRange | number;
    quality?: TypeRange | number;
    // items?: Array<TypeChanceItem>;
    rarities?: Array<TypeChanceRarity>;
    attributes?: Array<TypeChanceAttribute>;
    materials?: Array<TypeChanceMaterial>;
    slots?: Array<TypeChanceSlot>;
    types?: Array<TypeChanceType>;
}

export default RandomItemJsonInterface;