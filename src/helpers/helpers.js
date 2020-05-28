export const objectToArray =(data)=>{
    let array = []
                  for (const key in data) {
                     array.push({...data[key], id: key })
                   
                }
    return array
}
export const createDataTree = dataset => {
    
    let hashTable = Object.create(null);
    
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    
     let dataTree = [];
    dataset.forEach(a => {
       
      if (a.parentId) {
         hashTable[a.parentId].childNodes.push(hashTable[a.id])// it happening because of mutations
       }
        else {
            dataTree.push(hashTable[a.id])      
        }
        
     });
    
    return dataTree
};