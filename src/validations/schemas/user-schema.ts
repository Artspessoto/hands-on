import { z } from "zod";
import isValidCPF from "../../utils/isValidCPF";

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
  cpf: z
    .string({ required_error: "CPF é obrigatório" })
    .refine((doc) => isValidCPF(doc), { message: "CPF inválido" }),
  email: z
    .string()
    .email("O formato do e-mail é inválido")
    .max(256, "O e-mail pode conter no máximo 256 caracteres"),
  emailVerified: z.boolean().optional().default(false),
  role: z.enum(["ADMIN", "LEADER", "DONOR", "VOLUNTEER"]).default("DONOR"),
  password: z
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .max(16, "A senha pode conter no máximo 16 caracteres"),
});

export const publicUserSchema = userSchema
  .omit({
    emailVerified: true,
    role: true,
  })
  .extend({
    role: z.enum(["DONOR", "VOLUNTEER"]).default("DONOR"),
  });

export type User = z.infer<typeof userSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
