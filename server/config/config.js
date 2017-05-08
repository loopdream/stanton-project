require('dotenv').config();

const Config = {
    trackHashtag: process.env.TRACK_HASHTAG,
    server: {
        host: 'localhost',
        port: 3000
    },
    twitterAPI: {
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	},
    database: {
    	localUrl: process.env.DB_URI_LOCAL,
    	prodUrl: process.env.DB_URI_PROD,
    	options: {  
    	   server:{  
    	      socketOptions:{  
    	         keepAlive:300000,
    	         connectTimeoutMS:30000
    	      }
    	   },
    	   replset:{  
    	      socketOptions:{  
    	         keepAlive:300000,
    	         connectTimeoutMS:30000
    	      }
    	   }
    	}
    }
};


module.exports = Config;