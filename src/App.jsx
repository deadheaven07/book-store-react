import { Suspense } from "react";
import { LoadingSpinner } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  ROUTE_AUTHORS,
  ROUTE_BOOKS,
  ROUTE_CART,
  ROUTE_EACH_AUTHOR,
  ROUTE_EACH_BOOK,
  ROUTE_ROOT,
} from "./constants/route";
import {
  Authors,
  Books,
  Cart,
  EachAuthor,
  EachBookPage,
  Homepage,
  NotFound,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import { IN_APP_NOTIFICATION_DEFAULT_TIME } from "./constants/general";
import { useSelector } from "react-redux";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={IN_APP_NOTIFICATION_DEFAULT_TIME}
        hideProgressBar={false}
        newestOnTop={true}
        transition={Slide}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        // limit={2}
      />
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
                <Route path={ROUTE_BOOKS} element={<Books />} />
                <Route path={ROUTE_AUTHORS} element={<Authors />} />
                <Route path={ROUTE_EACH_AUTHOR} element={<EachAuthor />} />
                <Route path={ROUTE_EACH_BOOK} element={<EachBookPage />} />
                <Route path={ROUTE_CART} element={<Cart />} />
                <Route path={"*"} element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

const NavBar = () => {
  const navigate = useNavigate();
  const totalQuantityInCart = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="w-full h-14 bg-orange-400 flex items-center">
      <div className="flex items-center justify-between gap-4 w-4/6 mx-auto">
        <button
          onClick={() => {
            navigate(ROUTE_ROOT);
          }}
          className="  text-white font-bold"
        >
          Home
        </button>
        <div className="flex  gap-6">
          <button
            onClick={() => {
              navigate(ROUTE_BOOKS);
            }}
            className="  text-white font-bold"
          >
            All Books
          </button>
          <button
            onClick={() => {
              navigate(ROUTE_AUTHORS);
            }}
            className="  text-white font-bold"
          >
            Authors
          </button>
          <button
            onClick={() => {
              navigate(ROUTE_CART);
            }}
            className="  text-white font-bold"
          >
            Cart{" "}
            <span className="border rounded-full p-1">
              {totalQuantityInCart}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
