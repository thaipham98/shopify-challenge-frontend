/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { InventoryDataContext } from "../context";
import { Item } from "../types";

interface InventoryItemProps {
  item: Item;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item }) => {
  const { setModalMode, setSelectedItem } = useContext(InventoryDataContext);

  return (
    <tr className="bg-white border-b bg-gray-300 border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-black whitespace-nowrap"
      >
        {item.item_id}
      </th>
      <td className="px-6 py-4 text-black">{item.name}</td>
      <td className="px-6 py-4 text-black">{item.location}</td>
      <td className="px-6 py-4 text-black">{item.weather}</td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => {
            setSelectedItem(item);
            setModalMode("edit");
          }}
          className="px-4 py-0 text-sm text-blue-600 font-semibold rounded-full border border-blue-600 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 m-2"
        >
          Edit
        </button>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => {
            setSelectedItem(item);
            setModalMode("delete");
          }}
          className="px-4 py-0 text-sm text-red-600 font-semibold rounded-full border border-red-600 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1 m-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default InventoryItem;
