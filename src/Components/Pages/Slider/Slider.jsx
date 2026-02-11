import { categories } from "../../Custom/SliderData";
import "./Slider.css";

const Slider = () => {
  return (
    <section className="slider-section">
      <h2 className="slider-title">Browse by category</h2>

      <div className="slider-track">
        {categories.map((item) => (
          <div className="slider-card" key={item.id}>
            <img
              className="slider-card-image"
              src={item.image}
              alt={item.name}
            />
            <h3 className="slider-card-title">{item.name}</h3>
          </div>
        ))}

        {categories.map((item) => (
          <div className="slider-card" key={`${item.id}-dup`}>
            <img
              className="slider-card-image"
              src={item.image}
              alt={item.name}
            />
            <h3 className="slider-card-title">{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Slider;
