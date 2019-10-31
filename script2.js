
var main = function()
{
    
    var urlParameter = window.location.search.substring(1)
    
    var url = parseSTR(urlParameter) 
    
    
    console.log(url)
    var pokePromise = d3.json(src=url)     

  
    pokePromise.then(success, fail);


}




var success = function(data)
{
    
   var pokemon = data.pokemon_entries
   d3.select("#titleOfDex").text("Choose a Pokemon")
   makeAlphebet(pokemon)
   createSideBar(pokemon)

        
        
    
 
    
    
}



var fail = function(data)
{
    
    console.log("didnt work on loaidng new page");
    d3.select("#titleOfDex").text("not working")

}

var createSideBar = function(pokemon)
{
    
       removeSide()
       d3.select("#pokemonholder")
        .selectAll("div")
        .data(pokemon)
        .enter()
        .append("div")
        .text(function(d) { return d.pokemon_species.name})
        .attr("class", "pokemonEntry")
        .on("click", function(d) {
        makeInfoView(d)
       })
        
    
    
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
    d3.select("#infoholder").append("div").text(pokemon.pokemon_species.name).attr("class", "pokeInfo").attr("id", "pokeName")
    d3.select("#infoholder").append("div").text("#"+pokemon.entry_number).attr("class", "pokeInfo").attr("id", "pokeNum")
    
    
    var pokeSpeciesPromise = d3.json(pokemon.pokemon_species.url)
    
    pokeSpeciesPromise.then(specSuccess, specFail)
    
    
    
    
    
    
}

// success and faile for the pokeSpeciesPromis
var specSuccess = function(data)
{
    
    
    d3.select("#infoholder").append("div").text("Capture Rate: " +data.capture_rate).attr("class", "pokeInfo").attr("id", "capRate")
    d3.select("#infoholder").append("div").text(data.generation.name).attr("class", "pokeInfo").attr("id", "genInfo")
    
   
    if (data.habitat != null)
        {
            d3.select("#infoholder").append("div").text("Found in " + data.habitat.name).attr("class", "pokeInfo").attr("id", "pokeHab")
        }
    
    var pokemonPromise = d3.json(data.varieties[0].pokemon.url)
    pokemonPromise.then(pokemonSuccess, pokemonFail)
    
}
var specFail = function(data)
{
    
    console.log("Fail on loading pokemon Species")
    
}





// success and fail for pokemonPromise
var pokemonSuccess = function(data)
{
    
    
    d3.select("#infoholder").append("div").text("Height= " + data.height + " / " + "Weight= " + data.weight).attr("class", "pokeInfo").attr("id", "hwInfo")
    
    
    
    
    var pokeTypes = data.types.map(getType)
    var pokeTypesLen = pokeTypes.length
    if (pokeTypesLen == 1)
        {
            d3.select("#infoholder").append("div").text("Types: " + pokeTypes[0]).attr("class", "pokeInfo").attr("id", "typeInfo")
            
            
            
        }
    else // if pokeTypesLen == 2
        {
            d3.select("#infoholder").append("div").text("Types: " + pokeTypes[1] + ", " + pokeTypes[0]).attr("class", "pokeInfo").attr("id", "typeInfo")
        
        
        
        
        
        }
    
    d3.select("#infoholder").append("div").attr("class", "pokeInfo").attr("id", "picInfo").append("img").attr("src", data.sprites.front_default)
    
}


var getType = function(type)
{
    
    return type.type.name
    
    
    
    
    
    
}




var pokemonFail = function(data)
{
    
    console.log("didnt work when loading up the pokemon")
    
}




var remove = function()
{
     d3.selectAll("#infoholder *").remove()
    
    
    
}
var removeSide = function()
{
    d3.selectAll("#pokemonholder *").remove()
    
    
    
}

// search bar functions
var makeAlphebet = function(data)
{
        
    
    
 var search = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "all"]
 
 d3.select("#searchBar").selectAll("span").data(search).enter().append("span").text(function(d){return d}).attr("class", "searchKey")
     .on("click", function(d)
{
     if(d=="all")
         {
             createSideBar(data)  
         }
     else
         {
     var newList = data.filter(function(j)
                {
         
         return j.pokemon_species.name.charAt(0) == d
         
         
         
                })
     createSideBar(newList)
        }
     
     
 })


}






main()