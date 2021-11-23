import { renderHook } from "@testing-library/react-hooks";
import { useThemeFolderConfigs } from "../../utils/configs";
import * as themeFileFetchUtils from "../../utils/themeFolderConfig";

describe("The useThemeFolderConfigs hook", () => {
    let configFileSpy: jest.SpyInstance;

    beforeEach(() => {
        configFileSpy = jest.spyOn(themeFileFetchUtils, "fetchThemeFolderConfigFile");
    });

    afterEach(() => {
        configFileSpy.mockClear();
    });

    it("returns empty configs if no theme folder config file is found", () => {
        configFileSpy.mockResolvedValue(null);
        const { result } = renderHook(() => useThemeFolderConfigs("LineChart"));
        expect(result.current).toEqual({ layout: {}, configuration: {}, series: {} });
    });

    it("returns the appropriate configs if they are found", async () => {
        configFileSpy.mockResolvedValue({
            layout: { font: { size: 20 } },
            configuration: { fillFrame: true },
            charts: {
                LineChart: {
                    line: {
                        color: "purple"
                    }
                }
            }
        });
        const { result, waitForNextUpdate } = renderHook(() => useThemeFolderConfigs("LineChart"));
        await waitForNextUpdate();
        expect(result.current).toEqual({
            layout: { font: { size: 20 } },
            configuration: { fillFrame: true },
            series: {
                line: {
                    color: "purple"
                }
            }
        });
    });

    it("only returns the appropriate chart configs", async () => {
        configFileSpy.mockResolvedValue({
            layout: { font: { size: 20 } },
            configuration: { fillFrame: true },
            charts: {
                LineChart: {
                    line: {
                        color: "purple"
                    }
                },
                BarChart: {
                    line: {
                        color: "red"
                    }
                }
            }
        });
        const { result, waitForNextUpdate } = renderHook(() => useThemeFolderConfigs("BarChart"));
        await waitForNextUpdate();
        expect(result.current).toEqual({
            layout: { font: { size: 20 } },
            configuration: { fillFrame: true },
            series: {
                line: {
                    color: "red"
                }
            }
        });
    });
});
