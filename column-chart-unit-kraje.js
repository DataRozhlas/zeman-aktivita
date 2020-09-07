Highcharts.chart("vis-column-chart-kraje", {
  chart: {
    type: "column",
    height: 320,
    left: '10px',
    width: chartWidth
  },
  title: {
    text: "Počet návštěv prezidenta Zemana v krajích", // Nehodovost v&nbsp;období leden⁠⁠–⁠červenec mírně stoupla
    useHTML: true
  },
  subtitle: {
    text: "V prvních dvou letech druhého volebního období vykonal Zeman v krajích méně návštěv,než za první dva roky prvního období",
    useHTML: true
  },
  credits: {
    enabled: false
  //   // href : 'http://portal.chmi.cz/historicka-data/pocasi/uzemni-srazky',
  //   // text: "Zdroj: TODO",
  },
  xAxis: {
    categories: [
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ],
    labels: {
      enabled: true,
    },
    plotLines: [{
      value: 0,
      width: 0,
      zIndex: 10000,
      label: {
        text: '',
        rotation: 0,
        y: 60,
      }
    }],
  },
  yAxis: {
    title: false,
    gridZIndex: 4,
    gridLineWidth: 2,
    gridLineColor: "#fff",
    tickPixelInterval: 30,
    tickInterval: 1,
    labels: {
      enabled: false
    }
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    valueSuffix: " jízd",
    // shared: true
  },
  exporting: {
    enabled: false,
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '0.8rem'
        }
      },
      enableMouseTracking: false,
      pointPadding: 0,
      pointWidth: chartWidth / 20,
    },
    series: {
      // disable legend clicking
      events: {
        legendItemClick: function (e) {
          e.preventDefault();
        },
      },
    },
  },
  series: [
    {
      name: "Srážky",
      data: [6,10,14,13,9,3,2],
      color: "#424b54",
    },
  ]
});
