/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appConfig', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'KEY'
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'VALUE'
    },
    group: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'GROUP'
    }
  }, {
    tableName: 'app_config'
  });
};
