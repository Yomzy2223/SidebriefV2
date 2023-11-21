"use client";
import { TestimonialCard } from "./testimonialcard";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper";
import { mockTestimonial } from "./constants";

import "swiper/css";
import "swiper/css/pagination";
import "./testimonial.css";

export const Testimonial = () => {
  return (
    <div className="">
      {/* <Swiper
				spaceBetween={30}
				// centeredSlides={true}
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true,
				}}
				className="swiper"
				autoHeight={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				// onAutoplayTimeLeft={(swiper, timeleft) => console.log(timeleft)}
			>
				{mockTestimonial.map((el, i) => (
					<SwiperSlide key={i}>
						<TestimonialCard {...el} />
					</SwiperSlide>
				))}
			</Swiper> */}
    </div>
  );
};
