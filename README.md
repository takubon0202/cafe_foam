# Cafe Foam - 共創カフェ運営マニュアル

デロンギ マグニフィカS（ECAM22112）を使用したカフェ向けの運営マニュアルWebアプリケーションです。

**デモサイト**: https://takubon0202.github.io/cafe_foam/

---

## 目次

1. [概要](#概要)
2. [主な機能](#主な機能)
3. [技術スタック](#技術スタック)
4. [ファイル構成](#ファイル構成)
5. [セットアップ](#セットアップ)
6. [在庫管理システム](#在庫管理システム)
7. [GAS（Google Apps Script）仕様](#gasgoogle-apps-script仕様)
8. [スプレッドシート構造](#スプレッドシート構造)
9. [API接続ステータス](#api接続ステータス)
10. [デザインガイドライン](#デザインガイドライン)
11. [エージェント・スキルシステム](#エージェントスキルシステム)
12. [開発者向け情報](#開発者向け情報)

---

## 概要

このアプリケーションは、カフェスタッフが日々の業務を効率的に行えるよう設計されています。

### ターゲットユーザー

| ペルソナ | 説明 |
|----------|------|
| **新人バリスタ「田中さん」（22歳）** | 勤務1ヶ月目、スマホ操作は得意。接客中に片手でレシピを素早く確認したい |
| **店長「佐藤さん」（35歳）** | 運営5年、新人教育担当。マニュアル更新・共有を効率化したい |

---

## 主な機能

### ドリンクメニュー
- カフェラテ、カフェモカ、抹茶ラテ、ほうじ茶ラテ など
- ステップバイステップの作り方
- アレルゲン情報、注意事項

### 清掃マニュアル
- 日次・週次・月次の清掃タスク管理
- チェックリスト機能
- 完了時刻の自動記録

### 接客マニュアル
- 7ステップの接客フロー（イラスト付き）
- NG行動イラスト
- 言葉遣いの例

### 在庫管理システム
- Google Spreadsheetとリアルタイム連携
- 発注が必要なアイテムのハイライト
- API接続ステータスの表示

### トラブルシューティング
- マシンの問題と解決方法
- 緊急時対応ガイド

---

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フロントエンド | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| データ永続化 | LocalStorage, IndexedDB |
| 外部連携 | Google Apps Script (GAS) |
| ホスティング | GitHub Pages |

---

## ファイル構成

```
cafe_foam/
├── index.html              # メインHTML
├── styles.css              # スタイルシート（4500行+）
├── script.js               # メインスクリプト（1700行+）
├── data.js                 # データ定義（1700行+）
├── print.html              # 印刷用ページ
├── README.md               # このファイル
├── CLAUDE.md               # Claude Code設定
├── .gitignore              # Git除外設定
│
├── gas/                    # Google Apps Script
│   ├── inventory-api.js    # 在庫API
│   └── README.md           # GASデプロイ手順
│
├── images/                 # 画像
│   ├── ng_behaviors/       # NG行動イラスト（5枚）
│   ├── service_flow/       # 接客フローイラスト（7枚）
│   └── *.png               # その他画像
│
├── agents/                 # サブエージェント定義
│   ├── 01_persona.md       # ペルソナエージェント
│   ├── 02_design.md        # デザインエージェント
│   ├── 03_coding.md        # コーディングエージェント
│   ├── 04_image.md         # 画像生成エージェント
│   ├── 05_backend.md       # バックエンドエージェント
│   ├── 06_debug.md         # デバッグエージェント
│   ├── 07_evaluator.md     # 評価エージェント（統括）
│   ├── 07a_design_evaluator.md
│   ├── 07b_ux_evaluator.md
│   ├── 07c_tech_evaluator.md
│   ├── 07d_business_evaluator.md
│   └── 08_inventory.md     # 在庫管理エージェント
│
├── skills/                 # スキル定義
│   ├── cafe-design.skill.md
│   ├── manual-ux.skill.md
│   ├── quality-check.skill.md
│   └── inventory-management.skill.md
│
├── .claude/commands/       # スラッシュコマンド
│   ├── develop.md          # /develop
│   ├── design.md           # /design
│   ├── code.md             # /code
│   ├── debug.md            # /debug
│   ├── evaluate.md         # /evaluate
│   ├── image.md            # /image
│   └── inventory.md        # /inventory
│
└── docs/
    ├── design-guidelines.md
    └── ECAM22020_manual.pdf
```

---

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/takubon0202/cafe_foam.git
cd cafe_foam
```

### 2. ローカルで開く

`index.html` をブラウザで開く。

### 3. 在庫管理を有効化（オプション）

[GAS設定手順](#gasgoogle-apps-script仕様) を参照。

---

## 在庫管理システム

### 概要

Google Spreadsheetと連携し、在庫状況をリアルタイムで表示します。

| 項目 | 内容 |
|------|------|
| 連携方式 | GAS Web API (JSON) |
| 更新タイミング | ページ読み込み時 / 手動更新 |
| オフライン対応 | キャッシュ + フォールバックデータ |
| 編集 | 読み取り専用（スプレッドシートで編集） |

### スプレッドシートURL

```
https://docs.google.com/spreadsheets/d/1iuTiIGV0Zz-AMx8aTcKZ0qSfI6kUSnZT4RZnWbgDCB8/edit
```

---

## GAS（Google Apps Script）仕様

### 概要

| 項目 | 内容 |
|------|------|
| ファイル | `gas/inventory-api.js` |
| エンドポイント | `doGet()` |
| レスポンス形式 | JSON |
| 認証 | 不要（公開API） |

### デプロイ手順

1. https://script.google.com/ にアクセス
2. 「新しいプロジェクト」を作成
3. `gas/inventory-api.js` の内容を貼り付け
4. 「デプロイ」→「新しいデプロイ」
5. 種類: 「ウェブアプリ」
6. 実行ユーザー: 「自分」
7. アクセス: 「全員」
8. デプロイ後、URLをコピー
9. `data.js` の `INVENTORY_API_URL` にURLを設定

### APIレスポンス構造

```javascript
{
  "success": true,
  "timestamp": "2025-12-29T10:30:00.000Z",
  "summary": {
    "totalItems": 25,
    "needsOrder": 3,
    "okItems": 22
  },
  "items": [...],         // 在庫アイテム配列
  "categories": {...},    // カテゴリ別グループ
  "storage": [...],       // 保管場所情報
  "mainItems": [...]      // メイン在庫リスト
}
```

### GASコード（主要部分）

```javascript
const SPREADSHEET_ID = '1iuTiIGV0Zz-AMx8aTcKZ0qSfI6kUSnZT4RZnWbgDCB8';

function doGet(e) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  // 3つのシートからデータを取得
  const inventorySheet = spreadsheet.getSheetByName('在庫数・発注');
  const storageSheet = spreadsheet.getSheetByName('在庫管理場所');
  const mainSheet = spreadsheet.getSheetByName('在庫管理');

  // ... データ整形処理 ...

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## スプレッドシート構造

### シート一覧

| シート名 | 用途 | GASで使用 |
|----------|------|-----------|
| `在庫管理` | メイン在庫リスト | ✓ |
| `入力確認１` | 入力履歴 | - |
| `在庫数・発注` | 発注判定用 | ✓ |
| `在庫管理場所` | 保管場所情報 | ✓ |

---

### シート: `在庫数・発注`

発注が必要かどうかを判定するためのシート。

| 列 | インデックス | フィールド名 | 説明 | 例 |
|----|-------------|--------------|------|-----|
| A | 0 | category | カテゴリ | ラテ |
| B | 1 | name | 商品名 | チョコソース |
| C | 2 | supplier | 仕入れ先 | 業務スーパー |
| D | 3 | orderPoint | 発注点 | 500 |
| E | 4 | stock | 在庫数 | 1000 |
| F | 5 | unit | 単位 | g |
| G | 6 | - | （未使用） | - |
| H | 7 | - | （未使用） | - |
| I | 8 | - | （未使用） | - |
| J | 9 | notes | 備考 | 注ぎ口清掃 |

**判定ロジック:**
```javascript
status = (stock <= orderPoint) ? '発注' : 'OK'
```

---

### シート: `在庫管理場所`

各アイテムの保管方法を定義するシート。

| 列 | インデックス | フィールド名 | 説明 | 例 |
|----|-------------|--------------|------|-----|
| A | 0 | name | 品名 | チョコソース |
| B | 1 | beforeOpen | 開封前保管 | 常温 |
| C | 2 | afterOpen | 開封後保管 | 冷蔵庫 |
| D | 3 | location | 保管場所 | 冷蔵庫上段 |
| E | 4 | expiryDays | 消費期限目安 | 1か月 |
| F | 5 | notes | 備考 | 注ぎ口を清潔に |

---

### シート: `在庫管理`

メインの在庫管理リスト。

| 列 | インデックス | フィールド名 | 説明 | 例 |
|----|-------------|--------------|------|-----|
| A | 0 | name | 品名 | 牛乳 |
| B | 1 | status | ステータス | OK |
| C | 2 | remaining | 残数 | 5 |
| D | 3 | ideal | 理想在庫 | 10 |
| E | 4 | initial | 初期在庫 | 10 |
| F | 5 | orderLine | 発注ライン | 3 |

**判定ロジック:**
```javascript
needsOrder = (remaining <= orderLine)
```

---

### データ構造（JavaScript）

#### 在庫アイテム
```javascript
{
  category: "ラテ",
  name: "チョコソース",
  supplier: "業務スーパー",
  orderPoint: 500,
  stock: 1000,
  unit: "g",
  status: "OK",  // or "発注"
  notes: "注ぎ口を清潔に"
}
```

#### 保管場所情報
```javascript
{
  name: "チョコソース",
  beforeOpen: "常温",
  afterOpen: "閉店時：冷蔵庫\n開店時：常温",
  location: "冷蔵庫上段",
  expiryDays: "1か月",
  notes: "注ぎ口を清潔に"
}
```

#### メイン在庫アイテム
```javascript
{
  name: "牛乳",
  status: "OK",
  remaining: 5,
  ideal: 10,
  initial: 10,
  orderLine: 3,
  needsOrder: false
}
```

---

## API接続ステータス

在庫管理ページのヘッダーに接続状態をリアルタイム表示します。

### ステータス一覧

| ステータス | 色 | アニメーション | 表示テキスト | 意味 |
|-----------|-----|---------------|-------------|------|
| `connected` | 緑 | 点滅 | API接続中 | 正常にデータ取得中 |
| `checking` | オレンジ | 点滅 | 接続確認中... | API呼び出し中 |
| `cached` | 青 | なし | キャッシュ使用中 | オフライン（キャッシュ表示） |
| `offline` | 赤 | なし | 接続エラー | API接続失敗 |
| `unconfigured` | グレー | なし | API未設定（デモデータ） | URLが空 |

### 実装

**HTML:**
```html
<div class="api-status" id="apiConnectionStatus">
    <span class="status-indicator status-checking"></span>
    <span class="status-text">接続確認中...</span>
</div>
```

**JavaScript:**
```javascript
function updateApiStatus(status, message) {
    const statusContainer = document.getElementById('apiConnectionStatus');
    const indicator = statusContainer.querySelector('.status-indicator');
    const text = statusContainer.querySelector('.status-text');

    indicator.className = 'status-indicator status-' + status;
    statusContainer.className = 'api-status status-' + status + '-wrapper';
    text.textContent = message;
}
```

---

## デザインガイドライン

### カラーパレット

```css
:root {
  /* メインカラー */
  --cafe-espresso: #3C2415;      /* 深いエスプレッソブラウン */
  --cafe-cream: #F5E6D3;         /* クリーミーベージュ */
  --cafe-latte: #C4A77D;         /* ラテブラウン */

  /* アクセントカラー */
  --cafe-matcha: #7B9971;        /* 抹茶グリーン */
  --cafe-houji: #8B6914;         /* ほうじ茶ゴールド */
  --cafe-caramel: #D2691E;       /* キャラメルオレンジ */
}
```

### フォント

```css
/* 見出し - 明朝系 */
--font-heading: "Shippori Mincho", "Noto Serif JP", serif;

/* 本文 - ゴシック */
--font-body: "Noto Sans JP", "M PLUS 1p", sans-serif;
```

### 禁止事項（AIっぽいデザイン回避）

- 紫色のグラデーション背景
- 絵文字の装飾的多用
- Inter, Roboto, Arial などの汎用フォント
- 白背景 + 青アクセントの組み合わせ

---

## エージェント・スキルシステム

### スラッシュコマンド

| コマンド | 役割 |
|----------|------|
| `/develop` | フルサイクル実行（全エージェント順次実行） |
| `/design` | デザイン設計 + 画像生成 |
| `/code` | HTML/CSS/JS実装 |
| `/image` | Gemini API画像生成 |
| `/debug` | テスト・バグ修正 |
| `/evaluate` | 品質評価（80点合格） |
| `/inventory` | 在庫管理システム構築 |

### 開発フロー

```
/develop [タスク] 実行
    ↓
ペルソナ確認 → デザイン設計 → コーディング → デバッグ → 評価
    ↓                              ↓
  画像生成（並行）        バックエンド（必要時）
    ↓
評価80点以上 → 合格
評価80点未満 → 該当エージェントに差し戻し
```

---

## 開発者向け情報

### LocalStorageキー

| キー | 内容 |
|------|------|
| `cafeManual_menuData` | メニューデータ |
| `cafeManual_cleaningData` | 清掃データ |
| `cafeManual_serviceData` | 接客データ |
| `cafeManual_inventoryCache` | 在庫キャッシュ |
| `cafeManual_settings` | 設定 |

### Lighthouse目標スコア

| 項目 | 目標 |
|------|------|
| Performance | 90点以上 |
| Accessibility | 95点以上 |
| SEO | 90点以上 |
| Best Practices | 95点以上 |

### ブラウザ互換性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## ライセンス

共創カフェの内部使用を目的としています。

---

## バージョン履歴

| バージョン | 日付 | 内容 |
|-----------|------|------|
| 2.0.0 | 2025-12-29 | 在庫管理システム追加、API接続ステータス表示 |
| 1.0.0 | 2025-01 | 初版リリース |

---

**作成**: Claude Code (Opus 4.5)
**最終更新**: 2025年12月29日
