document.addEventListener('DOMContentLoaded',() => {
    console.log("Document loaded 1");
    var dataInput = document.getElementById("dataInput")
    var saveButton = document.getElementById("saveButton")
    let val = 1
    // Load data from storage and display it
    chrome.storage.sync.get(['savedData'], function(result) {
        if (result.savedData) {
        dataInput.value = result.savedData;
        val = result.savedData
        }
    });

    saveButton.addEventListener("click",() => {
        console.log("Save Clicked");
        var data = dataInput.value;
        chrome.storage.sync.set({ 'savedData': val + 1 }, function() {
          console.log('Data saved: ' + data);
        });
    })
})