const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; 

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  user: 'oussama',
  password: 'hout',
  connectString: 'localhost:1521/orcl'
};

app.get('/employee-sons', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT kh.employee_id, s.son_id, s.son_name, s.birth_date, s.study_institution,
         s.level_of_studies, s.class_name, s.grade_average, eus.canUpdate
  FROM khaddema kh
  JOIN khaddema_sghar ks ON kh.employee_id = ks.employee_id
  JOIN sghar s ON ks.son_id = s.son_id
  JOIN employeeupdatestatus eus ON kh.employee_id = eus.employeeId`
    );

    const employeeSonsData = result.rows.map(row => ({
      employeeId: row[0],
      sonId: row[1],
      sonName: row[2],
      birthDate: row[3],
      studyInstitution: row[4],
      levelOfStudies: row[5],
      className: row[6],
      gradeAverage: row[7],
      canUpdate: row[8]
    }));

    res.json({ success: true, data: employeeSonsData });

    await connection.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});



// server.js

app.post('/update-can-update', async (req, res) => {
  const { employeeId, canUpdate } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `UPDATE EmployeeUpdateStatus
       SET canUpdate = :canUpdate
       WHERE employeeId = :employeeId`,
      [canUpdate, employeeId]
    );

    if (result.rowsAffected > 0) {
      res.json({ success: true, message: 'Update status successfully' });
      await connection.execute(`COMMIT`);
    } else {
      res.json({ success: false, message: 'Failed to update status' });
    }

    await connection.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
