import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "hello world!" }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }
}

export { handler }
