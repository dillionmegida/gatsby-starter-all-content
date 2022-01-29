export function changeWithoutReloading(stateObject, title, url) {
  window.history.pushState(stateObject, title, url)
}
