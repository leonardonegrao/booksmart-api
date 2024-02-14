/*
  Warnings:

  - You are about to drop the column `bookUrl` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `coverUrl` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookBucketKey` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverBucketKey` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "bookUrl",
DROP COLUMN "coverUrl",
ADD COLUMN     "bookBucketKey" TEXT NOT NULL,
ADD COLUMN     "coverBucketKey" TEXT NOT NULL;
