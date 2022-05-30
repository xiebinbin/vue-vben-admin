import { BasicColumn } from '/@/components/Table/src/types/table';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '80px',
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: '300px',
    },
    {
      title: '文章分类',
      dataIndex: 'expert_system_article_category.name',
      width: '120px',
      customRender: ({ record }) => h('span', record?.expert_system_article_category?.name),
    },
    {
      title: '专家',
      dataIndex: 'expert_system_staff.name',
      width: '120px',
      customRender: ({ record }) => h('span', record?.expert_system_staff?.name),
    },
    {
      title: '状态',
      dataIndex: 'online_status',
      width: '80px',
      customRender: ({ record }) => {
        return h(
          Tag,
          {
            color: record?.online_status == 0 ? 'red' : 'green',
          },
          record?.online_status == 0 ? '下线' : '上线',
        );
      },
    },
    {
      title: '创建时间',
      width: '180px',
      dataIndex: 'created_at',
    },
  ];
}
