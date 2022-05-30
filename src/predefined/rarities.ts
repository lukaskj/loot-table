import { Rarity } from "../entities/rarity";

const RarityCommon = new Rarity({
  code: "common",
  name: "Common",
  multiplier: 1,
  attributeCount: 1,
});

const RarityUncommon = new Rarity({
  code: "uncommon",
  name: "Uncommon",
  multiplier: 2,
  attributeCount: 1,
});

const RarityRare = new Rarity({
  code: "rare",
  name: "Rare",
  multiplier: 3,
  attributeCount: 2,
});

const RarityEpic = new Rarity({
  code: "epic",
  name: "Epic",
  multiplier: 4,
  attributeCount: 3,
});

const RarityLegendary = new Rarity({
  code: "legendary",
  name: "Legendary",
  multiplier: 5,
  attributeCount: 4,
});

const RarityMythic = new Rarity({
  code: "mythic",
  name: "Mythic",
  multiplier: 6,
  attributeCount: 5,
});

const RarityAngelic = new Rarity({
  code: "angelic",
  name: "Angelic",
  multiplier: 7,
  attributeCount: 6,
});

export { RarityCommon, RarityUncommon, RarityRare, RarityEpic, RarityLegendary, RarityMythic, RarityAngelic };
