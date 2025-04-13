export default function Banner() {
  return (
    <section className="relative w-full mb-6 mt-16">
      {' '}
      {/* Agregamos mt-16 para dar espacio arriba */}
      <div className="flex justify-center items-center space-x-4">
        {' '}
        {/* Contenedor flex para las dos imágenes */}
        <img
          src="/images/Banner1.png"
          alt="Banner"
          className="w-[45%] object-cover" // Imagen que ocupa el 45% del contenedor
        />
        <img
          src="/images/Banner1.png"
          alt="Banner"
          className="w-[45%] object-cover" // Imagen que ocupa el 45% del contenedor
        />
      </div>
      {/* Texto centrado sobre las imágenes */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[40px] font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 text-transparent bg-clip-text drop-shadow-2xl">
        <p>Welcome to our site!</p>
      </div>
    </section>
  )
}
