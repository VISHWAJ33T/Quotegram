import Quote from "@models/quote";
import { connectToDB } from "@utils/database";
import { ObjectId } from 'mongodb';

const PAGE_SIZE = 12;

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor")
    const searchParam = url.searchParams.get("search");

    let filter = {};

    if (cursor) {
      filter = {
        creator: params.id,
        _id: { $lt: new ObjectId(cursor) },
      };
    }

    if (searchParam) {
      // Add additional search criteria based on your data model
      // For example, if you want to search by author or quote content
      filter.$or = [
        { quote: { $regex: searchParam, $options: 'i' } },
        { author: { $regex: searchParam, $options: 'i' } },
      ];
    }

    const options = {
      sort: { _id: -1 },
      limit: PAGE_SIZE,
    };

    const quotes = await Quote.find(filter, null, options).populate("creator");
    const totalQuotes = await Quote.countDocuments(filter);
    const totalPages = Math.ceil(totalQuotes / PAGE_SIZE);
    const nextPageCursor = quotes.length === options.limit ? quotes[quotes.length - 1]._id : null;

    return new Response(JSON.stringify({
      quotes,
      totalPages,
      nextPageCursor,
    }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch quotes", {
      status: 500,
    });
  }
};
