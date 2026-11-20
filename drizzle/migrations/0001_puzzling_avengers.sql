CREATE TABLE "agent_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edition_id" uuid,
	"run_key" varchar(80) NOT NULL,
	"command" varchar(120),
	"status" varchar(30) DEFAULT 'pending',
	"params" jsonb DEFAULT '{}'::jsonb,
	"stats" jsonb DEFAULT '{}'::jsonb,
	"logs" jsonb DEFAULT '[]'::jsonb,
	"error" text,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "agent_runs_run_key_unique" UNIQUE("run_key")
);
--> statement-breakpoint
CREATE TABLE "fact_checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tool_id" uuid NOT NULL,
	"edition_id" uuid,
	"claim" text NOT NULL,
	"evidence_url" text,
	"evidence_excerpt" text,
	"status" varchar(20) DEFAULT 'unknown',
	"confidence" numeric(4, 3),
	"checked_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "research_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tool_id" uuid NOT NULL,
	"edition_id" uuid,
	"week" varchar(20) NOT NULL,
	"raw" jsonb DEFAULT '{}'::jsonb,
	"enriched" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tool_scores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tool_id" uuid NOT NULL,
	"edition_id" uuid,
	"traction" numeric(5, 2),
	"momentum" numeric(5, 2),
	"innovation" numeric(5, 2),
	"community" numeric(5, 2),
	"usefulness" numeric(5, 2),
	"credibility" numeric(5, 2),
	"total" numeric(5, 2),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tool_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tool_id" uuid NOT NULL,
	"source_id" varchar(40) NOT NULL,
	"source_url" text NOT NULL,
	"observation_period" varchar(20) NOT NULL,
	"signals" jsonb DEFAULT '{}'::jsonb,
	"published_at" timestamp with time zone,
	"observed_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "uq_tool_source_period" UNIQUE("tool_id","source_id","observation_period")
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid,
	"name" varchar(200) NOT NULL,
	"slug" varchar(220) NOT NULL,
	"dedup_key" varchar(255) NOT NULL,
	"website" text,
	"company" varchar(200),
	"founders" jsonb DEFAULT '[]'::jsonb,
	"launch_date" date,
	"tagline" varchar(160),
	"short_description" varchar(160),
	"description" text,
	"features" jsonb DEFAULT '[]'::jsonb,
	"use_cases" jsonb DEFAULT '[]'::jsonb,
	"supported_models" jsonb DEFAULT '[]'::jsonb,
	"integrations" jsonb DEFAULT '[]'::jsonb,
	"pricing" jsonb DEFAULT '{}'::jsonb,
	"free_tier" boolean,
	"open_source" boolean,
	"api_available" boolean,
	"deployment_options" jsonb DEFAULT '[]'::jsonb,
	"funding" jsonb DEFAULT '{}'::jsonb,
	"adoption" jsonb DEFAULT '{}'::jsonb,
	"competitors" jsonb DEFAULT '[]'::jsonb,
	"differentiation" text,
	"category_confidence" numeric(4, 3),
	"verification_status" varchar(30) DEFAULT 'unverified',
	"first_discovered_at" timestamp with time zone DEFAULT now(),
	"last_updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "tools_slug_unique" UNIQUE("slug"),
	CONSTRAINT "tools_dedup_key_unique" UNIQUE("dedup_key")
);
--> statement-breakpoint
CREATE TABLE "weekly_winners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edition_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"tool_id" uuid,
	"rank_score" numeric(5, 2),
	"selection_reason" text,
	"verification_status" varchar(30),
	"confidence" numeric(4, 3),
	"insufficient_evidence" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	CONSTRAINT "uq_winner_edition_category" UNIQUE("edition_id","category_id")
);
--> statement-breakpoint
ALTER TABLE "agent_runs" ADD CONSTRAINT "agent_runs_edition_id_weekly_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."weekly_editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fact_checks" ADD CONSTRAINT "fact_checks_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fact_checks" ADD CONSTRAINT "fact_checks_edition_id_weekly_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."weekly_editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "research_snapshots" ADD CONSTRAINT "research_snapshots_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "research_snapshots" ADD CONSTRAINT "research_snapshots_edition_id_weekly_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."weekly_editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_scores" ADD CONSTRAINT "tool_scores_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_scores" ADD CONSTRAINT "tool_scores_edition_id_weekly_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."weekly_editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tool_sources" ADD CONSTRAINT "tool_sources_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tools" ADD CONSTRAINT "tools_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weekly_winners" ADD CONSTRAINT "weekly_winners_edition_id_weekly_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."weekly_editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weekly_winners" ADD CONSTRAINT "weekly_winners_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weekly_winners" ADD CONSTRAINT "weekly_winners_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_fact_checks_tool" ON "fact_checks" USING btree ("tool_id");--> statement-breakpoint
CREATE INDEX "idx_tool_scores_edition" ON "tool_scores" USING btree ("edition_id");--> statement-breakpoint
CREATE INDEX "idx_tool_sources_tool" ON "tool_sources" USING btree ("tool_id");--> statement-breakpoint
CREATE INDEX "idx_tools_category" ON "tools" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_weekly_winners_edition" ON "weekly_winners" USING btree ("edition_id");