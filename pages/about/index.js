import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const about = document.querySelector(".about-section");
    about.style.transform = "translateY(15%)";
    about.style.transition = "transform 2s ease";
  }, []);
  return (
    <section className="about-section">
      <h2>About Me</h2>
      <p>
        I am a frontend engineer at Tkxel, a software development company that
        provides innovative and customized solutions for various clients and
        industries. With four years of experience in web development, I create
        and maintain responsive and user-friendly web applications that meet the
        client's requirements and expectations. <br /> <br /> I use my skills in
        React, HTML, CSS, Bootstrap, Tailwind CSS, Javascript, and Typescript to
        develop engaging and interactive web pages that are compatible across
        different platforms and devices. I also collaborate with the backend and
        design teams to ensure the functionality and integration of the web
        applications. One of my recent projects involved developing 3D web
        interfaces for a metaverse project using Three.js and React Three Fiber,
        which was a challenging and rewarding experience. I have a BS in
        Computer Science from GCU, where I acquired a solid foundation in
        programming, data structures, algorithms, and software engineering.{" "}
        <br />
        <br /> I am passionate about learning and exploring new technologies and
        trends in the information technology field, and I have completed
        multiple certifications in frontend development, web development, and
        problem-solving, which demonstrate my proficiency and dedication. My
        goal is to leverage my expertise and experience to deliver innovative
        and high-quality solutions that add value and impact to the clients and
        the users.
      </p>

      <div className="cards-wrapper">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            className={`card ${
              index > 2 ? "row-two" : index > 4 ? "row-three" : ""
            } `}
          ></div>
        ))}
      </div>
    </section>
  );
}
