import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <div className="bg-blue-400 h-screen w-screen flex flex-col justify-center items-center">
          <nav className="bg-blue-500 sticky top-0 z-50 w-full mb-20">
            <div className="mx-auto px-2 md:px-6 lg:px-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl text-slate-100">Pomodolo for your Creativity</h1>
              </div>
              <div className="flex justify-end items-center">
                <button className="text-xl text-blue-400 bg-slate-100 rounded-md p-1 m-1">mypage</button>
                <button className="text-xl text-blue-400 bg-slate-100 rounded-md p-1 m-1">share</button>
              </div>
            </div>
          </nav>
          <div className="flex-col justify-center items-center h-full">
            <div className="mt-10 ">
              {/* タイマー用 */}
              <div className="outer-Timer">
                <div className="inner-circul">
                  <div className="timer-content">
                    <p className="text-slate-100 text-9xl font-extrabold">20</p>
                    <p className="text-slate-100 text-9xl font-extrabold">00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-5 justify-around flex">
              {/* スタートストップ用 */}
              <button>Start</button>
              <button>Stop</button>
            </div>
            <div className="my-5">
              {/* 設定ボタン用 */}
              <button>Setting</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
