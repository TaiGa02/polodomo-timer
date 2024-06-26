# ポモドーロタイマー管理アプリ
![スクリーンショット 2024-04-16 191324](https://github.com/TaiGa02/book-gather/assets/135023031/c786f850-581d-40f1-bccc-8624dee1c05a)
### 必要要件
##### タイマー機能
- ストップウォッチのようなタイマーデザイン
- スタート、ストップボタン付き
- 背景と音もつける
##### ログイン機能
- グーグルログイン
- オリジナルでログイン
- firebase authを使う
##### 時間調節機能
- タイマーの設定時間を調整
- 5，10，20，25，30，45分でカスタマイズ
- 休憩は5，10，15分でセット
- 大休憩は25，30,35,40でセット
##### グラフ機能
- chart.jsでその日の集中した時間の折れ線グラフを出す
- 棒グラフで集中した回数を出す
- この表を投稿できる
##### ポモドーロタイマー保存機能
- 4つ溜まったら大休憩することを判定するための機能
- 日を跨ぐとリセット
##### 投稿機能
- このアプリ内での投稿プラットフォーム、xと連携

#### ページ
- ログインページ
- タイマーページ（メニューバー、時間調節込み）
- マイページ（グラフを閲覧できる　＋メニューバー）
- 共有ページ（ポモドーロのグラフの投稿、共有ページ　＋メニューバー）


##### 開発備忘録
- タイマーのデザインに外側の円と内側の円は用いてデザイン
- タイマーのアニメーションにshapeとクラス名を付けた円を外側の円と同じサイズで設置
```
.shape {
  background-image: conic-gradient(blue 45deg, white 45deg);
  clip-path: circle();
  width: 400px;
  height: 400px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
```
- 扇形を上記のコードで作成
- javascriptで角度を埋めていく
```
  const [angle, setAngle] = useState(0);
  const shapeRef = React.useRef(null);

  useEffect(() => {
    const shape = shapeRef.current;

    function drawCircle() {
      if (angle < 365) {
        setAngle((prevAngle) => prevAngle + 0.1);
        shape.style.backgroundImage = `conic-gradient(blue ${angle}deg, white ${angle}deg)`;
        requestAnimationFrame(drawCircle);
      }
    }

    requestAnimationFrame(drawCircle);

    return () => {
      cancelAnimationFrame(drawCircle);
    };
  }, [angle]);
```
- 再帰が止まらずフリーズが起こった
```
  const [angle, setAngle] = useState(0);
  const shapeRef = React.useRef(null);
//アニメーションフレームの識別子を保持するためのanimationRefを追加
  const animationRef = React.useRef(null);

  useEffect(() => {
    const shape = shapeRef.current;

    function drawCircle() {
      if (angle < 365) {
        setAngle((preAngle) => preAngle + 0.1);
        shape.style.backgroundImage = `conic-gradient(blue ${angle}deg, white ${angle}deg)`;
//アニメーションフレームにrequestを格納する
        animationRef.current = requestAnimationFrame(drawCircle);
      }
    }
//アニメーション開始
    animationRef.current = requestAnimationFrame(drawCircle);

    return () => {
      cancelAnimationFrame(animationRef.current);
    }
  }, [angle]);
```
- これで解決できた。
- angleを0.1で描画し続けると1分でタイマーの描画が完了する
- 0.1を基準に計算してタイマーの数値によって変化させる
