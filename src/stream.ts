export const ID_SEPARATOR = "-";
export const COMPOUND_ID_SEPARATOR = "+";
export const CATEGORY_TYPE_SEPARATOR = ":";
export const COMPOUND_TYPE_SEPARATOR = "+";

export interface Name {
  category: string;
  cardinalId: string;
  id: string;
  ids: string[];
  type: string;
  types: string[];
}

export function name(data: Partial<Name>) {
  if (!data.category) {
    throw new Error("category is required to build a stream name");
  }

  let name = data.category;
  let types = [];

  if (data.type) {
    types.push(data.type);
  }

  if (data.types) {
    types = types.concat(data.types);
  }

  if (types.length > 0) {
    let typesPart = types.join(COMPOUND_TYPE_SEPARATOR);
    name += CATEGORY_TYPE_SEPARATOR + typesPart;
  }

  let ids = [];

  if (data.cardinalId) {
    ids.push(data.cardinalId);
  }

  if (data.id) {
    ids.push(data.id);
  }

  if (data.ids) {
    ids = ids.concat(data.ids);
  }

  if (ids.length > 0) {
    let idPart = ids.join(COMPOUND_ID_SEPARATOR);
    name += ID_SEPARATOR + idPart;
  }

  return name;
}

export function entity(streamName: string) {
  let [cat, _id] = split(streamName);
  return cat;
}

export function split(name: string): [string, string] {
  let parts = name.split(ID_SEPARATOR, 2);

  if (parts.length == 1) {
    return [name, ""];
  }

  return [parts[0], parts[1]];
}

export function getId(stream: string): string {
  let [_, id] = split(stream);
  return id;
}

export function getIds(stream: string): string[] {
  let id = getId(stream);
  if (!id) {
    return [];
  }

  return id.split(COMPOUND_ID_SEPARATOR);
}

export function getCategory(stream: string): string {
  let [category, _] = split(stream);
  return category;
}

export function isCategory(stream: string): boolean {
  return !stream.includes(ID_SEPARATOR);
}

export function getCategoryType(stream: string): string {
  let [category, _id] = split(stream);
  let [_category, type] = category.split(CATEGORY_TYPE_SEPARATOR, 2);

  return type || "";
}

export function getCategoryTypes(stream: string): string[] {
  let type = getCategoryType(stream);
  if (!type) {
    return [];
  }

  return type.split(COMPOUND_TYPE_SEPARATOR);
}
