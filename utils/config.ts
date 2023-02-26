import { Platform } from "react-native";
import { version } from "../package.json";
import Constants from "expo-constants";

export const config = {
  applicationIdProd: "com.updatability.talk",
  appleIdProd: "123456789",
  // for forced and suggested updates demo
  installedStoreVersion: version,
  // available in stores
  // installedStoreVersion: Constants.expoConfig?.version,
  // available in stores or via OTA
  installedAppVersion: version,
  runtimeVersion: Constants.expoConfig?.runtimeVersion?.toString(),
  latestReleasedVersionKey: `latest_released_version_${Platform.OS}`,
  minimumSupportedVersionKey: `minimum_supported_version_${Platform.OS}`,
};
