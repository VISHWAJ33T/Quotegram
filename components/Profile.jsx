import QuoteCard from "./QuoteCard";
import { useState } from "react";

const BATCH_SIZE = 10;

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [displayedData, setDisplayedData] = useState(data.slice(0, BATCH_SIZE));

  const handleLoadMore = () => {
    const nextBatch = data.slice(
      displayedData.length,
      displayedData.length + BATCH_SIZE
    );
    setTimeout(() => {
      setDisplayedData((prevDisplayed) => [...prevDisplayed, ...nextBatch]);
    }, 1000); // Simulate loading delay for demonstration
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 quote_layout">
        {displayedData.map((post) => (
          <QuoteCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
      {data.length > displayedData.length && (
        <button onClick={handleLoadMore} className="black_btn mb-10">
          Load More
        </button>
      )}
    </section>
  );
};

export default Profile;
