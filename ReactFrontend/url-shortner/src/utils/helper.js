import { subDomainList } from "./constant";

//It's purpose is to route based on their subdomain on urls
export const getApp = () => {
  const subdomain = getSubdomain(window.location.hostname);

  const mainApp = subDomainList.find((app) => app.main);
  if (subdomain === "") return mainApp.app; //return main app

  const apps = subDomainList.find((app) => subdomain === app.subdomain);

  return apps ? apps.app : mainApp.app; //if subdomain is not null or "www" return redirected url
};

//It's pupose is to get subdomain from urls
export const getSubdomain = (location) => {
  /**
   * First the location is splitted into parts on the basis of ".".Then we wiil check wheather the last part is localhost or not.If it is localhost(ex-> url.localhost:5413) then we will slice 0->-1 to get the subdomain else if this is a production grade application(ex-> url.something.com) then we need to slice till -2.
   */
  const partitionedLocation = location.split(".");
  const isLocalhost = partitionedLocation.slice(-1)[0] === "localhost";
  const sliceTill = isLocalhost ? -1 : -2;
  return partitionedLocation.slice(0, sliceTill).join("");
};
