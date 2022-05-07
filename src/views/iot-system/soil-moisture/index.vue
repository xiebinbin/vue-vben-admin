<template>
  <PageWrapper contentBackground contentClass="flex" dense contentFullHeight fixedHeight>
    <BasicTable :loading="loading" :dataSource="items" @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
  import { BasicTable, useTable, FormSchema } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  let items = ref([]);
  let loading = ref(false);
  interface queryParams {
    limit: number;
    start_date: string | null;
    end_date: string | null;
    iot_soil_moisture_id: number | null;
    page: number;
  }
  const query = ref<queryParams>({
    limit: 10,
    end_date: null,
    start_date: null,
    iot_soil_moisture_id: null,
    page: 1,
  });
  export default defineComponent({
    components: { BasicTable, PageWrapper },
    setup() {
      const instance = getCurrentInstance();
      const [registerTable, { setPagination, setShowPagination, reload, setProps }] = useTable({
        title: '土壤墒情',
        columns: getBasicColumns(),
        showIndexColumn: false,
        bordered: true,
        onChange: (pagination) => {
          query.value = {
            ...query.value,
            limit: pagination.pageSize,
          };
          instance?.proxy?.$nextTick(() => {
            loadData(pagination.current);
          });
        },
      });
      const loadData = async (page: number) => {
        loading.value = true;

        instance?.proxy?.$nextTick(async () => {
          const data = await instance?.proxy?.$apollo?.query({
            query: gql.soilMoistureDataList,
            variables: {
              input: {
                ...query.value,
                page,
              },
            },
          });
          items.value = data?.data.iot_soil_moisture_data_list.items;
          setPagination({
            total: data?.data.iot_soil_moisture_data_list.total,
            current: data?.data.iot_soil_moisture_data_list.current_page,
            pageSize: data?.data.iot_soil_moisture_data_list.limit,
          });
          reload({
            page: data?.data.iot_soil_moisture_data_list.current_page,
          });
          query.value = {
            ...query.value,
            page: data?.data.iot_soil_moisture_data_list.current_page,
            limit: data?.data.iot_soil_moisture_data_list.limit,
          };
          loading.value = false;
        });
      };
      onMounted(async () => {
        setShowPagination(true);
        loadData(1);
        // 加载传感器列表
        const devicesData = await instance?.proxy?.$apollo?.query({
          query: gql.soilMoistureDevices,
        });
        const devices = devicesData?.data.iot_soil_moisture_devices;
        let devicesOptions: any = [];
        for (let index = 0; index < devices.length; index++) {
          const item = devices[index];
          devicesOptions.push({
            label: item.name + '(' + item.code + ')',
            value: item.id,
            key: item.id,
          });
        }
        const schemas: FormSchema[] = [
          {
            field: 'iot_soil_moisture_id',
            component: 'Select',
            label: '设备列表',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请选择',
              onChange: (val: any) => {
                query.value = {
                  ...query.value,
                  iot_soil_moisture_id: parseInt(val),
                };
              },
              options: devicesOptions,
              defaultValue: query.value.iot_soil_moisture_id,
            },
          },
          {
            field: 'date-range',
            component: 'RangePicker',
            label: '日期',
            labelWidth: 100,
            colProps: {
              span: 12,
            },
            componentProps: {
              placeholder: '请选择',
              onChange: (val: any) => {
                query.value = {
                  ...query.value,
                  start_date: val[0]?.format('YYYY-MM-DD'),
                  end_date: val[1]?.format('YYYY-MM-DD'),
                };
              },
            },
          },
        ];
        setProps({
          useSearchForm: true,
          formConfig: {
            schemas,
            showAdvancedButton: false,
            submitFunc: async () => {
              loadData(1);
            },
            resetFunc: async () => {
              query.value = {
                ...query.value,
                start_date: null,
                end_date: null,
                iot_soil_moisture_id: null,
              };
            },
          },
        });
      });
      return {
        registerTable,
        loading,
        items,
      };
    },
  });
</script>
