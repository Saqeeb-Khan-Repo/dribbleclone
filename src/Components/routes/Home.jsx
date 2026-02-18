import { IoIosImages } from "react-icons/io";
import { SlPeople } from "react-icons/sl";
import { LuCalendarHeart } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import "./Home.css";
import { MdDownloadForOffline } from "react-icons/md";
import { BASE_URL } from "../api/Auth";
import { useEffect, useState } from "react";
import client from "../api/pexelsClient"; // <--- new

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState(""); // <--- new
  const [loading, setLoading] = useState(false); // optional

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

  // initial curated load
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.pexels.com/v1/curated?page=1&per_page=24",
          {
            headers: {
              Authorization: import.meta.env.VITE_API_KEY,
            },
          },
        );
        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (err) {
        console.error("Pexels fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // search handler using Pexels client
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const result = await client.photos.search({
        query,
        per_page: 24,
      }); // result.photos is array[web:48][web:57]
      setPhotos(result.photos || []);
    } catch (err) {
      console.error("Pexels search error:", err);
    } finally {
      setLoading(false);
    }
  };

 const handleCategory = async (categoryQuery) => {
   try {
     setLoading(true);

     // 1) search up to 80 photos for this category
     const result = await client.photos.search({
       query: categoryQuery,
       per_page: 80, // max allowed by Pexels
     });

     const photosArr = result.photos || [];

     // 2) shuffle and pick 24 random photos
     const shuffled = [...photosArr].sort(() => Math.random() - 0.5);
     const selected = shuffled.slice(0, 24);

     setPhotos(selected);
   } catch (error) {
     console.error("category search failed with an error:", error);
   } finally {
     setLoading(false);
   }
 };



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
        <button
          className="home_btn"
          onClick={() => handleCategory("wallpaper")}
        >
          <IoIosImages />
          wallpaper
        </button>
        <button
          className="home_btn"
          onClick={() => handleCategory("designers")}
        >
          <SlPeople />
          Designers
        </button>
        <button className="home_btn" onClick={() => handleCategory("nature")}>
          <LuCalendarHeart />
          Nature
        </button>
      </section>

      {/* search input + button wired to Pexels search */}
      <section className="section_search">
        <form onSubmit={handleSearch} className="search_form">
          <input
            type="search"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <IoSearchOutline />
          </button>
        </form>
      </section>

      <section className="section_popular">
        <strong>Popular:</strong>
        <button
          className="popular_btn"
          type="button"
          onClick={() => handleCategory("dashboard")}
        >
          dashboard
        </button>
        <button
          className="popular_btn"
          type="button"
          onClick={() => handleCategory("landing page")}
        >
          landing page
        </button>
        <button
          className="popular_btn"
          type="button"
          onClick={() => handleCategory("e-commerce")}
        >
          e-commerce
        </button>
        <button
          className="popular_btn"
          type="button"
          onClick={() => handleCategory("logo")}
        >
          logo
        </button>
        <button
          className="popular_btn"
          type="button"
          onClick={() => handleCategory("islam")}
        >
          Islamic
        </button>
      </section>

      <section className="webdesign">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          photos.map((photo) => (
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
          ))
        )}
      </section>
    </main>
  );
};

export default Home;
