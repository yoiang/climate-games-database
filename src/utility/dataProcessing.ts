export const requireFields = <DatumType>(
  fields: string[],
  data: DatumType[]
): DatumType[] => {
  return data.filter((datum) => {
    for (let index = 0; index < fields.length; index++) {
      if (datum[fields[index]] === null) {
        return false
      }
    }
    return true
  })
}
