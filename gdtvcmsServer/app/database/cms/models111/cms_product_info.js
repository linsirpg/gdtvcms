/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmsProductInfo', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    productNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'PRODUCT_NO'
    },
    productName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PRODUCT_NAME'
    },
    saleCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'SALE_COUNT'
    },
    salePrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'SALE_PRICE'
    },
    marketPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'MARKET_PRICE'
    },
    productImage: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'PRODUCT_IMAGE'
    },
    shortDesc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'SHORT_DESC'
    },
    param1: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM1'
    },
    param2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM2'
    },
    param3: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM3'
    },
    param4: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM4'
    },
    param5: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAM5'
    },
    status: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'STATUS'
    }
  }, {
    tableName: 'cms_product_info'
  });
};
