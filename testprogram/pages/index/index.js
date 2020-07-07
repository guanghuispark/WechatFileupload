//index.js
//获取应用实例
const app = getApp()
 
Page({
  data: {
    userInfo: {},
    isHide: false,
    motto: '请先登录.',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userData:{},
    form:{
    }, 
    statuses: [{
        name: '没有进行实习（0周）',
        value: '没有进行实习（0周）'
      },
      {
        name: '进行了实习，但是不满7个月（30周）',
        value: '进行了实习，但是不满7个月（30周）'
      },
      {
        name: '已完成7个月实习（30周）',
        value: '已完成7个月实习（30周）'
      },
    ],
    isSigned: [{
      name: '已经签订（完成或者正在学校盖章中）',
      value: '已经签订（完成或者正在学校盖章中）'
    }, ],
    inputValue: ''
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  checkSigned: function (e) {
    var that = this;
    var isSigned = that.data.isSigned;
    for (let index = 0; index < isSigned.length; index++) {
      const element = isSigned[index];
      element.checked = false;
    }
    that.setData({
      "isSigned": isSigned
    })
    console.log(isSigned);
    console.log(that.data.isSigned);
    console.log('input发生focus事件，携带value值为：', e.detail.value)
  },
  startInput: function (e) {
    var that = this;
    var statuses = that.data.statuses;
    for (let index = 0; index < statuses.length; index++) {
      const element = statuses[index];
      element.checked = false;
    }
    that.setData({
      "statuses": statuses
    })
    console.log(statuses);
    console.log(that.data.statuses);
    console.log('input发生focus事件，携带value值为：', e.detail.value)
  },
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formData = e.detail.value;
    var result={};
    result.id = that.data.userData.openid;
    if (formData.studentid=="") {
      wx.showToast({
        title: '请填写学号',
        image: '/image/x.png'
      })
      return
    }else{
      result.number = formData.studentid;
    }
    if (formData.studentname=="") {
      wx.showToast({
        title: '请填写姓名',
        image: '/image/x.png'
      })
      return
    }else{
      result.name = formData.studentname;
    }
    if (formData.phonenumber=="") {
      wx.showToast({
        title: '请填写手机',
        image: '/image/x.png'
      })
      return
    }else{
      result.phoneNumber = formData.phonenumber;
    }
    if (formData.totalstatusselect==""&&formData.totalstatus=="") {
      wx.showToast({
        title: '请填写实习总体情况',
        image: '/image/x.png'
      })
      return
    }else{
      if (formData.totalstatusselect=="") {
        result.sitution = formData.totalstatus;
      }else{
        result.sitution = formData.totalstatusselect;
      }
    }
    // var internship = {}
    result.companyname = formData.company;
    if (formData.issignedselect=="") {
      result.agreement = formData.issigned;
    }else{
      result.agreement = formData.issignedselect;
    }
    result.plandate = formData.time;
    result.realdate = formData.realtime;
    result.sumdate = formData.weeknumber;
    result.describe = formData.description;
    result.remakes = formData.remakes;
    // result.internships = [];
    // result.internship.push(internship);
    // if (formData.company=="") {
      
    // }
    // if (formData.issigned==""&&formData.issignedselect=="") {
      
    // }else{

    // }
    // if (formData.time=="") {
      
    // } 
    // if (formData.realtime=="") {
      
    // }
    // if (formData.weeknumber=="") {
      
    // }
    // if (formData.description="") {
      
    // }
    console.log(result)
    wx.request({
      url: 'http://111.229.127.17:8080/upload/infoUpload',     
      data: result,
      method:"POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '提交成功'
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  startUpload: function () {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: "all",
      success: function (res) {
        var  path = "http://lo111.229.127.17calhost:8080/upload/fileUpload?id="+that.data.userData.openid+"&filename="+res.tempFiles[0].name;
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        wx.uploadFile({
          url: path, 
          filePath: res.tempFiles[0].path,
          name: "file",
          header: {
          "Content-Type": "multipart/form-data"
          },
          formData: {
            "user": "test",
          },
          success: function (res) {
            var data = res.data
            console.log(data)
            //do something
          }
        })
      }
    })
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              console.log(res)
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              wx.login({
                success: res => {
                  wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx962c86205676d009&secret=377a6706f9ddeceeb99d7de8c9e07117&js_code=' + res.code + '&grant_type=authorization_code',
                    success: res => {
                      // 获取到用户的 openid
                      console.log("openid 2:"+res.data.openid);
                      that.setData({
                        userData: res.data
                      });
                      console.log(that.data)
                      wx.request({
                        url: 'http://111.229.127.17:8080/upload/infoCheck?id='+that.data.userData.openid,
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        success: function (res) {
                          console.log(res)
                          // res.number ="test";
                          // res.name ="test";
                          // res.phoneNumber ="test";
                          // res.sitution="没有进行实习（0周）";
                          // res.sitution="test";
                          // res.companyname="test";
                          // res.agreement="已经签订（完成或者正在学校盖章中）";
                          // // res.agreement="test";
                          // res.plandate="test";
                          // res.realdate="test";
                          // res.sumdate="test";
                          // res.describe="test";
                          // res.remakes="test";
                          var statuses = that.data.statuses;
                          var flag = false;
                          for (let index = 0; index < statuses.length; index++) {
                            const element = statuses[index];
                            if (element.value==res.data.sitution) {
                              statuses[index].checked = true;
                              flag = true;
                            }
                          }
                          if (flag) {
                            res.data.sitution="";
                          }
                          var isSigned = that.data.isSigned;
                          if (res.data.agreement=='已经签订（完成或者正在学校盖章中）') {
                            isSigned[0].checked=true;
                            res.data.agreement="";
                          }
                          that.setData({
                            isSigned:isSigned,
                            statuses:statuses,
                            form: {
                              number:res.data.number,
                              name:res.data.name,
                              agreement:res.data.agreement,
                              sitution:res.data.sitution,
                              phoneNumber:res.data.phoneNumber,
                              companyname:res.data.companyname,
                              plandate:res.data.plandate,
                              realdate:res.data.realdate,
                              sumdate:res.data.sumdate,
                              describe:res.data.describe,
                              remakes:res.data.remakes,
                            }
                          });

                          console.log(that.data)
                        },
                      })                      
                      // wx.request({
                      //   url: 'http://luojihao.top:8080/AddUser',
                      //   data: {
                      //     username: res.data.openid
                      //   },
                      //   method: 'POST',
                      //   header: {
                      //     'content-type': 'application/x-www-form-urlencoded' // 默认值
                      //   },
                      //   success: function (res) {
                      //     console.log(res)

                      //   },
                      // })
                    }
                  })
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });


  },
  // loadUserInfo:function(e){
  // if (app.globalData.userInfo) {
  //       this.setData({
  //         userInfo: app.globalData.userInfo,
  //         hasUserInfo: true
  //       })
  //     } else if (this.data.canIUse){
  //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //       // 所以此处加入 callback 以防止这种情况
  //       app.userInfoReadyCallback = res => {
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     } else {
  //       // 在没有 open-type=getUserInfo 版本的兼容处理
  //       wx.getUserInfo({
  //         success: res => {
  //           app.globalData.userInfo = res.userInfo
  //           this.setData({
  //             userInfo: res.userInfo,
  //             hasUserInfo: true
  //           })
  //         }
  //       })
  //     }
  // },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.getSetting({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx962c86205676d009&secret=377a6706f9ddeceeb99d7de8c9e07117&js_code=' + res.code + '&grant_type=authorization_code',
                    method:"GET",
                    success: res => {
                      // 获取到用户的 openid
                      console.log("openid 1:"+res.data.openid);
                      that.setData({
                        userData: res.data
                      });
                      wx.request({
                        url: 'http://111.229.127.17:8080/upload/infoCheck?id='+that.data.userData.openid,
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        success: function (res) {
                          console.log(res)
                          // res.number ="test";
                          // res.name ="test";
                          // res.phoneNumber ="test";
                          // res.sitution="没有进行实习（0周）";
                          // res.sitution="test";
                          // res.companyname="test";
                          // res.agreement="已经签订（完成或者正在学校盖章中）";
                          // // res.agreement="test";
                          // res.plandate="test";
                          // res.realdate="test";
                          // res.sumdate="test";
                          // res.describe="test";
                          // res.remakes="test";
                          var statuses = that.data.statuses;
                          var flag = false;
                          for (let index = 0; index < statuses.length; index++) {
                            const element = statuses[index];
                            if (element.value==res.data.sitution) {
                              statuses[index].checked = true;
                              flag = true;
                            }
                          }
                          if (flag) {
                            res.data.sitution="";
                          }
                          var isSigned = that.data.isSigned;
                          if (res.data.agreement=='已经签订（完成或者正在学校盖章中）') {
                            isSigned[0].checked=true;
                            res.data.agreement="";
                          }
                          that.setData({
                            isSigned:isSigned,
                            statuses:statuses,
                            form: {
                              number:res.data.number,
                              name:res.data.name,
                              agreement:res.data.agreement,
                              sitution:res.data.sitution,
                              phoneNumber:res.data.phoneNumber,
                              companyname:res.data.companyname,
                              plandate:res.data.plandate,
                              realdate:res.data.realdate,
                              sumdate:res.data.sumdate,
                              describe:res.data.describe,
                              remakes:res.data.remakes,
                            }
                          });

                          console.log(that.data)
                        },
                      })
                      // wx.request({
                      //   url: 'http://luojihao.top:8080/AddUser',
                      //   data: {
                      //     username: res.data.openid
                      //   },
                      //   method: 'POST',
                      //   header: {
                      //     'content-type': 'application/x-www-form-urlencoded' // 默认值
                      //   },
                      //   success: function (res) {
                      //     console.log(res)
                      //   },
                      // })
                    }
                  });
                  // wx.navigateTo({
                  //   url: 'pages/home/home',
                  // })
                }
              });
            }
          });
        }
      });
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
  // ,
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }


})