/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statPerCustomerTransaction', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    recordTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'RECORD_TIME'
    },
    turnover: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'TURNOVER'
    },
    increment: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'INCREMENT'
    }
  }, {
    tableName: 'stat_per_customer_transaction'
  });
};
