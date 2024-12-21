/*
  Warnings:

  - You are about to drop the column `director_id` on the `Movie` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Movie] DROP CONSTRAINT [Movie_director_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[Movie] DROP COLUMN [director_id];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
