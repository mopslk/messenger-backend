import * as bcrypt from 'bcryptjs';

export async function hash(value: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(value, salt);
}

export async function hashCompare(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}
