document.addEventListener('DOMContentLoaded',() => {
    console.log("Document loaded 1");
    var container = document.getElementById("visitList")
    var clearButton = document.getElementById("clear")
    clearButton.addEventListener("click", function() {
        chrome.storage.sync.set({ 'visits': {} }, function() {
            console.log('Data saved: ' + data);
        });
    })

    function sortObject(obj) {
        let sortable = [];
        for (var item in obj) {
            sortable.push([item, obj[item]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        let objSorted = {}
        sortable.forEach(function(item){
            objSorted[item[0]]=item[1]
        })

        return objSorted
    }
    
    // Load data from storage and display it
    chrome.storage.sync.get(['visits'], function(result) {
        if (result.visits) {
            let visits = sortObject(result.visits)
            let keys = Object.keys(visits)
            let tabs = document.createElement("div")
            tabs.setAttribute("class","tabs")
            let tabList = document.createElement("ul")
            tabList.setAttribute("class","tabList")
            let visitCount = document.createElement("div")
            visitCount.setAttribute("class","visitCount")
            let visitCountList = document.createElement("ul")
            visitCountList.setAttribute("class","visitCountList")

            for(let i =0 ; i < keys.length; i++) {
                
                let listItem = document.createElement("li")
                listItem.appendChild(document.createTextNode(""+keys[i]))
                listItem.setAttribute("class","item")
                tabList.appendChild(listItem)

                let listItem2 = document.createElement("li")
                listItem2.appendChild(document.createTextNode(""+visits[keys[i]]))
                listItem2.setAttribute("class","item")
                visitCountList.appendChild(listItem2)
            }
            tabs.appendChild(tabList)
            visitCount.appendChild(visitCountList)
            container.appendChild(tabs)
            container.appendChild(visitCount)
        }
    });

    
})