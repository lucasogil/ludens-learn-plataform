import React from "react";
import "../styles/PageNotFound.css";
import { useNavigate } from "react-router-dom";
import BannerNotFound from "../assets/not-found.png";

function PageNotfound() {
  let navigate = useNavigate();

  const routeChangeCourses = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <React.Fragment>
      <section id="hero" className=" py-5 ">
        <div className="container d-flex justify-content-between align-items-center">
          <img
            className="img-notfound"
            src={BannerNotFound}
            alt="Banner-home-page"
          />

          <div className="">
            <h1>Pagina Não Encontrada</h1>
            <p>Parece que esta URL não existe, verifique e tente novamente.</p>
            <button className="btn btn-primary" onClick={routeChangeCourses}>
              Explorar o site
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default PageNotfound;
