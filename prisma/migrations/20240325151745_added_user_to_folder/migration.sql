/*
  Warnings:

  - You are about to drop the column `folderId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_folderId_fkey";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "folderId",
ADD COLUMN     "folderName" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_folderName_fkey" FOREIGN KEY ("folderName") REFERENCES "Folder"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
