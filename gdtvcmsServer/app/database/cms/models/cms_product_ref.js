/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmsProductRef', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TITLE'
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMO'
    },
    imageUrl: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'IMAGE_URL'
    },
    productNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'PRODUCT_NO'
    },
    salePrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'SALE_PRICE'
    },
    marketPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'MARKET_PRICE'
    },
    relationCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'RELATION_CODE'
    },
    sort: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'SORT'
    },
    status: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'STATUS'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'URL'
    },
    relationKind: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'RELATION_KIND'
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
    }
  }, {
    tableName: 'cms_product_ref'
  });
};
