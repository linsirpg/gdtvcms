/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statDataOrder', {
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
    status: {
      type: DataTypes.STRING(11),
      allowNull: true,
      field: 'STATUS'
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'TYPE'
    },
    counter: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'COUNTER'
    }
  }, {
    tableName: 'stat_data_order'
  });
};
