import fetch from "node-fetch";
import { parseString } from "xml2js";
import _ from "lodash";
export default (function RssParsify () {
  const parseHTML = (element) => {
    return element
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&#039;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "-")
      .replace(/&#8230;/g, "...")
      .replace(/&#8216;/g, "'")
      .replace(/&#8212;/g, "—")
      .replace(/&#39;/g, "'")
      .replace(/&#32;/g, " ")
  };
  const parseToJSON = async (feedUrl) => {
    const apiToParse = `https://api.allorigins.win/get?url=${feedUrl}`;
    const response = await fetch(apiToParse);
    const rssData = await response.json();
    var jsonData = {}
    parseString(rssData.contents , function (err, result) {
      jsonData = result;
    }); 
    var parsedData = {};
    parsedData = [..._.flatMapDeep(jsonData.feed?.entry), ..._.flatMapDeep(jsonData.rss?.channel[0]?.item)];

    return parsedData;
  };
  return {
    parseToJSON,
    parseHTML
  }
})();