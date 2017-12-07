// NoFap Panic Button NSFWGuard script
// Based on the Reddit - Block NSFW userscript by /u/Mitttttens
// (https://greasyfork.org/en/scripts/17493-reddit-block-nsfw)

if(typeof panicbutton == "undefined")
{
    var panicbutton = {};
}
// Check if NSFWGuard is enabled or not

browser.storage.sync.get({nsfwGuardEnabled: true, safehavenUrl: "https://www.reddit.com/r/nofap"})
.then((result) => {
  panicbutton.nsfwGuardEnabled = result.nsfwGuardEnabled;
  panicbutton.safehavenUrl = result.safehavenUrl;
  if(panicbutton.nsfwGuardEnabled)
  {
    panicbutton.checkForNSFW();
  }
});

panicbutton.processUrl = function()
{
  panicbutton.url = window.location.href;
  // Check for NSFW Subreddit
  var regex = /^https?:\/\/[^\.]*\.?reddit.com\/r\/[^\/]+\/?/
  let regexResult = regex.exec(panicbutton.url);
  if(regexResult != null) 
  {
    panicbutton.url = regexResult[0];
    // Check if we need to add a '/' to the end
    if(panicbutton.url.slice(-1) != "/")
    {
      panicbutton.url +=  "/";
    }

    // Append the about.json we want to check
    panicbutton.jsonUrl = panicbutton.url + "about.json";
  }
  else // Check for an over18 page
  {
    let regex = /^https?:\/\/[^\.]*\.?reddit.com\/over18\?.*/
    let regexResult = regex.exec(panicbutton.url);
    if(regexResult != null)
    {
      // Caught an over18 access page, redirect to the safe haven
      window.location.replace(panicbutton.safehavenUrl);
    }
  }  
}

panicbutton.checkForNSFW = function()
{
  panicbutton.processUrl();
  fetch(panicbutton.jsonUrl, {method: 'GET'})
  .then((response) => { return response.json();})
  .then((json) => {
    if(typeof json != "undefined")
    {
      if(json.data.over18)
      {
        window.location.replace(panicbutton.safehavenUrl);          
      }
    }
    else if(typeof json[0].data.children[0] != "undefined") // Might be a comments page
    {
      if(json[0].data.children[0].data.over_18)
      {
        window.location.replace(panicbutton.safehavenUrl);          
      }
    }
    else
    {
      console.log("NSFW Guard Is Confused! Please contact app@nofap.com");        
    }
  })
  .catch((err) => { console.error(err); })
}
