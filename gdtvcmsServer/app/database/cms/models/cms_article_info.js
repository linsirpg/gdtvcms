/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmsArticleInfo', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'AUTHOR'
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'TITLE'
    },
    shortDesc: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'SHORT_DESC'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'NAME'
    },
    url: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'URL'
    },
    typeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'TYPE_ID'
    },
    showOrder: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'SHOW_ORDER'
    },
    thumbnailUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'THUMBNAIL_URL'
    },
    attachmentUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ATTACHMENT_URL'
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'SUMMARY'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'CONTENT'
    },
    metaData: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'META_DATA'
    },
    createBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CREATE_BY'
    },
    updateBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'UPDATE_BY'
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'CREATE_DATE'
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'UPDATE_DATE'
    },
    webTitle: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'WEB_TITLE'
    },
    webKeyword: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'WEB_KEYWORD'
    },
    webDesc: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'WEB_DESC'
    },
    kind: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'KIND'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STATUS'
    }
  }, {
    tableName: 'cms_article_info'
  });
};
