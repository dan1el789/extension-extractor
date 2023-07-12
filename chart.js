
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    createStatisticsForData(manifestsWithPermissions,10,"mostUsedPermissions");
    createStatisticsForData(manifestsWithPermissions.filter(function(item){return item.manifest.permissions.includes("storage")}),10,"mostUsedPermissionsWithStorage");
});

function createStatisticsForData(dataset, limit, canvasId){
    let result = {};
    for(key in dataset){
        for(item in dataset[key].manifest.permissions){
            if(result[dataset[key].manifest.permissions[item]] != undefined){
                result[dataset[key].manifest.permissions[item]]++
            }
            else{
                if(canvasId == "mostUsedPermissionsWithStorage" && dataset[key].manifest.permissions[item] == "storage")
                    result[dataset[key].manifest.permissions[item]] = -12345678;
                result[dataset[key].manifest.permissions[item]] = 1
            }
        }
    }

    let labels = [];
    let data = [];
    for(key in result){
        if(result[key] >= limit){
            labels.push(key);
            data.push(result[key])
        }
    }
    createBarChart(labels, data,canvasId, "Number of Extensions using that permission")
}

(function(){
    let dataset = manifestsWithPermissions;
    let result = {"URL access":0};
    
    //fill in alarms, browsingData, scripting
    let groups = [
    	{"name":"Web Request Altering", "permissions":["webRequest", "webRequestBlocking", "proxy", "dns"]},
    	{"name":"Storage", "permissions":["storage", "unlimitedStorage"]},
    	{"name":"Web Navigation", "permissions":["webNavigation", "contextualIdentities"]},
    	{"name":"Tabs", "permissions":["tabs", "activeTab", "tabHide", "tabCapture"]},
    	{"name":"Cookies and Sessions", "permissions":["cookies", "sessions", "identity"]},
    	{"name":"Clipboard", "permissions":["clipboard", "clipboardRead", "clipboardWrite"]},
    	{"name":"Context Menu", "permissions":["menu", "contextMenus"]},
    	{"name":"Bookmarks and History", "permissions":["bookmarks", "history"]},
    	{"name":"Browser Settings and Management", "permissions":["management", "privacy", "browserSettings", "theme"]},
    	{"name":"Downloads", "permissions":["downloads"]},
    	{"name":"Interaction with OS", "permissions":["notifications","nativeMessaging", "idle"]}
    ]
    
    groups.forEach(function(group){
    	result[group.name] = 0;
    })
    
    for(key in dataset){
    	let permissionSet = dataset[key].manifest.permissions;
    	if(containsUrlPattern(permissionSet))
    		result["URL access"]++;
    		
    	groups.forEach(function(group){
    		console.log(group)
    		if(containsGroup(permissionSet,group)){
    			result[group.name]++;
    		}
    	})
    }
    
    function containsUrlPattern(permissions){
    	for(item in permissions){
    		if(permissions[item].includes("://")){
    			return true;
    		}
    	}
    	return false;
    }
    
    function containsGroup(permissions, group){
    	return group.permissions.some(item => {return permissions.includes(item)})
    }
    
    let labels = [];
    let data = [];
    for(key in result){
        if(result[key] >= limit){
            labels.push(key);
            data.push(result[key])
        }
    }
    createBarChart(labels, data, "mostUsedGroups", "Number of Extensions using group of permission")
})()

function createBarChart(labels, data, canvasId, title){
    const ctx = document.getElementById(canvasId);
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: labels,
        datasets: [{
            label: title,
            data: data,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}
