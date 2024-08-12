import useStore from "store/store";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Alert Slice", () => {
  it("should store only directives with category 1", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { dir: "test 1", category: 1 },
        { dir: "test 2", category: 2 },
        { dir: "test 3", category: 1 },
      ],
    });

    await useStore.getState().alertSlice.getDirectivesGlobal();
    expect(useStore.getState().alertSlice.directives.length).toEqual(2);
  });
});
