import run from "aocrunner";

// parse to int
const parseInput = (rawInput: string) => rawInput.split("\n\n").map((elf) => elf.split("\n").map(calories => parseInt(calories)));

const part1 = (rawInput: string) => {
    const elves = parseInput(rawInput);
    let highestScore = 0;
    for (let i = 0; i < elves.length; i++) {
        const elf = elves[i];
        let score = 0;
        for (let j = 0; j < elf.length; j++) {
            const ingredient = elf[j];
            score += ingredient;
        }
        if (score > highestScore) {
            highestScore = score;
        }
    }
    return highestScore;
};

const part2 = (rawInput: string) => {
    const elves = parseInput(rawInput);
    const highestScores = [0, 0, 0];
    for (let i = 0; i < elves.length; i++) {
        const elf = elves[i];
        let score = 0;
        for (let j = 0; j < elf.length; j++) {
            const ingredient = elf[j];
            score += ingredient;
        }
        let elfBreak = false;
        for (let k = 0; k < highestScores.length; k++) {
            if (!elfBreak && score > highestScores[k]) {
                if (k === highestScores.length - 1) {
                    highestScores[k] = score;
                } else if (k === 0) {
                    highestScores[2] = highestScores[1];
                    highestScores[1] = highestScores[0];
                    highestScores[0] = score;
                } else {
                    highestScores[2] = highestScores[1];
                    highestScores[1] = score;
                }
                highestScores[k] = score;
                elfBreak = true;
            }
        }
    }
    return highestScores[0] + highestScores[1] + highestScores[2];
};

run({
    part1: {
        tests: [
            {
                input: `
                1000
                2000
                3000
                
                4000
                
                5000
                6000
                
                7000
                8000
                9000
                
                10000
                `,
                expected: 24000,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                1000
                2000
                3000
                
                4000
                
                5000
                6000
                
                7000
                8000
                9000
                
                10000
                `,
                expected: 45000,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
