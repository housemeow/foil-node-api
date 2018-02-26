# 設定檔：
1. _**開發(dev)**_ 環境migration設定值
- cp config/default.json.sample config/default.json
- - "user": "user"
- - "password": "password"
- - "host": "127.0.0.1"
- - "port": 5432
- - "database": "db"

2. 修改dotenv設定值為 _**開發(dev)**_ 環境設定值
- cp .env.sample .env
- - DB_USER_NAME=username
- - DB_PASSWORD=password
- - DB_HOST=127.0.0.1
- - DB_PORT=5432
- - DB_DATABASE=db

3. 修改dotenv設定值為 _**測試(test)**_ 環境設定值
- cp .env.test.sample .env.test
- - DB_USER_NAME=username
- - DB_PASSWORD=password
- - DB_HOST=127.0.0.1
- - DB_PORT=5432
- - DB_DATABASE=db


# 開發：
1. npm install
2. npm run dev

# 測試：
## 使用指令列
1. npm install
2. npm run test

## 使用VS Code
1. npm install
2. vscode 安裝 Node TDD package
3. 修改src/, test/資料夾的檔案時會自動執行npm run dev腳本
4. (optional)修改Node TDD設定檔可改變監控路徑
- - "nodeTdd.glob": "{src,test}/**/*.{js,ts,jsx,tsx}",
