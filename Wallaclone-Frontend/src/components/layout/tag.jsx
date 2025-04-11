export default function Tags() {
  return (
    <section className="tags">
      <h1 className="text-center text-2xl mb-6">SHOP</h1> {/* Título centrado con más espacio debajo */}
      <div className="flex justify-center gap-6 px-4"> {/* Centra las imágenes y agrega margen a los lados */}
        <div className="w-[20%]">
          <img src="/images/Decoracion.png" alt="Decoración" className="w-full object-contain mx-auto" />
          <p className="text-center">DECORACION</p>
        </div>
        <div className="w-[20%]">
          <img src="/images/Iluminacion.jpg" alt="Iluminación" className="w-full object-contain mx-auto" />
          <p className="text-center">ILUMINACION</p>
        </div>
        <div className="w-[20%]">
          <img src="/images/Menaje.png" alt="Menaje" className="w-full object-contain mx-auto" />
          <p className="text-center">MENAJE</p>
        </div>
        <div className="w-[20%]">
          <img src="/images/Textil.png" alt="Textil" className="w-full object-contain mx-auto" />
          <p className="text-center">TEXTIL</p>
        </div>
      </div>
    </section>
  );
}
