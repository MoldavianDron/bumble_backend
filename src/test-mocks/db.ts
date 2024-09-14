import {Database, DatabaseClient} from "~/db";

export const client = {
  query: jest.fn(),
  release: jest.fn(),
} as unknown as jest.Mocked<DatabaseClient>;

export const db = {
  query: jest.fn(),
  connect: jest.fn().mockReturnValue(client),
} as unknown as jest.Mocked<Database>;