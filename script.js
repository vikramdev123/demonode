(function(){
    if(window.location.pathname == '/index.html'){
        getIndex();
    }
    if(window.location.pathname == '/about.html'){
        var whole_url = window.location.href;
        var current_page = window.location.pathname;
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.onreadystatechange = function(){
            if(xmlHTTP.readyState == 4 && xmlHTTP.status == 200){
                console.log(xmlHTTP.responseText);
                document.body.style.backgroundColor = xmlHTTP.responseText;
            }else{
                console.log(xmlHTTP.status);
            }
        }
        xmlHTTP.open('post','http://192.168.1.63:8080/');
        xmlHTTP.setRequestHeader('Content-Type', 'application/json');
        xmlHTTP.send(JSON.stringify({
            whole_url: whole_url,
            current_page: current_page
        }));
    }
})(window);

function getIndex(){
    var current_page = window.location.pathname;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText);
        }else{
            console.log(xhr.status);
        }
    }
    xhr.open('post','http://192.168.1.63:8080/script.js');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        current_page: current_page
    }));
}