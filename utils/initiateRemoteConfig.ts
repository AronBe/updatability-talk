import remoteConfig from "@react-native-firebase/remote-config";

export const initiateRemoteConfig = async () => {
  // for testing use no cache, though it will stay cached anyway
  try {
    await remoteConfig().setConfigSettings({ minimumFetchIntervalMillis: 0 });
    await remoteConfig().fetch(0);
    await remoteConfig().activate();
  } catch (e) {
    console.log(e);
  }
};
