const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'controllers');
const files = fs.readdirSync(controllersDir);

files.forEach(file => {
    const filePath = path.join(controllersDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regular expression to match the demo workspace bypass blocks
    // Example:
    // if (workspaceId === "demo-workspace-123") {
    //    const w = await Workspace.findOne();
    //    if (w) workspaceId = w._id; // or wId = w._id
    // }
    const regex1 = /[ \t]*if[ \t]*\([A-Za-z]+[ \t]*===[ \t]*["']demo-workspace-123["']\)[ \t]*\{[\s\S]*?if[ \t]*\([A-Za-z]+\)[ \t]*[A-Za-z]+[ \t]*=[ \t]*[A-Za-z]+\._id(?:\.toString\(\))?;?[ \t]*\n[ \t]*\}/g;
    
    // Another pattern for visitorController/chatController where it checks access denied
    // if (conversation.workspaceId.toString() !== "demo-workspace-123") {
    //   return res.status(403).json({ error: "Access denied" });
    // }
    const regex2 = /[ \t]*if[ \t]*\([a-zA-Z0-9_.]+\.toString\(\)[ \t]*!==[ \t]*["']demo-workspace-123["']\)[ \t]*\{[\s\S]*?res\.status\(403\).*?\}[\s\S]*?\}/g;

    // Pattern for getConversations
    // if (workspaceId === "demo-workspace-123") {
    //    query = {}; // fetch all or leave empty for demo
    // }
    const regex3 = /[ \t]*if[ \t]*\([A-Za-z]+[ \t]*===[ \t]*["']demo-workspace-123["']\)[ \t]*\{[\s\S]*?query[ \t]*=[ \t]*\{\};.*?\}?/g;

    const regex4 = /[ \t]*if[ \t]*\([a-zA-Z0-9_.]+\.toString\(\)[ \t]*!==[ \t]*["']demo-workspace-123["']\)[ \t]*\{[ \t]*return res\.status\(403\).*?\}/g;

    const originalContent = content;
    content = content.replace(regex1, '');
    content = content.replace(regex2, 'return res.status(403).json({ error: "Access denied" });');
    content = content.replace(regex3, '');
    content = content.replace(regex4, 'return res.status(403).json({ error: "Access denied" });');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

// Also check middleware/auth.js
const authMwPath = path.join(__dirname, 'middleware', 'auth.js');
let mwContent = fs.readFileSync(authMwPath, 'utf8');
const mwRegex = /[ \t]*if[ \t]*\(workspaceId[ \t]*===[ \t]*["']demo-workspace-123["']\)[ \t]*\{[\s\S]*?return next\(\);[ \t]*\}/g;
mwContent = mwContent.replace(mwRegex, '');
fs.writeFileSync(authMwPath, mwContent, 'utf8');
console.log('Updated auth.js middleware');
