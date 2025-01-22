import {
  Controller, Get, Param, Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
import { Public } from '@/utils/decorators/public.decorator';
import { FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':folder/:file')
  @Public()
  async getFile(@Param('folder') folder: string, @Param('file') file: string, @Res() res: Response) {
    const path = join(folder, file);

    const isFileExist = await this.filesService.checkFileExists(path);

    if (!isFileExist) {
      res.sendStatus(404);
      return;
    }

    res.sendFile(path, { root: process.env.BASE_FILES_PATH });
  }
}
