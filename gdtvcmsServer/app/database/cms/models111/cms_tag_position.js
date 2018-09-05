/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmsTagPosition', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    positionCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'POSITION_CODE'
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMO'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STATUS'
    }
  }, {
    tableName: 'cms_tag_position'
  });
};
