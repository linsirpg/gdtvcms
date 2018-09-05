/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shopCategory', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    categoryName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'CATEGORY_NAME'
    },
    customField: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'CUSTOM_FIELD'
    },
    parentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'PARENT_ID'
    },
    canAdd: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'CAN_ADD'
    },
    inBar: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IN_BAR'
    },
    inNav: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IN_NAV'
    },
    parentPath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PARENT_PATH'
    },
    depth: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'DEPTH'
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'SORT'
    },
    isDeleted: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IS_DELETED'
    },
    isActive: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IS_ACTIVE'
    },
    isShow: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IS_SHOW'
    },
    isHot: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IS_HOT'
    },
    ownerAccount: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'OWNER_ACCOUNT'
    },
    prefix: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PREFIX'
    },
    kind: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'KIND'
    },
    categoryDesc: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'CATEGORY_DESC'
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'IMG_URL'
    },
    attachmentUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ATTACHMENT_URL'
    },
    dateCommemtTimeout: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'DATE_COMMEMT_TIMEOUT'
    }
  }, {
    tableName: 'shop_category'
  });
};
