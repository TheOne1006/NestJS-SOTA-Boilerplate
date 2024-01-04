#  NestJS REST Boilerplate

> 用于构建新项目, 使用[NestJS](https://nestjs.com) 框架. 欢迎提出您的宝贵意见.

NestJS + TS + swagger + class-validator + class-transformer + jest + jwt + Authentication + i18n

## 核心思想

1. 配置优于代码

## Features

1. Swagger Api Documentation
    - Already integrated API documentation. To see all available endpoints visit http://localhost:3000/documentation
2. sequelize
3. build doc
   - 
4. test
    - unit test
    - e2e test
5. Linter
    - eslint + prettier = ❤️
6. Environment Configuration
    - development, test and production environment configurations
7. Industry-standard routing

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
```
