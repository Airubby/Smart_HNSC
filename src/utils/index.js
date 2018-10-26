let util = {

};
util.setCurrentPath = function (vm, name) {
  let title = '';
  let currentPathArr = [];
  if (name === 'home_index') {
      currentPathArr = [
          {
              title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
              path: '',
              name: 'home_index'
          }
      ];
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
      currentPathArr = [
          {
              title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
              path: '/home',
              name: 'home_index'
          },
          {
              title: title,
              path: '',
              name: name
          }
      ];
  } else {
      let currentPathObj = vm.$store.state.app.routers.filter(item => {
          if (item.children.length <= 1) {
              return item.children[0].name === name;
          } else {
              let i = 0;
              let childArr = item.children;
              let len = childArr.length;
              while (i < len) {
                  if (childArr[i].name === name) {
                      return true;
                  }
                  i++;
              }
              return false;
          }
      })[0];
      if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
          currentPathArr = [
              {
                  title: '首页',
                  path: '',
                  name: 'home_index'
              }
          ];
      } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
          currentPathArr = [
              {
                  title: '首页',
                  path: '/home',
                  name: 'home_index'
              },
              {
                  title: currentPathObj.title,
                  path: '',
                  name: name
              }
          ];
      } else {
          let childObj = currentPathObj.children.filter((child) => {
              return child.name === name;
          })[0];
          currentPathArr = [
              {
                  title: '首页',
                  path: '/home',
                  name: 'home_index'
              },
              {
                  title: currentPathObj.title,
                  path: '',
                  name: currentPathObj.name
              },
              {
                  title: childObj.title,
                  path: currentPathObj.path + '/' + childObj.path,
                  name: name
              }
          ];
      }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};

export default util;
