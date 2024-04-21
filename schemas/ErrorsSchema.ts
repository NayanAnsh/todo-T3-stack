import * as z from "zod";

export const stringError = z.object({
  error: z.string(),
});
