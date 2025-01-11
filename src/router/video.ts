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

export const getVideoRouter = (db: DBType) => {
  const videoRouter = express.Router();
  videoRouter.post("/videos", (req: Request, res: Response) => {
    const validationResult = validateVideoData(req.body);

    if (!validationResult.isValid) {
      res.status(400).json({ errors: validationResult.errors });
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
    if (!req.body.title) {
      res.sendStatus(400);
      return;
    }

    const foundVideo = db.videos.find((c) => c.id === +req.params.id);
    if (!foundVideo) {
      res.sendStatus(404);
      return;
    }

    foundVideo.title = req.body.title;
    foundVideo.author = req.body.author;
    foundVideo.availableResolutions = req.body.availableResolutions;
    foundVideo.canBeDownloaded = req.body.canBeDownloaded;
    foundVideo.minAgeRestriction = req.body.minAgeRestriction;
    foundVideo.publicationDate = publicationDate.toISOString();

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
    const foundIDCourse = db.videos.find((p) => p.id === +req.params.id);
    const videosID = foundIDCourse; // получаем видео из бд
    res.status(200).json(videosID);
  });
  videoRouter.delete("/videos/:id", (req: Request, res: Response) => {
    if (isNaN(+req.params.id)) {
      res.sendStatus(404); // 404, если id не число
    }

    const videoIndex = db.videos.findIndex((v) => v.id === +req.params.id);

    if (videoIndex === -1) {
      res.sendStatus(404); // 404, если видео с таким id не найдено
    }

    db.videos.splice(videoIndex, 1); // Удаляем видео из массива
    res.sendStatus(204); // 204, если видео успешно удалено
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
  });
  return videoRouter;
};
