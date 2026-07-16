const Visitor = require('../models/Visitor');
const Workspace = require('../models/Workspace');

exports.getVisitors = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const visitors = await Visitor.find({ workspaceId }).sort({ lastActive: -1 });
    res.json({ success: true, data: visitors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createVisitor = async (req, res) => {
  try {
    const { workspaceId, name, email, phone, company, status } = req.body;
    if (!workspaceId || !name) {
      return res.status(400).json({ success: false, error: "workspaceId and name are required" });
    }

    // Verify user has access to this workspace
    if (!req.user || !req.user.workspaces.includes(workspaceId.toString())) {
      return res.status(403).json({ error: "Access denied" });
    }

    const visitor = new Visitor({
      workspaceId,
      name,
      email: email || undefined,
      phone: phone || undefined,
      company: company || undefined,
      status: status || 'Lead',
      browser: 'Manual Entry',
      os: 'Manual Entry',
    });
    await visitor.save();
    res.json({ success: true, data: visitor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, company, status } = req.body;

    const visitor = await Visitor.findById(id);
    if (!visitor) return res.status(404).json({ success: false, error: "Visitor not found" });

    // Verify user has access to this workspace
    if (!req.user || !req.user.workspaces.includes(visitor.workspaceId.toString())) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (name) visitor.name = name;
    if (email !== undefined) visitor.email = email;
    if (phone !== undefined) visitor.phone = phone;
    if (company !== undefined) visitor.company = company;
    if (status) visitor.status = status;

    await visitor.save();
    res.json({ success: true, data: visitor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export contacts as CSV (for Google Sheets import)
exports.exportContactsCSV = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const visitors = await Visitor.find({ workspaceId }).sort({ lastActive: -1 });

    // Build CSV content
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Status', 'IP Address', 'Browser', 'OS', 'Location', 'Last Active', 'Created At'];
    
    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      // Wrap in quotes if contains comma, quote, or newline
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = visitors.map(v => [
      escapeCSV(v.name || 'Anonymous Visitor'),
      escapeCSV(v.email || ''),
      escapeCSV(v.phone || ''),
      escapeCSV(v.company || ''),
      escapeCSV(v.status || 'Lead'),
      escapeCSV(v.ipAddress || ''),
      escapeCSV(v.browser || ''),
      escapeCSV(v.os || ''),
      escapeCSV(v.location || ''),
      escapeCSV(v.lastActive ? new Date(v.lastActive).toISOString() : ''),
      escapeCSV(v.createdAt ? new Date(v.createdAt).toISOString() : '')
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="xiachat-contacts-${workspaceId}-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
