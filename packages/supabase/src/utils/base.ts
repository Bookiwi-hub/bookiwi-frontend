/**
 * Convert camelCase string to snake_case
 * @param str - The camelCase string to convert
 * @returns The snake_case string
 */
export function camelToSnake(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

/**
 * Convert snake_case string to camelCase
 * @param str - The snake_case string to convert
 * @returns The camelCase string
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert object keys from camelCase to snake_case
 * @param obj - The object with camelCase keys
 * @returns New object with snake_case keys
 */
export function camelToSnakeKeys<T extends Record<string, any>>(
  obj: T,
): Record<string, any> {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnakeKeys(item));
  }

  if (typeof obj === "object") {
    return Object.entries(obj).reduce(
      (result, [key, value]) => {
        const snakeKey = camelToSnake(key);
        return {
          ...result,
          [snakeKey]: camelToSnakeKeys(value),
        };
      },
      {} as Record<string, any>,
    );
  }

  return obj;
}

/**
 * Convert object keys from snake_case to camelCase
 * @param obj - The object with snake_case keys
 * @returns New object with camelCase keys
 */
export function snakeToCamelKeys<T extends Record<string, any>>(
  obj: T,
): Record<string, any> {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamelKeys(item));
  }

  if (typeof obj === "object") {
    return Object.entries(obj).reduce(
      (result, [key, value]) => {
        const camelKey = snakeToCamel(key);
        return {
          ...result,
          [camelKey]: snakeToCamelKeys(value),
        };
      },
      {} as Record<string, any>,
    );
  }

  return obj;
}
