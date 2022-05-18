import { createContext } from "react";
import { Item } from "./types";

export const InventoryDataContext = createContext<{
  inventoryData: Item[];
  fetchInventoryData: () => void;
  setModalMode: (mode: string) => void;
  setSelectedItem: (item: Item) => void;
}>({
  inventoryData: [],
  fetchInventoryData: () => {},
  setModalMode: () => {},
  setSelectedItem: () => {},
});
