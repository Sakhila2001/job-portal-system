/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "password_hash" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "profile_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_date" DATE,
    "headline" TEXT,
    "summary" TEXT,
    "total_experience_months" INTEGER,
    "current_ctc" DECIMAL(12,2),
    "expected_ctc" DECIMAL(12,2),
    "open_to_work" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "candidate_preferences" (
    "preference_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "remote_preferred" BOOLEAN NOT NULL DEFAULT false,
    "job_alert_enabled" BOOLEAN NOT NULL DEFAULT true,
    "profile_visible" BOOLEAN NOT NULL DEFAULT true,
    "preferred_job_type" TEXT,
    "minimum_expected_salary" DECIMAL(12,2),

    CONSTRAINT "candidate_preferences_pkey" PRIMARY KEY ("preference_id")
);

-- CreateTable
CREATE TABLE "resumes" (
    "resume_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "parsed_text" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("resume_id")
);

-- CreateTable
CREATE TABLE "education" (
    "education_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "institute_id" UUID,
    "qualification_id" UUID NOT NULL,
    "specialization_id" UUID,
    "specialization" TEXT,
    "start_year" INTEGER,
    "end_year" INTEGER,
    "score" DECIMAL(5,2),

    CONSTRAINT "education_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "candidate_experience" (
    "experience_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_id" UUID,
    "designation" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,

    CONSTRAINT "candidate_experience_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "candidate_skills" (
    "candidate_skill_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "proficiency_level" TEXT,
    "experience_months" INTEGER,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "candidate_skills_pkey" PRIMARY KEY ("candidate_skill_id")
);

-- CreateTable
CREATE TABLE "candidate_projects" (
    "project_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "project_name" TEXT NOT NULL,
    "description" TEXT,
    "project_url" TEXT,
    "start_date" DATE,
    "end_date" DATE,

    CONSTRAINT "candidate_projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "companies" (
    "company_id" UUID NOT NULL,
    "legal_name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "company_type" TEXT,
    "ownership_type" TEXT,
    "founded_year" INTEGER,
    "website_url" TEXT,
    "verification_status" TEXT NOT NULL DEFAULT 'pending',
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "company_profiles" (
    "company_profile_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "about_company" TEXT,
    "logo_url" TEXT,
    "cover_image_url" TEXT,
    "employee_count_min" INTEGER,
    "employee_count_max" INTEGER,
    "overall_rating" DECIMAL(3,2),
    "review_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("company_profile_id")
);

-- CreateTable
CREATE TABLE "company_locations" (
    "company_location_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "office_type" TEXT,
    "is_headquarters" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_locations_pkey" PRIMARY KEY ("company_location_id")
);

-- CreateTable
CREATE TABLE "company_industries" (
    "company_industry_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "industry_id" UUID NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_industries_pkey" PRIMARY KEY ("company_industry_id")
);

-- CreateTable
CREATE TABLE "company_benefits" (
    "company_benefit_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "benefit_id" UUID NOT NULL,
    "response_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "company_benefits_pkey" PRIMARY KEY ("company_benefit_id")
);

-- CreateTable
CREATE TABLE "employer_accounts" (
    "employer_account_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "status" TEXT NOT NULL DEFAULT 'invited',
    "invited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joined_at" TIMESTAMP(3),

    CONSTRAINT "employer_accounts_pkey" PRIMARY KEY ("employer_account_id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "job_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "created_by" UUID NOT NULL,
    "designation_id" UUID NOT NULL,
    "department_id" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employment_type" TEXT NOT NULL,
    "work_mode" TEXT NOT NULL,
    "seniority_level" TEXT,
    "min_experience_months" INTEGER,
    "max_experience_months" INTEGER,
    "min_salary" DECIMAL(12,2),
    "max_salary" DECIMAL(12,2),
    "salary_currency" TEXT NOT NULL DEFAULT 'NPR',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "job_locations" (
    "job_location_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "job_locations_pkey" PRIMARY KEY ("job_location_id")
);

-- CreateTable
CREATE TABLE "job_skills" (
    "job_skill_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "importance" TEXT DEFAULT 'nice_to_have',
    "min_experience_months" INTEGER,
    "is_mandatory" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "job_skills_pkey" PRIMARY KEY ("job_skill_id")
);

-- CreateTable
CREATE TABLE "job_qualifications" (
    "job_qualification_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "qualification_id" UUID NOT NULL,
    "specialization_id" UUID,
    "is_required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "job_qualifications_pkey" PRIMARY KEY ("job_qualification_id")
);

-- CreateTable
CREATE TABLE "job_benefits" (
    "job_benefit_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "benefit_id" UUID NOT NULL,

    CONSTRAINT "job_benefits_pkey" PRIMARY KEY ("job_benefit_id")
);

-- CreateTable
CREATE TABLE "job_tags" (
    "job_tag_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "job_tags_pkey" PRIMARY KEY ("job_tag_id")
);

-- CreateTable
CREATE TABLE "job_media" (
    "job_media_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "media_type" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "caption" TEXT,

    CONSTRAINT "job_media_pkey" PRIMARY KEY ("job_media_id")
);

-- CreateTable
CREATE TABLE "job_campaigns" (
    "campaign_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "campaign_type" TEXT NOT NULL,
    "budget" DECIMAL(12,2) NOT NULL,
    "starts_on" DATE NOT NULL,
    "ends_on" DATE NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "job_campaigns_pkey" PRIMARY KEY ("campaign_id")
);

-- CreateTable
CREATE TABLE "sponsored_job_placements" (
    "placement_id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "placement_type" TEXT NOT NULL,
    "bid_amount" DECIMAL(12,2) NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsored_job_placements_pkey" PRIMARY KEY ("placement_id")
);

-- CreateTable
CREATE TABLE "job_applications" (
    "application_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "candidate_id" UUID NOT NULL,
    "resume_id" UUID NOT NULL,
    "source" TEXT DEFAULT 'website',
    "status" TEXT NOT NULL DEFAULT 'applied',
    "cover_letter" TEXT,
    "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "withdrawn_at" TIMESTAMP(3),

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "application_status_history" (
    "application_status_history_id" UUID NOT NULL,
    "application_id" UUID NOT NULL,
    "old_status" TEXT,
    "new_status" TEXT NOT NULL,
    "changed_by_user_id" UUID,
    "note" TEXT,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_status_history_pkey" PRIMARY KEY ("application_status_history_id")
);

-- CreateTable
CREATE TABLE "application_screenings" (
    "screening_id" UUID NOT NULL,
    "application_id" UUID NOT NULL,
    "recruiter_id" UUID,
    "score" DECIMAL(5,2),
    "recommendation" TEXT,
    "feedback" TEXT,
    "screened_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_screenings_pkey" PRIMARY KEY ("screening_id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "interview_id" UUID NOT NULL,
    "application_id" UUID NOT NULL,
    "scheduled_by" UUID,
    "interview_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER,
    "meeting_url" TEXT,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("interview_id")
);

-- CreateTable
CREATE TABLE "interview_panelists" (
    "interview_panelist_id" UUID NOT NULL,
    "interview_id" UUID NOT NULL,
    "employer_account_id" UUID NOT NULL,
    "role" TEXT DEFAULT 'panelist',

    CONSTRAINT "interview_panelists_pkey" PRIMARY KEY ("interview_panelist_id")
);

-- CreateTable
CREATE TABLE "job_saved_items" (
    "saved_job_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "saved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_saved_items_pkey" PRIMARY KEY ("saved_job_id")
);

-- CreateTable
CREATE TABLE "job_alerts" (
    "job_alert_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "alert_name" TEXT NOT NULL,
    "frequency" TEXT NOT NULL DEFAULT 'daily',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_sent_at" TIMESTAMP(3),

    CONSTRAINT "job_alerts_pkey" PRIMARY KEY ("job_alert_id")
);

-- CreateTable
CREATE TABLE "job_alert_filters" (
    "job_alert_filter_id" UUID NOT NULL,
    "job_alert_id" UUID NOT NULL,
    "filter_type" TEXT NOT NULL,
    "filter_value" TEXT NOT NULL,

    CONSTRAINT "job_alert_filters_pkey" PRIMARY KEY ("job_alert_filter_id")
);

-- CreateTable
CREATE TABLE "job_search_events" (
    "search_event_id" UUID NOT NULL,
    "user_id" UUID,
    "session_id" TEXT,
    "query_text" TEXT,
    "applied_filters" JSONB,
    "result_count" INTEGER,
    "searched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_search_events_pkey" PRIMARY KEY ("search_event_id")
);

-- CreateTable
CREATE TABLE "job_impressions" (
    "impression_id" UUID NOT NULL,
    "user_id" UUID,
    "job_id" UUID NOT NULL,
    "session_id" TEXT,
    "source" TEXT,
    "rank_position" INTEGER,
    "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_impressions_pkey" PRIMARY KEY ("impression_id")
);

-- CreateTable
CREATE TABLE "job_recommendations" (
    "recommendation_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "relevance_score" DECIMAL(5,4) NOT NULL,
    "recommendation_reason" TEXT,
    "model_version" TEXT,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_recommendations_pkey" PRIMARY KEY ("recommendation_id")
);

-- CreateTable
CREATE TABLE "company_reviews" (
    "review_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "author_user_id" UUID NOT NULL,
    "designation_id" UUID,
    "location_id" UUID,
    "employment_status" TEXT,
    "overall_rating" INTEGER NOT NULL,
    "title" TEXT,
    "pros" TEXT,
    "cons" TEXT,
    "moderation_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "review_ratings" (
    "review_rating_id" UUID NOT NULL,
    "review_id" UUID NOT NULL,
    "rating_category_id" UUID NOT NULL,
    "rating" DECIMAL(3,2) NOT NULL,

    CONSTRAINT "review_ratings_pkey" PRIMARY KEY ("review_rating_id")
);

-- CreateTable
CREATE TABLE "review_votes" (
    "review_vote_id" UUID NOT NULL,
    "review_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "is_helpful" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_votes_pkey" PRIMARY KEY ("review_vote_id")
);

-- CreateTable
CREATE TABLE "salary_reports" (
    "salary_report_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "designation_id" UUID NOT NULL,
    "location_id" UUID,
    "author_user_id" UUID NOT NULL,
    "annual_salary" DECIMAL(14,2) NOT NULL,
    "salary_currency" TEXT NOT NULL DEFAULT 'NPR',
    "experience_months" INTEGER,
    "employment_type" TEXT,
    "moderation_status" TEXT NOT NULL DEFAULT 'pending',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "salary_reports_pkey" PRIMARY KEY ("salary_report_id")
);

-- CreateTable
CREATE TABLE "interview_experiences" (
    "interview_experience_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "designation_id" UUID NOT NULL,
    "author_user_id" UUID NOT NULL,
    "difficulty" TEXT,
    "outcome" TEXT,
    "experience_text" TEXT NOT NULL,
    "moderation_status" TEXT NOT NULL DEFAULT 'pending',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interview_experiences_pkey" PRIMARY KEY ("interview_experience_id")
);

-- CreateTable
CREATE TABLE "interview_questions" (
    "interview_question_id" UUID NOT NULL,
    "interview_experience_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "round_name" TEXT,
    "answer_hint" TEXT,

    CONSTRAINT "interview_questions_pkey" PRIMARY KEY ("interview_question_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" UUID NOT NULL,
    "question_category_id" UUID,
    "question_text" TEXT NOT NULL,
    "difficulty" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "company_comparisons" (
    "comparison_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "primary_company_id" UUID NOT NULL,
    "compared_company_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_comparisons_pkey" PRIMARY KEY ("comparison_id")
);

-- CreateTable
CREATE TABLE "subscription_plans" (
    "plan_id" UUID NOT NULL,
    "plan_name" TEXT NOT NULL,
    "plan_type" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "billing_period" TEXT NOT NULL,
    "features" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "user_subscriptions" (
    "subscription_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "starts_on" DATE NOT NULL,
    "ends_on" DATE NOT NULL,
    "auto_renew" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" UUID NOT NULL,
    "subscription_id" UUID NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NPR',
    "payment_provider" TEXT NOT NULL,
    "provider_transaction_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paid_at" TIMESTAMP(3),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "channel" TEXT NOT NULL,
    "notification_type" TEXT NOT NULL,
    "subject" TEXT,
    "payload" JSONB,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "sent_at" TIMESTAMP(3),
    "read_at" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "skills" (
    "skill_id" UUID NOT NULL,
    "skill_name" TEXT NOT NULL,
    "skill_category_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "designations" (
    "designation_id" UUID NOT NULL,
    "designation_name" TEXT NOT NULL,
    "role_category_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "designations_pkey" PRIMARY KEY ("designation_id")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" UUID NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT,
    "locality" TEXT,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "industries" (
    "industry_id" UUID NOT NULL,
    "industry_name" TEXT NOT NULL,
    "parent_industry_id" UUID,

    CONSTRAINT "industries_pkey" PRIMARY KEY ("industry_id")
);

-- CreateTable
CREATE TABLE "departments" (
    "department_id" UUID NOT NULL,
    "department_name" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "qualifications" (
    "qualification_id" UUID NOT NULL,
    "qualification_name" TEXT NOT NULL,
    "education_level" TEXT NOT NULL,

    CONSTRAINT "qualifications_pkey" PRIMARY KEY ("qualification_id")
);

-- CreateTable
CREATE TABLE "specializations" (
    "specialization_id" UUID NOT NULL,
    "qualification_id" UUID NOT NULL,
    "specialization_name" TEXT NOT NULL,

    CONSTRAINT "specializations_pkey" PRIMARY KEY ("specialization_id")
);

-- CreateTable
CREATE TABLE "benefits" (
    "benefit_id" UUID NOT NULL,
    "benefit_name" TEXT NOT NULL,
    "benefit_category_id" UUID,

    CONSTRAINT "benefits_pkey" PRIMARY KEY ("benefit_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" UUID NOT NULL,
    "tag_name" TEXT NOT NULL,
    "tag_type" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "audit_log_id" UUID NOT NULL,
    "actor_user_id" UUID,
    "entity_type" TEXT NOT NULL,
    "entity_id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "before_data" JSONB,
    "after_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("audit_log_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_key" ON "users"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_preferences_user_id_key" ON "candidate_preferences"("user_id");

-- CreateIndex
CREATE INDEX "resumes_user_id_idx" ON "resumes"("user_id");

-- CreateIndex
CREATE INDEX "education_user_id_idx" ON "education"("user_id");

-- CreateIndex
CREATE INDEX "candidate_experience_user_id_idx" ON "candidate_experience"("user_id");

-- CreateIndex
CREATE INDEX "candidate_skills_user_id_idx" ON "candidate_skills"("user_id");

-- CreateIndex
CREATE INDEX "candidate_skills_skill_id_idx" ON "candidate_skills"("skill_id");

-- CreateIndex
CREATE INDEX "candidate_projects_user_id_idx" ON "candidate_projects"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "company_profiles_company_id_key" ON "company_profiles"("company_id");

-- CreateIndex
CREATE INDEX "company_locations_company_id_idx" ON "company_locations"("company_id");

-- CreateIndex
CREATE INDEX "company_locations_location_id_idx" ON "company_locations"("location_id");

-- CreateIndex
CREATE INDEX "company_industries_company_id_idx" ON "company_industries"("company_id");

-- CreateIndex
CREATE INDEX "company_industries_industry_id_idx" ON "company_industries"("industry_id");

-- CreateIndex
CREATE INDEX "company_benefits_company_id_idx" ON "company_benefits"("company_id");

-- CreateIndex
CREATE INDEX "company_benefits_benefit_id_idx" ON "company_benefits"("benefit_id");

-- CreateIndex
CREATE INDEX "employer_accounts_user_id_idx" ON "employer_accounts"("user_id");

-- CreateIndex
CREATE INDEX "employer_accounts_company_id_idx" ON "employer_accounts"("company_id");

-- CreateIndex
CREATE INDEX "jobs_company_id_idx" ON "jobs"("company_id");

-- CreateIndex
CREATE INDEX "jobs_designation_id_idx" ON "jobs"("designation_id");

-- CreateIndex
CREATE INDEX "job_locations_job_id_idx" ON "job_locations"("job_id");

-- CreateIndex
CREATE INDEX "job_locations_location_id_idx" ON "job_locations"("location_id");

-- CreateIndex
CREATE INDEX "job_skills_job_id_idx" ON "job_skills"("job_id");

-- CreateIndex
CREATE INDEX "job_skills_skill_id_idx" ON "job_skills"("skill_id");

-- CreateIndex
CREATE INDEX "job_qualifications_job_id_idx" ON "job_qualifications"("job_id");

-- CreateIndex
CREATE INDEX "job_benefits_job_id_idx" ON "job_benefits"("job_id");

-- CreateIndex
CREATE INDEX "job_tags_job_id_idx" ON "job_tags"("job_id");

-- CreateIndex
CREATE INDEX "job_media_job_id_idx" ON "job_media"("job_id");

-- CreateIndex
CREATE INDEX "job_campaigns_company_id_idx" ON "job_campaigns"("company_id");

-- CreateIndex
CREATE INDEX "sponsored_job_placements_campaign_id_idx" ON "sponsored_job_placements"("campaign_id");

-- CreateIndex
CREATE INDEX "sponsored_job_placements_job_id_idx" ON "sponsored_job_placements"("job_id");

-- CreateIndex
CREATE INDEX "job_applications_job_id_idx" ON "job_applications"("job_id");

-- CreateIndex
CREATE INDEX "job_applications_candidate_id_idx" ON "job_applications"("candidate_id");

-- CreateIndex
CREATE INDEX "application_status_history_application_id_idx" ON "application_status_history"("application_id");

-- CreateIndex
CREATE INDEX "application_screenings_application_id_idx" ON "application_screenings"("application_id");

-- CreateIndex
CREATE INDEX "interviews_application_id_idx" ON "interviews"("application_id");

-- CreateIndex
CREATE INDEX "interview_panelists_interview_id_idx" ON "interview_panelists"("interview_id");

-- CreateIndex
CREATE INDEX "interview_panelists_employer_account_id_idx" ON "interview_panelists"("employer_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "job_saved_items_user_id_job_id_key" ON "job_saved_items"("user_id", "job_id");

-- CreateIndex
CREATE INDEX "job_alerts_user_id_idx" ON "job_alerts"("user_id");

-- CreateIndex
CREATE INDEX "job_alert_filters_job_alert_id_idx" ON "job_alert_filters"("job_alert_id");

-- CreateIndex
CREATE INDEX "job_search_events_user_id_idx" ON "job_search_events"("user_id");

-- CreateIndex
CREATE INDEX "job_impressions_user_id_idx" ON "job_impressions"("user_id");

-- CreateIndex
CREATE INDEX "job_impressions_job_id_idx" ON "job_impressions"("job_id");

-- CreateIndex
CREATE INDEX "job_recommendations_user_id_idx" ON "job_recommendations"("user_id");

-- CreateIndex
CREATE INDEX "job_recommendations_job_id_idx" ON "job_recommendations"("job_id");

-- CreateIndex
CREATE INDEX "company_reviews_company_id_idx" ON "company_reviews"("company_id");

-- CreateIndex
CREATE INDEX "review_ratings_review_id_idx" ON "review_ratings"("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "review_votes_review_id_user_id_key" ON "review_votes"("review_id", "user_id");

-- CreateIndex
CREATE INDEX "salary_reports_company_id_idx" ON "salary_reports"("company_id");

-- CreateIndex
CREATE INDEX "interview_experiences_company_id_idx" ON "interview_experiences"("company_id");

-- CreateIndex
CREATE INDEX "interview_questions_interview_experience_id_idx" ON "interview_questions"("interview_experience_id");

-- CreateIndex
CREATE INDEX "interview_questions_question_id_idx" ON "interview_questions"("question_id");

-- CreateIndex
CREATE INDEX "company_comparisons_user_id_idx" ON "company_comparisons"("user_id");

-- CreateIndex
CREATE INDEX "user_subscriptions_user_id_idx" ON "user_subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "payments_subscription_id_idx" ON "payments"("subscription_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_skill_name_key" ON "skills"("skill_name");

-- CreateIndex
CREATE INDEX "specializations_qualification_id_idx" ON "specializations"("qualification_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_name_key" ON "tags"("tag_name");

-- CreateIndex
CREATE INDEX "audit_logs_actor_user_id_idx" ON "audit_logs"("actor_user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_preferences" ADD CONSTRAINT "candidate_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_qualification_id_fkey" FOREIGN KEY ("qualification_id") REFERENCES "qualifications"("qualification_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "specializations"("specialization_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_experience" ADD CONSTRAINT "candidate_experience_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_experience" ADD CONSTRAINT "candidate_experience_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("skill_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_projects" ADD CONSTRAINT "candidate_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_profiles" ADD CONSTRAINT "company_profiles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_locations" ADD CONSTRAINT "company_locations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_locations" ADD CONSTRAINT "company_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_industries" ADD CONSTRAINT "company_industries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_industries" ADD CONSTRAINT "company_industries_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "industries"("industry_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_benefits" ADD CONSTRAINT "company_benefits_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_benefits" ADD CONSTRAINT "company_benefits_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "benefits"("benefit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employer_accounts" ADD CONSTRAINT "employer_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employer_accounts" ADD CONSTRAINT "employer_accounts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "employer_accounts"("employer_account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "designations"("designation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_locations" ADD CONSTRAINT "job_locations_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_locations" ADD CONSTRAINT "job_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("skill_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_qualifications" ADD CONSTRAINT "job_qualifications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_qualifications" ADD CONSTRAINT "job_qualifications_qualification_id_fkey" FOREIGN KEY ("qualification_id") REFERENCES "qualifications"("qualification_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_qualifications" ADD CONSTRAINT "job_qualifications_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "specializations"("specialization_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_benefits" ADD CONSTRAINT "job_benefits_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_benefits" ADD CONSTRAINT "job_benefits_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "benefits"("benefit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_tags" ADD CONSTRAINT "job_tags_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_tags" ADD CONSTRAINT "job_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_media" ADD CONSTRAINT "job_media_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_campaigns" ADD CONSTRAINT "job_campaigns_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsored_job_placements" ADD CONSTRAINT "sponsored_job_placements_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "job_campaigns"("campaign_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsored_job_placements" ADD CONSTRAINT "sponsored_job_placements_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "resumes"("resume_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_status_history" ADD CONSTRAINT "application_status_history_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "job_applications"("application_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_screenings" ADD CONSTRAINT "application_screenings_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "job_applications"("application_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "job_applications"("application_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_panelists" ADD CONSTRAINT "interview_panelists_interview_id_fkey" FOREIGN KEY ("interview_id") REFERENCES "interviews"("interview_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_panelists" ADD CONSTRAINT "interview_panelists_employer_account_id_fkey" FOREIGN KEY ("employer_account_id") REFERENCES "employer_accounts"("employer_account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_saved_items" ADD CONSTRAINT "job_saved_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_saved_items" ADD CONSTRAINT "job_saved_items_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_alerts" ADD CONSTRAINT "job_alerts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_alert_filters" ADD CONSTRAINT "job_alert_filters_job_alert_id_fkey" FOREIGN KEY ("job_alert_id") REFERENCES "job_alerts"("job_alert_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_search_events" ADD CONSTRAINT "job_search_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_impressions" ADD CONSTRAINT "job_impressions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_impressions" ADD CONSTRAINT "job_impressions_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_recommendations" ADD CONSTRAINT "job_recommendations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_recommendations" ADD CONSTRAINT "job_recommendations_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_reviews" ADD CONSTRAINT "company_reviews_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_reviews" ADD CONSTRAINT "company_reviews_author_user_id_fkey" FOREIGN KEY ("author_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_reviews" ADD CONSTRAINT "company_reviews_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "designations"("designation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_reviews" ADD CONSTRAINT "company_reviews_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_ratings" ADD CONSTRAINT "review_ratings_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "company_reviews"("review_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_votes" ADD CONSTRAINT "review_votes_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "company_reviews"("review_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_votes" ADD CONSTRAINT "review_votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary_reports" ADD CONSTRAINT "salary_reports_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary_reports" ADD CONSTRAINT "salary_reports_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "designations"("designation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary_reports" ADD CONSTRAINT "salary_reports_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary_reports" ADD CONSTRAINT "salary_reports_author_user_id_fkey" FOREIGN KEY ("author_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_experiences" ADD CONSTRAINT "interview_experiences_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_experiences" ADD CONSTRAINT "interview_experiences_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "designations"("designation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_experiences" ADD CONSTRAINT "interview_experiences_author_user_id_fkey" FOREIGN KEY ("author_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_questions" ADD CONSTRAINT "interview_questions_interview_experience_id_fkey" FOREIGN KEY ("interview_experience_id") REFERENCES "interview_experiences"("interview_experience_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_questions" ADD CONSTRAINT "interview_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_comparisons" ADD CONSTRAINT "company_comparisons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_comparisons" ADD CONSTRAINT "company_comparisons_primary_company_id_fkey" FOREIGN KEY ("primary_company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_comparisons" ADD CONSTRAINT "company_comparisons_compared_company_id_fkey" FOREIGN KEY ("compared_company_id") REFERENCES "companies"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "subscription_plans"("plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "user_subscriptions"("subscription_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "industries" ADD CONSTRAINT "industries_parent_industry_id_fkey" FOREIGN KEY ("parent_industry_id") REFERENCES "industries"("industry_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specializations" ADD CONSTRAINT "specializations_qualification_id_fkey" FOREIGN KEY ("qualification_id") REFERENCES "qualifications"("qualification_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
