import './Charts.scss'
import { getChartOptions } from '../utils/charts'
import { CHART_TYPES } from '../constants/chart'

import Chart from 'react-apexcharts'
import { useState, useEffect, memo } from 'react'
import { MOBILE_WIDTH } from '../constants/settings'

const Charts = memo((props) => {
  const [chartComponents, setChartComponents] = useState(null)

  const generateCharts = () => {    
    let chartData = props.artistCharts
    if (props.tab === 'tracks') {
      chartData = props.getTrackCharts()
    } 
    
    return chartData ?
    Object.entries(chartData).map(([chartName, chart], index) => {
      const xValues = chart.labels ? chart.labels : chart.categories
      let options = getChartOptions(chartName, xValues, CHART_TYPES[chartName])

      let height = 500;
      if (CHART_TYPES[chartName] === 'pie' && chart.labels.length < 10) {
        height = 400
        if (window.innerWidth < MOBILE_WIDTH) {
          height = 300;
        }
      }
      
      return <Chart
        options={options}
        series={chart.series}
        type={CHART_TYPES[chartName]}
        key={index}
        height={height}
        className='chart'
      />
    })
    : null  
  }

  useEffect(() => {
    setChartComponents(generateCharts())
  }, [props.tab, props.topTracks, props.artistCharts])

  // const chartComponents = useMemo(generateCharts, [props.tab, props.topTracks, props.artistCharts])

  return (
    <div>
      <div className='row-center'>
        <h2 className='charts-title'>Stats</h2>
      </div>
      <div className='chart-container'>
        {
          chartComponents ?
            chartComponents
            :
            <p className='loading-text'>Loading...</p>
        }
      </div>
    </div>

  )
})

export default Charts