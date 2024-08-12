import mockNotificationTypes from "__mocks__/mockNotificationTypes";
import mockNotifications from "__mocks__/mockNotificationsList";
import axios from "axios";
import useStore from "store/store";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Notification Slice", () => {
  it("should store notification list", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { notifications: mockNotifications },
    });

    await useStore.getState().notificationSlice.getNotificationsList();

    expect(
      useStore.getState().notificationSlice.notificationsList.length
    ).toEqual(3);
  });

  it("should store notifications types", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockNotificationTypes });

    await useStore.getState().notificationSlice.getNotificationsTypes();

    expect(
      useStore.getState().notificationSlice.notificationsTypes.length
    ).toEqual(3);
  });
});
