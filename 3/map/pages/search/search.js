//logs.js
const util = require('../../utils/util.js')

Page({
    data:{
        infoVal:"",
        listInfo:[]
    },
    handleInput(e){
        //console.log(e)
        this.setData({
            infoVal: e.detail.value
        })
    },
    handleSearch(){
        const _this = this
        wx.request({
            url: 'http://localhost:3000/list?q='+ _this.data.infoVal,
            method:"get",
            success: this.handleInfo.bind(this)
        })
    },
    handleInfo(data){
       this.setData({
           listInfo:data.data
       })
    }
})
