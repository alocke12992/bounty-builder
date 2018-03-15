
function baseURL() {
  if(window.location.href.indexOf("http://localhost:3000/") > -1) {
    return "http://localhost:3000";
  } else {
    return "https://deconetbounty.herokuapp.com";
  }
}
export { baseURL };
