import { compare, hash } from "bcrypt";
import UserRepository from "../repositories/user-repository";
import { AppError } from "../utils/AppError";
import {
  PublicUser,
  publicUserSchema,
  User,
} from "../validations/schemas/user-schema";
import { encrypt } from "../utils/crypto";
import EmailService from "./email-service";
import { app } from "../app";

class UserService {
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
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

    const verificationToken = app.jwt.sign(
      { id: newUser.id, purpose: "email_verification" },
      { expiresIn: "1d" }
    );

    await this.emailService.sendVerificationEmail(
      newUser.email,
      verificationToken
    );

    return newUser;
  }
}

export default UserService;
