-- CreateTable
CREATE TABLE "AuditTrail" (
    "id" UUID NOT NULL,
    "action" VARCHAR(50) NOT NULL,
    "actorID" UUID NOT NULL,
    "tableName" VARCHAR(100) NOT NULL,
    "recordId" UUID NOT NULL,
    "previousData" JSON,
    "newData" JSON,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditTrail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "session"("expire");

-- AddForeignKey
ALTER TABLE "AuditTrail" ADD CONSTRAINT "AuditTrail_actorID_fkey" FOREIGN KEY ("actorID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
