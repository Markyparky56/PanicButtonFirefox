// Because Panels can't access Addon-SDKs we have to port it out to be handled by the main code file
var religiousEnabled;

function passUrlOut(url)
{
    self.port.emit("newTabUrl", url);
}

function getReligiousSetting()
{
    self.port.emit("getReligious");
}

self.port.on("returnReligious", function(religiousSetting)
{
    religiousEnabled = religiousSetting;
});

// Button handlers
$(emergency).click(
    function()
    {
        getReligiousSetting(); // Check if setting has changed
        $.get("https://emergency.nofap.com/director.php", {cat:"em", religious:religiousEnabled ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(depression).click(
    function()
    {
        getReligiousSetting(); // Check if setting has changed
        $.get("https://emergency.nofap.com/director.php", {cat:"dep", religious:religiousEnabled? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(rejection).click(
    function()
    {
        getReligiousSetting(); // Check if setting has changed
        $.get("https://emergency.nofap.com/director.php", {cat:"rej", religious:religiousEnabled ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(relapsed).click(
    function()
    {
        getReligiousSetting(); // Check if setting has changed
        $.get("https://emergency.nofap.com/director.php", {cat:"rel", religious:religiousEnabled ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});     
    }
);
