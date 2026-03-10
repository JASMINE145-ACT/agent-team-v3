import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Locale } from "../i18n/lib/types.ts";

const LOCALE_KEY = "openclaw.i18n.locale";

async function loadI18n(localeFromStorage?: Locale) {
  // Reset module cache so I18nManager constructor re-runs with fresh globals.
  await vi.resetModules();

  const storage = (globalThis as any).localStorage as Storage | undefined;
  if (storage) {
    storage.clear();
    if (localeFromStorage) {
      storage.setItem(LOCALE_KEY, localeFromStorage);
    }
  }

  const i18nModule = await import("../i18n/index.ts");
  return { storage, ...i18nModule };
}

beforeEach(() => {
  // Ensure we always start each test with a clean environment.
  const storage = (globalThis as any).localStorage as Storage | undefined;
  if (storage) {
    storage.clear();
  }
});

describe("control-ui i18n: navigation/tab titles", () => {
  it("renders navigation titles in zh-CN and switches to en", async () => {
    const { i18n, t } = await loadI18n();
    const { titleForTab } = await import("./navigation.ts");

    await i18n.setLocale("zh-CN");
    expect(titleForTab("overview")).toBe("概览");
    expect(titleForTab("chat")).toBe("聊天");
    expect(t("oos.title")).toBe("无货看板");

    await i18n.setLocale("en");
    expect(titleForTab("overview")).toBe("Overview");
    expect(titleForTab("chat")).toBe("Chat");
    expect(t("oos.title")).toBe("Out-of-stock dashboard");
  });
});

describe("control-ui i18n: locale persistence via localStorage", () => {
  it("initializes i18n from saved locale in localStorage", async () => {
    await vi.resetModules();

    const storage = (globalThis as any).localStorage as Storage;
    storage.clear();
    storage.setItem(LOCALE_KEY, "zh-CN");

    const { i18n, t } = await import("../i18n/index.ts");
    const { titleForTab } = await import("./navigation.ts");

    expect(i18n.getLocale()).toBe("zh-CN");
    // Desired behavior: when locale is zh-CN and saved in localStorage,
    // navigation titles and other texts should render in Simplified Chinese.
    expect(t("tabs.overview")).toBe("概览");
    expect(titleForTab("overview")).toBe("概览");
    expect(titleForTab("chat")).toBe("聊天");
  });
});

