/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activityLog', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    activityId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'ACTIVITY_ID'
    },
    memberAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMBER_ACCOUNT'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATE_TIME'
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMO'
    },
    ownerAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'OWNER_ACCOUNT'
    }
  }, {
    tableName: 'activity_log'
  });
};
