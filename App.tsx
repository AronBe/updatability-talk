import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ForcedUpdate } from "./components/ForcedUpdate";
import { useForcedUpdate } from "./hooks/useForcedUpdate";
import { useLatestFlagUpdate } from "./hooks/useLatestFlagUpdate";
import { useSuggestedUpdate } from "./hooks/useSuggestedUpdate";
import { config } from "./utils/config";
import { openStoreLink } from "./utils/openStoreLink";
import * as Updates from "expo-updates";
import { useOTAUpdates } from "./hooks/useOTAUpdate";

export default function App() {
  const { isAppOutdated: isNotSupported } = useForcedUpdate();
  const { isAppOutdated: isNotLatest } = useSuggestedUpdate();

  useLatestFlagUpdate();
  useOTAUpdates();

  // initial state is null
  if (isNotSupported === null) return null;
  if (isNotSupported) return <ForcedUpdate />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the supported version of the app!
      </Text>
      <TouchableOpacity style={styles.row} onPress={openStoreLink}>
        {isNotLatest !== null && (
          <View
            style={[
              styles.circle,
              { backgroundColor: isNotLatest ? "orange" : "green" },
            ]}
          />
        )}
        <Text style={styles.text}>
          Store Version: {config.installedStoreVersion}
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Is OTA: {String(!Updates.isEmbeddedLaunch)}
      </Text>
      <Text style={styles.text}>OTA version: {config.installedAppVersion}</Text>
      <Text style={styles.text}>Runtime version: {config.runtimeVersion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8dada",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  text: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 6,
  },
});
