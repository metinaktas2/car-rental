import type { Car } from "../components/types";

/**
 * Calculate daily rent price for a car in Turkish Liras
 * Based on Turkish car rental market standards as of 2024
 * @param car - Car object with properties
 * @returns Daily rent price in Turkish Liras
 */
export const getPrice = (car: Car): number => {
  // Base price in TL (Turkish Liras)
  let basePrice = 800;

  // Year factor - newer cars cost more
  const currentYear = new Date().getFullYear();
  const carYear = parseInt(car.year);
  const carAge = currentYear - carYear;

  if (carAge <= 1) {
    basePrice *= 1.8; // New cars
  } else if (carAge <= 3) {
    basePrice *= 1.5; // Nearly new
  } else if (carAge <= 5) {
    basePrice *= 1.2; // Recent models
  } else if (carAge <= 10) {
    basePrice *= 1.0; // Standard
  } else {
    basePrice *= 0.7; // Older cars
  }

  // Brand factor - premium brands cost more
  const premiumBrands = [
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Lexus",
    "Porsche",
    "Jaguar",
    "Land Rover",
  ];
  const luxuryBrands = [
    "Ferrari",
    "Lamborghini",
    "Bentley",
    "Rolls-Royce",
    "Maserati",
  ];
  const economyBrands = ["Dacia", "Fiat", "Renault", "Peugeot", "Citroën"];

  if (luxuryBrands.includes(car.make)) {
    basePrice *= 3.5;
  } else if (premiumBrands.includes(car.make)) {
    basePrice *= 2.2;
  } else if (economyBrands.includes(car.make)) {
    basePrice *= 0.9;
  }

  // Vehicle class factor
  const vclassMultipliers: { [key: string]: number } = {
    "Minicompact Cars": 0.7,
    "Subcompact Cars": 0.8,
    "Compact Cars": 0.9,
    "Midsize Cars": 1.0,
    "Large Cars": 1.3,
    "Small SUVs": 1.1,
    "Standard SUVs": 1.4,
    "Large SUVs": 1.8,
    "Small Pickup Trucks": 1.2,
    "Standard Pickup Trucks": 1.5,
    Vans: 1.6,
    Minivans: 1.3,
    "Two Seaters": 2.0,
    "Special Purpose Vehicle": 1.7,
  };

  if (vclassMultipliers[car.vclass]) {
    basePrice *= vclassMultipliers[car.vclass];
  }

  // Engine size factor (displacement)
  if (car.displ) {
    if (car.displ >= 4.0) {
      basePrice *= 4; // Large engines
    } else if (car.displ >= 2.5) {
      basePrice *= 3.3; // Medium-large engines
    } else if (car.displ >= 1.6) {
      basePrice *= 1.8; // Medium engines
    } else if (car.displ >= 1.0) {
      basePrice *= 1.0; // Small engines
    } else {
      basePrice *= 0.9; // Very small engines
    }
  }

  // Fuel type factor - electric and hybrid premium
  if (
    car.fueltype.includes("Electric") ||
    car.fueltype.includes("Electricity")
  ) {
    basePrice *= 1.4; // Electric cars premium
  } else if (car.fueltype.includes("Hybrid")) {
    basePrice *= 1.2; // Hybrid premium
  } else if (car.fueltype === "Diesel") {
    basePrice *= 1.1; // Diesel slight premium
  }

  // Fuel efficiency factor - more efficient cars have slight premium
  if (car.comb08 && car.comb08 > 35) {
    basePrice *= 1.1; // Very fuel efficient
  } else if (car.comb08 && car.comb08 < 15) {
    basePrice *= 1.2; // Gas guzzlers are specialty vehicles
  }

  // Transmission factor
  if (car.trany && car.trany.includes("Automatic")) {
    basePrice *= 1.2; // Automatic transmission premium
  }

  // Drive type factor
  if (car.drive === "All-Wheel Drive" || car.drive === "4-Wheel Drive") {
    basePrice *= 1.2; // AWD/4WD premium
  }

  // Turbo/Supercharger factor
  if (car.tcharger === "T" || car.scharger === "S") {
    basePrice *= 1.25; // Forced induction premium
  }

  // Special features factor
  if (car.startstop === "Y") {
    basePrice *= 1.05; // Start-stop technology
  }

  // Round to nearest 10 TL for cleaner pricing
  const finalPrice = Math.round(basePrice / 10) * 10;

  // Ensure minimum price of 300 TL and maximum of 15000 TL
  return Math.max(300, Math.min(15000, finalPrice));
};
