import "./Footer.css";
import Icon from "../../Custom/Icon";
import { listItem } from "../../Custom/Footer";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";


const Footer = () => {
  return (
    <footer>
      <Icon className="footer_logo" />

      <ul>
        {listItem.map((item, id) => (
          <li key={id}>{item}</li>
        ))}
      </ul>

      <div className="footer_social">
        <FaXTwitter />
        <FaFacebook />
        <FaInstagram />
        <FaLinkedinIn />
      </div>

      <ul>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      <p className="footer_copy">© 2026 Your Company</p>
    </footer>
  );
};

export default Footer;
