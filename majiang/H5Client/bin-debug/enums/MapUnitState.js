var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapUnitState = (function () {
    function MapUnitState() {
    }
    return MapUnitState;
}());
MapUnitState.STAND = "s";
MapUnitState.ATTACK = "a";
MapUnitState.RUN = "r";
MapUnitState.CAST = "c";
__reflect(MapUnitState.prototype, "MapUnitState");
//# sourceMappingURL=MapUnitState.js.map