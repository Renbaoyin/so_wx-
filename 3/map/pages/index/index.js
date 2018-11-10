//index.js
//获取应用实例
const app = getApp()

Page({
    data:{
        longitude:"",
        latitude:"",
        controls: [
            {
                id: 1,
                iconPath: '../../imgs/pin.png',
                position: {
                    left: (app.globalData.iw - 23)/2,
                    top: (app.globalData.ih - 33)/2-33,
                    width: 22,
                    height: 31
                },
            },
            {
                id: 2,
                iconPath: '../../imgs/center.png',
                position: {
                    left:30,
                    top: (app.globalData.ih - 100),
                    width: 37,
                    height: 37
                },
                clickable: true
            }
        ],
        markers:[
            {

            }
        ]
    },
    
    onShow(){
        wx.getLocation({
            type:"gcj02", 
            success:this.handleSuccess.bind(this)
        });
        this.getMarkers()
    },
    onReady(){
        // 使用 wx.createMapContext 获取 map 上下文
        this.map = wx.createMapContext('map');
        
    },
    handleSuccess(res){
        //console.log(res)
        this.setData({
            longitude: res.longitude,
            latitude: res.latitude
            
        })
    },
    controltap:function(e) {
        console.log(e)
        this.map.moveToLocation()
    },
    //发布
    handlePublich(){
        wx.navigateTo({
            url: '../publich/publich'
        })
    },
    //搜索
    handleSearch(){
        wx.navigateTo({
            url: '../search/search',
        })
    },
    getMarkers(){
        wx.request({
            url: 'http://localhost:3000/list',
            method:"get",
            success: this.handleGetMarkers.bind(this)
        })
    },
    handleGetMarkers(data){
        //自带的
        // this.setData({
        //     markers:[...data.data]
        // })
        //定义自己的图标
        let markers =  data.data.map((item)=>({
            id: item.id,
            iconPath: '../../imgs/'+item.type+'.png',
            longitude: item.longitude,
            latitude: item.latitude,
            width: 37,
            height: 37
        }));
        this.setData({
            markers
        })
    },
    markertap(e){
        // console.log(e.markerId)
        wx.navigateTo({
            url: '../details/details?id='+e.markerId,
        })
    }

    
})
