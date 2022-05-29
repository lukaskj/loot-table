import { Attributes, Materials, Rarities, Slots, Types } from "../..";

export interface ItemJsonInterface {
  id: string;
  name: string;
  itemLevel: number;
  quality: number;
  rarity: Rarities.RarityInterface;
  attributes: Attributes.AttributeInterface[];
  material: Materials.MaterialInterface;
  slot: Slots.SlotInterface;
  type: Types.TypeInterface;
}
