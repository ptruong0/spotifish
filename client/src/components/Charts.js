import './Charts.scss';
import { getChartOptions } from '../utils/charts';

import Chart from 'react-apexcharts';


const CHART_TYPES = {
  'Gender': 'pie',
  'Country': 'pie',
  'Type': 'pie',
  'Popularity': 'bar',
  'Genres': 'pie'
} 

const Charts = (props) => {
  const chartComponents = props.chartData ?
    Object.entries(props.chartData).map(([chartName, chart], index) => {
      let options = getChartOptions(chartName, chart.labels ? chart.labels : chart.categories, CHART_TYPES[chartName]);

      console.log(chart.series)
      
      return <Chart
        options={options}
        series={CHART_TYPES[chartName] == 'pie' ? chart.series : chart.series}
        type={CHART_TYPES[chartName]}
        height={500}
        key={index}
      />
    })
    : null

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
}

export default Charts;