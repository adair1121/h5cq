class Mail_itemRenderer extends eui.ItemRenderer{
	public txt_read:eui.Label;
	public txt_title:eui.Label;
	public txt_time:eui.Label
	public constructor() {
		super();
		this.skinName = "Mail_itemRenderer_skin";
	}

	protected dataChanged():void{
		var mailTemple:data.MailTemple = temple.TempleManager.select(this.data.mailTemplateId) as data.MailTemple;
		if(this.data.mailState){
			this.txt_read.text="(已读)";
		}else{
			this.txt_read.text="(未读)";
		}
		this.txt_title.text = mailTemple.title;
		this.txt_read.x = this.txt_title.x + this.txt_title.width + 10;
		this.txt_time.text = GlobalFunc.formatTime(this.data.sendTime);
	}
	
}