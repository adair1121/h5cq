class MoviePool {
	public constructor() {
		this.dict=new Dictionary("MoviePool");
	}

	protected static instance:MoviePool;
	public static getInstance():MoviePool{
		return MoviePool.instance?MoviePool.instance:MoviePool.instance=new MoviePool();
	}


	private dict:Dictionary;

	/**
	 * 从池中取出名为key的影片剪辑
	 * @param key 影片剪辑的名字
	 * @param allowClone 允许克隆
	 */
	public getMc(key:string,allowClone:boolean=false):egret.MovieClip{
		var mc:egret.MovieClip;
		if(this.dict.hasKey(key)){
			if(allowClone){
				mc=this.createMc(key);
			}else{
				mc=this.dict.get(key);
			}
			
		}else{
			mc=this.createMc(key);
			this.dict.add(key,mc);
		}
		return mc;
	}

	
	private  createMc(name:string){
		
		var data=RES.getRes(name+"_json");
		var texture=RES.getRes(name+"_png");

		// var data=await RES.getResAsync(name+"_json",null,null);
		// var texture=await RES.getResAsync(name+"_png",null,null);
		


		var mcFactory:egret.MovieClipDataFactory=new egret.MovieClipDataFactory(data,texture);
		var mc:egret.MovieClip=new egret.MovieClip(mcFactory.generateMovieClipData(name));

		return mc;
	}

	
}