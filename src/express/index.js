'use strict';

const express = require(`express`);
const mainRoutes = require(`./routes/index`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);


const DEFAULT_PORT = 8080;

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(DEFAULT_PORT);
