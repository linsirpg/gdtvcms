/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statLog', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'MSG'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATE_TIME'
    },
    group: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'GROUP'
    }
  }, {
    tableName: 'stat_log'
  });
};
