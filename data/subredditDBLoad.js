// Load the nsfwguard_subredditdb.json file into storage on install
browser.runtime.onInstalled.addListener((details) => {
  fetch(browser.runtime.getURL("data/nsfwguard_subredditdb.json"))
  .then((file) => {
    return file.json();
  })
  .then((json) => {
    browser.storage.local.get({
      subredditDB: {}
    }, (db) => {
      // Copy json entry by entry to avoid erasing any preexisting subreddits
      // This should hopefully future proof the db incase we ever increase the shipped 
      // db size, and avoid erasing the db when we update for any reason
      for(var item in json)
      {
        db.subredditDB[item] = json[item];
      }
      browser.storage.local.set({
        subredditDB: db.subredditDB
      });
    });
  });
});
