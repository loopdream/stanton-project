require('es6-promise').polyfill();
import DateFormat from 'dateformat';
import $ from 'jquery';
import _ from 'lodash';


class TweetUpdate {


  constructor($el) {

  		this.config = {
  			tweetTemplate: "<blockquote class='twitter-tweet' data-lang='en' id='<%= tweetId %>''><p lang='en' dir='ltr' class='twitter-tweet__tweet'><%= tweet %></p><i class='fa fa-twitter' aria-hidden='true'></i> — <span class='twitter-tweet__userHandle'>@<%= userHandle %></span> • <span class='twitter-tweet__userName'><%= userName %></span><span class='twitter-tweet__date'><%= date %></span></blockquote>",
  			timer: 20000,
  			latestTweetUrl: window.location.origin + "/tweet/latest/1",
  			updateTweetUrl: window.location.origin + "/tweet/latest/1",
  			dateFormat: "mmmm dS yyyy H:MM TT"
  		}

  		this.currentTweet = this.nextTweet = null;
  		this.getTweet(this.config.latestTweetUrl);

  }


  getTweet(url) {
  	
  	const _this = this;

  	this.ajax({
  	  url: url,
  	  type: 'get',
  	  contentType: 'application/json; charset=utf-8'
  	}).then(
  	  function fulfillHandler(data) {
  	    console.log(data[0]);
  	   	let oTweet = data[0];
  	    oTweet.date = DateFormat(oTweet.date, _this.config.dateFormat);
  	    let template = _this.compileTemplate(data[0]);
  	    $('main').html(template);
  	  },
  	  function rejectHandler(jqXHR, textStatus, errorThrown) {
  	    console.log("something went very bad");
  	  }
  	).catch(function errorHandler(error) {
  	  console.log("Exception: ", error);
  	});

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
	new TweetUpdate();
});