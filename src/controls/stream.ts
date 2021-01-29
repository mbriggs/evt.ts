import * as identity from "../identity";
import { v4 as uuid } from "uuid";

export function example() {
  return `${category()}-${id()}`;
}

export function uniqueExample() {
  return `${category()}-${uniqueId()}`;
}

export function uniqueCategory() {
  let category = `uniqueCategory${uuid().replace("-", "")}`;
  return category;
}

export function compoundIdExample() {
  return `${category()}-${cardinalId()}+${id()}`;
}

export function categoryWithTypeExample() {
  return `${category()}:${type()}`;
}

export function categoryWithTypesExample() {
  let [t1, t2] = types();
  return `${category()}:${t1}+${t2}`;
}

export function compoundCategoryTypeExample() {
  return `${categoryWithTypesExample()}-${id()}`;
}

export function category() {
  return "category";
}

export function id() {
  return "id";
}

export function uniqueId() {
  return identity.random();
}

export function cardinalId() {
  return "cardinal";
}

export function ids() {
  return ["idOne", "idTwo"];
}

export function type() {
  return "type";
}

export function types() {
  return ["typeOne", "typeTwo"];
}
