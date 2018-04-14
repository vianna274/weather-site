var apiYahoo = new Vue ({
  el: '#apiYahoo',
  data: {
    cityInput: '',
    mainCity: '',
    mainTemperature: '',
    mainState: '',
    mainLowTemp: '',
    mainHighTemp: '',
    mainSensation: '',
    mainSpeed: '',
    mainHumidity: '',
    firstDay: '',
    firstDayLowTemp: '',
    firstDayHighTemp: '',
    secondDay: '',
    secondDayLowTemp: '',
    secondDayHighTemp: '',
    thirdDay: '',
    thirdDayLowTemp: '',
    thirdDayHighTemp: '',
    fourthDay: '',
    fourthDayLowTemp: '',
    fourthDayHighTemp: '',
    fifthDay: '',
    fifthDayLowTemp: '',
    fifthDayHighTemp: '',
    counter: 0,
    seen: false,
    exit: 0,
    firstCapitalLow: '',
    secondCapitalLow: '',
    thirdCapitalLow: '',
    fourthCapitalLow: '',
    fifthCapitalLow: '',
    firstCapitalHigh: '',
    secondCapitalHigh: '',
    thirdCapitalHigh: '',
    fourthCapitalHigh: '',
    fifthCapitalHigh: '',
    firstCapital: '',
    secondCapital: '',
    thirdCapital: '',
    fourthCapital: '',
    fifthCapital: '',
    sixthCapitalLow: '',
    seventhCapitalLow: '',
    eighthCapitalLow: '',
    ninthCapitalLow: '',
    tenthCapitalLow: '',
    sixthCapitalHigh: '',
    seventhCapitalHigh: '',
    eighthCapitalHigh: '',
    ninthCapitalHigh: '',
    tenthCapitalHigh: '',
    sixthCapital: '',
    seventhCapital: '',
    eighthCapital: '',
    ninthCapital: '',
    tenthCapital: '',
    tempCapital: '',
    tempLow: '',
    tempHigh: '',
    searchErrorMessage: '',
    searchError: false
  },
  beforeMount() {
    this.searchCapitals()
  },
  watch: {
    counter: function () {
      if (this.cityInput.length > 0) {
        this.searchCity()
      }
    },
    exit: function () {
      this.seen = false
    }
  },
  methods: {
    searchCity: _.debounce(function () {
      this.searchError = true
      this.searchErrorMessage = 'Searching ...'
      var app = this
      var query = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + this.cityInput + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
      axios.get(query)
            .then(function(response) {
              if(response.data.query.count != 0) {
                var resume = response.data.query.results.channel
                app.mainCity = resume.location.city + ', ' + resume.location.region + ' - ' + resume.location.country
                app.mainHumidity = resume.atmosphere.humidity + '%'
                app.mainTemperature = app.fahrenheitCelsius(resume.item.condition.temp)
                app.mainState = app.translateCondition(resume.item.condition.text)
                app.mainLowTemp = app.fahrenheitCelsius(resume.item.forecast[0].low)
                app.mainHighTemp = app.fahrenheitCelsius(resume.item.forecast[0].high)
                app.mainSpeed = app.mphKmh(resume.wind.speed)
                app.mainSensation = 'Nop'
                app.firstDay = app.translateDays(resume.item.forecast[1].day)
                app.secondDay = app.translateDays(resume.item.forecast[2].day)
                app.thirdDay = app.translateDays(resume.item.forecast[3].day)
                app.fourthDay = app.translateDays(resume.item.forecast[4].day)
                app.fifthDay = app.translateDays(resume.item.forecast[5].day)
                app.firstDayLowTemp = app.fahrenheitCelsius(resume.item.forecast[1].low)
                app.firstDayHighTemp = app.fahrenheitCelsius(resume.item.forecast[1].high)
                app.secondDayLowTemp = app.fahrenheitCelsius(resume.item.forecast[2].low)
                app.secondDayHighTemp = app.fahrenheitCelsius(resume.item.forecast[2].high)
                app.thirdDayLowTemp = app.fahrenheitCelsius(resume.item.forecast[3].low)
                app.thirdDayHighTemp = app.fahrenheitCelsius(resume.item.forecast[3].high)
                app.fourthDayLowTemp = app.fahrenheitCelsius(resume.item.forecast[4].low)
                app.fourthDayHighTemp = app.fahrenheitCelsius(resume.item.forecast[4].high)
                app.fifthDayLowTemp = app.fahrenheitCelsius(resume.item.forecast[5].low)
                app.fifthDayHighTemp = app.fahrenheitCelsius(resume.item.forecast[5].high)
                app.searchError = false
                app.seen = true
              }
            else if (response.data.query.count == 0) {
              app.seen = false
              app.searchErrorMessage = 'Cidade Inexistente'
              }
            })
      this.cityOutput = ''
    }),
    mphKmh: (function (mph) {
      var kmh = Math.trunc(Number(Number(mph) * 1.609344)) + 'km/h'
      return kmh
    }),
    fahrenheitCelsius: (function (fah) {
      var celius = Math.trunc((Number(fah)-32)/1.8)
      return celius + 'º'
    }),
    searchCapitals:  (function () {
      var app = this
      var query = this.updateQuery('Rio de Janeiro')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.firstCapital = resume.location.city
              app.firstCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.firstCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('São Paulo')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.secondCapital = resume.location.city
              app.secondCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.secondCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('Porto Alegre')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.thirdCapital = resume.location.city
              app.thirdCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.thirdCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('Brasília')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.fourthCapital = resume.location.city
              app.fourthCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.fourthCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('Salvador')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.fifthCapital = resume.location.city
              app.fifthCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.fifthCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('Belo Horizonte')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.sixthCapital = resume.location.city
              app.sixthCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.sixthCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('Fortaleza')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.seventhCapital = resume.location.city
              app.seventhCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.seventhCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('Curitiba')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.eighthCapital = resume.location.city
              app.eighthCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.eighthCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('Manaus')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.ninthCapital = resume.location.city
              app.ninthCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.ninthCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
      query = this.updateQuery('Recife')
      axios.get(query).then(function(response) {
              var resume = response.data.query.results.channel
              app.tenthCapital = resume.location.city
              app.tenthCapitalHigh = app.fahrenheitCelsius(resume.item.forecast[0].high)
              app.tenthCapitalLow = app.fahrenheitCelsius(resume.item.forecast[0].low)
      })
    }),
    updateQuery: (function (name) {
      return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20' +
      'weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places' +
      '(1)%20where%20text%3D%22' + name +
      '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }),
    translateDays: (function (text) {
      switch(text) {
        case 'Mon':
          return 'Segunda';
          break;
        case 'Tue':
          return 'Terça';
          break;
        case 'Wed':
          return 'Quarta';
          break;
        case 'Thu':
          return 'Quinta';
          break;
        case 'Fri':
          return 'Sexta';
          break;
        case 'Sat':
          return 'Sabado';
          break;
        case 'Sun':
          return 'Domingo';
          break;
        default:
          return 'Error';
          break;
      }
    }),
    translateCondition: (function (text) {
      switch(text) {
        case 'Tornado':
          return 'Tornado';                       // tornado
          break;
        case 'Tropical Storm':
          return 'Tempestade tropical';           // tropical storm
            break;
        case 'Hurricane':
          return 'Furacão';                       // hurricane
            break;
        case 'Severe Thunderstorms':
          return 'Tempestade severa';             // severe thunderstorms
            break;
        case 'Thunderstorms':
          return 'Trovoadas';                     // thunderstorms
            break;
        case 'Mixed Rain And Snow':
          return 'Chuva e neve';                  // mixed rain and snow
            break;
        case 'Mixed Rain And Sleet':
          return 'Chuva e granizo fino';          // mixed rain and sleet
            break;
        case 'Mixed Snow And Sleet':
          return 'Neve e granizo fino';           // mixed snow and sleet
            break;
        case 'Freezing Drizzle':
          return 'Garoa gélida';                  // freezing drizzle
            break;
        case 'Drizzle':
          return 'Garoa';                         // drizzle
            break;
        case 'Freezing Rain':
          return 'Chuva gélida';                  // freezing rain
            break;
        case 'Showers':
          return 'Chuvisco';                      // showers
            break;
        case 'Showers':
          return 'Chuva';                         // showers
            break;
        case 'Snow Flurries':
          return 'Neve em flocos finos';          // snow flurries
            break;
        case 'Light Snow Showers':
          return 'Leve precipitação de neve';     // light snow showers
            break;
        case 'Blowing Snow':
          return 'Ventos com neve';               // blowing snow
            break;
        case 'Snow':
          return 'Neve';                          // snow
            break;
        case 'Hail':
          return 'Chuva de granizo';              // hail
            break;
        case 'Sleet':
          return 'Pouco granizo';                 // sleet
            break;
        case 'Dust':
          return 'Pó em suspensão';               // dust
            break;
        case 'Foggy':
          return 'Neblina';                       // foggy
            break;
        case 'Haze':
          return 'Névoa seca';                    // haze
            break;
        case 'Smoky':
          return 'Enfumaçado';                    // smoky
            break;
        case 'Blustery':
          return 'Vendaval';                      // blustery
            break;
        case 'Windy':
          return 'Ventando';                      // windy
            break;
        case 'Cold':
          return 'Frio';                          // cold
            break;
        case 'Cloudy':
          return 'Nublado';                       // cloudy
            break;
        case 'Mostly Cloudy':
          return 'Muitas nuvens';         // mostly cloudy (night)
            break;
        case 'Mostly Cloudy':
          return 'Muitas nuvens';           // mostly cloudy (day)
            break;
        case 'Partly Cloudy':
          return 'Parcialmente nublado';  // partly cloudy (night)
            break;
        case 'Partly Cloudy':
          return 'Parcialmente nublado';    // partly cloudy (day)
            break;
        case 'Clear':
          return 'Céu limpo';             // clear (night)
            break;
        case 'Sunny':
          return 'Ensolarado';                    // sunny
            break;
        case 'Fair':
          return 'Tempo bom';             // fair (night)
            break;
        case 'Fair':
          return 'Tempo bom';               // fair (day)
            break;
        case 'Mixed Rain And Rail':
          return 'Chuva e granizo';               // mixed rain and hail
            break;
        case 'Hot':
          return 'Quente';                        // hot
            break;
        case 'Isolated Thunderstorms':
          return 'Tempestades isoladas';          // isolated thunderstorms
            break;
        case 'Scattered Thunderstorms':
          return 'Tempestades esparsas';          // scattered thunderstorms
            break;
        case 'Scattered Thunderstorms':
          return 'Tempestades esparsas';          // scattered thunderstorms
            break;
        case 'Scattered Showers':
          return 'Chuvas esparsas';               // scattered showers
            break;
        case 'Heavy Snow':
          return 'Nevasca';                       // heavy snow
            break;
        case 'Scattered Snow Showers':
          return 'Tempestades de neve esparsas';  // scattered snow showers
            break;
        case 'Heavy Snow':
          return 'Nevasca';                       // heavy snow
            break;
        case 'Partly Cloudy':
          return 'Parcialmente nublado';          // partly cloudy
            break;
        case 'Thundershowers':
          return 'Chuva com trovoadas';           // thundershowers
            break;
        case 'Snow Showers':
          return 'Tempestade de neve';            // snow showers
            break;
        case 'Isolated Thundershowers':
          return 'relâmpagos e chuvas isoladas';  // isolated thundershowers
            break;
        case 'Not Available': return 'Não disponível'               // not available
      }
    })
  }
})
