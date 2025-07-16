# RmmaPage デザイン仕様

## レイアウト構造
```
フルハイトコンテナ (p-6 h-full)
└── フレックスコンテナ (max-w-7xl mx-auto h-full flex flex-col)
    ├── ヘッダーセクション (mb-6)
    │   ├── ページタイトル (text-3xl font-bold)
    │   └── 説明文 (text-gray-600)
    └── メインコンテンツ (flex-1 grid lg:grid-cols-3 gap-6)
        ├── フロー図エリア (lg:col-span-2)
        │   ├── フロー図ヘッダー (flex justify-between)
        │   └── フロー図キャンバス (border-dashed relative)
        │       ├── フローノード × 4個
        │       ├── 接続線 (SVG)
        │       └── 実行ステータス (条件表示)
        └── コントロールパネル (space-y-6)
            ├── プロンプト入力カード
            ├── 実行結果カード (条件表示)
            └── クイックアクションカード
```

## カラーパレット

### フローノード配色
- **Start**: 緑系 (`bg-green-100`, `border-green-400`, `text-green-800`)
- **RMMA Agent**: 青系 (`bg-blue-100`, `border-blue-400`, `text-blue-800`)
- **Sub Agents**: 紫系 (`bg-purple-100`, `border-purple-400`, `text-purple-800`)
- **Output**: オレンジ系 (`bg-orange-100`, `border-orange-400`, `text-orange-800`)

### UI要素配色
- **カード背景**: 白 (`bg-white`)
- **メインタイトル**: ダークグレー (`text-gray-900`)
- **説明文**: グレー (`text-gray-600`)
- **実行ボタン**: 青 (`bg-blue-600` → `hover:bg-blue-700`)
- **停止ボタン**: 赤 (`bg-red-600` → `hover:bg-red-700`)
- **実行ステータス**: 黄色 (`bg-yellow-100`, `border-yellow-400`)

## フロー図デザイン

### キャンバス
- **境界線**: `border-2 border-dashed border-gray-200`
- **背景**: `bg-gray-50`
- **角丸**: `rounded-lg`
- **高さ**: `h-96`
- **位置**: `relative overflow-hidden`

### フローノード
- **共通スタイル**: `border-2 rounded-lg p-3 text-center`
- **サイズ**: `w-32` ~ `w-40` (ノードにより可変)
- **位置**: `absolute` で座標指定
- **インジケーター**: `w-3 h-3 rounded-full mx-auto mb-2`

### 接続線 (SVG)
- **色**: `stroke="#6366f1"`
- **太さ**: `strokeWidth="2"`
- **矢印**: カスタムマーカー (`#arrowhead`)
- **レイヤー**: `pointer-events-none`

### 実行ステータス
- **位置**: `absolute top-2 right-2`
- **背景**: `bg-yellow-100 border border-yellow-400`
- **アニメーション**: `animate-pulse` (インジケーター)

## コントロールパネル

### プロンプト入力カード
- **テキストエリア**: `h-32` 固定高さ、`resize-none`
- **フォーカス**: `focus:ring-2 focus:ring-blue-500`
- **無効状態**: 実行中は `disabled`

### 実行制御ボタン
- **Execute**: `bg-blue-600 hover:bg-blue-700`
- **Stop**: `bg-red-600 hover:bg-red-700`
- **Clear**: `border border-gray-300 hover:bg-gray-50`
- **アイコン**: lucide-react (`Play`, `Square`)

### クイックアクション
- **ボタンスタイル**: `text-blue-600 hover:bg-blue-50`
- **絵文字**: 📊 📱 🎯 (視覚的識別)

## カードデザイン
- **背景**: 白 (`bg-white`)
- **影**: `shadow-md`
- **角丸**: 中 (`rounded-lg`)
- **パディング**: `p-6`
- **間隔**: `space-y-6` (カード間)

## タイポグラフィ
- **ページタイトル**: `text-3xl font-bold text-gray-900 mb-2`
- **説明文**: `text-gray-600`
- **カードタイトル**: `text-lg font-semibold text-gray-800 mb-4`
- **フローノードタイトル**: `text-sm font-medium`
- **フローノード説明**: `text-xs`
- **ラベル**: `text-sm font-medium text-gray-700`

## アイコン
- **ライブラリ**: lucide-react
- **使用アイコン**: `Workflow`, `Settings`, `MessageCircle`, `Play`, `Square`, `Send`
- **サイズ**: `w-5 h-5` (カードヘッダー), `w-4 h-4` (ボタン)

## レスポンシブデザイン
- **コンテナ**: 最大7xl (`max-w-7xl`)
- **グリッド**: 
  - モバイル: 1列 (`grid-cols-1`)
  - デスクトップ: 3列 (`lg:grid-cols-3`)
- **フロー図**: 2列分 (`lg:col-span-2`)

## インタラクション

### 状態管理
- **実行中**: ボタン無効化、ステータス表示
- **実行完了**: 結果カード表示
- **エラー**: エラーメッセージ表示

### アニメーション
- **実行インジケーター**: `animate-pulse`
- **ボタンホバー**: `transition-colors`
- **フォーカス**: `focus:ring-2`

## 特徴
- **Difyスタイル**: 視覚的フロー図によるプロセス理解
- **統合UI**: フロー図とコントロールの一体化
- **リアルタイム**: 実行状態の視覚的フィードバック
- **ユーザビリティ**: クイックアクションによる効率化
- **フルハイト**: 画面を最大活用したレイアウト 