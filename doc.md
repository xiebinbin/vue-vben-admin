## 视频列表

##### GET:/api/content-manager/videos/index

###### 查询参数

```
{
  "page": 1,
  "limit": 10
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "last_page": 1,
    "total": 0,
    "limit": 10,
    "items": [
      {
        id: "",
        name: "",
        cover: "",
        play_url: "",
      }
    ]
  },
  "code": 200
}
```

## 政策资讯列表

##### GET:/api/content-manager/policy-info/index

###### 查询参数

```
{
  "page": 1,
  "limit": 10
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "last_page": 1,
    "total": 2,
    "limit": 10,
    "items": [
      {
        "id": 2,
        "title": "rwrwem",
        "desc": "bjbjbjbj",
        "cover": "http://localhost:8000/upload/2022/05/16/avatar/NFbNbkQ4b7LI5GKZAlgTY0V71o5jOI201aVQBZYy.jpg",
        "sort": 0,
        "content": "<p>nnn</p>",
        "status": "UP",
        "created_at": "2022-05-15",
        "updated_at": "2022-05-15",
        "deleted_at": null
      }
    ]
  },
  "code": 200
}
```

## 政策资讯详情

##### GET:/api/content-manager/policy-info/info

###### 查询参数

```
{
  "id": 1
}
```

###### 响应参数

```
{
  "data": {
    "id": 1,
    "title": "rwrwe",
    "desc": "bjbjbjbj",
    "cover": "http://localhost:8000/upload/2022/05/16/avatar/ZjVBJAV7Sfu8FpLjywICytn0T8n60w9XmQuBrNgR.jpg",
    "sort": 0,
    "content": "<p>rwrwrwr</p>\n<p>jhjhjjj</p>",
    "status": "UP",
    "created_at": "2022-05-15",
    "updated_at": "2022-05-15",
    "deleted_at": null
  },
  "code": 200
}
```

## 特色农产品列表

##### GET:/api/content-manager/products/index

###### 查询参数

```
{
  "page": 1,
  "limit": 10
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "last_page": 1,
    "total": 1,
    "limit": 10,
    "items": [
      {
        "id": 1,
        "name": "测试深加工产品",
        "cover": "http://localhost:8000/upload/2022/05/16/avatar/rDzWnDNiSOD9yQVlW3I8JUkuJ2tKoCMfWa34QB9d.jpg",
        "remark": "",
        "desc": "大大阿达大大大大啊哒哒哒哒哒哒",
        "status": "UP",
        "processing_company_id": 1,
        "created_at": "2022-05-15T17:01:55.000000Z",
        "updated_at": "2022-05-15T17:24:48.000000Z",
        "deleted_at": null,
        "sort": 10
      }
    ]
  },
  "code": 200
}
```

## 特色农产品详情

##### GET:/api/content-manager/products/info

###### 查询参数

```
{
  "id": 1
}
```

###### 响应参数

```
{
  "data": {
    "id": 1,
    "name": "测试深加工产品",
    "cover": "http://localhost:8000/upload/2022/05/16/avatar/rDzWnDNiSOD9yQVlW3I8JUkuJ2tKoCMfWa34QB9d.jpg",
    "remark": "",
    "desc": "大大阿达大大大大啊哒哒哒哒哒哒",
    "content": "<p><img src=\"http://localhost:8000/upload/2022/05/16/avatar/mDydkYifosXtMILdvYALmZhTLicxgLLtI5SX4PSu.jpg\" />qeqeq</p>",
    "status": "UP",
    "created_at": "2022-05-15T17:01:55.000000Z",
    "updated_at": "2022-05-15T17:24:48.000000Z",
    "deleted_at": null,
    "sort": 10,
    "images": "",
    "processing_company": {
      "id": 1,
      "name": "dadada",
      "organization_code_certificate": "dadad",
      "remark": "",
      "created_at": "2022-05-06T22:09:15.000000Z",
      "updated_at": "2022-05-15T17:54:57.000000Z",
      "deleted_at": null,
      "certificate_images": [
        "http://localhost:8000/upload/2022/05/16/avatar/k2YT1avnrTg3pLIWlZ8AOrZnAkCbVhzPqgwH1jBh.jpg",
        "http://localhost:8000/upload/2022/05/16/avatar/kwrb9IveVtkmpoPccRBKLm3OonQGJvCAQzfLWPfR.jpg",
        "http://localhost:8000/upload/2022/05/16/avatar/p8xnOViPw1wzdYupM00Jh9TZMNfVe1galsgV4Bpo.jpg"
      ]
    }
  },
  "code": 200
}
```

## 深加工列表

##### GET:/api/content-manager/industry-articles/index

###### 查询参数

```
{
  "page": 1,
  "limit": 10
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "last_page": 4,
    "total": 33,
    "limit": 10,
    "items": [
      {
        "cover": "",
        "id": 29,
        "title": "ddda",
        "desc": "jhjhj"
      },
    ]
  },
  "code": 200
}
```

## 深加工详情

##### GET:/api/content-manager/industry-articles/info

###### 查询参数

```
{
  "id": 1
}
```

###### 响应参数

```
{
  "data": {
    "id": 1,
    "title": "",
    "desc": "",
    "cover": "",
    "sort": 10,
    "content": "",
    "status": "UP",
    "created_at": "2022-05-15",
    "updated_at": "2022-05-15",
    "deleted_at": null,
    "images": []
  },
  "code": 200
}
```

## 平武产业简介

##### GET:/api/content-manager/intro/ping-wu

###### 响应参数

```
{
  "data": {
    "content": "",
    "images": []
  },
  "code": 200
}
```

## 平通产业简介

##### GET:/api/content-manager/intro/ping-tong

###### 响应参数

```
{
  "data": {
    "content": "",
    "image": ""
  },
  "code": 200
}
```

## 豆蔻简介

##### GET:/api/content-manager/intro/dou-kou

###### 响应参数

```
{
  "data": {
    "content": "",
    "images": []
  },
  "code": 200
}
```

## 锁江简介

##### GET:/api/content-manager/intro/suo-jiang

###### 响应参数

```
{
  "data": {
    "content": "",
    "images": []
  },
  "code": 200
}
```

## 清漪江康养带简介

##### GET:/api/content-manager/intro/qing-yi-jiang

###### 响应参数

```
{
  "data": {
    "content": "",
  },
  "code": 200
}
```

## 平通区域简介

##### GET:/api/content-manager/intro/ping-tong-area

###### 响应参数

```
{
  "data": {
    "content": "",
  },
  "code": 200
}
```

## 印象梅林简介

##### GET:/api/content-manager/intro/mei-lin

###### 响应参数

```
{
  "data": {
    "content": "",
  },
  "code": 200
}
```

## 社会化服务列表

##### GET:/api/content-manager/social-service-industry/index

###### 查询参数

```
{
  "page": 1,
  "limit": 10
  "tag": "供应|需求"
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "last_page": 1,
    "total": 3,
    "limit": 10,
    "items": [
      {
        "id": 3,
        "title": "qrqrqrq",
        "category": "采收",
        "pricing": "0.00",
        "pricing_unit": "总金额",
        "start_date": "2022-06-27",
        "end_date": "2022-06-30",
        "contact": "dadd",
        "phone": "dad",
        "content": "dafafsfaaafafa",
        "status": "UP",
        "address": "dadad",
        "created_at": "2022-05-15T19:44:56.000000Z",
        "updated_at": "2022-05-15T19:47:57.000000Z",
        "deleted_at": null,"tag": null
      }
    ]
  },
  "code": 200
}
```

## 社会化服务详情

##### GET:/api/content-manager/social-service-industry/info

###### 查询参数

```
{
  "id": 1
}
```

###### 响应参数

```
{
  "data": {
    "id": 1,
    "title": "dadaaa",
    "category": "采收",
    "pricing": "0.00",
    "pricing_unit": "总金额",
    "start_date": "2022-05-29",
    "end_date": "2022-06-28",
    "contact": "",
    "phone": "",
    "content": "dada",
    "status": "UP",
    "address": "",
    "created_at": "2022-05-15 19:40:10",
    "updated_at": "2022-05-15 19:48:18",
    "deleted_at": null,
    "tag": null
  },
  "code": 200
}
```

## 发布社会化服务

##### POST:/api/content-manager/social-service-industry/send

###### 查询参数

```
{
  'title': "",
  'category': "",
  'pricing': "",
  'pricing_unit': "",
  'start_date': "",
  'end_date': "",
  'contact': "",
  'phone': "",
  'address': "",
  'status': "",
  'content: "",
  'tag': "供应/需求",
}
```

###### 响应参数

```
{
  "data": null,
  "code": 200
}
```

## 专家列表

##### GET:/api/expert-system/staff/index

###### 查询参数

```
{
  limit: 10,
  page: 1
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "last_page": 2,
    "total": 11,
    "limit": 10,
    "items": [
      {
        "id": 10,
        "name": "胡荣平",
        "avatar": "",
        "job_title": "博士/副研究员",
        "work_unit": "四川省农业科学院植保所",
        "expert_system_staff_category_id": 1,
        "expert_system_staff_category": {
        "id": 1,
        "name": "aa更新54",
        "expert_system_staff_number": 0,
        "created_at": "2022-03-18 06:05:14",
        "updated_at": "2022-03-18 11:53:49",
        "deleted_at": null
      }
    ]
  },
  "code": 200
}
```

## 专家详情

##### GET:/api/expert-system/staff/info

###### 查询参数

```
{
  id: 1
}
```

###### 响应数据

```
{
  "data": {
    "id": 1,
    "expert_system_staff_category_id": 9,
    "bind_user_id": 0,
    "avatar": "http://localhost:8000/upload/2022/03/19/avatar/cNwor0ku9RbivjKA0vPvWAwlWHCxenFccb6xICcB.jpg",
    "name": "ddafa",
    "job_title": "副教授",
    "work_unit": null,
    "expertise": null,
    "article_number": 0,
    "question_number": 0,
    "created_at": "2022-03-18 17:41:20",
    "updated_at": "2022-03-19 16:09:20",
    "deleted_at": null,
    "tag": null,
    "content": "内容",
    "expert_system_staff_category": {
      "id": 9,
      "name": "哈哈哈哈哈",
      "expert_system_staff_number": 0,
      "created_at": "2022-03-18 06:50:57",
      "updated_at": "2022-03-18 06:50:57",
      "deleted_at": null
    }
  },
  "code": 200
}
```

## 知识分类

##### GET:/api/expert-system/article-categories

###### 响应数据

```
{
  "data": {
    "items": [
      {
        "id": 2,
        "name": "农业知识",
        "expert_system_article_number": 0,
        "created_at": "2022-05-22 08:17:54",
        "updated_at": "2022-05-22 08:17:54",
        "deleted_at": null
      },
    ]
  },
  "code": 200
}
```

## 知识列表

##### GET:/api/expert-system/article-list

###### 查询参数

```
{
  limit: 10,
  page: 1,
  categories: [1, 2,3]// 分类id 可为空
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "data": [
      {
      "id": 3,
      "title": "dadad",
      "introduction": "dadadadadada",
      "expert_system_staff": null
      }
    ],
    "first_page_url": "http://localhost:8000/api/expert-system/article-list?page=1",
    "from": 1,
    "next_page_url": null,
    "path": "http://localhost:8000/api/expert-system/article-list",
    "per_page": 10,
    "prev_page_url": null,
    "to": 2
  },
  "code": 200
}
```

## 知识详情

##### GET:/api/expert-system/article-detail

###### 查询参数

```
{
  id: 1
}
```

###### 响应数据

```
{
  "data": {
    "id": 2,
    "title": "dadad",
    "introduction": "",
    "content": "<p>dada</p>",
    "created_at": "2022-03-18 21:26:44",
    "updated_at": "2022-03-18 21:26:44",
    "deleted_at": null
  },
  "code": 200
}
```

## 问答列表

##### GET:/api/expert-system/question-list

###### 查询参数

```
{
  limit:10,
  page:1,
  expert_system_staff_id: 0, // 专家id
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "data": [
      {
      "id": 4,
      "title": "eqeqe",
      "created_at": "2022-04-26 07:08:57"
      },
    ],
    "first_page_url": "http://localhost:8000/api/expert-system/question-list?1=1",
    "from": 1,
    "next_page_url": null,
    "path": "http://localhost:8000/api/expert-system/question-list",
    "per_page": 10,
    "prev_page_url": null,
    "to": 4
  },
  "code": 200
}
```

## 发布问答

##### POST:/api/expert-system/add-question

###### 查询参数

```
{
  staff_id:10, //专家id
  content: '内容',
  name: '联系人'
  contact: '联系方式',
  title: '标题',
}
```

###### 响应参数

```
{
  data: null,
  code: 200
}
```

## 问答详情

##### GET:/api/expert-system/question-detail

###### 查询参数

```
{
  id: 1
}
```

###### 响应数据

```
{
  "data": {
    "id": 1,
    "expert_system_staff_id": 1,
    "content": "<p>嗯按奥二群</p>",
    "name": "啊大大",
    "contact": "大大大",
    "online_status": 0,
    "created_at": "2022-03-19 13:09:05",
    "updated_at": "2022-03-23 07:50:38",
    "deleted_at": null,
    "title": "nnn",
    "answer": ""
  },
  "code": 200
}
```

## 餐饮单位列表

##### GET:/api/content-manager/restaurants/index

###### 查询参数

```
{
  limit: 10,
  page: 1
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "last_page": 1,
    "total": 1,
    "limit": 10,
    "items": [
      {
        "id": 1,
        "name": "dada",
        "contact": "",
        "telephone": "",
        "address": "",
        "rer_capital_consumption": "0.00"
      }
    ]
  },
  "code": 200
}
```

## 餐饮单位详情

##### GET:/api/content-manager/restaurants/info

###### 查询参数

```
{
  id: 1,
}
```

###### 响应参数

```
{
  "data": {
    "id": 1,
    "name": "dada",
    "rer_capital_consumption": "0.00",
    "contact": "",
    "telephone": "",
    "address": "",
    "images": [],
    "content": "",
    "sort": 0,
    "status": "UP",
    "created_at": "2022-05-21 17:57:00",
    "updated_at": "2022-05-22 02:24:15",
    "deleted_at": null
  },
  "code": 200
}
```

## 地址位置列表

##### GET:/api/content-manager/map-article/index?tag=清漪江康养示范区

###### 查询参数

```
{
  limit: 10,
  page: 1,
  tag: "清漪江康养示范区|平通镇|印象梅林"
}
```

###### 响应参数

```
{
  "data": {
    "current_page": 1,
    "last_page": 3,
    "total": 27,
    "limit": 10,
    "items": [
      {
        "id": 75,
        "title": "梦幻梯田",
        "desc": "",
        "created_at": "2022-05-20"
      }
    ]
  },
  "code": 200
}
```

## 地理位置详情

##### GET:/api/content-manager/map-article/info

###### 查询参数

```
{
  id: 1,
}
```

###### 响应参数

```
{
  "data": {
    "id": 75,
    "title": "梦幻梯田",
    "tag": "平通镇",
    "desc": "",
    "cover": "",
    "sort": 10,
    "status": "UP",
    "content": "",
    "created_at": "2022-05-20",
    "updated_at": "2022-05-20",
    "deleted_at": null,
    "images": []
  },
  "code": 200
}
```

## 产业概况

##### GET:/api/big-data/base-data

###### 响应参数

```
{
  "code": 200,
  "msg": "ok!",
  "data": {
    "industry-overview-jkdw": "111", // 监控点位
    "industry-overview-cgqs": "111", // 传感器数
    "industry-overview-ygcl": "", // 预估产量
    "industry-overview-ygcz": "", // 预估产值
    "industry-overview-zzsl": "", // 种植数量
    "industry-overview-ggsl": "", // 挂果数量
    "industry-overview-jdmj": "", // 基地面积
    "industry-overview-zzmj": "" // 种植面积
  }
}
```

## 监控列表

##### GET:/api/big-data/camera-lives

###### 响应参数

```
{
  "code": 200,
  "msg": "ok!",
  "data": {
    {
      "deviceSerial": "G78313638",
      "deviceName": "平武项目恋梅园机房",
      "liveAddress": "http://hls01open.ys7.com/openlive/abd6f48961b34a4e951d6079e9abdd9e.m3u8",
      "hdAddress": "http://hls01open.ys7.com/openlive/abd6f48961b34a4e951d6079e9abdd9e.hd.m3u8" // 播放地址
    },
  }
}
```

## 物联网数据

##### GET:/api/big-data/sensor-data

###### 响应数据

```
{
  "code": 200,
  "msg": "ok!",
  "data": {
    "days": [
      "05/15",
      "05/16",
      "05/17",
      "05/18",
      "05/19",
      "05/20",
      "05/21"
    ],
    "value_list": {
      "ph_values": [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "salinity_values": [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "temperature_values": [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "humidity_values": [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "liquid_level_values": [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    }
  }
}
```

## 地图点位

##### GET:/api/big-data/location-markers

###### 响应数据

```
{
  "code": 200,
  "msg": "ok!",
  "data": [
    {
      "lng": "104.698020",
      "lat": "32.049848",
      "size": 10,
      "cate": "摄像头",
      "typecode": "water",
      "title": "摄像头1"
    }
  ]
}
```

## 虫情数据

##### GET:/api/big-data/worming-list

###### 响应数据

```
{
  "code": 200,
  "msg": "ok!",
  "data": [
    {
      "id": 31,
      "iot_worming_id": 1,
      "pic_url": "http://oss.scyphr.com/20220421120100-65-iot.jpg",
      "tag": "正面",
      "pic_date": "2022-04-21",
      "collection_at": "2022-04-21",
      "created_at": "2022-04-25T07:51:06.000000Z",
      "updated_at": "2022-04-25T07:51:06.000000Z",
      "deleted_at": null
    },
    {
      "id": 32,
      "iot_worming_id": 1,
      "pic_url": "http://oss.scyphr.com/20220421120305-4-iot.jpg",
      "tag": "反面",
      "pic_date": "2022-04-21",
      "collection_at": "2022-04-21",
      "created_at": "2022-04-25T07:51:06.000000Z",
      "updated_at": "2022-04-25T07:51:06.000000Z",
      "deleted_at": null
    }
  ]
}
```
