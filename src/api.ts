const API_URL = "https://shopify-intern-challenge-2022.thaipham98.repl.co";

export const getItemList = async () => {
  const response = await fetch(`${API_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    return { error: true };
  }
};

export const createItem = async (payload: {
  name: string;
  location: string;
}) => {
  const response = await fetch(`${API_URL}/items/add`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    return { error: true };
  }
};

export const editItem = async (payload: {
  item_id: number;
  name: string;
  location: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/items/edit`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    return { error: true };
  }
};

export const deleteItem = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/items/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    return { error: true };
  }
};
