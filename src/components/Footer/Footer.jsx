import icon_instagram from "../../img/icon-instagram.svg";
import icon_facebook from "../../img/icon-facebook.svg";
import icon_tiktok from "../../img/icon-tiktok.svg";
import icon_telegram from "../../img/icon-telegram.svg";
import "../Footer/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__col coloumn_01">
        <h2 className="col__title">Document</h2>
        <p className="col__text">General conditions</p>
        <p className="col__text">Sentence archive</p>
        <p className="col__text">Collection</p>
        <p className="col__text">Certificate</p>
      </div>
      <div className="footer__col coloumn_02">
        <h2 className="col__title">Service</h2>
        <p className="col__text">Shops</p>
        <p className="col__text">About us</p>
        <p className="col__text">For cooperation</p>
        <p className="col__text">Repetition</p>
        <p className="col__text">Promo codes</p>
      </div>
      <div className="footer__col coloumn_03">
        <h2 className="col__title">Product catalog</h2>
        <p className="col__text">Catalog 1</p>
        <p className="col__text">Catalog 2</p>
        <p className="col__text">Catalog 3</p>
        <p className="col__text">Catalog 4</p>
        <p className="col__text">Catalog 5</p>
        <p className="col__text">Catalog 6</p>
      </div>
      <div className="footer__col coloumn_04">
        <h2 className="col__title">Information service</h2>
        <p className="col__text">contact.@nextstore.uz</p>
        <p className="col__text">
          +998 97 712 96 96 <br />
          +998 95 503 09 09
        </p>
        <p className="col__text">
          One Apple Park Way, <br /> Cupertino, California, USA
        </p>
        <div className="col__socialNetworks">
          <img
            className="socialNetworks__img"
            src={icon_instagram}
            alt="icon instagram"
          />
          <img
            className="socialNetworks__img"
            src={icon_facebook}
            alt="icon facebook"
          />
          <img
            className="socialNetworks__img"
            src={icon_telegram}
            alt="icon telegram"
          />
          <img
            className="socialNetworks__img"
            src={icon_tiktok}
            alt="icon tiktok"
          />
        </div>
      </div>
      <div className="footer__horizontalLine"></div>
      <p className="footer__name col__text">2023 Nextstore.com</p>
      <p className="footer__text col__text">Powered by</p>
    </footer>
  );
};
