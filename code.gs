function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('クラスの曲リクエスト')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getRequestData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // 1行目（ヘッダー）を除外
  const rows = data.slice(1);
  
  const result = rows.map(row => {
    // タイムスタンプ(Dateオブジェクト)を文字列に変換してエラーを回避
    let timeStr = "";
    if (row[1] instanceof Date) {
      timeStr = Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm');
    } else {
      timeStr = String(row[1] || "");
    }

    return {
      timestamp: timeStr,
      title: String(row[2] || ""),
      artist: String(row[3] || ""),
      youtubeUrl: String(row[4] || ""),
      reason: String(row[5] || ""),
      radioName: String(row[6] || ""),
      videoId: extractYouTubeId(row[4])
    };
  }).filter(item => item.title && item.videoId); 
  
  return result;
}

function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = String(url).match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
タイムスタンプ	曲名	歌手名	YouTubeリンク	推している理由	ラジオネーム