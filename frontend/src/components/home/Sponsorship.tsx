import React, { useEffect } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import AOS from "aos";

export function Sponsorship() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
    });
  }, []);

  return (
    <React.Fragment>
      <div className="h-fit mt-4 sm:mt-8 lg:mt-16 py-10 sm:py-16 rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
        {/* Judul Sponsor */}
        <h1
          data-aos="fade-up"
          data-aos-delay="150"
          className="mb-2 text-2xl font-bold text-slate-600 sm:text-[40px]/[48px] text-center"
        >
          Sponsor <span className="text-invofest">INVOFEST 2025</span>
        </h1>

        {/* Logo Scroller */}
        <InfiniteMovingCards
          items={sponsorLogo}
          direction="right"
          speed="slow"
        />

      </div>
    </React.Fragment>
  );
}

const sponsorLogo = [
  {
    id: 1,
    img_path: "/assets/sponsor/bahari_inn.jpg",
    // link: "https://bahariinn.co.id"
  },
  {
    id: 2,
    img_path: "/assets/sponsor/big_berry.png",
    // link: "https://bigberry.id"
  },
  {
    id: 3,
    img_path: "/assets/sponsor/indo_print.jpg",
    // link: "https://indoprint.co.id"
  },
  {
    id: 4,
    img_path: "/assets/sponsor/plaza_hotel_tegal.jpg",
    link: "https://plazategal.hoteltegal.com"
  },
  {
    id: 5,
    img_path: "/assets/sponsor/dicoding_official.png",
    link: "https://www.dicoding.com"
  },
  {
    id: 6,
    img_path: "/assets/sponsor/domainesia.png",
    link: "https://www.domainesia.com"
  },
];
