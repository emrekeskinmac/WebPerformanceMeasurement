import { compare, hash } from "bcryptjs";

export const BCryptService = {
  async hash(password: string): Promise<string> {
    return await hash(password, 10);
  },
  async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(rawPassword, hashedPassword);
  }

}