import { VideoDBType, Resolutions } from "../models/video-db-type";

export type DBType = { videos: VideoDBType[] };

// export const createdAt = new Date();
// export const publicationDate = new Date();
// publicationDate.setDate(createdAt.getDate() + 1);

export const db: DBType = {
  videos: [
    {
      id: 1,
      title: "VideoCotik",
      author: "CotoMama",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: "2025-01-09T01:32:13.176Z",
      publicationDate: "2025-01-10T01:32:13.176Z",
      availableResolutions: [Resolutions.P144],
    },
    {
      id: 2,
      title: "VideoDog",
      author: "DogoMama",
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: "2024-01-09T01:32:13.176Z",
      publicationDate: "2024-01-10T01:32:13.176Z",
      availableResolutions: [Resolutions.P144],
    },
  ],
};

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    // если в функцию ничего не передано - то очищаем базу данных
    db.videos = [];
    // db.some = []
    return;
  }

  // если чnо-то передано - то заменяем старые значения новыми
  db.videos = dataset.videos || db.videos;
  // db.some = dataset.some || db.some
};
