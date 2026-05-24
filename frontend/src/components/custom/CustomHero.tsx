import React, { useState } from "react";
import AOS from "aos";
import ButtonPrimary from "../custom/ButtonPrimary";
import { CustomHeroProps } from "@/utils/types";


const CustomHero = ({
  title,
  subtitle,
  description,
  linkRegister,
  image,
}: CustomHeroProps) => {
  React.useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
    });
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="max-w-screen-xl mx-auto">
        <div
          className={`w-full h-fit ${title === "IT Talkshow" ? "p-4 sm:p-20" : "p-4"
            } px-8`}
        >
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-3">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h1
                data-aos="fade-right"
                data-aos-delay="300"
                className="font-semibold text-invofest text-3xl sm:text-4xl lg:text-5xl"
              >
                {title}
              </h1>
              <h2
                data-aos="fade-right"
                data-aos-delay="450"
                className="font-semibold text-invofest text-xl sm:text-2xl lg:text-3xl"
              >
                {subtitle}
              </h2>
              <p
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-sm md:text-base lg:text-[1.35rem] sm:leading-[1.5rem] lg:leading-[2rem] text-slate-600"
              >
                {description}
              </p>
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mt-3">
                <ButtonPrimary
                  text="Daftar Sekarang"
                  dataAos="zoom-in"
                  delayAos="300"
                  isOutline={false}
                  isLink={false}
                  handleClick={(e) => {
                    e.preventDefault();
                    window.location.href = linkRegister; // pindah halaman
                  }}
                />


                {open && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white w-[90%] h-[80%] p-4 rounded-lg">
                      <button onClick={() => setOpen(false)}>Close</button>
                      <iframe src={linkRegister} className="w-full h-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <img
              src={image}
              alt="hero-landing-page"
              className={`w-[320px] ${title === "IT Seminar"
                ? // ? "sm:w-[360px]"
                // : "sm:w-[300px]"
                "sm:w-[460px]"
                : "sm:w-[400px]"
                }`}
              data-aos="fade-up"
              data-aos-delay="100"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomHero;
