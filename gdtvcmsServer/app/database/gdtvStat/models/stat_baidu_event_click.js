/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statBaiduEventClick', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    statDate: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'STAT_DATE'
    },
    statTabOpera: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'STAT_TAB_OPERA'
    },
    statSingleNum: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STAT_SINGLE_NUM'
    },
    statTabType: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'STAT_TAB_TYPE'
    },
    statTabName: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'STAT_TAB_NAME'
    },
    statSumNum: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STAT_SUM_NUM'
    },
    statEventValue: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STAT_EVENT_VALUE'
    },
    statEventAvgvalue: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STAT_EVENT_AVGVALUE'
    }
  }, {
    tableName: 'stat_baidu_event_click'
  });
};
