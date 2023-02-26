import Constants from "expo-constants";
import * as Updates from "expo-updates";
import { useCallback, useEffect } from "react";
import { Alert } from "react-native";

export type OtaUpdatePriority = "forced" | "suggested" | "nextLaunch";

export const useOTAUpdates = () => {
  const fallbackToCacheTimeout: number =
    Constants.expoConfig?.extra?.fallbackToCacheTimeout ?? 0;

  const checkForOTAUpdate = useCallback(async () => {
    if (__DEV__) return;

    const updateStatus = await Updates.checkForUpdateAsync();

    if (!updateStatus.isAvailable) return;

    const update = await Updates.fetchUpdateAsync();

    if (!update.isNew) return;

    const otaUpdatePriority = update.manifest?.extra?.expoClient?.extra
      ?.otaUpdatePriority as OtaUpdatePriority;

    // in case app is not updated during fallbackToCacheTimeout, check if to update during second launch (normal) or prompt user due to `high` priority
    if (otaUpdatePriority === "forced") {
      Alert.alert(
        "Update",
        "A new version is available. Press to update.",
        [{ text: "Update", onPress: Updates.reloadAsync }],
        { cancelable: false }
      );
    }

    if (otaUpdatePriority === "suggested") {
      Alert.alert("Update", "A new version is available.", [
        { text: "Update", onPress: Updates.reloadAsync },
        { text: "Install on next launch" },
      ]);
    }
  }, []);

  useEffect(() => {
    if (!fallbackToCacheTimeout) {
      void checkForOTAUpdate();
      return;
    }

    // run after fallbackToCacheTimeout passed in case the app did not manage to update itself
    const cacheTimeoutWithBuffer = fallbackToCacheTimeout + 500;

    const timeout = setTimeout(() => {
      if (fallbackToCacheTimeout) {
        void checkForOTAUpdate();
      }
    }, cacheTimeoutWithBuffer);

    return () => clearTimeout(timeout);
  }, [checkForOTAUpdate, fallbackToCacheTimeout]);
};
