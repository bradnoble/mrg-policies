// factories.js

export default {
// extract docs (ie, include_docs = true) from Cloudant results
  extractRows (data) {
    if (data.rows){
      return data.rows.map(function (row) {
        return row.doc;
      })  
    } else {
      // cloudant query returns data.docs, not data.rows
      return data.docs.map(function (row) {
        return row;
      })  
    }
  },
  splitDocsByType (docs, types){
    // new object to hold types dictionary
    let obj = {};
    // loop through types array and move docs by type into child object
    for(let i=0; i < types.length; i++){
      let type = types[i];
      obj[type] = [];
      docs.forEach((doc, index, array) => {
        if(type === doc.type){
          obj[type].push(doc);
        }
      })
    }
    console.log(obj);
    return docs;
  },
  getDocTypes (){
    return ["policy","clip","decision","precedent"];
  },
  getMonths (){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return months;
  },
  getDays (){
    let days = Array.from(Array(31).keys(), x => x + 1);
    // https://stackoverflow.com/questions/36947847/how-to-generate-range-of-numbers-from-0-to-n-in-es2015-only
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    return days;
  },
  getYears () {
    let start = 1995;
    let end = new Date().getFullYear();
    let length = end - start + 1;
    let array = new Array(length);
    for(let i=0; i < array.length; i++){
      array[i] = start + i;
    }
    return array;
  },
  setDateToISOString (obj) {
    // console.log(obj)
    if(obj.month && obj.day && obj.year){
      let localDateString = new Date(obj.month + ' ' + obj.day + ' ' + obj.year);
      return localDateString.toISOString();
    }
  },
  setDocDefaults (){
    let new_id = new Date().toISOString();
    new_id = new_id.replace(/:/g,'-'); // replace colons
    new_id = new_id.replace(".",'-'); // replace period
    new_id = 'item-' + new_id;
    // format should now be: item-2019-08-22T14-37-25-748Z
    let doc = {
      _id: new_id,
      title: '',
      type: 'policy',
      body: '',
      url: '',
      date: '',
      policies: []
    };
    return doc;
  }
}
