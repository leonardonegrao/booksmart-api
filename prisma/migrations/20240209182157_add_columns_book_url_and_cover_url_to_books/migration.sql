/*
  Warnings:

  - You are about to drop the column `url` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookUrl` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverUrl` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "url",
ADD COLUMN     "bookUrl" TEXT NOT NULL,
ADD COLUMN     "coverUrl" TEXT NOT NULL;
