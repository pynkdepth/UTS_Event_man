import React, { useEffect } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import AOS from "aos";

export function MediaPartner() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
    });
  }, []);

  return (
    <React.Fragment>
      <div className="h-fit mt-4 sm:mt-8 lg:mt-16 rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
        <h1
          data-aos="fade-up"
          data-aos-delay="150"
          className="mt-8 text-[1.6rem] font-bold text-slate-600 sm:text-[40px]/[48px] text-center"
        >
          Media Partner <br className="block sm:hidden" /> <span className="text-invofest">INVOFEST 2025</span>
        </h1>
        <InfiniteMovingCards
          items={mediaPartner}
          direction="right"
          speed="slow"
        />
      </div>
    </React.Fragment>
  );
}

const mediaPartner = [
  {
    id: 1,
    img_path: "/assets/media_partner/BPM PNG.png",
  },
  {
    id: 2,
    img_path: "/assets/media_partner/LOGO HIMAPIK.jpg",
  },
  {
    id: 3,
    img_path: "/assets/media_partner/Logo BEM.png",
  },
  {
    id: 4,
    img_path: "/assets/media_partner/LOGO HMP D3 DKV.png",
  },
  {
    id: 5,
    img_path: "/assets/media_partner/LOGO HMP D3 PERHOTELAN.png",
  },
  {
    id: 6,
    img_path: "/assets/media_partner/logo HMTI UMMUS.png",
  },
  {
    id: 7,
    img_path: "/assets/media_partner/permikomnas.png",
  },
  {
    id: 8,
    img_path: "/assets/media_partner/PERMIKOMNAS RI.png",
  },
  {
    id: 9,
    img_path: "/assets/media_partner/LOGO HMP TEKNIK KOMPUTER .png",
  },
  {
    id: 10,
    img_path: "/assets/media_partner/logo info lomba IT.png",
  },
  {
    id: 11,
    img_path: "/assets/media_partner/LOGO HMTIKA.png",
  },
  {
    id: 12,
    img_path: "/assets/media_partner/lomba it ii.png",
  },
  {
    id: 13,
    img_path: "/assets/media_partner/HMP D3 TEKNIK MESIN UHN.png",
  },
  {
    id: 14,
    img_path: "/assets/media_partner/logo hima elektro.png",
  },
  {
    id: 15,
    img_path: "/assets/media_partner/Logo warga tech.png",
  },
  {
    id: 16,
    img_path: "/assets/media_partner/HMPTI_ITB_STIKOM_BALI.png",
  }
];
