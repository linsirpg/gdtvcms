/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('memberPrize', {
    recid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'RECID'
    },
    memberAccount: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'MEMBER_ACCOUNT'
    },
    prizeCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'PRIZE_CODE'
    },
    prizeName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PRIZE_NAME'
    },
    prizeImage: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'PRIZE_IMAGE'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATE_TIME'
    },
    contactPhone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CONTACT_PHONE'
    },
    contactAddress: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      field: 'CONTACT_ADDRESS'
    },
    contactName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'CONTACT_NAME'
    },
    contactMemo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'CONTACT_MEMO'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'STATUS'
    },
    totalFee: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'TOTAL_FEE'
    }
  }, {
    tableName: 'member_prize'
  });
};
