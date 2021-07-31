export class InvalidUnionValueError<RawType> extends Error {
  public static Message = 'Invalid Union value' // : '" + invalidValue + "'. Valid values: " + values
  values: readonly RawType[]
  invalidValue: unknown
  public constructor(values: readonly RawType[], invalidValue: unknown) {
    super(InvalidUnionValueError.Message)
    this.values = values
    this.invalidValue = invalidValue
  }
}

export const parseUnionFactory = <RawType, T extends RawType>(
  values: readonly T[]
) => {
  const parseUnionOrNull = parseUnionOrNullFactory(values)
  return async (raw: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      const result = parseUnionOrNull(raw)
      if (result) {
        resolve(result)
      } else {
        reject(new InvalidUnionValueError(values, raw))
      }
    })
  }
}

export const parseUnionOrNullFactory = <RawType, T extends RawType>(
  values: readonly T[]
): ((raw: RawType) => T | null) => {
  return (raw: RawType): T | null => {
    const found = values.find((test) => test === raw)
    if (found) {
      return found
    }
    return null
  }
}
