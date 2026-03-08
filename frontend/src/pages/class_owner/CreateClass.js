import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";

function CreateClass() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    area: "",
    contact_number: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.city || !form.contact_number) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/classes/create/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Class created successfully! Waiting for admin approval.");

      setForm({
        name: "",
        description: "",
        address: "",
        city: "",
        area: "",
        contact_number: "",
      });

    } catch (err) {
      alert("❌ Error creating class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="class_owner">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Class
        </h2>

        <div className="space-y-4">

          <input
            name="name"
            placeholder="Class Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Class Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="area"
            placeholder="Area / Locality"
            value={form.area}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="contact_number"
            placeholder="Contact Number"
            value={form.contact_number}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Class"}
          </button>

        </div>
      </div>

    </DashboardLayout>
  );
}

export default CreateClass;
