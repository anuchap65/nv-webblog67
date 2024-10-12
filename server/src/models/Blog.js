module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        pname: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        detail: DataTypes.TEXT,
        price: DataTypes.STRING,     
        pnum: DataTypes.STRING,
    })
    return Blog
}