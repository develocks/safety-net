import Loader from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={150} width={150} />
    </div>
  );
}
