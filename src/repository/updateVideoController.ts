import { Resolutions } from "../models/video-db-type";

interface ErrorMessage {
  message: string;
  field: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ErrorMessage[];
}

export function validateUpdateVideoData(data: any): ValidationResult {
  const errors: ErrorMessage[] = [];

  // 1. Валидация title
  if (!data || !data.title) {
    errors.push({
      message: "<Поле 'title' обязательно для заполнения.>",
      field: "title",
    });
  } else if (typeof data.title !== "string") {
    errors.push({
      message: "Поле 'title' должно быть строкой.",
      field: "title",
    });
  } else if (data.title.trim() === "") {
    errors.push({
      message: "Поле 'title' не может быть пустой строкой.",
      field: "title",
    });
  } else if (data.title.length < 3 || data.title.length > 40) {
    errors.push({
      message: "<Длина поля 'title' должна быть от 3 до 40 символов.>",
      field: "title",
    });
  }

  // 2. Валидация author
  if (!data || !data.author) {
    errors.push({
      message: "Поле 'author' обязательно для заполнения.",
      field: "author",
    });
  } else if (typeof data.author !== "string") {
    errors.push({
      message: "Поле 'author' должно быть строкой.",
      field: "author",
    });
  } else if (data.author.trim() === "") {
    errors.push({
      message: "Поле 'author' не может быть пустой строкой.",
      field: "author",
    });
  } else if (data.author.length < 3 || data.author.length > 20) {
    errors.push({
      message: "Длина поля 'author' должна быть от 3 до 20 символов.",
      field: "author",
    });
  }

  //3. Валидация canBeDownloaded
  if (data.canBeDownloaded !== undefined) {
    // Проверка, есть ли поле в запросе
    if (typeof data.canBeDownloaded !== "boolean") {
      errors.push({
        message: "Поле 'canBeDownloaded' должно быть boolean.",
        field: "canBeDownloaded",
      });
    }
  }
  //   } else if (data.canBeDownloaded.trim() === "") {
  //     errors.push({
  //       message: "Поле 'canBeDownloaded' не может быть пустой строкой.",
  //       field: "canBeDownloaded",
  //     });

  //   }
  // 4. Валидация availableResolutions
  if (
    data.availableResolutions !== null &&
    data.availableResolutions !== undefined
  ) {
    if (!Array.isArray(data.availableResolutions)) {
      errors.push({
        message: "Поле 'availableResolutions' должно быть массивом или null.",
        field: "availableResolutions",
      });
    } else {
      for (const resolution of data.availableResolutions) {
        if (!Object.values(Resolutions).includes(resolution)) {
          errors.push({
            message: `Значение '${resolution}' в массиве 'availableResolutions' недопустимо. Допустимые значения: ${Object.values(
              Resolutions
            ).join(", ")}`,
            field: "availableResolutions",
          });
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}
