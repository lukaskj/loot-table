import Codeable from "./interfaces/Codeable";
import Rollable from "./interfaces/Rollable";

interface SlotInterface extends Codeable, Rollable {

}

const SlotBack: SlotInterface = {
   code: "back",
   name: "Back",
};

const SlotHead: SlotInterface = {
   code: "head",
   name: "Head",
};

const SlotChest: SlotInterface = {
   code: "chest",
   name: "Chest",
};

const SlotLegs: SlotInterface = {
   code: "legs",
   name: "Legs",
};

const SlotHand: SlotInterface = {
   code: "hand",
   name: "Hand",
};

const SlotShoulder: SlotInterface = {
   code: "shoulder",
   name: "Shoulder",
};

const SlotFoot: SlotInterface = {
   code: "foot",
   name: "Foot",
};

const SlotTwoHand: SlotInterface = {
   code: "twohand",
   name: "Two Hand",
};

const SlotNeck: SlotInterface = {
   code: "Neck",
   name: "Neck",
};

const SlotFinger: SlotInterface = {
   code: "finger",
   name: "Finger",
};



export {
   SlotInterface,
   SlotBack,
   SlotChest,
   SlotFoot,
   SlotHand,
   SlotHead,
   SlotLegs,
   SlotShoulder,
   SlotTwoHand,
   SlotNeck,
   SlotFinger,
};