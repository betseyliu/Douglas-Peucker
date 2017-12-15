// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({1:[function(require,module,exports) {
"use strict";function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,i,e){return i&&t(n.prototype,i),e&&t(n,e),n}}(),i=function(){function i(n,e){t(this,i),this.points=n,this.tolerance=e}return n(i,[{key:"vacuate",value:function(){var t=this;if(!this.points.length)throw new Error("没有传入待抽稀数组");if(this.points.length<3)return this.points;var n=this.points.length-1,i=[];for(i.push(0),i.push(n);this.points[0][0]==this.points[n][0]&&this.points[0][1]==this.points[n][1];)n--;return this.reduce(0,n,i),i.sort(function(t,n){return t-n}),i.map(function(n){return t.points[n]})}},{key:"reduce",value:function(t,n,i){for(var e,r=0,o=0,s=t;s<n;s++)(e=this.verticalDimension(this.points[t],this.points[n],this.points[s]))>r&&(r=e,o=s);r>this.tolerance&&0!=o&&(i.push(o),this.reduce(t,o,i),this.reduce(o,n,i))}},{key:"verticalDimension",value:function(t,n,i){var e=n[0]-t[0],r=n[1]-t[1],o=n[0]-i[0],s=n[1]-i[1],u=Math.sqrt(Math.pow(t[0]-n[0],2)+Math.pow(t[1]-n[1],2));return Math.abs(e*s-o*r)/u}}]),i}();module.exports=function(t,n){return new i(t,n).vacuate()};
},{}]},{},[1])