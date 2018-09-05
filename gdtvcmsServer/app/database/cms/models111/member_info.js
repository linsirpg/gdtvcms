/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('memberInfo', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    accountId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      field: 'ACCOUNT_ID'
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PASSWORD'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      field: 'EMAIL'
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      field: 'PHONE'
    },
    sex: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'SEX'
    },
    nickName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'NICK_NAME'
    },
    memberName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'MEMBER_NAME'
    },
    addDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'ADD_DATE'
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'BIRTHDAY'
    },
    status: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'STATUS'
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'REMARKS'
    },
    qq: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'QQ'
    },
    icq: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ICQ'
    },
    msn: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'MSN'
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'QUESTION'
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ANSWER'
    },
    lastLog: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'LAST_LOG'
    },
    logTimes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'LOG_TIMES'
    },
    photoUrl: {
      type: DataTypes.STRING(512),
      allowNull: true,
      field: 'PHOTO_URL'
    },
    introduction: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'INTRODUCTION'
    },
    advancePayment: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'ADVANCE_PAYMENT'
    },
    score: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'SCORE'
    },
    cashbox: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '0',
      field: 'CASHBOX'
    },
    coins: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'COINS'
    },
    level: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      field: 'LEVEL'
    },
    introducer: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'INTRODUCER'
    },
    sellPassword: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'SELL_PASSWORD'
    },
    province: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'PROVINCE'
    },
    city: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'CITY'
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'ADDRESS'
    },
    postalCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'POSTAL_CODE'
    },
    identityType: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'IDENTITY_TYPE'
    },
    identityNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'IDENTITY_NO'
    },
    language: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'LANGUAGE'
    },
    country: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'COUNTRY'
    },
    loginId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      field: 'LOGIN_ID'
    },
    wxOpenId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      field: 'WX_OPEN_ID'
    },
    zlOpenId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'ZL_OPEN_ID'
    },
    qqOpenId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'QQ_OPEN_ID'
    },
    sinaOpenId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'SINA_OPEN_ID'
    },
    ownerAccount: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'OWNER_ACCOUNT'
    },
    deptCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'DEPT_CODE'
    },
    wxUnionId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'WX_UNION_ID'
    }
  }, {
    tableName: 'member_info'
  });
};
