# Branchについて
- Dev
    - FrontEnd
        フロントエンドの開発用
    - ManagementAPIServer
        バックエンド開発用

# 起動方法
1. バックアップデータがある場合Dataフォルダに上書き
2. dockerImageをビルド
```docker-compose build```
3. dockerComposeを起動
```docker-compose up -d```

# 停止方法
1. dockerComposeを停止
```docker-compose down```
2. Dataフォルダをそのままコピーしてバックアップしてください
