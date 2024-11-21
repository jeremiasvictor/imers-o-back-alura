import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configura o armazenamento de arquivos enviados pelo multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo no destino
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  // Permite que o servidor interprete corpos de requisição no formato JSON
  app.use(express.json());

  // Rota para listar todos os posts (GET /posts)
  app.get("/posts", listarPosts); // Chama a função listarPosts para retornar todos os posts
  // Rota para criar um novo post (POST /posts)
  app.post("/posts", postarNovoPost); // Chama a função postarNovoPost para criar um novo post
  // Rota para fazer upload de uma imagem (POST /upload)
  app.post("/upload", upload.single("imagem"), uploadImagem);
  // O upload.single("imagem") configura o multer para lidar com um único arquivo com o nome "imagem"
  // A função uploadImagem processa o arquivo após o upload
};

// Exporta a função de rotas para ser utilizada em outros módulos
export default routes;
