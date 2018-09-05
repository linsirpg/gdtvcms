/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmsAdvertPosition', {
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
      unique: true,
      field: 'ADVERT_CODE'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TITLE'
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMO'
    },
    imageConfig: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'IMAGE_CONFIG'
    },
    kind: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'KIND'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'STATUS'
    }
  }, {
    tableName: 'cms_advert_position'
  });
};
