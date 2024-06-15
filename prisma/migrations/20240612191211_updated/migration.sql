/*
  Warnings:

  - You are about to drop the column `bio` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `followrequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_blogId_fkey";

-- DropForeignKey
ALTER TABLE "followrequest" DROP CONSTRAINT "followrequest_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "followrequest" DROP CONSTRAINT "followrequest_senderId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "bio";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "followrequest";

-- DropTable
DROP TABLE "posts";
