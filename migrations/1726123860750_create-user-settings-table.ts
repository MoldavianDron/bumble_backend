import {MigrationBuilder, PgType} from "node-pg-migrate";

export const up = async (pgm: MigrationBuilder) => {
  pgm.createTable("user_settings", {
    id: "ID",
    user_id: { type: PgType.UUID, references: "users", notNull: true },
    sms_pool_token: { type: PgType.TEXT, notNull: false },
    openai_token: { type: PgType.TEXT, notNull: false },
    device_id: { type: PgType.TEXT, notNull: true },
    login_info: { type: PgType.JSONB, notNull: false },
    created_at: "CREATED_AT",
  });
};

export const down = async (pgm: MigrationBuilder) => {
  pgm.dropTable("user_settings");
};