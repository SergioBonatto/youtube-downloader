"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const downloadController_1 = require("../controllers/downloadController");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const downloadController = new downloadController_1.DownloadController();
router.post('/download', [
    (0, express_validator_1.body)('url')
        .isURL()
        .withMessage('Invalid URL')
        .matches(/^https?:\/\/(www\.)?youtube\.com/)
        .withMessage('URL must be from YouTube')
], (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, downloadController.download);
exports.default = router;
