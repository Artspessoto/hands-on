import prisma from "../database/prismaClient";
import { User } from "../validations/schemas/user-schema";

class SessionRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}

export default SessionRepository;
