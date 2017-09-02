/**
 * 网络公共类
 * by dily
 * (c) copyright 2014 - 2035
 * All Rights Reserved. 
 * 存放网络公共方法 
 * 注意：是同步请求，不是异步
 */

module SocketManager{
    
    
    export class Connection{
        private MessType:proto.messType;
        private handler:proto.Processor;
        
        private sock :egret.WebSocket = new egret.WebSocket();
        private buf:egret.ByteArray = new egret.ByteArray();
        private lenbuf:egret.ByteArray = new egret.ByteArray();
        private _arr: egret.ByteArray = new egret.ByteArray();
        public constructor(){
           this.MessType =new proto.messType();
           this.handler =new proto.Processor();
        }
        //连接服务器
        public connectServer(host: string = "", port: number = 80) {
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
            this.buf.endian=egret.Endian.LITTLE_ENDIAN;
            this.lenbuf.endian=egret.Endian.LITTLE_ENDIAN;
            this._arr.endian=egret.Endian.LITTLE_ENDIAN;
            this.sock = new egret.WebSocket();
            this.sock.type = "webSocketTypeBinary";
            this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.sock.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.sock.connect(host, port);
        }

        //连接成功返回
        public onSocketOpen(): void {
            // Global.hideWaritPanel();
            Config.connectState = true;
            this.handler.do_connect();
            //game.AppFacade.getInstance().sendNotification(SysNotify.CONNECT_SERVER_SUCCESS);
        }
        public onSocketClose(): void {
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
        }   
        public sendProto(msg:proto.Pro){
              if(this.sock && this.sock.connected){   
                this.buf.position=0;
                this.buf.writeShort(msg.S);
                msg.encode(this.buf);
                this.lenbuf.position=0;
                this.lenbuf.writeShort(this.buf.position);

                this.sock.writeBytes(this.lenbuf,0,2);
                //   
                this.sock.writeBytes(this.buf,0,this.buf.position);
                this.sock.flush();
            }
            
        }
        
        //消息返回  
        public onReceiveMessage(): void {
            // Global.hideWaritPanel();
            
            this.sock.readBytes(this._arr);
            this._arr.position=0;
            var len = this._arr.readShort();
            var protoid=this._arr.readShort();
            var protoClass = this.MessType.types[protoid];

            if(protoClass!=null){
               // var cmdDataBA: egret.ByteArray = new egret.ByteArray();
               // this._arr.readBytes(cmdDataBA);
               var pro=new protoClass();
                pro.decode(this._arr);
                this.handler.handle(pro);
                //game.AppFacade.getInstance().sendNotification("Processor", pro);
            }   
        }
    }
    var ins:Connection;
    export function getInstance():Connection{
        if(ins==null){
            ins=new Connection();
        }
        return  ins;
    }
}



