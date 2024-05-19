// script.js

// サーバーステータスを取得する関数
async function getServerStatus() {
    // 入力フィールドからサーバーアドレスを取得
    const serverAddress = document.getElementById('serverAddress').value;

    
    
    // API URLの構築
    const url = `https://api.mcsrvstat.us/2/${serverAddress}`;
    
    try {
        // APIにリクエストを送信
        const response = await fetch(url);
        // レスポンスをJSON形式で取得
        const data = await response.json();

        // ステータスを表示する要素を取得
        const statusDiv = document.getElementById('status');

        // サーバーがオンラインかどうかを確認
        if (data.online) {
            // オンラインの場合の表示
            statusDiv.className = 'alert alert-success';
            statusDiv.innerHTML = `
                <p><strong>サーバーはオンラインです！</strong></p>
                <p>プレイヤー: ${data.players.online}/${data.players.max}</p>
                <p>バージョン: ${data.version}</p>
                <p>MOTD: ${data.motd.clean.join('<br>')}</p>
            `;
        } else {
            // オフラインの場合の表示
            statusDiv.className = 'alert alert-danger';
            statusDiv.innerHTML = `<p><strong>サーバーはオフラインです。</strong></p>`;
        }
    } catch (error) {
        // エラーが発生した場合の表示
        console.error('Error fetching server status:', error);
        statusDiv.className = 'alert alert-warning';
        statusDiv.innerHTML = `<p><strong>ステータスの取得中にエラーが発生しました。</strong></p>`;
    }
}
