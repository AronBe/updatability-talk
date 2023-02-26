import { Linking } from "react-native";

import { getStoreLink } from "./getStoreLink";

export const openStoreLink = async () => {
  const storeLink = getStoreLink();

  const canOpenUri = await Linking.canOpenURL(storeLink.storeURI);
  const validStoreLink = canOpenUri ? storeLink.storeURI : storeLink.storeURL;

  void Linking.openURL(validStoreLink);
};
