import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(backpack => [backpack.slice(0, backpack.length / 2), backpack.slice(backpack.length / 2, backpack.length)].map(compartment => compartment.split('')));

const getItemPriority = (item: string): number => {
  const charCode = item.charCodeAt(0);
  if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  } else if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  }
  return 0;
}

const part1 = (rawInput: string) => {
  const backpacks = parseInput(rawInput);
  const commonItems: string[] = [];
  for (let i = 0; i < backpacks.length; i++) {
    const backpack = backpacks[i];
    const commonItem: string = backpack[0].filter((item: string) => backpack[1].includes(item)).slice(0, 1)[0];
    commonItems.push(commonItem);
  }

  return commonItems.reduce((acc, commonItem) => acc + getItemPriority(commonItem), 0);
};

const part2 = (rawInput: string) => {
  const backpacks = parseInput(rawInput);
  const badges: string[] = [];
  for (let i = 0; i < backpacks.length; i += 3) {
    const backpack1 = [...backpacks[i][0], ...backpacks[i][1]];
    const backpack2 = [...backpacks[i + 1][0], ...backpacks[i + 1][1]];
    const backpack3 = [...backpacks[i + 2][0], ...backpacks[i + 2][1]];
    const badge: string = backpack1.filter((item: string) => backpack2.includes(item) && backpack3.includes(item)).slice(0, 1)[0];
    badges.push(badge);
  }

  return badges.reduce((acc, badge) => acc + getItemPriority(badge), 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
