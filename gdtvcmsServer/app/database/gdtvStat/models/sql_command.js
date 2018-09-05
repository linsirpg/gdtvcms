/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sqlCommand', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    sql: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'SQL'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TITLE'
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MEMO'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STATUS'
    },
    head: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'HEAD'
    },
    params: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARAMS'
    }
  }, {
    tableName: 'sql_command'
  });
};
