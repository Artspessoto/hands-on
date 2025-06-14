import prisma from "../database/prismaClient";
import { User } from "../validations/schemas/user-schema";

class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
  async findByUser(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }
  async create(data: User): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }
  async update(data: User, userId: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return user;
  }
  async list() {
    const users = await prisma.user.findMany();
    return users;
  }
}

export default UserRepository;
