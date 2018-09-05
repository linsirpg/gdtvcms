/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cmsSpecialActivity', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
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
    recommentConfig: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'RECOMMENT_CONFIG'
    },
    advertConfig: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ADVERT_CONFIG'
    },
    pageCss: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'PAGE_CSS'
    },
    navigationConfig: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'NAVIGATION_CONFIG'
    },
    couponId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'COUPON_ID'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'CONTENT'
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
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'START_TIME'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'END_TIME'
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
    },
    limitedConfig: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'LIMITED_CONFIG'
    }
  }, {
    tableName: 'cms_special_activity'
  });
};
