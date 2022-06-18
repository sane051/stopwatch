# stopwatch
(function(){
    'use strict';

    
    //divタグのid属性'timer'を指定し、データを取得・変数に代入。

    let timer = document.getElementById('timer');
    
    //buttonタグのid属性'start'を指定し、データを取得・変数に代入。
    let start = document.getElementById('start');
    
    //buttonタグのid属性'stop'を指定し、データを取得・変数に代入。
    let stop = document.getElementById('stop');
    
     //buttonタグのid属性'reset'を指定し、データを取得・変数に代入。
    let reset = document.getElementById('reset');

    //クリック時の時間を保持するための変数を定義
    let startTime;

    //経過時刻を更新するための変数を定義。初めは0で初期化する
    let elapsedTime = 0;

    //タイマーを止める→clearTimeoutを使う。=clearTimeoutの引数に渡すためのタイマーのidが必要
    let timerId;

    //タイマーをストップ -> 再開後、０になるのを防ぐ。
    let timeToadd = 0;



    //Date.now()はタイムスタンプを返す。タイムスタンプは、UTCでの1970年1月1日0時0分0秒から現在までの経過時間をミリ秒単位で表したもの。
    
    
    function updateTimetText(){ 
      
      //60分は60000マイクロ秒＊60。
       let mm = Math.floor(elapsedTime /3600000);
      //1分は60000マイクロ秒。60000で割ることにより、分が計算される。
       let m = Math.floor(elapsedTime /60000);
       
      //1分は60000マイクロ秒。60000ミリ秒で割り、その余りを1000で割れば秒が計算される。
       let s = Math.floor((elapsedTime % 60000) / 1000);
       
       let ms = elapsedTime % 1000;
       
    //桁数を合わせるため、０で埋めていく
       mm = ('0' + mm).slice(-2); 
       m = ('0' + m).slice(-2); 
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);
      
       timer.textContent = mm + ':'+ m + ':' + s + ':' + ms;
   }
    
    
    
     //再帰的に使える用の関数
    function countUp(){

        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){

            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime + timeToadd;
            
            updateTimetText()

            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            countUp();

        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        },10);
    }
    
    
    //startボタンにクリック時の動作
    start.addEventListener('click',function(){

        //在時刻を示すDate.nowを代入
        startTime = Date.now();

        //再帰的に使えるように関数を作る
        countUp();
    });

    //stopボタンにクリック
    stop.addEventListener('click',function(){

        //タイマーを止めるにはclearTimeoutを使う。clearTimeoutの引数に渡すためのタイマーのidが必要
       clearTimeout(timerId);


        //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたもの。
        //タイマーを再開させたら0になってしまう。
        //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。
       //Date.now()=ストップを押した時間、startTime=過去にスタートを押した値
       timeToadd += Date.now() - startTime;
    });

    //resetボタンにクリック時
    reset.addEventListener('click',function(){

        //経過時刻を更新するための変数elapsedTimeを0
        
        elapsedTime = 0;

        //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
        timeToadd = 0;

        //updateTimetTextで0になったタイムを表示
        updateTimetText();

    });
})();
