/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statRank', {
    recid: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true,
      field: 'RECID'
    },
    group: {
      type: DataTypes.STRING(32),
      allowNull: true,
      field: 'GROUP'
    },
    recodeTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'RECODE_TIME'
    },
    counter: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'COUNTER'
    },
    rankGroup: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'RANK_GROUP'
    }
  }, {
    tableName: 'stat_rank'
  });
};
