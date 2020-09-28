import Codeable from "./interfaces/Codeable";

interface Rarity extends Codeable {
   multiplier: number,
   attributeCount: number,
}

const RarityCommon: Rarity = {
   code: 'common',
   name: 'Common',
   multiplier: 1,
   attributeCount: 0,
}

const RarityUncommon: Rarity = {
   code: 'uncommon',
   name: 'Uncommon',
   multiplier: 2,
   attributeCount: 1,
}

const RarityRare: Rarity = {
   code: 'rare',
   name: 'Rare',
   multiplier: 3,
   attributeCount: 2,
}

const RarityEpic: Rarity = {
   code: 'epic',
   name: 'Epic',
   multiplier: 4,
   attributeCount: 3,
}

const RarityLegendary: Rarity = {
   code: 'legendary',
   name: 'Legendary',
   multiplier: 5,
   attributeCount: 4,
}





export {
   Rarity,
   RarityCommon,
   RarityUncommon,
   RarityRare,
   RarityEpic,
   RarityLegendary,
}