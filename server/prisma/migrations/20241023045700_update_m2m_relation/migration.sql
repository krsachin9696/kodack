/*
  Warnings:

  - You are about to drop the `ListTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListTag" DROP CONSTRAINT "ListTag_listID_fkey";

-- DropForeignKey
ALTER TABLE "ListTag" DROP CONSTRAINT "ListTag_tagID_fkey";

-- DropTable
DROP TABLE "ListTag";

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "subject" VARCHAR(200) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ListToTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactUs_email_key" ON "ContactUs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ListToTag_AB_unique" ON "_ListToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ListToTag_B_index" ON "_ListToTag"("B");

-- AddForeignKey
ALTER TABLE "_ListToTag" ADD CONSTRAINT "_ListToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("listID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToTag" ADD CONSTRAINT "_ListToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
