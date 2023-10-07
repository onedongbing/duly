import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Client } from "@notionhq/client";
import { Response } from "@netlify/functions/dist/function/response";

const notion = new Client({
  auth: "secret_vOLCV47LEk6jpRfc3AtX9Bueg1SjO7h5ugZNZOzcnH8",
});

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
  // const pageId = "f12727affb1f4551950223f6981fb72d";
  // const response = await notion.pages.retrieve({ page_id: pageId });
  // console.log(response);
  const databaseId = "924af3e47949421d987fdd971be681da";
  const response = await notion.databases.retrieve({ database_id: databaseId });
  const response2 = await notion.databases.query({ database_id: databaseId });
	const res3 = response2.results.map((item) => transformer(item))
  return {
    statusCode: 200,
    // body: JSON.stringify({ message: "Hello World" }),
    body: JSON.stringify({ message: {response, response2, res3} }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export { handler };
