const sequelize = require("../database");
const {DataTypes} = require('sequelize');
const Sequelize = require("sequelize");
// блять розділи цей ужас на три моделі блять сука нахуй
const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
    email: {type: Sequelize.STRING, allowNull: false, unique: true},
    password: {type: Sequelize.STRING, allowNull: false},
    role: {type: Sequelize.STRING, defaultValue: "USER"},
})

const Role = sequelize.define('role', {
    id: {type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
    value: {type: Sequelize.STRING, allowNull: false, unique: true,},
    description: {type: Sequelize.STRING, allowNull: false,}
})

const Post = sequelize.define('Post', {
    id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.STRING, allowNull: false},
    content: {type: Sequelize.STRING, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'user', key: 'id'}},
    image: {type: Sequelize.STRING, allowNull: true}
});

User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });
User.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(User, {foreignKey: 'userId'});
module.exports = {
    User, Role, Post
}
