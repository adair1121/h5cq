class Dictionary {
	public constructor(name ) {
		this.dict={};
		this.keyArr=[];
		this.name = name;
	}
	public dict:any;
	public keyArr:Array<string>;
	public name:string;
	/**
	 * 向字典中添加一个对象
	 * @param key 对象名
	 * @param value 对象
	 */
	public add(key:string,value:any):void{
		if(this.findKey(key)){
			console.warn("字典中已经存在名为"+key+"的对象,parent is ===>"+name );
		}else{
			this.dict[key]=value;
			this.keyArr.push(key);
		}
	}
	/**
	 * 移除字典中的对象
	 * @param key 对象名
	 * 
	 */
	public remove(key:string):void{
		if(this.findKey(key)){
			delete this.dict[key];
			// this.dict[key]=null;
			this.keyArr.splice(this.keyArr.indexOf(key),1);
			
		}else{
			console.warn("字典中没有名为"+key+"的对象,parent is ===>"+name );
		}
	}
	public clear():void{
		this.dict = {};
		this.keyArr = [];
	}
	/**
	 * 修改字典中的对象
	 * @param key 对象名
	 * @param value 新对象
	 */
	public modify(key:string,value:any):void{
		if(this.findKey(key)){
			this.dict[key]=value;
		}else{
			console.warn("字典中没有名为"+key+"的对象,parent is ===>"+name );
		}
	}
	/**修改指向 */
	public modifyKey(pkey:string,ckey:string,value:any):void{
		if(this.findKey(pkey)){
			this.remove(pkey);
			this.add(ckey,value);
		}
	}
	/**
	 * 查找字典中是否存在对象
	 * @param key 对象名
	 */
	public hasKey(key:string):boolean{
		return this.findKey(key);
	}

	/**
	 * 获取字典中的对象
	 * @param key 对象名
	 * 
	 */
	public get(key:string):any{
		if(this.findKey(key)){
			return this.dict[key];
		}else{
			// console.warn("字典中没有名为"+key+"的对象");
			return null;
		}
	}

	private findKey(key:string):boolean{
		var boo:boolean=false;
		for(var i:number=0;this.keyArr.length>i;i++){
			if(this.keyArr[i]==key){
				boo= true;
			}
		}
		return boo
	}
	
	public get length() : number {		return this.keyArr.length;	}
	
}