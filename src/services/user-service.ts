import { compare, hash } from "bcrypt";
import UserRepository from "../repositories/user-repository";
import { AppError } from "../utils/AppError";
import { User, userSchema } from "../validations/schemas/user-schema";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(data: User): Promise<User> {
    const { success, error } = userSchema.safeParse(data);

    if (!success) {
      throw new AppError(
        error.errors.map((err) => err.message).join(", "),
        400
      );
    }

    const emailExists = await this.userRepository.findByEmail(data.email);

    if (emailExists) {
      throw new AppError("Este e-mail já está em uso");
    }

    const hashedPassword = await hash(data.password, 8);

    const { name, email, cpf, role } = data;
    const cleanCpf = cpf.replace(/\D/g, "");

    const newUser = await this.userRepository.create({
      name,
      email,
      cpf: cleanCpf,
      role,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default UserService;
