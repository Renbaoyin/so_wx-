//index.js
//获取应用实例
const app = getApp()

Page({
    data:{
        address: "点击选择，要勾选哦~", 
        //inputValue: ''
        flge:false
    },
    info:{
        type:"buy",
        sall:"",
        phone:""
        
    },
    radioChange(e){
        //console.log(e)
        this.info.type = e.detail.value
    },
    handleSall(e){
        this.info.sall = e.detail.value
        // this.setData({
        //     inputValue: e.detail.value
        // })
    },
    handlePhone(e){
        // this.setData({
        //     inputValue: e.detail.value
        // })
        this.info.phone = e.detail.value
    },
    handleMap(){
        const _this = this
        wx.chooseLocation({
            success(data){
               _this.setData({
                   address:data.address
              })
                _this.info.address = data.address;
                _this.info.longitude = data.longitude;
                _this.info.latitude = data.latitude;

            }
        })
    },
    handleClick(){
        var _this = this
        wx.request({
            url:"http://localhost:3000/list",
            data:this.info,
            method:"post",
            success:this.handleSuccess.bind(this)
        })
    },
    handleSuccess(data){
        this.setData({
            flge:true
        })
    },
    handleBack(){
        wx.navigateTo({
            url: '../index/index',
        })
    }

    
})