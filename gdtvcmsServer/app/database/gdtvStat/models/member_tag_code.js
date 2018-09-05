/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('memberTagCode', {
    groupCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      primaryKey: true,
      field: 'GROUP_CODE'
    },
    tagName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      primaryKey: true,
      field: 'TAG_NAME'
    }
  }, {
    tableName: 'member_tag_code'
  });
};
