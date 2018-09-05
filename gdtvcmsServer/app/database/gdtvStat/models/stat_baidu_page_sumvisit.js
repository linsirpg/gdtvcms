/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statBaiduPageSumvisit', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    timespan: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TIMESPAN'
    },
    pagePv: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'PAGE_PV'
    },
    pageUv: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'PAGE_UV'
    },
    ipCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'IP_COUNT'
    },
    bounceRatio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00',
      field: 'BOUNCE_RATIO'
    },
    standingTime: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'STANDING_TIME'
    },
    transCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'TRANS_COUNT'
    },
    statDate: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'STAT_DATE'
    }
  }, {
    tableName: 'stat_baidu_page_sumvisit'
  });
};
