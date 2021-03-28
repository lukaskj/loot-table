import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";

interface Material extends Codeable, Rollable {

}


const MaterialCloth: Material = {
   code: "cloth",
   name: "Cloth"
};

const MaterialLeather: Material = {
   code: "leather",
   name: "Leather"
};

const MaterialMailPlate: Material = {
   code: "mailplate",
   name: "MailPlate"
};

export {
   Material,
   MaterialCloth,
   MaterialLeather,
   MaterialMailPlate,
};