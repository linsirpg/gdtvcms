"use strict";
module.exports = app => {
  var moment = require('moment')
  const cmsTagInfo = app.database.cms.models["cms_tag_info"];
  const cmsProductTagRef = app.database.cms.models["cms_product_tag_ref"];
  const cmsTagPosition = app.database.cms.models["cms_tag_position"];

  // (async function () {

  //   const params = [
  //     'PRODUCT_DESC_AFTER',
  //     'PRODUCT_IMAGE_TOP',
  //     'RODUCT_NAME_BEFORE',
  //     'PRODUCT_IMAGE_BOTTOM',
  //     'PRODUCT_IMAGE_BOTTOM',
  //     'PRODUCT_DESC_AFTER'
  //   ];

  //   var arr = [];

  // })();

  return class DescribeController extends app.Controller {
    async ProDec(ctx) {
      var Tit = "%" + ctx.query.title + "%";
      if (ctx.query.status == 2) {
        var param = {
          where: { TITLE: { $like: Tit } },
          order: [["START_TIME", "DESC"]],
          limit: Number(ctx.query.limit),
          offset: Number(ctx.query.offset)
        };
      } else {
        var param = {
          where: { TITLE: { $like: Tit }, STATUS: ctx.query.status },
          order: [["START_TIME", "DESC"]],
          limit: Number(ctx.query.limit),
          offset: Number(ctx.query.offset)
        };
      }

      return cmsTagInfo.findAndCountAll(param).then(function(result) {
        var obj = {
          count:'',
          rows:[],
      }
      obj.count = result.count
      result.rows.map(function(res,index){
          obj.rows.push(res.dataValues)
          obj.rows[index].timeRange = [moment(obj.rows[index].START_TIME).utc().format("YYYY-MM-DD HH:mm:ss"), moment(obj.rows[index].END_TIME).utc().format("YYYY-MM-DD HH:mm:ss")]
          obj.rows[index].START_TIME = moment(res.dataValues.START_TIME).utc().format("YYYY-MM-DD HH:mm:ss")
          obj.rows[index].END_TIME = moment(res.dataValues.END_TIME).utc().format("YYYY-MM-DD HH:mm:ss")

      })
      ctx.body = obj
      });
    }

    async GetProDec(ctx) {
      return cmsTagInfo.findById(ctx.query.RECID).then(function(res) {
        return (ctx.body = res);
      });
    }

    async GetCmsProductTagRef(ctx) {
      // limit: ctx.query.limit,
      // offset: ctx.query.offset,
      console.log(ctx.query.limit,ctx.query.offset)
      return cmsProductTagRef
        .findAndCountAll({
          limit: Number(ctx.query.limit),
          offset:Number( ctx.query.offset),
          where: [{ RELATION_CODE: ctx.query.Code }]
        })
        .then(function(result) {
          ctx.body = result;
        });
    }

    async DeleteProDec(ctx) {
      return cmsTagInfo
        .destroy({ where: { RECID: ctx.query.RECID } })
        .then(function(res) {
          return (ctx.body = res);
        });
    }

    async DeleteCmsProductTagRef(ctx) {
      return cmsProductTagRef
        .destroy({ where: { RELATION_CODE: ctx.query.CODE } })
        .then(function(res) {
          return (ctx.body = res);
        });
    }
    async status(ctx) {
      var SORT = ctx.request.body.SORT;
      var Id = ctx.request.body.RECID;
      var param = {
        SORT: SORT
      };
      return cmsTagInfo
        .update(param, { where: { RECID: Id } })
        .then(function(res) {
          return (ctx.body = res);
        });
    }
    async Tagstatus(ctx) {
      var status = ctx.request.body.status;
      var Id = ctx.request.body.Id;
      var param = {
        STATUS: status
      };
      return cmsProductTagRef
        .update(param, { where: { RECID: Id } })
        .then(function(res) {
          return (ctx.body = res);
        });
    }


    async UpdateCMSTAG(ctx) {
      var Id = ctx.request.body.RECID;
      var param = ctx.request.body.params;
      if(param.START_TIME){
        param.START_TIME =  moment(param.START_TIME).add(8, "hours").format()
      }

      if(param.END_TIME){
        param.END_TIME =  moment(param.END_TIME).add(8, "hours").format()
      }
      return cmsTagInfo
        .update(param, { where: { RECID: Id } })
        .then(function(res) {
          return (ctx.body = res);
        });
    }

    async addOne(ctx) {
      var param = ctx.request.body.param;
      return cmsProductTagRef.create(param).then(function(res) {
        return (ctx.body = res);
      });
    }

    async EditGood(ctx) {
      var Id = ctx.request.body.RECID;
      var param = ctx.request.body.params;
      return cmsProductTagRef
        .update(param, { where: { RECID: Id } })
        .then(function(res) {
          return (ctx.body = res);
        });
    }

    async deleteOne(ctx) {
      var Id = ctx.query.RECID;
      return cmsProductTagRef
        .destroy({ where: { RECID: Id } })
        .then(function(res) {
          return (ctx.body = "删除成功");
        });
    }

    async creat(ctx) {
      var param = ctx.request.body.param;
      return cmsTagInfo.create(param).then(function(res) {
        return (ctx.body = res);
      });
    }
    async getPosition(ctx) {
      var params = ctx.request.body.position;

      const result = await cmsTagPosition.findAll({
        raw: true,
        where: {
          positionCode: params
        }
      });

      const res = params.map(item => {
        return result.find(_item => {
          return _item.positionCode === item;
        });
      });
      return (ctx.body = res);
    }

    async getPositionList(ctx) {
      return cmsTagPosition.findAll().then(function(res) {
        return (ctx.body = res);
      });
    }
  };
};
