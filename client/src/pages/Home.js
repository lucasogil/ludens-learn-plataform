import React from "react";
import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";

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
            <button className="btn btn-primary" onClick={routeChangeCourses}>
              Acessar
            </button>
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
              <Link to="/courses">Cursos</Link>
            </div>
            <div
              className="card-projet w-30  bg-white"
              style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/antigravity-mobile-phone-with-elements_23-2148297052.jpg")`,
              }}
            >
              <Link to="/feed">Feed Social</Link>
            </div>
            <div
              className="card-projet w-30 bg-white"
              style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/pensive-people-ask-questions-search-answers-online-vector-flat-illustration-faq-page-with-curious-puzzled-characters-laptop-question-marks-speech-bubbles_107791-9783.jpg")`,
              }}
            >
              <a href="#secao1"> Saiba mais </a>
            </div>
          </div>
        </div>
      </section>
      <section className="p-5 bg-blank">
        <div className="container">
          <h2 id="secao1"> Saiba mais </h2>
          <div className="card-product-line">
            <img
              src="https://img.freepik.com/free-photo/young-team-coworkers-working-project_273609-16165.jpg"
              alt="Banner-about-site"
            />
            <div className="p-4">
              <h3>Uma forma colaborativa de aprender</h3>
              <p>
                Ludens é uma plataforma colaborativa de expansão do ensino
                online, aqui você tem a oportunidade de aprender e compartilhar
                conhecimento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Home;
