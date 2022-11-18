export const getEnv = (key) => process.env[key];
export const getEnvInt = (key, defaultValue) => {
  const str = getEnv(key);
  if (str === undefined) {
    return defaultValue;
  }
  const val = parseInt(str, 10);
  if (isNaN(val)) {
    return defaultValue;
  }
  return val;
};
