/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paymentLog', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    paymentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'PAYMENT_ID'
    },
    paymentNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PAYMENT_NO'
    },
    paymentAccount: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PAYMENT_ACCOUNT'
    },
    tradeNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'TRADE_NO'
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATE_DATE'
    },
    payStatus: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'PAY_STATUS'
    },
    payTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'PAY_TIME'
    },
    paymentFee: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'PAYMENT_FEE'
    }
  }, {
    tableName: 'payment_log'
  });
};
