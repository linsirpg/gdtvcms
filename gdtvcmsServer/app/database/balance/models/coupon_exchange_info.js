/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('couponExchangeInfo', {
    rcid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RCID'
    },
    exchangeCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      field: 'EXCHANGE_CODE'
    },
    memberAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMBER_ACCOUNT'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STATUS'
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMO'
    }
  }, {
    tableName: 'coupon_exchange_info'
  });
};
