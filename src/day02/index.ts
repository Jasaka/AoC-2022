import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(line => line.split(" "));


let scoreValues: number[] = [];
scoreValues["win"] = 6;
scoreValues["draw"] = 3;
scoreValues["loss"] = 0;

let shapeValues: number[] = [];
shapeValues["rock"] = 1;
shapeValues["paper"] = 2;
shapeValues["scissors"] = 3;

let playerInput: string[] = [];
playerInput["A"] = "rock";
playerInput["B"] = "paper";
playerInput["C"] = "scissors";

const determineWin = (opponentShape: "rock" | "paper" | "scissors", ownShape: "rock" | "paper" | "scissors") => {
    if (ownShape === opponentShape) {
        return "draw";
    }

    switch (ownShape) {
        case "rock":
            return opponentShape === "paper" ? "loss" : "win";
        case "paper":
            return opponentShape === "scissors" ? "loss" : "win";
        case "scissors":
            return opponentShape === "rock" ? "loss" : "win";
    }
}

const determineScore = (shape: "rock" | "paper" | "scissors", result: "win" | "loss" | "draw") => {
    return shapeValues[shape] + scoreValues[result];
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    playerInput["X"] = "rock";
    playerInput["Y"] = "paper";
    playerInput["Z"] = "scissors";

    let score = 0;
    for (let i = 0; i < input.length; i++) {
        const [opponentShape, ownShape] = input[i];
        const result = determineWin(playerInput[opponentShape], playerInput[ownShape]);
        score += determineScore(playerInput[ownShape], result);
    }

    return score;
};

let result: string[] = [];
result["X"] = "loss";
result["Y"] = "draw";
result["Z"] = "win";

const determineOwnShape = (opponentShape: "rock" | "paper" | "scissors", intendedResult: "loss" | "draw" | "win") => {
    switch (opponentShape) {
        case "rock":
            return intendedResult === "loss" ? "scissors" : intendedResult === "draw" ? "rock" : "paper";
        case "paper":
            return intendedResult === "loss" ? "rock" : intendedResult === "draw" ? "paper" : "scissors";
        case "scissors":
            return intendedResult === "loss" ? "paper" : intendedResult === "draw" ? "scissors" : "rock";
    }
}

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let score = 0;
    for (let i = 0; i < input.length; i++) {
        const [opponentShape, intendedResult] = input[i];
        const ownShape = determineOwnShape(playerInput[opponentShape], result[intendedResult]);
        score += determineScore(ownShape, result[intendedResult]);
    }
    return score;
};

run({
    part1: {
        tests: [
            {
                input: `
                A Y
                B X
                C Z
                `,
                expected: 15,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
                A Y
                B X
                C Z
                `,
                expected: 12,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
