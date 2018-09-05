/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dataCity', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    code: {
      type: DataTypes.STRING(6),
      allowNull: true,
      field: 'CODE'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'NAME'
    },
    provinceCode: {
      type: DataTypes.STRING(6),
      allowNull: true,
      field: 'PROVINCE_CODE'
    }
  }, {
    tableName: 'data_city'
  });
};
