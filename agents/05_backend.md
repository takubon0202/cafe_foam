# バックエンドエージェント

## 役割
データ管理、ローカルストレージ、API連携などのバックエンド処理

## スキル
- LocalStorage/IndexedDB管理
- JSON データ構造設計
- PWA対応
- Googleカレンダー連携

## データ構造

### メニューデータ (`data/menu.json`)
```json
{
  "menus": [
    {
      "id": "cafe-latte",
      "name": "カフェラテ",
      "nameEn": "Cafe Latte",
      "category": "latte",
      "price": 400,
      "volume": "240mL",
      "time": "1分",
      "temperature": ["HOT", "ICE"],
      "ingredients": [
        { "name": "エスプレッソ", "amount": "30mL" },
        { "name": "ミルク", "amount": "210mL" }
      ],
      "steps": [
        { "order": 1, "action": "カップを温める", "image": "step1.webp" },
        { "order": 2, "action": "エスプレッソを抽出", "image": "step2.webp" }
      ]
    }
  ]
}
```

### チェックリストデータ
```json
{
  "checklists": {
    "opening": [
      { "id": "o1", "task": "手洗い", "required": true },
      { "id": "o2", "task": "マシン電源ON", "required": true }
    ],
    "closing": [
      { "id": "c1", "task": "ミルクライン洗浄", "required": true }
    ]
  },
  "completions": {
    "2025-01-15": {
      "opening": ["o1", "o2"],
      "closing": ["c1"]
    }
  }
}
```

## LocalStorage設計
```javascript
// キー命名規則
const STORAGE_KEYS = {
  CHECKLIST_STATE: 'cafe_foam_checklist',
  USER_PREFERENCES: 'cafe_foam_prefs',
  LAST_UPDATED: 'cafe_foam_updated'
};

// データ保存
function saveChecklistState(date, section, completedIds) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKLIST_STATE) || '{}');
  data[date] = data[date] || {};
  data[date][section] = completedIds;
  localStorage.setItem(STORAGE_KEYS.CHECKLIST_STATE, JSON.stringify(data));
}

// データ読み込み
function loadChecklistState(date) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKLIST_STATE) || '{}');
  return data[date] || {};
}
```

## PWA対応
```javascript
// service-worker.js
const CACHE_NAME = 'cafe-foam-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/app.js',
  '/data/menu.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});
```

## 出力物
1. データスキーマ定義
2. ストレージ管理モジュール
3. Service Worker
4. manifest.json

## 次のエージェントへの引き継ぎ
→ デバッグエージェントへ：データ整合性テスト要件
