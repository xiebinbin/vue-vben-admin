<template>
  <div class="w-full h-full bg-gray-500/50">
    <div class="flex w-full h-full" v-show="!spinning">
      <div class="w-5/7 h-full">
        <div class="w-full h-full relative">
          <div class="absolute w-full h-full top-0 flex justify-center items-center">
            <img style="width: 90%" src="/resource/img/shuifei_bg.png" />
          </div>
          <div class="absolute z-10 w-full h-full top-0">
            <div class="absolute" style="top: 1%; left: 1%">
              <a-card title="水泵" style="width: 280px">
                <div class="flex w-full">
                  <div class="w-2/3">
                    <p class="leading-5">
                      工作状态：
                      <span v-show="!infoSwitch.water" class="text-red-500">关闭</span>
                      <span v-show="infoSwitch.water" class="text-green-500">开启</span>
                    </p>
                    <p class="leading-5">
                      设备状态：
                      <span v-show="!infoSwitch.water" class="text-red-500">离线</span>
                      <span v-show="infoSwitch.water" class="text-green-500">在线</span>
                    </p>
                  </div>
                  <div class="w-1/3 flex flex-col">
                    <div class="flex w-full justify-center">
                      <img style="width: 60%" src="/resource/img/shuifei_device.png" />
                    </div>
                    <div class="flex w-full justify-center mt-2">
                      <a-switch :disabled="spinning" v-model:checked="infoSwitch.water" />
                    </div>
                  </div>
                </div>
              </a-card>
            </div>
            <div class="absolute" style="top: 5%; right: 8%">
              <a-card title="A阀" style="width: 200px">
                <div class="w-full">
                  <p class="leading-5">
                    瞬间流量：<span class="text-gray-500" v-text="info.a_moment"></span>
                  </p>
                  <p class="leading-5">
                    当次累计流量：<span class="text-gray-500" v-text="info.a_when"></span>
                  </p>
                  <p class="leading-5">
                    累计流量：<span class="text-gray-500" v-text="info.a_cumulative"></span>
                  </p>
                </div>
              </a-card>
            </div>
            <div class="absolute" style="bottom: 10%; left: 1%">
              <a-card title="B阀" style="width: 200px">
                <div class="w-full">
                  <p class="leading-5">
                    瞬间流量：<span class="text-gray-500" v-text="info.b_moment"></span>
                  </p>
                  <p class="leading-5">
                    当次累计流量：<span class="text-gray-500" v-text="info.b_when"></span>
                  </p>
                  <p class="leading-5">
                    累计流量：<span class="text-gray-500" v-text="info.b_cumulative"></span>
                  </p>
                </div>
              </a-card>
            </div>
            <div class="absolute" style="bottom: 10%; right: 5%">
              <a-card title="C阀" style="width: 200px">
                <div class="w-full">
                  <p class="leading-5">
                    瞬间流量：<span class="text-gray-500" v-text="info.c_moment"></span>
                  </p>
                  <p class="leading-5">
                    当次累计流量：<span class="text-gray-500" v-text="info.c_when"></span>
                  </p>
                  <p class="leading-5">
                    累计流量：<span class="text-gray-500" v-text="info.c_cumulative"></span>
                  </p>
                </div>
              </a-card>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-around w-2/7 h-full items-center">
        <a-card class="mt-4" title="A阀" style="width: 300px">
          <div class="flex w-full">
            <div class="w-2/3">
              <p class="leading-5">
                工作状态：
                <span v-show="!infoSwitch.a" class="text-red-500">关闭</span>
                <span v-show="infoSwitch.a" class="text-green-500">开启</span>
              </p>
              <p class="leading-5">
                设备状态：
                <span v-show="!infoSwitch.a" class="text-red-500">离线</span>
                <span v-show="infoSwitch.a" class="text-green-500">在线</span>
              </p>
            </div>
            <div class="w-1/3 flex flex-col">
              <div class="flex w-full justify-center">
                <img style="width: 60%" src="/resource/img/shuifei_device.png" />
              </div>
              <div class="flex w-full justify-center mt-2">
                <a-switch
                  :disabled="!infoSwitch.water || spinning"
                  v-model:checked="infoSwitch.a"
                />
              </div>
            </div>
          </div>
        </a-card>
        <a-card class="mt-4" title="B阀" style="width: 300px">
          <div class="flex w-full">
            <div class="w-2/3">
              <p class="leading-5">
                工作状态：
                <span v-show="!infoSwitch.b" class="text-red-500">关闭</span>
                <span v-show="infoSwitch.b" class="text-green-500">开启</span>
              </p>
              <p class="leading-5">
                设备状态：
                <span v-show="!infoSwitch.b" class="text-red-500">离线</span>
                <span v-show="infoSwitch.b" class="text-green-500">在线</span>
              </p>
            </div>
            <div class="w-1/3 flex flex-col">
              <div class="flex w-full justify-center">
                <img style="width: 60%" src="/resource/img/shuifei_device.png" />
              </div>
              <div class="flex w-full justify-center mt-4">
                <a-switch
                  :disabled="!infoSwitch.water || spinning"
                  v-model:checked="infoSwitch.b"
                />
              </div>
            </div>
          </div>
        </a-card>
        <a-card class="mt-4" title="C阀" style="width: 300px">
          <div class="flex w-full">
            <div class="w-2/3">
              <p class="leading-5">
                工作状态：
                <span v-show="!infoSwitch.c" class="text-red-500">关闭</span>
                <span v-show="infoSwitch.c" class="text-green-500">开启</span>
              </p>
              <p class="leading-5">
                设备状态：
                <span v-show="!infoSwitch.c" class="text-red-500">离线</span>
                <span v-show="infoSwitch.c" class="text-green-500">在线</span>
              </p>
            </div>
            <div class="w-1/3 flex flex-col">
              <div class="flex w-full justify-center">
                <img style="width: 70%" src="/resource/img/shuifei_device.png" />
              </div>
              <div class="flex w-full justify-center mt-4">
                <a-switch
                  :disabled="!infoSwitch.water || spinning"
                  v-model:checked="infoSwitch.c"
                />
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <div v-show="spinning" class="flex w-full h-full items-center justify-center">
      <a-spin :spinning="spinning" size="large" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Card, Switch, Spin } from 'ant-design-vue';
  import { getCurrentInstance, onMounted, onUnmounted, reactive, watch, ref } from 'vue';
  import gql from '/@/graphql/index';
  interface InfoSwitch {
    a: Boolean;
    b: Boolean;
    c: Boolean;
    water: Boolean;
  }
  const spinning = ref(false);
  const loading = ref(false);
  const x = ref();
  interface InfoItem {
    a_moment: String;
    a_when: String;
    a_cumulative: String;
    b_moment: String;
    b_when: String;
    b_cumulative: String;
    c_moment: String;
    c_when: String;
    c_cumulative: String;
  }
  const infoSwitch: InfoSwitch = reactive({
    a: false,
    b: false,
    c: false,
    water: false,
  });
  const info: InfoItem = reactive({
    a_moment: '',
    a_when: '',
    a_cumulative: '',
    b_moment: '',
    b_when: '',
    b_cumulative: '',
    c_moment: '',
    c_when: '',
    c_cumulative: '',
  });

  export default {
    components: {
      'a-card': Card,
      'a-switch': Switch,
      'a-spin': Spin,
    },
    setup() {
      const instance = getCurrentInstance();
      onMounted(async () => {
        refreshInfo(false);
        x.value = setInterval(() => refreshInfo(true), 1000);
      });
      watch(infoSwitch, () => {
        // 更新
        if (!loading.value) {
          spinning.value = true;
          loading.value = true;
          let switch_master = infoSwitch.a ? '1' : '0';
          switch_master = switch_master + (infoSwitch.b ? '1' : '0');
          switch_master = switch_master + (infoSwitch.c ? '1' : '0');
          switch_master = switch_master + (infoSwitch.water ? '1' : '0');
          instance?.proxy?.$apollo
            ?.mutate({
              mutation: gql.waterFertilizationSwitchGQL,
              variables: {
                switch_master,
              },
            })
            .then(() => {
              refreshInfo(false);
            })
            .catch(() => {
              refreshInfo(false);
            });
        }
      });
      const refreshInfo = async (refreshData: Boolean) => {
        const data = await instance?.proxy?.$apollo?.query({
          query: gql.waterFertilizationInfo,
        });
        const powers = data?.data.iot_water_fertilization_info.powers;
        const infoData = data?.data.iot_water_fertilization_info.data;
        info.a_moment = infoData?.a_moment;
        info.a_when = infoData?.a_when;
        info.a_cumulative = infoData?.a_cumulative;
        info.b_moment = infoData?.b_moment;
        info.b_when = infoData?.b_when;
        info.b_cumulative = infoData?.b_cumulative;
        info.c_moment = infoData?.c_moment;
        info.c_when = infoData?.c_when;
        info.c_cumulative = infoData?.c_cumulative;
        if (!refreshData) {
          infoSwitch.a = powers?.a;
          infoSwitch.b = powers?.b;
          infoSwitch.c = powers?.c;
          infoSwitch.water = powers?.water;
          spinning.value = false;
          loading.value = false;
        }
      };
      onUnmounted(() => {
        console.log('卸载了水肥');
        clearInterval(x.value);
      });
      return {
        infoSwitch,
        spinning,
        info,
      };
    },
  };
</script>
