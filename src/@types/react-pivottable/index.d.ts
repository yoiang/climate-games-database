declare module 'react-pivottable' {
  export declare type Aggregator = (
    data,
    rowKey,
    colKey
  ) => {
    uniq: []
    push: (any) => void
    value: () => any
    format: (value) => any
    numInputs: number
  }

  export declare type AggregatorGenerator = (attributeArray) => Aggregator

  export declare type ValueFilter = Record<any, boolean>

  export declare type Renderer = (any) => any

  // https://github.com/plotly/react-pivottable#properties-and-layered-architecture
  export declare type Props = {
    data: unknown[] | any[][] | ((callback: () => void) => void)

    rows?: string[] | void
    cols?: string[] | void
    vals?: string[] | void

    aggregators?: Record<string, AggregatorGenerator> | void
    aggregatorName?: string | void

    valueFilter?: Record<string, ValueFilter> | void

    // sorters?:

    rowOrder?: string | void
    colOrder?: string | void

    // derivedAttributes?:

    renderers?: Record<string, Renderer> | void
    rendererName?: string | void

    onChange?: (newValue: any) => void | void

    hiddenAttributes?: string[] | void
    hiddenFromAggregators?: string[] | void
    hiddenFromDragDrop?: string[] | void

    menuLimit?: number | void

    unusedOrientationCutoff?: number | void
  }
}
