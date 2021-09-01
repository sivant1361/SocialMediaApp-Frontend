import Posts from "../post/Posts";

const Home = () => {
  return (
    <>
      <div className="jumbotron container mt-4" style={{backgroundColor: '#333',color: '#fff'}}>
        <h2>Home Page</h2>
        <p className="lead">Welcome to Frizzy App</p>
      </div>
      <Posts />
    </>
  );
};

export default Home;
