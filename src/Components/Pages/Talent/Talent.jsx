import "./Talent.css";
import { talents } from "../../Custom/Talent";
import { lazy } from "react";

const Talent = () => {
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
              <span className="label skills">Skills: </span>
              {item?.skills}
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
                    loading={lazy}
                  />
                ))
              : item.portfolio?.images && (
                  <img
                    className="talent-card__image"
                    src={item.portfolio.images}
                    alt={item.name}
                    loading={lazy}
                  />
                )}

            {item.portfolio?.videos?.length > 0 &&
              item.portfolio.videos.map((video, index) => (
                <video
                  key={index}
                  className="talent-card__video"
                  controls
                  preload="metadata"
                  style={{ borderRadius: "10px", width: "100%" }}
                  autoPlay
                  muted
                  loading={lazy}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}

            <button className="hire_btn">Connect </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Talent;
