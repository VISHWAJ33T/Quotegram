import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        {/* <br className="max-md:hidden" /> */}
        <span className="orange_gradient text-center">
          Your Favorite Quotes
        </span>
      </h1>
      <p className="desc text-center">
        Welcome to Quotegram, the ultimate quotes social hub designed for the
        modern era. Join in to connect, create, and share inspirational quotes
        with each other.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
