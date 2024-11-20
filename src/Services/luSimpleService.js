export const luSimpleMockResponse = {
    stages: [
        {
            stage: 0,
            matrix: [
                [4, -1, 0, 3],
                [1, 15.5, 3, 8],
                [0, -1.3, -4, 1.1],
                [14, 5, -2, 30],
            ],
        },
        {
            stage: 1,
            matrix: [
                [4, -1, 0, 3],
                [0, 15.75, 3, 7.25],
                [0, -1.3, -4, 1.1],
                [0, 8.5, -2, 19.5],
            ],
        },
        {
            stage: 2,
            matrix: [
                [4, -1, 0, 3],
                [0, 15.75, 3, 7.25],
                [0, 0, -3.752381, 1.698413],
                [0, 0, -3.619048, 15.587302],
            ],
        },
        {
            stage: 3,
            matrix: [
                [4, -1, 0, 3],
                [0, 15.75, 3, 7.25],
                [0, 0, -3.752381, 1.698413],
                [0, 0, 0, 13.949239],
            ],
        },
    ],
    L: [
        [1, 0, 0, 0],
        [0.25, 1, 0, 0],
        [0, -0.08254, 1, 0],
        [3.5, 0.539683, 0.964467, 1],
    ],
    U: [
        [4, -1, 0, 3],
        [0, 15.75, 3, 7.25],
        [0, 0, -3.752381, 1.698413],
        [0, 0, 0, 13.949239],
    ],
    x: [0.525109, 0.255459, -0.41048, -0.281659],
};

export const getLuSimpleResults = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(luSimpleMockResponse);
        }, 500); // Simulate network latency
    });
};
