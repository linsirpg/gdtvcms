/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activityInfo', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'TITLE'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'CONTENT'
    },
    thumbnailUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'THUMBNAIL_URL'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATE_TIME'
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'START_TIME'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'END_TIME'
    },
    joinConfig: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'JOIN_CONFIG'
    },
    prizeConfig: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'PRIZE_CONFIG'
    },
    kind: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'KIND'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STATUS'
    },
    ownerAccount: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'OWNER_ACCOUNT'
    },
    deptCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'DEPT_CODE'
    }
  }, {
    tableName: 'activity_info'
  });
};
