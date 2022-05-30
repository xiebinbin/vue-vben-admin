<template>
  <div class="w-full">
    <a-radio-group v-model:value="mod" option-type="button" :options="plainOptions" />
    <div class="w-9/10" style="height: 300px" id="chart-soil-moisture"></div>
  </div>
</template>

<script>
  import { Line } from '@antv/g2plot';
  import { onMounted, ref, watch, getCurrentInstance, onUnmounted } from 'vue';
  import { RadioGroup } from 'ant-design-vue';
  import gql from '/@/graphql/index';
  const lineChart = ref(null);
  export default {
    name: 'VChart',
    components: {
      'a-radio-group': RadioGroup,
    },
    props: {
      category: String,
    },
    setup(props) {
      onUnmounted(() => {
        lineChart.value.destroy();
      });
      const instance = getCurrentInstance();
      const mod = ref('seven-day');
      onMounted(() => {
        lineChart.value = new Line('chart-soil-moisture', {
          data: [],
          seriesField: 'category',
          xField: 'label',
          yField: 'value',
        });
        lineChart.value.render();
        loadData();
        console.log('重新渲染onMounted');
      });
      const plainOptions = [
        { label: '近7天', value: 'seven-day' },
        { label: '近1月', value: 'one-month' },
        { label: '近3月', value: 'three-month' },
        { label: '近半年', value: 'half-year' },
        { label: '近一年', value: 'one-year' },
      ];
      const loadData = () => {
        instance?.proxy?.$nextTick(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.waterLevelChartData,
            variables: {
              input: {
                mod: mod.value,
                type: props.category,
              },
            },
          });
          mod.value = data?.data.iot_water_level_chart_data.mod;
          const chart_items = data?.data.iot_water_level_chart_data.chart_items;
          lineChart.value.changeData(chart_items);
        });
      };
      watch(mod, () => loadData());
      watch(
        () => props.category,
        () => loadData(),
      );
      return {
        mod,
        plainOptions,
        lineChart,
      };
    },
  };
</script>
