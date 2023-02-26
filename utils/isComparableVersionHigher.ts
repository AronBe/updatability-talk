// TODO: remove build number from version

interface GetVersionDifs {
  comparableVersion: string;
  baseVersion: string;
}

const SEMANTIC_VERSION_REGEX =
  /^([1-9][0-9]*|[0]+)\.([1-9][0-9]*|[0]+)\.([1-9][0-9]*|[0]+)$/u;

const checkSemanticity = (version: string): boolean =>
  SEMANTIC_VERSION_REGEX.test(version.split("-")[0]);

const getVersionAttributes = (version: string) => {
  const [major, minor, patch] = version.split("-")[0].split(".");

  return [Number(major), Number(minor), Number(patch)];
};

export const isComparableVersionHigher = ({
  comparableVersion,
  baseVersion,
}: GetVersionDifs) => {
  if (!checkSemanticity(baseVersion) || !checkSemanticity(comparableVersion))
    return null;

  const [comparableMajor, comparableMinor, comparablePatch] =
    getVersionAttributes(comparableVersion);

  const [baseMajor, baseMinor, basePatch] = getVersionAttributes(baseVersion);
  const hasMajorDiff = comparableMajor > baseMajor;
  const hasMinorDif =
    comparableMajor === baseMajor && comparableMinor > baseMinor;

  const hasPatchDif =
    comparableMajor === baseMajor &&
    comparableMinor === baseMinor &&
    comparablePatch > basePatch;

  return hasMajorDiff || hasMinorDif || hasPatchDif;
};
