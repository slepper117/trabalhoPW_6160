import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="home">
      <div className="container-xl home-container p-3">
        <main className="px-3">
          <h1>Erro 404</h1>
          <p className="lead">A página que procura não pode ser encontrada!</p>
          <p className="lead">
            <Link
              to="/dashboard"
              className="btn btn-lg btn-secondary fw-bold border-white bg-white"
            >
              Voltar à Home!
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
