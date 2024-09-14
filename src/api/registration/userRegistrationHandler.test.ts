import {db, client} from "~/test-mocks";
import {buildUserRegistrationHandler} from "~/api/registration/buildUserRegistrationHandler";

const findUser = jest.fn().mockResolvedValue(undefined);

const generateHashedAccessKey = jest.fn().mockResolvedValue('TEST_ACCESS_KEY');

const createUser = jest.fn().mockResolvedValue(
  {
    id: 'TEST_USER_ID',
    telegram_user_id: 'TEST_TELEGRAM_ID',
    access_key: 'TEST_ACCESS_KEY',
    created_at: '2024-09-13T18:30:20.372Z'
  }
);

const createUserBalance = jest.fn().mockResolvedValue({
  id: 'TEST_USER_BALANCE_ID',
  user_id: 'TEST_USER_ID',
  balance: 0,
});

const generateToken = jest.fn().mockReturnValue("TEST_TOKEN");

const createTelegramLoginSession = jest.fn();

const userRegistrationHandler = buildUserRegistrationHandler({
  db,
  findUser,
  generateHashedAccessKey,
  createUser,
  createUserBalance,
  generateToken,
  createTelegramLoginSession
});

describe("userRegistrationHandler", () => {
  const telegramUserId = "TEST_TELEGRAM_ID";

  afterEach(() => {
    jest.clearAllMocks();
  });

  const subject = () =>
    userRegistrationHandler({
      telegramUserId
    });

  it("creates user with given telegram id and generated hashed access key", async () => {
    await subject();
    expect(createUser).toHaveBeenCalledWith(client, telegramUserId, 'TEST_ACCESS_KEY');
  });

  it("creates user balance for a given user", async () => {
    await subject();
    expect(createUserBalance).toHaveBeenCalledWith(client, 'TEST_USER_ID')
  });

  it("creates telegram login session for a given user and with generated token", async () => {
    await subject();
    expect(createTelegramLoginSession).toHaveBeenCalledWith(client, 'TEST_USER_ID', 'TEST_TOKEN')
  });

  it("returns a correct response", async () => {
    const result = await subject();
    expect(result).toEqual({
      token: "TEST_TOKEN"
    })
  });
});