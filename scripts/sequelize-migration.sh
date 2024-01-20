npx sequelize-cli init

npx sequelize-cli model:generate \
  --name categories \
  --attributes \
    "name:string"

npx sequelize-cli model:generate \
  --name books \
  --attributes \
    "title:string, \
    description:string, \
    imageUrl:string, \
    releaseYear:integer, \
    price:string, \
    totalPage:integer, \
    thickness:integer, \
    categoryId:integer"

npx squelize-cli db:migrate