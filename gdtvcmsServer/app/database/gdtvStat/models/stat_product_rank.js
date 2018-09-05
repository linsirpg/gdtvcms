/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statProductRank', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'RECID'
    },
    group: {
      type: DataTypes.STRING(32),
      allowNull: true,
      field: 'GROUP'
    },
    rank: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'RANK'
    },
    recodeTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'RECODE_TIME'
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NAME'
    },
    productNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NO'
    },
    counter: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'COUNTER'
    }
  }, {
    tableName: 'stat_product_rank'
  });
};
