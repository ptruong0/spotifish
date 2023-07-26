/**
 * Convert artist metadata to chart data structure
 */
const generateChart = (artists) => {
  let genders = {}
  let countries = {}
  let types = {}
  artists.forEach((artist) => {
    if (artist) {
      if (artist.gender) {
        genders[artist.gender] = genders[artist.gender] ? genders[artist.gender] + 1 : 1
      } else {
        // no gender data
      }

      if (artist.country) {
        countries[artist.country] = countries[artist.country] ? countries[artist.country] + 1 : 1
      }

      if (artist.type) {
        types[artist.type] = types[artist.type] ? types[artist.type] + 1 : 1
      }
    }
  })

  return {
    Gender: {
      series: Object.values(genders),
      labels: Object.keys(genders)
    },
    Country: {
      series: Object.values(countries),
      labels: Object.keys(countries)
    },
    Type: {
      series: Object.values(types),
      labels: Object.keys(types)
    }
  }
}

module.exports = {
  generateChart: generateChart
}