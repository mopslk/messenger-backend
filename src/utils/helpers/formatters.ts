export function convertDaysToMs(days: number): number {
  return days * 24 * 60 * 60 * 1000;
}

export function convertSecondsToMs(seconds: number): number {
  return seconds * 1000;
}

export function formatChatMembers(membersList, userId: bigint): string[] {
  return membersList.reduce(
    (result: string[], member: any) => (member.user_id !== userId
      ? [...result, member.user_id.toString()]
      : result),
    [],
  );
}
