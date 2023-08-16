"use client";
import Loading from "@components/Loading";
import { useEffect, useState } from "react";
import QuoteCard from "./QuoteCard";

const BATCH_SIZE = 10;

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/quote");
    // const response = await fetch("/api/quote", { next: { revalidate: 1 } });
    const data = await response.json();

    setAllPosts(data);
    setIsLoading(false);

    // Load and display the first batch of quotes
    setDisplayedPosts(data.slice(0, BATCH_SIZE));
  };

  useEffect(() => {
    setDisplayedPosts([]);
  }, [searchText]);

  const handleLoadMore = () => {
    const nextBatch = allPosts.slice(
      displayedPosts.length,
      displayedPosts.length + BATCH_SIZE
    );
    setDisplayedPosts((prevDisplayed) => [...prevDisplayed, ...nextBatch]);
  };

  const handleAuthorClick = (authorName) => {
    setSearchText(authorName);
  };

  const filteredPosts = searchText
    ? allPosts.filter(
        (item) =>
          item.creator.username.includes(searchText) ||
          item.author.includes(searchText) ||
          item.quote.includes(searchText)
      )
    : displayedPosts;

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search Anything"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="search_input peer"
        />
      </form>

      {isLoading ? (
        <Loading className="mt-16" />
      ) : (
        <div className="mt-16 quote_layout">
          {filteredPosts.map((post) => (
            <QuoteCard
              key={post._id}
              post={post}
              handleAuthorClick={handleAuthorClick} // Pass the function here
            />
          ))}
        </div>
      )}

      {displayedPosts.length < allPosts.length && searchText === "" && (
        <button onClick={handleLoadMore} className="black_btn mb-10">
          Load More
        </button>
      )}
    </section>
  );
};

export default Feed;
