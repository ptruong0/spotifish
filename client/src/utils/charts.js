import { MOBILE_WIDTH } from '../constants/settings'
import { excludeSingleCounts } from './functions'

export const getChartOptions = (title, labels, type) => {
  const titleOptions = {
    text: title,
    align: 'left',
    margin: 3,
    floating: false,
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: 'ZenKakuGothicAntique-Bold',
      color: '#FFFFFF'
    },
  }
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
    layout: {
      padding: {
        top: 20
      }
    },
    legend: {
      position: ((labels && labels.length >= 5) || window.innerWidth < 768) ? 'bottom' : 'right',
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
        width: '600'
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
        show: labels.length < 20,
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

export const generateArtistChartStats = (artists) => {
  let popularities = {}
  let genres = {}
  artists.forEach(artist => {
    if (artist.popularity) {
      popularities[artist.name] = parseInt(artist.popularity)
    }

    if (artist.genres) {
      artist.genres.forEach((genre) => {
        const val = 1.0 / artist.genres.length
        genres[genre] = genres[genre] ? genres[genre] + val : val
      })
    }
  })

  let chartData = {}

  chartData.Genres = {
    series: Object.values(genres),
    labels: Object.keys(genres)
  }

  chartData.Popularity = {
    series: [{
      data: Object.values(popularities).sort((a, b) => (+a) - (+b))
    }],
    categories: Object.keys(popularities).sort((a, b) => popularities[a] - popularities[b])
  }

  return chartData
}

export const generateTrackChartStats = (tracks) => {
  let popularities = {}
  let artists = {}
  let albums = {}
  let durations = {}
  let explicits = {}
  tracks.forEach(track => {
    if (track.popularity) {
      popularities[track.name] = track.popularity
    }

    if (track.artists) {
      track.artists.forEach((artist) => {
        artists[artist.name] = artists[artist.name] ? artists[artist.name] + 1 : 1
      })
    }

    if (track.album) {
      albums[track.album.name] = albums[track.album.name] ? albums[track.album.name] + 1 : 1
    }

    if (track.duration_ms) {
      durations[track.name] = Math.round(track.duration_ms / 1000.0 / 60 * 100) / 100   // in minutes
    }

    if (track.explicit !== null) {
      const val = track.explicit ? 'Yes' : 'No'
      explicits[val] = explicits[val] ? explicits[val] + 1 : 1
    }
  })

  artists = excludeSingleCounts(artists)

  let chartData = {}

  chartData.Artists = {
    series: Object.values(artists).sort().reverse(),
    labels: Object.keys(artists).sort((a, b) => artists[b] - artists[a])
  }

  chartData.Albums = {
    series: Object.values(albums).sort().reverse(),
    labels: Object.keys(albums).sort((a, b) => albums[b] - albums[a])
  }

  chartData.Popularity = {
    series: [{
      data: Object.values(popularities).sort()
    }],
    categories: Object.keys(popularities).sort((a, b) => popularities[a] - popularities[b])
  }


  chartData.Duration = {
    series: [{
      data: Object.values(durations).sort()
    }],
    categories: Object.keys(durations).sort((a, b) => durations[a] - durations[b])
  }

  chartData.Explicit = {
    series: Object.values(explicits),
    labels: Object.keys(explicits)
  }

  return chartData
}