/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statUserTagState', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    memberAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMBER_ACCOUNT'
    },
    tagKey: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'TAG_KEY'
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'VALUE'
    },
    dicValue: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'DIC_VALUE'
    },
    treeTarget: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TREE_TARGET'
    },
    treeKeyValue: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TREE_KEY_VALUE'
    },
    recordTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'RECORD_TIME'
    }
  }, {
    tableName: 'stat_user_tag_state'
  });
};
