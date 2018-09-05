/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statMenu', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    menuTitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MENU_TITLE'
    },
    menuUrl: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'MENU_URL'
    },
    class: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'CLASS'
    },
    parent: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'PARENT'
    },
    menuOrder: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'MENU_ORDER'
    }
  }, {
    tableName: 'stat_menu'
  });
};
