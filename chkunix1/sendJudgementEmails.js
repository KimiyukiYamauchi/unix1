function sendJudgementEmails() {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const allValues = sheet.getDataRange().getValues();
  const emailColIndex = findEmailColumnIndex(headers);

  if (emailColIndex === -1) {
    throw new Error("メールアドレス列（Email Address）が見つかりません。");
  }

  // JSONファイルの読み込み
  const file = DriveApp.getFilesByName("unix1_chap02.json");
  if (!file.hasNext()) throw new Error("unix1_chap02.json が見つかりません");
  const json = JSON.parse(file.next().getBlob().getDataAsString());

  // questionNumber => answer のマップを作成
  const answerMap = {};
  json.forEach((q) => {
    answerMap[q.questionNumber] = q.answer;
  });

  for (let row = 1; row < allValues.length; row++) {
    const rowData = allValues[row];
    const email = rowData[emailColIndex];
    let mailBody = "Unix1課題の判定結果をお送りします。\n\n";

    headers.forEach((header, colIndex) => {
      if (header.startsWith("判定_Q")) {
        const 判定結果 = rowData[colIndex];
        if (判定結果) {
          mailBody += `${header}:\n${判定結果}\n`;

          const match = header.match(/判定_Q(\d+)/);
          if (match) {
            const qNum = parseInt(match[1], 10);

            // あなたの解答を追加（列名が "Qn:" の形式）
            const studentAnswerHeader = `Q${qNum}:`;
            const studentAnswerColIndex = headers.findIndex(
              (h) => typeof h === "string" && h.trim().startsWith(`Q${qNum}:`)
            );
            if (studentAnswerColIndex !== -1) {
              const studentAnswer = rowData[studentAnswerColIndex];
              if (studentAnswer !== "") {
                mailBody += `あなたの解答：${studentAnswer}\n`;
              }
            }

            // 正解例（模範解答）を追加
            const modelAnswer = answerMap[qNum];
            if (modelAnswer) {
              mailBody += `模範解答：${modelAnswer}\n\n`;
            }
          }
        }
      }
    });

    if (email) {
      GmailApp.sendEmail(email, "Unix1課題の判定結果", mailBody);
      Logger.log(`判定結果を ${email} に送信しました。`);
    }
  }

  Logger.log("すべての回答者に判定メールを送信しました。");
}

function findEmailColumnIndex(headers) {
  return headers.findIndex(
    (h) => typeof h === "string" && h.trim().toLowerCase() === "email address"
  );
}
