// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    expect(bank.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    expect(() => bank.withdraw(1000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    const bankForTransfering = getBankAccount(initialBalance);
    expect(() => bank.transfer(1000, bankForTransfering)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    expect(() => bank.transfer(50, bank)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    const deposit = 1000;
    expect(bank.deposit(deposit).getBalance()).toBe(deposit + initialBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    const deposit = 100;
    expect(bank.withdraw(deposit).getBalance()).toBe(initialBalance - deposit);
  });

  test('should transfer money', () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    const bankForTransfering = getBankAccount(initialBalance);
    expect(bank.transfer(215, bankForTransfering).getBalance()).toBe(
      bank.getBalance(),
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    const successfulFetchtMock = jest.fn(() => Promise.resolve(216));

    bank.fetchBalance = successfulFetchtMock;

    const result = await bank.fetchBalance();

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    const successfulFetchtMock = jest.fn(() => Promise.resolve(216));

    bank.fetchBalance = successfulFetchtMock;

    const spyFetchBalance = jest.spyOn(bank, 'fetchBalance');

    await expect(bank.synchronizeBalance()).resolves.not.toThrow(
      SynchronizationFailedError,
    );

    expect(spyFetchBalance).toHaveBeenCalled();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 216;
    const bank = getBankAccount(initialBalance);
    const successfulFetchtMock = jest.fn(() => Promise.resolve(null));

    bank.fetchBalance = successfulFetchtMock;

    expect(() => bank.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
