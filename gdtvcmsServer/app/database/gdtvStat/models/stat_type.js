/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statType', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    typeGroup: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TYPE_GROUP'
    },
    typeValue: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TYPE_VALUE'
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMO'
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATETIME'
    }
  }, {
    tableName: 'stat_type'
  });
};
