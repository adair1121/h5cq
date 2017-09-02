/**
 * 网络公共类
 * by dily
 * (c) copyright 2014 - 2035
 * All Rights Reserved.
 * 存放网络公共方法
 * 注意：是同步请求，不是异步
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketManager;
(function (SocketManager) {
    var Connection = (function () {
        function Connection() {
            this.sock = new egret.WebSocket();
            this.buf = new egret.ByteArray();
            this.lenbuf = new egret.ByteArray();
            this._arr = new egret.ByteArray();
            this.MessType = new proto.messType();
            this.handler = new proto.Processor();
        }
        //连接服务器
        Connection.prototype.connectServer = function (host, port) {
            if (host === void 0) { host = ""; }
            if (port === void 0) { port = 80; }
            //todo之前有数据的话，把自前数据清掉
            // if(this.sock!=null){
            //  if(this.sock.connected){
            //     return;
            //  }else{
            //     this.sock.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //     this.sock.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //  }
            // }
            // Global.showWaritPanel();
            this.buf.endian = egret.Endian.LITTLE_ENDIAN;
            this.lenbuf.endian = egret.Endian.LITTLE_ENDIAN;
            this._arr.endian = egret.Endian.LITTLE_ENDIAN;
            this.sock = new egret.WebSocket();
            this.sock.type = "webSocketTypeBinary";
            this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.sock.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.sock.connect(host, port);
        };
        //连接成功返回
        Connection.prototype.onSocketOpen = function () {
            // Global.hideWaritPanel();
            Config.connectState = true;
            this.handler.do_connect();
            //game.AppFacade.getInstance().sendNotification(SysNotify.CONNECT_SERVER_SUCCESS);
        };
        Connection.prototype.onSocketClose = function () {
            // Global.hideWaritPanel();
            Config.connectState = false;
            this.sock.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.sock.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.sock.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            // this.sock=null;
            console.error("与服务器的链接断开");
            //alert("断开连接")
            this.handler.do_close();
            //game.AppFacade.getInstance().sendNotification(SysNotify.CONNECT_SERVER_Fail);
        };
        Connection.prototype.sendProto = function (msg) {
            if (this.sock && this.sock.connected) {
                this.buf.position = 0;
                this.buf.writeShort(msg.S);
                msg.encode(this.buf);
                this.lenbuf.position = 0;
                this.lenbuf.writeShort(this.buf.position);
                this.sock.writeBytes(this.lenbuf, 0, 2);
                //   
                this.sock.writeBytes(this.buf, 0, this.buf.position);
                this.sock.flush();
            }
        };
        //消息返回  
        Connection.prototype.onReceiveMessage = function () {
            // Global.hideWaritPanel();
            this.sock.readBytes(this._arr);
            this._arr.position = 0;
            var len = this._arr.readShort();
            var protoid = this._arr.readShort();
            var protoClass = this.MessType.types[protoid];
            if (protoClass != null) {
                // var cmdDataBA: egret.ByteArray = new egret.ByteArray();
                // this._arr.readBytes(cmdDataBA);
                var pro = new protoClass();
                pro.decode(this._arr);
                this.handler.handle(pro);
            }
        };
        return Connection;
    }());
    SocketManager.Connection = Connection;
    __reflect(Connection.prototype, "SocketManager.Connection");
    var ins;
    function getInstance() {
        if (ins == null) {
            ins = new Connection();
        }
        return ins;
    }
    SocketManager.getInstance = getInstance;
})(SocketManager || (SocketManager = {}));
//# sourceMappingURL=SocketManager.js.map