import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";
interface AttributeInterface extends Codeable, Rollable {
    value?: number;
}
declare const AttributeStrength: AttributeInterface;
declare const AttributeAttackSpeed: AttributeInterface;
declare const AttributeArmor: AttributeInterface;
declare const AttributeCritChance: AttributeInterface;
declare const AttributeCritDamage: AttributeInterface;
declare const AttributeHealth: AttributeInterface;
declare const AttributeIntelligence: AttributeInterface;
declare const AttributeManaRegen: AttributeInterface;
declare const AttributeLuck: AttributeInterface;
export { AttributeInterface, AttributeAttackSpeed, AttributeArmor, AttributeCritChance, AttributeHealth, AttributeIntelligence, AttributeManaRegen, AttributeStrength, AttributeCritDamage, AttributeLuck, };
//# sourceMappingURL=Attributes.d.ts.map