const ensureEnvExists = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable "${name}" is required`);
  }

  return value;
};

export const Environment = {
  DB_HOST: ensureEnvExists('DB_HOST'),
  DB_USER: ensureEnvExists('DB_USER'),
  DB_PASSWORD: ensureEnvExists('DB_PASSWORD'),
  DB_NAME: ensureEnvExists('DB_NAME'),
  DB_PORT: ensureEnvExists('DB_PORT'),
  PORT: ensureEnvExists('PORT')
};