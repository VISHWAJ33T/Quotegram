import Quote from "@models/quote";
import { connectToDB } from "@utils/database";
import { ObjectId } from 'mongodb';

const PAGE_SIZE = 18; // Number of quotes per page
export const revalidate = 10; // Revalidate API every 10 second
// export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    await connectToDB();

    const url = new URL(request.url);
    const cursorParam = url.searchParams.get("cursor");
    const searchParam = url.searchParams.get("search");

    let filter = {};

    if (cursorParam) {
      filter._id = { $lt: new ObjectId(cursorParam) };
    }

    if (searchParam) {
      // Add additional search criteria based on your data model
      // For example, if you want to search by author or quote content
      filter.$or = [
        { quote: { $regex: searchParam, $options: 'i' } },
        { author: { $regex: searchParam, $options: 'i' } },
        { "creator.username": { $regex: searchParam, $options: 'i' } },
      ];
    }

    const options = {
      sort: { _id: -1 },
      limit: PAGE_SIZE,
    };

    const quotes = await Quote.find(filter, null, options).populate("creator");
    const totalQuotes = await Quote.countDocuments(filter);
    const totalPages = Math.ceil(totalQuotes / PAGE_SIZE);

    const nextPageCursor = quotes.length === PAGE_SIZE ? quotes[quotes.length - 1]._id : null;

    return new Response(
      JSON.stringify({
        quotes,
        totalPages,
        nextPageCursor,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch quotes", {
      status: 500,
    });
  }
};