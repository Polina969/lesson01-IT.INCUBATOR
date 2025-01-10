export enum Resolutions {
  P144 = "P144",
  P240 = "P240",
  P360 = "P360",
  P480 = "P480",
  P720 = "P720",
  P1080 = "P1080",
  P1440 = "P1440",
  P2160 = "P2160",
}

export function createItemClient(data: any) {
  const createdAt = new Date();
  const publicationDate = new Date(createdAt);
  publicationDate.setDate(createdAt.getDate() + 1);

  return {
    ...data,
    createdAt: createdAt.toISOString(),
    publicationDate: publicationDate.toISOString(),
  };
}

export type VideoDBType = {
  id: number | string;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: Resolutions[] | null;
};
