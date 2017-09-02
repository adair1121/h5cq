class Friend_chat_item extends eui.ItemRenderer{
	public icon:RoleHeadItemRender;
	public txt:eui.Label;

	private stateName:string;


	public constructor() {
		super();
		this.skinName = "Friend_chat_item_skin";
	}
	protected dataChanged():void{

		this.stateName = this.data.stateName;
		this.invalidateState();
		this.validateNow();

		this.icon.selected=false;
		// this.friendName.text = this.data.name;
		switch(this.stateName){
			case "time":
				this.txt.text=this.getCurrentTime(this.data.timeSpan);
				break;
			case "Lchat":
			case "Rchat":
				this.txt.text=this.data.content;
				break;
			
		}
	}

	private getCurrentTime(timeSpan:number):string{
		var time:string="2017-06-02 16:35";
		var data=new Date(timeSpan*1000);
		var nian=data.getFullYear()+"";
		var yue =data.getMonth()+1+"";
		var ri  =data.getDate()+"";
		var shi =data.getHours()+"";
		var fen =data.getMinutes()+""
		time=nian+"-"+((yue.length>1)?yue:"0"+yue)+"-"+((ri.length>1)?ri:"0"+ri)+" "+((shi.length>1)?shi:"0"+shi)+":"+((fen.length>1)?fen:"0"+fen);
		return time;
	}
	protected getCurrentState():string{
		return this.stateName;
	}
}