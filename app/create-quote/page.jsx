"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Form from "@components/Form";
const CreateQuote = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    quote: "",
    author: "",
  });
  const createQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("api/quote/new", {
        method: "POST",
        body: JSON.stringify({
          quote: post.quote,
          userId: session?.user.id,
          author: post.author,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createQuote}
    />
  );
};

export default CreateQuote;
