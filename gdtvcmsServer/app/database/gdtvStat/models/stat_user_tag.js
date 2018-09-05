/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statUserTag', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'NAME'
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'KEY'
    },
    showOrder: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'SHOW_ORDER'
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'DESC'
    },
    showStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'SHOW_STATUS'
    },
    showType: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'SHOW_TYPE'
    },
    updateType: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'UPDATE_TYPE'
    },
    updateMethod: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'UPDATE_METHOD'
    }
  }, {
    tableName: 'stat_user_tag'
  });
};
