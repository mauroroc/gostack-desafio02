const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const repo = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  }; 
  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Project not found'})
  }
  repositories[repoIndex].title = title;
  repositories[repoIndex].url = url;
  repositories[repoIndex].techs = techs;
  return response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Project not found'})
  }
  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Project not found'})
  }
  repositories[repoIndex].likes++;
  return response.json(repositories[repoIndex]);
});

module.exports = app;
