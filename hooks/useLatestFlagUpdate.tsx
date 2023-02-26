import { utils } from "@react-native-firebase/app";
import remoteConfig from "@react-native-firebase/remote-config";
import { useEffect } from "react";
import { Platform } from "react-native";
import { isComparableVersionHigher } from "../utils/isComparableVersionHigher";
import { API_URL } from "@env";
import { config } from "../utils/config";
import { initiateRemoteConfig } from "../utils/initiateRemoteConfig";

const updateRemoteLatestVersion = async () => {
  await initiateRemoteConfig();

  const latestVersion = remoteConfig()
    .getValue(config.latestReleasedVersionKey)
    .asString();

  if (
    !latestVersion ||
    !config.installedAppVersion ||
    utils().isRunningInTestLab
  )
    return;

  const isInstalledHigher = isComparableVersionHigher({
    comparableVersion: config.installedAppVersion,
    baseVersion: latestVersion,
  });

  if (!isInstalledHigher) return;

  await fetch(`${API_URL}/api/latest-version`, {
    method: "POST",
    body: JSON.stringify({
      latestVersion: config.installedAppVersion,
      platform: Platform.OS,
    }),
    headers: { "Content-Type": "application/json" },
  });
};

export const useLatestFlagUpdate = () => {
  useEffect(() => void updateRemoteLatestVersion(), []);
};
