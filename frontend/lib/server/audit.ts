import prisma from "./prisma";

export type Auditable = {
  createdBy?: string | null;
  updatedBy?: string | null;
};

export type WithUserNames<T> = T & {
  createdByName: string | null;
  updatedByName: string | null;
};

async function nameMapByIds(ids: string[]) {
  const users = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      email: true,
      profile: { select: { firstName: true, lastName: true } },
    },
  });

  const map = new Map<string, string>();
  for (const user of users) {
    const full = [user.profile?.firstName, user.profile?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    map.set(user.id, full || user.email);
  }
  return map;
}

export async function withUserNames<T extends Auditable>(
  items: T[]
): Promise<WithUserNames<T>[]> {
  const ids = Array.from(
    new Set(
      items.flatMap((item) =>
        [item.createdBy, item.updatedBy].filter(
          (value): value is string => typeof value === "string"
        )
      )
    )
  );

  const map = ids.length > 0 ? await nameMapByIds(ids) : new Map<string, string>();

  return items.map((item) => ({
    ...item,
    createdByName: item.createdBy ? (map.get(item.createdBy) ?? null) : null,
    updatedByName: item.updatedBy ? (map.get(item.updatedBy) ?? null) : null,
  }));
}

export async function withUserName<T extends Auditable>(item: T): Promise<WithUserNames<T>> {
  return (await withUserNames([item]))[0]!;
}
