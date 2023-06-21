-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "UserId" TEXT;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
