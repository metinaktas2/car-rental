import type { FC } from "react";
import Button from "../button";
import { motion } from "motion/react";

const Hero: FC = () => {
  return (
    <div className="hero padding-x padding-y">
      <div className="pt-20 xl:flex-1 max-h-[920px]">
        <motion.h1
          className="hero-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1, ease: "easeInOut" }}
        >
          Özgürlüğü Hisset, Yolculuğa Başla
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
        >
          Altın standartta hizmetle unutulmaz bir yolculuğa hazır mısın? Araç
          kiralama deneyimini Altın seçenekleri ile taçlandırarak her anını özel
          kılabilirsin.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
        >
          <Button text="Arabaları Keşfet" designs="mt-12" />
        </motion.div>
      </div>
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
          className="relative max:md:min-h-[250px]"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary-blue/30 to-accent/30 rounded-full blur-3xl -z-10" />
          <img
            src="/hero.png"
            className="object-contain xl:w-[600px] xl-h-[477px] drop-shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
