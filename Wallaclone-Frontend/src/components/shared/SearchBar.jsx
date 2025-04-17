import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [filters, setFilters] = useState({
    name: '',
    priceMin: '',
    priceMax: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (filters.name) queryParams.append('name', filters.name);
    if (filters.priceMin) queryParams.append('priceMin', filters.priceMin);
    if (filters.priceMax) queryParams.append('priceMax', filters.priceMax);

    try {
      await navigate(`/?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error navigating:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-2 bg-white p-4 rounded-2xl shadow-md max-w-3xl py-1 md:py-2 mx-auto"
    >
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="🔍 Buscar..."
        className="flex-1 p-2 border rounded-xl placeholder-orange-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <input
        type="number"
        name="priceMin"
        value={filters.priceMin}
        onChange={handleChange}
        placeholder="Precio mínimo"
        className="w-24 p-2 border rounded-xl placeholder-orange-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <input
        type="number"
        name="priceMax"
        value={filters.priceMax}
        onChange={handleChange}
        placeholder="Precio máximo"
        className="w-24 p-2 border rounded-xl placeholder-orange-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <button
        type="submit"
        className={`p-2 px-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition duration-200 ${
          loading ? 'bg-orange-300 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? <span className="animate-spin">🔄</span> : 'Buscar'}
      </button>
    </form>
  );
}

export default SearchBar;
