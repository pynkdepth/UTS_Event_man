import React from "react";
import AOS from "aos";
import heroITWorkshop from "/assets/Maskot-Workshop.png";
import ButtonPrimary from "../custom/ButtonPrimary";

const ITWorkshopSec = () => {
  React.useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
    });
  }, []);

  return (
    <React.Fragment>
      <div className="max-w-screen-xl mx-auto">
        <div className="w-full h-fit p-4 px-8">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-3">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h1
                data-aos="fade-right"
                data-aos-delay="300"
                className="font-semibold text-invofest text-3xl sm:text-4xl lg:text-5xl"
              >
                IT Workshop
              </h1>
              <p
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-sm md:text-base lg:text-[1.35rem] sm:leading-[1.5rem] lg:leading-[2rem] text-slate-600"
              >
                Workshop "AI for a Sustainable Future: The Role of Z Generation in the Digital Era” 
                ini menjembatani antara potensi Generasi Z dan kekuatan AI untuk menciptakan masa depan 
                yang berkelanjutan. Peserta akan dibekali wawasan dan alat untuk mentransformasi ide-ide 
                inovatif menjadi solusi lingkungan yang nyata dan terukur di era digital.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mt-3">
                <ButtonPrimary
                  text={"DAFTAR IT WORKSHOP"}
                  dataAos={"zoom-in"}
                  delayAos={"300"}
                  isOutline={false}
                  isLink={true}
                  href="/workshop"
                  handleClick={() =>
                    window.scrollTo({
                      top: 700,
                    })
                  }
                />
              </div>
            </div>
            <img
              src={heroITWorkshop}
              alt="hero-landing-page"
              className="w-[320px] sm:w-[460px]"
              data-aos="fade-up"
              data-aos-delay="100"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ITWorkshopSec;
