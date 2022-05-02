import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";
import * as Materials from "./Materials";
import * as Slots from "./Slots";
interface TypeInterface extends Codeable, Rollable {
    slot: Slots.SlotInterface;
    materials: Array<Materials.MaterialInterface>;
}
declare const TypeCape: TypeInterface;
declare const TypeChest: TypeInterface;
declare const TypeFoot: TypeInterface;
declare const TypeLegs: TypeInterface;
declare const TypeRing: TypeInterface;
declare const TypeShoulder: TypeInterface;
declare const TypeBelt: TypeInterface;
declare const TypeShield: TypeInterface;
declare const TypeSword: TypeInterface;
export { TypeInterface, TypeCape, TypeChest, TypeFoot, TypeLegs, TypeRing, TypeShield, TypeShoulder, TypeBelt, TypeSword, };
//# sourceMappingURL=Types.d.ts.map