import { useEffect, useRef } from "react";
import Slider from "../Slider/slider";
import { GoHome } from "react-icons/go";
import SkillsSection from "../SkillsSection/SkillsSection";
import AboutSection from "../AboutSection/AboutSection";
import ContactSection from "../ContactSection/ContactSection";

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
    setTimeout(
      () =>
        document.addEventListener("DOMContentLoaded", function () {
          const sportify = document.querySelector("#sportify-iframe");
          if (sportify) {
            const bg = sportify.contentWindow.document.querySelector(
              ".TrackListWidget_trackListGridContainer__GZGxh"
            );
            if (bg) {
              bg.parentElement.parentElement.style.backgroundColor =
                "#ffffff10 !important";
            }
          }
        }),
      5000
    );
    setTimeout(
      () =>
        document.addEventListener("DOMContentLoaded", function () {
          const sportify = document.querySelector("#sportify-iframe");
          if (sportify) {
            const bg = sportify.contentWindow.document.querySelector(
              ".TrackListWidget_trackListGridContainer__GZGxh"
            );
            if (bg) {
              bg.parentElement.parentElement.style.backgroundColor =
                "#ffffff10 !important";
            }
          }
        }),
      10000
    );
  }, []);
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
    <>
      <div className="main">
        <div className="container" ref={container}>
          <div className="text" ref={ref}></div>
          <div className="btnWrapper">
            <div className="separation first">
              <button className="exploreBtn skillsBtn">Skills</button>
              <button className="exploreBtn aboutBtn">About</button>
            </div>
            <div className="separation last">
              <button className="exploreBtn workBtn">Work</button>
              <button className="exploreBtn contactBtn">Contact</button>
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <SkillsSection />
          <AboutSection />
          <ContactSection />
        </div>
      </div>
      <button className="homeBtn">
        <GoHome />
      </button>
      <div className="slide-in"></div>
      <div className="slide-out"></div>
    </>
  );
}
