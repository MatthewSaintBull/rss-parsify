import fetch from "node-fetch";

export default (function RssParsify () {
  const htmlParser = (element) => {
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
      .replace(/&#8212;/g, "—");
  };
  const parseToJSON = async (feedUrl) => {
    const apiToParse = `https://api.allorigins.win/get?url=${feedUrl}`;
    const response = await fetch(apiToParse);
    const rssData = await response.json();
    const rssIntoJSON = rssData.contents
      .match(/<channel>([\s\S]*?)<\/channel>/)[1]
      .match(/<item>([\s\S]*?)<\/item>/g);
    var parsedData = [];
    rssIntoJSON.map((item) => {
      const article = {
        title: htmlParser(item.match(/<title>([\s\S]*?)<\/title>/)[1]),
        link: item.match(/<link>([\s\S]*?)<\/link>/)[1],
        description: htmlParser(
          item
            .match(/<description>([\s\S]*?)<\/description>/)[1]
            .split("<![CDATA[")[1]
            .split("]]>")[0]
        ),
      };
      parsedData.push(article);
    });
    return parsedData;
  };
  return {
    parseToJSON,
  }
})();