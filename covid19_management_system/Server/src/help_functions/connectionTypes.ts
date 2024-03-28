import { promisify } from "util";
import { connection } from "../db/connect";
import { QueryOptions } from "mysql2";

const queryAsync = promisify(connection.query.bind(connection)) as (
  options: QueryOptions
) => Promise<any[]>;

export async function runQuery(query: string, params: any[]): Promise<any[]> {
  return queryAsync({
    sql: query,
    values: params,
  });
}
