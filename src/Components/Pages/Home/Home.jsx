import "./Home.css";
import { talents } from "../../Custom/Talent";

const Home = () => {
  return (
    <div className="home">
      <div className="talent-list">
        {talents.map((item) => (
          <div className="talent-card" key={item.id || item.name}>
            <img
              className="talent-card__avatar"
              src={item.avatar}
              alt={item.name}
            />
            <p>
              <span className="label">Name: </span>
              {item.name}
            </p>
            <p>
              <span className="label">Role: </span>
              {item.role}
            </p>
            <p>
              <span className="label">Experience: </span>
              {item.experience}
            </p>
            <p>
              <span className="label">Location: </span>
              {item.location}
            </p>
            <p>
              <span className="label">Bio: </span>
              {item.bio}
            </p>

            {Array.isArray(item.portfolio?.images)
              ? item.portfolio.images.map((img, idx) => (
                  <img
                    key={idx}
                    className="talent-card__image"
                    src={img}
                    alt={`${item.name} work ${idx + 1}`}
                  />
                ))
              : item.portfolio?.images && (
                  <img
                    className="talent-card__image"
                    src={item.portfolio.images}
                    alt={item.name}
                  />
                )}

            {item.portfolio?.videos && (
              <video
                className="talent-card__video"
                src={item.portfolio.videos}
                muted
                autoPlay
                loop
                controls
              />
            )}
            <button className="hire_btn">Connect </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
