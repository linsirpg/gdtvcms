/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statSalePay', {
    id: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    saleCount: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: '0',
      field: 'SALE_COUNT'
    },
    payCount: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      defaultValue: '0',
      field: 'PAY_COUNT'
    },
    salePayCount: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'SALE_PAY_COUNT'
    },
    saleSum: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'SALE_SUM'
    },
    paySum: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'PAY_SUM'
    },
    salePaySum: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'SALE_PAY_SUM'
    },
    saleUnit: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'SALE_UNIT'
    },
    payUnit: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'PAY_UNIT'
    },
    type: {
      type: DataTypes.STRING(16),
      allowNull: true,
      field: 'TYPE'
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATETIME'
    },
    recordTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'RECORD_TIME'
    }
  }, {
    tableName: 'stat_sale_pay'
  });
};
