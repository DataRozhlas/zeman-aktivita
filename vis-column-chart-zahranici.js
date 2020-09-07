// Nastaveni max sirky grafu
const chartWidthZahranici = document.getElementById('vis-column-chart-zahranici').offsetWidth > 600
  ? 600
  : document.getElementById('vis-column-chart-zahranici').offsetWidth;

function onChartLoad(e) {
  const plotBack = document.getElementById(e.renderTo.id).getElementsByClassName('highcharts-plot-background')[0];
  const shouldBeHeight = (plotBack.width.baseVal.value / 4) * 3;
  const heightDiff = shouldBeHeight - plotBack.height.baseVal.value;
  if (heightDiff > 0) {
    document.getElementById(e.renderTo.id).style.height = `${e.chartHeight + heightDiff}px`;
    e.reflow();
  }
}

Highcharts.chart('vis-column-chart-zahranici', {
  chart: {
    type: 'column',
    width: chartWidthZahranici,
    events: {
      load() {
        onChartLoad(this);
      },
    },
  },
  title: {
    text: "Počet návštěv prezidenta Zemana v zahraničí", // Nehodovost v&nbsp;období leden⁠⁠–⁠červenec mírně stoupla
    useHTML: true
  },
  subtitle: {
    text: "Ve druhém volebním období je počet Zemanových návštěv oproti roku 2014 třetinový",
    useHTML: true
  },
  xAxis: {
    categories: ['<span class="nineteen">2013</span>', '<span class="nineteen">2014</span>', '<span class="nineteen">2015</span>', '<span class="nineteen">2016</span>', '<span class="nineteen">2017</span>', '<span class="twenty">2018</span>', '<span class="twenty">2019</span>', '<span class="twenty">2020</span>'],
    labels: {
      enabled: true,
    },
  },
  yAxis: {
    title: {
      text: 'návštěvy prezidenta v zahraničí',
    },
    // labels: {
    //   formatter: function() {
    //     if (this.isLast) {
    //       return this.value + '<br>' +
    //                   '<span class="light-gray-text">jízd za</span>' + '<br>' +
    //                   '<span class="light-gray-text">návěstidla</span>'
    //     } else {
    //       return this.value
    //     }
    //   }
    // }
  },
  legend: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  credits: {
    href: 'https://www.ctk.cz/',
    text: 'Zdroj: ČTK',
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
      },
      // enableMouseTracking: false, // odkomentuj, pokud nechces tooltip
      pointPadding: 0,
    },
  },
  series: [
    {
      name: 'zahraničních cest',
      data: [
      { y: 10, color: colors['2019'] },
      { y: 24, color: colors['2019'] },
      { y: 11, color: colors['2019'] },
      { y: 10, color: colors['2019'] },
      { y: 13, color: colors['2019'] },
      { y: 8, color: colors['2020'] },
      { y: 9, color: colors['2020'] },
      { y: 0, color: colors['2020'] },
     ]},
  ]});