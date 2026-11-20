CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(120) NOT NULL,
	"slug" varchar(140) NOT NULL,
	"description" text,
	"display_order" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"user_id" uuid,
	"full_name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL,
	"location" varchar(150) NOT NULL,
	"profession" varchar(120) NOT NULL,
	"message" text,
	"consent" boolean DEFAULT false NOT NULL,
	"status" varchar(30) DEFAULT 'new',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "listing_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_name" varchar(200) NOT NULL,
	"product_name" varchar(200) NOT NULL,
	"website_url" text NOT NULL,
	"contact_name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL,
	"category_id" uuid,
	"description" text,
	"payment_status" varchar(30) DEFAULT 'pending',
	"payment_reference" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"source_url" text NOT NULL,
	"source_title" text,
	"source_type" varchar(40),
	"credibility_level" varchar(20),
	"claims_supported" jsonb DEFAULT '[]'::jsonb,
	"published_at" timestamp with time zone,
	"checked_at" timestamp with time zone DEFAULT now(),
	"is_verified" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid,
	"name" varchar(200) NOT NULL,
	"slug" varchar(220) NOT NULL,
	"official_url" text NOT NULL,
	"logo_url" text,
	"tagline" varchar(120),
	"short_description" varchar(120),
	"overview" text,
	"problem_solved" text,
	"how_it_works" text,
	"features" jsonb DEFAULT '[]'::jsonb,
	"use_cases" jsonb DEFAULT '[]'::jsonb,
	"target_audience" jsonb DEFAULT '[]'::jsonb,
	"pricing_model" text,
	"pricing_details" jsonb DEFAULT '{}'::jsonb,
	"integrations" jsonb DEFAULT '[]'::jsonb,
	"alternatives" jsonb DEFAULT '[]'::jsonb,
	"selection_rationale" text,
	"status" varchar(20) DEFAULT 'draft',
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150),
	"email" varchar(255) NOT NULL,
	"image" text,
	"role" varchar(20) DEFAULT 'user',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "weekly_editions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edition_name" varchar(150),
	"week_start" date NOT NULL,
	"week_end" date NOT NULL,
	"status" varchar(20) DEFAULT 'draft',
	"published_at" timestamp with time zone,
	"approved_by" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "weekly_editions_week_start_unique" UNIQUE("week_start")
);
--> statement-breakpoint
CREATE TABLE "weekly_picks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edition_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"product_id" uuid,
	"ranking_score" numeric(5, 2),
	"selection_reason" text,
	"verification_status" varchar(30),
	"published_at" timestamp with time zone,
	CONSTRAINT "uq_edition_category" UNIQUE("edition_id","category_id")
);
--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_submissions" ADD CONSTRAINT "listing_submissions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_sources" ADD CONSTRAINT "product_sources_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weekly_picks" ADD CONSTRAINT "weekly_picks_edition_id_weekly_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."weekly_editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weekly_picks" ADD CONSTRAINT "weekly_picks_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weekly_picks" ADD CONSTRAINT "weekly_picks_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_leads_product" ON "leads" USING btree ("product_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_leads_email" ON "leads" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_product_sources_product" ON "product_sources" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "idx_products_category" ON "products" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_products_status" ON "products" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_weekly_picks_edition" ON "weekly_picks" USING btree ("edition_id","category_id");