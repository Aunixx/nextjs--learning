import P8 from "../../public/portrait-19.jpeg";
import ContactForm from "../ContactForm/ContactForm";
import { useState } from "react";

const ContactSection = () => {
  const [flip, setFlip] = useState(false);
  return (
    <section className="contact-section">
      {/* <div className="left-section">
        <h5>Get in touch</h5>
      </div> */}
      <div className={`contact-form-wrapper ${flip ? "rotate" : ""}`}>
        <div className="front-card">
          <div className="img-wrapper">
            <img src={P8.src} />
          </div>
          <ContactForm />
          <button
            type="button"
            className="flip-btn"
            onClick={() => setFlip(!flip)}
          >
            Back
          </button>
        </div>
        <div className="back-card">
          <div className="img-wrapper">
            <div className="top">
              <p>Sahil E Arwand</p>
              <p>Frontend Engineer</p>
            </div>
            <div className="bottom">
              <p>www.sahilearwand.com</p>
              <p>info@sahilearwand.com</p>
              <p>sahil.arwand2000@gmail.com</p>
              <p>+92 319 8879179</p>
            </div>
          </div>
          <button
            type="button"
            className="flip-btn"
            onClick={() => setFlip(!flip)}
          >
            Front
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
