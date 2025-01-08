const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const cheerio = require('cheerio');

const mysql = require('mysql2'); // Or any other database library

app.use(cors());
app.use(bodyParser.json());


// Replace with your actual database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quanta',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.post('/api/save-html', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).send({ message: 'Content is required.' });
  }

  const query = 'INSERT INTO quanta_table_builder (html_content) VALUES (?)';

  db.query(query, [content], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ message: 'Failed to save content.' });
    }

    res.status(200).send({ message: 'Content saved successfully.', id: results.insertId });
  });
});

const saveToDatabase = async (htmlContent) => {
  try {
    // Replace with actual database logic
    console.log("Storing HTML content to database...");
    console.log(htmlContent);
    // E.g., insert into `quanta_table_builder` table
  } catch (error) {
    console.error("Error saving to database:", error);
    throw error;
  }
};


// app.get('/check-selected', (req, res) => {
//   const query = 'SELECT COUNT(*) as count FROM builder WHERE Selected = 1';
  
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Database error');
//     }

//     const isAnySelected = results[0].count > 0;
//     res.json({ showTextList: isAnySelected ? 1 : 0 });
//   });
// });


app.get('/check-selected', (req, res) => {
  const query = 'SELECT COUNT(*) as count FROM builder WHERE Selected = 1';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    const isAnySelected = results[0].count > 0;
    res.json({ showTextList: isAnySelected ? 1 : 0 });
  });
});

// app.post('/write-to-file', (req, res) => {
//   const { content } = req.body;

//   // Append content to the file instead of overwriting it
//   fs.appendFile('../architect/public/storage/projects/1/Zz8G26FrLCkn5AcbeMpYrjuJWnygYleADwc1/output.html', content, (err) => {
//     if (err) {
//       console.error('Error appending to file:', err);
//       res.status(500).send('Error appending to file');
//     } else {
//       console.log('Content appended successfully');
//       res.status(200).send('Content appended successfully');
//     }
//   });
// });


app.post('/write-to-file', (req, res) => {
  const { content } = req.body;

  // Append content to the file instead of overwriting it
  fs.appendFile('output.html', content, (err) => {
    if (err) {
      console.error('Error appending to file:', err);
      res.status(500).send('Error appending to file');
    } else {
      console.log('Content appended successfully');
      res.status(200).send('Content appended successfully');
    }
  });
});



let showTextList = false; // Variable to track if showTextList should be true


app.post('/remove-element', (req, res) => {
  const { id } = req.body;
  const filePath = 'output.html';
  fs.readFile(filePath, 'utf-8', async (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }

    console.log(`File content before modification: \n${data}`);
    
    // Save current HTML to the database
    try {
      await saveToDatabase(data);
    } catch (saveError) {
      return res.status(500).send('Error saving to database');
    }

    const $ = cheerio.load(data);

    const element = $(`[data-arr-id='${id}']`);
    if (element.length > 0) {
      console.log(`Element with id '${id}' found. Removing...`);
      console.log(`Element content: ${element.html()}`);
      element.remove();

      showTextList = true;
    } else {
      console.log(`Element with id '${id}' not found.`);
      return res.status(404).send({ message: 'Element not found', showTextList });
    }

    const modifiedHtml = $.html();
    console.log(`File content after modification: \n${modifiedHtml}`);

    fs.writeFile(filePath, modifiedHtml, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).send('Error writing to file');
      }

      console.log(`Element with id '${id}' removed and file updated.`);
      res.send({ message: `Element with id '${id}' removed successfully`, showTextList });
    });
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
