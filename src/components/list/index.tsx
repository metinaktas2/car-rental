import { useEffect, useRef, useState, type FC } from "react";
import { fetchCars } from "../../service";
import type { Car } from "../types";
import Card from "./card";
import Warning from "./warning";
import Loader from "../loader";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const List: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[] | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  //listenin başındaki elemanın referansı
  const firstCardRef = useRef<HTMLDivElement>(null);

  //Url'deki arama parametrelerine eriş
  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const year = searchParams.get("year") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    setLoading(true);

    fetchCars(make, model, year, page)
      .then((data) => {
        setCars(data.results);
        setTotalCount(data.total_count);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [make, model, year, page]);

  if (loading)
    return (
      <Warning>
        <Loader />
      </Warning>
    );
  if (error) return <Warning>Hata:{error}</Warning>;
  if (!cars || cars?.length < 1)
    return <Warning>Araç Verisi Bulunamadı...</Warning>;
  return (
    <div className="padding-x max-width mb-8">
      <section className="home-cars-wrapper">
        {cars.map((car, index) => (
          <div key={car.id} ref={index === 0 ? firstCardRef : null}>
            <Card car={car} />
          </div>
        ))}
      </section>

      {totalCount && (
        <ReactPaginate
          pageCount={Math.ceil(totalCount / 10)}
          className="pagination"
          nextLabel=">"
          previousLabel="<"
          pageRangeDisplayed={5}
          initialPage={Number(page) - 1}
          onPageChange={(e) => {
            searchParams.set("page", (e.selected + 1).toString());
            setSearchParams(searchParams);
            if (firstCardRef.current && page !== "1") {
              firstCardRef.current.scrollIntoView();
            }
          }}
        />
      )}
    </div>
  );
};

export default List;
