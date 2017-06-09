import DateFormat from 'dateformat';
import $ from 'jquery';
import { template } from 'lodash';


class PollTweet {

  constructor($el) {

  		this.config = {
  			tweetTemplate: "<blockquote class='twitter-tweet' data-lang='en' id='<%= tweetId %>''><p lang='en' dir='ltr' class='twitter-tweet__tweet'><%= tweet %></p><i class='fa fa-twitter' aria-hidden='true'></i> — <span class='twitter-tweet__userHandle'>@<%= userHandle %></span> • <span class='twitter-tweet__userName'><%= userName %></span><span class='twitter-tweet__date'><%= date %></span></blockquote>",
  			interval: 10000,
        fadeTime: 600,
  			latestTweetUrl: window.location.origin + "/tweet/latest/1",
  			dateFormat: "mmmm dS yyyy H:MM TT",
        selectors: {
          tweet: '.twitter-tweet'
        },
        classNames: {
          active: 'is-active',
          fadeOut: 'fade-out'
        }
  		}

      this.poll(this.config.latestTweetUrl);

  }


  poll(url) {
  	
    console.log('Polling...');

  	let _this = this;
    let cfg = _this.config;

  	this.ajax({
  	  url: url,
  	  type: 'get',
  	  contentType: 'application/json; charset=utf-8'
  	}).then(
  	  function fulfillHandler(data) {

        _this.pollSuccess(data);

        setTimeout(() => {
          _this.poll(cfg.latestTweetUrl) 
        }, cfg.interval);

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
    let cfg = _this.config;
    let $main = $('main');

    if (data.length) {

      console.log('Tweet received...');

      data[0].date = DateFormat(data[0].date, _this.config.dateFormat);
      let template = _this.compileTemplate(data[0]);
      let $currentTweet = $(cfg.selectors.tweet + '.' + cfg.classNames.active);
   
      if ($currentTweet.length) {

        $currentTweet.addClass(cfg.classNames.fadeOut);

        setTimeout(()=> {

          $currentTweet.remove();
          $main.append(template);

          setTimeout(()=> {
            $main.find('#' + data[0].tweetId).addClass(cfg.classNames.active);
          }, 100 );

        }, cfg.fadeTime);

      } else {

        $main.append(template);
      
        setTimeout(()=> {
          $main.find('#' + data[0].tweetId).addClass(cfg.classNames.active);
        }, cfg.fadeTime);

      }
      
    } else {
      console.log('No tweet received...');
    }
  }



 	compileTemplate(data) {
 		let compiled = template(this.config.tweetTemplate);
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

