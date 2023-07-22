import { MOBILE_WIDTH } from '../constants/settings';

export const getChartOptions = (title, labels) => {
  return {
    title: {
      text: title,
      align: 'left',
      margin: 3,
      floating: false,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'ZenKakuGothicAntique-Bold',
        color: '#FFFFFF'
      },
    },
    labels: labels,
    colors: ['#FFB8A9', '#64D0B6', '#85D7E2'],
    dataLabels: {
      style: {
        fontSize: '14px',
        fontFamily: 'ZenKakuGothicAntique-Bold',
        fontWeight: 'bold',

      },
      // dropShadow: {
      //   enabled: false
      // }
    },
    legend: {
      fontSize: '14px',
      fontFamily: 'ZenKakuGothicAntique-Bold',
      labels: {
        colors: ['#FFFFFF']
      }
    },
    responsive: [{
      breakpoint: MOBILE_WIDTH,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }],
    stroke: {
      show: false
    }
  };
}