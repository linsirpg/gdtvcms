/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('couponRule', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    actId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'ACT_ID'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TITLE'
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'CONTENT'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'START_DATE'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'END_DATE'
    },
    ruleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'RULE_ID'
    },
    imgUrl: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'IMG_URL'
    },
    takeType: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TAKE_TYPE'
    }
  }, {
    tableName: 'coupon_rule'
  });
};
