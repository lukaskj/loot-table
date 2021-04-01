import { TypeChanceSlot, TypeChanceType, TypeChanceAttribute, TypeChanceMaterial, TypeChanceRarity, TypeRange } from "../drop/RandomItem";

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