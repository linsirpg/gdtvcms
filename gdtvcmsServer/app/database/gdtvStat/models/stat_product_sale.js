/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statProductSale', {
    statDate: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'STAT_DATE'
    },
    productNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PRODUCT_NO'
    },
    productSkuNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_SKU_NO'
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NAME'
    },
    productFee: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'PRODUCT_FEE'
    },
    addCartCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'ADD_CART_COUNT'
    },
    addCartMember: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'ADD_CART_MEMBER'
    },
    saleCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'SALE_COUNT'
    },
    saleMember: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'SALE_MEMBER'
    },
    cancelCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'CANCEL_COUNT'
    },
    cancelMember: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'CANCEL_MEMBER'
    },
    nopayCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'NOPAY_COUNT'
    },
    nopayMember: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'NOPAY_MEMBER'
    }
  }, {
    tableName: 'stat_product_sale'
  });
};
