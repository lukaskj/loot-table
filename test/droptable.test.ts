import { DropTable, Item, Materials, RandomItem, Rarities, Slots, Types, Attributes } from "../src";
import { DropTableJsonInterface } from "../src/interfaces/json/DropTableJsonInterface";

describe("DropTable test", () => {
  const dropTable: DropTable = new DropTable("drop-seed");
  const item: Item = new Item();
  item.setId("3214").setItemLevel(20).setRarity(Rarities.RarityRare).setName("Test item");

  dropTable.addItemDrop({ chance: 10, drop: item });

  const RANDOM_SEED = "random seed";

  test("DropTable drop item mandatory", () => {
    const itemsDropped = dropTable.setMandatory(true).setMaxItemQty(1).drop();

    expect(itemsDropped).not.toBeNull();
    expect(itemsDropped).not.toEqual([]);
    expect(itemsDropped[0].id).toBe("3214");
    expect(itemsDropped[0].itemLevel).toBe(20);
    expect(itemsDropped[0].rarity).toEqual(Rarities.RarityRare);
  });

  test("DropTable drop item not mandatory", () => {
    const itemsDropped = dropTable.setMandatory(false).setMaxItemQty(2).drop();

    expect(itemsDropped).not.toBeNull();
    expect(itemsDropped).toEqual([]);
  });

  test("DropTable with random item", () => {
    const drop: RandomItem = new RandomItem("random seed");
    drop.addType(Types.TypeShoulder, 100);
    drop.addMaterial(Materials.MaterialCloth, 100);
    drop.addSlot(Slots.SlotShoulder, 100);
    drop.addRarity(Rarities.RarityRare, 100);
    drop.setItemLevel(20);

    dropTable.addItemDrop({ chance: 60, drop: drop });

    const it: Array<Item> = dropTable.drop();
    expect(it[0].itemLevel).toBe(20);
    expect(it[0].rarity).toEqual(Rarities.RarityRare);
  });

  test("Drop table from json with random item", () => {
    const dropTableJson: DropTableJsonInterface = {
      seed: RANDOM_SEED,
      itemQtyMax: 1,
      mandatory: false,
      dropTable: [
        {
          chance: 60,
          randomItem: {
            itemLevel: 20,
            types: [{ chance: 100, type: Types.TypeShoulder }],
            materials: [{ chance: 100, material: Materials.MaterialCloth }],
            slots: [{ chance: 100, slot: Slots.SlotShoulder }],
            rarities: [{ chance: 100, rarity: Rarities.RarityRare }],
          },
        },
      ],
    };

    const dropTable = DropTable.fromJson(dropTableJson);
    const items = dropTable.drop();
    expect(items.length).toStrictEqual(1);
    expect(items[0].itemLevel).toBe(20);
    expect(items[0].rarity).toEqual(Rarities.RarityRare);
  });

  it("Should not drop if rolls below threshold and it is not mandatory", () => {
    const dropTableJson: DropTableJsonInterface = {
      seed: RANDOM_SEED,
      itemQtyMax: 1,
      mandatory: false,
      dropTable: [
        {
          chance: 50,
          randomItem: {
            itemLevel: 20,
            types: [{ chance: 100, type: Types.TypeShoulder }],
            materials: [{ chance: 100, material: Materials.MaterialCloth }],
            slots: [{ chance: 100, slot: Slots.SlotShoulder }],
            rarities: [{ chance: 100, rarity: Rarities.RarityRare }],
          },
        },
      ],
    };

    const dropTable = DropTable.fromJson(dropTableJson);
    const items = dropTable.drop();

    expect(items).not.toBeNull();
    expect(items.length).toStrictEqual(0);
  });

  it("Should drop if rolls below threshold and it is mandatory", () => {
    const dropTableJson: DropTableJsonInterface = {
      seed: RANDOM_SEED,
      itemQtyMax: 1,
      mandatory: true,
      dropTable: [
        {
          chance: 50,
          randomItem: {
            itemLevel: 20,
            types: [{ chance: 100, type: Types.TypeShoulder }],
            materials: [{ chance: 100, material: Materials.MaterialCloth }],
            slots: [{ chance: 100, slot: Slots.SlotShoulder }],
            rarities: [{ chance: 100, rarity: Rarities.RarityRare }],
          },
        },
      ],
    };

    const dropTable = DropTable.fromJson(dropTableJson);
    const items = dropTable.drop();

    expect(items.length).toStrictEqual(1);
    expect(items[0].itemLevel).toBe(20);
    expect(items[0].rarity).toEqual(Rarities.RarityRare);
  });

  test("Drop table from json with specific item", () => {
    const SPECIFIC_ITEM_ID = "Specific item ID";

    const ITEM_TO_BE_DROPPED = {
      id: SPECIFIC_ITEM_ID,
      name: "Specific item name",
      quality: 100,
      itemLevel: 100,
      attributes: [{ ...Attributes.AttributeArmor, value: 10 }],
      rarity: Rarities.RarityEpic,
      material: Materials.MaterialMailPlate,
      slot: Slots.SlotChest,
      type: Types.TypeChest,
    };

    const dropTableJson: DropTableJsonInterface = {
      seed: RANDOM_SEED,
      itemQtyMax: 1,
      mandatory: false,
      dropTable: [
        {
          chance: 60,
          item: ITEM_TO_BE_DROPPED,
        },
        {
          chance: 60,
          randomItem: {
            itemLevel: 20,
            types: [{ chance: 100, type: Types.TypeShoulder }],
            materials: [{ chance: 100, material: Materials.MaterialCloth }],
            slots: [{ chance: 100, slot: Slots.SlotShoulder }],
            rarities: [{ chance: 100, rarity: Rarities.RarityRare }],
          },
        },
      ],
    };

    const dropTable = DropTable.fromJson(dropTableJson);
    const items = dropTable.drop();

    expect(items.length).toStrictEqual(1);
    expect(items[0].id).toStrictEqual(ITEM_TO_BE_DROPPED.id);
    expect(items[0].rarity).toEqual(ITEM_TO_BE_DROPPED.rarity);
    expect(items[0].slot).toEqual(ITEM_TO_BE_DROPPED.slot);
  });
});
