import "dotenv/config";
import { hash } from "bcrypt";
import prisma from "../../src/database/prismaClient";
import { User } from "../../src/validations/schemas/user-schema";
import { encrypt } from "../../src/utils/crypto";
import readline from "readline";

function askQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function createAdminUser(): Promise<User | void> {
  const answer = await askQuestion(
    "Tem certeza que deseja criar o Admin? (s/n): "
  );

  if (answer.toLowerCase() !== "s") {
    console.info("Operação cancelada.");
    process.exit(0);
  }

  const adminData: User = {
    name: "Admin Master",
    email: "admin@example.com",
    password: "admin123",
    cpf: "00000000000",
    role: "ADMIN",
  };

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminData.email },
  });

  if (existingAdmin) {
    console.info("Admin já existe.");
    return;
  }

  const hashedPassword = await hash(adminData.password, 8);
  const cleanCpf = adminData.cpf.replace(/\D/g, "");
  const encryptedCpf = encrypt(cleanCpf);

  await prisma.user.create({
    data: {
      name: adminData.name,
      email: adminData.email,
      cpf: encryptedCpf,
      role: adminData.role,
      password: hashedPassword,
    },
  });

  console.info(
    `Admin criado com e-mail: ${adminData.email} e senha: ${adminData.password}`
  );
}

createAdminUser()
  .then(() => {
    console.info("Seed finalizada.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Erro ao criar admin:", error);
    process.exit(1);
  });
