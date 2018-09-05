/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('interfaceCommand', {
    keyName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'KEY_NAME'
    },
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATE_TIME'
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'REMARK'
    },
    group: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'GROUP'
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TYPE'
    }
  }, {
    tableName: 'interface_command'
  });
};
