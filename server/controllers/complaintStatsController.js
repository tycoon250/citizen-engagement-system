import db from "../config/db.js";

export const getCitizenStats = (req, res) => {
    const userId = req.params.userId;
  
    const statsQuery = `
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved,
        SUM(CASE WHEN id IN (SELECT complaint_id FROM responses) THEN 1 ELSE 0 END) AS replied
      FROM complaints
      WHERE user_id = ?
    `;
  
    db.query(statsQuery, [userId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch stats' });
  
      const row = results[0];
      res.status(200).json({
        total: row.total,
        pending: row.pending,
        resolved: row.resolved,
        replied: row.replied
      });
    });
  };
  export const getAgencyStats = (req, res) => {
    const userId = req.params.userId;
    const getAgencyIdQuery = `SELECT agency_id FROM users WHERE id = ? `;
  
    db.query(getAgencyIdQuery, [userId], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: 'No agency assigned to this user' });
      }
  
      const agencyId = results[0].agency_id;

      const statsQuery = `
        SELECT 
          COUNT(*) AS total,
          SUM(CASE WHEN status = 'in_review' THEN 1 ELSE 0 END) AS in_review,
          SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved,
          SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected
        FROM complaints
        WHERE agency_id = ?
      `;
  
      db.query(statsQuery, [agencyId], (err, statsResults) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch stats' });
  
        const row = statsResults[0];
        res.status(200).json({
          total: row.total,
          in_review: row.in_review,
          resolved: row.resolved,
          rejected: row.rejected
        });
      });
    });
  };
  
  