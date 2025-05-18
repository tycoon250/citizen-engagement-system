import db from '../config/db.js';

export const submitComplaint = (req, res) => {
  const { user_id, category, description } = req.body;

  const agencyQuery = 'SELECT id FROM agencies WHERE category = ? LIMIT 1';
  db.query(agencyQuery, [category], (err, agencyResult) => {
    if (err || agencyResult.length === 0) {
      return res.status(404).json({ message: 'No matching agency found' });
    }

    const agency_id = agencyResult[0].id;
    const insertQuery = `INSERT INTO complaints (user_id, agency_id, category, description) VALUES (?, ?, ?, ?)`;

    db.query(insertQuery, [user_id, agency_id, category, description], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error submitting complaint' });

      res.status(201).json({ message: 'Complaint submitted', complaint_id: result.insertId });
    });
  });
};

export const getComplaintsByUser = (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM complaints WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch complaints' });
    res.status(200).json(results);
  });
};

export const respondToComplaint = (req, res) => {
  const complaintId = req.params.id;
  const { responder_id, message } = req.body;

  const insertResponse = `INSERT INTO responses (complaint_id, responder_id, message) VALUES (?, ?, ?)`;
  const updateStatus = `UPDATE complaints SET status = 'in_review' WHERE id = ?`;

  db.query(insertResponse, [complaintId, responder_id, message], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to respond' });

    db.query(updateStatus, [complaintId], (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update complaint status' });

      res.status(200).json({ message: 'Response added and status updated' });
    });
  });
};
export const getComplaintsWithResponsesByUser = (req, res) => {
    const userId = req.params.userId;
  
    const sql = `
      SELECT c.id AS complaint_id, c.category, c.description, c.status, c.created_at,
             r.message AS response_message, r.created_at AS response_time, u.name AS responder_name
      FROM complaints c
      LEFT JOIN responses r ON c.id = r.complaint_id
      LEFT JOIN users u ON r.responder_id = u.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC, r.created_at ASC
    `;
  
    db.query(sql, [userId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch data' });
      const grouped = {};
      results.forEach(row => {
        if (!grouped[row.complaint_id]) {
          grouped[row.complaint_id] = {
            complaint_id: row.complaint_id,
            category: row.category,
            description: row.description,
            status: row.status,
            created_at: row.created_at,
            responses: [],
          };
        }
        if (row.response_message) {
          grouped[row.complaint_id].responses.push({
            responder: row.responder_name,
            message: row.response_message,
            time: row.response_time,
          });
        }
      });
  
      res.status(200).json(Object.values(grouped));
    });
  };
  export const getComplaintsByAgency = (req, res) => {
    const userId = req.params.userId;
    const getAgencyIdQuery = `SELECT agency_id FROM users WHERE id = ? `;
  
    db.query(getAgencyIdQuery, [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'No agency assigned to this user' });
        }
    
        const agencyId = results[0].agency_id;

    
        const sql = `
        SELECT c.id, c.user_id, u.name AS citizen_name, c.category, c.description, c.status, c.created_at
        FROM complaints c
        JOIN users u ON c.user_id = u.id
        WHERE c.agency_id = ?
        ORDER BY c.created_at DESC
        `;
    
        db.query(sql, [agencyId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch agency complaints' });
        res.status(200).json(results);
        });
    })  
  };
  export const updateComplaintStatus = (req, res) => {
    const complaintId = req.params.id;
    const { status } = req.body;
    const allowedStatuses = ['in_review', 'resolved', 'rejected', 'closed'];
  
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  
    db.query(
      'UPDATE complaints SET status = ? WHERE id = ?',
      [status, complaintId],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Failed to update status' });
        res.status(200).json({ message: 'Complaint status updated' });
      }
    );
  };
  
  