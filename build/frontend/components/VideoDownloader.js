"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoDownloader = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const axios_1 = __importDefault(require("axios"));
const VideoDownloader = () => {
    const [url, setUrl] = (0, react_1.useState)('');
    const [format, setFormat] = (0, react_1.useState)('video');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const toast = (0, react_2.useToast)();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios_1.default.post('http://localhost:3000/api/download', {
                url,
                format
            });
            toast({
                title: 'Success!',
                description: 'Download started successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }
        catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to start download',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (react_1.default.createElement(react_2.Container, { maxW: "container.md", py: 10 },
        react_1.default.createElement(react_2.VStack, { spacing: 6 },
            react_1.default.createElement(react_2.Text, { fontSize: "2xl", fontWeight: "bold" }, "YouTube Downloader"),
            react_1.default.createElement(react_2.Box, { as: "form", w: "100%", onSubmit: handleSubmit },
                react_1.default.createElement(react_2.VStack, { spacing: 4 },
                    react_1.default.createElement(react_2.FormControl, null,
                        react_1.default.createElement(react_2.Input, { placeholder: "Paste YouTube URL here", value: url, onChange: (e) => setUrl(e.target.value), size: "lg" })),
                    react_1.default.createElement(react_2.FormControl, null,
                        react_1.default.createElement(react_2.RadioGroup, { value: format, onChange: setFormat },
                            react_1.default.createElement(react_2.HStack, { spacing: 4 },
                                react_1.default.createElement(react_2.Radio, { value: "video" }, "Video (MP4)"),
                                react_1.default.createElement(react_2.Radio, { value: "audio" }, "Audio (MP3)")))),
                    react_1.default.createElement(react_2.Button, { colorScheme: "red", isLoading: isLoading, loadingText: "Downloading...", w: "100%", type: "submit", disabled: !url },
                        "Download ",
                        format === 'video' ? 'Video' : 'Audio'))))));
};
exports.VideoDownloader = VideoDownloader;
