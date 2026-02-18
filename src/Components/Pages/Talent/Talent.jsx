import "./Talent.css";
import { talents } from "../../Custom/Talent";
import { useState } from "react";

const Talent = () => {
const [connectedTalent, setConnectedTalent] = useState(null);
 const handleClick = (name) => {
   setConnectedTalent(name);
   setTimeout(() => setConnectedTalent(null), 4000);
 };

  return (
    <>
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
                {item.skills.join(", ")}
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
                      loading="lazy"
                    />
                  ))
                : item.portfolio?.images && (
                    <img
                      className="talent-card__image"
                      src={item.portfolio.images}
                      alt={item.name}
                      loading="lazy"
                    />
                  )}

              {item.portfolio?.videos?.length > 0 &&
                item.portfolio.videos.map((video, index) => (
                  <video
                    key={index}
                    className="talent-card__video"
                    style={{ borderRadius: "10px", width: "100%" }}
                    controls
                    muted
                    autoPlay
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}

              <button
                className="hire_btn"
                onClick={() => handleClick(item.name)}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {connectedTalent && (
        <div className="popup">
          <p>Connected with {connectedTalent}</p>
        </div>
      )}
    </>
  );
};

export default Talent;
