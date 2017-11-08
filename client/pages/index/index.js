//index.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        // 身份证识别
        imgUrl: '',
        idCardInfo: {},
        showResult: false,

        // 印刷体识别
        ocrImgUrl: '',
        ocrResult: [],
        showOcrResult: false
    },

    doWordIndentify: function () {
        var that = this

        that.setData({
            showOcrResult: false
        })
    
        // 选择图片和上传图片
        this._chooseImgAndUpload(
            config.service.ciUrl + '?action=general',
            // 上传图片之前
            function (filePath) {
                that.setData({
                    ocrImgUrl: filePath
                })
            },
            // 调用成功
            function (res) {
                console.log(res)
                util.showSuccess('识别成功')
                var data = JSON.parse(res.data)
                
                if (data.code !== 0) {
                    util.showModel('识别失败')
                    return
                }

                var info = data.data

                if (info.code !== 0) {
                    util.showModel('识别失败' + info.message)
                    return
                }

                that.setData({
                    showOcrResult: true,
                    ocrResult: info.data.items
                })
            },
            // 调用失败
            function (e) {
                console.log(e)
                util.showModel('识别失败' + e.message)
            }
        )
    },

    doIdCardIdentify: function () {
        var that = this

        that.setData({
            showResult: false
        })
    
        // 选择图片和上传图片
        this._chooseImgAndUpload(
            config.service.ciUrl + '?action=idcard',
            // 上传图片之前
            function (filePath) {
                that.setData({
                    imgUrl: filePath
                })
            },
            // 调用成功
            function (res) {
                util.showSuccess('识别成功')
                var data = JSON.parse(res.data)
                
                if (data.code !== 0) {
                    util.showModel('识别失败')
                    return
                }

                var info = data.data[0]

                if (info.code !== 0) {
                    util.showModel('识别失败' + info.message)
                    return
                }

                that.setData({
                    showResult: true,
                    idCardInfo: info.data
                })
            },
            // 调用失败
            function (e) {
                util.showModel('识别失败' + e.message)
            }
        )
    },

    /**
     * 统一封装选择图片和上传图片的 API
     * @param {Function} beforUpload 开始上传图片之前执行的函数
     * @param {Function} success     调用成功时执行的函数
     * @param {Function} fail        调用失败时执行的函数
     */
    _chooseImgAndUpload (url, beforUpload, success, fail) {
        var that = this
        
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                util.showBusy('正在识别')
                var filePath = res.tempFilePaths[0]

                beforUpload(filePath)

                // 上传图片
                wx.uploadFile({
                    url,
                    filePath: filePath,
                    name: 'file',
                    success: success,
                    fail: fail
                })
            },
            fail: fail
        })
    }

})
