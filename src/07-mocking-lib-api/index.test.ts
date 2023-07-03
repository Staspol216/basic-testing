// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValueOnce({ data: 1 });
    await throttledGetDataFromApi('/data');

    expect(mockedAxios.create).toHaveBeenCalled();
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
