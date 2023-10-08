import { Client } from "@notionhq/client"
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints"

const auth = "secret_7GmzPqynQqtNNI9xYdrwk7qFCxiNyZb1gvTaDl8sob9"

const client = new Client({ auth })

class NotionService {
  public client = client

  /** 查询数据 */
  async query(data: QueryDatabaseParameters) {
    const response = await this.client.databases.query(data)

    return this.transfer(response.results)
  }

  /** 转换结果 */
  private transfer(page: any): any {
    if (Array.isArray(page)) return page.map(item => this.transfer(item))

    const data: any = {}

    for (const key in page.properties) {
      const value = page.properties[key]
      const type = value.type
      switch (type) {
        case "relation":
          data[key] = value["relation"][0].id
          break

        case "title":
        case "rich_text":
          data[key] = value[type][0]?.text?.content
          break

        default:
          data[key] = value[type]
          break
      }
    }
    return data
  }
}

export const notionService = new NotionService()
