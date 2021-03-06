﻿var active_torrentID=null;
var interface_cid=null;
var details;
var token;

/*
µTorrent Functions
*/
function requestData()
{
  gadget.debug.trace("InterfaceUrl: "+getTorrentInterface());
  if (getTorrentInterface() == null) {
    torrentList.removeAllElements();
    displayNotification(ERROR_SETUP);
    lblUp.innerText = "";
    lblDown.innerText = "";
    return;
  }
  try {
	if (token == null) {
		// Retrieve token first
		retrieveToken();
	}
  var req = new XMLHttpRequest();
  req.open('GET', getTorrentInterface()+"&randomTime="+Math.random(), true, interface_username, interface_password);
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if (req.status == 200) {
        var jsonText = req.responseText.toString();
        var resp = jsonText.parseJSON();
        interface_cid=resp["torrentc"];
        displayData(resp);
      }
			else if (req.status == 300) {
				retrieveToken();
			}
      else {
        gadget.debug.error("Error loading page\n");
        displayData(null);
      }
    }
  };
  req.send(null);
  }
  catch (E) {
    displayData(null);
  }
}

function retrieveToken() {
	debug.trace("Retrieving Token from token.html");
  var req = new XMLHttpRequest();
  req.open('GET', "http://" + interface_ip + ":" + interface_port + "/gui/token.html", false, interface_username, interface_password);
  req.send();
	debug.trace("Response: " + req.status);
	debug.trace(req.responseText);
  if (req.status == 200) {
    var resp = req.responseText;
    resp = resp.replace(/<[^>]+>/gi, '');
    token = resp;
  }
}

function getTorrentData(url) {
  gadget.debug.trace("Requesting: "+url);
  try
  {
    var req = new XMLHttpRequest();
    req.open('GET', url, false, interface_username, interface_password); 
    req.send(null);
    if(req.status == 200) {
      var resp = req.responseText;
      resp = resp.parseJSON();
    }
    interface_cid=resp["torrentc"];
    return resp;
  }
  catch (E)
  { }
  return null;
}

function stopTorrent(torrentID) {
  var url = interface_url;
     url += "&cid="+interface_cid;
     url += "&action=stop";
     url += "&hash="+torrentID;

  var data = getTorrentData(url);
  if (data == null) return;
}

function startTorrent(torrentID) {
  var url = interface_url;
     url += "&cid="+interface_cid;
     url += "&action=start";
     url += "&hash="+torrentID;

  var data = getTorrentData(url);
  if (data == null) return;
}

function addTorrent(torrentUrl) {
  var url = interface_url;
     url += "&cid="+interface_cid;
     url += "&action=add-url";
     url += "&s="+torrentUrl;

  var data = getTorrentData(url);
  if (data == null) return;
}

function getTorrentInterface() {
  interface_ip=options.getValue("interface_ip");
  interface_port=options.getValue("interface_port");
  interface_username=options.getValue("interface_username");
  interface_password=options.getValue("interface_password");
  
	if (interface_ip != "" && interface_port != "") {
		// Create URL based on options data
		url = "http://"+interface_ip+":"+interface_port+"/gui/?list=1";
		if (token != null) {
			url += "&token=" + token;
		}
		return url;
	}
	else {
		return null;
	}
}