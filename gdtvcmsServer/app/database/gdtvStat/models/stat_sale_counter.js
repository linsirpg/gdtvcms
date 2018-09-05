/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statSaleCounter', {
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
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TYPE'
    }
  }, {
    tableName: 'stat_sale_counter'
  });
};
