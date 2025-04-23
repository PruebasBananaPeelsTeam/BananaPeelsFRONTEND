import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export default function Banner() {
  return (
    <section className="relative w-full mb-6 mt-6">
      {/* Texto centrado y por encima del carrusel */}
      <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 text-transparent bg-clip-text px-4 sm:px-6 py-2 sm:py-1 rounded-xl border border-white/10 backdrop-blur-sm bg-white/10">
      Welcome to BananaPeels
      </p>
      </div>


      {/* Carrusel de imágenes */}
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[400px] rounded-xl overflow-hidden"
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
  );
}
