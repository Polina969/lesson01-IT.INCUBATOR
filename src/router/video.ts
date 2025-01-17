import express, { Request, Response, Router } from "express";
import { HTTP_STATUSES } from "../utils";
import { DBType } from "../db/db";
import {
  publicationDate,
  validateVideoData,
} from "../repository/createVideoController";
import { VideoViewModel } from "../repository/createVideoController";
import { createVideoController } from "../repository/createVideoController";
import { createdAt } from "../repository/createVideoController";
import { deleteVideoController } from "../repository/deleteVideoController";
import { getVideosController } from "../repository/getVideosController";
import { validateUpdateVideoData } from "../repository/updateVideoController";

export const getVideoRouter = (db: DBType) => {
  const videoRouter = express.Router();
  videoRouter.post("/videos", (req: Request, res: Response) => {
    const validationResult = validateVideoData(req.body);

    if (!validationResult.isValid) {
      res.status(400).json({ errorsMessages: validationResult.errors });
      return;
    }

    try {
      const createdVideo: VideoViewModel = createVideoController.createVideo(
        req.body.title,
        req.body.author,
        req.body.availableResolutions
      ); // импорт к репозиторию
      res.status(201).json(createdVideo);
    } catch (error) {
      // Обработка ошибки
      console.error("Ошибка при создании видео:", error);
      res
        .status(400)
        .json({ message: "If the inputModel has incorrect values" });
    }
  });
  videoRouter.put("/videos/:id", (req: Request, res: Response) => {
    const validationResult = validateUpdateVideoData(req.body);
    if (!validationResult.isValid) {
      res.status(400).json({ errorsMessages: validationResult.errors });
      return;
    }

    // if (!req.body.title) {
    //   res.status(400).json({ errorsMessages: validationResult.errors });
    //   return;
    // }

    const foundVideo = db.videos.find((c) => c.id === +req.params.id);
    if (!foundVideo) {
      res.sendStatus(404).json({ errorsMessages: validationResult.errors });
      return;
    }

    foundVideo.title = req.body.title;
    foundVideo.author = req.body.author;
    foundVideo.availableResolutions = req.body.availableResolutions;
    foundVideo.canBeDownloaded = req.body.canBeDownloaded;
    foundVideo.minAgeRestriction = req.body.minAgeRestriction;
    foundVideo.publicationDate = req.body.publicationDate; // publicationDate.toISOString();

    res.sendStatus(204);
  });
  videoRouter.delete("/testing/all-data", (req: Request, res: Response) => {
    deleteVideoController.deleteFulVideo(db);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
  videoRouter.get("/videos", (req: Request, res: Response) => {
    const videosGET = db.videos; // получаем видео из бд
    res.status(200).json(videosGET);
  });
  videoRouter.get("/videos/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10); // это приравнивает к числу ну и делает красивую const по большей части можно обойтись просто req.params.id
    if (isNaN(id)) {
      res.sendStatus(404);
    }
    const video = getVideosController.findIDVideo(id);
    if (!video) {
      res.sendStatus(404);
    } else {
      res.status(200).json(video);
    }
  });
  videoRouter.delete("/videos/:id", (req: Request, res: Response): void => {
    const status = deleteVideoController.deleteIDVideo(+req.params.id);

    res.sendStatus(status);
  });
  return videoRouter;
};

// if (!+req.params.id) {
//   res.sendStatus(404);
// }
// let deleteVideo = db.videos.filter((c) => c.id !== +req.params.id);
// if (!deleteVideo) {
//   res.sendStatus(404);
// } else {
//   deleteVideo = db.videos;
//   res.sendStatus(204);
// }
