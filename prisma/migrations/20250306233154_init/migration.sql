-- AlterTable
CREATE SEQUENCE activity_registeredcount_seq;
ALTER TABLE "Activity" ALTER COLUMN "registeredCount" SET DEFAULT nextval('activity_registeredcount_seq');
ALTER SEQUENCE activity_registeredcount_seq OWNED BY "Activity"."registeredCount";
