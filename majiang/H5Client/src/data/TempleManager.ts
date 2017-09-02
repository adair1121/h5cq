module temple{
    export class TempleManager{
        constructor(){
        }
        public static init():void{
            var txts=[]
             
             
             RES.getResByUrl("resource/cfg/ItemTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/SkillTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/UnitTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/WingsTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/HumenTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/RebornTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/DropTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/StrengthenTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/DropItemTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/BuffTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/MapTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/JingMaiTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/DragonSoulTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/ShieldTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/GemstoneTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/ZhuLingTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/ShopTemple.txt",this.getShopFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/LevelStageTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/LevelStageTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/RoleInitTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/JobInitTemple.txt",this.getJobInitFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/WordTemple.txt",this.getWordFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/GlobalDefineTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/RankTemple.txt",this.getRankDataFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/AddBagTemple.txt",this.getBagRelationFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/LevelTemple.txt",this.getLevelDataFunc,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/EquipTemple.txt",this.getEquipData,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/FashionTemple.txt",this.getFashionData,this,RES.ResourceItem.TYPE_JSON);
             RES.getResByUrl("resource/cfg/BossTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             
        }
        private static temples: any[]=[];
        //
        public static getFunc(da:any){
            for(var o in da){
                TempleManager.temples[o]=da[o];
            }
            // var obj=TempleManager.temples[1001015];
            // var C:data.UnitTemple=<data.UnitTemple>obj;
            
            // console.log(C.name);
        }
        public static getWordFunc(da:any){
            for(var o in da){
                TempleManager.temples[o]=da[o];
                DataCenter.wordGather[da[o].enumValue] = da[o].word;
            }            
        }
        public static getBagRelationFunc(da:any){
            for(var o in da){
                TempleManager.temples[o]=da[o];
                DataCenter.bagGridRelation[da[o].addNumber] = da[o].yuanbaoNumber;
            }
        }
        public static getShopFunc(da:any){
            for(var o in da){
                TempleManager.temples[o]=da[o];
                if(!DataCenter.storeData[da[o].shopType]){
                    DataCenter.storeData[da[o].shopType] = [];
                }
                DataCenter.storeData[da[o].shopType].push(da[o].ID);
                if(da[o].shopType === 2){
                    DataCenter.storeGoods[da[o].ItemID] = (da[o].ID);
                }
            }
        }
        public static getRankDataFunc(da:any){
            if(!DataCenter.rankData){
                DataCenter.rankData = {};
            }
            for(var o in da){
                TempleManager.temples[o]=da[o];
                if(!DataCenter.rankData[da[o].order]){
                    DataCenter.rankData[da[o].order] = [];
                }
                DataCenter.rankData[da[o].order].push(da[o]);
            }
        }
        public static getLevelDataFunc(da:any){
            if(!DataCenter.levelData){
                DataCenter.levelData = {};
            }
            for(var o in da){
                TempleManager.temples[o]=da[o];
                DataCenter.levelData[da[o].Level] = da[o];
            }
        }
        public static getJobInitFunc(da:any){
            if(!DataCenter.jobInitData){
                DataCenter.jobInitData = {};
            }
             for(var o in da){
                TempleManager.temples[o]=da[o];
                DataCenter.jobInitData[da[o].job] = da[o];
             }
        }
        public static getEquipData(da:any){
            if(!DataCenter.CJData){
                DataCenter.CJData = {};
            }
            if(!DataCenter.CJTempleData){
                DataCenter.CJTempleData = {};
            }
            for(var o in da){
                TempleManager.temples[o]=da[o];
                var str:string = da[o].equipPart.join("-");
                if(!DataCenter.CJData[str]){
                    DataCenter.CJData[str] = [];
                }
                DataCenter.CJData[str].push(da[o]);
                DataCenter.CJTempleData[da[o].itemId] = da[o];
            }
        }
        public static getFashionData(da:any){
            if(!DataCenter.fashionData){
                DataCenter.fashionData = {};
            }
             for(var o in da){
                TempleManager.temples[o]=da[o];
                if(!DataCenter.fashionData[da[o].clothesPart]){
                    DataCenter.fashionData[da[o].clothesPart] = [];
                }
                DataCenter.fashionData[da[o].clothesPart].push(da[o]);
             }
        }
        public static select<T>(id:number):T{
            return <T>TempleManager.temples[id];
        }
    }
}