import { MOBILE_WIDTH } from '../constants/settings';

export const getChartOptions = (title, labels, type) => {
  const titleOptions = {
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
  };
  const colorOptions = ['#FFB8A9', '#64D0B6', '#7CCBD6', '#F19A68', '#41B5C5']

  return type === 'pie' ? {
    title: titleOptions,
    labels: labels,
    colors: colorOptions,
    dataLabels: {
      style: {
        fontSize: '14px',
        fontFamily: 'ZenKakuGothicAntique-Bold',
        fontWeight: 'bold',
      },
    },
    legend: {
      position: labels && labels.length >= 5 ? 'bottom' : 'right',
      verticalAlign: 'center',
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
  }
    :
    {
      title: titleOptions,
      chart: {
        type: 'bar',
        height: '600'
      },
      colors: colorOptions,
      plotOptions: {
        bar: {
          borderRadius: 3,
          horizontal: false,
          distributed: true
        }
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: labels && labels.length >= 5 ? 'bottom' : 'right',
        verticalAlign: 'center',
        fontSize: '14px',
        fontFamily: 'ZenKakuGothicAntique-Bold',
        labels: {
          colors: ['#FFFFFF']
        }
      },
      xaxis: {
        type: 'category',
        categories: labels,
        labels: {
          style: {
            colors: labels ? Array(labels.length).fill('#FFFFFF') : [],
            fontSize: '14px',
          fontFamily: 'ZenKakuGothicAntique-Bold',
          }
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#FFFFFF'],
            fontSize: '14px',
          fontFamily: 'ZenKakuGothicAntique-Bold',
          }
        }
      }
    }
}

export const extendChartStats = (artists, chartData) => {
  let popularities = {}
  let followers = {}
  let genres = {}
  artists.forEach(artist => {
    console.log(artist)
    if (artist.popularity) {
      popularities[artist.name] = artist.popularity;
    }
    if (artist.followers) {
      followers[artist.name] = artist.followers.total;
    }

    if (artist.genres) {
      artist.genres.forEach((genre) => {
        if (genres[genre]) {
          genres[genre] += 1.0 / artist.genres.length;
        } else {
          genres[genre] = 1.0 / artist.genres.length;
        }
      })
    }

  });

  chartData.Genres = {
    series: Object.values(genres),
    labels: Object.keys(genres)
  };

  chartData.Popularity = {
    series: [{
      data: Object.values(popularities).sort()
    }],
    categories: Object.keys(popularities).sort((a, b) => popularities[a] - popularities[b])
  };

}