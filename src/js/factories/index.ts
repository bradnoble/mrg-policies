// factories.js

export default {
// extract docs (ie, include_docs = true) from Cloudant results
  extractRows(data: any) {
    if (data.rows) {
      return data.rows.map((row: any) => {
        return row.doc;
      });
    } else {
      // cloudant query returns data.docs, not data.rows
      return data.docs.map((row: any) => {
        return row;
      });
    }
  },
/*
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
*/
  getDocTypes() {
    return ['policy', 'clip', 'decision', 'precedent'];
  },
  getMonths() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months;
  },
  getDays() {
    const days = Array.from(Array(31).keys(), (x) => x + 1);
    // https://stackoverflow.com/questions/36947847/how-to-generate-range-of-numbers-from-0-to-n-in-es2015-only
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    return days;
  },
  getYears() {
    const start = 1995;
    const end = new Date().getFullYear();
    const length = end - start + 1;
    const array = new Array(length);
    for (let i = 0 ; i < array.length ; i++) {
      array[i] = start + i;
    }
    return array;
  },
  setDateToISOString(obj: any) {
    // console.log(obj)
    if (obj.month && obj.day && obj.year) {
      const localDateString = new Date(obj.month + ' ' + obj.day + ' ' + obj.year);
      return localDateString.toISOString();
    }
  },
  setDocDefaults() {
    let newId = new Date().toISOString();
    newId = newId.replace(/:/g, '-'); // replace colons
    newId = newId.replace('.', '-'); // replace period
    newId = 'item-' + newId;
    // format should now be: item-2019-08-22T14-37-25-748Z
    const doc = {
      _id: newId,
      title: '',
      type: 'policy',
      body: '',
      url: '',
      date: '',
      policies: [],
    };
    return doc;
  },
};
