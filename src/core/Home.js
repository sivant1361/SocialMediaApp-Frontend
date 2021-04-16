import Posts from "../post/Posts";

const Home = () => {
  return (
    <>
      <div className="jumbotron">
        <h2>Home Page</h2>
        <p className="lead">Welcome to React frontend</p>
      </div>
      <Posts />
    </>
  );
};

export default Home;
