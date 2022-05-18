import { useContext } from "react";
import { InventoryDataContext } from "../context";
import InventoryItem from "./InventoryItem";

const ItemList = () => {
  const { inventoryData } = useContext(InventoryDataContext);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-xl text-gray-700 uppercase bg-gray-50">Item list</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Weather
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <InventoryItem key={item.item_id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
