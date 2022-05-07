<template>
  <PageWrapper
    :contentFullHeight="true"
    contentClass="bg-sky-700"
    :contentStyle="{ margin: '0px' }"
  >
    <div class="flex flex-shrink mt-4 mb-4">
      <div class="w-2/7"> &nbsp; </div>
      <div class="w-3/7 flex items-center justify-center">
        <span class="text-light-50 font-sans text-2xl"> 平武县果梅数字农业指挥中心 </span>
      </div>
      <div class="w-2/7 flex items-center">
        <span class="text-light-50 font-sans" v-text="dateText"></span>
        &nbsp;&nbsp;
        <span class="text-light-50 font-sans" v-text="weatherText"></span>
      </div>
    </div>
    <div class="flex">
      <div class="w-2/7">
        <div>
          <p>园区简介x </p>
        </div>
        <div> 基础数据 </div>
      </div>
      <div class="w-3/7">
        <div>
          <div id="mapx"></div>
        </div>
      </div>
      <div class="w-2/7">
        <div>
          <div id="linex"></div>
        </div>
        <div> 实时气象 </div>
      </div>
    </div>
    <div class="w-full"> 第二行数据 </div>
  </PageWrapper>
</template>
<script>
  import { PageWrapper } from '/@/components/Page';
  import { defineComponent, ref, onMounted } from 'vue';
  import colors from 'windicss/colors';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import fetchJsonp from 'fetch-jsonp';
  import { Dot, registerImages } from '@antv/l7plot';
  import { Line } from '@antv/g2plot';
  const images = [
    {
      id: 'camera',
      image: '/resource/img/camera.svg',
    },
    {
      id: 'weather',
      image: '/resource/img/weather.svg',
    },
    {
      id: 'hotel',
      image: '/resource/img/hotel.svg',
    },
    {
      id: 'soil',
      image: '/resource/img/soil.svg',
    },
    {
      id: 'water',
      image: '/resource/img/water.svg',
    },
  ];
  registerImages(images);
  dayjs.locale('zh-cn');
  const dateText = ref('');
  const weatherText = ref('');
  const SKYCONS = {
    CLEAR_DAY: '晴（白天）',
    CLEAR_NIGHT: '晴（夜间',
    PARTLY_CLOUDY_DAY: '多云（白天）',
    PARTLY_CLOUDY_NIGHT: '多云（夜间）',
    CLOUDY: '阴',
    LIGHT_HAZE: '轻度雾霾',
    MODERATE_HAZE: '中度雾霾',
    HEAVY_HAZE: '重度雾霾',
    LIGHT_RAIN: '小雨',
    MODERATE_RAIN: '中雨',
    HEAVY_RAIN: '大雨',
    STORM_RAIN: '暴雨',
    FOG: '雾',
    LIGHT_SNOW: '小雪',
    MODERATE_SNOW: '中雪',
    HEAVY_SNOW: '大雪',
    STORM_SNOW: '暴雪',
    DUST: '浮尘',
    SAND: '沙尘',
    WIND: '大风',
  };

  const lineData = [
    { year: '2022/3/12', value: 3 },
    { year: '2022/3/11', value: 4 },
    { year: '2022/3/10', value: 3.5 },
    { year: '2022/3/09', value: 3.5 },
    { year: '2022/3/08', value: 7.5 },
    { year: '2022/3/07', value: 2.5 },
    { year: '2022/3/06', value: 1.5 },
  ];
  export default defineComponent({
    components: { PageWrapper },
    setup() {
      onMounted(() => {
        setTimeout(() => {
          const datax = [
            {
              lng: 104.69802,
              lat: 32.049978,
              size: 10,
              cate: '仪器',
              typecode: 'camera',
              title: '望梅山庄 摄像头 农家乐 测报仪 气象站',
            },
            {
              lng: 104.69812,
              lat: 32.049988,
              size: 10,
              cate: '农家乐',
              typecode: 'hotel',
              title: '望梅山庄1',
            },
            {
              lng: 104.69822,
              lat: 32.049998,
              size: 10,
              cate: '摄像头',
              typecode: 'weather',
              title: '摄像头1',
            },
            {
              lng: 104.69722,
              lat: 32.049998,
              size: 10,
              cate: '摄像头',
              typecode: 'soil',
              title: '摄像头1',
            },
            {
              lng: 104.69822,
              lat: 32.049878,
              size: 10,
              cate: '摄像头',
              typecode: 'hotel',
              title: '摄像头1',
            },
            {
              lng: 104.69802,
              lat: 32.049848,
              size: 10,
              cate: '摄像头',
              typecode: 'water',
              title: '摄像头1',
            },
          ];
          new Dot('mapx', {
            shape: {
              field: 'typecode',
              value: ({ typecode }) => typecode,
            },
            map: {
              type: 'amap',
              style: 'light',
              center: [104.697929, 32.049292],
              zoom: 18,
              pitch: 0,
            },
            source: {
              data: datax,
              parser: { type: 'json', x: 'lng', y: 'lat' },
            },
            color: '#fff',
            size: {
              field: 'size',
              value: ({ size }) => size,
              scale: 'cat',
            },
            style: {
              opacity: 0.8,
              strokeWidth: 0,
            },
            autoFit: true,
            zoom: {
              position: 'topright',
            },
            tooltip: {
              title: '信息',
              items: [
                {
                  field: 'title',
                  alias: '标题',
                },
              ],
            },
          });
          const line = new Line('linex', {
            data: lineData,
            xField: 'year',
            yField: 'value',
          });
          line.render();
        }, 2000);
        setInterval(() => {
          const now = dayjs();
          dateText.value = now.format('YYYY年MM月DD日 HH:mm:ss dddd');
        }, 1000);
        // 获取天气
        const apiUrl =
          'https://api.caiyunapp.com/v2.5/uci6CI3HBnSuQOa1/104.679473,32.034532/realtime.jsonp';
        const reloadWeather = () => {
          fetchJsonp(apiUrl)
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              weatherText.value = SKYCONS[json.result.realtime.skycon];
            })
            .catch((ex) => {
              console.log('parsing failed', ex);
            });
        };
        reloadWeather();
        setInterval(() => reloadWeather(), 60000 * 30);
      });
      return {
        colors,
        dateText,
        weatherText,
      };
    },
  });
</script>
<style>
  #mapx {
    width: 100%;
    height: 400px;
    position: relative;
  }
  #linex {
    width: 100%;
    height: 200px;
    position: relative;
    background-color: white;
  }
</style>
