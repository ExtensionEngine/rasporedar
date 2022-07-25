type HashmapKey = string | object;
type HashmapValue = object;

interface IHashmap {
  [key: string]: HashmapValue;

  get(key: HashmapKey): HashmapValue;
  set(key: HashmapKey, value: HashmapValue): void;
}

function Hashmap(): IHashmap {
  return {
    get(key: HashmapKey): HashmapValue {
      return this[JSON.stringify(key)];
    },
    set(key: HashmapKey, value: HashmapValue) {
      this[JSON.stringify(key)] = value;
    },
  };
}

export function generateSchedule(_p: any): any {
  const hm = Hashmap();

  hm.set([[1, 1, 2], 'a3'], ['matematika', 'mate', 3, 'c']);

  return hm.get([[1, 1, 2], 'a3']);
}
