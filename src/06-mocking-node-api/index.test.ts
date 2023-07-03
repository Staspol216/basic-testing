// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = jest.spyOn(path, 'join');

    await readFileAsynchronously('mock.txt');
    expect(filePath).toHaveBeenCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('not-exist-file.txt');
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');
    const fileContent = 'Some content file';
    existsSyncSpy.mockReturnValue(true);
    readFileSpy.mockResolvedValue(fileContent);

    const result = await readFileAsynchronously('mock.txt');
    expect(result).toEqual(fileContent);
  });
});
