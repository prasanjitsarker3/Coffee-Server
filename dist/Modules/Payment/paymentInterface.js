"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueId = void 0;
function generateUniqueId() {
    return "id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
exports.generateUniqueId = generateUniqueId;
