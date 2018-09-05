/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statMemberTag', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    recordTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'RECORD_TIME'
    },
    counter: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'COUNTER'
    },
    increment: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'INCREMENT'
    },
    groupCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      field: 'GROUP_CODE'
    },
    tagName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      field: 'TAG_NAME'
    }
  }, {
    tableName: 'stat_member_tag'
  });
};
