import type { ExpoConfig } from "@expo/config-types";
import { version } from "./package.json";
import * as dotenv from "dotenv";
import { OtaUpdatePriority } from "./hooks/useOTAUpdate";

dotenv.config();

const appIdentifier = "com.updatability.talk";

/* FIREBASE */
const configPlugins: ExpoConfig["plugins"] = ["@react-native-firebase/app"];
const iosGoogleServiceFile = `./firebase/GoogleService-Info.plist`;
const androidGoogleServiceFile = `./firebase/google-services.json`;

/* BUILD NUMBER */
const buildNumber = 1;
// calculated from version to replace patch version with 0: 0.1.1 >> 0.1.0
const runtimeVersion = `${version.split(".").slice(0, 2).join(".")}.0`;

/* OTA UPDATE CONFIG */
const projectId = process.env.PROJECT_ID;
const fallbackToCacheTimeout = 0;
const otaUpdatePriority: OtaUpdatePriority = "forced";

const expoConfig: ExpoConfig = {
  name: "updatability-talk",
  slug: "updatability-talk",
  version,
  runtimeVersion,
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  updates: {
    fallbackToCacheTimeout,
    url: `https://u.expo.dev/${projectId}`,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    buildNumber: String(buildNumber),
    supportsTablet: false,
    bundleIdentifier: appIdentifier,
    googleServicesFile: iosGoogleServiceFile,
    infoPlist: {
      LSApplicationQueriesSchemes: ["itms-apps"],
    },
  },
  android: {
    versionCode: buildNumber,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: appIdentifier,
    googleServicesFile: androidGoogleServiceFile,
  },
  jsEngine: "hermes",
  plugins: configPlugins,
  extra: {
    fallbackToCacheTimeout,
    otaUpdatePriority,
    eas: { projectId },
  },
};

export default expoConfig;
