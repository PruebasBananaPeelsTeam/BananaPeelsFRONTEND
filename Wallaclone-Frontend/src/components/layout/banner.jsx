import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'

export default function Banner() {
  return (
    <section className="relative w-full mb-6 mt-20">
      {/* Texto motivador alineado abajo a la izquierda */}
      <div className="absolute bottom-12 left-8 z-20 text-left max-w-xl">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-tight">

          Convierte tu casa en el hogar de tus sueños.
        </h2>
        <p className="mt-4 text-xl sm:text-2xl text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">

          Descubre piezas únicas y dale vida a tus espacios.
        </p>
      </div>

      {/* Carrusel de imágenes */}
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[600px] overflow-hidden"
      >
        <SwiperSlide>
          <img
            src="/images/planta.webp"
            alt="Decoración 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/salon4.png"
            alt="Decoración 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/iluminacion2.png"
            alt="Decoración 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  )
}
