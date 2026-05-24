import React from "react";
import AOS from "aos";
import ButtonPrimary from "../custom/ButtonPrimary";
import heroITTalkshow from "/assets/Maskot-Talkshow.png";
import WhiteWaveTop from "/assets/wave-top.png";
import WhiteWaveBot from "/assets/wave-bot.png";

const ITTalkshowSec = () => {
  React.useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
    });
  }, []);

  return (
    <React.Fragment>
      <div className="bg-invofest_secondary w-full h-fit relative">
        <img src={WhiteWaveTop} alt="wave" className="w-full relative top-0" />

        <div className="max-w-screen-xl mx-auto py-20">
          <div className="w-full h-fit p-4 px-8">
            <div className="flex flex-col-reverse lg:flex-row-reverse justify-between items-center gap-5">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h1
                  data-aos="fade-right"
                  data-aos-delay="300"
                  className="font-semibold text-invofest text-3xl sm:text-4xl lg:text-5xl"
                >
                  IT Talkshow
                </h1>
                <p
                  data-aos="fade-right"
                  data-aos-delay="300"
                  className="text-sm md:text-base lg:text-[1.35rem] sm:leading-[1.5rem] lg:leading-[2rem] text-slate-600"
                >
                  Talkshow berskala nasional: “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan.”

                  Acara ini dirancang bukan untuk membahas teknologi sebagai entitas yang dingin dan terpisah, 
                  melainkan untuk menggali bagaimana kita dapat menanamkan nilai-nilai kemanusiaan—seperti empati, 
                  etika, dan kreativitas—ke dalam inti pengembangan AI. Kami akan mengupas tuntas visi masa depan di 
                  mana AI tidak menjadi pesaing, tetapi menjadi mitra kolaboratif yang memperkuat potensi unik manusia.

                  Talkshow ini bertujuan untuk menginspirasi generasi muda dan para penggiat teknologi untuk tidak hanya 
                  menjadi pengguna, tetapi juga menjadi arsitek masa depan digital yang lebih manusiawi. Mari bergabung 
                  untuk meningkatkan pengetahuan, mengembangkan potensi diri, dan menjadi bagian dari dialog penting dalam 
                  membentuk era kolaborasi manusia dan AI.
                </p>
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mt-3">
                  <ButtonPrimary
                    text={"DAFTAR IT TALKSHOW"}
                    dataAos={"zoom-in"}
                    delayAos={"300"}
                    isOutline={false}
                    isLink={true}
                    href="/talkshow"
                    handleClick={() =>
                      window.scrollTo({
                        top: 700,
                      })
                    }
                  />
                </div>
              </div>
              <img
                src={heroITTalkshow}
                alt="hero-landing-page"
                className="w-[320px] sm:w-[460px]"
                data-aos="fade-up"
                data-aos-delay="100"
              />
            </div>
          </div>
        </div>
        <img
          src={WhiteWaveBot}
          alt="wave"
          className="w-full relative bottom-0"
        />
      </div>
    </React.Fragment>
  );
};

export default ITTalkshowSec;
