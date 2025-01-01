# FilmsTracker

Overview
FilmsTracker is a movie and TV show search app designed for users to explore, rate, and track their favorite films and series. This app uses the public API to fetch movie and TV show information, allowing users to search for content, view trending releases, and engage with the community through likes, dislikes, comments, and reviews. Users can also create personal watchlists

**Core Functionality:**

1. **Movie and Series Search**:  
   The search function enables users to find movies and series by title, release year, and genre.

2. **Detailed Information View**:  
   A dedicated page displays detailed information about the selected movie, including a synopsis, cast, director, rating, and release date. It also provides brief information about key crew members, such as actors, director, and writer.

3. **Favorites List**:  
   Users can add movies and series to a "Favorites" list for easy access later. Favorites are stored in local storage for user convenience.

4. **Ratings and Reviews**:  
   Users can view ratings and brief reviews of movies.

5. **Watched List**:  
   A section to track and list movies the user has already watched.

6. **AI Assistant**:  
   An AI assistant helps users find movies based on brief descriptions.

# Справка по лабам
- **Лаб 2:**
Лінтер налаштований окремо для змін клієнта (комміт https://github.com/slakeer/FilmsTracker/tree/e1e46fe42698c49bfa13470a6068f66f83e85494) і сервера (комміт https://github.com/slakeer/FilmsTracker/tree/3bd15ea714b8392782b7073ef71eee2047dbe828). Також було створено husky hook для застосування лінтера в обох частинах проекту в файлі .husky/pre-commit.
- **Лаб 3:** 
Здали на парі
- **Лаб 4:**
Основний функціонал проекту реалізований в папках client (frontend) i server (backend). Були реалізовані основні ендпоінти для власної API (через Express js) для взаємодії з даними з бд, а також ui для відображення даних користувачеві.
- **Лаб 5:**
Для коректної роботи з БД ми використали ORM Prisma. Була створена схема для бд проекту, яку можна знайти в папці server/prisma. Також було прийняте рішення використовувати дані для власної бд із public api сервісу tmdb, тому для заповнення нашої БД даними ми створили допоміжні скрипти fetch-genres.js, fetch-movies.js, які в свою чергу використовувались в основному скрипті parse-data.js (можна знайти в папці server/scripts).
- **Лаб 6:**
Клієнт та сервер окремо покривались юніт тестами з використанням ліби jest. Тести клієнта містяться у файлі з розташуванням client/src/App.test.js в якому прописані юніт тести основних методів для реєстрації та входу користувача на сайт. Тести сервера містяться в папці server/src/tests, де вони розбиті по окремим файлам для кожного з контролерів API.
- **Лаб 7:**
