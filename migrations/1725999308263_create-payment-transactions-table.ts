import {MigrationBuilder, PgType} from "node-pg-migrate";

export const up = async (pgm: MigrationBuilder) => {
  pgm.createTable("payment_transactions", {
    id: "ID",
    user_id: { type: PgType.UUID, references: "users", notNull: true },
    transaction_id: { type: PgType.TEXT, notNull: true },
    payment_service: { type: PgType.TEXT, notNull: true },
    amount: { type: PgType.NUMERIC, check: "amount >= 0" },
    currency: { type: PgType.TEXT, notNull: true },
    status: { type: PgType.TEXT, notNull: true },
    created_at: "CREATED_AT",
  });
};

export const down = async (pgm: MigrationBuilder) => {
  pgm.dropTable("payment_transactions");
};