import { Client } from "@notionhq/client"
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints"

const auth = "secret_vOLCV47LEk6jpRfc3AtX9Bueg1SjO7h5ugZNZOzcnH8"

const client = new Client({ auth })

class NotionService {
  public client = client

  /** 查询数据 */
  async query(data: QueryDatabaseParameters) {
    const response = await this.client.databases.query(data)

    return response.results
  }
}

export const notionService = new NotionService()
