/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userInfo', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    userAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'USER_ACCOUNT'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PASSWORD'
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'USER_NAME'
    },
    deptCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'DEPT_CODE'
    },
    ownerAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'OWNER_ACCOUNT'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STATUS'
    }
  }, {
    tableName: 'user_info'
  });
};
