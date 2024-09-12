import { PgType, PgLiteral, ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions = {
  ID: {
    type: PgType.UUID,
    primaryKey: true,
    default: new PgLiteral("gen_random_uuid()"),
  },
};

export const up = async (pgm: MigrationBuilder) => {};
