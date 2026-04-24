import type { Car } from "../components/types";

const getImage = (car: Car, angle?: string, surrounding?: boolean): string => {
  const url = new URL(`https://cdn.imagin.studio/getImage`);

  url.searchParams.set("customer", "hrjavascript-mastery");
  url.searchParams.set("make", car.make);
  url.searchParams.set("modelFamily", car.model);
  url.searchParams.set("modelYear", car.year.toString());
  url.searchParams.set("randomPaint", "true");
  url.searchParams.set("zoomType", "fullscreen");
  url.searchParams.set("angle", angle || "23");

  if (surrounding) {
    url.searchParams.set("surrounding", "sur3");
    url.searchParams.set("viewPoint", "1");
    url.searchParams.set("aspectRatio", "16:10");
    url.searchParams.set("overlayArea", "none");
  }

  return url.href;
};

export default getImage;
