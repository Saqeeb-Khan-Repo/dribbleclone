import { IoIosImages } from "react-icons/io";
import { SlPeople } from "react-icons/sl";
import { LuCalendarHeart } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import "./Home.css";
import { MdDownloadForOffline } from "react-icons/md";
import { BASE_URL } from "../api/Auth";
import { useEffect, useState } from "react";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  const handleImageDownload = (imageUrl, filename) => {
    const apiUrl = `${BASE_URL}/api/download/image?url=${encodeURIComponent(
      imageUrl,
    )}&filename=${encodeURIComponent(filename)}`;

    const link = document.createElement("a");
    link.href = apiUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          "https://api.pexels.com/v1/curated?page=1&per_page=24",
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY, // your Pexels API key
            },
          },
        );
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (err) {
        console.error("Pexels fetch error:", err);
      }
    };

    fetchImages();
  }, []);

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
        {photos.map((photo) => (
          <div key={photo.id} className="design-card">
            <div className="design-image">
              <img
                src={photo.src.large}
                alt={photo.alt || `Photo by ${photo.photographer}`}
                loading="lazy"
              />
              <span className="category-badge">
                {photo.photographer || "Pexels"}
              </span>
            </div>
            <div className="design-info">
              <h3>{photo.alt || "Untitled shot"}</h3>
              <p className="author">by {photo.photographer}</p>
              <div className="rating-price">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? "filled" : "empty"} />
                  ))}
                  <span>(4.0)</span>
                </div>
                <div className="price">Free</div>
                <button
                  onClick={() =>
                    handleImageDownload(
                      photo.src.original,
                      `${(photo.alt || "pexels-photo")
                        .replace(/\s+/g, "-")
                        .toLowerCase()}.jpg`,
                    )
                  }
                  className="download"
                  type="button"
                >
                  <MdDownloadForOffline />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
