import prisma from "../database/prismaClient";
import { User } from "../validations/schemas/user-schema";

class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
  async create(data: User) {
    const user = await prisma.user.create({ data });
    return user;
  }
}

export default UserRepository;
