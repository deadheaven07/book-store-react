import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_EACH_AUTHOR } from "../constants/route";
import { URL_PARAM_AUTHOR_NAME } from "../constants/general";
import { Heading } from "../components";

const Authors = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const authors = Array.from(new Set(products.map((book) => book.author)));
  //   console.log(authors);
  const [searchvalue, setSearchvalue] = useState("");

  return (
    <div className="w-full h-full flex flex-col">
      {/*  */}
      <Heading displayText={"All Authors"} />
      {/* Featured */}
      <section className="w-full h-10 flex-1">
        <div className="w-full h-full flex flex-col ">
          <div className="flex w-full">
            <h2 className="pl-8 text-xl font-semibold mb-2 flex items-center justify-center gap-3">
              <span>Search:</span>
              <input
                className="rounded-md py-1 px-3"
                placeholder="type to search"
                value={searchvalue}
                onChange={(e) => {
                  const trimmed = e.target.value.trim().toLowerCase();
                  setSearchvalue(trimmed);
                }}
              />
            </h2>
          </div>
          {/* mapping container */}
          <div className="w-full h-10 flex-1 flex flex-col overflow-y-auto justify-center items-center gap-2 pt-10">
            {/* eachbook */}
            {authors
              .filter((each) => each.toLowerCase().includes(searchvalue))
              .map((eachAuthor) => (
                <button
                  onClick={() => {
                    navigate(
                      `${ROUTE_EACH_AUTHOR}/?${URL_PARAM_AUTHOR_NAME}=${eachAuthor}`
                    );
                  }}
                  className="bg-green-400 px-4 py-2 min-w-max rounded-full"
                  key={eachAuthor}
                >
                  {eachAuthor}
                </button>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Authors;
