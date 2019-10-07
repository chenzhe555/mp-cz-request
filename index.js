'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpRequest = function () {
    function HttpRequest() {
        _classCallCheck(this, HttpRequest);

        // 请求唯一id
        this.rID = 0;
        // url地址异常返回的错误数据结构
        this.urlEmptyError = {
            'ret': 0,
            'error': {
                'code': 0,
                'msg': 'url为空'
            }
        };
    }

    /**
     * 请求单例
     */


    _createClass(HttpRequest, [{
        key: 'post',


        /**
         * POST请求
         * @param {string} url 请求地址
         * @param {object} data 请求数据
         * @param {object} header 请求头
         * @param {object} extra 额外信息: dataType, responseType
         */
        value: function post() {
            var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _this = this;

            var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            // 判断请求接口是否存在
            if (url.length > 0) {
                return new Promise(function (resolve, reject) {
                    var params = {
                        'method': 'POST',
                        url: url,
                        data: data,
                        header: header,
                        'dataType': extra['dataType'] || 'json',
                        'responseType': extra['responseType'] || 'text',
                        'success': resolve,
                        'fail': reject
                    };
                    wx.request(params);
                });
            }
            return new Promise(function (resolve, reject) {
                reject(_this.urlEmptyError);
            });
        }

        /**
         * 获取statusCode对应的文本信息
         * @param {object} data 返回非200的状态文本信息
         */

    }, {
        key: 'getHttpStatusCodeMsg',
        value: function getHttpStatusCodeMsg() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var code = intval(data['statusCode'] || 0);
            var percentile = code / 100;
            var decimals = code % 100;
            var codeStr = '';
            switch (percentile) {
                case 1:
                    {
                        codeStr = '请求方式待优化';
                    }
                    break;
                case 2:
                    {
                        switch (decimals) {
                            case 0:
                                {
                                    codeStr = '请求成功';
                                }
                                break;
                            default:
                                {
                                    codeStr = '请求成功，有额外信息返回';
                                }
                                break;
                        }
                    }
                    break;
                case 3:
                    {
                        codeStr = '当前请求重定向等等...';
                    }
                    break;
                case 4:
                    {
                        switch (decimals) {
                            case 0:
                                {
                                    codeStr = '请求无法解析，请检查后重试';
                                }
                                break;
                            case 3:
                                {
                                    codeStr = '请求拒绝执行';
                                }
                                break;
                            case 4:
                                {
                                    codeStr = '当前请求接口不存在';
                                }
                                break;
                            default:
                                {
                                    codeStr = '拒绝请求';
                                }
                                break;
                        }
                    }
                    break;
                case 5:
                    {
                        switch (decimals) {
                            case 0:
                                {
                                    codeStr = '服务器异常，请稍候重试';
                                }
                                break;
                            default:
                                {
                                    codeStr = '服务器异常无法响应请求，请检查后重试';
                                }
                                break;
                        }
                    }
                    break;
                default:
                    {
                        codeStr = '服务器异常，请稍后重试';
                    }
                    break;
            }
            return codeStr;
        }
    }], [{
        key: 'getInstance',
        value: function getInstance() {
            if (!this.instance) {
                this.instance = new this();
            }
            return this.instance;
        }
    }]);

    return HttpRequest;
}();

exports.default = HttpRequest;