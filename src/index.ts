import Item from './Item';
import Random from './utils/Random';
import * as uuid from 'uuid';
import * as Attributes from './Attributes';
import * as Materials from './Materials';
import * as Rarities from './Rarities';
import * as Types from './Types';
import * as Slots from './Slots';
import Drop from './drop/Drop';
import DropTable from './drop/DropTable';


const rnd = new Random();
const item: Item = new Item();
item.setId('1234')
   .setItemLevel(20)
   .setName('Test item');

const drop: Drop = new Drop('asdf');
const drop2: Drop = new Drop('asdqq');
drop2.addItem({ chance: 100, item: item });
drop.setItemLevel({ min: 10, max: 50 });

drop.addRarity({ chance: 55, property: Rarities.RarityCommon })
   .addRarity({ chance: 32, property: Rarities.RarityUncommon })
   .addRarity({ chance: 10, property: Rarities.RarityRare })
   .addRarity({ chance: 3, property: Rarities.RarityEpic })
   .addRarity({ chance: 0.1, property: Rarities.RarityLegendary })
   .addType({ chance: 50, property: Types.TypeChest, value: { min: 1, max: 50 } })
   .addMaterial({ chance: 12, property: Materials.MaterialCloth })
   .addSlot({ chance: 20, property: Slots.SlotFoot })
   .addAttribute({ chance: 50, property: Attributes.AttributeArmor, value: { min: 1, max: 50 } })
   .addAttribute({ chance: 50, property: Attributes.AttributeAgility, value: { min: 1, max: 50 } })
   .addAttribute({ chance: 50, property: Attributes.AttributeHealth, value: { min: 1, max: 50 } })
   .addAttribute({ chance: 50, property: Attributes.AttributeIntelligence, value: { min: 1, max: 50 } })
   .addAttribute({ chance: 50, property: Attributes.AttributeStrength, value: { min: 1, max: 50 } })

const droptable: DropTable = new DropTable('table');
droptable.addDrop({ chance: 10, drop: drop });
droptable.addDrop({ chance: 40, drop: drop2 });


console.log(droptable.drop(2, false));

// let i = 0;
// let d: Item;
// do {
//    d = drop.dropItem();
//    i++;

// } while (d.getRarity().code != Rarities.RarityEpic.code);

// console.log(i, d.toJson());