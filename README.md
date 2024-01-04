#  NestJS SOTA Boilerplate

> 用于构建新项目, 使用[NestJS V10](https://nestjs.com) 框架. 欢迎提出您的宝贵意见. 

集成 NestJS + TS + swagger + class-validator + class-transformer + jest + JWT Auth + Authentication + i18n + compodoc 文档

## 核心思想

1. 配置优于代码
2. 少少代码即可完成任务

## Features

1. Swagger 文档
    - 提供 API 稳定.启动项目后访问 http://localhost:3000/api
2. sequelize
    - orm for SQL DB
3. 构建文档
    - 通过 `yarn doc` 构建文档信息
4. 测试 jest
    - 单元测试
    - 端对端测试
5. Linter
    - eslint + prettier = ❤️
6. 环境配置 env.*
7. 标准路由
8. jwt 权鉴
9. 国际化 i18n

## Getting started

```bash
# 1. Clone the repository or click on "Use this template" button.
git clone https://github.com/TheOne1006/nestjs-rest-api-boilerplate.git my-new-project

# 2. Enter your newly-cloned folder.
cd my-new-project

# 3. Install dependencies. (Make sure yarn is installed: https://yarnpkg.com/lang/en/docs/install)
yarn

# 4. Run development server and open http://localhost:3000
yarn start:dev

# 5. Read the documentation linked below for "Setup and development".
```


### Scripts

```bash
# 查看文档
$ yarn doc:serve

# create controller
$ nest g controller users

# create module
$ nest g module users

# 创建 mysql 文件
yarn migrate:new -- --name user # 创建文件 databases/migrations/xxx-user.js

# 重新建库命令
yarn migrate:rest

# 生成目录树
$ yarn tree

# 构建文档服务, 默认位于 `documentation`
$ doc:serve
```
