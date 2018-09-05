/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statUserOnline', {
    accountId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      field: 'ACCOUNT_ID'
    },
    guid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'GUID'
    }
  }, {
    tableName: 'stat_user_online'
  });
};
