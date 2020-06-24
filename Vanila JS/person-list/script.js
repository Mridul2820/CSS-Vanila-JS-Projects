

// 13:59 / 24:49


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var people = response.people;

        var output = '';
        for(var i = 0;i < people.length;i++){
            output += '<li><h2>'+people[i].name+'</h2><p>'+people[i].age+'</p></li>';
        }
        document.getElementById('people').innerHTML = output;
    }
};
xhttp.open("GET", "people.json", true);
xhttp.send();