import remoteConfig from "@react-native-firebase/remote-config";
import { useEffect, useState } from "react";
import { config } from "../utils/config";
import { initiateRemoteConfig } from "../utils/initiateRemoteConfig";
import { isComparableVersionHigher } from "../utils/isComparableVersionHigher";

const getIsAppOutdated = async () => {
  try {
    await initiateRemoteConfig();

    const remoteConfigKey = config.minimumSupportedVersionKey;

    const minimumSupportedVersion = remoteConfig()
      .getValue(remoteConfigKey)
      .asString();

    if (!minimumSupportedVersion || !config.installedStoreVersion) return false;

    const isOutdated = isComparableVersionHigher({
      comparableVersion: minimumSupportedVersion,
      baseVersion: config.installedStoreVersion,
    });

    return isOutdated;
  } catch (error) {
    return false;
  }
};

const useForcedUpdate = () => {
  const [isAppOutdated, setIsAppOutdated] = useState<boolean | null>(null);

  useEffect(() => void getIsAppOutdated().then(setIsAppOutdated), []);

  return { isAppOutdated };
};

export { useForcedUpdate };
