import { useRef, useEffect, useState } from "react";

import P1 from "../../public/portrait-1.jpeg";
import P2 from "../../public/portrait-2.jpeg";
import P3 from "../../public/portrait-3.jpeg";
import P4 from "../../public/portrait-4.jpeg";
import P5 from "../../public/portrait-5.jpeg";
import P6 from "../../public/portrait-6.jpeg";
import P7 from "../../public/portrait-7.jpeg";
import P8 from "../../public/portrait-8.jpeg";
import P9 from "../../public/portrait-9.jpeg";
import P10 from "../../public/portrait-10.jpeg";
import P11 from "../../public/portrait-11.jpeg";
import P12 from "../../public/portrait-12.jpeg";
import P13 from "../../public/portrait-13.jpeg";
import P14 from "../../public/portrait-14.jpeg";
import P15 from "../../public/portrait-15.jpeg";
import P16 from "../../public/portrait-16.jpeg";
import P17 from "../../public/portrait-17.jpeg";
import P18 from "../../public/portrait-18.jpeg";
import P19 from "../../public/portrait-19.jpeg";
import ContactForm from "../ContactForm/ContactForm";

const images = [
  { id: 1, src: P1 },
  { id: 2, src: P2 },
  { id: 3, src: P3 },
  { id: 4, src: P4 },
  { id: 5, src: P5 },
  { id: 6, src: P6 },
  { id: 7, src: P7 },
  { id: 8, src: P8 },
  { id: 9, src: P9 },
  { id: 10, src: P10 },
  { id: 11, src: P11 },
  { id: 12, src: P12 },
  { id: 13, src: P13 },
  { id: 14, src: P14 },
  { id: 15, src: P15 },
  { id: 16, src: P16 },
  { id: 17, src: P17 },
  { id: 18, src: P18 },
  { id: 19, src: P19 },
];

const tags = [
  { id: 1, name: "Frontend Engineer" },
  { id: 2, name: "Web Developer" },
  { id: 3, name: "UI Developer" },
  //   { id: 4, name: "JavaScript Developer" },
  //   { id: 5, name: "React Developer" },
  //   { id: 6, name: "HTML/CSS Expert" },
  //   { id: 7, name: "Frontend Architect" },
  //   { id: 8, name: "Frontend Specialist" },
  //   { id: 9, name: "Frontend Wizard" },
  //   { id: 10, name: "Client-side Developer" },
  //   { id: 11, name: "User Interface Designer" },
  //   { id: 12, name: "Frontend Guru" },
  //   { id: 13, name: "Web UI Developer" },
  //   { id: 14, name: "Responsive Web Designer" },
  //   { id: 15, name: "Frontend Tech Lead" },
  //   { id: 16, name: "Frontend Innovator" },
  //   { id: 17, name: "Frontend Evangelist" },
  //   { id: 18, name: "Web Design Expert" },
  //   { id: 19, name: "Frontend Code Ninja" },
  //   { id: 20, name: "Frontend UI/UX Engineer" },
];

const AboutSection = () => {
  const imagesRef = useRef();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % images.length);
  };

  return (
    <section className="about-section">
      <div className="about-content">
        <div className="left-section">
          <div className="left-top">
            <div className="iframe-wrapper">
              <iframe
                id="sportify-iframe"
                src="https://open.spotify.com/embed/playlist/7lz5AjMRQolKECwvkgYEB2?utm_source=generator&theme=0"
                width="100%"
                height="400"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="left-bottom">
            <div className="left-left">
              <div className="images-wrapper" ref={imagesRef}>
                {images.map((img, index) => (
                  <div
                    className={`single-image ${
                      activeStep === index
                        ? activeStep % 2 === 0
                          ? "activeRight"
                          : "activeLeft"
                        : activeStep > index
                        ? activeStep === images.length - 1 && index === 0
                          ? "first"
                          : "done"
                        : ""
                    } ${
                      activeStep === images.length - 1 &&
                      index === images.length - 1
                        ? "last"
                        : ""
                    }`}
                    style={{
                      zIndex: images.length - index,
                    }}
                    key={img.id}
                  >
                    <img src={img.src.src} />
                  </div>
                ))}
              </div>
            </div>
            <div className="left-right">
              <div className="left-right-bottom">
                <p>hi.</p>
              </div>
              <div className="left-right-top">
                <p>
                  "People who are crazy enough to think they can change the
                  world are the ones who actually do."
                </p>
                <p>~Steve Jobs</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="right-top">
            <ContactForm />
          </div>
          <div className="right-bottom"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
