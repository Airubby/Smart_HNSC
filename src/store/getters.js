const getters = {
  name: state => state.app.name,
  auth: state => state.app.auth,
  menuList: state => state.app.menuList,
  routers: state => state.app.routers,
  currentPageName: state => state.app.currentPageName,
  openedNames: state => state.app.openedNames
}
export default getters
