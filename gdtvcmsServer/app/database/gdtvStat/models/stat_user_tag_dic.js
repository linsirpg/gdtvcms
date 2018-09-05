/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statUserTagDic', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    key: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'KEY'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'NAME'
    }
  }, {
    tableName: 'stat_user_tag_dic'
  });
};
