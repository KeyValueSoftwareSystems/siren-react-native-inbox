import { useSiren } from '../../src';
import * as sirenProvider from '../../src/components/sirenProvider';
import type { Siren } from '@sirenapp/js-sdk';

const Response = {
  data: {
    id: 'xyz',
    createdAt: '2024-02-24T05:47:38.519+00:00',
    updatedAt: '2024-02-24T05:47:38.519+00:00',
    deletedAt: null,
    createdBy: '0a6f719d-1de1-4383-ada4-fdcf725bacb9',
    updatedBy: '0a6f719d-1de1-4383-ada4-fdcf725bacb9',
    deletedBy: null,
    projectEnvironmentId: 'd3cb08e5-70e5-403d-8919-d9b779019ad4',
    message: {
      channel: 'IN_APP',
      header: 'NEW POST',
      subHeader: 'Test,Someone tagged you in a post',
      body: 'hey Sutty10\n"Get ready for our new \'app test challenge\' challenge starting on November 27. Join us to move towards better health!"',
      actionUrl:
        'https://cdn5.vectorstock.com/i/1000x1000/92/89/hipster-avatar-image-vector-19639289.jpg',
      avatar: {
        imageUrl:
          'https://cdn5.vectorstock.com/i/1000x1000/92/89/hipster-avatar-image-vector-19639289.jpg',
        actionUrl: null
      },
      additionalData: ''
    },
    inAppRecipient: {
      id: '6018ebd1-683c-4397-a903-5ce9ea94bcd7',
      createdAt: '2024-02-05T05:43:35.533+00:00',
      updatedAt: '2024-02-23T13:08:55.252+00:00',
      deletedAt: null,
      createdBy: '0a6f719d-1de1-4383-ada4-fdcf725bacb9',
      updatedBy: '0a6f719d-1de1-4383-ada4-fdcf725bacb9',
      deletedBy: null,
      projectEnvironmentId: 'd3cb08e5-70e5-403d-8919-d9b779019ad4',
      referenceId: 'ae0ee4af-f21c-4d3f-abfc-7e42dc0642c0',
      providerIntegrationId: 'f46e8256-4b81-4bc6-91c8-b3cf5b980e0b',
      lastOpenedAt: '2024-02-23T13:08:55.186Z'
    },
    isRead: true,
    isDelivered: false,
    requestId: '9bb75694-af0a-4a8f-92a4-21d7e7a64ade'
  },
  error: null
};

const ActionResponse = {
  data: { status: '200' },
  error: null
};

const MarkAsViewedResponse = {
  data: {
    id: '6018ebd1-683c-4397-a903-5ce9ea94bcd7',
    createdAt: '2024-02-05T05:43:35.533+00:00',
    updatedAt: '2024-02-23T13:08:55.252+00:00',
    deletedAt: null,
    createdBy: '0a6f719d-1de1-4383-ada4-fdcf725bacb9',
    updatedBy: '0a6f719d-1de1-4383-ada4-fdcf725bacb9',
    deletedBy: null,
    projectEnvironmentId: 'd3cb08e5-70e5-403d-8919-d9b779019ad4',
    referenceId: 'ae0ee4af-f21c-4d3f-abfc-7e42dc0642c0',
    providerIntegrationId: 'f46e8256-4b81-4bc6-91c8-b3cf5b980e0b',
    lastOpenedAt: '2024-02-23T13:08:55.186Z',
    totalUnviewed: 0
  },
  error: null
};

describe('useSiren hook', () => {
  const mockSiren: Pick<Siren, keyof Siren> = {
    markNotificationAsReadById: jest.fn(async () => Response),
    markNotificationsAsReadByDate: jest.fn(async () => ActionResponse),
    deleteNotificationById: jest.fn(async () => ActionResponse),
    deleteNotificationsByDate: jest.fn(async () => ActionResponse),
    markNotificationsAsViewed: jest.fn(async () => MarkAsViewedResponse),
    verifyToken: jest.fn(),
    fetchUnviewedNotificationsCount: jest.fn(),
    fetchAllNotifications: jest.fn(),
    startRealTimeNotificationFetch: jest.fn(),
    stopRealTimeNotificationFetch: jest.fn(),
    startRealTimeUnviewedCountFetch: jest.fn(),
    stopRealTimeUnviewedCountFetch: jest.fn()
  };

  it('should call siren.markNotificationAsReadById and update notifications list when siren exists and id is not empty', async () => {

    // Mock useSirenContext
    jest.spyOn(sirenProvider, 'useSirenContext').mockReturnValue({
      siren: mockSiren as Siren,
    });

    const { markAsRead } = useSiren();
    const response = await markAsRead('xyz');

    expect(mockSiren.markNotificationAsReadById).toHaveBeenCalledWith('xyz');
    expect(response).toEqual(Response);
  });

  it('should call siren.markNotificationsAsReadByDate and update notifications list when siren exists and untilDate is provided', async () => {
    jest.spyOn(sirenProvider, 'useSirenContext').mockReturnValue({
      siren: mockSiren as Siren,
    });

    const { markNotificationsAsReadByDate } = useSiren();
    const untilDate = '2024-02-28T00:00:00Z';
    const response = await markNotificationsAsReadByDate(untilDate);

    expect(mockSiren.markNotificationsAsReadByDate).toHaveBeenCalledWith(untilDate);
    expect(response).toEqual(ActionResponse);
  });

  it('should call siren.deleteNotificationById and update notifications list when siren exists and id is not empty', async () => {

    jest.spyOn(sirenProvider, 'useSirenContext').mockReturnValue({
      siren: mockSiren as Siren,
    });

    const { deleteNotification } = useSiren();
    const response = await deleteNotification('xyz');

    expect(mockSiren.deleteNotificationById).toHaveBeenCalledWith('xyz');
    expect(response).toEqual(ActionResponse);
  });

  it('should call siren.deleteNotificationsByDate and update notifications list when siren exists and untilDate is provided', async () => {;

    jest.spyOn(sirenProvider, 'useSirenContext').mockReturnValue({
      siren: mockSiren as Siren,
    });

    const { deleteNotificationsByDate } = useSiren();
    const untilDate = '2024-02-28T00:00:00Z';
    const response = await deleteNotificationsByDate(untilDate);

    expect(mockSiren.deleteNotificationsByDate).toHaveBeenCalledWith(untilDate);
    expect(response).toEqual(ActionResponse);
  });

  it('should call siren.markNotificationsAsViewed and update notifications list when siren exists and untilDate is provided', async () => {

    jest.spyOn(sirenProvider, 'useSirenContext').mockReturnValue({
      siren: mockSiren as Siren,
    });

    const { markNotificationsAsViewed } = useSiren();
    const untilDate = '2024-02-28T00:00:00Z';
    const response = await markNotificationsAsViewed(untilDate);

    expect(mockSiren.markNotificationsAsViewed).toHaveBeenCalledWith(untilDate);
    expect(response).toEqual(MarkAsViewedResponse);
  });
});
