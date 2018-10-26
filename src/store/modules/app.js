import Cookies from 'js-cookie'
// import routers from '@/router/routers';
var routers = []
const app = {
  state: {
    name: 'TEST',
    auth: '1',
    menuList: JSON.parse(localStorage.getItem('menuList')) || [],
    routers: routers,
    openedNames: JSON.parse(localStorage.getItem('openedNames')) || [],
    currentPageName: localStorage.getItem('currentPageName') || ''
  },
  mutations: {
    getAuthMenulist(state, data) {
      var menuList = [];
      var arr2 = [] // data转化的普二级数组, eg.[{},{}]
      // 1.根据路由获取左侧菜单全部的配置数组
      routers.forEach(item => {
        if (item.subHidden || !item.children || !item.children.length) {
          // 首页默认都显示
          var obj = {
            name: item.name,
            label: item.meta && item.meta.title,
            meta: item.meta,
            checked: item.name == 'home'? true:false
          }
          menuList.push(obj)
        } else {
          var obj = {
            name: item.name,
            label: item.meta && item.meta.title,
            meta: item.meta,
            children: []
          }

          item.children.forEach(foo => {
            if (foo.hidden) return;
            obj.children.push({
              name: foo.name,
              label: foo.meta && foo.meta.title,
              // meta: item.meta
            })
          })
          menuList.push(obj)
        }
      })

      if (data && data.length) {
        // 2. data多维数组转化为普通二级数组
        data.forEach(item => {
          if (item.children && item.children.length) {
            // label /checked?
            var obj = {
              label: item.label
            }
            arr2.push(obj)
            item.children.forEach(foo => {
              arr2.push(foo)
            })
          } else {
            arr2.push(item)
          }
        })

        // 3. 循环全部菜单，如返回有相应的权限，加上checked:true
        for (var i = 0; i < menuList.length; i++) {
          var _obj = menuList[i]
          var _obj2 = menuList[i].children

          // 一级处理
          for (var j = 0; j < arr2.length; j++) {
            if (arr2[j].label === _obj.label) {
              _obj.checked = true
            }
          }

          // 判断children有无
          if (_obj2 && _obj2.length) {
            for (var k = 0; k < _obj2.length; k++) {
              var _obj3 = _obj2[k]
              for (var m = 0; m < arr2.length; m++) {
                if (arr2[m].label === _obj3.label) {
                  _obj3.checked = true
                }
              }
            }
          }
        }
      }

      state.menuList = menuList
      localStorage.setItem('menuList', JSON.stringify(menuList))
    },
    // 暂无使用
    updateMenulist(state) {
      let accessCode = parseInt(localStorage.get('token'));
      let menuList = [];
      routers.forEach((item, index) => {
        if (item.children.length === 1) {
          menuList.push(item);
        } else {
          let len = menuList.push(item);
          let childrenArr = [];
          childrenArr = item.children.filter(child => {
            return child;
          });
          if (childrenArr === undefined || childrenArr.length === 0) {
            menuList.splice(len - 1, 1);
          } else {
            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
            handledItem.children = childrenArr;
            menuList.splice(len - 1, 1, handledItem);
          }
        }
      });
      state.menuList = menuList;
    },
    updateOpenNames(state, name) {
      let arr = []
      arr.push(name);
      state.openedNames = arr;
      localStorage.setItem('openedNames', JSON.stringify(arr));
    },
    setCurrentPageName(state, name) {
      if (name) {
        state.currentPageName = name
        localStorage.setItem('currentPageName', name);
      }
    }
  }
}

export default app
