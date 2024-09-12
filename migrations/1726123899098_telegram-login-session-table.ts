import {MigrationBuilder, PgType} from "node-pg-migrate";

export const up = async (pgm: MigrationBuilder) => {
  pgm.createTable("telegram_login_sessions", {
    id: "ID",
    user_id: { type: PgType.UUID, references: "users", notNull: true },
    session_token: { type: PgType.TEXT, notNull: false },
    created_at: "CREATED_AT",
  });
};

export const down = async (pgm: MigrationBuilder) => {
  pgm.dropTable("telegram_login_sessions");
};