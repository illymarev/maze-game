import kruskalsAlgorithm from "../../algorithms/generation/kruskalsAlgorithm";
import huntAndKillAlgorithm from "../../algorithms/generation/huntAndKillAlgorithm";
import recursiveBacktracking from "../../algorithms/generation/recursiveBacktracking";

const generationAlgorithmOptions = [
    {
        id: 0,
        title: "Kruskal's algorithm (no current highlight)",
        relatedFunction: kruskalsAlgorithm.bind(null, false)
    },
    {
        id: 1,
        title: "Kruskal's algorithm (current highlighted)",
        relatedFunction: kruskalsAlgorithm.bind(null, true)
    },
    {
        id: 2,
        title: 'Hunt and Kill Algorithm',
        relatedFunction: huntAndKillAlgorithm
    },
    {
        id: 3,
        title: 'Recursive Backtracking',
        relatedFunction: recursiveBacktracking
    }
]

export default generationAlgorithmOptions