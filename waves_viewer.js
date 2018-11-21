var matches = "";
var waves = [];

$(document).ready(function(){
    loadJSON();

    $('#searchbox').keyup(function(){
        populateUl(search(this.value));
        
    });
});

function loadJSON(){
    $.getJSON('./waves.json', function(data){
        waves = data;
        var v = $("#searchbox").val();
        populateUl(search(v));
    });
}

function search(query){
    return waves.filter(function(x){
        return x.name.toLowerCase().includes(query);
    });//.slice(0, 10);
}

function populateUl(results){
    var list = $('.results-list');
    list.empty();
    for(var i of results){
        list.append(`<li>${i.name}: ${i.cost}</li>`);
    }
}
