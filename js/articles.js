const API_KEY = process.env.API_KEY;

const education = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+in%2C+stem%2C+fields&sort=newest&api-key={API_KEY}";
const violence = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+domestic%2C+violence&sort=newest&api-key=9621e1c0d91e4e05a60c0c7cb41cbf59";
const workplace =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+workplace&sort=newest&api-key=9621e1c0d91e4e05a60c0c7cb41cbf59";
const reproduction = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+abortion&sort=newest&api-key=9621e1c0d91e4e05a60c0c7cb41cbf59";
const media = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=women%2C+in%2C+media%2Csexism&sort=newest&api-key=9621e1c0d91e4e05a60c0c7cb41cbf59";

const topicList = [education, violence, workplace, reproduction, media]; // Array of URLs with necessary API parameters
let maxArticles = 10; // Number of articles to display in each topic
let currTopicIndex = 0; // Index of current topic that is being parsed

/*calls GUI and parsing files once static pages are loaded*/
$(document).ready(function(){
    if (topicList.length > 0) {
        // $("#ajaxIndicator").modal('show'); // Show loading modal. uncomment to enable loading modal

        getArticles(currTopicIndex);
    } else {
        console.log("No topics were defined!");
    }
});

// Retrieves a list of articles about the specified topic from NYTimes API.
function getArticles(topicIndex) {
    $.ajax({
        url: topicList[topicIndex],
        method: 'GET',
        dataType:'JSON',
        async: false,
        success: function(res)
        {
            displayArticles(topicIndex, res);

            // If there are more topics then get those articles
            if (currTopicIndex < topicList.length) {
                currTopicIndex++;

                setTimeout(function() {
                    getArticles(currTopicIndex);
                }, 1000);
            }
        },
        error: function(err) {
            throw err;
        }
    });
}

// Parse API response to display articles on page.
function displayArticles(topicIndex, json)
{
    for(let j = 0; j < maxArticles; j++)
    {
        let headline = json.response.docs[j].headline.main;
        let url = json.response.docs[j].web_url;

        if (topicIndex == 0) {
            $('#edu').append('<a href="' + url + '">' + headline + '</a>' + '<br>');
        }
        else if (topicIndex == 1) { 
            $('#viol').append('<a href="' + url + '">' + headline + '</a>' + '<br>');
        }
        else if (topicIndex == 2) { 
            $('#work').append('<a href="' + url + '">' + headline + '</a>' + '<br>');
        }
        else if (topicIndex == 3) { 
            $('#repr').append('<a href="' + url + '">' + headline + '</a>' + '<br>');
        }
        else if (topicIndex == 4) { 
            $('#med').append('<a href="' + url + '">' + headline + '</a>' + '<br>');

            //$("#ajaxIndicator").modal('hide'); // Hide modal. uncomment if using loading modal
        }
    }
}