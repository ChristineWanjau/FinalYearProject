// @ts-check

const config = {
    endpoint: "https://forestcosmos.documents.azure.com:443/",
    key: "1uWwl9GVVeKGToYjIUrcvU9nWiTBbXelXQV4H3kV3hQ8AX9rGUfgf1TdjZVHkTm1ns47v02HUoRqNFkp8iMjBA==",
    databaseId: "forestGuarddb",
    containerId: "Alerts",
    partitionKey: { kind: "Hash", paths: ["/id"] }
  };
  
module.exports = config;