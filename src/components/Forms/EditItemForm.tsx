import { useContext, useState } from "react";
import { editItem } from "../../api";
import { InventoryDataContext } from "../../context";
import { Item } from "../../types";

/* eslint-disable jsx-a11y/anchor-is-valid */
const EditItemForm = ({
  showEditItemForm,
  item = null,
}: {
  showEditItemForm: boolean;
  item: Item | null;
}) => {
  const { setModalMode, fetchInventoryData } = useContext(InventoryDataContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState(item?.name || "");
  const [location, setLocation] = useState(item?.location || "");
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = async (e: any) => {
    e.preventDefault();
    setIsEditing(true);
    const result = await editItem({
      item_id: item?.item_id || 0,
      name,
      location,
    });
    if (!result.message) {
      await fetchInventoryData();
      setIsEditing(false);
      setModalMode("");
    } else {
      setErrorMessage(result.message);
      setIsEditing(false);
    }
  };

  return (
    <div
      id="modal"
      className={`${
        !showEditItemForm && "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-50 left-0 right-0 z-50 w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={() => setModalMode("")}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Edit item
            </h3>
            <form className="space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Item name
                </label>
                <input
                  type="text"
                  value={name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={(e) => {
                    setErrorMessage("");
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  City name
                </label>
                <input
                  type="text"
                  value={location}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={(e) => {
                    setErrorMessage("");
                    setLocation(e.target.value);
                  }}
                />
              </div>
              {errorMessage && (
                <div className="block mb-2 text-sm font-medium text-red-500 dark:text-red-500">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onEdit}
                disabled={isEditing}
              >
                Edit confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemForm;
