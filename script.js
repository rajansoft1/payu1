var util = {
          extend: function(a, b){
            for(var key in b)
              if(b.hasOwnProperty(key))
              a[key] = b[key];
              return a;
          },
          idDate: function(val) {
           var date = new Date(val);
            return !isNaN(date.valueOf());
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