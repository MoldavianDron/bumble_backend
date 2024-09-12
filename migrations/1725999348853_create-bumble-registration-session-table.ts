import {MigrationBuilder, PgType} from "node-pg-migrate";

export const up = async (pgm: MigrationBuilder) => {
  pgm.createTable("bumble_registration_sessions", {
    id: "ID",
    user_id: { type: PgType.UUID, references: "users", notNull: true },
    bumble_app_id: { type: PgType.TEXT, notNull: true },
    registration_stage: { type: PgType.TEXT, notNull: true },
    config: { type: PgType.JSONB, notNull: true },
    created_at: "CREATED_AT",
  });
};

export const down = async (pgm: MigrationBuilder) => {
  pgm.dropTable("bumble_registration_sessions");
};