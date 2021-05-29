import { Attributes, Item, Materials, Rarities, Slots, Types } from "../src";

describe("Item", () => {
  test("basic item object and serialization", () => {
    const item: Item = new Item();
    item.setRarity(Rarities.RarityEpic);
    item.setItemLevel(10);
    item.setId("Item-ID");
    item.setType(Types.TypeLegs);
    item.setMaterial(Materials.MaterialLeather);
    item.addAttribute(Attributes.AttributeAttackSpeed, 10);
    item.setSlot(Slots.SlotLegs);

    const serialized = item;

    expect(serialized.itemLevel).toBe(10);
    expect(serialized.id).toBe("Item-ID");
    expect(serialized.rarity.code).toBe(Rarities.RarityEpic.code);
    expect(serialized.material.code).toBe(Materials.MaterialLeather.code);
    expect(serialized.type.code).toBe(Types.TypeLegs.code);
    expect(serialized.slot.code).toBe(Slots.SlotLegs.code);
  });
});
