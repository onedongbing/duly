import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { notionService } from "@/utils";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {

  const databaseId = "45bc8fd6a5a04a5781c1a66817fd63b7";
	const response = await notionService.query({database_id: databaseId})
	
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export { handler };
