import ReactPlotly from 'react-plotly.js'
import { PlotParams } from 'react-plotly.js'
// import { useResizeDetector } from 'react-resize-detector'

export const Plotly = (props: PlotParams): JSX.Element => {
  // const { width, height, ref } = useResizeDetector()
  // const mutableRef = ref as React.MutableRefObject<HTMLInputElement>

  const responsiveProps = Object.assign({}, props)
  if (!responsiveProps.layout) {
    responsiveProps.layout = {}
  }
  // responsiveProps.layout.width = width ? width : undefined
  // responsiveProps.layout.height = height ? height : undefined
  if (!responsiveProps.config) {
    responsiveProps.config = {}
  }
  responsiveProps.config.displaylogo = false
  responsiveProps.config.responsive = true
  return (
    <div
      /*ref={mutableRef}*/ className="responsivePlotlyContainer"
      style={{ width: '100%', height: '100%', display: 'flex' }}
    >
      <ReactPlotly {...responsiveProps} />
    </div>
  )
}

export default Plotly
