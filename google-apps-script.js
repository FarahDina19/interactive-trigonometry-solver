// ========== GOOGLE APPS SCRIPT FOR DATA COLLECTION ==========
// Copy this code into Google Apps Script and deploy as Web App
// Tutorial: https://script.google.com > New Project > Paste this code

// Step 1: Get or create the active spreadsheet
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Create sheets if they don't exist
    createSheetIfNotExists(ss, 'Responses');
    createSheetIfNotExists(ss, 'Summary');

    // Get the Responses sheet
    const responsesSheet = ss.getSheetByName('Responses');

    // Add data to Responses sheet
    addResponsesToSheet(responsesSheet, payload);

    // Update Summary sheet
    updateSummarySheet(ss, payload);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data recorded successfully',
      count: payload.responses.length
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Create sheet if it doesn't exist
function createSheetIfNotExists(ss, sheetName) {
  if (!ss.getSheetByName(sheetName)) {
    ss.insertSheet(sheetName);
  }
}

// Add responses to the sheet
function addResponsesToSheet(sheet, payload) {
  const headers = [
    'Timestamp', 'Student Name', 'Student ID', 'Class',
    'Question', 'Difficulty', 'Student Answer', 'Correct Answer',
    'Status', 'Used Hint', 'Time Submitted'
  ];

  // Check if headers exist
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  if (!firstRow[0] || firstRow[0] !== 'Timestamp') {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#6366f1');
    sheet.getRange(1, 1, 1, headers.length).setFontColor('white');
  }

  // Add response rows
  payload.responses.forEach(response => {
    const row = [
      payload.timestamp,
      payload.studentName,
      payload.studentID,
      payload.studentClass || '',
      response.questionText,
      response.difficulty,
      response.userAnswer,
      response.correctAnswer,
      response.isCorrect ? 'Correct' : 'Incorrect',
      response.usedHint ? 'Yes' : 'No',
      response.timestamp
    ];
    sheet.appendRow(row);
  });

  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

// Update summary sheet with statistics
function updateSummarySheet(ss, payload) {
  const sheet = ss.getSheetByName('Summary');

  // Clear existing data (keep headers)
  const maxRows = sheet.getMaxRows();
  if (maxRows > 1) {
    sheet.deleteRows(2, maxRows - 1);
  }

  // Add headers if not exist
  const headers = sheet.getRange(1, 1, 1, 8).getValues()[0];
  if (!headers[0] || headers[0] !== 'Student Name') {
    sheet.getRange(1, 1, 1, 8).setValues([[
      'Student Name', 'Student ID', 'Class', 'Total Responses',
      'Correct Answers', 'Score %', 'Hints Used', 'Last Updated'
    ]]);
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    sheet.getRange(1, 1, 1, 8).setBackground('#764ba2');
    sheet.getRange(1, 1, 1, 8).setFontColor('white');
  }

  // Calculate statistics
  const totalResponses = payload.responses.length;
  const correctAnswers = payload.responses.filter(r => r.isCorrect).length;
  const scorePercentage = totalResponses > 0 ? ((correctAnswers / totalResponses) * 100).toFixed(1) : 0;
  const hintsUsed = payload.responses.filter(r => r.usedHint).length;

  const summaryRow = [
    payload.studentName,
    payload.studentID,
    payload.studentClass || '',
    totalResponses,
    correctAnswers,
    scorePercentage + '%',
    hintsUsed,
    new Date().toLocaleString('ms-MY')
  ];

  sheet.appendRow(summaryRow);
  sheet.autoResizeColumns(1, 8);
}

// Deploy as Web App
// 1. Click Deploy > New Deployment
// 2. Type: Web app
// 3. Execute as: Your email
// 4. Who has access: Anyone
// 5. Copy the deployment URL
// 6. Paste into app's "Google Sheet URL" field

// ========== OPTIONAL: FORM SUBMISSION FUNCTION ==========
// Use this if you want to add a custom menu
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Data Collection')
    .addItem('Clear All Data', 'clearAllData')
    .addItem('Generate Report', 'generateReport')
    .addToUi();
}

function clearAllData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const responsesSheet = ss.getSheetByName('Responses');
  if (responsesSheet) {
    const range = responsesSheet.getDataRange();
    range.clearContent();
  }
}

function generateReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const summarySheet = ss.getSheetByName('Summary');
  const responsesSheet = ss.getSheetByName('Responses');

  if (!summarySheet || !responsesSheet) {
    SpreadsheetApp.getUi().alert('Summary or Responses sheet not found');
    return;
  }

  const ui = SpreadsheetApp.getUi();
  ui.alert('Report generated successfully!');
}
