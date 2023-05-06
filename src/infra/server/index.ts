import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { appDataSource } from "../database";

import { router } from "./routes";

import { AppError } from "../../core/errors/app.error";

import { tmpFilePath } from "../configs/upload";

//iniciando o database
//vamos envolver a aplicação para garantir que suas chamadas a API vão ocorrer após a inicialização do DB
appDataSource.initialize();

// Create the Express app
const app = express();

// Configure middleware
app.use(express.json());

//Rotas da aplicação
app.use(router);

app.use("/avatar", express.static(`${tmpFilePath}/avatar`));
app.use("/icon", express.static(`${tmpFilePath}/icon`));
app.use("/service", express.static(`${tmpFilePath}/service`));

//Middleware para lidar com erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.code).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
});

// Start the server
const PORT = 3333;
app.listen(PORT);
