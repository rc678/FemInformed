var education = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+in%2C+stem%2C+fields&api-key=25320373fddc49b89342139d9170eb07";
var violence = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+domestic%2C+violence&api-key=25320373fddc49b89342139d9170eb07";
var workplace =  "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+workplace&api-key=25320373fddc49b89342139d9170eb07";
var reproduction = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+politics&api-key=25320373fddc49b89342139d9170eb07";
var media = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+in%2C+media&api-key=25320373fddc49b89342139d9170eb07";

var apiCalls = [education, violence, workplace, reproduction, media];
var articles = [];

/*calls GUI and parsing files once static pages are loaded*/
$(document).ready(function(){

    var myVar; 
    for(var i = 0; i < 1; i++)
    {
        $.ajax({
            url: apiCalls[i],
            method: 'GET',
            dataType:'JSON',
            async: false,
            success: function(res)
            {
                myVar = res; 
            }
        }).fail(function(err) {
            throw err;
        });
        
        //console.log(myVar);
        articles.push(myVar);
    }
    
    console.log(articles);
    
    displayArticles();
    
});

function displayArticles()
{
    for(var i = 0; i < articles.length; i++)
    {
        for(var j = 0; j < 10; j++)
        {
            var headline = articles[i].response.docs[j].headline.main;
            $('#education').append('<p>' + headline + '</p>' + '<br>');
        }

    }
   
}



