BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Actor] (
    [id] INT NOT NULL IDENTITY(1,1),
    [actor_name] NVARCHAR(1000) NOT NULL,
    [actor_surname] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Actor_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Genre] (
    [id] INT NOT NULL IDENTITY(1,1),
    [genre_name] NVARCHAR(1000) NOT NULL,
    [external_id] INT NOT NULL,
    CONSTRAINT [Genre_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Genre_external_id_key] UNIQUE NONCLUSTERED ([external_id])
);

-- CreateTable
CREATE TABLE [dbo].[Director] (
    [id] INT NOT NULL IDENTITY(1,1),
    [director_name] NVARCHAR(1000) NOT NULL,
    [director_surname] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Director_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Movie] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [adult] BIT NOT NULL CONSTRAINT [Movie_adult_df] DEFAULT 0,
    [external_id] INT NOT NULL,
    [image_path] NVARCHAR(1000) NOT NULL,
    [release_date] DATETIME2 NOT NULL,
    [tmdb_rating] FLOAT(53) NOT NULL,
    [tmdb_vote_count] FLOAT(53) NOT NULL,
    CONSTRAINT [Movie_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Movie_external_id_key] UNIQUE NONCLUSTERED ([external_id])
);

-- CreateTable
CREATE TABLE [dbo].[MovieGenre] (
    [id] INT NOT NULL IDENTITY(1,1),
    [movie_id] INT NOT NULL,
    [genre_id] INT NOT NULL,
    CONSTRAINT [MovieGenre_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Review] (
    [id] INT NOT NULL IDENTITY(1,1),
    [movie_id] INT NOT NULL,
    [user_id] INT NOT NULL,
    [rating] FLOAT(53) NOT NULL,
    [review_text] NVARCHAR(1000) NOT NULL,
    [review_date] DATETIME2 NOT NULL,
    CONSTRAINT [Review_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ActorMovie] (
    [id] INT NOT NULL IDENTITY(1,1),
    [actor_id] INT NOT NULL,
    [movie_id] INT NOT NULL,
    CONSTRAINT [ActorMovie_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FavoriteMovie] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [movie_id] INT NOT NULL,
    CONSTRAINT [FavoriteMovie_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[WatchedMovie] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [movie_id] INT NOT NULL,
    CONSTRAINT [WatchedMovie_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[MovieGenre] ADD CONSTRAINT [MovieGenre_genre_id_fkey] FOREIGN KEY ([genre_id]) REFERENCES [dbo].[Genre]([external_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MovieGenre] ADD CONSTRAINT [MovieGenre_movie_id_fkey] FOREIGN KEY ([movie_id]) REFERENCES [dbo].[Movie]([external_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Review] ADD CONSTRAINT [Review_movie_id_fkey] FOREIGN KEY ([movie_id]) REFERENCES [dbo].[Movie]([external_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Review] ADD CONSTRAINT [Review_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ActorMovie] ADD CONSTRAINT [ActorMovie_actor_id_fkey] FOREIGN KEY ([actor_id]) REFERENCES [dbo].[Actor]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ActorMovie] ADD CONSTRAINT [ActorMovie_movie_id_fkey] FOREIGN KEY ([movie_id]) REFERENCES [dbo].[Movie]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FavoriteMovie] ADD CONSTRAINT [FavoriteMovie_movie_id_fkey] FOREIGN KEY ([movie_id]) REFERENCES [dbo].[Movie]([external_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FavoriteMovie] ADD CONSTRAINT [FavoriteMovie_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WatchedMovie] ADD CONSTRAINT [WatchedMovie_movie_id_fkey] FOREIGN KEY ([movie_id]) REFERENCES [dbo].[Movie]([external_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WatchedMovie] ADD CONSTRAINT [WatchedMovie_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
