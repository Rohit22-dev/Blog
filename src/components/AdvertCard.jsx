import Image from "next/image";
import React, { useState } from "react";
import advert from "../../public/images/advert.jpeg";
import shoes from "../../public/images/shoes.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AdvertCard = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSlideChange = (index) => {
    setActiveSlideIndex(index);
  };

  const slides = [
    {
      title: "Sponsored",
      website: "mikacosmetics.com",
      image: advert,
      description:
        "Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like light.",
    },
    {
      title: "Sponsored",
      website: "nike.com",
      image: shoes,
      description:
        "Discover the latest trends in cosmetics and enhance your beauty with MikaCosmetics products.",
    },
  ];

  const activeSlide = slides[activeSlideIndex];

  return (
    <div className="h-fit bg-gray-100 rounded-md p-3">
      <div className="flex flex-col border-teal-500 border h-full rounded-md p-2">
        <div className="flex items-center justify-between">
          <h2 className="font-sans">Sponsored</h2>
          <p className="text-slate-500 text-sm italic">Create ad</p>
        </div>
        <Carousel
          infiniteLoop
          interval={5000}
          autoPlay
          onChange={handleSlideChange}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative h-64 w-full">
              <Image
                src={slide.image}
                alt={`slide-${index}`}
                className="rounded-md"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </Carousel>
        <div className="flex items-center justify-between">
          <h2 className="font-sans">{activeSlide.title}</h2>
          <p className="text-slate-500 text-sm italic">{activeSlide.website}</p>
        </div>
        <p className="text-sm mt-2">{activeSlide.description}</p>
      </div>
    </div>
  );
};

export default AdvertCard;
