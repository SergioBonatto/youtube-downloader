"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const VideoDownloader_1 = require("./components/VideoDownloader");
const App = () => {
    return (react_1.default.createElement(react_2.ChakraProvider, null,
        react_1.default.createElement(VideoDownloader_1.VideoDownloader, null)));
};
exports.App = App;
