/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('baiduSiteList', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    siteId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'SITE_ID'
    },
    domain: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'DOMAIN'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'CREATE_TIME'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1',
      field: 'STATUS'
    }
  }, {
    tableName: 'baidu_site_list'
  });
};
