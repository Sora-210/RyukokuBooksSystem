# Branchについて
- Dev
<<<<<<< HEAD
-- FrontEnd
フロントエンドの開発用

# FrontEnd
Docker上で動作
自動でビルドを行い,
nginxでファイルの配布を行う
=======
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
>>>>>>> ManagementAPIServer
