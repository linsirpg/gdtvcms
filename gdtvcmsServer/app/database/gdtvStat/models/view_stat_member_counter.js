/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('viewStatMemberCounter', {
    orderCounter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'OrderCounter'
    },
    orderIncrement: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'OrderIncrement'
    },
    memberCounter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'MemberCounter'
    },
    memberIncrement: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'MemberIncrement'
    },
    dauCounter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'DauCounter'
    },
    wauCounter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'WauCounter'
    },
    mauCounter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'MauCounter'
    },
    daouCounter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'DaouCounter'
    },
    waouCounter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'WaouCounter'
    },
    maouCounter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'MaouCounter'
    },
    recordTime: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'RecordTime'
    }
  }, {
    tableName: 'view_stat_member_counter'
  });
};
