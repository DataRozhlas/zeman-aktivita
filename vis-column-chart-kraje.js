// Nastaveni max sirky grafu
const chartWidthKraje = document.getElementById('vis-column-chart-kraje').offsetWidth > 600
  ? 600
  : document.getElementById('vis-column-chart-kraje').offsetWidth;

function onChartLoad(e) {
  const plotBack = document.getElementById(e.renderTo.id).getElementsByClassName('highcharts-plot-background')[0];
  const shouldBeHeight = (plotBack.width.baseVal.value / 4) * 3;
  const heightDiff = shouldBeHeight - plotBack.height.baseVal.value;
  if (heightDiff > 0) {
    document.getElementById(e.renderTo.id).style.height = `${e.chartHeight + heightDiff}px`;
    e.reflow();
  }
}

Highcharts.chart('vis-column-chart-kraje', {
  chart: {
    type: 'column',
    width: chartWidthKraje,
    events: {
      load() {
        onChartLoad(this);
      },
    },
  },
  title: {
    text: "Počet návštěv prezidenta Zemana v krajích", // Nehodovost v&nbsp;období leden⁠⁠–⁠červenec mírně stoupla
    useHTML: true
  },
  subtitle: {
    text: "V <span class='nineteen'>prvním volebním období</span> vyjel Miloš Zeman do krajů sedmapadesátkrát, ve <span class='twenty'>druhém období</span> zatím pětkrát.",
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
      text: 'návštěvy prezidenta v krajích',
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
    href: 'https://www.lidovky.cz/zeman.aspx',
    text: 'Zdroje: hrad.cz a lidovky.cz',
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
      name: 'návštěv v krajích',
      data: [
      { y: 6, color: colors['2019'] },
      { y: 10, color: colors['2019'] },
      { y: 14, color: colors['2019'] },
      { y: 13, color: colors['2019'] },
      { y: 14, color: colors['2019'] },
      { y: 3, color: colors['2020'] },
      { y: 2, color: colors['2020'] },
      { y: 0, color: colors['2020'] },
     ]},
  ]});