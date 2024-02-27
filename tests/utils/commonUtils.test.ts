import { generateElapsedTimeText, logger } from '../../src/utils/commonUtils';
import { LogLevel } from '../../src/utils/constants';

describe('generateElapsedTimeText', () => {
  test('returns "Just now" for recent time', () => {
    const recentTime = new Date(Date.now() - 5000).toISOString(); // 5 seconds ago

    expect(generateElapsedTimeText(recentTime)).toBe('Just now');
  });

  test('returns minutes ago for past minutes', () => {
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();

    expect(generateElapsedTimeText(oneMinuteAgo)).toBe('1 minute ago');

    const fiveMinutesAgo = new Date(Date.now() - 300000).toISOString();

    expect(generateElapsedTimeText(fiveMinutesAgo)).toBe('5 minutes ago');
  });

  test('returns hours ago for past hours', () => {
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();

    expect(generateElapsedTimeText(oneHourAgo)).toBe('1 hour ago');

    const threeHoursAgo = new Date(Date.now() - 10800000).toISOString();

    expect(generateElapsedTimeText(threeHoursAgo)).toBe('3 hours ago');
  });

  test('returns days ago for past days', () => {
    const oneDayAgo = new Date(Date.now() - 86400000).toISOString();

    expect(generateElapsedTimeText(oneDayAgo)).toBe('1 day ago');

    const threeDaysAgo = new Date(Date.now() - 259200000).toISOString();

    expect(generateElapsedTimeText(threeDaysAgo)).toBe('3 days ago');
  });

  test('returns years ago for past years', () => {
    const oneYearAgo = new Date(Date.now() - 31536000000).toISOString();

    expect(generateElapsedTimeText(oneYearAgo)).toBe('1 year ago');

    const threeYearsAgo = new Date(Date.now() - 94608000000).toISOString();

    expect(generateElapsedTimeText(threeYearsAgo)).toBe('3 years ago');
  });
});

describe('logger', () => {
  test('log function formats and outputs message with ERROR level', async () => {
    const mockConsoleLog = jest.spyOn(console, 'log');
    const errorMessage = 'An error occurred.';

    await logger.log(LogLevel.ERROR, errorMessage);

    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining(`[ERROR] ${errorMessage}`));
  });

  test('error function calls log function with ERROR level', async () => {
    const mockLog = jest.spyOn(logger, 'log');
    const errorMessage = 'An error has been encountered.';

    logger.error(errorMessage);

    expect(mockLog).toHaveBeenCalledWith(LogLevel.ERROR, errorMessage);
  });

  test('info function calls log function with INFO level', async () => {
    const mockLog = jest.spyOn(logger, 'log');
    const message = 'Some informative details.';

    logger.info(message);

    expect(mockLog).toHaveBeenCalledWith(LogLevel.INFO, message);
  });
});
