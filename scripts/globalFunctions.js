
    (function () {
        var global = this;
        global.namespace = function (ns) {
            var parent;
            if (typeof ns === "string") {
                parent = global;
                ns = ns.split('.');
                for (var i = 0, ilen = ns.length; i < ilen; i++) {
                    parent[ns[i]] = parent = (typeof parent[ns[i]] === "object" ? parent[ns[i]] : {});
                }
            }
        }
    })();