export const featureFlags = {
  AB_TEST_ISTOTA_VOICE: true
};

export function isEnabled(flag) {
  return !!featureFlags[flag];
}
