CREATE TABLE "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResp" text NOT NULL,
	"jobPosition" text NOT NULL,
	"jobDesc" text NOT NULL,
	"jobExperience" text NOT NULL,
	"createdBy" text NOT NULL,
	"createdAt" text,
	"mockId" text NOT NULL
);
