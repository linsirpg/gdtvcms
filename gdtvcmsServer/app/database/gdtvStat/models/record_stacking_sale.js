/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recordStackingSale', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    typePrefix: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TYPE_PREFIX'
    },
    productSkuCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_SKU_CODE'
    },
    productSkuTitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_SKU_TITLE'
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NAME'
    },
    saleCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'SALE_COUNT'
    },
    salePrice: {
      type: "DOUBLE(16,2)",
      allowNull: true,
      field: 'SALE_PRICE'
    },
    orderCount: {
      type: DataTypes.INTEGER(16),
      allowNull: true,
      field: 'ORDER_COUNT'
    },
    orderPrice: {
      type: "DOUBLE(16,2)",
      allowNull: true,
      field: 'ORDER_PRICE'
    },
    productNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NO'
    },
    day: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'DAY'
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'UPDATETIME'
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATETIME'
    },
    typeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'TYPE_ID'
    }
  }, {
    tableName: 'record_stacking_sale'
  });
};
