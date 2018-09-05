/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmsPresetProduct', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TITLE'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'NAME'
    },
    memo: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'MEMO'
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'IMAGE_URL'
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'START_TIME'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'END_TIME'
    },
    productNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PRODUCT_NO'
    },
    kind: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'KIND'
    },
    propertyName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PROPERTY_NAME'
    },
    propertyValue: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PROPERTY_VALUE'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'STATUS'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'URL'
    }
  }, {
    tableName: 'cms_preset_product'
  });
};
