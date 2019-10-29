
var main = function()
{
    
    var urlParameter = window.location.search.substring(1)
    
    var url = parseSTR(urlParameter) 
    
    
     console.log(url)
    var pokePromise = d3.json(src=url)     

    console.log(pokePromise)
    pokePromise.then(success, fail);


}




var success = function(data)
{
    
   var pokemon = data.pokemon_entries
   d3.select("#titleOfDex").text("Choose a Pokemon")
    
    
    d3.select("#pokemonholder")
        .selectAll("div")
        .data(pokemon)
        .enter()
        .append("div")
        .text(function(d) { return d.pokemon_species.name})
        .attr("class", "pokemonEntry")
        .on("click", function(d) {
        
        console.log(d)
        makeInfoView(d)
        
        
    })
 
    
    
}



var fail = function(data)
{
    
    console.log("didnt work");
    d3.select("#titleOfDex").text("not working")

}

var parseSTR = function(url)
{
    
    var strList = url.split("=")
    console.log(strList)
    return strList[1]
    
    
    
}

var makeInfoView = function(pokemon)
{
    
    
    
    remove()
    d3.select("#infoholder").append("div").text(pokemon.pokemon_species.name).attr("id", "pokeName")
    d3.select("#infoholder").append("div").text(pokemon.entry_number).attr("id", "pokeNum")
    
    
    
    
    
}



var remove = function()
{
     d3.selectAll("#infoholder *").remove()
    
    
    
}



main()