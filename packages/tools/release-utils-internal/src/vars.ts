// As env var is alays string, we expect it to be "true",
// converting eny other value to false.
const toBool = (val: unknown): boolean => val === "true";

export const skipDepsBuild = (): boolean => toBool(process.env.MX_TOOLS_SKIP_DEPS_BUILD);
