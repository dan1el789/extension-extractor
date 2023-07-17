const groups = [
    {"name":"Web Request Altering", "permissions":["webRequest", "webRequestBlocking", "proxy", "dns"]},
    {"name":"Storage", "permissions":["storage", "unlimitedStorage"]},
    {"name":"Web Navigation", "permissions":["webNavigation", "contextualIdentities"]},
    {"name":"Tabs", "permissions":["tabs", "activeTab", "sessions", "tabHide", "tabCapture"]},
    {"name":"Authentication", "permissions":["cookies", "identity"]},
    {"name":"Clipboard", "permissions":["clipboard", "clipboardRead", "clipboardWrite"]},
    {"name":"Context Menu", "permissions":["menu", "contextMenus"]},
    {"name":"Bookmarks and History", "permissions":["bookmarks", "history"]},
    {"name":"Browser Settings and Management", "permissions":["management", "privacy", "browserSettings", "theme"]},
    {"name":"Downloads", "permissions":["downloads"]},
    {"name":"Interaction with OS", "permissions":["notifications","nativeMessaging", "idle"]}
]
    
function containsUrlPattern(permissions){
    for(item in permissions){
        if(permissions[item].includes("://") || permissions[item].includes("all_urls")){
            return true;
        }
    }
    return false;
}

function containsGroup(permissions, group){
    return group.permissions.some(item => {return permissions.includes(item)})
}