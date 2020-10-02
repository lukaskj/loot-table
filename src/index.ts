import Item from './Item';
import Random from './utils/Random';
import * as uuid from 'uuid';
import * as Materials from './Materials';
import * as Rarities from './Rarities';
import * as Types from './Types';
import Drop from './drop/Drop';


const rnd = new Random();
const item: Item = new Item();

const drop: Drop = new Drop('asdf');
drop.setItemLevel({ min: 10, max: 50 });

drop.addRarity({ chance: 55, property: Rarities.RarityCommon })
   .addRarity({ chance: 32, property: Rarities.RarityUncommon })
   .addRarity({ chance: 10, property: Rarities.RarityRare })
   .addRarity({ chance: 3, property: Rarities.RarityEpic })
   .addRarity({ chance: 0.1, property: Rarities.RarityLegendary })
   .addType({ chance: 50, property: Types.TypeChest, value: { min: 1, max: 50 } })
   // .addMaterial({ chance: 12, property: Materials.MaterialCloth })

let i = 0;
let d: Item;
do {
   d = drop.dropItem();
   i++;

} while (d.getRarity().code != Rarities.RarityEpic.code);

console.log(i, d.toJson());