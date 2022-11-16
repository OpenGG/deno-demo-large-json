export const getEnv = (key: string) => Deno.env.get(key);

export const getEnvInt = (key: string, defaultValue: number) => {
    const str = getEnv(key)

    if (str === undefined) {
        return defaultValue
    }

    const val = parseInt(str, 10)

    if (isNaN(val)) {
        return defaultValue
    }

    return val
}
