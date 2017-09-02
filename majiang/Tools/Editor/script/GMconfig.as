class config
{
	var loadui=true;
	var lang="cn";
	var addFuncClass;
	var panelpath="E:/EGameMobile/Client/src/tea/panel/view/";//panel路径
	
	var resurl="E:/EGameMobile/publish/asset/ui/";//UI资源路径
	var saveasdir="E:/EGameMobile/Client/src/tea/panel/";//ui面板的as存的路径
	var outpath="d:/work/workspace/PanelEditorAir/bin-debug/";//把UI资源目录打包成swf保存的路径
	var javaexe="C:/Program Files/Adobe/Adobe Flash Builder 4.6/jre/bin/java.exe";//java的路径
	var swiftpath="D:/soft/resPackage/Swift.jar";//swift地址
	var superClass=["Panel","GPanel","Window","CellRender"];
	//
	var lang="cn";
	var addFuncClass;
	var loadui=true;
	var skinfile="E:/EGameMobile/publish/asset/skins.txt";//ui面板的存的路径
	var cssfile="E:/EGameMobile/publish/asset/chat.css";//ui面板的存的路径
	var icondir="E:/EGameMobile/publish/asset/icon/";//icon的存的路径
	var uifile="asset/UI.swf";//ui面板的存的路径
	
	var exactres="E:/EGameMobile/res/改成英文";
	//
	var fanzhuan=false;
	var issimple=true;//导出简单的代码
	var as3src="E:/EGameMobile/EGameGMTool/src/";//as3项目的源目录
	var cs3src="D:/work/csharp/gameServer/GameLib/";//cs项目的原目录2241229382
	var js3src="c:/users/dayu/node/game/";//js项目的原目录
	//
	var datadir="E:/EGameMobile/publish/asset/data/";//数据来源目录
	
	var resdir="E:/EGameMobile/publish/asset/assets/";//原始资源目录，包括角色模型，地图，特效，UI等
	//
	var assetsdir="E:/EGameMobile/publish/asset/assets/";//发布的assets目录

	var preurl="";
	var anispeed;
	//
	var modelurl="model/";
	var effecturl="model/effect/";
	function config(){
		modelurl=assetsdir+modelurl;
		effecturl=assetsdir+effecturl;
		anispeed={stand:12,walk:30,run:30,atk:12,spell:12,sing:12,hited:11,die:12};
	}
}