import { z } from "zod";

export const querySchema = z.object({
  token: z.string().min(10, "Token inválido").nonempty("Token é obrigatório"),
});

export type QuerySchema = z.infer<typeof querySchema>;
