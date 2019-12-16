// "Product List Viewed"
// https://www.algolia.com/doc/guides/getting-insights-and-analytics/connectors/segment/#product-list-viewed

const Analytics = require("analytics-node");
const analytics = new Analytics("tFt32JIMKi1qCNcQvD7uHPSRJ5a50dND");

const algoliasearch = require("algoliasearch");
const client = algoliasearch("latency", "af044fb0788d6bb15f807e4420592bc5");
const indexName = "instant_search";
const index = client.initIndex(indexName);

index.search({ query: "S", clickAnalytics: true }, (err, result) => {
  // Let's assume that `result.hits` are sent to frontend
  // and user viewed the list.

  // ...

  // Now the code below will send an event to Segment
  // along with the information of the list.
  analytics.track({
    event: "Product List Viewed",
    userId: "user1", // Segment contextual parameters used by Algolia
    properties: {
      list_id: undefined,
      category: undefined,
      products: result.hits.map((hit, position) => ({
        product_id: hit.objectID, // Segment parameters used by Algolia
        sku: hit.objectID,
        category: hit.categories[0],
        name: hit.name,
        brand: hit.brand,
        variant: hit.type,
        price: hit.price,
        quantity: 1,
        coupon: undefined,
        position: position,
        url: hit.url,
        image_url: hit.image
      })),
      index: indexName // Extra parameters required by Algolia
    }
  });
});
