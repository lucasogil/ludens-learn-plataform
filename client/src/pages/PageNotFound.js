import React from "react";
import "../styles/PageNotFound.css";
import { useNavigate } from "react-router-dom";

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
            src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7878.jpg?w=1380&t=st=1669062854~exp=1669063454~hmac=08adf40ef9dda46e36678900e6114a562ccb23a38f64592c97ea9951b2a68a02"
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
