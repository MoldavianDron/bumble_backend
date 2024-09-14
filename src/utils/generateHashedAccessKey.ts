import bcrypt from "bcrypt";

export const generateHashedAccessKey = async (accessKey: string) => await bcrypt.hash(accessKey, 10);