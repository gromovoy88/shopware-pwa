import { apiService } from "../../../src/apiService";
import {
  setCurrentPaymentMethod,
  update,
} from "@shopware-pwa/shopware-6-client";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("ContextService - setCurrentPaymentMethod with contextToken given", () => {
  beforeEach(() => {
    update({ contextToken: "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" });
    jest.resetAllMocks();
  });

  it("should return context token", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" },
    });

    let newPaymentMethodId = "45f96f681f9d4834b29e9e15df3a7149";

    const result = await setCurrentPaymentMethod(newPaymentMethodId);

    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith("/store-api/v1/context", {
      paymentMethodId: "45f96f681f9d4834b29e9e15df3a7149",
    });

    expect(result.contextToken).toEqual("NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6");
  });
});

describe("ContextService - setCurrentPaymentMethod without contextToken given", () => {
  beforeEach(() => {
    update({ contextToken: undefined });
    jest.resetAllMocks();
  });

  it("should return context token", async () => {
    mockedAxios.patch.mockResolvedValueOnce({
      data: { "sw-context-token": "NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6" },
    });

    let newPaymentMethodId = "45f96f681f9d4834b29e9e15df3a7149";

    const result = await setCurrentPaymentMethod(newPaymentMethodId);

    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith("/store-api/v1/context", {
      paymentMethodId: "45f96f681f9d4834b29e9e15df3a7149",
    });

    expect(result.contextToken).toEqual("NWDdcRTTWoPk4Ngv13z5NDMMsDFRb9W6");
  });
});
