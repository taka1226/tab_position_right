
//thi is fired when an existing tab is selected.
chrome.tabs.onActivated.addListener(function(activeInfo){
    let new_tabId = activeInfo.tabId;

    // タブ切り替えや、新規追加のときは currentを更新する
    localStorage.setItem("current", new_tabId);
})

//this is fired when a new tab is created
chrome.tabs.onCreated.addListener(function(activeInfo) {

    localStorage.setItem("created_tabId", activeInfo.id);
    let priv_tabId = localStorage.getItem("current");

    chrome.tabs.get(Number(priv_tabId), (tab) => {
        if (tab != undefined){
            let priv_index = Number(tab.index);
            let created_tabId = localStorage.getItem("created_tabId");
            chrome.tabs.move(Number(created_tabId), {index: priv_index + 1});   //右に追加
            // chrome.tabs.move(Number(created_tabId), {index: priv_index});    //左に追加
            // chrome.tabs.move(Number(created_tabId), {index: 0});   //最初に追加
        }
    });
});


chrome.runtime.onStartup.addListener(function(){
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, function(tabs){
        localStorage.setItem("current", tabs[0].id);    //ブラウザを起動したときに tabid を追加
    })
})
