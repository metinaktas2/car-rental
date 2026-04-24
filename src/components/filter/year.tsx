import { useState, type FC, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

const Year: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState<string | null>(
    searchParams.get("year") || null
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (year) {
      searchParams.set("year", year);
    } else {
      searchParams.delete("year");
    }
    setSearchParams(searchParams);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="text-white font-semibold mb-2 text-sm">Yıl</label>
      <div className="flex items-center">
        <input
          type="number"
          className="w-32 rounded-l-2xl input-bg"
          max={new Date().getFullYear()}
          onChange={(e) => setYear(e.target.value)}
          value={year || ""}
        />

        <button className="rounded-r-2xl input-bg">
          <img src="/search.svg" className="size-5 invert" />
        </button>
      </div>
    </form>
  );
};

export default Year;
