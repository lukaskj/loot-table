import { Attributes, Item, Materials, Rarities, Slots, Types } from "../src";

describe("Item", () => {
  test("basic item object and serialization", () => {
    const itemId = "Item-ID";
    const itemLevel = 10;
    const attackSpeedValue = 10;

    const item: Item = new Item();
    item.setRarity(Rarities.RarityEpic);
    item.setItemLevel(itemLevel);
    item.setId(itemId);
    item.setType(Types.TypeLegs);
    item.setMaterial(Materials.MaterialLeather);
    item.addAttribute(Attributes.AttributeAttackSpeed, attackSpeedValue);
    item.setSlot(Slots.SlotLegs);

    const serialized = item;

    expect(serialized.itemLevel).toStrictEqual(itemLevel);
    expect(serialized.id).toStrictEqual(itemId);
    expect(serialized.rarity.code).toStrictEqual(Rarities.RarityEpic.code);
    expect(serialized.material.code).toStrictEqual(Materials.MaterialLeather.code);
    expect(serialized.type.code).toStrictEqual(Types.TypeLegs.code);
    expect(serialized.slot.code).toStrictEqual(Slots.SlotLegs.code);

    const expectedAttribute = { ...Attributes.AttributeAttackSpeed, value: attackSpeedValue };
    expect(serialized.attributes[0]).toStrictEqual(expectedAttribute);
  });
});
