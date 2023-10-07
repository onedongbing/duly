import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Client } from "@notionhq/client";
import { Response } from "@netlify/functions/dist/function/response";
import { notionService } from "@/utils";

const transformer = (page: any) => {
	let data: any = {};

	for (const key in page.properties) {
		switch (page.properties[key].type) {
			case "relation":
				data[key] = page.properties[key].relation[0].id;
				break;

			case "title":
			case "rich_text":
				data[key] =
					page.properties[key][page.properties[key].type][0]?.text?.content;
				break;

			default:
				data[key] = page.properties[key];
				break;
		}
	}

	return data;
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {

  const databaseId = "924af3e47949421d987fdd971be681da";
	const response = await notionService.query({database_id: databaseId})
	
  return {
    statusCode: 200,
    body: JSON.stringify({ message: {response} }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export { handler };
