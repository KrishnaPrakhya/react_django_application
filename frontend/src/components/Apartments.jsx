import React, { useState, useEffect } from "react";

function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [bedroomFilter, setBedroomFilter] = useState("");
  const [sortBy, setSortBy] = useState("-posted_date");
  const [newApartment, setNewApartment] = useState({
    city: "",
    rent: "",
    bedrooms: "",
    description: "",
  });

  const [editingApartment, setEditingApartment] = useState(null);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = "http://localhost:8000/api/apartments/?";
      if (cityFilter) url += `city=${cityFilter}&`;
      if (minRent) url += `min_rent=${minRent}&`;
      if (maxRent) url += `max_rent=${maxRent}&`;
      if (bedroomFilter) url += `bedrooms=${bedroomFilter}&`;
      if (sortBy) url += `sort=${sortBy}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch apartments");

      const data = await response.json();
      setApartments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/apartments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApartment),
      });

      if (!response.ok) throw new Error("Failed to add apartment");

      const data = await response.json();
      setApartments((prev) => [data, ...prev]);
      setNewApartment({ city: "", rent: "", bedrooms: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/apartments/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete apartment");

      setApartments((prev) => prev.filter((apt) => apt.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/apartments/${editingApartment.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingApartment),
        }
      );

      if (!response.ok) throw new Error("Failed to update apartment");

      const updatedApartment = await response.json();
      setApartments((prev) =>
        prev.map((apt) =>
          apt.id === updatedApartment.id ? updatedApartment : apt
        )
      );
      setEditingApartment(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [cityFilter, minRent, maxRent, bedroomFilter, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Apartments in India</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by City"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={bedroomFilter}
          onChange={(e) => setBedroomFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Bedrooms</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="-posted_date">Newest First</option>
          <option value="rent">Rent: Low to High</option>
          <option value="-rent">Rent: High to Low</option>
          <option value="bedrooms">Bedrooms: Low to High</option>
          <option value="-bedrooms">Bedrooms: High to Low</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Add New Apartment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            value={newApartment.city}
            onChange={(e) =>
              setNewApartment((prev) => ({ ...prev, city: e.target.value }))
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Rent"
            value={newApartment.rent}
            onChange={(e) =>
              setNewApartment((prev) => ({ ...prev, rent: e.target.value }))
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Bedrooms"
            value={newApartment.bedrooms}
            onChange={(e) =>
              setNewApartment((prev) => ({ ...prev, bedrooms: e.target.value }))
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newApartment.description}
            onChange={(e) =>
              setNewApartment((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Apartment
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-gray-500 mb-4">Loading...</div>}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apt) => (
          <div key={apt.id} className="border rounded p-4 shadow-sm">
            {editingApartment?.id === apt.id ? (
              // Edit Form
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={editingApartment.city}
                  onChange={(e) =>
                    setEditingApartment((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="p-2 border rounded w-full"
                  required
                />
                <input
                  type="number"
                  value={editingApartment.rent}
                  onChange={(e) =>
                    setEditingApartment((prev) => ({
                      ...prev,
                      rent: e.target.value,
                    }))
                  }
                  className="p-2 border rounded w-full"
                  required
                />
                <input
                  type="number"
                  value={editingApartment.bedrooms}
                  onChange={(e) =>
                    setEditingApartment((prev) => ({
                      ...prev,
                      bedrooms: e.target.value,
                    }))
                  }
                  className="p-2 border rounded w-full"
                  required
                />
                <input
                  type="text"
                  value={editingApartment.description}
                  onChange={(e) =>
                    setEditingApartment((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="p-2 border rounded w-full"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingApartment(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Display View
              <>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{apt.city}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingApartment(apt)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-lg font-bold text-green-600">₹{apt.rent}</p>
                <p className="text-gray-600">{apt.bedrooms} BHK</p>
                {apt.description && (
                  <p className="text-gray-500 mt-2">{apt.description}</p>
                )}
                <p className="text-sm text-gray-400 mt-2">
                  Posted: {new Date(apt.posted_date).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Apartments;
