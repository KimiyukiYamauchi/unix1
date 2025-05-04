function createFormFromJsonFile() {
  const fileName = "unix1_0507.json"; // Drive上のファイル名
  const files = DriveApp.getFilesByName(fileName);

  if (!files.hasNext()) {
    Logger.log("ファイルが見つかりません: " + fileName);
    return;
  }

  const file = files.next();
  const content = file.getBlob().getDataAsString();
  const data = JSON.parse(content); // ← JSONをオブジェクト化

  const form = FormApp.create("Unix1 Quiz Form"); // フォームのタイトルを指定
  form.setIsQuiz(true);

  // Fisher-Yatesアルゴリズムで配列をシャッフル
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  data.forEach((item) => {
    const title = `Q${item.questionNumber}: ${item.question}`;
    const shuffledChoices = shuffleArray([...item.choices]); // シャッフル用にコピーを作成
    const isMultiple = item.answer.length > 1;

    if (isMultiple) {
      form
        .addCheckboxItem()
        .setTitle(title)
        .setChoiceValues(shuffledChoices)
        .setPoints(1);
    } else {
      form
        .addMultipleChoiceItem()
        .setTitle(title)
        .setChoiceValues(shuffledChoices)
        .setPoints(1);
    }
  });

  // フォームとスプレッドシートを itf_data.json と同じフォルダに移動
  const parentFolders = file.getParents();
  const formFile = DriveApp.getFileById(form.getId());

  if (parentFolders.hasNext()) {
    const parent = parentFolders.next();
    parent.addFile(formFile);
    DriveApp.getRootFolder().removeFile(formFile);
    Logger.log("フォームをフォルダに移動しました。");
  } else {
    Logger.log("親フォルダが見つかりません。");
  }

  Logger.log("フォーム編集URL: " + form.getEditUrl());
  Logger.log("フォーム回答URL: " + form.getPublishedUrl());
}
