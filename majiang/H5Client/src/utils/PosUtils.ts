class PosUtils {
	public constructor() {
	}

	/**
	 * 网格坐标转像素坐标
	 * @param gx x坐标
	 * @param gy y坐标
	 * @return egret.point 实际像素点
	 */
	public static gridToPixel(gx:number,gy:number):egret.Point{
		return new egret.Point(gx*60+30,gy*40+20);
	}
	/**
	 * 像素坐标转网格坐标
	 * @param px x坐标
	 * @param py y坐标
	 * @return egret.point 网格坐标点
	 */
	public static pixelToGrid(px:number,py:number):egret.Point{
		return new egret.Point(Math.floor((px-30)/60),Math.floor((py-20)/40));
	}

	/**
	 * 网格坐标转地图格子
	 * @param gx x坐标
	 * @param gy y坐标
	 * @return egret.point 地图格子点
	 */
	public static gridToMapGrid(gx:number,gy:number):egret.Point{
		var p:egret.Point=PosUtils.gridToPixel(gx,gy);
		var mx:number=Math.floor(p.y/256);
		var my:number=Math.floor(p.x/256);
		return new egret.Point(mx,my);
	}

	/**
	 * 获取朝向
	 */
	public static getLook(sx:number,sy:number,ex:number,ey:number):number{

		var x=ex-sx;
		var y=ey-sy;
		if(x<0){
			if(y<0){
				return 8;
			}else if(y=0){
				return 7;
			}else{
				return 6;
			}
		}else if(x=0){
			if(y<0){
				return 1;
			}else if(y=0){
				return 0;
			}else{
				return 5;
			}
		}else{
			if(y<0){
				return 2;
			}else if(y=0){
				return 3;
			}else{
				return 4;
			}
		}
	}
}