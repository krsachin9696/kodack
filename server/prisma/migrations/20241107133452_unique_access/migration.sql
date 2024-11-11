/*
  Warnings:

  - A unique constraint covering the columns `[userID,listID]` on the table `AccessRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccessRequest_userID_listID_key" ON "AccessRequest"("userID", "listID");
