/*
  Warnings:

  - You are about to drop the column `genre_id` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `release_year` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[external_id]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[external_id]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_path` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmdb_rating` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmdb_vote_count` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_count` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Movie] DROP CONSTRAINT [Movie_genre_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[Genre] ADD [external_id] INT;

-- AlterTable
ALTER TABLE [dbo].[Movie] DROP COLUMN [genre_id],
[release_year];
ALTER TABLE [dbo].[Movie] ADD [adult] BIT NOT NULL CONSTRAINT [Movie_adult_df] DEFAULT 0,
[external_id] INT,
[image_path] NVARCHAR(1000) NOT NULL,
[release_date] DATETIME2 NOT NULL,
[tmdb_rating] FLOAT(53) NOT NULL,
[tmdb_vote_count] FLOAT(53) NOT NULL,
[vote_count] FLOAT(53) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[MovieGenre] (
    [id] INT NOT NULL IDENTITY(1,1),
    [movie_id] INT NOT NULL,
    [genre_id] INT NOT NULL,
    CONSTRAINT [MovieGenre_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
ALTER TABLE [dbo].[Genre] ADD CONSTRAINT [Genre_external_id_key] UNIQUE NONCLUSTERED ([external_id]);

-- CreateIndex
ALTER TABLE [dbo].[Movie] ADD CONSTRAINT [Movie_external_id_key] UNIQUE NONCLUSTERED ([external_id]);

-- AddForeignKey
ALTER TABLE [dbo].[MovieGenre] ADD CONSTRAINT [MovieGenre_genre_id_fkey] FOREIGN KEY ([genre_id]) REFERENCES [dbo].[Genre]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MovieGenre] ADD CONSTRAINT [MovieGenre_movie_id_fkey] FOREIGN KEY ([movie_id]) REFERENCES [dbo].[Movie]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
