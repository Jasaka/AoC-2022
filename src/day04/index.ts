import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(assignments => assignments.split(',').map(assignment => assignment.split('-').map(number => parseInt(number))));

const testAssignmentOverlap = (assignment: number[][], mode: "full" | "partial" = "full") => {
  const [first, second] = assignment;
  let [firstStart, firstEnd] = first;
  let [secondStart, secondEnd] = second;

  if (firstStart <= secondStart && firstEnd >= secondEnd) {
    return true;
  }

  if (secondStart <= firstStart && secondEnd >= firstEnd) {
    return true;
  }

  if (mode === "partial") {
    if (firstStart <= secondStart && firstEnd >= secondStart) {
      return true;
    }

    if (secondStart <= firstStart && secondEnd >= firstStart) {
      return true;
    }
  }

  return false;
}

const part1 = (rawInput: string) => {
  const assignments = parseInput(rawInput);
  let overlaps: number = 0;

  for (const assignment of assignments) {
    if (testAssignmentOverlap(assignment)) {
      overlaps++;
    }
  }

  return overlaps;
};

const part2 = (rawInput: string) => {
  const assignments = parseInput(rawInput);
  let overlaps: number = 0;

  for (const assignment of assignments) {
    if (testAssignmentOverlap(assignment, "partial")) {
      overlaps++;
    }
  }

  return overlaps;
};

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
