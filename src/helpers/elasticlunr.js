import elasticlunr from "elasticlunr";

export default class Elasticlunr {
  constructor(key, ...fields) {
    this.elasticlunr = elasticlunr();
    this.elasticlunr.setRef(key);
    fields.forEach(field => {
      this.elasticlunr.addField(field);
    });
  }

  addDocToIndex = doc => {
    this.elasticlunr.addDoc(doc);
  };

  searchFromIndex = query => {
    return this.elasticlunr.search(query, { expand: true });
  };
}
