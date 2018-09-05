/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statRankAttribute', {
    rankid: {
      type: DataTypes.STRING(32),
      allowNull: true,
      references: {
        model: 'stat_rank',
        key: 'RECID'
      },
      field: 'RANKID'
    },
    attributeName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ATTRIBUTE_NAME'
    },
    attributeValue: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'ATTRIBUTE_VALUE'
    },
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    }
  }, {
    tableName: 'stat_rank_attribute'
  });
};
