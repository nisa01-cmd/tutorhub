import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

function SearchClasses() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchClasses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL} /api/classes/?city=${city}&area=${area}`
      );

      setClasses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="student">

      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6">
          Find Commerce Classes
        </h1>

        {/* Search Box */}
        <div className="bg-white shadow-md rounded-xl p-6 flex gap-4 mb-8">

          <input
            className="border p-3 rounded-lg w-full"
            placeholder="Enter City (ex: Pune)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            className="border p-3 rounded-lg w-full"
            placeholder="Enter Area (ex: Wakad)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <button
            onClick={searchClasses}
            className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">Searching classes...</p>
        )}

        {/* No Results */}
        {!loading && classes.length === 0 && (
          <p className="text-gray-500">No classes found.</p>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {classes.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/student/class/${c.id}`)}
              className="bg-white shadow-md rounded-xl p-5 cursor-pointer hover:shadow-xl transition"
            >

              <h2 className="text-xl font-semibold mb-2">
                {c.name}
              </h2>

              <p className="text-gray-600 mb-2">
                📍 {c.city}, {c.area}
              </p>

              <p className="text-gray-500 text-sm mb-4">
                {c.description}
              </p>

              <div className="flex justify-between items-center">

                <span className="text-sm text-gray-500">
                  Contact
                </span>

                <span className="font-semibold">
                  {c.contact_number}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default SearchClasses;
