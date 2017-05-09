require('es6-promise').polyfill();
import DateFormat from 'dateformat';
import $ from 'jquery';
import _ from 'lodash';


class PollTweet {

  constructor($el) {

  		this.config = {
  			tweetTemplate: "<blockquote class='twitter-tweet' data-lang='en' id='<%= tweetId %>''><p lang='en' dir='ltr' class='twitter-tweet__tweet'><%= tweet %></p><i class='fa fa-twitter' aria-hidden='true'></i> — <span class='twitter-tweet__userHandle'>@<%= userHandle %></span> • <span class='twitter-tweet__userName'><%= userName %></span><span class='twitter-tweet__date'><%= date %></span></blockquote>",
  			interval: 1000,
  			latestTweetUrl: window.location.origin + "/tweet/latest/1",
  			dateFormat: "mmmm dS yyyy H:MM TT"
  		}

      this.poll(this.config.latestTweetUrl);

  }


  poll(url) {
  	
  	let _this = this;

  	this.ajax({
  	  url: url,
  	  type: 'get',
  	  contentType: 'application/json; charset=utf-8'
  	}).then(
  	  function fulfillHandler(data) {
        _this.pollSuccess(data);
  	  },
  	  function rejectHandler(jqXHR, textStatus, errorThrown) {
  	    console.log("something went very bad");
  	  }
  	).catch(function errorHandler(error) {
  	  console.log("Exception: ", error);
  	});

  }


  pollSuccess(data) {

    let _this = this;
    
    if (data.length) {
      data[0].date = DateFormat(data[0].date, _this.config.dateFormat);
      let template = _this.compileTemplate(data[0]);
      $('main').html(template);
    }

    setTimeout(() => {
      _this.poll(_this.config.latestTweetUrl) 
    }, _this.config.interval);

  }



 	compileTemplate(data) {
 		let compiled = _.template(this.config.tweetTemplate);
 		return compiled(data);
 	}


  ajax(options) {
    return new Promise(function (resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
  }


}



$(function(){
	new PollTweet();
});