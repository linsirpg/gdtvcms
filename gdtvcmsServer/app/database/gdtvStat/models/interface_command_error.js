/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('interfaceCommandError', {
    errorCode: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      field: 'ERROR_CODE'
    },
    errorMessage: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ERROR_MESSAGE'
    }
  }, {
    tableName: 'interface_command_error'
  });
};
