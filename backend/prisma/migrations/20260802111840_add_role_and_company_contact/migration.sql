-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "contact_number" TEXT,
ADD COLUMN     "hr_contact_name" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" VARCHAR(20) NOT NULL DEFAULT 'candidate';
