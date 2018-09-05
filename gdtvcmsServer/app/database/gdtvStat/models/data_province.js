/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dataProvince', {
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
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'NAME'
    },
    status: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'STATUS'
    }
  }, {
    tableName: 'data_province'
  });
};
