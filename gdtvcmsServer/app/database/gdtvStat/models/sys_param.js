/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sysParam', {
    groupCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'GROUP_CODE'
    },
    itemCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      field: 'ITEM_CODE'
    },
    itemValue: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ITEM_VALUE'
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
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'PARAM5'
    },
    memo: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'MEMO'
    },
    showOrder: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '99',
      field: 'SHOW_ORDER'
    }
  }, {
    tableName: 'sys_param'
  });
};
