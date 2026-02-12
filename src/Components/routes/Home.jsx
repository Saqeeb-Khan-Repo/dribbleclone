import { IoIosImages } from "react-icons/io";
import { SlPeople } from "react-icons/sl";
import { LuCalendarHeart } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { Designs } from "../Custom/WebDesign";
import { FaStar } from "react-icons/fa"; // npm i react-icons
import "./Home.css"


const Home = () => {
  return (
    <main className="main_container">
      <section className="section_head">
        <h1>Discover the World's Top Designers</h1>
        <p>
          Explore work from the most talented and accomplished designers ready
          to take on your next project
        </p>
      </section>

      <section className="section_btn">
        <button className="home_btn">
          <IoIosImages />
          Shots
        </button>
        <button className="home_btn">
          <SlPeople />
          Designers
        </button>
        <button className="home_btn">
          <LuCalendarHeart />
          Services
        </button>
      </section>

      <section className="section_search">
        <input type="search" placeholder="What are you looking for?" />
        <span>
          <IoSearchOutline />
        </span>
      </section>

      <section className="section_popular">
        <strong>Popular:</strong>
        <button className="popular_btn">dashboard</button>
        <button className="popular_btn">landing page</button>
        <button className="popular_btn">e-commerce</button>
        <button className="popular_btn">logo</button>
        <button className="popular_btn">card</button>
      </section>

      <section className="webdesign">
        {Designs.map((item) => (
          <div key={item.id} className="design-card">
            <div className="design-image">
              <img
                src={item.image}
                alt={`${item.title} by ${item.author}`}
                loading="lazy"
              />
              <span className="category-badge">{item.category}</span>
            </div>
            <div className="design-info">
              <h3>{item.title}</h3>
              <p className="author">by {item.author}</p>
              <div className="rating-price">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(item.rating) ? "filled" : "empty"
                      }
                    />
                  ))}
                  <span>({item.rating})</span>
                </div>
                <div className="price">${item.price}</div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
