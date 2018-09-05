/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('marketingSchedule', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TITLE'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'START_DATE'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'END_DATE'
    },
    kind: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'KIND'
    },
    products: {
      type: DataTypes.STRING(1023),
      allowNull: true,
      field: 'PRODUCTS'
    },
    content: {
      type: DataTypes.STRING(1023),
      allowNull: true,
      field: 'CONTENT'
    }
  }, {
    tableName: 'marketing_schedule'
  });
};
