import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";
interface RarityInterface extends Codeable, Rollable {
    multiplier: number;
    attributeCount: number;
}
declare const RarityCommon: RarityInterface;
declare const RarityUncommon: RarityInterface;
declare const RarityRare: RarityInterface;
declare const RarityEpic: RarityInterface;
declare const RarityLegendary: RarityInterface;
declare const RarityMythic: RarityInterface;
declare const RarityAngelic: RarityInterface;
export { RarityInterface, RarityCommon, RarityUncommon, RarityRare, RarityEpic, RarityLegendary, RarityMythic, RarityAngelic, };
//# sourceMappingURL=Rarities.d.ts.map