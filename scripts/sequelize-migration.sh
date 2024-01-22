npx sequelize-cli init

npx sequelize-cli model:generate \
  --name Categories \
  --attributes \
    "name:string"

npx sequelize-cli model:generate \
  --name Books \
  --attributes \
    "title:string, \
    description:string, \
    imageUrl:string, \
    releaseYear:integer, \
    price:string, \
    totalPage:integer, \
    thickness:integer, \
    categoryId:integer"

npx sequelize-cli model:generate \
  --name Users \
  --atrributes \
    "username:string, \
    password:string"

npx sequelize-cli model:generate \
  --name Authentications \
  --atrributes \
    "token:string"

npx sequelize-cli db:migrate