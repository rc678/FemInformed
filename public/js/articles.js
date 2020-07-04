// endpoints
const education = "http://localhost:8080/education";
const violence = "http://localhost:8080/violence";
const workplace = "http://localhost:8080/workplace";
const reproduction = "http://localhost:8080/reproduction";
const media = "http://localhost:8080/media";

const topicList = [education, violence, workplace, reproduction, media]; // Array of URLs with necessary API parameters
let maxArticles = 10; // Number of articles to display in each topic
let currTopicIndex = 0; // Index of current topic that is being parsed

/*calls GUI and parsing files once static pages are loaded*/
$(document).ready(function() {
  if (topicList.length > 0) {
    // $("#ajaxIndicator").modal('show'); // Show loading modal. uncomment to enable loading modal

    getArticles(currTopicIndex);
  } else {
    console.log("No topics were defined!");
  }
});

// Retrieves a list of articles about the specified topic from NYTimes API.
function getArticles(topicIndex) {
  if (topicList[topicIndex]) {
    console.log("target api call: ", topicList[topicIndex]);
    $.ajax({
      url: topicList[topicIndex],
      method: "GET",
      dataType: "JSON",
      async: false,
      success: function(res) {
        console.log("response: ", res);
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
        console.log("http error:", err);
        throw err;
      }
    });
  }
}

// Parse API response to display articles on page.
function displayArticles(topicIndex, json) {
  for (let j = 0; j < maxArticles; j++) {
    if (json.response) {
      let headline = json.response.docs[j].headline.main;
      let url = json.response.docs[j].web_url;

      if (topicIndex == 0) {
        $("#edu").append('<a href="' + url + '">' + headline + "</a>" + "<br>");
      } else if (topicIndex == 1) {
        $("#viol").append(
          '<a href="' + url + '">' + headline + "</a>" + "<br>"
        );
      } else if (topicIndex == 2) {
        $("#work").append(
          '<a href="' + url + '">' + headline + "</a>" + "<br>"
        );
      } else if (topicIndex == 3) {
        $("#repr").append(
          '<a href="' + url + '">' + headline + "</a>" + "<br>"
        );
      } else if (topicIndex == 4) {
        $("#med").append('<a href="' + url + '">' + headline + "</a>" + "<br>");

        //$("#ajaxIndicator").modal('hide'); // Hide modal. uncomment if using loading modal
      }
    }
  }
}
