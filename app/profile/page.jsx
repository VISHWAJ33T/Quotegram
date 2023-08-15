"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import QuoteCard from "@components/QuoteCard";
import Loading from "@components/Loading";

const BATCH_SIZE = 10;

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await fetch(
        `/api/users/${session?.user.id}/posts?page=${currentPage}&batchSize=${BATCH_SIZE}`
      );
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
      setDisplayedData(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id, currentPage]); // Listen for changes in currentPage
  
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1); // Increment the current page
  };

  const handleEdit = (post) => {
    router.push(`/update-quote?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this quote");
    if (hasConfirmed) {
      try {
        await fetch(`/api/quote/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
        setDisplayedData(filteredPosts.slice(0, BATCH_SIZE)); // Update displayed data
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">My Profile</span>
      </h1>
      <p className="desc text-left">Welcome to your personalized profile page</p>

      {isLoading ? (
        <Loading className="mt-16" />
      ) : (
        <div className="mt-16 quote_layout">
          {displayedData.map((post) => (
            <QuoteCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      )}

      {displayedData.length === BATCH_SIZE && posts.length > BATCH_SIZE && (
        <button
          onClick={() =>
            setDisplayedData(posts.slice(0, displayedData.length + BATCH_SIZE))
          }
          className="black_btn mb-10"
        >
          Load More
        </button>
      )}
    </section>
  );
};

export default MyProfile;
