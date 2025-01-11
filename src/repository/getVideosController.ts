import { db } from "../db/db";

export const getVideosController = {
  findIDVideo(id: number) {
    const foundVideo = db.videos.find((p) => p.id === id);
    if (!foundVideo) return null;
    return foundVideo;
  },
};
