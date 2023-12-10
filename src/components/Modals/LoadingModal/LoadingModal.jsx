import "../LoadingModal/LoadingModal.css";
import { spiral } from "ldrs";

spiral.register();

export const LoadingModal = () => {
  return (
    <div className="loadingModal">
      <h2 className="loadingModal__title">Please, wait some time!</h2>
      <l-spiral size="90" speed="0.9" color="#4d5ef6"></l-spiral>
    </div>
  );
};
