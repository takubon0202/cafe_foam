/**
 * Cafe Foam 在庫管理 API
 * Google Apps Script (GAS)
 *
 * このスクリプトをGoogle Apps Scriptにコピーしてデプロイしてください。
 *
 * デプロイ手順:
 * 1. https://script.google.com/ にアクセス
 * 2. 「新しいプロジェクト」を作成
 * 3. このコードを貼り付け
 * 4. 「デプロイ」→「新しいデプロイ」
 * 5. 種類: 「ウェブアプリ」
 * 6. 実行ユーザー: 「自分」
 * 7. アクセス: 「全員」
 * 8. デプロイして、ウェブアプリのURLをコピー
 * 9. script.js の INVENTORY_API_URL にURLを設定
 */

// スプレッドシートID
const SPREADSHEET_ID = '1iuTiIGV0Zz-AMx8aTcKZ0qSfI6kUSnZT4RZnWbgDCB8';

/**
 * GETリクエストを処理
 * @param {Object} e - リクエストパラメータ
 * @returns {TextOutput} JSON形式のレスポンス
 */
function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // 在庫数・発注シートからデータを取得
    const inventorySheet = spreadsheet.getSheetByName('在庫数・発注');
    const inventoryData = inventorySheet.getDataRange().getValues();

    // 在庫管理場所シートからデータを取得
    const storageSheet = spreadsheet.getSheetByName('在庫管理場所');
    const storageData = storageSheet.getDataRange().getValues();

    // 在庫管理シート（メイン）からデータを取得
    const mainSheet = spreadsheet.getSheetByName('在庫管理');
    const mainData = mainSheet.getDataRange().getValues();

    // 在庫アイテムを整形
    const items = [];
    for (let i = 1; i < inventoryData.length; i++) {
      const row = inventoryData[i];
      // カテゴリと商品名が存在する行のみ
      if (row[0] && row[1] && !String(row[0]).includes('スプレット') && !String(row[0]).includes('発注から')) {
        const orderPoint = parseFloat(row[3]) || 0;
        const stock = parseFloat(row[4]) || 0;

        items.push({
          category: String(row[0]).trim(),
          name: String(row[1]).trim(),
          supplier: String(row[2] || '').trim(),
          orderPoint: orderPoint,
          stock: stock,
          unit: String(row[5] || '').trim(),
          status: stock <= orderPoint ? '発注' : 'OK',
          notes: String(row[9] || '').trim()
        });
      }
    }

    // 保管場所情報を整形
    const storage = [];
    for (let i = 1; i < storageData.length; i++) {
      const row = storageData[i];
      if (row[0]) {
        storage.push({
          name: String(row[0]).trim(),
          beforeOpen: String(row[1] || '').trim(),
          afterOpen: String(row[2] || '').trim(),
          location: String(row[3] || '').trim(),
          expiryDays: String(row[4] || '').trim(),
          notes: String(row[5] || '').trim()
        });
      }
    }

    // メイン在庫リストを整形
    const mainItems = [];
    for (let i = 1; i < mainData.length; i++) {
      const row = mainData[i];
      if (row[0]) {
        const remaining = parseFloat(row[2]) || 0;
        const orderLine = parseFloat(row[5]) || 0;

        mainItems.push({
          name: String(row[0]).trim(),
          status: String(row[1] || '').trim(),
          remaining: remaining,
          ideal: parseFloat(row[3]) || 0,
          initial: parseFloat(row[4]) || 0,
          orderLine: orderLine,
          needsOrder: remaining <= orderLine
        });
      }
    }

    // サマリー情報
    const summary = {
      totalItems: items.length,
      needsOrder: items.filter(item => item.status === '発注').length,
      okItems: items.filter(item => item.status === 'OK').length
    };

    // カテゴリ別にグループ化
    const categories = {};
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      summary: summary,
      items: items,
      categories: categories,
      storage: storage,
      mainItems: mainItems
    };

    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };

    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * テスト用関数
 */
function testDoGet() {
  const result = doGet({});
  Logger.log(result.getContent());
}
