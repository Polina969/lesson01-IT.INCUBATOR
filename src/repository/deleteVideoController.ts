import { DBType } from "../db/db";

export const deleteVideoController = {
  deleteFulVideo(db: DBType): void {
    db.videos = [];
  },
};
