var main = function()
{
    
    var dexPromise = d3.json(src="https://pokeapi.co/api/v2/pokedex/")
    dexPromise.then(success, fail);
    
    
}




//make success
//make fail
var success = function(data)
{
    
    
    var pokedex = data.results
   
    d3.select("#title").text("Choose a Pokedex")
    makeDex(pokedex)
    
    
}



var fail = function(data)
{
    
    console.log("didnt work");
    d3.select("#title").text("not working")

}







var makeDex = function(data)
{
    
    var pokedex = d3.select("#dexHolder")
                    .selectAll("div")
                    .data(data)
                    .enter()
                    .append("div")
                    .attr("class", "pokedex")
                    .append("a")
                    .text(function(d) { return d.name})
                    .attr("href", "/pokeView.html")
                    .attr("class", "pokedexName") 
                    .on("click", function(d){
                        

                        transferData(d.url)

                    })
                        
                        
                        
                    

}



var transferData = function(data)
{
    console.log("hello")
    window.html("/pokeView.html")
    var pokePromise = d3.json(src=data)
    pokePromise.then(pokeSuccess, pokeFail);
    
    
     
    
    
}



var pokeSuccess = function(data)
{
    
    
   var pokemon = data.pokemon_entries
   console.log(pokemon);
   d3.select("#titleOfDex").text(" working")
    
    
    
}



var pokeFail = function(data)
{
    
    console.log("didnt work");
    d3.select("#titleOfDex").text("not working")

}


main()


