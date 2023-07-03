// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const response = {
  data: [{ id: 1 }, { id: 2 }],
};

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValueOnce(response);
    await throttledGetDataFromApi('/posts');

    expect(mockedAxios.create).toHaveBeenCalled();
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('/posts');
    expect(result).toEqual(response.data);
  });
});
