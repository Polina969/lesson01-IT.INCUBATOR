import { DBType, db } from "../db/db";

export const deleteVideoController = {
  deleteFulVideo(db: DBType): void {
    db.videos = [];
  },
  deleteIDVideo(id: number) {
    if (isNaN(id)) {
      return 404; // 404, если id не число
    }

    const videoIndex = db.videos.findIndex((v) => v.id === id);

    if (videoIndex === -1) {
      return 404; // 404, если видео с таким id не найдено
    }

    db.videos.splice(videoIndex, 1); // Удаляем видео из массива
    return 204; // 204, если видео успешно удалено
  },
};
