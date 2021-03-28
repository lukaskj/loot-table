import Codeable from "./interfaces/Codeable";

interface Slot extends Codeable {

}

const SlotBack: Slot = {
   code: "back",
   name: "Back",
};

const SlotHead: Slot = {
   code: "head",
   name: "Head",
};

const SlotChest: Slot = {
   code: "chest",
   name: "Chest",
};

const SlotLegs: Slot = {
   code: "legs",
   name: "Legs",
};

const SlotHand: Slot = {
   code: "hand",
   name: "Hand",
};

const SlotShoulder: Slot = {
   code: "shoulder",
   name: "Shoulder",
};

const SlotFoot: Slot = {
   code: "foot",
   name: "Foot",
};

const SlotTwoHand: Slot = {
   code: "twohand",
   name: "Two Hand",
};

const SlotNeck: Slot = {
   code: "Neck",
   name: "Neck",
};

const SlotFinger: Slot = {
   code: "finger",
   name: "Finger",
};



export {
   Slot,
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