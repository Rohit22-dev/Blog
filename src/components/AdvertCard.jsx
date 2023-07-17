import Image from "next/image";
import React from "react";
import advert from "../../public/images/advert.jpeg";

const AdvertCard = () => {
  return (
    <div className="w-full lg:w-[30%] h-fit bg-gray-100 lg:sticky top-[130px] rounded-md p-3 ">
      <div className="flex flex-col border-teal-500 border h-full rounded-md p-2">
        <div className="flex items-center justify-between">
          <h2 className="font-sans">Sponsored</h2>
          <p className="text-slate-500 text-sm italic ">Create ad</p>
        </div>
        <Image src={advert} alt="advert" className="rounded-md" />
        <div className="flex items-center justify-between">
          <h2 className="font-sans">MikaCosmetics</h2>
          <p className="text-slate-500 text-sm italic ">mikacosmetics.com</p>
        </div>
        <p className="text-sm mt-2">
          Your pathway to stunning and immaculate beauty and made sure your skin
          is exfoliating skin and shining like light.
        </p>
      </div>
    </div>
  );
};

export default AdvertCard;
