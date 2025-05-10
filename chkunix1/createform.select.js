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

  // フォーム作成
  const chapter = "Chapter03 シェルの便利な機能";
  const form = FormApp.create(`【${chapter}】課題提出フォーム`);
  form.setDescription("選択問題です。正しい選択肢を選んでください。");
  form.setIsQuiz(true);

  // 🔐 Googleログインユーザーのメールを自動収集
  form.setCollectEmail(true); // ← これで「メールアドレス」列が自動的に追加されます

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
    const originalChoices = item.choices;
    const correctAnswers = item.answer; // 正解リスト（1つまたは複数）
    const isMultiple = item.answer.length > 1;

    // 選択肢をランダムに並び替え
    const shuffledChoices = shuffleArray([...originalChoices]);

    if (isMultiple) {
      const checkboxItem = form.addCheckboxItem().setTitle(title).setPoints(1);
      const choices = shuffledChoices.map((choice) =>
        checkboxItem.createChoice(choice, correctAnswers.includes(choice))
      );
      checkboxItem.setChoices(choices);
      checkboxItem.setCorrectAnswers(
        choices.filter((choice) => correctAnswers.includes(choice.getValue()))
      );
    } else {
      const mcItem = form.addMultipleChoiceItem();
      mcItem.setTitle(title).setPoints(1);
      const choices = shuffledChoices.map((choice) =>
        mcItem.createChoice(choice)
      );
      mcItem.setChoices(choices);
      const correct = choices.find(
        (choice) => choice.getValue() === correctAnswers[0]
      );
      // if (correct) {
      //   mcItem.setCorrectAnswer(correct);
      // }
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
