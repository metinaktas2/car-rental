import type { FC } from "react";
import type { Car } from "../types";
import { motion, AnimatePresence } from "motion/react";
import Images from "./images";
import Info from "./info";

interface Props {
  car: Car;
  isOpen: boolean;
  close: () => void;
}

const Modal: FC<Props> = ({ car, isOpen, close }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-md grid place-items-center p-4">
          <motion.div
            initial={{ scale: 0.1, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.1, y: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="car-details-dialog-panel w-[95%] sm:min-w-[600px] min-h-[70vh]"
          >
            <button
              onClick={close}
              className="car-details-close-btn cursor-btn"
            >
              X
            </button>
            <Images car={car} />
            <Info car={car} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
