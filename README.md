# typescript-express API sample

### ユーザー（従業員）管理アプリを想定した API

<br>

## 機能概要

- ユーザー追加
- ユーザー削除
- ID 指定のユーザー情報取得
- 全ユーザー情報取得
- ログイン認証

<br>

## API 詳細

1. ### **ユーザー追加**

   メソッド：POST

   URI：ドメイン/user

   <br>

   **リクエストボディ**

   | 項目       | 名称               | 値           | 必須 | 備考                        |
   | ---------- | ------------------ | ------------ | ---- | --------------------------- |
   | name       | 氏名               | 全角文字列   | ○    |                             |
   | age        | 年齢               | 数字 1〜3 桁 | ○    |                             |
   | email      | E メールアドレス   | 半角英数字   | ○    |                             |
   | password   | ログインパスワード | 半角英数字   | ○    | DB 登録時はハッシュ化される |
   | department | 部署名             | 全角文字列   |      |                             |

   <br>

   **リクエストボディサンプル**

   ```
    {
      "name": "テスト ユーザー",
      "age": 10,
      "email": "test@test.com",
      "password": "password",
      "department": "研究開発"
    }
   ```

   <br>

   **正常時のレスポンス**
   | 項目 | 名称 | 値 | 備考 |
   | -------------- | ------------------ | ----------- | -------------------------- |
   | message | メッセージ | ユーザー作成が成功した事を表す内容 | |

   <br>

   **正常時のレスポンスサンプル**

   ```
    {
      "message": "succeed create new user."
    }
   ```

    <br>

1. ### **ユーザー削除**

   作成中…

   <br>

1. ### **ユーザー情報取得（ID 指定）**

   メソッド：GET

   URI：ドメイン/user/(数値)

   <br>

   **リクエストパラメーター**
   | パラメーター名 | 名称 | 値 | 必須 | 備考 |
   | -------------- | ---------- | ---------- | ---- | ---- |
   | id | ユーザー ID | 半角英数字 | ○ | |

   <br>

   **正常時のレスポンス**
   | 項目 | 名称 | 値 | 備考 |
   | -------------- | ------------------ | ----------- | -------------------------- |
   | name | 氏名 | 全角文字列 | |
   | age | 年齢 | 数字 1〜3 桁 | |
   | email | E メールアドレス | 半角英数字 | |
   | department | 部署名 | 全角文字列 | |

   <br>

   **正常時レスポンスサンプル**

   ```
    {
      "user": {
        "id": 2,
        "name": "テスト ユーザー",
        "age": 10,
        "email": "test@test.com",
        "department": "研究開発"
      }
    }
   ```
   
   <br>
   
  1. ### **全ユーザー情報取得**
    メソッド：GET

    URI：ドメイン/user/all

   <br>

   **正常時のレスポンス**　※レスポンスの配列要素一つ分
   | 項目 | 名称 | 値 | 備考 |
   | -------------- | ------------------ | ----------- | -------------------------- |
   | name | 氏名 | 全角文字列 | |
   | age | 年齢 | 数字 1〜3 桁 | |
   | email | E メールアドレス | 半角英数字 | |
   | department | 部署名 | 全角文字列 | |   

   <br>

   **正常時レスポンスサンプル**

   ```
    {
      "users": [
        {
          "id": 1,
          "name": "テスト ユーザー１",
          "age": 20,
          "email": "test1@test.com",
          "department": "研究開発"
        },
        {
          "id": 2,
          "name": "テスト ユーザー２",
          "age": 20,
          "email": "test3@test.com",
          "department": "研究開発"
        },
        {
          "id": 3,
          "name": "テスト ユーザー３",
          "age": 30,
          "email": "test3@test.com",
          "department": "研究開発"
        }
      ]
    }
    
   ```
