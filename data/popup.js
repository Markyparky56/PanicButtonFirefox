function GetNewUrlAndUpdateTab(category)
{
  browser.storage.sync.get({religiousEnabled: false})
  .then((result) => {
    let params = {
      cat:        category,
      religious:  ((result.religiousEnabled) ? "true" : "false"),
      platform:   "extension"
    };
    let esc = encodeURIComponent;
    let query = Object.keys(params)
                      .map(k => esc(k) + '=' + esc(params[k]))
                      .join('&');
    fetch("https://emergency.nofap.com/director.php?" + query, {method: 'GET'})
    .then((response) => {return response.text();})
    .then((newUrl) => { browser.tabs.update({url: newUrl}); })
    .catch((err)=>{console.error(err);});
  });
}

document.addEventListener("click", (e) => {
  let category;
  switch(e.target.id)
  {
    case "emergency": category = "em"; break;
    case "depression": category = "dep"; break;
    case "rejection": category = "rej"; break;
    case "relapsed": category = "rel"; break;
  }
  GetNewUrlAndUpdateTab(category);
});
