import { useMemo, useState, type FC, type FormEvent } from "react";
import ReactSelect from "react-select";
import { makes, selectStyles } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import { label } from "motion/react-client";

const SearchBar: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [make, setMake] = useState<string | null>(
    searchParams.get("make") || null
  );
  const [model, setModel] = useState<string | null>(
    searchParams.get("model") || null
  );

  //Markalar dizisini react-select in istediği formata çevir
  const options = useMemo(
    () => [
      { label: "Tüm Markalar", value: null },
      ...makes.map((make) => ({ label: make, value: make })),
    ],
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (make) {
      searchParams.set("make", make);
    } else {
      searchParams.delete("make");
    }
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    setSearchParams(searchParams);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="searchbar flex gap-4 items-end justify-center"
    >
      {/* Marka */}
      <div className="searchbar-item items-end">
        <div className="w-full flex flex-col z-49">
          <label className="font-semibold mb-2 text-sm" htmlFor="">
            Marka
          </label>
          <ReactSelect
            options={options}
            styles={selectStyles}
            onChange={(option) => setMake(option!.value)}
            value={
              make
                ? { label: make, value: make }
                : { label: "Tümü", value: null }
            }
          />
        </div>
        <button className="search-btn mb-1 sm:hidden">
          <img src="/search.svg" className="size-6 invert" />
        </button>
      </div>
      {/* Model */}
      <div className="searchbar-item items-start flex flex-col">
        <label className="text-white font-semibold mb-2 text-sm">Model</label>
        <div className="w-full flex items-center">
          <div className="relative flex-1">
            <img
              src="/model-icon.png"
              className="size-6 absolute left-4 top-1/2 -translate-y-1/2 z-1"
            />

            <input
              type="text"
              className="searchbar-input"
              placeholder="Model Yazınız..."
              onChange={(e) => setModel(e.target.value)}
              value={model || ""}
            />
          </div>
          <button className="search-btn">
            <img src="/search.svg" className="size-6 invert" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
