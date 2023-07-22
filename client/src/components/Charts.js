import './Charts.scss';
import { getChartOptions } from '../utils/charts';

import Chart from 'react-apexcharts';

const Charts = (props) => {
  const chartComponents = props.chartData ?
    Object.entries(props.chartData).map(([chartName, chart], index) => {
      let options = getChartOptions(chartName, chart.labels);
      
      return <Chart
        options={options}
        series={chart.series}
        type="pie"
        width="300"
        key={index}
      />
    })
    : null

  return (
    <div>
      <div className='row-center'>
        <h2 className='charts-title'>Charts</h2>
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