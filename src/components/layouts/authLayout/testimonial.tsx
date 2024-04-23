import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { testimonies } from "./constants";
import "./testimonial.css";

const Testimonial = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
        delay: 5000,
      },
      scrollbar: false,
      loop: true,
      grabCursor: true,
      mousewheel: {
        invert: true,
      },
      observer: true,
      speed: 500,
      spaceBetween: 200,
    });
  }, []);

  return (
    <div>
      <div className="swiper max-w-full mb-6">
        <div className="swiper-wrapper !h-max">
          {testimonies.map((el, i) => (
            <div
              key={el.id}
              className="swiper-slide bg-card-2 px-6 py-4 rounded-2xl !h-max"
            >
              <h3 className="sb-text-24 font-bold mb-1">{el.title}</h3>
              <p className="sb-text-16 font-normal mb-7">{el.details}</p>
              <div className="flex gap-2">
                <Image src={el.img} alt="testimonial user" />
                <div className="flex flex-col justify-center gap-2">
                  <p className="sb-text-16 font-semibold">{el.name}</p>
                  <p className="sb-text-14 font-normal">{el.profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-pagination !relative "></div>
    </div>
  );
};

export default Testimonial;
