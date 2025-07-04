import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 50 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});

export const UserAnswer=pgTable("userAnswer",{
  id:serial("id").primaryKey(),
  mockIdRef:varchar("mockId").notNull(),
  question:varchar("question").notNull(),
  correctAns:text("correctAns"),
  userAns:text("userAns"),
  feedback:text("feedback"),
  rating:varchar("rating"),
  userEmail:varchar("userEmail"),
  createdAt:varchar("createAt"),
})