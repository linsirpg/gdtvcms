/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('memberTagGroup', {
    groupCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      primaryKey: true,
      field: 'GROUP_CODE'
    },
    groupName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      primaryKey: true,
      field: 'GROUP_NAME'
    }
  }, {
    tableName: 'member_tag_group'
  });
};
