import { Suspense } from "react";
import { LoadingSpinner } from "./components";
import { Route, Routes } from "react-router-dom";
import { ROUTE_ROOT } from "./constants/route";
import { Homepage } from "./pages";

function App() {
  return (
    <div className="h-screen w-screen bg-neutral-100 flex flex-col">
      <NavBar />
      <div className="h-10 w-full flex-grow ">
        <div className={`h-full w-full `}>
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center w-full h-full">
                <LoadingSpinner height={"h-8"} />
              </div>
            }
          >
            <Routes>
              {/* All pages are lazzily imported. See index.ts for exports */}
              <Route path={ROUTE_ROOT} element={<Homepage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;

const NavBar = () => {
  return (
    <div className="w-full h-14 bg-orange-400 flex items-center">
      <div className="flex items-center justify-between gap-4 w-4/6 mx-auto">
        <p className="  text-white font-bold">Home</p>
        <div className="flex  gap-6">
          <p className="  text-white font-bold">Books</p>
          <p className="  text-white font-bold">Authors</p>
          <p className="  text-white font-bold">Cart</p>
        </div>
      </div>
    </div>
  );
};
