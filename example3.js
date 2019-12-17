// "Product Clicked"
// https://www.algolia.com/doc/guides/getting-insights-and-analytics/connectors/segment/#product-clicked

const Analytics = require("analytics-node");
const analytics = new Analytics("tFt32JIMKi1qCNcQvD7uHPSRJ5a50dND");

const algoliasearch = require("algoliasearch");
const client = algoliasearch("latency", "af044fb0788d6bb15f807e4420592bc5");
const indexName = "instant_search";
const index = client.initIndex(indexName);

index.search({ query: "S", clickAnalytics: true }, (err, result) => {
  // Let's assume that `result.hits` are sent to frontend
  // and user clicked the first item.

  // ...

  // Now the code below will send an event to Segment
  // along with the information of the first item.
  const hit = result.hits[0];
  analytics.track({
    event: "Product Clicked",
    userId: "user1", // Segment contextual parameters used by Algolia
    properties: {
      product_id: hit.objectID, // Segment parameters used by Algolia
      sku: hit.objectID,
      category: hit.categories[0],
      name: hit.name,
      brand: hit.brand,
      variant: undefined,
      price: hit.price,
      quantity: 1,
      coupon: undefined,
      position: 0, // Segment parameters used by Algolia
      url: undefined,
      image_url: hit.image,
      index: indexName, // Extra parameters required by Algolia
      queryID: result.queryID // Extra parameters required by Algolia
    }
  });
});
