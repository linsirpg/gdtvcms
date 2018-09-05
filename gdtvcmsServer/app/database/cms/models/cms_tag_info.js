/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cms_tag_info', {
    RECID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    TITLE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CONTENT: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    IMAGE_URL: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    URL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    START_TIME: {
      type: DataTypes.DATE,
      allowNull: true
    },
    END_TIME: {
      type: DataTypes.DATE,
      allowNull: true
    },
    KIND: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    STATUS: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    POSITION_CODE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SORT:{
      type: DataTypes.STRING(255),
      allowNull: true 
    }
  }, {
    tableName: 'cms_tag_info'
  });
};
