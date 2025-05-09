function gradeAllResponses() {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const dataRange = sheet.getDataRange();
  const allValues = dataRange.getValues();
  const correctAnswers = getCorrectAnswersFromJson(); // quiz_data.json から読み込み

  for (let row = 1; row < allValues.length; row++) {
    // 1行目はヘッダーなのでスキップ
    const rowData = allValues[row];

    headers.forEach((header, colIndex) => {
      const match = header.match(/^(Q[0-9]+)[\s:：]/); // Q1: ～ の形式に対応
      if (match) {
        const qNum = match[1]; // Q1など
        const 判定列名 = `判定_${qNum}`;
        const 判定ColIndex = headers.findIndex((h) => h === 判定列名);
        const studentCommand = rowData[colIndex];
        const correctCommand = correctAnswers[qNum];

        if (correctCommand && 判定ColIndex !== -1) {
          if (studentCommand) {
            const feedback = getLinuxCommandJudgementWithChatGPT(
              studentCommand,
              correctCommand
            );
            sheet.getRange(row + 1, 判定ColIndex + 1).setValue(feedback);
          } else {
            // 未入力時の処理を追加
            sheet
              .getRange(row + 1, 判定ColIndex + 1)
              .setValue("判定：不正解\n理由：未入力のため");
          }
        }
      }
    });
  }

  Logger.log("全回答の判定が完了しました。");
}

function getCorrectAnswersFromJson() {
  const fileName = "unix1_chap02.json";
  const files = DriveApp.getFilesByName(fileName);

  if (!files.hasNext()) {
    throw new Error("quiz_data.json が見つかりません。");
  }

  const file = files.next();
  const content = file.getBlob().getDataAsString("utf-8");
  const data = JSON.parse(content);

  const correctAnswers = {};

  data.forEach((item) => {
    const qKey = `Q${item.questionNumber}`;
    correctAnswers[qKey] = item.answer;
  });

  return correctAnswers;
}

function getLinuxCommandJudgementWithChatGPT(studentCommand, correctCommand) {
  // const apiKey = ScriptProperties.getProperty('API_KEY'); // ← APIキーを取得
  const apiKey = PropertiesService.getScriptProperties().getProperty("API_KEY"); // ← APIキーを取得

  const prompt = `
あなたは優秀なLinux講師です。
学生が提出した「学生の解答」と「模範解答」を比較し、問題点を指摘してください。
「学生の解答」は「あなたの解答」として扱ってください。

【学生の解答】
${studentCommand}

【模範解答】
${correctCommand}

次の形式で出力してください：
判定：正解 または 不正解
理由：○○○

### 理由の例
- あなたの解答は模範解答と完全に一致しており、Linuxコマンドとして正しく機能します。
- あなたの解答では\`ls -l\`の代わりに\`ls\`だけを使用しています。\`-l\`オプションが欠けているため、詳細表示が行われません。
- あなたの解答ではディレクトリを削除する際に\`rm\`コマンドを使っていますが、模範解答では\`rm -r\`を使って再帰的に削除しています。
- あなたの解答にはスペルミスがあります。\`pwd\`の代わりに\`pdd\`と入力されており、このコマンドは存在しません。
- あなたの解答は構文上誤りがあり、Linux上でそのまま実行しても動作しません。
`;

  const payload = {
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: `Bearer ${apiKey}` },
    payload: JSON.stringify(payload),
  };

  try {
    const response = UrlFetchApp.fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const json = JSON.parse(response.getContentText());
    return json.choices[0].message.content.trim();
  } catch (error) {
    return "エラー: " + error.message;
  }
}
