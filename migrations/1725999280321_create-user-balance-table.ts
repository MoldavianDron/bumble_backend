import {MigrationBuilder, PgType} from "node-pg-migrate";

export const up = async (pgm: MigrationBuilder) => {
  pgm.createTable("user_balances", {
    id: "ID",
    user_id: { type: PgType.UUID, references: "users", notNull: true },
    amount: { type: PgType.NUMERIC, check: "amount >= 0" },
    created_at: "CREATED_AT",
  });
};

export const down = async (pgm: MigrationBuilder) => {
  pgm.dropTable("user_balances");
};