"use client";

import { useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function MongoDBTest() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const testConnection = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/test-db");
      const data = await response.json();

      if (data.success) {
        setMessage("✅ MongoDB connected successfully!");
      } else {
        setMessage("❌ MongoDB connection failed: " + data.message);
      }
    } catch (error) {
      setMessage(
        "❌ Error testing connection: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
        setMessage(`✅ Fetched ${data.data.length} users successfully!`);
      } else {
        setMessage("❌ Failed to fetch users: " + data.message);
      }
    } catch (error) {
      setMessage(
        "❌ Error fetching users: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ User created successfully!");
        setFormData({ name: "", email: "" });
        // Refresh the users list
        fetchUsers();
      } else {
        setMessage("❌ Failed to create user: " + data.message);
      }
    } catch (error) {
      setMessage(
        "❌ Error creating user: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        MongoDB Integration Test
      </h1>

      {/* Connection Test */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Database Connection</h2>
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
        >
          {loading ? "Testing..." : "Test MongoDB Connection"}
        </button>
      </div>

      {/* Create User Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <form onSubmit={createUser} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>

      {/* Fetch Users */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Users List</h2>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            {loading ? "Loading..." : "Fetch Users"}
          </button>
        </div>

        {users.length > 0 ? (
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user._id} className="border p-3 rounded">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No users found. Create a user or fetch from database.
          </p>
        )}
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("✅")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
