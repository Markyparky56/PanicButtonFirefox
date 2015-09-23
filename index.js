// Define namespace
if(typeof panicbutton == "undefined")
{
    var panicbutton = {};
}

var { ToggleButton } = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var data = require("sdk/self").data;
var prefs = require("sdk/simple-prefs");

panicbutton.button = ToggleButton({
    id: "button",
    label: "Panic Button",
    icon: {
        "16": "./icon16.png",
        "19": "./icon19.png",
        "32": "./icon32.png",
        "48": "./icon48.png",
        "64": "./icon64.png",
        "128": "./icon128.png"
    },
    onChange: handleChange
});

panicbutton.panel = panels.Panel({
    width: 210,
    height: 275,
    contentURL: self.data.url("popup.html"),
    contentScriptFile: ["./jquery-2.1.4.min.js", "./popup.js"],
    onHide: handleHide
});

function handleChange(state)
{
    if(state.checked)
    {
        panicbutton.panel.show({
            position: panicbutton.button
        });
    }
}

function handleHide()
{
    panicbutton.button.state("window", {checked: false});
}

// Handle changing tab url
panicbutton.panel.port.on("newTabUrl", function(newUrl)
{
    tabs.activeTab.url = newUrl;
});

// Handle requests for religious setting
panicbutton.panel.port.on("getReligious", function()
{
    panicbutton.panel.port.emit("returnReligious", prefs.prefs["extensions.panicbutton.religious"]);
});

