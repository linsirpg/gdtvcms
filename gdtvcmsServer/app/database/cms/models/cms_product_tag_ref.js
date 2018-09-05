/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cms_product_tag_ref', {
    RECID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PRODUCT_NO: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    RELATION_CODE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    KIND: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SORT: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    STATUS: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'cms_product_tag_ref'
  });
};
