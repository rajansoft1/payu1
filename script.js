  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(target, firstSource) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) {
            continue;
          }
          nextSource = Object(nextSource);

          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      }
    });
  }

  var util = {
          extend: function(a, b){
            for(var key in b)
              if(b.hasOwnProperty(key))
              a[key] = b[key];
              return a;
          },
          serializeObj: function (obj) {
              var str = [];
              for (var p in obj)
                  if (obj.hasOwnProperty(p)) {
                      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  }
              return '?' + str.join("&");
          },

          removeClass: function (classes, classToRemove) {
              var index = classes.indexOf(classToRemove)
              if (index > -1)
                  return classes.replace(classToRemove, '')

              return classes
          },
          addClass: function (classes, classToAdd) {
              var index = classes.indexOf(classToAdd)
              if (index == -1) {
                  classes = classes + ' ' + classToAdd
              }
              return classes
          }
      };