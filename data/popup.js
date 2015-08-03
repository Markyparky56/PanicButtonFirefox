// Because Panels can't access Addon-SDKs we have to port it out to be handled by out main code file

function passUrlOut(url)
{    
    self.port.emit("newTabUrl", url); 
}

function getReligiousSetting()
{
    self.port.emit("getReligious");    
}

self.port.on("returnReligious", function(religious)
{
    return religious;
});
    
$(emergency).click(
    function()
    {
        $.get("http://emergency.nofap.com/director.php", {cat:"em", religious:getReligiousSetting() ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(depression).click(
    function()
    {
        $.get("http://emergency.nofap.com/director.php", {cat:"dep", religious:getReligiousSetting() ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(rejection).click(
    function()
    {
        $.get("http://emergency.nofap.com/director.php", {cat:"rej", religious:getReligiousSetting() ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(relapsed).click(
    function()
    {
        $.get("http://emergency.nofap.com/director.php", {cat:"rel", religious:getReligiousSetting() ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});     
    }
);