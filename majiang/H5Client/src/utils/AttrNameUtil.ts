class AttrNameUtil {
	public constructor() {
		
		this.dict=new Dictionary("AttrNameUtil");


		this.dict.add("100002","武器");
		this.dict.add("100003","头部");
		this.dict.add("100004","衣服");
		this.dict.add("100005","项链");
		this.dict.add("100006","手镯");
		this.dict.add("100007","手镯");
		this.dict.add("100008","戒指");
		this.dict.add("100009","戒指");

		this.dict.add("200004","经验");
		this.dict.add("200005","等级");

		this.dict.add("30000"+data.ItemAttr.MHP,"生命");
		this.dict.add("30000"+data.ItemAttr.ATK,"攻击");
		this.dict.add("30000"+data.ItemAttr.DEF,"物防");
		this.dict.add("30000"+data.ItemAttr.MMP,"魔法");
		this.dict.add("30000"+data.ItemAttr.MDEF,"法防");
		this.dict.add("30000"+data.ItemAttr.critial,"暴击率");
		this.dict.add("30000"+data.ItemAttr.palsyRate,"麻痹几率");
		this.dict.add("30000"+data.ItemAttr.resiPalsy,"麻痹抵抗");
		this.dict.add("30000"+data.ItemAttr.DRD,"伤害减免");
		this.dict.add("30000"+data.ItemAttr.critcoe,"暴击系数");
		this.dict.add("30000"+data.ItemAttr.resicritial,"抗暴系数");
		this.dict.add("30000-1","测试");





	}


	protected static instance:AttrNameUtil;
	public static getInstance():AttrNameUtil{
		return AttrNameUtil.instance?AttrNameUtil.instance:AttrNameUtil.instance=new AttrNameUtil();
	}
	
	private dict : Dictionary;
		
	/**
	 * 获取属性名字
	 * @param attrEnum 属性枚举
	 * @param enumType 枚举类型：1=部位，2=玩家属性，3=角色属性
	 * @return string 属性的中文名字
	 */
	public  getAttrName(attrEnum:number,enumType:number=1):string{
		var str:string;
		str=this.dict.get(enumType+"0000"+attrEnum+"");
		if(!str){
			console.log("没有枚举为"+attrEnum+"的属性");
			
		}
		return  str
	}

	




}