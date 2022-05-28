import * as Attributes from "../src/Attributes";
import * as Materials from "../src/Materials";
import * as Rarities from "../src/Rarities";
import * as Types from "../src/Types";
import * as Slots from "../src/Slots";
import RandomItem from "../src/drop/RandomItem";

describe("RandomItem test", () => {
  const SEED = "drop-seed";
  const randomItem = new RandomItem(SEED);
  test("if drop works", () => {
    randomItem
      .addRarity(Rarities.RarityCommon, 55)
      .addRarity(Rarities.RarityUncommon, 32)
      .addRarity(Rarities.RarityRare, 10)
      .addRarity(Rarities.RarityEpic, 3)
      .addRarity(Rarities.RarityLegendary, 0)
      .addType(Types.TypeChest, 50)
      .addMaterial(Materials.MaterialCloth, 12)
      .addSlot(Slots.SlotFoot, 20)
      .addAttribute(Attributes.AttributeArmor, 50, { min: 1, max: 50 })
      .addAttribute(Attributes.AttributeAttackSpeed, 50, { min: 1, max: 50 })
      .addAttribute(Attributes.AttributeHealth, 50, { min: 1, max: 50 })
      .addAttribute(Attributes.AttributeIntelligence, 50, { min: 1, max: 50 })
      .addAttribute(Attributes.AttributeStrength, 50, { min: 1, max: 50 });

    const item = randomItem.dropItem();

    expect(item).not.toBeNull();
    expect(item).toHaveProperty("_id");
    expect(item).toHaveProperty("_itemLevel");
    expect(item).toHaveProperty("_material");
    expect(item).toHaveProperty("_rarity");
    expect(item).toHaveProperty("_slot");
    expect(item).toHaveProperty("_type");
    expect(item.slot).not.toBeUndefined();
    expect(item.slot.code).toBe(Slots.SlotChest.code);

    if (item.rarity.code != "common") {
      expect(item).toHaveProperty("_attributes");
    }
  });

  test("if drop chance is correct", () => {
    const randomItem = new RandomItem(SEED);
    randomItem.addRarity(Rarities.RarityRare, 100);
    randomItem.addType(Types.TypeChest, 100);
    const _item = randomItem.dropItem();

    expect(_item.rarity).toBe(Rarities.RarityRare);
    expect(_item.type).toBe(Types.TypeChest);
  });

  test("if random item works from json", () => {
    const randomItem = RandomItem.fromJson({
      seed: SEED,
      name: "Test item from json",
      quality: { min: 50, max: 100 },
      itemLevel: { min: 10, max: 100 },
      rarities: [
        {
          rarity: Rarities.RarityCommon,
          chance: 50,
          value: 30,
        },
        {
          rarity: Rarities.RarityRare,
          chance: 30,
          value: 50,
        },
        {
          rarity: Rarities.RarityEpic,
          chance: 10,
          value: 60,
        },
        {
          rarity: Rarities.RarityLegendary,
          chance: 5,
          value: 60,
        },
        {
          rarity: Rarities.RarityMythic,
          chance: 5,
          value: 70,
        },
      ],
      attributes: [
        {
          attribute: Attributes.AttributeArmor,
          chance: 100,
          value: 200,
        },
        {
          attribute: Attributes.AttributeStrength,
          chance: 50,
          value: 20,
        },
        {
          attribute: Attributes.AttributeHealth,
          chance: 10,
          value: 50,
        },
      ],
      slots: [
        {
          slot: Slots.SlotChest,
          chance: 40,
        },
        {
          slot: Slots.SlotFinger,
          chance: 10,
        },
        {
          slot: Slots.SlotHead,
          chance: 10,
        },
        {
          slot: Slots.SlotHand,
          chance: 10,
        },
        {
          slot: Slots.SlotBack,
          chance: 10,
        },
        {
          slot: Slots.SlotLegs,
          chance: 10,
        },
        {
          slot: Slots.SlotShoulder,
          chance: 10,
        },
      ],
    });

    const itemDropped = randomItem.dropItem();
    expect(itemDropped).not.toBeNull();
    expect(itemDropped.itemLevel).toBe(17);
    expect(itemDropped.quality).toBe(57);
    expect(itemDropped.rarity).not.toBeUndefined();
    expect(itemDropped.rarity.code).toBe(Rarities.RarityMythic.code);
    expect(itemDropped.slot).not.toBeUndefined();
    expect(itemDropped.slot.code).toBe(Slots.SlotChest.code);
    expect(itemDropped.attributes).not.toBeNull();
    expect(itemDropped.attributes.length).toBe(3);
    expect(itemDropped.attributes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: Attributes.AttributeArmor.code,
        }),
      ]),
    );
  });
});
