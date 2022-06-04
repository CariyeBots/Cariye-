const { search, getVideo, getPlaylist } = require('youtube-sr').default;
const play = require("play-dl");
//const { getPreview } = require('spotify-url-info');

play.setToken({ spotify: { client_id: process.env.sid, client_secret: process.env.ssecret, refresh_token: process.env.stoken, market: 'US' } });
play.refreshToken();


if (play.is_expired()) play.refreshToken();

class Utils {
  /**
  * Check if string is url
  * @param {String} string
  * @returns {Boolean}
  */
  static isUrl(string) {
    return /(https?:\/\/[^ ]*)/.test(string);
  }

  /**
  * Search videos
  * @param {String} query
  * @param {Integer} limit
  * @returns {Array<Object>}
  */
  static async search(query, limit) {
    const videos = await search(query, { limit: limit ?? 25 });

    return videos.map(video => ({ name: video.title, value: video.url }));
  }

  /**
  * Get a video
  * @param {String} url
  * @returns {Object}
  */
  static async getVideo(url) {
    let video;

    if (/^(https?:\/\/)?(www\.)?(m\.|music\.)?(youtube\.com|youtu\.?be)\/.+$/g.test(url) && !/^.*(list=)([^#\&\?]*).*/gi.test(url)) video = [await getVideo(url)];
    if (/^.*(list=)([^#\&\?]*).*/gi.test(url)) {
      video = await (await (await getPlaylist(url)).fetch()).videos;
    }
    else if (/^.*(https:\/\/open\.spotify\.com\/track)([^#\&\?]*).*/gi.test(url)) {
			await play.refreshToken()
			let sp_data = await play.spotify("https://open.spotify.com/track/xxx")
			let searched = await play.search(`${sp_data.name}`, {imit: 1})
      /*const preview = await getPreview(url);
      const videoName = `${preview.title} - ${preview.artist}`;*/
      const videoUrl = searched[0].url //await (Utils.search(videoName, 1))[0].value;
      if(!videoUrl) videoUrl = await (Utils.search('Never gonna give you up', 1))[0].value;

      video = [await Utils.getVideo(videoUrl)];
    }

    return video;
  }
}

module.exports = Utils;