<template>
  <PageWrapper :title="pageTitle" contentFullHeight>
    <div v-if="item.data">
      <a-form
        :model="item"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          label="数据说明"
          name="title"
          :rules="[{ required: true, message: '请输入内容!' }]"
        >
          <a-input v-model:value="item.title" />
        </a-form-item>
        <a-form-item
          label="数据列表"
          name="data"
          :rules="[{ required: false, message: '请输入内容!' }]"
        >
          <div>
            <div>
              <a-button @click="addItem">添加数据</a-button>
            </div>
            <div
              v-for="(dataItem, i) in item.data"
              class="p-2 m-1 bg-white rounded-sm border-gray-400 border-1"
              :key="i"
            >
              <div class="w-full flex">
                <div class="w-8/10">
                  <a-input v-model:value="dataItem.title" size="small" addon-before="标题：" />
                </div>
                <div class="w-2/10 flex justify-end">
                  <a-button size="small" @click="topData(i)"> 置顶 </a-button>
                  <a-button @click="item.data.splice(i, 1)" size="small" danger>删除</a-button>
                </div>
              </div>
              <div>项目列表：</div>
              <div>
                <div>
                  <a-button @click="addProject(i)">添加项目</a-button>
                </div>
                <div class="mt-2 flex flex-wrap">
                  <div
                    v-for="(project, pi) in item.data[i].projects"
                    class="w-14/30 p-2 m-2 rounded-sm border-yellow-300 border-1"
                    :key="pi"
                  >
                    <div class="w-full flex">
                      <div class="w-8/10">
                        <a-input
                          v-model:value="project.project_name"
                          size="small"
                          addon-before="项目名称："
                        />
                      </div>
                      <div class="w-2/10 flex justify-end">
                        <a-button size="small" @click="topProject(i, pi)"> 置顶 </a-button>
                        <a-button @click="item.data[i].projects.splice(pi, 1)" size="small" danger>
                          删除
                        </a-button>
                      </div>
                    </div>
                    <div class="w-full flex mt-1">
                      <div class="w-1/2">
                        <a-input-number
                          v-model:value="project.size"
                          size="small"
                          addon-before="规模："
                        />
                      </div>
                      <div class="w-1/2">
                        <a-input v-model:value="project.unit" size="small" addon-before="单位：" />
                      </div>
                    </div>
                    <div class="w-full flex mt-1">
                      <div class="w-1/2">
                        <a-input-number
                          v-model:value="project.total_capacity"
                          size="small"
                          addon-before="总产量："
                          addon-after="吨"
                        />
                      </div>
                      <div class="w-1/2">
                        <a-input-number
                          v-model:value="project.unit_price"
                          size="small"
                          addon-before="单价："
                          addon-after="元/kg"
                        />
                      </div>
                    </div>
                    <div class="w-full mt-1">
                      <a-input
                        v-model:value="project.unit_capacity"
                        size="small"
                        addon-before="单位产量(kg)或产比："
                      />
                    </div>
                    <div class="w-full mt-1">
                      <a-input-number
                        v-model:value="project.total_price"
                        size="small"
                        addon-before="总价值："
                        addon-after="万元"
                      />
                    </div>
                    <div class="w-full">
                      <div>备注：</div>
                      <div>
                        <a-textarea v-model:value="project.remark" size="small" :rows="4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, getCurrentInstance, onMounted } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import gql from '/@/graphql/index';
  import { Input, FormItem, Form, Button, InputNumber } from 'ant-design-vue';
  interface ItemDataProject {
    project_name: String;
    remark: String;
    size: Number;
    total_capacity: Number;
    total_price: Number;
    unit: String;
    unit_capacity: String;
    unit_price: Number;
  }
  interface ItemData {
    title: String;
    projects: Array<ItemDataProject>;
  }
  interface Item {
    title: String;
    data: Array<ItemData>;
    created_at: String;
  }
  let item = reactive<Item>({
    title: '',
    data: [],
    created_at: '',
  });
  const pageTitle = ref<string>('经济效益-编辑');
  const instance = ref<any>(null);
  export default defineComponent({
    components: {
      PageWrapper,
      'a-input': Input,
      'a-form': Form,
      'a-form-item': FormItem,
      'a-button': Button,
      'a-textarea': Input.TextArea,
      'a-input-number': InputNumber,
    },
    setup() {
      const { createMessage } = useMessage();

      instance.value = getCurrentInstance();
      onMounted(async () => {
        const data = await getCurrentInstance()?.proxy?.$apollo?.query({
          query: gql.contentManagerEconomicBenefitFirstGQL,
        });
        const info = data?.data?.common_economic_benefit_first;
        item.title = info?.title;
        const dateItems: Array<ItemData> = [];
        for (let i = 0; i < info?.data.length; i++) {
          const dataItem = info?.data[i];
          console.log(dataItem);
          const projects: Array<ItemDataProject> = [];
          for (let pi = 0; pi < dataItem.projects.length; pi++) {
            const project = dataItem.projects[pi];
            projects.push({
              project_name: project?.project_name,
              remark: project?.remark,
              size: project?.size,
              total_capacity: project?.total_capacity,
              total_price: project?.total_price,
              unit: project?.unit,
              unit_capacity: project?.unit_capacity,
              unit_price: project?.unit_price,
            });
          }
          dateItems.push({
            title: dataItem?.title,
            projects: projects,
          });
        }
        item.data = dateItems;

        item.created_at = info?.created_at;
      });
      const addItem = () => {
        item.data.unshift({
          title: '',
          projects: [],
        });
      };
      const addProject = (itemIndex) => {
        item.data[itemIndex].projects.unshift({
          project_name: '',
          remark: '',
          size: 0.0,
          total_capacity: 0.0,
          total_price: 0.0,
          unit: '',
          unit_capacity: '',
          unit_price: 0.0,
        });
      };
      const topData = (index) => {
        if (index > 0) {
          const data = item.data[index];
          item.data.splice(index, 1);
          item.data.unshift(data);
        }
      };
      const topProject = (index, projectIndex) => {
        const dataItem: ItemData = item.data[index];
        const projects = dataItem.projects;
        const project = projects[projectIndex];
        projects.splice(projectIndex, 1);
        projects.unshift(project);
        item.data[index].projects = projects;
      };
      return {
        onFinishFailed: () => {},
        onFinish: () => {
          instance.value?.proxy?.$apollo
            ?.mutate({
              mutation: gql.contentManagerEconomicBenefitAddGQL,
              variables: {
                input: item,
              },
            })
            .then(() => {
              createMessage.success('更新成功');
            })
            .catch((error) => {
              console.log(error);
            });
        },
        pageTitle,
        addProject,
        addItem,
        item,
        topData,
        topProject,
      };
    },
  });
</script>
