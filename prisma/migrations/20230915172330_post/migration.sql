-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_id_key" ON "post"("id");
