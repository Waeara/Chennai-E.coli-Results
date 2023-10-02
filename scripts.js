function init() {
    gapi.load('client:auth2', function () {
        gapi.client.init({
            apiKey: 'AIzaSyCbe7LGT_zNgdlAkgNyOiI65HWKlL5VYiY',
            clientId: '403334403956-ig7l4ma267vohv621cnhc3lpcm713f8v.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
        });
    });
}

function handleAuthClick() {
    authenticate().then(loadClient).then(execute);
}

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/spreadsheets.readonly" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}

function loadClient() {
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}

function execute() {
    return gapi.client.sheets.spreadsheets.values.get({
        "spreadsheetId": "1p-VSsfXfJ5IHlwLtUozfMbIM6bQozLu2CIn2oUsFQzg",
        "range": "Sheet1"
    })
        .then(function (response) {
            // Displaying data to the web page
            document.getElementById('output').innerText = JSON.stringify(response.result.values);
        },
            function (err) { console.error("Execute error", err); });
}
