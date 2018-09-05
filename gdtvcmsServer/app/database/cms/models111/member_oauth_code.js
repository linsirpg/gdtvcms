/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('memberOauthCode', {
    userCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'USER_CODE'
    },
    memberAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMBER_ACCOUNT'
    },
    oauthCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'OAUTH_CODE'
    },
    recordDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'RECORD_DATE'
    },
    status: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'STATUS'
    }
  }, {
    tableName: 'member_oauth_code'
  });
};
