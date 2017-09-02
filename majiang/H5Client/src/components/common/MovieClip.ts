class MovieClip extends egret.MovieClip{
	public touchEnabled:boolean;
	public _mcFactory:egret.MovieClipDataFactory;
	public _autoPlay:boolean;
    public _playCount:number;
    public _compFun:Function;
    public _compArg:Function;
	public _fileName:string;
	public jsonData = null;
	public texture:egret.Texture;
	public visible =true;
	//
	public constructor() {
		super();
		this.touchEnabled = false,
        this._mcFactory = new egret.MovieClipDataFactory;
	}
    public loadFile(filename:string, autoplay:boolean=true, playcount:number=-1, compFun:Function=null,compArg:any=null) {
       
        this._autoPlay = autoplay,
        this._playCount = playcount || -1,
        this._compFun = compFun,
        this._compArg = compArg,
        
        this._fileName = filename,
        this.jsonData = null,
        this.texture = null,
        this.visible = !0;
        RES.getResByUrl (this._fileName + ".json", function(t) {
            if(this._fileName == filename ){
                this.jsonData = t;
                this.createBody();
            }
        }, this,RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl(this._fileName + ".png", function(t) {
            
             if(this._fileName == filename ){
                this.texture = t;
                this.createBody();
            }
        }, this,RES.ResourceItem.TYPE_IMAGE);
    }
    public clearCache() {
        this._mcFactory.clearCache(),
        this.movieClipData = null,
        this.visible = !1,
        this.stop()
    }
    public createBody() {
        if (this.jsonData && this.texture) {
            this._mcFactory.mcDataSet = this.jsonData,
            this._mcFactory.texture = this.texture;
            var e = this._fileName.split("/")
              , t = e.pop();
            this.movieClipData = this._mcFactory.generateMovieClipData(t),
            this._autoPlay && (this.gotoAndPlay(1, this._playCount),
            this._playCount > 0 && (new TimerUtils).setTimeOut(this.playTime * this._playCount, this.playComp, this)),
            this.dispatchEventWith(egret.Event.CHANGE)
        }
    }
    public startPlay(frame: string | number): void{
        this.gotoAndPlay(frame, this._playCount),
        this._playCount > 0 && (new TimerUtils).setTimeOut(this.playTime * this._playCount, this.playComp, this)
    }
    public playComp()  {
        // this.parent.removeChild(this),
        this._compFun && this._compFun.call(this._compArg)
    }
    public get playTime():number {
		return this.movieClipData ? 1 / this.frameRate * this.totalFrames * 1e3 : 0
	}
}