const SECRET = "YOUR_WEBHOOK_SECRET"; // must match GOOGLE_SHEETS_WEBHOOK_SECRET in Cloudflare

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.secret !== SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" }, 401);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (payload.type === "freebie") {
      const sheet = getOrCreateSheet(ss, "Freebies", ["Timestamp", "Name", "Email"]);
      sheet.appendRow([payload.timestamp, payload.name, payload.email]);

    } else if (payload.type === "contact") {
      const sheet = getOrCreateSheet(ss, "Contact", ["Timestamp", "Name", "Email", "Country", "Reason", "Message"]);
      sheet.appendRow([payload.timestamp, payload.name, payload.email, payload.country, payload.reason, payload.message]);
    }

    return jsonResponse({ ok: true });

  } catch (err) {
    return jsonResponse({ ok: false, error: err.message }, 500);
  }
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function jsonResponse(body, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(body));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
