// @ts-check
//  <ImportConfiguration>
const CosmosClient = require("@azure/cosmos").CosmosClient;
//  </ImportConfiguration>

class ForestCosmos {
    /**
     * @param {any} endpoint
     * @param {any} key
     * @param {any} databaseId
     * @param {any} containerId
     * @param {any} partitionKey
     */
    constructor(endpoint,key,databaseId,containerId,partitionKey){
        this.endpoint = endpoint;
        this.key = key;
        this.databaseId = databaseId;
        this.containerId = containerId;
        this.partitionKey = partitionKey;
    }

    async create(client) {
    
      const partitionKey = this.partitionKey;
  
    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
      id: this.databaseId
    });
    console.log(`Created database:\n${database.id}\n`);
  
    /**
     * Create the container if it does not exist
     */
    const { container } = await client
      .database(this.databaseId)
      .containers.createIfNotExists(
        { id: this.containerId, partitionKey },
        { offerThroughput: 400 }
      );
  
    console.log(`Created container:\n${container.id}\n`);
  }
  

 async main(req,res) {
  
  // <CreateClientObjectDatabaseContainer>
  const endpoint = this.endpoint 
  const key = this.key

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(this.databaseId);
  const container = database.container(this.containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await this.create(client);
  // </CreateClientObjectDatabaseContainer>
  
  try {
    // <QueryItems>
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT * from c"
    };
    
    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    // for(var i = 0; i < items.length; i++){
    //     console.log(`${items[i].id} - ${items[i].temperature}`);
    // }
    
    return items;
  } catch (err) {
    console.log("ths is an error message")
    console.log(err.message);
  }
}
    // </QueryItems>
    
    // <CreateItem>
    // async createValue(newItem){
    //   const endpoint = this.endpoint 
    //   const key = this.key
    
    //   const client = new CosmosClient({ endpoint, key });
    
    //   const database = client.database(this.databaseId);
    //   const container = database.container(this.containerId);
    
    //   // Make sure Tasks database is already setup. If not, create it.
    // const { resource: createdItem } = await container.items.create(newItem);
    
    // console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
    // }
    //</CreateItem>
    
    // <UpdateItem>
    //const { id, category } = createdItem;

    //createdItem.isComplete = true;

    //const { resource: updatedItem } = await container
      //.item(id, category)
      //.replace(createdItem);

    //console.log(`Updated item: ${updatedItem.id} - ${updatedItem.description}`); 
    //console.log(`Updated isComplete to ${updatedItem.isComplete}\r\n`);
    // </UpdateItem>
    
    // <DeleteItem>    
    /**
   * Create new item
   * newItem is defined at the top of this file
   * Update item
   * Pull the id and partition key value from the newly created item.
   * Update the isComplete field to true.
   * Delete item
   * Pass the id and partition key value to delete the items
   * 
   */
    async deleteItem(id) {
    console.log(id);
    let uid = String(id);
    const endpoint = this.endpoint 
    const key = this.key

    const client = new CosmosClient({ endpoint, key });

    const database = client.database(this.databaseId);
    const container = database.container(this.containerId);
    const { resource: result } = await container.item(uid,uid).delete();
    // </DeleteItem>  
    }
}

module.exports = ForestCosmos;
