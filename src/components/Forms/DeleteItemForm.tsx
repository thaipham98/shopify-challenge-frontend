import { useContext, useState } from "react";
import { deleteItem } from "../../api";
import { InventoryDataContext } from "../../context";

/* eslint-disable jsx-a11y/anchor-is-valid */
const DeleteItemForm = ({
  showDeleteItemForm,
  itemId = 0,
}: {
  showDeleteItemForm: boolean;
  itemId?: number;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchInventoryData, setModalMode } = useContext(InventoryDataContext);

  const onDelete = async () => {
    setIsDeleting(true);
    const result = await deleteItem(itemId);
    if (!result.message) {
      await fetchInventoryData();
      setIsDeleting(false);
      setModalMode("");
    } else {
      setErrorMessage(result.message);
      setIsDeleting(false);
    }
  };

  return (
    <div
      id="modal"
      className={`${
        !showDeleteItemForm && "hidden"
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
              Delete item
            </h3>
            <div className="mb-4 text-m font-medium text-gray-900 dark:text-white">
              Are you sure you want to delete item with id: {itemId}?
            </div>
            {errorMessage && (
              <div className="block mb-2 text-sm font-medium text-red-500 dark:text-red-500">
                {errorMessage}
              </div>
            )}
            <button
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={isDeleting}
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemForm;
