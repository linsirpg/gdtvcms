/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statDataProduct', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    productNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NO'
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NAME'
    }
  }, {
    tableName: 'stat_data_product'
  });
};
