import { compare, hash } from "bcrypt";
import UserRepository from "../repositories/user-repository";
import { AppError } from "../utils/AppError";
import {
  PublicUser,
  publicUserSchema,
  User,
} from "../validations/schemas/user-schema";
import { encrypt } from "../utils/crypto";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(data: PublicUser): Promise<User> {
    const { success, error, data: userData } = publicUserSchema.safeParse(data);

    if (!success) {
      throw new AppError(
        error.errors.map((err) => err.message).join(", "),
        400
      );
    }

    const emailExists = await this.userRepository.findByEmail(userData.email);

    if (emailExists) {
      throw new AppError("Este e-mail já está em uso");
    }

    const cleanCpf = userData.cpf.replace(/\D/g, "");
    const hashedPassword = await hash(userData.password, 8);
    const encryptedCpf = encrypt(cleanCpf);

    const newUser = await this.userRepository.create({
      name: userData.name,
      email: userData.email,
      cpf: encryptedCpf,
      role: userData.role,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default UserService;
