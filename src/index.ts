import Item from './Item';
import Random from './rarity/utils/Random';
import * as uuid from 'uuid';
import * as Materials from './Materials';
import * as Rarities from './Rarities';
import * as Types from './Types';


const rnd = new Random("Seeded");
const item: Item = new Item();
item.setItemLevel(rnd.range(10, 100))
   .setId(uuid.v4())
   .setRarity(Rarities.RarityUncommon)
   .setMaterial(Materials.MaterialCloth)
   .setType(Types.TypeChest)
   .setSlot(Types.TypeChest.slot)
   .setDefaultAttribute(Types.TypeChest.defaultAttribute)

console.log(item.toJson());