import location from "../../../../../img/location.svg";
import date_icon from "../../../../../img/date.svg";
import price from "../../../../../img/price.svg";

export const OrderCard = ({ id, total, date, address }) => {
  return (
    <div className="orders__orderCard">
      <p className="orderCard__numberOrder">
        №<span className="numberOrder__span">{id}</span>
      </p>
      <div className="orderCard__viewInfo viewInfo__price">
        <img className="viewInfo__img" src={price} alt="total" />
        <p className="viewInfo__title">{total}$</p>
      </div>
      <div className="orderCard__viewInfo viewInfo__address">
        <img className="viewInfo__img" src={location} alt="address" />
        <p className="viewInfo__title">{address}</p>
      </div>
      <div className="orderCard__viewInfo viewInfo__date">
        <img className="viewInfo__img" src={date_icon} alt="date" />
        <p className="viewInfo__title">{date}</p>
      </div>
    </div>
  );
};
