import type { FC } from "react";
import type { Car } from "../types";
import { motion, stagger } from "motion/react";
import { delay } from "motion";

interface Props {
  car: Car;
}

const Info: FC<Props> = ({ car }) => {
  const arr = [
    {
      icon: "/steering-wheel.svg",
      text: car?.trany || "Bilinmiyor",
    },
    {
      icon: "/tire.svg",
      text: car?.drive || "Bilinmiyor",
    },
    {
      icon: "/calendar.svg",
      text: car?.year || "Bilinmiyor",
    },
  ];

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2 },
    }),
  };
  return (
    <div className="flex-between">
      {arr.map((item, key) => (
        <motion.div
          custom={key}
          variants={variants}
          initial="hidden"
          animate="visible"
          key={key}
          className="flex-center flex-col gap-1"
        >
          <img src={item.icon} width={25} height={25} />
          <p>{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Info;
