import { MigrationBuilder, PgType } from "node-pg-migrate";

export const up = async (pgm: MigrationBuilder) => {
  pgm.createTable("users", {
    id: "ID",
    telegram_user_id: { type: PgType.TEXT, notNull: true },
    access_key: { type: PgType.TEXT, notNull: true },
    created_at: "CREATED_AT",
  });
};

export const down = async (pgm: MigrationBuilder) => {
  pgm.dropTable("users");
};