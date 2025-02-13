import RoutesHub, { SubDomainRoute } from "../RoutesHub";

export const subDomainList = [
  { subdomain: "www", app: RoutesHub, main: true }, //This is for application
  { subdomain: "url", app: SubDomainRoute, main: false }, //This is for short-url routing
];
