var { ToggleButton } = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var data = require("sdk/self").data;
var prefs = require("sdk/simple-prefs");

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
    width: 210,
    height: 274,
    contentURL: self.data.url("popup.html"),
    contentScriptFile: ["./jquery.min.js", "./popup.js"],
    onHide: handleHide
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

// Handle changing tab url
panel.port.on("newTabUrl", function(newUrl)
{
    tabs.activeTab.url = newUrl;
});

// Handle requests for religious setting
panel.port.on("getReligious", function()
{
    panel.port.emit("returnReligious", prefs.prefs["religious"]);
});

