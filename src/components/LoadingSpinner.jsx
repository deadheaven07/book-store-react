import { images } from "../assets/images";

export const LoadingSpinner = ({ height = "h-12" }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className={`animate-spin ${height}`}
        src={images.loading}
        alt="loading spinner"
      />
    </div>
  );
};
