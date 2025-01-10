import express, { Response, Request } from "express";
import { Resolutions } from "../models/video-db-type";
import { db } from "../db/db";
import { VideoDBType } from "../models/video-db-type";

export const createdAt = new Date();
export const publicationDate = new Date();
publicationDate.setDate(createdAt.getDate() + 1);

export type VideoViewModel = {
  id: number | string;
  title: string;
  availableResolutions: Resolutions[] | null;
};

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface VideoData {
  title: string;
  author: string;
  availableResolutions: Resolutions[] | null | undefined;
}

export function validateVideoData(data: any): ValidationResult {
  const errors: string[] = [];

  // 1. Валидация title
  if (!data || !data.title) {
    errors.push("Поле 'title' обязательно для заполнения.");
  } else if (typeof data.title !== "string") {
    errors.push("Поле 'title' должно быть строкой.");
  } else if (data.title.trim() === "") {
    errors.push("Поле 'title' не может быть пустой строкой.");
  } else if (data.title.length < 3 || data.title.length > 40) {
    errors.push("Длина поля 'title' должна быть от 3 до 10 символов.");
  }

  // 2. Валидация author
  if (!data || !data.author) {
    errors.push("Поле 'author' обязательно для заполнения.");
  } else if (typeof data.author !== "string") {
    errors.push("Поле 'author' должно быть строкой.");
  } else if (data.author.trim() === "") {
    errors.push("Поле 'author' не может быть пустой строкой.");
  } else if (data.author.length < 3 || data.author.length > 20) {
    errors.push("Длина поля 'author' должна быть от 3 до 20 символов.");
  }

  // 3. Валидация availableResolutions
  if (
    data.availableResolutions !== null &&
    data.availableResolutions !== undefined
  ) {
    if (!Array.isArray(data.availableResolutions)) {
      errors.push("Поле 'availableResolutions' должно быть массивом или null.");
    } else {
      for (const resolution of data.availableResolutions) {
        if (!Object.values(Resolutions).includes(resolution)) {
          errors.push(
            `Значение '${resolution}' в массиве 'availableResolutions' недопустимо. Допустимые значения: ${Object.values(
              Resolutions
            ).join(", ")}`
          );
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

export const createVideoController = {
  createVideo(
    title: string,
    author: string,
    availableResolutions: Resolutions[] | null
  ): VideoDBType {
    const createdVideos = {
      id: +new Date(),
      title: title,
      author: author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: createdAt.toISOString(),
      publicationDate: publicationDate.toISOString(),
      availableResolutions: availableResolutions,
    };

    db.videos.push(createdVideos);
    return createdVideos;
  },
};
