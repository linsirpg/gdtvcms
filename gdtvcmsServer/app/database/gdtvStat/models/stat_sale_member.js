/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('statSaleMember', {
    id: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID'
    },
    orderMemberCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      field: 'ORDER_MEMBER_COUNT'
    },
    payMemberCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      field: 'PAY_MEMBER_COUNT'
    },
    payOrder: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      field: 'PAY_ORDER'
    },
    avageMemberOrder: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      field: 'AVAGE_MEMBER_ORDER'
    },
    avageMemberPay: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      field: 'AVAGE_MEMBER_PAY'
    },
    orderProductCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      field: 'ORDER_PRODUCT_COUNT'
    },
    payProductCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      field: 'PAY_PRODUCT_COUNT'
    },
    avageOrderProMe: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      field: 'AVAGE_ORDER_PRO_ME'
    },
    avagePayProMe: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      field: 'AVAGE_PAY_PRO_ME'
    },
    percent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      field: 'PERCENT'
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'CREATETIME'
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'UPDATETIME'
    },
    unitpriceoM: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'UNITPRICEO_M'
    },
    unitpricepM: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'UNITPRICEP_M'
    },
    orderCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'ORDER_COUNT'
    },
    orderSum: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'ORDER_SUM'
    },
    payCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'PAY_COUNT'
    },
    paySum: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'PAY_SUM'
    },
    newMemberOrderCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'NEW_MEMBER_ORDER_COUNT'
    },
    newMemberPayCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'NEW_MEMBER_PAY_COUNT'
    },
    newMemberOrderPercent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'NEW_MEMBER_ORDER_PERCENT'
    },
    newMemberPayPercent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'NEW_MEMBER_PAY_PERCENT'
    },
    orderNewMemberCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      field: 'ORDER_NEW_MEMBER_COUNT'
    },
    payNewMemberCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'PAY_NEW_MEMBER_COUNT'
    },
    orderNewMemberPercent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'ORDER_NEW_MEMBER_PERCENT'
    },
    payNewMemberPercent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'PAY_NEW_MEMBER_PERCENT'
    },
    backMemberOrderCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'BACK_MEMBER_ORDER_COUNT'
    },
    backMemberPayCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'BACK_MEMBER_PAY_COUNT'
    },
    backMemberOrderPercent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'BACK_MEMBER_ORDER_PERCENT'
    },
    backMemberPayPercent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'BACK_MEMBER_PAY_PERCENT'
    },
    orderBackMemberCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'ORDER_BACK_MEMBER_COUNT'
    },
    payBackMemberCount: {
      type: "DOUBLE(16,0)",
      allowNull: false,
      defaultValue: '0',
      field: 'PAY_BACK_MEMBER_COUNT'
    },
    orderBackMemberPercent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'ORDER_BACK_MEMBER_PERCENT'
    },
    payBackMemberPercent: {
      type: "DOUBLE(16,2)",
      allowNull: false,
      defaultValue: '0.00',
      field: 'PAY_BACK_MEMBER_PERCENT'
    },
    recordTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'RECORD_TIME'
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'TYPE'
    }
  }, {
    tableName: 'stat_sale_member'
  });
};
