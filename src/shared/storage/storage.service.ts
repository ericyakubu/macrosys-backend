import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const UPLOADS_DIR = resolve(process.cwd(), 'uploads');

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

@Injectable()
export class StorageService {
  /** Saves the file and returns the path to store in the DB, e.g. /uploads/products/<uuid>.jpg */
  async save(file: Express.Multer.File, folder: string): Promise<string> {
    const name = `${randomUUID()}${EXT_BY_MIME[file.mimetype] ?? ''}`;
    const dir = join(UPLOADS_DIR, folder);

    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, name), file.buffer);

    return `/uploads/${folder}/${name}`;
  }

  async remove(path: string): Promise<void> {
    const target = resolve(UPLOADS_DIR, path.replace(/^\/uploads\//, ''));
    if (!target.startsWith(UPLOADS_DIR)) return; // never delete outside the uploads folder
    await unlink(target);
  }
}
