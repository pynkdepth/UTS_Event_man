import React from "react";
import WhiteWaveTop from "/assets/wave-top.png";
import WhiteWaveBot from "/assets/wave-bot.png";
import CardAbout from "../custom/CardAbout";
import AOS from "aos";

const About = () => {
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
          <div className="w-full h-fit px-8 flex flex-col gap-3 sm:gap-4">
            <h1
              data-aos="fade-right"
              data-aos-delay="300"
              className="font-semibold text-invofest text-3xl sm:text-4xl lg:text-5xl"
            >
              Tentang INVOFEST
            </h1>
            <p
              data-aos="fade-right"
              data-aos-delay="450"
              className="text-sm md:text-base lg:text-[1.35rem] sm:leading-[1.5rem] lg:leading-[2rem] text-slate-600"
            >
              Invofest 2025, yang diselenggarakan oleh sarjana terapan Teknik Informatika
              Universitas Harkat Negeri, adalah festival tahunan yang bertujuan untuk menginspirasi
              dan memberdayakan generasi muda Indonesia dalam menghadapi era
              digital. Dengan mengusung tema <b>“Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow ”</b>. Invofest 2025
              menghadirkan berbagai kegiatan menarik seperti kompetisi IT,
              workshop IT, dan seminar nasional & talkshow dengan para ahli
              teknologi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-3 gap-5">
              <CardAbout
                dataAos="zoom-in"
                delayAos="150"
                btnText="INFO SELENGKAPNYA"
                desc="Seminar nasional ini membahas “Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif” untuk mengembangkan potensi diri dan pengetahuan teknologi lebih dalam lagi."
                title="IT Seminar"
                href="/seminar"
              />
              <CardAbout
                dataAos="zoom-in"
                delayAos="350"
                btnText="INFO SELENGKAPNYA"
                desc="Talkshow “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan” membahas peran manusia dalam memanfaatkan AI untuk solusi berkelanjutan dan peningkatan teknologi."
                title="IT Talkshow"
                href="/talkshow"
              />
              <CardAbout
                dataAos="zoom-in"
                delayAos="550"
                btnText="INFO SELENGKAPNYA"
                desc="Kompetisi “From Creation to Innovation” mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki potensi luar biasa, yang mampu mewujudkan masa depan yang berkelanjutan."
                title="IT Competition"
                href="/competition"
              />
              <CardAbout
                dataAos="zoom-in"
                delayAos="750"
                btnText="INFO SELENGKAPNYA"
                desc="Workshop 'AI for a Sustainable Future: The Role of Z Generation in the Digital Era' membekali Gen Z dengan keterampilan praktis AI untuk menciptakan solusi berkelanjutan."
                title="IT Workshop"
                href="/workshop"
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

export default About;
