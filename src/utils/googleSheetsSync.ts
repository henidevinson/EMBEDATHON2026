import { RegistrationRecord } from '../types';

/**
 * EXACT Google Sheet Header Structure provided by the organizer:
 * Timestamp,Team Name,Team Leader Name,Team Leader Email,Team Leader Phone Number,How many members are in your team?,
 * Member 1 Full Name,Member 1 Email Address,Member 1 Phone Number,Member 1 College / Institution,Member 1 Department,Member 1 Year of Study,
 * Member 2 Full Name,Member 2 Email Address,Member 2 Phone Number,Member 2 College / Institution,Member 2 Department,Member 2 Year of Study,
 * Member 3 Full Name,Member 3 Email Address,Member 3 Phone Number,Member 3 College / Institution,Member 3 Department,Member 3 Year of Study,
 * Member 4 Full Name,Member 4 Email Address,Member 4 Phone Number,Member 4 College / Institution,Member 4 Department,Member 4 Year of Study,
 * Payment Transaction ID / UTR Number,Payment Screenshot,I confirm that all the information provided is correct and that all listed team members are participating in EMBEDATHON 2026.
 */
export const GOOGLE_SHEET_HEADERS = [
  'Timestamp',
  'Team Name',
  'Team Leader Name',
  'Team Leader Email',
  'Team Leader Phone Number',
  'How many members are in your team?',
  'Member 1 Full Name',
  'Member 1 Email Address',
  'Member 1 Phone Number',
  'Member 1 College / Institution',
  'Member 1 Department',
  'Member 1 Year of Study',
  'Member 2 Full Name',
  'Member 2 Email Address',
  'Member 2 Phone Number',
  'Member 2 College / Institution',
  'Member 2 Department',
  'Member 2 Year of Study',
  'Member 3 Full Name',
  'Member 3 Email Address',
  'Member 3 Phone Number',
  'Member 3 College / Institution',
  'Member 3 Department',
  'Member 3 Year of Study',
  'Member 4 Full Name',
  'Member 4 Email Address',
  'Member 4 Phone Number',
  'Member 4 College / Institution',
  'Member 4 Department',
  'Member 4 Year of Study',
  'Payment Transaction ID / UTR Number',
  'Payment Screenshot',
  'I confirm that all the information provided is correct and that all listed team members are participating in EMBEDATHON 2026.',
];

/**
 * Maps a single RegistrationRecord to the exact 33-column row array
 */
export function recordToGoogleSheetRow(r: RegistrationRecord): string[] {
  const isSolo = r.teamSize === '1 Member' || r.participantCount === 1;

  const m1 = r.member1 || {
    fullName: r.leaderName || '',
    email: r.email || '',
    phoneNumber: r.leaderMobile || '',
    college: r.collegeName || '',
    department: 'ECE',
    yearOfStudy: '3rd Year',
  };

  const m2 = !isSolo && (r.member2 || (r.member2Name ? {
    fullName: r.member2Name || '',
    email: r.member2Contact?.includes('@') ? r.member2Contact : '',
    phoneNumber: (!r.member2Contact?.includes('@') && r.member2Contact) ? r.member2Contact : '',
    college: r.collegeName || '',
    department: 'ECE',
    yearOfStudy: '3rd Year',
  } : null));

  const m3 = r.member3 || (r.member3Name ? {
    fullName: r.member3Name || '',
    email: r.member3Contact?.includes('@') ? r.member3Contact : '',
    phoneNumber: (!r.member3Contact?.includes('@') && r.member3Contact) ? r.member3Contact : '',
    college: r.collegeName || '',
    department: 'ECE',
    yearOfStudy: '3rd Year',
  } : null);

  const m4 = r.member4 || (r.member4Name ? {
    fullName: r.member4Name || '',
    email: r.member4Contact?.includes('@') ? r.member4Contact : '',
    phoneNumber: (!r.member4Contact?.includes('@') && r.member4Contact) ? r.member4Contact : '',
    college: r.collegeName || '',
    department: 'ECE',
    yearOfStudy: '3rd Year',
  } : null);

  return [
    r.timestamp || new Date().toISOString().replace('T', ' ').substring(0, 19),
    r.teamName || '',
    r.leaderName || '',
    r.email || '',
    r.leaderMobile || '',
    r.teamSize || `${r.participantCount} Member${r.participantCount > 1 ? 's' : ''}`,
    // Member 1
    m1.fullName,
    m1.email,
    m1.phoneNumber,
    m1.college,
    m1.department,
    m1.yearOfStudy,
    // Member 2
    m2 ? m2.fullName : '',
    m2 ? m2.email : '',
    m2 ? m2.phoneNumber : '',
    m2 ? m2.college : '',
    m2 ? m2.department : '',
    m2 ? m2.yearOfStudy : '',
    // Member 3
    m3 ? m3.fullName : '',
    m3 ? m3.email : '',
    m3 ? m3.phoneNumber : '',
    m3 ? m3.college : '',
    m3 ? m3.department : '',
    m3 ? m3.yearOfStudy : '',
    // Member 4
    m4 ? m4.fullName : '',
    m4 ? m4.email : '',
    m4 ? m4.phoneNumber : '',
    m4 ? m4.college : '',
    m4 ? m4.department : '',
    m4 ? m4.yearOfStudy : '',
    // Payment
    r.transactionId || '',
    r.screenshotName || (r.screenshotUrl ? 'Payment_Screenshot_Attached' : 'N/A'),
    // Declaration
    r.declared ? 'Yes, I confirm' : 'Yes',
  ];
}

/**
 * Generates CSV string matching the exact Google Sheet columns
 */
export function generateGoogleSheetCsv(records: RegistrationRecord[]): string {
  const escapeCsv = (val: string) => {
    const stringVal = String(val ?? '');
    if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
      return `"${stringVal.replace(/"/g, '""')}"`;
    }
    return stringVal;
  };

  const headerLine = GOOGLE_SHEET_HEADERS.map(escapeCsv).join(',');
  const rowLines = records.map((r) => {
    const row = recordToGoogleSheetRow(r);
    return row.map(escapeCsv).join(',');
  });

  return [headerLine, ...rowLines].join('\r\n');
}

/**
 * Generates TSV (Tab-Separated Values) for 1-click clipboard paste into Google Sheets
 */
export function generateGoogleSheetTsv(records: RegistrationRecord[], includeHeader = true): string {
  const sanitize = (val: string) => String(val ?? '').replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
  const rows = records.map((r) => recordToGoogleSheetRow(r).map(sanitize).join('\t'));

  if (includeHeader) {
    const headerLine = GOOGLE_SHEET_HEADERS.map(sanitize).join('\t');
    return [headerLine, ...rows].join('\n');
  }
  return rows.join('\n');
}

export const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxU2i7qEQz0GnD5ZkahjnGvV5ku7aWbbltQOg8Nwv3fVbt9dvdNxwLApO-1dU6kjLRv/exec';

/**
 * Sends a registration record to a Google Apps Script Web App Webhook
 */
export async function sendRegistrationToGoogleSheet(
  record: RegistrationRecord,
  webhookUrl?: string
): Promise<{ success: boolean; message: string }> {
  const targetUrl = (webhookUrl && webhookUrl.trim().startsWith('http'))
    ? webhookUrl.trim()
    : DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;

  const row = recordToGoogleSheetRow(record);

  try {
    // Mode no-cors is standard when calling Google Apps Script Web Apps from browser JS
    await fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'appendRow',
        timestamp: record.timestamp,
        teamName: record.teamName,
        row: row,
        headers: GOOGLE_SHEET_HEADERS,
      }),
    });

    return { success: true, message: 'Registration successfully transmitted to Google Sheet.' };
  } catch (err: any) {
    console.error('Error syncing with Google Sheet webhook:', err);
    return { success: false, message: err?.message || 'Failed to connect to Google Sheet.' };
  }
}

/**
 * Ready-to-deploy Google Apps Script code for the organizer's Google Sheet
 */
export const GOOGLE_APPS_SCRIPT_WEBAPP_CODE = `/**
 * EMBEDATHON 2026 - Automatic Google Sheet Live Receiver
 * 
 * INSTRUCTIONS TO CONNECT YOUR GOOGLE SHEET IN 60 SECONDS:
 * 1. Open your Google Sheet in your browser.
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Delete any code in the editor, and paste this entire script.
 * 4. Click the "Save" icon (or Ctrl+S).
 * 5. Click the blue "Deploy" button at the top right > "New deployment".
 * 6. Click the gear icon next to "Select type" > select "Web app".
 * 7. Set:
 *    - Description: "Embedathon 2026 Receiver"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  <-- CRITICAL for website to submit without Google login
 * 8. Click "Deploy", authorize permissions if prompted by Google, and copy the "Web app URL".
 * 9. Paste that Web app URL into the website's "Google Sheet Live Sync" settings!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // If the sheet is completely empty, insert the headers first
    if (sheet.getLastRow() === 0 && data.headers) {
      sheet.appendRow(data.headers);
      var headerRange = sheet.getRange(1, 1, 1, data.headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#FDB515");
      headerRange.setFontColor("#050505");
    }
    
    // Append the participant registration row
    if (data.row && Array.isArray(data.row)) {
      sheet.appendRow(data.row);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Row added" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("EMBEDATHON 2026 Google Sheet Webhook is active and running!")
    .setMimeType(ContentService.MimeType.TEXT);
}
`;
