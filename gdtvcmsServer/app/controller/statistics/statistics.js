'use strict';
module.exports = app => {

    const cmsProductInfo = app.database.cms.models["cms_product_info"];
    const GdtvStat = app.database.gdtvStat;
    const statBaiduEventClick = app.database.gdtvStat.models["stat_baidu_event_click"];
    const getStatisticsData = function (timeRange, statTabType) {
        if(statTabType === 'HOME|HOME_BANNER|'){
            if(timeRange){
                return GdtvStat.$sequelize.query(
                    `select STAT_DATE,STAT_TAB_NAME , STAT_SINGLE_NUM as total, right(stat_tab_name,1) as short from stat_baidu_event_click where DATE(STAT_DATE) >= '${timeRange[0]}' and   DATE(STAT_DATE) <= '${timeRange[1]}' and  STAT_TAB_TYPE like '${statTabType}' and STAT_TAB_NAME not in ('汽车养护|0','美妆个护|0','美妆个户|0','母婴用品|0','家用电器|0', '美食|0', '家居家装|0', '文教|0','首页热卖爆款图片|0', '首页新品图片|0','汽车养护','美妆个户','美妆个护','母婴用品','家用电器', '美食', '家居家装', '文教','首页热卖爆款图片', '首页新品图片') order by DATE(stat_date) desc, right(stat_tab_name,1) asc `,
                    {type: GdtvStat.$sequelize.QueryTypes.SELECT }
                )        
            }else{
                return GdtvStat.$sequelize.query(
                    `select STAT_DATE,STAT_TAB_NAME, STAT_SINGLE_NUM as total, right(stat_tab_name,1) as short from stat_baidu_event_click where DATE(STAT_DATE) >= '2018-08-20' and STAT_TAB_TYPE like '${statTabType}' and STAT_TAB_NAME not in ('汽车养护|0','美妆个户|0','美妆个护|0','母婴用品|0','家用电器|0', '美食|0', '家居家装|0', '文教|0','首页热卖爆款图片|0', '首页新品图片|0','美妆个护', '汽车养护','美妆个户','母婴用品','家用电器', '美食', '家居家装', '文教','首页热卖爆款图片', '首页新品图片') order by DATE(stat_date) desc, right(stat_tab_name,1) asc `,
                    {type: GdtvStat.$sequelize.QueryTypes.SELECT }
                ) 
            }     
        }else if (statTabType === 'HOME|%') {
            if(timeRange){
                return GdtvStat.$sequelize.query(
                    `select STAT_DATE, STAT_TAB_OPERA , sum(STAT_SINGLE_NUM) as total from stat_baidu_event_click where DATE(STAT_DATE) >= '${timeRange[0]}' and   DATE(STAT_DATE) <= '${timeRange[1]}' and  STAT_TAB_TYPE like '${statTabType}' and STAT_TAB_OPERA != 'view' GROUP BY STAT_TAB_OPERA,STAT_DATE ORDER BY  DATE(STAT_DATE)  asc`,
                    {type: GdtvStat.$sequelize.QueryTypes.SELECT }
                )        
            }else{
                return GdtvStat.$sequelize.query(
                    `select STAT_DATE, STAT_TAB_OPERA , sum(STAT_SINGLE_NUM) as total from stat_baidu_event_click where DATE(STAT_DATE) >= '2018-04-06' and STAT_TAB_TYPE like '${statTabType}' and  STAT_TAB_OPERA != 'view' GROUP BY STAT_TAB_OPERA,STAT_DATE ORDER BY  DATE(STAT_DATE)  asc`,
                    {type: GdtvStat.$sequelize.QueryTypes.SELECT }
                ) 
            }
        }else if (statTabType === 'HOME|HOTSALE|') {
            if(timeRange){
                return GdtvStat.$sequelize.query(
                    `select STAT_DATE,STAT_TAB_NAME , STAT_SINGLE_NUM as total from stat_baidu_event_click where DATE(STAT_DATE) >= '${timeRange[0]}' and   DATE(STAT_DATE) <= '${timeRange[1]}' and  STAT_TAB_TYPE like '${statTabType}'  order by STAT_DATE desc , LPAD(SUBSTRING(STAT_TAB_NAME,LOCATE("|", STAT_TAB_NAME) + 1),3, '0')  asc`,
                    {type: GdtvStat.$sequelize.QueryTypes.SELECT }
                )        
            }else{
                return GdtvStat.$sequelize.query(
                    `select STAT_DATE,STAT_TAB_NAME , STAT_SINGLE_NUM as total from stat_baidu_event_click where DATE(STAT_DATE) >= '2018-04-06' and STAT_TAB_TYPE like '${statTabType}'  order by STAT_DATE desc , LPAD(SUBSTRING(STAT_TAB_NAME,LOCATE("|", STAT_TAB_NAME) + 1),3, '0')  asc`,
                    {type: GdtvStat.$sequelize.QueryTypes.SELECT }
                ) 
            }
        }
    };    
    
    return class statisticsController extends app.Controller {
        async getStatistics(ctx) {
            var timeRange = null
            if(ctx.request.body.timeRange){
                timeRange = ctx.request.body.timeRange
            }
            var ResultData =  await getStatisticsData(timeRange, ctx.request.body.statTabType)
            var ResultDate = []
            var DetailedDate = []
            var legendData = []
            var seriesArr = []
            var numarr = [];        
            if( ctx.request.body.statTabType === 'HOME|%'){

            ResultData.map(function(res){
                var ObjDate = {
                    date: '',
                    DateArr: [],
                    eventArr: [],
                }
                if(DetailedDate.indexOf(res.STAT_DATE) == '-1'){
                   DetailedDate.push(res.STAT_DATE)
                   ObjDate.date = res.STAT_DATE;
                   ResultDate.push(ObjDate)
                }
                ResultDate[DetailedDate.indexOf(res.STAT_DATE)]
                if(ResultDate[DetailedDate.indexOf(res.STAT_DATE)]){
                    ResultDate[DetailedDate.indexOf(res.STAT_DATE)].DateArr.push(res)
                    ResultDate[DetailedDate.indexOf(res.STAT_DATE)].eventArr.push(res.STAT_TAB_OPERA)
                }
               if(legendData.indexOf(res.STAT_TAB_OPERA) == '-1'){
                   legendData.push(res.STAT_TAB_OPERA)
                   var obj = {
                           name: '',
                           type: ctx.request.body.type,
                           data: [],
                       }
                       obj.name = res.STAT_TAB_OPERA
                   seriesArr.push(obj)
               }                     
            })
           ResultDate.map(function(res){
               if (res.DateArr.length != legendData.length) {

                   legendData.map(function(resData){
                       var SliceObj = {
                           STAT_DATE:'0',
                           STAT_TAB_OPERA:'',
                           total: 0 
                       }                            
                       if(res.eventArr.indexOf(resData) < 0){
                           SliceObj.STAT_DATE = res.DateArr[0].STAT_DATE
                           SliceObj.STAT_TAB_OPERA = resData;
                           SliceObj.total = 0;
                           res.eventArr.push(resData)
                           res.DateArr.push(SliceObj);
                       }
                   })
               }
           })
           ResultDate.map(function(res){
               res.DateArr.map(function(result){
                   seriesArr.map(function(seriesRes) {
                       if(seriesRes.name == result.STAT_TAB_OPERA) {
                           seriesRes.data.push(result.total)
                       }
                   })
               })
           })
           var obj = {
            xAxisData:DetailedDate,
            legendData:legendData,
            seriesData:seriesArr
           }
            return ctx.body = obj;
            }
            if( ctx.request.body.statTabType === 'HOME|HOME_BANNER|' || ctx.request.body.statTabType === 'HOME|HOTSALE|'){
                ResultData.map(function(res){
                    var ObjDate = {
                        date: '',
                        DateArr: [],
                        num: 0,
                    }
                    if(DetailedDate.indexOf(res.STAT_DATE) == '-1'){
                       DetailedDate.push(res.STAT_DATE)
                       ObjDate.date = res.STAT_DATE;
                       ResultDate.push(ObjDate)
                    }
                    ResultDate[DetailedDate.indexOf(res.STAT_DATE)]
                    if(ResultDate[DetailedDate.indexOf(res.STAT_DATE)]){
                        ResultDate[DetailedDate.indexOf(res.STAT_DATE)].DateArr.push(res)
                        ResultDate[DetailedDate.indexOf(res.STAT_DATE)].num ++
                    }
                })
                ResultDate.map(function(res,index1){
                  
                    res.DateArr.map(function(ddata,index){
                        var obj = {
                            name: '',
                            barGap: 0,
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideBottom',
                                    distance: 12,
                                    align: 'left',
                                    verticalAlign: 'middle',
                                    rotate: 90,
                                    // formatter: '{c}  {name|{a}}',
                                    fontSize: 16,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                }
                            },
                            data: [],
                        }                          
                        if(!seriesArr[index]){
                            legendData.push(ddata.STAT_TAB_NAME)
                            obj.name = ddata.STAT_TAB_NAME
                            seriesArr.push(obj)
                        }
                        seriesArr[index].data[index1]=(ddata.total)
                    })
                })
                var obj = {
                    xAxisData:DetailedDate,
                    legendData:legendData,
                    seriesData:seriesArr
                   }                
                return ctx.body = obj
            }
        }
    };
};