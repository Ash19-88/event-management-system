const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  const bupa = await cds.connect.to("API_BUSINESS_PARTNER");

  this.on("READ", "Foo", async (req) => {
    try {
      console.log("Query:", JSON.stringify(req.query));
      const result = await bupa.run(req.query);
      return result;
    } catch (error) {
      console.error("Error during READ operation:", error.message);
      req.reject(500, "Error fetching data from API_BUSINESS_PARTNER");
    }
  });

  this.on("CREATE", "Foo", async (req) => {
    try {
      const payload = req.data; 
      console.log("Payload:", payload);

 
      const result = await bupa.post("/A_BusinessPartner", payload);

      return result;
    } catch (error) {
      console.error("Error during CREATE operation:", error.message);
      req.reject(500, "Error creating data in API_BUSINESS_PARTNER");
    }
  });

  this.on("POST", "createParticipant", async (req) => {
    const { firstName, lastName, email, phone, businessPartnerID } = req.data;
    const result = await bupa.run({
      INSERT: 'Bupa.Participants',
      data: { firstName, lastName, email, phone, businessPartnerID }
    });
    return result;
  });
});
