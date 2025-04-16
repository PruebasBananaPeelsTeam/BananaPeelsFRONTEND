import { useState, useEffect } from 'react';
import { getTags } from '../../services/adverts-service';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [filters, setFilters] = useState({
    name: '',
    priceMin: '',
    priceMax: '',
    tag: '',
  });

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga del botón
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsFromAPI = await getTags();
        setTags(tagsFromAPI);
      } catch (error) {
        console.error('Error loading tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Iniciar carga

    const queryParams = new URLSearchParams();

    // Solo agregar los filtros que tengan valor
    if (filters.name) queryParams.append('name', filters.name);
    if (filters.priceMin) queryParams.append('priceMin', filters.priceMin);
    if (filters.priceMax) queryParams.append('priceMax', filters.priceMax);
    if (filters.tag) queryParams.append('tag', filters.tag);

    // Navegar a la página con los filtros aplicados
    try {
      await navigate(`/adverts?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error navigating:', error);
    } finally {
      setLoading(false); // Detener carga
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap md:flex-nowrap items-center gap-2 bg-white p-2 rounded-2xl shadow-md max-w-screen-md w-full mx-auto"
    >
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="🔍 Search..."
        className="flex-1 min-w-[120px] p-2 border rounded-xl placeholder-orange-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <input
        type="number"
        name="priceMin"
        value={filters.priceMin}
        onChange={handleChange}
        placeholder="Min price"
        className="w-24 p-2 border rounded-xl placeholder-orange-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <input
        type="number"
        name="priceMax"
        value={filters.priceMax}
        onChange={handleChange}
        placeholder="Max price"
        className="w-24 p-2 border rounded-xl placeholder-orange-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <select
        name="tag"
        value={filters.tag}
        onChange={handleChange}
        className="p-2 border rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        <option value="">All tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className={`p-2 px-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition duration-200 ${
          loading ? 'bg-orange-300 cursor-not-allowed' : ''
        }`}
        disabled={loading} // Deshabilita el botón cuando está enviando
      >
        {loading ? (
          <span className="animate-spin">🔄</span> // Icono de carga
        ) : (
          'Search'
        )}
      </button>
    </form>
  );
}

export default SearchBar;
