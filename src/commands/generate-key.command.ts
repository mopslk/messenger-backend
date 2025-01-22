import * as fs from 'node:fs/promises';
import * as crypto from 'crypto';
import * as path from 'path';

const KEY_FIELD_NAME = 'ENCRYPT_PRIVATE_KEY';

async function generateKey() {
  const key = crypto.randomBytes(16).toString('hex');

  const envPath = path.resolve(process.cwd(), '.env');

  let envContent = '';

  await fs.access(envPath);

  envContent = await fs.readFile(envPath, 'utf8');

  if (envContent.includes(KEY_FIELD_NAME)) {
    console.log(`🔑 Ключ ${KEY_FIELD_NAME} уже существует в .env`);
    return;
  }

  const newEnvContent = `${envContent.trim()}\n${KEY_FIELD_NAME}=${key}\n`;
  await fs.writeFile(envPath, newEnvContent, 'utf8');

  console.log('✅ Ключ успешно сгенерирован и добавлен в .env');
}

generateKey().catch((err) => {
  console.error('❌ Ошибка при генерации ключа:', err.message);
});
