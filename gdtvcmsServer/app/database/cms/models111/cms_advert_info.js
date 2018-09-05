/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmsAdvertInfo', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    advertCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ADVERT_CODE'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TITLE'
    },
    describe: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'DESCRIBE'
    },
    productNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NO'
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'IMAGE_URL'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'URL'
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'SORT'
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
    param1: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM1'
    },
    param2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM2'
    },
    param3: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM3'
    },
    param4: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM4'
    },
    param5: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM5'
    },
    kind: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'KIND'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STATUS'
    }
  }, {
    tableName: 'cms_advert_info'
  });
};
