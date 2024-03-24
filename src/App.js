import './App.css';
import React, { useState, useEffect } from 'react';

function timer(minute, second) {
  let intSecond = parseInt(second, 10);
  let intMinute = parseInt(minute, 10);
  if (intSecond == 0 && intMinute == 0) {
    return true;
  }
  if (intSecond == 0 && intMinute != 0) {
    intSecond = 59;
    intMinute -= 1;
  } else {
    intSecond -= 1;
  }

  return [intMinute.toString().padStart(2, '0'), intSecond.toString().padStart(2, '0')];
}

function App() {
  const [angle, setAngle] = useState(0);
  const [time, setTime] = useState("02");
  const [shortRest, setShortRest] = useState("05");
  const [isRest, setIsRest] = useState(false);
  const [second, setSecond] = useState("00");
  const shapeRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    //start属性がtrueの時にタイマーのゲージが描画される
    if (start) {
      const shape = shapeRef.current;
      //focusPaceを計算した結果をangleの変化に入れると、タイマーのゲージの描画が速くなってしまう(isRestがfalse、1番最初のスタートの時)
      // const focusPace = 0.1 / parseInt(time, 10);
      // const shortRestPace = 0.1 / parseInt(shortRest, 10);

      function drawCircle() {
        if (angle < 365) {
          if (!isRest) {
            //0.1で1周に60秒かかる
            setAngle((preAngle) => preAngle + 0.05);
            shape.style.backgroundImage = `conic-gradient(blue ${angle}deg, white ${angle}deg)`;
            animationRef.current = requestAnimationFrame(drawCircle);
          }
          else if (isRest) {
            setAngle((preAngle) => preAngle + 0.02);
            shape.style.backgroundImage = `conic-gradient(red ${angle}deg, white ${angle}deg)`;
            animationRef.current = requestAnimationFrame(drawCircle);
          }
        }
      }
      animationRef.current = requestAnimationFrame(drawCircle);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    }
  }, [angle, start]);

  useEffect(() => {
    let intervalId = null;
    if (start) {
      intervalId = setInterval(() => {
        const isStop = timer(time, second);
        if (isStop === true) {
          handleStop();
          clearInterval(intervalId);
          setTime(shortRest);
          setIsRest(true);
        }
        else {
          const [newTime, newSecond] = isStop;
          setTime(newTime);
          setSecond(newSecond);
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    }
  }, [time, second, start]);

  const handleStart = () => {
    if (isRest) {
      setAngle(0);
    }
    setStart(true);
  };
  const handleStop = () => {
    setStart(false);
  };

  return (
    <>
      <div className="App">
        <div className={`${isRest ? `bg-red-400` : `bg-blue-400`} h-screen w-screen flex flex-col justify-center items-center`}>
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
                <div className="shape" ref={shapeRef}>
                  <div className="inner-circul">
                    <div className="timer-content">
                      <p className="text-slate-100 text-9xl font-extrabold">{time}</p>
                      <p className="text-slate-100 text-9xl font-extrabold">{second}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-5 justify-around flex">
              {/* スタートストップ用 */}
              <button onClick={handleStart}>Start</button>
              <button onClick={handleStop}>Stop</button>
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
