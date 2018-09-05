/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wxInternalInfo', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    targetCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TARGET_CODE'
    },
    memberAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMBER_ACCOUNT'
    },
    zlanOpenId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ZLAN_OPEN_ID'
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'UPDATE_DATE'
    }
  }, {
    tableName: 'wx_internal_info'
  });
};
