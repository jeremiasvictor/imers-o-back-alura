import express from "express";
import { listarPosts } from "../controllers/postsController.js";

// Define a função de rotas
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());
  // Define a rota GET para /posts
  app.get("/posts", listarPosts);
}

// Exporta a função de rotas
export default routes;
