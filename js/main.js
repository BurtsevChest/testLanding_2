$(document).ready(function(){
  //burger
  $('.burger_menu').click(function(){
    $('.menu').toggleClass('active');
      $(this).toggleClass('active');
      $('body').toggleClass('lock');
  });

//Переменные для видео
const play_btn = $('.play-btn'),
    progress = $('.progress'),
    time = $('.time'),
    volume_btn = $('.volume_btn'),
    video = $('.big_videofile'),
    fullscreen_btn = $('.fullscreen_btn');
    const vid = video[0];
    let f = false;
    let volume = false;

//Функции для видео
function statusVideo(){
  if(vid.paused){
    vid.play();
   }else{
        vid.pause();
      }
}

function changeProgress(){
   progress.val((vid.currentTime/vid.duration)*100);
 }

function changeVideotime(){
  vid.currentTime = (progress.val()*vid.duration)/100;
}

function timer(){
  let minutes = Math.floor(vid.currentTime/60);
  if(minutes<10){
    minutes = '0'+String(minutes);
  }
  let seconds = Math.floor(vid.currentTime%60);
  if(seconds<10){
    seconds = '0'+String(seconds);
  }
  time.html(`${minutes}:${seconds}`);
}

function closePanel(){
  $('.control_panel').removeClass('active');
}

function controlPanel(){
  statusVideo();

  if(vid.paused){
    $('.play-btn').addClass('play');
  }else{
  $('.play-btn').removeClass('play');
  }
}

//Изменение цвета ползунков
function range(){
      var val = $('#myrange').val();
    $('#myrange').css({
      'background':'-webkit-linear-gradient(left,#E93A7D 0%,#E93A7D '+val+'%, #fff '+val+'%, #fff 100%)'
    });
}

document.getElementById('myrange').addEventListener('input',function(){
    var val = $('#myrange').val();
  $('#myrange').css({
    'background':'-webkit-linear-gradient(left,#E93A7D 0%,#E93A7D '+val+'%, #fff '+val+'%, #fff 100%)'
  });
})

//Запуск видео
$('.icon_big_video').click(function(){
  $(this).toggleClass('play');
  statusVideo();
  $('.control_panel').addClass('active');
  setTimeout(closePanel,3000);
  f = true;
});

//Кнопка play
play_btn.click(controlPanel);

//Показать скрыть панель при клике на видео (для малых экранов)
if(window.screen.width<=750){
  $('.big_videofile').click(function(e){
    if(f){
      $('.control_panel').toggleClass('active');
      if(volume){
        $('.volume_btn>span').removeClass('active');
      }
        e.preventDefault();
    }
  });
}

//Показывать панель при движении мышки (большие экраны)
else{
  var timeout_controls;

  function set_timeout_controls() {
      if ($('.control_panel').css('z-index') == '10') {
        $('.control_panel').addClass('active');
      }

      clearTimeout(timeout_controls);

      timeout_controls = setTimeout(function() {
          if ($('.control_panel').css('z-index') == '9') {
            if(vid.paused){
              $('.control_panel').addClass('active');
            }else{
              $('.volume_btn>span').removeClass('active');
              $('.control_panel').removeClass('active');
            }
          }
      }, 3000);
  }

  vid.addEventListener('mousemove',function(){
    if(f && vid.played){
      set_timeout_controls();
    }
  });
}


//Пауза при нажатии на пробел
$(document).keypress(function(e) {
  if (f==true&&(e.key === ' ' || e.key === 'Spacebar')) {
      controlPanel();
      
      if(vid.paused){
        $('.control_panel').addClass('active');
      }else{
      $('.control_panel').removeClass('active');
      }
      if(volume){
        $('.volume_btn>span').removeClass('active');
      }

      e.preventDefault();
    }
});

//Таймер, цвет и движение ползунка видео
vid.addEventListener('timeupdate', someFunctions);

function someFunctions() {
  //Автоматическое изменение ползунка видеое
  changeProgress();

  //Изменение цвета ползунка
  range();

  //Таймер
  timer();
}

//Перемотка видео
progress.change(changeVideotime);

//Открыть панель звука
volume_btn.click(function(){
  $('.volume_btn>span').toggleClass('active');
  volume = true;
});

//Регулировка громкости
document.querySelector('.volume_btn>span>input').addEventListener('input',function(){
    vid.volume = this.value/100;
});

//Изменение цвета ползунка громкости
document.getElementById('myrange1').addEventListener('input',function(){
  var val = $('#myrange1').val();

  $('#myrange1').css({
    'background':'-webkit-linear-gradient(left,#E93A7D 0%,#E93A7D '+val+'%, #fff '+val+'%, #fff 100%)'
  });
});



//Функция для всего экрана
function fullscreen(){
  if(document.fullscreenElement === null){
    $('.videofile').addClass('active');
    $('.big_video').addClass('active');

    $('header').css({
      'position':'absolute'
    });

    $('body').addClass('lock');
    document.documentElement.requestFullscreen();

  }else{
    $('header').css({
      'position':'fixed'
    });

    $('body').removeClass('lock');
    $('.big_video').removeClass('active');
    $('.videofile').removeClass('active');

    document.exitFullscreen();
  }
}

//На весь экран при клике
$('.fullscreen_btn').click(fullscreen);

//На весь экран при двойном клике
$('.big_videofile').dblclick(fullscreen);

//Выход из полнго экрана через Escape
document.addEventListener('fullscreenchange', exitFullScreen);

function exitFullScreen() {
    if (!document.fullscreenElement) {
      $('header').css({
        'position':'fixed'
      });
      $('body').removeClass('lock');
      $('.big_video').removeClass('active');
      $('.videofile').removeClass('active');
    }
}

//Когда видео кончилось
document.querySelector('.big_videofile').addEventListener('ended',function(){
  $('.play-btn').addClass('play');
  $('.control_panel').addClass('active');
});

//Другие видео
$('.small_video').click(function(){
  $('.big_videofile').attr('src',$(this).attr('src'));
  $('.big_videofile').attr('poster',$(this).attr('poster'));
  //$('.play-btn').toggleClass('play');
  $('.progress').val(0);
});

//Переключатель
$('.choice_btn').click(function(){
  $(this).toggleClass('active');
});

$(".nav_link").click(function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});

$('#sign_up').click(function(event){
  event.preventDefault();
  $('.modal').toggleClass('active');
  $('.modal_window').toggleClass('active');
  $('body').toggleClass('lock');
});

$('.modal').click(function(event){
  event.preventDefault();
  $('.modal').toggleClass('active');
  $('.modal_window').toggleClass('active');
  $('body').toggleClass('lock');
});

$('.exit').click(function(){
  event.preventDefault();
  $('.modal').toggleClass('active');
  $('.modal_window').toggleClass('active');
  $('body').toggleClass('lock');
});
});
