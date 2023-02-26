import { useEffect } from "react";
import { View, Alert } from "react-native";

import { openStoreLink } from "../utils/openStoreLink";

export const ForcedUpdate = () => {
  useEffect(() => {
    Alert.alert(
      "Update Available",
      "Updating to the latest version provides the newest features, security updates, and bug fixes. Tap below to update the app.",
      [
        {
          text: "Update",
          onPress: openStoreLink,
        },
      ],
      { cancelable: false }
    );
  }, []);

  return <View style={{ backgroundColor: "#eee040", flex: 1 }} />;
};
