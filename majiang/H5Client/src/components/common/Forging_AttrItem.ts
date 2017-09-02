class Forging_AttrItem extends eui.Component{
	public constructor(name:string,value_now:string,value_next:string) {
		super();
		this.skinName="Forging_AttrItem_skin";
		this.txt_propName.text=name;
		this.txt_prop_now.text=value_now;
		this.txt_prop_next.text=value_next;
	}
	public txt_propName:eui.Label;
	public txt_prop_now:eui.Label;
	public txt_prop_next:eui.Label;

}