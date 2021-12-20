import metascraper from "metascraper";
import metascraper_image from "metascraper-image";
import metascraper_title from "metascraper-title";
import metascraper_description from "metascraper-description";
import metascraper_url from "metascraper-url";
import got from "got";

const metascraperConfig = metascraper([
  metascraper_title(),
  metascraper_image(),
  metascraper_description(),
  metascraper_url(),
]);

const metaData = async (targetUrl) => {
  return new Promise(async (resolove, reject) => {
    try {
      const { body: html, url } = await got(targetUrl);
      const metadata = await metascraperConfig({ html, url });
      resolove(metadata);
    } catch (error) {
      console.log("error metaData ==>", error);
      reject(error);
    }
  });
};

export default metaData;
