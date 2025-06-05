import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";

function ItemTest() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const { getToken, isSignedIn } = useAuth();
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    if (!isSignedIn) {
      setItems([]);
      return;
    }
    try {
      setError(null);
      const token = await getToken();
      if (!token) {
        setError("Authentication token not available. Please sign in.");
        return;
      }

      const response = await fetch("http://localhost:8000/api/items/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(
          errorData.detail ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      setItems(data);
    } catch (e) {
      setError(e.message);
      console.error("Failed to fetch items:", e);
    }
  }, [getToken, isSignedIn]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) {
      setError("Item name cannot be empty.");
      return;
    }
    if (!isSignedIn) {
      setError("You must be signed in to add items.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) {
        setError("Authentication token not available. Please sign in again.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("http://localhost:8000/api/items/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newItemName,
          description: newItemDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(
          errorData.name ||
            errorData.description ||
            errorData.detail ||
            errorData.error ||
            `Failed to add item. Status: ${response.status}`
        );
      }

      const addedItem = await response.json();
      setItems((prevItems) => [addedItem, ...prevItems]);

      setNewItemName("");
      setNewItemDescription("");
    } catch (e) {
      setError(e.message);
      console.error("Failed to add item:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) {
    return <p>Please sign in to view and manage items.</p>;
  }

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleAddItem} style={{ marginBottom: "20px" }}>
        <div>
          <label htmlFor="itemName">Name: </label>
          <input
            type="text"
            id="itemName"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            required
            style={{
              marginRight: "10px",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="itemDescription">Description: </label>
          <input
            type="text"
            id="itemDescription"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "10px",
            padding: "8px 15px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          {isSubmitting ? "Adding..." : "Add Item"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h2>Items List</h2>
      {items.length === 0 && !error && (
        <p>Loading items or no items found...</p>
      )}
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: "5px",
              marginBottom: "5px",
            }}
          >
            <strong>{item.name}</strong>: {item.description || "No description"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemTest;
