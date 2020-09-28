import Codeable from "./interfaces/Codeable";

interface Material extends Codeable {

}


const MaterialCloth: Material = {
   code: 'cloth',
   name: 'Cloth'
}

const MaterialLeather: Material = {
   code: 'leather',
   name: 'Leather'
}

const MaterialMailPlate: Material = {
   code: 'mailplate',
   name: 'MailPlate'
}

export {
   Material,
   MaterialCloth,
   MaterialLeather,
   MaterialMailPlate,
}