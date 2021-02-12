-- Список категорий
SELECT *
FROM categories;

-- Список категорий, которые указаны в публикациях
SELECT id AS category_id, title AS category_title
FROM categories
         INNER JOIN articles_categories ac ON categories.id = ac.category_id;

-- Список категорий, которые указаны в публикациях, с указанием количества публикаций
SELECT id AS category_id, title AS category_title, count(article_id) AS article_count
FROM categories
         INNER JOIN articles_categories ac ON categories.id = ac.category_id
GROUP BY categories.id;

-- Список публикаций с количеством комментариев и списком категорий. Сначала свежие
SELECT articles.id,
       articles.title,
       articles.announcement,
       articles.publication_date,
       count(DISTINCT comments.id)                         AS comments_count,
       string_agg(DISTINCT c.title, ', ' ORDER BY c.title) AS categories_title
FROM articles
         LEFT JOIN articles_categories ac ON articles.id = ac.article_id
         LEFT JOIN categories c ON ac.category_id = c.id
         LEFT JOIN comments ON comments.article_id = articles.id
GROUP BY articles.id, articles.publication_date
ORDER BY articles.publication_date DESC;

-- Публикация с определенным id с количеством комментариев и списком категорий
SELECT articles.id,
       articles.title,
       articles.announcement,
       articles.text,
       articles.publication_date,
       articles.image,
       count(DISTINCT comments.id)                         AS comments_count,
       string_agg(DISTINCT c.title, ', ' ORDER BY c.title) AS categories_title
FROM articles
         LEFT JOIN articles_categories ac ON articles.id = ac.article_id
         LEFT JOIN categories c ON ac.category_id = c.id
         LEFT JOIN comments ON comments.article_id = articles.id
WHERE articles.id = 1
GROUP BY articles.id;

-- Пять последних комментариев с данными автора комментария
SELECT comments.id, article_id, u.first_name, u.last_name, text
FROM comments
         INNER JOIN users u ON comments.user_id = u.id
ORDER BY comments.create_date DESC
LIMIT 5;

-- Список комментариев для определенной публикации
SELECT comments.id, article_id, u.first_name, u.last_name, text
FROM comments
         INNER JOIN users u ON comments.user_id = u.id
WHERE article_id = 1
ORDER BY comments.create_date DESC;

-- Обновить заголовок публикации
UPDATE articles
SET title = 'Как я встретил Новый год. Оказывается заголовок из задания не удовлетворяет требованиям ТЗ :)'
WHERE id = 3;
