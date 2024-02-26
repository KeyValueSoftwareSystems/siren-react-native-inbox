import { act, renderHook } from '@testing-library/react-native';
import {useSiren} from '../../src';

describe('useSiren hook', () => {
  const mockSirenCore = {
    markNotificationAsReadById: jest.fn(),
    markAllNotificationsAsRead: jest.fn(),
    deleteNotificationById: jest.fn(),
    clearAllNotifications: jest.fn(),
    markNotificationsAsViewed: jest.fn(),
  };


  it('should mark notification as read', async () => {
    const { result } = renderHook(() => useSiren());

    await act(async () => {
      await result.current.markAsRead('1');
    });

    expect(mockSirenCore.markNotificationAsReadById).toHaveBeenCalledWith('1');
  });

  it('should mark all notifications as read', async () => {
    const { result } = renderHook(() => useSiren());

    await act(async () => {
      await result.current.markNotificationsAllAsRead('2024-02-28T00:00:00Z');
    });

    expect(mockSirenCore.markAllNotificationsAsRead).toHaveBeenCalledWith('2024-02-28T00:00:00Z');
  });

  it('should delete a notification', async () => {
    const { result } = renderHook(() => useSiren());

    await act(async () => {
      await result.current.deleteNotification('1');
    });

    expect(mockSirenCore.deleteNotificationById).toHaveBeenCalledWith('1');
  });

  it('should clear all notifications', async () => {
    const { result } = renderHook(() => useSiren());

    await act(async () => {
      await result.current.clearAllNotification('2024-02-28T00:00:00Z');
    });

    expect(mockSirenCore.clearAllNotifications).toHaveBeenCalledWith('2024-02-28T00:00:00Z');
  });

  it('should mark notifications as viewed', async () => {
    const { result } = renderHook(() => useSiren());

    await act(async () => {
      await result.current.markNotificationsAsViewed('2024-02-28T00:00:00Z');
    });

    expect(mockSirenCore.markNotificationsAsViewed).toHaveBeenCalledWith('2024-02-28T00:00:00Z');
  });
});
