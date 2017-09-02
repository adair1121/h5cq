class View_map_bg extends egret.Sprite {
	public constructor() {
		super();
	}


	public curMx: number;
	public curMy: number;

	private curMapName: string;

	private mapCon: egret.Sprite;
	private mapBlockArr: Array<MapBlock>;



	/**
	 * 加载地图
	 * @param mx 地图显示中心的列索引
	 * @param my 地图显示中心的行索引
	 */
	public mapload(path: string, gx: number = 0, gy: number = 0): void {
		this.curMapName = path;
		this.destroy(gx, gy);
		var p = PosUtils.gridToMapGrid(gx, gy);
		this.curMx = p.x;
		this.curMy = p.y;
		this.createMapArr(p.x, p.y);
		// console.log(111111111, this.curMx, this.curMy);
	}
	/**
	 * 生成地图数组
	 */
	private createMapArr(mx: number = 0, my: number = 0): void {

		var minX = mx - 2;
		var minY = my - 2;
		var maxX = mx + 2;
		var maxY = my + 2;
		for (var j: number = minX; maxX >= j; j++) {
			for (var i: number = minY; maxY >= i; i++) {

				if (i >= 0 && j >= 0) { 
					var path: string = "resource/assets/map/" + this.curMapName + "/" + j + "_" + i + ".jpg";
					var block: MapBlock = new MapBlock(path, j, i);
					this.mapBlockArr.push(block);
					this.mapCon.addChild(block);
					block.x = i * 256+128;
					block.y = j * 256+128;
				}
			}
		}
	}

	private destroy(gx: number = 0, gy: number = 0): void {
		if (this.mapCon) {
			this.mapCon.removeChildren();
			this.mapCon = null;
			this.mapBlockArr = null;
		}

		this.mapCon = new egret.Sprite();
		this.addChild(this.mapCon);

		// var p=PosUtils.gridToPixel(gx,gy);
		// this.mapCon.x=p.x;
		// this.mapCon.y=p.y;
		this.mapBlockArr = [];
	}

	/**检测地图格子是否需要更新 */
	public checkGridHasUpdate(gx: number, gy: number): void {
		var p = PosUtils.gridToMapGrid(gx, gy);
		if (this.curMx == p.x && this.curMy == p.y) {
			return;
		} else {

			// var _x=this.curMx+(p.x-this.curMx)*3;
			// var _y=this.curMy+(p.y-this.curMy)*2;
			for (var j: number = p.x - 2; p.x + 2 >= j; j++) {
				for (var i: number = p.y - 2; p.y + 2 >= i; i++) {

					if ((this.curMx - 2 <= j && j <= this.curMx + 2) && (this.curMy - 1 <= i && i <= this.curMy + 1)) {
						continue;
					}
					if (i >= 0 && j >= 0) { 
						var path: string = "resource/assets/map/" + this.curMapName+ "/" + j + "_" + i + ".jpg";
						var block: MapBlock = new MapBlock(path, j, i);
						this.mapBlockArr.push(block);
						this.mapCon.addChild(block);
						block.x = i * 256+128;
						block.y = j * 256+128;
					}
				}
			}
		}

		this.curMx = p.x;
		this.curMy = p.y;
		for (var k: number = 0; this.mapBlockArr.length > k; k++) {
			var block: MapBlock = this.mapBlockArr[k];


			if (block.mx < p.x - 2 || block.mx > p.x + 2 || block.my < p.y - 2 || block.my > p.y + 2) {
				this.mapCon.removeChild(block);
				this.mapBlockArr.splice(k, 1);
			}

		}
	}
}






class MapBlock extends egret.Sprite {
	public constructor(path: string, mx: number, my: number) {
		super();
		this.mx = mx;
		this.my = my;
		this.initView(path);
	}

	private _mx: number;
	private _my: number;


	private initView(path: string): void {
		RES.getResByUrl(path, (texture: egret.Texture) => {
			var bmp: egret.Bitmap = new egret.Bitmap(texture);
			this.addChild(bmp);
			bmp.x = -128;
			bmp.y = -128;
		}, this, RES.ResourceItem.TYPE_IMAGE);
	}

	public get my(): number { return this._my; }
	public set my(v: number) { this._my = v; }
	public get mx(): number { return this._mx; }
	public set mx(v: number) { this._mx = v; }
}