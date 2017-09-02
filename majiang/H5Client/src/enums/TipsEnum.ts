class TipsEnum {
	public constructor() {

	}
	
	public static TYPE_EQUIP:number = 0;

	public static TYPE_WARN:number = 1;

	public static TYPE_GOLD:number = 3;

	public static TYPE_EXPERIENCE:number = 4;

	public static TYPE_DEFAULT:number = 5;

}

class ColorTipsEnum{
	public constructor() {

	}
	/**提示 */
	public static COLOR_WARN:string = "C:0xFF0a00&T:";
	/**金币获得 */
	public static COLOR_GOLD:string = "C:0xfff843&T:";
	/**经验获得 */
	public static COLOR_EXPERIENCE:string = "C:0x36de00&T:";
	/**默认 */
	public static COLOR_DEFAULT:string = "C:0xffffff&T:";

}