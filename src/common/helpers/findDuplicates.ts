export const findDuplicates = <T>(data: T[], getKey: (item: T) => string): T[] => {
  const seen = new Set<string>();
  const duplicates: T[] = [];

  for (const entry of data) {
    const uniqueKey = getKey(entry);

    if (seen.has(uniqueKey)) {
      duplicates.push(entry); // If the key already exists, add to duplicates
    } else {
      seen.add(uniqueKey); // Otherwise, add the key to the Set
    }
  }
  return duplicates;
}