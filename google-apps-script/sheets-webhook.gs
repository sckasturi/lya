const SECRET = "YOUR_WEBHOOK_SECRET"; // must match GOOGLE_SHEETS_WEBHOOK_SECRET in Cloudflare

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.secret !== SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" }, 401);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (payload.type === "freebie") {
      // Source is "talk" for sign-ups from the /talk QR-code page, "website" otherwise.
      // QR Code is the ?src= tag on the scanned code (e.g. handout, real-estate-talk).
      const headers = [
        "Timestamp",
        "Name",
        "Email",
        "Country",
        "Source",
        "QR Code",
        "Coaching Interest",
        "Talk Rating",
      ];
      const sheet = getOrCreateSheet(ss, "Freebies", headers);
      sheet.appendRow([
        payload.timestamp,
        payload.name,
        payload.email,
        payload.country || "Unknown",
        payload.source || "website",
        payload.qrCode || "",
        payload.coachingInterest || "",
        payload.talkRating || "",
      ]);

    } else if (payload.type === "contact") {
      const headers = ["Timestamp", "Name", "Email", "Country", "Reason", "Message"];
      const sheet = getOrCreateSheet(ss, "Contact", headers);
      sheet.appendRow([
        payload.timestamp,
        payload.name,
        payload.email,
        payload.country || "Unknown",
        payload.reason,
        payload.message,
      ]);
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
    return sheet;
  }

  // Keep header row in sync when new columns are added (e.g. Country on Freebies).
  const headerRow = sheet.getRange(1, 1, 1, headers.length);
  const existing = headerRow.getValues()[0];
  let needsUpdate = false;
  for (let i = 0; i < headers.length; i++) {
    if (existing[i] !== headers[i]) {
      needsUpdate = true;
      break;
    }
  }
  if (needsUpdate) {
    headerRow.setValues([headers]);
    headerRow.setFontWeight("bold");
  }
  return sheet;
}

function jsonResponse(body, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(body));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
