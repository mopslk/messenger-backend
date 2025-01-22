export function encodeBase64(value: string): string {
  const buffer = Buffer.from(value, 'utf-8');
  return buffer.toString('base64').replace(/=/g, '');
}

export function decodeBase64(encodedValue: string): string {
  const buffer = Buffer.from(encodedValue, 'base64');
  return buffer.toString('utf-8');
}
