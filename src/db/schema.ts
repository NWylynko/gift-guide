import { sql } from "drizzle-orm";
import {
  integer,
  smallint,
  bigint,
  serial,
  smallserial,
  bigserial,
  boolean,
  text,
  varchar,
  char,
  numeric,
  decimal,
  real,
  doublePrecision,
  json,
  jsonb,
  time,
  timestamp,
  date,
  interval,
  pgEnum,
  index,
  uniqueIndex,
  pgTable,
} from "drizzle-orm/pg-core";

export const accentColorEnum = pgEnum("accent_color", [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "orange",
  "teal",
  "indigo",
  "cyan",
]);

export const user = pgTable(
  "user",
  {
    authId: varchar().notNull(),
    username: varchar().notNull(),
    accentColor: accentColorEnum().notNull(),
  },
  (table) => [index().on(table.authId), index().on(table.username)]
);

export const gift = pgTable(
  "gift",
  {
    giftId: serial().primaryKey().notNull(),
    username: varchar().notNull(),

    url: varchar({ length: 2000 }).notNull(),
    name: varchar({ length: 250 }).notNull(),
    description: varchar({ length: 2000 }),
    image: varchar({ length: 2000 }),
    price: integer(),
    salePrice: integer(),
    gifted: boolean().notNull().default(false),

    createdAt: timestamp({ mode: "date", withTimezone: true }).notNull(),
  },
  (table) => [index().on(table.username)]
);
