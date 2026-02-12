import "./GetHired.css";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AiOutlineBook } from "react-icons/ai";

const GetHired = () => {
  return (
    <main className="hired_container">
      <section className="hired_section">
        <span>
          <HiOutlineSpeakerphone /> NEW OPPORTUNITY DAILY
        </span>
        <h1>Project Breif</h1>
        <p>
          Browse open projects from clients hiring the top design and
          development talent on Dribbble
        </p>
        <h6>Last 30 Days</h6>
        <span>
          <AiOutlineBook /> 1,000+ Breifs
        </span>
        <span>
          <FaMoneyCheckAlt /> $2.5M+ Project Value
        </span>
      </section>
      <section className="hired_image">
        <img
          src="https://cdn.dribbble.com/uploads/67630/original/a68316d63bc9ae7fcd287f0a501d3369.webp?1769019715"
          alt="hired"
        />
      </section>
    </main>
  );
};

export default GetHired;
