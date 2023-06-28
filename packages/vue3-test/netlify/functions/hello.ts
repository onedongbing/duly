import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: "secret_vOLCV47LEk6jpRfc3AtX9Bueg1SjO7h5ugZNZOzcnH8",
});

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // const pageId = "f12727affb1f4551950223f6981fb72d";
  // const response = await notion.pages.retrieve({ page_id: pageId });
  // console.log(response);
  const databaseId = "924af3e47949421d987fdd971be681da";
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
  return {
    statusCode: 200,
    // body: JSON.stringify({ message: "Hello World" }),
    body: JSON.stringify({ message: response }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export { handler };
// https://www.notion.so/f12727affb1f4551950223f6981fb72d?v=c347db500245401b988dafa5dc047828&pvs=4
