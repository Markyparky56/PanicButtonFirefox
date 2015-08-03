// Because Panels can't access Addon-SDKs we have to port it out to be handled by out main code file
console.log("popup.js says Hello!");

function passUrlOut(url)
{    
    console.log("Calling for tab change...");
    self.port.emit("newTabUrl", url); 
}

function getReligiousSetting()
{
    console.log("Requesting updated religious variable...");
    self.port.emit("getReligious");    
}

self.port.on("returnReligious", function(religious)
{
    console.log("religious: " + religious);
    return religious;
});
    
$(emergency).click(
    function()
    {
        console.log("emergency click!");
        $.get("http://emergency.nofap.com/director.php", {cat:"em", religious:getReligiousSetting() ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(depression).click(
    function()
    {
        console.log("depression click!");
        $.get("http://emergency.nofap.com/director.php", {cat:"dep", religious:getReligiousSetting() ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(rejection).click(
    function()
    {
        console.log("rejection click!");
        $.get("http://emergency.nofap.com/director.php", {cat:"rej", religious:getReligiousSetting() ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});
    }
);

$(relapsed).click(
    function()
    {
        console.log("relapsed click!");
        $.get("http://emergency.nofap.com/director.php", {cat:"rel", religious:getReligiousSetting() ? "true" : "false", platform:"extension"}, function(e){passUrlOut(e);});     
    }
);