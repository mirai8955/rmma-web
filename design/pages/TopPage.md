# TopPage デザイン仕様

## レイアウト構造
```
パディングコンテナ (p-6)
└── コンテナ (max-w-4xl mx-auto)
    ├── ページタイトル (text-3xl font-bold)
    ├── メインカード (bg-white rounded-lg shadow-md)
    │   ├── システムタイトル (text-xl font-semibold)
    │   ├── 説明文 (text-gray-600 leading-relaxed)
    │   └── 機能カードグリッド (grid-cols-1 md:grid-cols-2)
    │       ├── Agent Management カード (青系)
    │       └── Execution カード (緑系)
    └── 
```

## カラーパレット
- **背景色**: グレー (`bg-gray-100`) ※レイアウトから継承
- **メインカード**: 白 (`bg-white`)
- **ページタイトル**: ダークグレー (`text-gray-900`)
- **システムタイトル**: ダークグレー (`text-gray-800`)
- **説明文**: グレー (`text-gray-600`)

### 機能カード配色
- **Agent Management**:
  - 背景: `bg-blue-50` → `hover:bg-blue-100`
  - タイトル: `text-blue-800`
  - 説明: `text-blue-600`
- **Execution**:
  - 背景: `bg-green-50` → `hover:bg-green-100`
  - タイトル: `text-green-800`
  - 説明: `text-green-600`

## カードデザイン

### メインカード
- **角丸**: 中 (`rounded-lg`)
- **影**: `shadow-md`
- **パディング**: `p-6`

### 機能カード
- **角丸**: 中 (`rounded-lg`)
- **パディング**: `p-4`
- **ホバー効果**: 背景色の濃淡変化
- **クリック可能**: `cursor-pointer`
- **アニメーション**: `transition-colors`

## タイポグラフィ
- **ページタイトル**: `text-3xl font-bold text-gray-900 mb-6`
- **システムタイトル**: `text-xl font-semibold text-gray-800 mb-4`
- **説明文**: `text-gray-600 leading-relaxed`
- **機能カードタイトル**: `font-semibold mb-2`
- **機能カード説明**: `text-sm`

## レスポンシブデザイン
- **コンテナ幅**: 最大4xl (`max-w-4xl`)
- **機能カードグリッド**:
  - モバイル: 1列 (`grid-cols-1`)
  - タブレット以上: 2列 (`md:grid-cols-2`)
- **グリッド間隔**: `gap-4`

## インタラクション
- **機能カードリンク**: `block` レベルリンクでカード全体クリック可能
- **ホバー効果**: 
  - Agent Management: `hover:bg-blue-100`
  - Execution: `hover:bg-green-100`
- **アニメーション**: `transition-colors` でスムーズな色変化

## レイアウト間隔
- **ページパディング**: `p-6`
- **タイトル下マージン**: `mb-6`
- **システムタイトル下マージン**: `mb-4`
- **機能カードグリッド上マージン**: `mt-6`

## 特徴
- **ウェルカムメッセージ**: 親しみやすい英語表記
- **システム説明**: 簡潔で分かりやすい機能説明
- **ダブルカード構成**: 主要機能への直接アクセス
- **統一された色彩**: 青（管理）・緑（実行）の機能別色分け 