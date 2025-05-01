-- AlterTable
ALTER TABLE "ListAccess" ALTER COLUMN "hasAccess" DROP DEFAULT;

-- CreateTable
CREATE TABLE "AccessRequest" (
    "id" UUID NOT NULL,
    "userID" UUID NOT NULL,
    "listID" UUID NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccessRequest" ADD CONSTRAINT "AccessRequest_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRequest" ADD CONSTRAINT "AccessRequest_listID_fkey" FOREIGN KEY ("listID") REFERENCES "List"("listID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRequest" ADD CONSTRAINT "AccessRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ListAccess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
