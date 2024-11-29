export function getTokenSignature(token: string): string { // bcrypt не может корректно обрабатывать значения больше 64 символов
  return token.split('.').at(-1);
}
