var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary(name) {
        this.dict = {};
        this.keyArr = [];
        this.name = name;
    }
    /**
     * 向字典中添加一个对象
     * @param key 对象名
     * @param value 对象
     */
    Dictionary.prototype.add = function (key, value) {
        if (this.findKey(key)) {
            console.warn("字典中已经存在名为" + key + "的对象,parent is ===>" + name);
        }
        else {
            this.dict[key] = value;
            this.keyArr.push(key);
        }
    };
    /**
     * 移除字典中的对象
     * @param key 对象名
     *
     */
    Dictionary.prototype.remove = function (key) {
        if (this.findKey(key)) {
            delete this.dict[key];
            // this.dict[key]=null;
            this.keyArr.splice(this.keyArr.indexOf(key), 1);
        }
        else {
            console.warn("字典中没有名为" + key + "的对象,parent is ===>" + name);
        }
    };
    Dictionary.prototype.clear = function () {
        this.dict = {};
        this.keyArr = [];
    };
    /**
     * 修改字典中的对象
     * @param key 对象名
     * @param value 新对象
     */
    Dictionary.prototype.modify = function (key, value) {
        if (this.findKey(key)) {
            this.dict[key] = value;
        }
        else {
            console.warn("字典中没有名为" + key + "的对象,parent is ===>" + name);
        }
    };
    /**修改指向 */
    Dictionary.prototype.modifyKey = function (pkey, ckey, value) {
        if (this.findKey(pkey)) {
            this.remove(pkey);
            this.add(ckey, value);
        }
    };
    /**
     * 查找字典中是否存在对象
     * @param key 对象名
     */
    Dictionary.prototype.hasKey = function (key) {
        return this.findKey(key);
    };
    /**
     * 获取字典中的对象
     * @param key 对象名
     *
     */
    Dictionary.prototype.get = function (key) {
        if (this.findKey(key)) {
            return this.dict[key];
        }
        else {
            // console.warn("字典中没有名为"+key+"的对象");
            return null;
        }
    };
    Dictionary.prototype.findKey = function (key) {
        var boo = false;
        for (var i = 0; this.keyArr.length > i; i++) {
            if (this.keyArr[i] == key) {
                boo = true;
            }
        }
        return boo;
    };
    Object.defineProperty(Dictionary.prototype, "length", {
        get: function () { return this.keyArr.length; },
        enumerable: true,
        configurable: true
    });
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map