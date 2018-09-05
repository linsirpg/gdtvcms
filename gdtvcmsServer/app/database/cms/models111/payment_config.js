/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paymentConfig', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    paymentName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PAYMENT_NAME'
    },
    interfaceId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'INTERFACE_ID'
    },
    sellerEmail: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'SELLER_EMAIL'
    },
    appId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'APP_ID'
    },
    userId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'USER_ID'
    },
    privateKey: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PRIVATE_KEY'
    },
    supportCoins: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'SUPPORT_COINS'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'DESCRIPTION'
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'SORT'
    },
    status: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'STATUS'
    },
    ownerAccount: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'OWNER_ACCOUNT'
    },
    kind: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'KIND'
    },
    payType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PAY_TYPE'
    },
    payUrl: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'PAY_URL'
    },
    queryOrder: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'QUERY_ORDER'
    },
    createRefund: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CREATE_REFUND'
    },
    queryRefund: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'QUERY_REFUND'
    },
    synchroCommand: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Synchro_Command'
    }
  }, {
    tableName: 'payment_config'
  });
};
