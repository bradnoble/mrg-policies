//transform.js
//used with couchimport
var x = function (doc) {
  // deal with related policies
  if (doc.policies) {
    // turn comma separated string into an array
    if(doc.policies.indexOf(',') > -1){
      let array = doc.policies.split(',');
      doc.policies = array;  
    }
    if(doc.type == "policy"){
      doc.policies = [];
    }
  } else if (!doc.policies){
    // ensure that the value is an array, even if empty
    doc.policies = [];
  }
  // set a date_updated
  if(!doc.date_updated || doc.date_updated == ''){
    let date_updated = new Date().toISOString();
    doc.date_updated = date_updated;
  }
  // make sure date is formatted as ISOstring
  if(doc.date){
    let date = new Date(doc.date).toISOString();
    doc.date = date;
  }
  return doc
}

module.exports = x
