var UIComponent = UIComponent || {};

UIComponent.Event = {
	"popupOpen":new CustomEvent("popupOpen"),
	"popupClose":new CustomEvent("popupClose"),
}

UIComponent.ModalInterface = function(){
  var _popupWrap = document.querySelectorAll('.popup_wrap')[0];
  var _popupDimmend = null;

  function init(){
    setEvent();
  }

  function setEvent(){
    _popupWrap.addEventListener('popupOpen',function(){
      this.style.display = 'block';
      setDimmed();
    });

    _popupWrap.addEventListener('popupClose',function(){
      this.style.display = 'none';
    });
  }

  function setDimmed(){
    _popupDimmend = document.createElement('div');
    _popupDimmend.className = 'dimmed';
    _popupWrap.appendChild(_popupDimmend);
  }

  this.open = function(){
    _popupWrap.dispatchEvent(UIComponent.Event.popupOpen);
    console.log("open")
  }
  this.close = function(){
    _popupWrap.dispatchEvent(UIComponent.Event.popupClose);
    console.log("close");
  }

  init();
}

UIComponent.Popup = function(props){
  var _module = new UIComponent.ModalInterface();

  function init(){
    setButtons();
  }

  function setButtons(){
    var _target = props['target'];
    var _closeBtn = _target.querySelector('.btn-popup-cancel');
    var _confirmBtn = _target.querySelector('.btn-popup-confirm');

    if(_closeBtn){
      _closeBtn.addEventListener('click',function(){
        _module.close();
      });
    }

    if(_confirmBtn){
      _confirmBtn.addEventListener('click',function(){
        _module.close();
      });
    }
  }

  init();
  return _module
}


UIComponent.BottomSheet = function(props){
  var _module = new UIComponent.ModalInterface();
  var _target = props['target'];

  function init(){
    setButtons();
  }

  function setButtons(){
    var _closeBtn = _target.querySelector('.popup_close');

    if(_closeBtn){
      _closeBtn.addEventListener('click',function(){
        _module.close();
      });
    }
  }

  _target.addEventListener('popupOpen',function(){
    setTimeout(function(){
      _target.classList.add('show');
    },500)
  });

  init();
  return _module
}


UIComponent.modalOpen = function(props){
  function init(){
    modalFatory();
  }

  function modalFatory(){
    var _type = props['type'];
    var _option = props['option'];
    var _item = null;

    if(_type === 'window' && _option === 'open'){
      let _lists = document.querySelectorAll('[data-type="window"]');
      _lists.forEach(function(_list){
        _item = new UIComponent.Popup({
          'target':_list
        });
        _item.open();
      });
    }else if(_type === 'bottomSheet' && _option === 'open'){
      let _lists = document.querySelectorAll('[data-type="bottomSheet"]');
      _lists.forEach(function(_list){
        _item = new UIComponent.BottomSheet({
          'target' : _list
        });
        _item.open();
      });
    }
    return _item;
  }
  
  init();
}