-- CreateTable
CREATE TABLE "ListAccess" (
    "id" UUID NOT NULL,
    "userID" UUID NOT NULL,
    "listID" UUID NOT NULL,
    "hasAccess" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListAccess_userID_listID_key" ON "ListAccess"("userID", "listID");

-- AddForeignKey
ALTER TABLE "ListAccess" ADD CONSTRAINT "ListAccess_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListAccess" ADD CONSTRAINT "ListAccess_listID_fkey" FOREIGN KEY ("listID") REFERENCES "List"("listID") ON DELETE RESTRICT ON UPDATE CASCADE;
