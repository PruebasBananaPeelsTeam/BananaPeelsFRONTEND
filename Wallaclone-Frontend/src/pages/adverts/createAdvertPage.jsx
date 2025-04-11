import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdvert } from '../../services/adverts-service.js';
import FormField from '../../components/shared/formField.jsx';
import Button from '../../components/shared/button.jsx';

const CreateAdvertPage = () => {
    const [FormData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        type: 'sell',
        image: null,
    })

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const habdleChange = (e) => {
        const {name, value, files} = e.target;
        if (files) {
            setFormData((prev) => ({...prev, [name]: files[0]}))
        } else {
            setFormData((prev) => ({...prev, [name]: value}))
        }
        
    };

    const hadlesubmit = async (e) => {
        e.preventDefault()

        const datatosend = new FormData()

        for (const key in FormData) {
            datatosend.append(key, FormData[key])
        }
        try {
            await createAdvert(datatosend)
            navigate('/adverts')
        }catch (err) {
            console.error(err)
            setError('Error creating advert. Please try again.')
        }
    }

    return(
        <div className="max-w-xl mx-auto mt-10 p-4 shadow-md bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear nuevo anuncio</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Nombre del producto"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormField
            label="Descripción"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <FormField
            label="Precio (€)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Tipo
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="flex w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(223,184,13)]"
              >
                <option value="sell">En venta</option>
                <option value="wanted">Se busca</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Imagen
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="flex w-full border border-gray-300 rounded-xl px-4 py-2"
              />
            </label>
          </div>
  
          <Button type="submit">Publicar anuncio</Button>
        </form>
      </div>
    )
}

export default CreateAdvertPage;