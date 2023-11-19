import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

// GET (READ)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const quote = await Quote.findById(params.id).populate("creator");
    if (!quote) return new Response("Quote not found", { status: 404 });

    return new Response(JSON.stringify(quote), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch the quote", {
      status: 500,
    });
  }
};

// PATCH (UPDATE)
export const PATCH = async (request, { params }) => {
  const { quote, author } = await request.json();

  try {
    await connectToDB();

    const existingQuote = await Quote.findById(params.id);

    if (!existingQuote)
      return new Response("Quote not found", { status: 404 });
    existingQuote.quote = quote;
    existingQuote.author = author;

    await existingQuote.save();
    return new Response(JSON.stringify(existingQuote), { status: 200 });
  } catch (error) {
    return new Response("Failed to update quote", { status: 500 });
  }
};

// DELETE (DELETE)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Quote.findByIdAndRemove(params.id);
    return new Response("Quote deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete quote", { status: 500 });
  }
};
