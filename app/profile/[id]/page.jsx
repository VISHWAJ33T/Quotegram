"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuoteCard from "@components/QuoteCard"; // Import QuoteCard
import Loading from "@components/Loading"; // Import Loading component

const BATCH_SIZE = 10;

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
      setIsLoading(false);
      setDisplayedData(data.slice(0, BATCH_SIZE)); // Initial batch
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{userName}'s Profile</span>
      </h1>
      <p className="desc text-left">
        Welcome to {userName}'s personalized profile page. Explore {userName}'s exceptional quotes and be inspired by the power of their imagination
      </p>

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
    </section>
  );
};

export default UserProfile;
