import moment from 'moment';

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const getChartData = {
    chartData
};

export default {
    'GET /api/chart_data': getChartData,
};