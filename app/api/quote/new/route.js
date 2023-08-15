import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, quote, author } = await req.json();

  try {
    await connectToDB();
    const newQuote = new Quote({ creator: userId, quote, author });
    await newQuote.save();
    return new Response(JSON.stringify(newQuote), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Quote", { status: 500 });
  }
};
