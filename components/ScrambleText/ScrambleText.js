import { useEffect, useRef } from "react";
import styles from "./ScrambleText.module.scss";

export default function ScrambleText() {
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/%^&@~[]{}—=+*^?#________";
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el?.innerText;
      const length = Math.max(oldText?.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 30);
        const end = start + Math.floor(Math.random() * 30);
        this.queue.push({ from, to, start, end });
      }
      //   cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = "";
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————

  const phrases = [
    // "I believe in",
    // "setting milestones",
    // "than",
    // "setting goals",
    "SAHIL E ARWAND",
    // "",
  ];
  const ref = useRef();
  const container = useRef();
  let el;
  useEffect(() => {
    el = ref.current;
    const fx = new TextScramble(el);

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        if (counter === phrases.length) {
          setTimeout(() => container.current.classList.add("endtext"), 1000);
        } else {
          setTimeout(next, 1000);
        }
      });

      counter = counter + 1;
    };
    next();
  }, [ref]);

  return (
    <div className="main">
      <div className="container" ref={container}>
        <div className="text" ref={ref}></div>
        <div
          style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
          className="btnWrapper"
        >
          <button className="exploreBtn aboutBtn">About</button>
          <button className="exploreBtn workBtn">Work</button>
          <button className="exploreBtn contactBtn">Contact</button>
        </div>
      </div>
      <div className="section-wrapper">
        <section className="about-section">
          <h2>About Me</h2>
          <p>
            I am a frontend engineer with four years of experience in web
            development, I create and maintain responsive and user-friendly web
            applications that meet the clients requirements and expectations.
          </p>

          <div className="cards-wrapper">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={item}
                className={`card ${
                  index > 2 ? "row-two" : index > 4 ? "row-three" : ""
                } `}
              ></div>
            ))}
          </div>
        </section>
        <section className="work-section">
          <h2>Work</h2>
          <p>
            I am a frontend engineer at Tkxel, a software development company
            that provides innovative and customized solutions for various
            clients and industries. With four years of experience in web
            development, I create and maintain responsive and user-friendly web
            applications that meet the clients requirements and expectations.
            <br /> <br /> I use my skills in React, HTML, CSS, Bootstrap,
            Tailwind CSS, Javascript, and Typescript to develop engaging and
            interactive web pages that are compatible across different platforms
            and devices. I also collaborate with the backend and design teams to
            ensure the functionality and integration of the web applications.
            One of my recent projects involved developing 3D web interfaces for
            a metaverse project using Three.js and React Three Fiber, which was
            a challenging and rewarding experience. I have a BS in Computer
            Science from GCU, where I acquired a solid foundation in
            programming, data structures, algorithms, and software engineering.
            <br />
            <br /> I am passionate about learning and exploring new technologies
            and trends in the information technology field, and I have completed
            multiple certifications in frontend development, web development,
            and problem-solving, which demonstrate my proficiency and
            dedication. My goal is to leverage my expertise and experience to
            deliver innovative and high-quality solutions that add value and
            impact to the clients and the users.
          </p>

          <div className="cards-wrapper">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={item}
                className={`card ${
                  index > 2 ? "row-two" : index > 4 ? "row-three" : ""
                } `}
              ></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
