module lcp{
	export class ChangeEvent extends egret.Event{

		public CLASS_NAME:string = "ChangeEvent";
        private _obj:Object;
		public constructor(type:string, obj:Object = null, bubbles:boolean = false, cancelable:boolean = false) {
			super(type,bubbles,cancelable);
			if(obj){
                this._obj = obj;
            }
		}
		public get c_data():any{
			return this._obj;
		}
	}

}
