/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wxConfig', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    serverDomain: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'SERVER_DOMAIN'
    },
    websiteName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'WEBSITE_NAME'
    },
    wxAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'WX_ACCOUNT'
    },
    wxAccountKind: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'WX_ACCOUNT_KIND'
    },
    logoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'LOGO_URL'
    },
    interfaceUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'INTERFACE_URL'
    },
    interfaceToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'INTERFACE_TOKEN'
    },
    appId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'APP_ID'
    },
    appSecret: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'APP_SECRET'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'STATUS'
    },
    oauthEnable: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: '1',
      field: 'OAUTH_ENABLE'
    },
    accessTokenValue: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ACCESS_TOKEN_VALUE'
    },
    accessTokenUpdateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'ACCESS_TOKEN_UPDATE_TIME'
    },
    jsTicketValue: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'JS_TICKET_VALUE'
    },
    jsTicketUpdateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'JS_TICKET_UPDATE_TIME'
    },
    ownerAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'OWNER_ACCOUNT'
    }
  }, {
    tableName: 'wx_config'
  });
};
