import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="my-3" />
        <span className="green_blue_gradient text-center">
          Your Favorite Quotes
        </span>
      </h1>
      <p className="desc text-center">
        Welcome to Quotegram, the ultimate quotes social hub designed for the
        modern era. Join in to connect, create, and share inspirational quotes
        with others.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
