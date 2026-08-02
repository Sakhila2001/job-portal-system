declare module "prisma/config" {
  export function defineConfig(config: Record<string, unknown>): Record<string, unknown>;
  export const env: Record<string, string | undefined>;
}
