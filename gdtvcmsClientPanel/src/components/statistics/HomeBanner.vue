
<template>
    <div id='echarts'>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      DetailedDate: [],
      DateCount: [],
      legendData: [],
      seriesArr: []
    };
  },
  mounted() {
    this.drawLine();
  },
  computed: {
    statistics() {
      if (this.$store.state.statisticsData) {
      }
      return this.$store.state.statisticsData;
    }
  },
  watch: {
    statistics() {
      var This = this;
      var myChart = This.$echarts.init(document.getElementById("echarts"));
      if (this.$store.state.statisticsData) {
        myChart.hideLoading();
        myChart.setOption({
          legend: {
            data: this.$store.state.statisticsData.data.legendData
          },
          xAxis: {
            data: this.$store.state.statisticsData.data.xAxisData
          },
          series: this.$store.state.statisticsData.data.seriesData
        });
      } else {
        myChart.showLoading();
      }
    }
  },
  methods: {
    drawLine() {
      var This = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("echarts"));
      myChart.showLoading();
      // 绘制图表
      myChart.setOption({
        title: { text: "首页BANNER" },
        legend: {
          data: This.legendData
        },
        tooltip: {
          trigger: "axis"
        },
        tooltip: {},
        xAxis: {
          data: This.DetailedDate
        },
        yAxis: {
          type: "value"
        },
        series: []
      });
    }
  },
  created() {
    var This = this;
    axios
      .post("statistics/getStatistics", {
        type: "line",
        statTabType: 'HOME|HOME_BANNER|'
      })
      .then(function(result) {
        var myChart = This.$echarts.init(document.getElementById("echarts"));
        myChart.hideLoading();
        myChart.setOption({
          legend: {
            data: result.legendData
          },
          xAxis: {
            data: result.data.xAxisData
          },
          series: result.data.seriesData
        });
      });
  }
};
</script>

