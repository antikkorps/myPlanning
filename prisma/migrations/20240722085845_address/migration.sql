-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "postalCode" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isHead" BOOLEAN NOT NULL DEFAULT false;
