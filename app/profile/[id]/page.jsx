"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuoteCard from "@components/QuoteCard";
import Loading from "@components/Loading";
import Nothing from "@components/Nothing";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageCursor, setNextPageCursor] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [searchSubmit]);

  const fetchPosts = async (cursor) => {
    setIsLoading(true);
    const response = await fetch(
      `/api/users/${params?.id}/posts?cursor=${
        cursor || "999999999999999999999999"
      }${searchSubmit !== "" ? `&search=${searchSubmit}` : ""}`
    );
    const data = await response.json();
    setUserPosts(userPosts.concat(data.quotes));
    setIsLoading(false);
    setNextPageCursor(data.nextPageCursor);
  };

  useEffect(() => {
    if (params?.id) {
      fetchPosts(null); // Initial fetch
    }
  }, [params?.id]);

  const handleLoadMore = () => {
    if (nextPageCursor) {
      fetchPosts(nextPageCursor);
    }
  };

  const handleAuthorClick = (authorName) => {
    setSearchText(authorName);
    setNextPageCursor("999999999999999999999999");
    setUserPosts([]);
    setSearchSubmit(authorName);
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-start flex-wrap">
        <div>
          <h1 className="head_text text-left">
            <span className="blue_gradient">{userName}'s Profile</span>
          </h1>
          <p className="desc text-left">
            Welcome to {userName}'s personalized profile page. Explore{" "}
            {userName}'s exceptional quotes and be inspired by the power of
            their imagination
          </p>
        </div>
        <form
          className="mt-10 relative w-fit min-w-[200px] flex-center"
          onSubmit={(e) => {
            e.preventDefault();
            setNextPageCursor("999999999999999999999999");
            setUserPosts([]);
            setSearchSubmit(searchText);
          }}
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
          <button type="submit" className="absolute right-2 border-l-2 pl-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 128 128"
            >
              <path
                fill="#fff"
                d="M108.9,108.9L108.9,108.9c-2.3,2.3-6.1,2.3-8.5,0L87.7,96.2c-2.3-2.3-2.3-6.1,0-8.5l0,0c2.3-2.3,6.1-2.3,8.5,0l12.7,12.7C111.2,102.8,111.2,106.6,108.9,108.9z"
              ></path>
              <path
                fill="#fff"
                d="M52.3 17.299999999999997A35 35 0 1 0 52.3 87.3A35 35 0 1 0 52.3 17.299999999999997Z"
                transform="rotate(-45.001 52.337 52.338)"
              ></path>
              <path
                fill="#fff"
                d="M52.3 17.299999999999997A35 35 0 1 0 52.3 87.3A35 35 0 1 0 52.3 17.299999999999997Z"
                transform="rotate(-45.001 52.337 52.338)"
              ></path>
              <path
                fill="#71c2ff"
                d="M52.3 84.3c-1.7 0-3-1.3-3-3s1.3-3 3-3c6.9 0 13.5-2.7 18.4-7.6 6.4-6.4 9-15.5 6.9-24.4-.4-1.6.6-3.2 2.2-3.6 1.6-.4 3.2.6 3.6 2.2C86 55.8 82.9 67.1 75 75 68.9 81 60.9 84.3 52.3 84.3zM73 35c-.8 0-1.5-.3-2.1-.9L70.7 34c-1.2-1.2-1.2-3.1 0-4.2 1.2-1.2 3.1-1.2 4.2 0l.2.2c1.2 1.2 1.2 3.1 0 4.2C74.5 34.7 73.8 35 73 35z"
              ></path>
              <path
                fill="#444b54"
                d="M52.3 90.3c-9.7 0-19.5-3.7-26.9-11.1-14.8-14.8-14.8-38.9 0-53.7 14.8-14.8 38.9-14.8 53.7 0h0C94 40.3 94 64.4 79.2 79.2 71.8 86.6 62.1 90.3 52.3 90.3zM52.3 20.4c-8.2 0-16.4 3.1-22.6 9.4-12.5 12.5-12.5 32.8 0 45.3C42.2 87.4 62.5 87.4 75 75c12.5-12.5 12.5-32.8 0-45.3C68.7 23.5 60.5 20.4 52.3 20.4zM111 98.3L98.3 85.6c-1.7-1.7-4-2.6-6.4-2.6-1.4 0-2.7.3-3.9.9l-2.5-2.5c-1.2-1.2-3.1-1.2-4.2 0-1.2 1.2-1.2 3.1 0 4.2l2.5 2.5c-.6 1.2-.9 2.5-.9 3.9 0 2.4.9 4.7 2.6 6.4L98.3 111c1.8 1.8 4.1 2.6 6.4 2.6s4.6-.9 6.4-2.6l0 0C114.5 107.5 114.5 101.8 111 98.3zM106.8 106.8c-1.2 1.2-3.1 1.2-4.2 0L89.8 94.1c-.6-.6-.9-1.3-.9-2.1s.3-1.6.9-2.1c.6-.6 1.3-.9 2.1-.9s1.6.3 2.1.9l12.7 12.7C108 103.7 108 105.6 106.8 106.8z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
      {userPosts.length !== 0 ? (
        <div className="mt-16 quote_layout">
          {userPosts.map((post) => (
            <QuoteCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
              handleAuthorClick={handleAuthorClick}
            />
          ))}
        </div>
      ) : !isLoading && nextPageCursor == null ? (
        <Nothing />
      ) : (
        <></>
      )}
      {isLoading && <Loading className="mb-16" />}
      <div className="flex justify-center items-center">
        {nextPageCursor && (
          <button onClick={handleLoadMore} className="black_btn mb-16">
            {!isLoading ? "Load More" : "Loading..."}
          </button>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
