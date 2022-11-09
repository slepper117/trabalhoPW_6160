import { Outlet } from "react-router-dom";

const Blog = () => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex flex-collum justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>Blog</h1>
      </div>
      <Outlet />
    </main>
  );
};

export default Blog;
