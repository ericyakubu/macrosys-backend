// shared/diets/resolve-conflicts.ts
/** orderedIds: в порядке выбора, поздние побеждают. conflicts: диета -> все, с кем она несовместима */
export function resolveConflicts(
  orderedIds: string[],
  conflicts: Map<string, Set<string>>,
): string[] {
  let accepted: string[] = [];
  for (const id of orderedIds) {
    const incompatible = conflicts.get(id) ?? new Set<string>();
    accepted = [...accepted.filter((a) => !incompatible.has(a)), id];
  }
  return accepted;
}
