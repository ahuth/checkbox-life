export function step(values: boolean[], rowSize: number): boolean[] {
  // Clone the values so we don't modify the list we're counting, which would mess up the counts.
  const clone = values.slice();

  for (let i = 0; i < values.length; i++) {
    const neighborsCount = countNeihbors(i, rowSize, values);

    if (neighborsCount < 2) {
      clone[i] = false;
    } else if (neighborsCount === 3) {
      clone[i] = true;
    } else if (neighborsCount > 3) {
      clone[i] = false;
    }
  }

  return clone;
}

function countNeihbors(
  index: number,
  rowSize: number,
  values: readonly boolean[],
): number {
  const {x, y} = getCoordinates(index, rowSize);

  const n1 =
    values[
      getIndex(
        wrapAroundSize(x - 1, rowSize),
        wrapAroundSize(y - 1, rowSize),
        rowSize,
      )
    ];

  const n2 =
    values[
      getIndex(
        wrapAroundSize(x - 1, rowSize),
        wrapAroundSize(y, rowSize),
        rowSize,
      )
    ];

  const n3 =
    values[
      getIndex(
        wrapAroundSize(x - 1, rowSize),
        wrapAroundSize(y + 1, rowSize),
        rowSize,
      )
    ];

  const n4 =
    values[
      getIndex(
        wrapAroundSize(x, rowSize),
        wrapAroundSize(y - 1, rowSize),
        rowSize,
      )
    ];

  const n5 =
    values[
      getIndex(
        wrapAroundSize(x, rowSize),
        wrapAroundSize(y + 1, rowSize),
        rowSize,
      )
    ];

  const n6 =
    values[
      getIndex(
        wrapAroundSize(x + 1, rowSize),
        wrapAroundSize(y - 1, rowSize),
        rowSize,
      )
    ];

  const n7 =
    values[
      getIndex(
        wrapAroundSize(x + 1, rowSize),
        wrapAroundSize(y, rowSize),
        rowSize,
      )
    ];

  const n8 =
    values[
      getIndex(
        wrapAroundSize(x + 1, rowSize),
        wrapAroundSize(y + 1, rowSize),
        rowSize,
      )
    ];

  const v1 = n1 ? 1 : 0;
  const v2 = n2 ? 1 : 0;
  const v3 = n3 ? 1 : 0;
  const v4 = n4 ? 1 : 0;
  const v5 = n5 ? 1 : 0;
  const v6 = n6 ? 1 : 0;
  const v7 = n7 ? 1 : 0;
  const v8 = n8 ? 1 : 0;

  return v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
}

function getCoordinates(index: number, rowSize: number) {
  const y = Math.floor(index / rowSize);
  const x = index % rowSize;
  return {x, y};
}

function getIndex(x: number, y: number, rowSize: number): number {
  return y * rowSize + x;
}

function wrapAroundSize(coord: number, rowSize: number): number {
  if (coord < 0) {
    return rowSize - 1;
  }
  if (coord >= rowSize) {
    return 0;
  }
  return coord;
}
