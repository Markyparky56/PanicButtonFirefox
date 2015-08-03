var { ToggleButton } = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var data = require("sdk/self").data;
var ss = require("sdk/simple-storage");

if(!ss.storage.religious)
{
    ss.storage.religious = false;
}

var button = ToggleButton({
    id: "button",
    label: "Panic Button",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onChange: handleChange
});

var panel = panels.Panel({
    contentURL: self.data.url("popup.html"),
    contentScriptFile: [data.url("jquery.min.js"), data.url("popup.js")],
    onHide: handleHide
});

// Handle changing tab url
panel.port.on("newTabUrl", function(newUrl)
{
    console.log("Changing tab...");
    //tabs.on("activate", function(tab){tab.url=newUrl});
    tabs.activeTab.url = newUrl;
});

// Handle requests for religious setting
panel.port.on("getReligious", function()
{
    panel.port.emit("returnReligious", ss.storage.religious);
});

function handleChange(state)
{
    if(state.checked)
    {
        panel.show({
            position: button
        });
    }
}

function handleHide()
{
    button.state("window", {checked: false});
}