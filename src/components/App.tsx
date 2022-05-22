import { useCallback, useEffect, useState } from "react";
import AddItemForm from "./Forms/AddItemForm";
import { CSVLink } from "react-csv";
import { InventoryDataContext } from "../context";
import ItemList from "./ItemList";
import { getItemList } from "../api";
import EditItemForm from "./Forms/EditItemForm";
import { Item } from "../types";
import DeleteItemForm from "./Forms/DeleteItemForm";
import Spinner from "./Spinner";

function App() {
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchInventoryData();
      setIsLoading(false);
    })();
  }, []);

  const fetchInventoryData = async () => {
    const result = await getItemList();
    if (!result.error) {
      setInventoryData(result);
    }
  };

  const generateCSV = useCallback(() => {
    const csv = inventoryData.map((item: Item) => {
      return [item.item_id, item.name, item.location, item.weather];
    });
    return csv;
  }, [inventoryData]);

  return (
    <InventoryDataContext.Provider
      value={{
        inventoryData: inventoryData,
        fetchInventoryData: fetchInventoryData,
        setModalMode: setModalMode,
        setSelectedItem: setSelectedItem,
      }}
    >
      <div className="App p-2">
        {isLoading ? <Spinner /> : <ItemList />}
        <button className="px-4 py-0 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1 m-2">
          <CSVLink data={generateCSV()}>Download me</CSVLink>
        </button>
        <button
          onClick={() => {
            setModalMode("add");
          }}
          className="px-4 py-0 text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1 m-2"
        >
          Create item
        </button>
        {modalMode === "add" && (
          <AddItemForm showAddItemForm={modalMode === "add"} />
        )}
        {modalMode === "edit" && (
          <EditItemForm
            showEditItemForm={modalMode === "edit"}
            item={selectedItem}
          />
        )}
        {modalMode === "delete" && (
          <DeleteItemForm
            showDeleteItemForm={modalMode === "delete"}
            itemId={selectedItem?.item_id}
          />
        )}
      </div>
    </InventoryDataContext.Provider>
  );
}

export default App;
