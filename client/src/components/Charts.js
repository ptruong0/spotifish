import './Charts.scss';
import { getChartOptions } from '../utils/charts';

import Chart from 'react-apexcharts';
import { useMemo, memo } from 'react';


const CHART_TYPES = {
  'Gender': 'pie',
  'Country': 'pie',
  'Type': 'pie',
  'Popularity': 'bar',
  'Genres': 'pie'
} 

const Charts = memo((props) => {
  const generateCharts = () => {
    console.log('generating charts')

    return props.chartData ?
    Object.entries(props.chartData).map(([chartName, chart], index) => {
      let options = getChartOptions(chartName, chart.labels ? chart.labels : chart.categories, CHART_TYPES[chartName]);
      
      return <Chart
        options={options}
        series={chart.series}
        type={CHART_TYPES[chartName]}
        height={500}
        key={index}
        className='chart'
      />
    })
    : null
  }
  const chartComponents = useMemo(() => generateCharts(), [props.chartData])

  return (
    <div>
      <div className='row-center'>
        <h2 className='charts-title'>Stats</h2>
      </div>
      <div className='chart-container'>
        {
          props.chartData ?
            chartComponents
            :
            <p className='loading-text'>Loading...</p>
        }
      </div>
    </div>

  );
}, () => {console.log("Memo check"); return true;})

export default Charts;