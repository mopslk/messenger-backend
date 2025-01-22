import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import { join } from 'path';

@Injectable()
export class FilesService {
  async deleteFile(path: string): Promise<void> {
    await fs.rm(path);
  }

  async checkFileExists(path: string): Promise<boolean> {
    try {
      await fs.access(join(process.env.BASE_FILES_PATH, path));
      return true;
    } catch {
      return false;
    }
  }
}
