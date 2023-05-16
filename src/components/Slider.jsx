import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../assets/css/swiperStyles.css"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination } from "swiper";
import SliderCard from "./SliderCard";

const Slider = () => {
    const products = useSelector((state) => state.products)
    const [fruits, setFruits] = useState(null)

    useEffect(() => {
       setFruits(products?.filter((data) => data.product_category === "fruits"))
       console.log(fruits);
    }, [products]);

  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        modules={[Pagination]}
        className="mySwiper"
      >
            {fruits &&  fruits.map((data, i) => (
                <SwiperSlide key={i} >
                    <SliderCard key={i} data={data} index={i} />
                </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default Slider;
