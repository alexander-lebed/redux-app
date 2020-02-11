module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "src/components/**/*.js",
        "src/redux/**/*.js"
    ],
    testURL: "http://localhost/",
    testMatch: [
        "**/__tests__/?(*.)@(spec|test).js"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js",
        "\\.(css|scss)$": "<rootDir>/assetsTransformer.js"
    },
    setupFilesAfterEnv: [
        "<rootDir>/src/helpers/configureEnzyme.js"
    ]
}