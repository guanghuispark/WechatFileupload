# WechatFileupload
微信小程序实现文件上传

实习问卷搜集的微信小程序

项目需求分析
​	项目要求能够绑定微信登录，完成实习信息的收集，并且能够保存所填写的信息。退出程序再次登录后能对上次填写的信息进行修改。并且能够上传图片文件。
​	核心用例包括：
​		微信登录，问卷信息填写，获取之前填写的信息，上传文件。
项目开发技术
​	项目前端是基于微信小程序平台开发，主要使用了JavaScript语言，以及类型html的wxml。
​	项目后端使用了eclipse IDE, 基于java语言开发 ，使用tomcat与 springboot搭建服务提供后端API
API接口设计
文件上传接口：
Url: http://111.229.127.17:8080/upload/fileUpload?id=”{主码}”&filename=”{文件名称（带后缀）}”
Id: 主码，比如说：微信号
Filename:文件名称

问卷信息上传接口
Url:http://111.229.127.17:8080/upload/infoUpload
body数据：{"id":"124","number":"1652777","name":"陈晓其","phoneNumber":"123456789465","sitution":"We did well","companyname":"同济大学","agreement":"NO","plandate":"2019.7-2019.12","realdate":"2019.7-2019.11","sumdate":"20","describe":"nothing to show", "filePath":"","remakes":"nothing" }
id:主码
Number:学号
Name:姓名
Phone:手机号
Sitution:整体实习情况
Company:实习公司
Agreement:是否签订实习基地协议
Plandate：计划实习起止日期
Realdate:实际实习起止日期
Sumdate:总实习周数
Description:实习总结
filePath:上传文件在服务器中的储存路径
Remakes:备注（其他的实习之类的，这里只记录最重要的一次实习）

问卷信息查询接口
查询信息
Url: http://111.229.127.17:8080/upload/infoCheck?id=12356

Id:主码

小程序页面实现

![1594126293566](C:\Users\worlf\AppData\Roaming\Typora\typora-user-images\1594126293566.png)



![1594126312335](C:\Users\worlf\AppData\Roaming\Typora\typora-user-images\1594126312335.png)



![1594126342423](C:\Users\worlf\AppData\Roaming\Typora\typora-user-images\1594126342423.png)



![1594126364800](C:\Users\worlf\AppData\Roaming\Typora\typora-user-images\1594126364800.png)

