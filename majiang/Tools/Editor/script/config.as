class config
{
	var loadui=true;
	var lang="cn";
	var addFuncClass;
	var panelpath="E:/EGameMobile/Client/src/tea/panel/view/";//panel路径
	
	var resurl="E:/h5cq/Tools/Editor/asset/ui/";//UI资源路径
	var saveasdir="E:/EGameMobile/Client/src/tea/panel/view";//ui面板的as存的路径
	var outpath="d:/work/workspace/PanelEditorAir/bin-debug/";//把UI资源目录打包成swf保存的路径
	var javaexe="C:/Program Files/Adobe/Adobe Flash Builder 4.6/jre/bin/java.exe";//java的路径
	var swiftpath="D:/soft/resPackage/Swift.jar";//swift地址
	var superClass=["Panel","GPanel","Window","CellRender"];
	
	var lang="cn";
	var addFuncClass;
	var loadui=true;
	var skinfile="E:/h5cq/Tools/Editor/asset/skins.txt";//ui面板的存的路径
	var cssfile="E:/h5cq/Tools/Editor/asset/chat.css";//ui面板的存的路径
	var icondir="E:/h5cq/Tools/Editor/asset/icon/";//icon的存的路径
	var uifile="asset/UI.swf";//ui面板的存的路径
	//E:\EGameMobile\res\model\skilleffect
	var exactres="E:/EGameMobile/res/uieffect/CD/";
	//
	var fanzhuan=false;
	var issimple=true;//导出简单的代码
	var toolas3src="E:/EGameMobile/EGameGMTool/src/";
	var as3src="E:/EGameMobile/Client/src/";//as3项目的源目录
	var cs3src="E:/h5cq/后端/CqServer/DBBase/GameData/";//cs项目的原目录2241229382
	var js3src="E:/EGameMobile/GMCenter/game/";//js项目的原目录
	var ts3src="E:/h5cq/前端/HClient/src/";//ts项目的原目录
	//
	var datadir="E:/h5cq/Tools/Editor/asset/data/";//数据来源目录
	var protofile="my.proto";
	var resdir="E:/h5cq/Tools/Editor/asset/assets/";//原始资源目录，包括角色模型，地图，特效，UI等
	//
	var assetsdir="E:/h5cq/publish/client/resource/assets/";//发布的assets目录

	var preurl="";
	var anispeed;
	var BGScale=1;//地图的背景按照1倍大小
	var blockwidth=256;
	//
	var modelurl="model/";
	var effecturl="model/effect/";
	function config(){
		modelurl=assetsdir+modelurl;
		effecturl=assetsdir+effecturl;
		anispeed={ready:4,stand:4,ridestand:4,walk:8,run:8,atk:15,crush:15,cri:15,dazen:6,spell:15,sing:15,riderun:15,hited:16,die:12};
	}
}