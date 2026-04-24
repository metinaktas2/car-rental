import type { Car } from "../components/types";

type ReturnType = Array<[string, string | number | null]>;

const formatData = (car: Car): ReturnType => {
  const accepted = [
    "make",
    "model",
    "year",
    "fueltype",
    "cylinders",
    "drive",
    "trany",
    "vclass",
    "tcharger",
    "startstop",
    "co2",
    "displ",
    "atvtype",
  ];

  const arr = Object.entries(car).filter(([key]) => accepted.includes(key));

  return arr;
};

export default formatData;
