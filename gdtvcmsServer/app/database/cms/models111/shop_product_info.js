/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shopProductInfo', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NAME'
    },
    productNameTag: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRODUCT_NAME_TAG'
    },
    productNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      field: 'PRODUCT_NO'
    },
    interiorCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'INTERIOR_CODE'
    },
    typeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'TYPE_ID'
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'BRAND'
    },
    shortDesc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'SHORT_DESC'
    },
    shortDescTag: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'SHORT_DESC_TAG'
    },
    unit: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'UNIT'
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'WEIGHT'
    },
    marketPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'MARKET_PRICE'
    },
    salePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'SALE_PRICE'
    },
    score: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'SCORE'
    },
    coins: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'COINS'
    },
    thumbnailImg: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'THUMBNAIL_IMG'
    },
    productImg: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'PRODUCT_IMG'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'DESCRIPTION'
    },
    storage: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'STORAGE'
    },
    customField: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'CUSTOM_FIELD'
    },
    kind: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'NULL',
      field: 'KIND'
    },
    miniNum: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'MINI_NUM'
    },
    isForSale: {
      type: DataTypes.STRING(1023),
      allowNull: true,
      field: 'IS_FOR_SALE'
    },
    isCommend: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IS_COMMEND'
    },
    isHot: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IS_HOT'
    },
    isSpecialOffer: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'IS_SPECIAL_OFFER'
    },
    isVirtual: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IS_VIRTUAL'
    },
    addTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'ADD_TIME'
    },
    isDel: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: '0',
      field: 'IS_DEL'
    },
    status: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'STATUS'
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'SORT'
    },
    hits: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'HITS'
    },
    giftContent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'GIFT_CONTENT'
    },
    paramContent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'PARAM_CONTENT'
    },
    packContent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'PACK_CONTENT'
    },
    ownerAccount: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'OWNER_ACCOUNT'
    },
    sellCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'SELL_COUNT'
    },
    groundingTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'GROUNDING_TIME'
    },
    level: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: '1',
      field: 'LEVEL'
    },
    exchangeTimes: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '5',
      field: 'EXCHANGE_TIMES'
    },
    kindRuleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'KIND_RULE_ID'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'END_TIME'
    },
    isLimitTime: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IS_LIMIT_TIME'
    },
    packageProducts: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'PACKAGE_PRODUCTS'
    },
    availableCoupon: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'AVAILABLE_COUPON'
    },
    qrcodeUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'QRCODE_URL'
    },
    tagIds: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      field: 'TAG_IDS'
    },
    typePrefix: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TYPE_PREFIX'
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'START_TIME'
    },
    deptCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'DEPT_CODE'
    },
    remarkConfig: {
      type: DataTypes.STRING(2047),
      allowNull: true,
      field: 'REMARK_CONFIG'
    },
    storeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'STORE_ID'
    },
    supportNopay: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'SUPPORT_NOPAY'
    },
    chatRoomLink: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'CHAT_ROOM_LINK'
    },
    shippingTemplate: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1',
      field: 'SHIPPING_TEMPLATE'
    },
    keyword: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'KEYWORD'
    }
  }, {
    tableName: 'shop_product_info'
  });
};
