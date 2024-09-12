import { PgLiteral, ColumnDefinitions, MigrationBuilder, PgType } from "node-pg-migrate";

export const shorthands: ColumnDefinitions = {
  CREATED_AT: {
    type: PgType.TIMESTAMP_WITH_TIME_ZONE,
    notNull: true,
    default: new PgLiteral("current_timestamp"),
  },
};

export const up = async (pgm: MigrationBuilder) => {};
