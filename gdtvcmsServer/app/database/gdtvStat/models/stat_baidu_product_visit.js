/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statBaiduProductVisit', {
    statDate: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'STAT_DATE'
    },
    productNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NO'
    },
    pagePv: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'PAGE_PV'
    },
    pageUv: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'PAGE_UV'
    },
    goNext: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'GO_NEXT'
    },
    exitPage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'EXIT_PAGE'
    },
    standingTime: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'STANDING_TIME'
    },
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    statHour: {
      type: DataTypes.STRING(2),
      allowNull: true,
      field: 'STAT_HOUR'
    }
  }, {
    tableName: 'stat_baidu_product_visit'
  });
};
