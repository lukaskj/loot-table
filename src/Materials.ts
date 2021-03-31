import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";

interface MaterialInterface extends Codeable, Rollable {

}


const MaterialCloth: MaterialInterface = {
   code: "cloth",
   name: "Cloth"
};

const MaterialLeather: MaterialInterface = {
   code: "leather",
   name: "Leather"
};

const MaterialMailPlate: MaterialInterface = {
   code: "mailplate",
   name: "MailPlate"
};

export {
   MaterialInterface,
   MaterialCloth,
   MaterialLeather,
   MaterialMailPlate,
};