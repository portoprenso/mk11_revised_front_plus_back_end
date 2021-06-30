const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketGame = sequelize.define('basket_game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// const Device = sequelize.define('device', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
//     price: {type: DataTypes.INTEGER, allowNull: false},
//     rating: {type: DataTypes.INTEGER, defaultValue: 0},
//     img: {type: DataTypes.STRING, allowNull: false},
// })

// const DeviceInfo = sequelize.define('device_info', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     title: {type: DataTypes.STRING, allowNull: false},
//     description: {type: DataTypes.STRING, allowNull: false},
// })

const Game = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    imageLarge: {type: DataTypes.STRING, allowNull: false},
    countInStock: {type: DataTypes.INTEGER, defaultValue: 0},
    price: {type: DataTypes.INTEGER, allowNull: false},
    oldPrice: {type: DataTypes.INTEGER, allowNull: true, defaultValue: this.price},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
})

const GameInfo = sequelize.define('game_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING},
    gameId: {type: DataTypes.INTEGER}
})

const Hero = sequelize.define('hero', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    image: {type: DataTypes.STRING, unique: false, allowNull: true},
})

const HeroInfo = sequelize.define('hero_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true, unique: false},
    imageLarge: {type: DataTypes.STRING, allowNull: false, unique: false},
    video: {type: DataTypes.STRING, unique: false, allowNull: true}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const TypeGame = sequelize.define('type_game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT, allowNull: false},
    gameId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER}
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Game.hasMany(Comment)
Comment.belongsTo(Game)

Basket.hasMany(BasketGame)
BasketGame.belongsTo(Basket)

Type.hasMany(Game)
Game.belongsTo(Type)

Brand.hasMany(Game)
Game.belongsTo(Brand)

Game.hasMany(Rating)
Rating.belongsTo(Game)

Game.hasMany(BasketGame)
BasketGame.belongsTo(Game)

Game.hasMany(GameInfo, {as: 'info'});
GameInfo.belongsTo(Game)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

Type.belongsToMany(Game, {through: TypeGame })
Game.belongsToMany(Type, {through: TypeGame })

Hero.hasMany(HeroInfo, {as: 'info'})
HeroInfo.belongsTo(Hero)

module.exports = {
    User,
    Basket,
    BasketGame,
    // BasketDevice,
    // Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    // DeviceInfo,
    Game,
    GameInfo,
    Hero,
    HeroInfo,
    TypeGame
}