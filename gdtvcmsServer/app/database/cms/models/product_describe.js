/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productDescribe', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NAME'
    },
    productDesc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_DESC'
    },
    productNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NO'
    }
  }, {
    tableName: 'product_describe'
  });
};
