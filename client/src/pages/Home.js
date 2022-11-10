import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  const routeChangeCourses = () => {
    let path = `/courses`;
    navigate(path);
  };

  return (
    <React.Fragment>
      {" "}
      <section id="hero" className=" py-5 ">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="">
            <h1>Aprenda & Ensine em conjunto</h1>
            <p>Conheça nosso catalogo de cursos</p>
            <a
              href="/#"
              className="btn btn-primary"
              onClick={routeChangeCourses}
            >
              Acessar
            </a>
          </div>

          <img
            className="img-hero"
            src="https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148892786.jpg"
            alt="Banner-home-page"
          />
        </div>
      </section>
      <section className="p-5 bg-gray">
        <div className="container">
          <div className="d-flex justify-content-between mt-4">
            <div
              className="card-projet  bg-white"
              style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/flat-university-concept-background_23-2148187600.jpg")`,
              }}
            >
              Cursos
            </div>
            <div
              className="card-projet w-30  bg-white"
              style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/antigravity-mobile-phone-with-elements_23-2148297052.jpg")`,
              }}
            >
              Feed Social
            </div>
            <div
              className="card-projet w-30 bg-white"
              style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/pensive-people-ask-questions-search-answers-online-vector-flat-illustration-faq-page-with-curious-puzzled-characters-laptop-question-marks-speech-bubbles_107791-9783.jpg")`,
              }}
            >
              Saiba mais
            </div>
          </div>
        </div>
      </section>
      <section class="p-5 bg-blank">
        <div class="container">
          <h2>Saiba mais</h2>
          <div class="card-product-line">
            <div class="p-4">
              <h3>Uma forma colaborativa de aprender</h3>
              <p>Lorem Ipsum</p>
            </div>
            <img
              src="https://img.freepik.com/free-photo/young-team-coworkers-working-project_273609-16165.jpg"
              alt="Banner-about-site"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Home;
