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
    var _dataType = props['type'];
    var _container = document.querySelectorAll('[data-type=' + _dataType + ']')[0];
    var _closeBtn = _container.querySelector('.btn-popup-cancel');
    var _confirmBtn = _container.querySelector('.btn-popup-confirm');

    if(_closeBtn){
      _container.addEventListener('click',function(){
        _module.close();
      });
    }

    if(_confirmBtn){
      _container.addEventListener('click',function(){
        _module.close();
      });
    }
  }

  init();
  return _module
}


UIComponent.BottomSheet = function(props){
  var _module = new UIComponent.ModalInterface();

  function init(){
    setButtons();
  }

  function setButtons(){
    var _dataType = props['type'];
    var _container = document.querySelectorAll('[data-type=' + _dataType + ']')[0];
    var _closeBtn = _container.querySelector('.btn-popup-cancel');

    if(_closeBtn){
      _container.addEventListener('click',function(){
        _module.close();
      });
    }
  }

  init();
  return _module
}


UIComponent.modalOpen = function(props){
  function init(){
    modalFatory();
  }

  function modalFatory(){
    var _target = props['type'];
    var _open = props['option'];
    var _item = null;

    if(_target === 'window' && _open){
      _item = new UIComponent.Popup(props);
      _item.open();
    }else if(_target === 'bottomSheet' && _open){
      _item = new UIComponent.BottomSheet(props);
      _item.open();
    }
    return _item;
  }
  
  init();
}