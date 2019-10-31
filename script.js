// Jack and Christian
// Pokedex API Project



//main function
// makes initial promise
var main = function()
{
    
    var dexPromise = d3.json(src="https://pokeapi.co/api/v2/pokedex/")
    dexPromise.then(success, fail);
    
    
}




// success and fail function for the pokedex promise
// input: data from the promise
// success: will grab the lists of pokedexs from the data change the title of index.html and the call makedex()
// fail: prints out failure and changes the title
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
                    .text(function(d) { return d.name})
                    .on("click", function(d)
                    {

                        selectedDex = d.url
                        
                        var url = createURL(selectedDex)
                                   
                        location.href = url

                    })
                        
                        
   
    
    
    
    
}



var createURL = function(pokedex)
{
    
    // removes "/pokedex" outside of github
    var url = "/pokedex" + "/pokeView.html" + "?" + "url=" + pokedex
    console.log(url)
    return url
    
    
    
    
}
   
    

    




main()


