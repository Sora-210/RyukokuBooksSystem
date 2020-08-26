# RyukokuBooksSystemについて
全商プログラミングコンテスト参加用の作品です

# 構成
全システムはDocker上に構築します。
Linux系OSなどからネットワークに公開する場合必要なファイルを配置して、port(80/tcp,443/tcp)を開放してください。
- BooksSystem-Docker
- - proxy : Front,API,Fileへのルーティングssl対応を行います
- - file : QRコード画像の配信用ファイルサーバー
- - management-db : 情報保存用データベース
- - frontend : WebApllication
- - management-api : 管理API

# 起動方法<localhost>
1. バックアップデータがある場合Dataフォルダに上書き
2. PKCS1方式の鍵ペア(api_rsa・api_rsa.pub)を/ManagementApiServer/src/config/に配置してください。
3. dockerImageをビルド
```docker-compose build```
4. dockerComposeを起動
```docker-compose up -d```

# 起動方法<独自ドメイン>>
1. バックアップデータがある場合Dataフォルダに上書き
2. PKCS1方式の鍵ペア(api_rsa・api_rsa.pub)を/ManagementApiServer/src/config/に配置してください。
3. SSL用鍵ペア(fullchain.pem・privkey.pem)を/Proxy/に配置してください。
4. /Proxy/proxy.conf 24-50行目のコメントを解除し、4,27行目の”localhost”を利用するドメインに変更してください。
5. /FrontEnd/.env.production の”localhost”を利用するドメインに変更してください。
6. dockerImageをビルド
```docker-compose build```
7. dockerComposeを起動
```docker-compose up -d```

# 停止方法
1. dockerComposeを停止
```docker-compose down```
2. Dataフォルダをそのままコピーしてバックアップしてください
