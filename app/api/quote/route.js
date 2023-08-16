import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export const revalidate = 1; //revalidate api every 1 second
// export const dynamic = 'force-dynamic';
export const GET = async (request) => {
  try {
    await connectToDB();

    const quotes = await Quote.find({}).sort({ _id: -1 }).populate("creator");

    return new Response(JSON.stringify(quotes), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch all quotes", {
      status: 500,
    });
  }
};
