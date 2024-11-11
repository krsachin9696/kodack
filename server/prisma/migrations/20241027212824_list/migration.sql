/*
  Warnings:

  - The `status` column on the `AccessRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ListAccess` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "AccessRequest" DROP CONSTRAINT "AccessRequest_id_fkey";

-- DropForeignKey
ALTER TABLE "ListAccess" DROP CONSTRAINT "ListAccess_listID_fkey";

-- DropForeignKey
ALTER TABLE "ListAccess" DROP CONSTRAINT "ListAccess_userID_fkey";

-- AlterTable
ALTER TABLE "AccessRequest" DROP COLUMN "status",
ADD COLUMN     "status" "AccessStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "ListAccess";
