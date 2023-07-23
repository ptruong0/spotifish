

const generateChart = (artists) => {
  let genders = {}
  let countries = {}
  let types = {}
  artists.forEach((artist) => {
    if (artist) {
      if (artist.gender) {
        if (genders[artist.gender]) {
          genders[artist.gender] += 1;
        } else {
          genders[artist.gender] = 1;
        }
      } else {
        // no gender data
      }

      if (artist.country) {
        if (countries[artist.country]) {
          countries[artist.country] += 1;
        } else {
          countries[artist.country] = 1;
        }
      }

      if (artist.type) {
        if (types[artist.type]) {
          types[artist.type] += 1;
        } else {
          types[artist.type] = 1;
        }
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
};