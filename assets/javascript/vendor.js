/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-touchevents !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,i,a,r;for(var l in f)if(f.hasOwnProperty(l)){if(e=[],n=f[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)a=e[i],r=a.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),d.push((s?"":"no-")+r.join("-"))}}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function r(e,t,o,s){var r,f,l,d,u="modernizr",p=i("div"),h=a();if(parseInt(o,10))for(;o--;)l=i("div"),l.id=s?s[o]:u+(o+1),p.appendChild(l);return r=i("style"),r.type="text/css",r.id="s"+u,(h.fake?h:p).appendChild(r),h.appendChild(p),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(n.createTextNode(e)),p.id=u,h.fake&&(h.style.background="",h.style.overflow="hidden",d=c.style.overflow,c.style.overflow="hidden",c.appendChild(h)),f=t(p,e),h.fake?(h.parentNode.removeChild(h),c.style.overflow=d,c.offsetHeight):p.parentNode.removeChild(p),!!f}var f=[],l={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){f.push({name:e,fn:n,options:t})},addAsyncTest:function(e){f.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var d=[],u=l._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];l._prefixes=u;var c=n.documentElement,p="svg"===c.nodeName.toLowerCase(),h=l.testStyles=r;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",u.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");h(o,function(e){t=9===e.offsetTop})}return t}),s(),delete l.addTest,delete l.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);
/**
* @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;(function(window, document) {
/*jshint evil:true */
  /** version */
  var version = '3.7.3-pre';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
        supportsHtml5Styles = ('hidden' in a);

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
          // assign a false positive if unable to shiv
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (
            typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
        }());
    } catch(e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Extends the built-in list of html5 elements
   * @memberOf html5
   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
   * @param {Document} ownerDocument The context document.
   */
  function addElements(newElements, ownerDocument) {
    var elements = html5.elements;
    if(typeof elements != 'string'){
      elements = elements.join(' ');
    }
    if(typeof newElements != 'string'){
      newElements = newElements.join(' ');
    }
    html5.elements = elements +' '+ newElements;
    shivDocument(ownerDocument);
  }

   /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName);
    }
    if (!data) {
        data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
        node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
    for(;i<l;i++){
        clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
          return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
        ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}' +
        // hides non-rendered elements
        'template{display:none}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

    /**
     * current version of html5shiv
     */
    'version': version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment,

    //extends list of elements
    addElements: addElements
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  if(typeof module == 'object' && module.exports){
    module.exports = html5;
  }

}(typeof window !== "undefined" ? window : this, document));

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
;(function (factory) { 
if (typeof define === 'function' && define.amd) { 
 // AMD. Register as an anonymous module. 
 define(['jquery'], factory); 
 } else if (typeof exports === 'object') { 
 // Node/CommonJS 
 factory(require('jquery')); 
 } else { 
 // Browser globals 
 factory(window.jQuery || window.Zepto); 
 } 
 }(function($) { 

/*>>core*/
/**
 * 
 * Magnific Popup Core JS file
 * 
 */


/**
 * Private static constants
 */
var CLOSE_EVENT = 'Close',
	BEFORE_CLOSE_EVENT = 'BeforeClose',
	AFTER_CLOSE_EVENT = 'AfterClose',
	BEFORE_APPEND_EVENT = 'BeforeAppend',
	MARKUP_PARSE_EVENT = 'MarkupParse',
	OPEN_EVENT = 'Open',
	CHANGE_EVENT = 'Change',
	NS = 'mfp',
	EVENT_NS = '.' + NS,
	READY_CLASS = 'mfp-ready',
	REMOVING_CLASS = 'mfp-removing',
	PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


/**
 * Private vars 
 */
/*jshint -W079 */
var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
	MagnificPopup = function(){},
	_isJQ = !!(window.jQuery),
	_prevStatus,
	_window = $(window),
	_document,
	_prevContentType,
	_wrapClasses,
	_currPopupType;


/**
 * Private functions
 */
var _mfpOn = function(name, f) {
		mfp.ev.on(NS + name + EVENT_NS, f);
	},
	_getEl = function(className, appendTo, html, raw) {
		var el = document.createElement('div');
		el.className = 'mfp-'+className;
		if(html) {
			el.innerHTML = html;
		}
		if(!raw) {
			el = $(el);
			if(appendTo) {
				el.appendTo(appendTo);
			}
		} else if(appendTo) {
			appendTo.appendChild(el);
		}
		return el;
	},
	_mfpTrigger = function(e, data) {
		mfp.ev.triggerHandler(NS + e, data);

		if(mfp.st.callbacks) {
			// converts "mfpEventName" to "eventName" callback and triggers it if it's present
			e = e.charAt(0).toLowerCase() + e.slice(1);
			if(mfp.st.callbacks[e]) {
				mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
			}
		}
	},
	_getCloseBtn = function(type) {
		if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
			mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
			_currPopupType = type;
		}
		return mfp.currTemplate.closeBtn;
	},
	// Initialize Magnific Popup only when called at least once
	_checkInstance = function() {
		if(!$.magnificPopup.instance) {
			/*jshint -W020 */
			mfp = new MagnificPopup();
			mfp.init();
			$.magnificPopup.instance = mfp;
		}
	},
	// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	supportsTransitions = function() {
		var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
			v = ['ms','O','Moz','Webkit']; // 'v' for vendor

		if( s['transition'] !== undefined ) {
			return true; 
		}
			
		while( v.length ) {
			if( v.pop() + 'Transition' in s ) {
				return true;
			}
		}
				
		return false;
	};



/**
 * Public functions
 */
MagnificPopup.prototype = {

	constructor: MagnificPopup,

	/**
	 * Initializes Magnific Popup plugin. 
	 * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
	 */
	init: function() {
		var appVersion = navigator.appVersion;
		mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
		mfp.isAndroid = (/android/gi).test(appVersion);
		mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
		mfp.supportsTransition = supportsTransitions();

		// We disable fixed positioned lightbox on devices that don't handle it nicely.
		// If you know a better way of detecting this - let me know.
		mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
		_document = $(document);

		mfp.popupsCache = {};
	},

	/**
	 * Opens popup
	 * @param  data [description]
	 */
	open: function(data) {

		var i;

		if(data.isObj === false) { 
			// convert jQuery collection to array to avoid conflicts later
			mfp.items = data.items.toArray();

			mfp.index = 0;
			var items = data.items,
				item;
			for(i = 0; i < items.length; i++) {
				item = items[i];
				if(item.parsed) {
					item = item.el[0];
				}
				if(item === data.el[0]) {
					mfp.index = i;
					break;
				}
			}
		} else {
			mfp.items = $.isArray(data.items) ? data.items : [data.items];
			mfp.index = data.index || 0;
		}

		// if popup is already opened - we just update the content
		if(mfp.isOpen) {
			mfp.updateItemHTML();
			return;
		}
		
		mfp.types = []; 
		_wrapClasses = '';
		if(data.mainEl && data.mainEl.length) {
			mfp.ev = data.mainEl.eq(0);
		} else {
			mfp.ev = _document;
		}

		if(data.key) {
			if(!mfp.popupsCache[data.key]) {
				mfp.popupsCache[data.key] = {};
			}
			mfp.currTemplate = mfp.popupsCache[data.key];
		} else {
			mfp.currTemplate = {};
		}



		mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
		mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

		if(mfp.st.modal) {
			mfp.st.closeOnContentClick = false;
			mfp.st.closeOnBgClick = false;
			mfp.st.showCloseBtn = false;
			mfp.st.enableEscapeKey = false;
		}
		

		// Building markup
		// main containers are created only once
		if(!mfp.bgOverlay) {

			// Dark overlay
			mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
				mfp.close();
			});

			mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
				if(mfp._checkIfClose(e.target)) {
					mfp.close();
				}
			});

			mfp.container = _getEl('container', mfp.wrap);
		}

		mfp.contentContainer = _getEl('content');
		if(mfp.st.preloader) {
			mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
		}


		// Initializing modules
		var modules = $.magnificPopup.modules;
		for(i = 0; i < modules.length; i++) {
			var n = modules[i];
			n = n.charAt(0).toUpperCase() + n.slice(1);
			mfp['init'+n].call(mfp);
		}
		_mfpTrigger('BeforeOpen');


		if(mfp.st.showCloseBtn) {
			// Close button
			if(!mfp.st.closeBtnInside) {
				mfp.wrap.append( _getCloseBtn() );
			} else {
				_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
					values.close_replaceWith = _getCloseBtn(item.type);
				});
				_wrapClasses += ' mfp-close-btn-in';
			}
		}

		if(mfp.st.alignTop) {
			_wrapClasses += ' mfp-align-top';
		}

	

		if(mfp.fixedContentPos) {
			mfp.wrap.css({
				overflow: mfp.st.overflowY,
				overflowX: 'hidden',
				overflowY: mfp.st.overflowY
			});
		} else {
			mfp.wrap.css({ 
				top: _window.scrollTop(),
				position: 'absolute'
			});
		}
		if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
			mfp.bgOverlay.css({
				height: _document.height(),
				position: 'absolute'
			});
		}

		

		if(mfp.st.enableEscapeKey) {
			// Close on ESC key
			_document.on('keyup' + EVENT_NS, function(e) {
				if(e.keyCode === 27) {
					mfp.close();
				}
			});
		}

		_window.on('resize' + EVENT_NS, function() {
			mfp.updateSize();
		});


		if(!mfp.st.closeOnContentClick) {
			_wrapClasses += ' mfp-auto-cursor';
		}
		
		if(_wrapClasses)
			mfp.wrap.addClass(_wrapClasses);


		// this triggers recalculation of layout, so we get it once to not to trigger twice
		var windowHeight = mfp.wH = _window.height();

		
		var windowStyles = {};

		if( mfp.fixedContentPos ) {
            if(mfp._hasScrollBar(windowHeight)){
                var s = mfp._getScrollbarSize();
                if(s) {
                    windowStyles.marginRight = s;
                }
            }
        }

		if(mfp.fixedContentPos) {
			if(!mfp.isIE7) {
				windowStyles.overflow = 'hidden';
			} else {
				// ie7 double-scroll bug
				$('body, html').css('overflow', 'hidden');
			}
		}

		
		
		var classesToadd = mfp.st.mainClass;
		if(mfp.isIE7) {
			classesToadd += ' mfp-ie7';
		}
		if(classesToadd) {
			mfp._addClassToMFP( classesToadd );
		}

		// add content
		mfp.updateItemHTML();

		_mfpTrigger('BuildControls');

		// remove scrollbar, add margin e.t.c
		$('html').css(windowStyles);
		
		// add everything to DOM
		mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );

		// Save last focused element
		mfp._lastFocusedEl = document.activeElement;
		
		// Wait for next cycle to allow CSS transition
		setTimeout(function() {
			
			if(mfp.content) {
				mfp._addClassToMFP(READY_CLASS);
				mfp._setFocus();
			} else {
				// if content is not defined (not loaded e.t.c) we add class only for BG
				mfp.bgOverlay.addClass(READY_CLASS);
			}
			
			// Trap the focus in popup
			_document.on('focusin' + EVENT_NS, mfp._onFocusIn);

		}, 16);

		mfp.isOpen = true;
		mfp.updateSize(windowHeight);
		_mfpTrigger(OPEN_EVENT);

		return data;
	},

	/**
	 * Closes the popup
	 */
	close: function() {
		if(!mfp.isOpen) return;
		_mfpTrigger(BEFORE_CLOSE_EVENT);

		mfp.isOpen = false;
		// for CSS3 animation
		if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
			mfp._addClassToMFP(REMOVING_CLASS);
			setTimeout(function() {
				mfp._close();
			}, mfp.st.removalDelay);
		} else {
			mfp._close();
		}
	},

	/**
	 * Helper for close() function
	 */
	_close: function() {
		_mfpTrigger(CLOSE_EVENT);

		var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

		mfp.bgOverlay.detach();
		mfp.wrap.detach();
		mfp.container.empty();

		if(mfp.st.mainClass) {
			classesToRemove += mfp.st.mainClass + ' ';
		}

		mfp._removeClassFromMFP(classesToRemove);

		if(mfp.fixedContentPos) {
			var windowStyles = {marginRight: ''};
			if(mfp.isIE7) {
				$('body, html').css('overflow', '');
			} else {
				windowStyles.overflow = '';
			}
			$('html').css(windowStyles);
		}
		
		_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
		mfp.ev.off(EVENT_NS);

		// clean up DOM elements that aren't removed
		mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
		mfp.bgOverlay.attr('class', 'mfp-bg');
		mfp.container.attr('class', 'mfp-container');

		// remove close button from target element
		if(mfp.st.showCloseBtn &&
		(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
			if(mfp.currTemplate.closeBtn)
				mfp.currTemplate.closeBtn.detach();
		}


		if(mfp.st.autoFocusLast && mfp._lastFocusedEl) {
			$(mfp._lastFocusedEl).focus(); // put tab focus back
		}
		mfp.currItem = null;	
		mfp.content = null;
		mfp.currTemplate = null;
		mfp.prevHeight = 0;

		_mfpTrigger(AFTER_CLOSE_EVENT);
	},
	
	updateSize: function(winHeight) {

		if(mfp.isIOS) {
			// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
			var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
			var height = window.innerHeight * zoomLevel;
			mfp.wrap.css('height', height);
			mfp.wH = height;
		} else {
			mfp.wH = winHeight || _window.height();
		}
		// Fixes #84: popup incorrectly positioned with position:relative on body
		if(!mfp.fixedContentPos) {
			mfp.wrap.css('height', mfp.wH);
		}

		_mfpTrigger('Resize');

	},

	/**
	 * Set content of popup based on current index
	 */
	updateItemHTML: function() {
		var item = mfp.items[mfp.index];

		// Detach and perform modifications
		mfp.contentContainer.detach();

		if(mfp.content)
			mfp.content.detach();

		if(!item.parsed) {
			item = mfp.parseEl( mfp.index );
		}

		var type = item.type;

		_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
		// BeforeChange event works like so:
		// _mfpOn('BeforeChange', function(e, prevType, newType) { });

		mfp.currItem = item;

		if(!mfp.currTemplate[type]) {
			var markup = mfp.st[type] ? mfp.st[type].markup : false;

			// allows to modify markup
			_mfpTrigger('FirstMarkupParse', markup);

			if(markup) {
				mfp.currTemplate[type] = $(markup);
			} else {
				// if there is no markup found we just define that template is parsed
				mfp.currTemplate[type] = true;
			}
		}

		if(_prevContentType && _prevContentType !== item.type) {
			mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
		}

		var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
		mfp.appendContent(newContent, type);

		item.preloaded = true;

		_mfpTrigger(CHANGE_EVENT, item);
		_prevContentType = item.type;

		// Append container back after its content changed
		mfp.container.prepend(mfp.contentContainer);

		_mfpTrigger('AfterChange');
	},


	/**
	 * Set HTML content of popup
	 */
	appendContent: function(newContent, type) {
		mfp.content = newContent;

		if(newContent) {
			if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
				mfp.currTemplate[type] === true) {
				// if there is no markup, we just append close button element inside
				if(!mfp.content.find('.mfp-close').length) {
					mfp.content.append(_getCloseBtn());
				}
			} else {
				mfp.content = newContent;
			}
		} else {
			mfp.content = '';
		}

		_mfpTrigger(BEFORE_APPEND_EVENT);
		mfp.container.addClass('mfp-'+type+'-holder');

		mfp.contentContainer.append(mfp.content);
	},


	/**
	 * Creates Magnific Popup data object based on given data
	 * @param  {int} index Index of item to parse
	 */
	parseEl: function(index) {
		var item = mfp.items[index],
			type;

		if(item.tagName) {
			item = { el: $(item) };
		} else {
			type = item.type;
			item = { data: item, src: item.src };
		}

		if(item.el) {
			var types = mfp.types;

			// check for 'mfp-TYPE' class
			for(var i = 0; i < types.length; i++) {
				if( item.el.hasClass('mfp-'+types[i]) ) {
					type = types[i];
					break;
				}
			}

			item.src = item.el.attr('data-mfp-src');
			if(!item.src) {
				item.src = item.el.attr('href');
			}
		}

		item.type = type || mfp.st.type || 'inline';
		item.index = index;
		item.parsed = true;
		mfp.items[index] = item;
		_mfpTrigger('ElementParse', item);

		return mfp.items[index];
	},


	/**
	 * Initializes single popup or a group of popups
	 */
	addGroup: function(el, options) {
		var eHandler = function(e) {
			e.mfpEl = this;
			mfp._openClick(e, el, options);
		};

		if(!options) {
			options = {};
		}

		var eName = 'click.magnificPopup';
		options.mainEl = el;

		if(options.items) {
			options.isObj = true;
			el.off(eName).on(eName, eHandler);
		} else {
			options.isObj = false;
			if(options.delegate) {
				el.off(eName).on(eName, options.delegate , eHandler);
			} else {
				options.items = el;
				el.off(eName).on(eName, eHandler);
			}
		}
	},
	_openClick: function(e, el, options) {
		var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


		if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ) ) {
			return;
		}

		var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

		if(disableOn) {
			if($.isFunction(disableOn)) {
				if( !disableOn.call(mfp) ) {
					return true;
				}
			} else { // else it's number
				if( _window.width() < disableOn ) {
					return true;
				}
			}
		}

		if(e.type) {
			e.preventDefault();

			// This will prevent popup from closing if element is inside and popup is already opened
			if(mfp.isOpen) {
				e.stopPropagation();
			}
		}

		options.el = $(e.mfpEl);
		if(options.delegate) {
			options.items = el.find(options.delegate);
		}
		mfp.open(options);
	},


	/**
	 * Updates text on preloader
	 */
	updateStatus: function(status, text) {

		if(mfp.preloader) {
			if(_prevStatus !== status) {
				mfp.container.removeClass('mfp-s-'+_prevStatus);
			}

			if(!text && status === 'loading') {
				text = mfp.st.tLoading;
			}

			var data = {
				status: status,
				text: text
			};
			// allows to modify status
			_mfpTrigger('UpdateStatus', data);

			status = data.status;
			text = data.text;

			mfp.preloader.html(text);

			mfp.preloader.find('a').on('click', function(e) {
				e.stopImmediatePropagation();
			});

			mfp.container.addClass('mfp-s-'+status);
			_prevStatus = status;
		}
	},


	/*
		"Private" helpers that aren't private at all
	 */
	// Check to close popup or not
	// "target" is an element that was clicked
	_checkIfClose: function(target) {

		if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
			return;
		}

		var closeOnContent = mfp.st.closeOnContentClick;
		var closeOnBg = mfp.st.closeOnBgClick;

		if(closeOnContent && closeOnBg) {
			return true;
		} else {

			// We close the popup if click is on close button or on preloader. Or if there is no content.
			if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
				return true;
			}

			// if click is outside the content
			if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
				if(closeOnBg) {
					// last check, if the clicked element is in DOM, (in case it's removed onclick)
					if( $.contains(document, target) ) {
						return true;
					}
				}
			} else if(closeOnContent) {
				return true;
			}

		}
		return false;
	},
	_addClassToMFP: function(cName) {
		mfp.bgOverlay.addClass(cName);
		mfp.wrap.addClass(cName);
	},
	_removeClassFromMFP: function(cName) {
		this.bgOverlay.removeClass(cName);
		mfp.wrap.removeClass(cName);
	},
	_hasScrollBar: function(winHeight) {
		return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
	},
	_setFocus: function() {
		(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
	},
	_onFocusIn: function(e) {
		if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
			mfp._setFocus();
			return false;
		}
	},
	_parseMarkup: function(template, values, item) {
		var arr;
		if(item.data) {
			values = $.extend(item.data, values);
		}
		_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

		$.each(values, function(key, value) {
			if(value === undefined || value === false) {
				return true;
			}
			arr = key.split('_');
			if(arr.length > 1) {
				var el = template.find(EVENT_NS + '-'+arr[0]);

				if(el.length > 0) {
					var attr = arr[1];
					if(attr === 'replaceWith') {
						if(el[0] !== value[0]) {
							el.replaceWith(value);
						}
					} else if(attr === 'img') {
						if(el.is('img')) {
							el.attr('src', value);
						} else {
							el.replaceWith( $('<img>').attr('src', value).attr('class', el.attr('class')) );
						}
					} else {
						el.attr(arr[1], value);
					}
				}

			} else {
				template.find(EVENT_NS + '-'+key).html(value);
			}
		});
	},

	_getScrollbarSize: function() {
		// thx David
		if(mfp.scrollbarSize === undefined) {
			var scrollDiv = document.createElement("div");
			scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
			document.body.appendChild(scrollDiv);
			mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
		return mfp.scrollbarSize;
	}

}; /* MagnificPopup core prototype end */




/**
 * Public static functions
 */
$.magnificPopup = {
	instance: null,
	proto: MagnificPopup.prototype,
	modules: [],

	open: function(options, index) {
		_checkInstance();

		if(!options) {
			options = {};
		} else {
			options = $.extend(true, {}, options);
		}

		options.isObj = true;
		options.index = index || 0;
		return this.instance.open(options);
	},

	close: function() {
		return $.magnificPopup.instance && $.magnificPopup.instance.close();
	},

	registerModule: function(name, module) {
		if(module.options) {
			$.magnificPopup.defaults[name] = module.options;
		}
		$.extend(this.proto, module.proto);
		this.modules.push(name);
	},

	defaults: {

		// Info about options is in docs:
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

		disableOn: 0,

		key: null,

		midClick: false,

		mainClass: '',

		preloader: true,

		focus: '', // CSS selector of input to focus after popup is opened

		closeOnContentClick: false,

		closeOnBgClick: true,

		closeBtnInside: true,

		showCloseBtn: true,

		enableEscapeKey: true,

		modal: false,

		alignTop: false,

		removalDelay: 0,

		prependTo: null,

		fixedContentPos: 'auto',

		fixedBgPos: 'auto',

		overflowY: 'auto',

		closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

		tClose: 'Close (Esc)',

		tLoading: 'Loading...',

		autoFocusLast: true

	}
};



$.fn.magnificPopup = function(options) {
	_checkInstance();

	var jqEl = $(this);

	// We call some API method of first param is a string
	if (typeof options === "string" ) {

		if(options === 'open') {
			var items,
				itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
				index = parseInt(arguments[1], 10) || 0;

			if(itemOpts.items) {
				items = itemOpts.items[index];
			} else {
				items = jqEl;
				if(itemOpts.delegate) {
					items = items.find(itemOpts.delegate);
				}
				items = items.eq( index );
			}
			mfp._openClick({mfpEl:items}, jqEl, itemOpts);
		} else {
			if(mfp.isOpen)
				mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
		}

	} else {
		// clone options obj
		options = $.extend(true, {}, options);

		/*
		 * As Zepto doesn't support .data() method for objects
		 * and it works only in normal browsers
		 * we assign "options" object directly to the DOM element. FTW!
		 */
		if(_isJQ) {
			jqEl.data('magnificPopup', options);
		} else {
			jqEl[0].magnificPopup = options;
		}

		mfp.addGroup(jqEl, options);

	}
	return jqEl;
};

/*>>core*/

/*>>inline*/

var INLINE_NS = 'inline',
	_hiddenClass,
	_inlinePlaceholder,
	_lastInlineElement,
	_putInlineElementsBack = function() {
		if(_lastInlineElement) {
			_inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
			_lastInlineElement = null;
		}
	};

$.magnificPopup.registerModule(INLINE_NS, {
	options: {
		hiddenClass: 'hide', // will be appended with `mfp-` prefix
		markup: '',
		tNotFound: 'Content not found'
	},
	proto: {

		initInline: function() {
			mfp.types.push(INLINE_NS);

			_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
				_putInlineElementsBack();
			});
		},

		getInline: function(item, template) {

			_putInlineElementsBack();

			if(item.src) {
				var inlineSt = mfp.st.inline,
					el = $(item.src);

				if(el.length) {

					// If target element has parent - we replace it with placeholder and put it back after popup is closed
					var parent = el[0].parentNode;
					if(parent && parent.tagName) {
						if(!_inlinePlaceholder) {
							_hiddenClass = inlineSt.hiddenClass;
							_inlinePlaceholder = _getEl(_hiddenClass);
							_hiddenClass = 'mfp-'+_hiddenClass;
						}
						// replace target inline element with placeholder
						_lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
					}

					mfp.updateStatus('ready');
				} else {
					mfp.updateStatus('error', inlineSt.tNotFound);
					el = $('<div>');
				}

				item.inlineElement = el;
				return el;
			}

			mfp.updateStatus('ready');
			mfp._parseMarkup(template, {}, item);
			return template;
		}
	}
});

/*>>inline*/

/*>>ajax*/
var AJAX_NS = 'ajax',
	_ajaxCur,
	_removeAjaxCursor = function() {
		if(_ajaxCur) {
			$(document.body).removeClass(_ajaxCur);
		}
	},
	_destroyAjaxRequest = function() {
		_removeAjaxCursor();
		if(mfp.req) {
			mfp.req.abort();
		}
	};

$.magnificPopup.registerModule(AJAX_NS, {

	options: {
		settings: null,
		cursor: 'mfp-ajax-cur',
		tError: '<a href="%url%">The content</a> could not be loaded.'
	},

	proto: {
		initAjax: function() {
			mfp.types.push(AJAX_NS);
			_ajaxCur = mfp.st.ajax.cursor;

			_mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
			_mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
		},
		getAjax: function(item) {

			if(_ajaxCur) {
				$(document.body).addClass(_ajaxCur);
			}

			mfp.updateStatus('loading');

			var opts = $.extend({
				url: item.src,
				success: function(data, textStatus, jqXHR) {
					var temp = {
						data:data,
						xhr:jqXHR
					};

					_mfpTrigger('ParseAjax', temp);

					mfp.appendContent( $(temp.data), AJAX_NS );

					item.finished = true;

					_removeAjaxCursor();

					mfp._setFocus();

					setTimeout(function() {
						mfp.wrap.addClass(READY_CLASS);
					}, 16);

					mfp.updateStatus('ready');

					_mfpTrigger('AjaxContentAdded');
				},
				error: function() {
					_removeAjaxCursor();
					item.finished = item.loadError = true;
					mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
				}
			}, mfp.st.ajax.settings);

			mfp.req = $.ajax(opts);

			return '';
		}
	}
});

/*>>ajax*/

/*>>image*/
var _imgInterval,
	_getTitle = function(item) {
		if(item.data && item.data.title !== undefined)
			return item.data.title;

		var src = mfp.st.image.titleSrc;

		if(src) {
			if($.isFunction(src)) {
				return src.call(mfp, item);
			} else if(item.el) {
				return item.el.attr(src) || '';
			}
		}
		return '';
	};

$.magnificPopup.registerModule('image', {

	options: {
		markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<figure>'+
						'<div class="mfp-img"></div>'+
						'<figcaption>'+
							'<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							'</div>'+
						'</figcaption>'+
					'</figure>'+
				'</div>',
		cursor: 'mfp-zoom-out-cur',
		titleSrc: 'title',
		verticalFit: true,
		tError: '<a href="%url%">The image</a> could not be loaded.'
	},

	proto: {
		initImage: function() {
			var imgSt = mfp.st.image,
				ns = '.image';

			mfp.types.push('image');

			_mfpOn(OPEN_EVENT+ns, function() {
				if(mfp.currItem.type === 'image' && imgSt.cursor) {
					$(document.body).addClass(imgSt.cursor);
				}
			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(imgSt.cursor) {
					$(document.body).removeClass(imgSt.cursor);
				}
				_window.off('resize' + EVENT_NS);
			});

			_mfpOn('Resize'+ns, mfp.resizeImage);
			if(mfp.isLowIE) {
				_mfpOn('AfterChange', mfp.resizeImage);
			}
		},
		resizeImage: function() {
			var item = mfp.currItem;
			if(!item || !item.img) return;

			if(mfp.st.image.verticalFit) {
				var decr = 0;
				// fix box-sizing in ie7/8
				if(mfp.isLowIE) {
					decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
				}
				item.img.css('max-height', mfp.wH-decr);
			}
		},
		_onImageHasSize: function(item) {
			if(item.img) {

				item.hasSize = true;

				if(_imgInterval) {
					clearInterval(_imgInterval);
				}

				item.isCheckingImgSize = false;

				_mfpTrigger('ImageHasSize', item);

				if(item.imgHidden) {
					if(mfp.content)
						mfp.content.removeClass('mfp-loading');

					item.imgHidden = false;
				}

			}
		},

		/**
		 * Function that loops until the image has size to display elements that rely on it asap
		 */
		findImageSize: function(item) {

			var counter = 0,
				img = item.img[0],
				mfpSetInterval = function(delay) {

					if(_imgInterval) {
						clearInterval(_imgInterval);
					}
					// decelerating interval that checks for size of an image
					_imgInterval = setInterval(function() {
						if(img.naturalWidth > 0) {
							mfp._onImageHasSize(item);
							return;
						}

						if(counter > 200) {
							clearInterval(_imgInterval);
						}

						counter++;
						if(counter === 3) {
							mfpSetInterval(10);
						} else if(counter === 40) {
							mfpSetInterval(50);
						} else if(counter === 100) {
							mfpSetInterval(500);
						}
					}, delay);
				};

			mfpSetInterval(1);
		},

		getImage: function(item, template) {

			var guard = 0,

				// image load complete handler
				onLoadComplete = function() {
					if(item) {
						if (item.img[0].complete) {
							item.img.off('.mfploader');

							if(item === mfp.currItem){
								mfp._onImageHasSize(item);

								mfp.updateStatus('ready');
							}

							item.hasSize = true;
							item.loaded = true;

							_mfpTrigger('ImageLoadComplete');

						}
						else {
							// if image complete check fails 200 times (20 sec), we assume that there was an error.
							guard++;
							if(guard < 200) {
								setTimeout(onLoadComplete,100);
							} else {
								onLoadError();
							}
						}
					}
				},

				// image error handler
				onLoadError = function() {
					if(item) {
						item.img.off('.mfploader');
						if(item === mfp.currItem){
							mfp._onImageHasSize(item);
							mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
						}

						item.hasSize = true;
						item.loaded = true;
						item.loadError = true;
					}
				},
				imgSt = mfp.st.image;


			var el = template.find('.mfp-img');
			if(el.length) {
				var img = document.createElement('img');
				img.className = 'mfp-img';
				if(item.el && item.el.find('img').length) {
					img.alt = item.el.find('img').attr('alt');
				}
				item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
				img.src = item.src;

				// without clone() "error" event is not firing when IMG is replaced by new IMG
				// TODO: find a way to avoid such cloning
				if(el.is('img')) {
					item.img = item.img.clone();
				}

				img = item.img[0];
				if(img.naturalWidth > 0) {
					item.hasSize = true;
				} else if(!img.width) {
					item.hasSize = false;
				}
			}

			mfp._parseMarkup(template, {
				title: _getTitle(item),
				img_replaceWith: item.img
			}, item);

			mfp.resizeImage();

			if(item.hasSize) {
				if(_imgInterval) clearInterval(_imgInterval);

				if(item.loadError) {
					template.addClass('mfp-loading');
					mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
				} else {
					template.removeClass('mfp-loading');
					mfp.updateStatus('ready');
				}
				return template;
			}

			mfp.updateStatus('loading');
			item.loading = true;

			if(!item.hasSize) {
				item.imgHidden = true;
				template.addClass('mfp-loading');
				mfp.findImageSize(item);
			}

			return template;
		}
	}
});

/*>>image*/

/*>>zoom*/
var hasMozTransform,
	getHasMozTransform = function() {
		if(hasMozTransform === undefined) {
			hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
		}
		return hasMozTransform;
	};

$.magnificPopup.registerModule('zoom', {

	options: {
		enabled: false,
		easing: 'ease-in-out',
		duration: 300,
		opener: function(element) {
			return element.is('img') ? element : element.find('img');
		}
	},

	proto: {

		initZoom: function() {
			var zoomSt = mfp.st.zoom,
				ns = '.zoom',
				image;

			if(!zoomSt.enabled || !mfp.supportsTransition) {
				return;
			}

			var duration = zoomSt.duration,
				getElToAnimate = function(image) {
					var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
						transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
						cssObj = {
							position: 'fixed',
							zIndex: 9999,
							left: 0,
							top: 0,
							'-webkit-backface-visibility': 'hidden'
						},
						t = 'transition';

					cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

					newImg.css(cssObj);
					return newImg;
				},
				showMainContent = function() {
					mfp.content.css('visibility', 'visible');
				},
				openTimeout,
				animatedImg;

			_mfpOn('BuildControls'+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);
					mfp.content.css('visibility', 'hidden');

					// Basically, all code below does is clones existing image, puts in on top of the current one and animated it

					image = mfp._getItemToZoom();

					if(!image) {
						showMainContent();
						return;
					}

					animatedImg = getElToAnimate(image);

					animatedImg.css( mfp._getOffset() );

					mfp.wrap.append(animatedImg);

					openTimeout = setTimeout(function() {
						animatedImg.css( mfp._getOffset( true ) );
						openTimeout = setTimeout(function() {

							showMainContent();

							setTimeout(function() {
								animatedImg.remove();
								image = animatedImg = null;
								_mfpTrigger('ZoomAnimationEnded');
							}, 16); // avoid blink when switching images

						}, duration); // this timeout equals animation duration

					}, 16); // by adding this timeout we avoid short glitch at the beginning of animation


					// Lots of timeouts...
				}
			});
			_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);

					mfp.st.removalDelay = duration;

					if(!image) {
						image = mfp._getItemToZoom();
						if(!image) {
							return;
						}
						animatedImg = getElToAnimate(image);
					}

					animatedImg.css( mfp._getOffset(true) );
					mfp.wrap.append(animatedImg);
					mfp.content.css('visibility', 'hidden');

					setTimeout(function() {
						animatedImg.css( mfp._getOffset() );
					}, 16);
				}

			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {
					showMainContent();
					if(animatedImg) {
						animatedImg.remove();
					}
					image = null;
				}
			});
		},

		_allowZoom: function() {
			return mfp.currItem.type === 'image';
		},

		_getItemToZoom: function() {
			if(mfp.currItem.hasSize) {
				return mfp.currItem.img;
			} else {
				return false;
			}
		},

		// Get element postion relative to viewport
		_getOffset: function(isLarge) {
			var el;
			if(isLarge) {
				el = mfp.currItem.img;
			} else {
				el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
			}

			var offset = el.offset();
			var paddingTop = parseInt(el.css('padding-top'),10);
			var paddingBottom = parseInt(el.css('padding-bottom'),10);
			offset.top -= ( $(window).scrollTop() - paddingTop );


			/*

			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

			 */
			var obj = {
				width: el.width(),
				// fix Zepto height+padding issue
				height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
			};

			// I hate to do this, but there is no another option
			if( getHasMozTransform() ) {
				obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
			} else {
				obj.left = offset.left;
				obj.top = offset.top;
			}
			return obj;
		}

	}
});



/*>>zoom*/

/*>>iframe*/

var IFRAME_NS = 'iframe',
	_emptyPage = '//about:blank',

	_fixIframeBugs = function(isShowing) {
		if(mfp.currTemplate[IFRAME_NS]) {
			var el = mfp.currTemplate[IFRAME_NS].find('iframe');
			if(el.length) {
				// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
				if(!isShowing) {
					el[0].src = _emptyPage;
				}

				// IE8 black screen bug fix
				if(mfp.isIE8) {
					el.css('display', isShowing ? 'block' : 'none');
				}
			}
		}
	};

$.magnificPopup.registerModule(IFRAME_NS, {

	options: {
		markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
				'</div>',

		srcAction: 'iframe_src',

		// we don't care and support only one default type of URL by default
		patterns: {
			youtube: {
				index: 'youtube.com',
				id: 'v=',
				src: '//www.youtube.com/embed/%id%?autoplay=1'
			},
			vimeo: {
				index: 'vimeo.com/',
				id: '/',
				src: '//player.vimeo.com/video/%id%?autoplay=1'
			},
			gmaps: {
				index: '//maps.google.',
				src: '%id%&output=embed'
			}
		}
	},

	proto: {
		initIframe: function() {
			mfp.types.push(IFRAME_NS);

			_mfpOn('BeforeChange', function(e, prevType, newType) {
				if(prevType !== newType) {
					if(prevType === IFRAME_NS) {
						_fixIframeBugs(); // iframe if removed
					} else if(newType === IFRAME_NS) {
						_fixIframeBugs(true); // iframe is showing
					}
				}// else {
					// iframe source is switched, don't do anything
				//}
			});

			_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
				_fixIframeBugs();
			});
		},

		getIframe: function(item, template) {
			var embedSrc = item.src;
			var iframeSt = mfp.st.iframe;

			$.each(iframeSt.patterns, function() {
				if(embedSrc.indexOf( this.index ) > -1) {
					if(this.id) {
						if(typeof this.id === 'string') {
							embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
						} else {
							embedSrc = this.id.call( this, embedSrc );
						}
					}
					embedSrc = this.src.replace('%id%', embedSrc );
					return false; // break;
				}
			});

			var dataObj = {};
			if(iframeSt.srcAction) {
				dataObj[iframeSt.srcAction] = embedSrc;
			}
			mfp._parseMarkup(template, dataObj, item);

			mfp.updateStatus('ready');

			return template;
		}
	}
});



/*>>iframe*/

/*>>gallery*/
/**
 * Get looped index depending on number of slides
 */
var _getLoopedId = function(index) {
		var numSlides = mfp.items.length;
		if(index > numSlides - 1) {
			return index - numSlides;
		} else  if(index < 0) {
			return numSlides + index;
		}
		return index;
	},
	_replaceCurrTotal = function(text, curr, total) {
		return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
	};

$.magnificPopup.registerModule('gallery', {

	options: {
		enabled: false,
		arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
		preload: [0,2],
		navigateByImgClick: true,
		arrows: true,

		tPrev: 'Previous (Left arrow key)',
		tNext: 'Next (Right arrow key)',
		tCounter: '%curr% of %total%'
	},

	proto: {
		initGallery: function() {

			var gSt = mfp.st.gallery,
				ns = '.mfp-gallery';

			mfp.direction = true; // true - next, false - prev

			if(!gSt || !gSt.enabled ) return false;

			_wrapClasses += ' mfp-gallery';

			_mfpOn(OPEN_EVENT+ns, function() {

				if(gSt.navigateByImgClick) {
					mfp.wrap.on('click'+ns, '.mfp-img', function() {
						if(mfp.items.length > 1) {
							mfp.next();
							return false;
						}
					});
				}

				_document.on('keydown'+ns, function(e) {
					if (e.keyCode === 37) {
						mfp.prev();
					} else if (e.keyCode === 39) {
						mfp.next();
					}
				});
			});

			_mfpOn('UpdateStatus'+ns, function(e, data) {
				if(data.text) {
					data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
				}
			});

			_mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
				var l = mfp.items.length;
				values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
			});

			_mfpOn('BuildControls' + ns, function() {
				if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
					var markup = gSt.arrowMarkup,
						arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),
						arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

					arrowLeft.click(function() {
						mfp.prev();
					});
					arrowRight.click(function() {
						mfp.next();
					});

					mfp.container.append(arrowLeft.add(arrowRight));
				}
			});

			_mfpOn(CHANGE_EVENT+ns, function() {
				if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

				mfp._preloadTimeout = setTimeout(function() {
					mfp.preloadNearbyImages();
					mfp._preloadTimeout = null;
				}, 16);
			});


			_mfpOn(CLOSE_EVENT+ns, function() {
				_document.off(ns);
				mfp.wrap.off('click'+ns);
				mfp.arrowRight = mfp.arrowLeft = null;
			});

		},
		next: function() {
			mfp.direction = true;
			mfp.index = _getLoopedId(mfp.index + 1);
			mfp.updateItemHTML();
		},
		prev: function() {
			mfp.direction = false;
			mfp.index = _getLoopedId(mfp.index - 1);
			mfp.updateItemHTML();
		},
		goTo: function(newIndex) {
			mfp.direction = (newIndex >= mfp.index);
			mfp.index = newIndex;
			mfp.updateItemHTML();
		},
		preloadNearbyImages: function() {
			var p = mfp.st.gallery.preload,
				preloadBefore = Math.min(p[0], mfp.items.length),
				preloadAfter = Math.min(p[1], mfp.items.length),
				i;

			for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
				mfp._preloadItem(mfp.index+i);
			}
			for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
				mfp._preloadItem(mfp.index-i);
			}
		},
		_preloadItem: function(index) {
			index = _getLoopedId(index);

			if(mfp.items[index].preloaded) {
				return;
			}

			var item = mfp.items[index];
			if(!item.parsed) {
				item = mfp.parseEl( index );
			}

			_mfpTrigger('LazyLoad', item);

			if(item.type === 'image') {
				item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
					item.hasSize = true;
				}).on('error.mfploader', function() {
					item.hasSize = true;
					item.loadError = true;
					_mfpTrigger('LazyLoadError', item);
				}).attr('src', item.src);
			}


			item.preloaded = true;
		}
	}
});

/*>>gallery*/

/*>>retina*/

var RETINA_NS = 'retina';

$.magnificPopup.registerModule(RETINA_NS, {
	options: {
		replaceSrc: function(item) {
			return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
		},
		ratio: 1 // Function or number.  Set to 1 to disable.
	},
	proto: {
		initRetina: function() {
			if(window.devicePixelRatio > 1) {

				var st = mfp.st.retina,
					ratio = st.ratio;

				ratio = !isNaN(ratio) ? ratio : ratio();

				if(ratio > 1) {
					_mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
						item.img.css({
							'max-width': item.img[0].naturalWidth / ratio,
							'width': '100%'
						});
					});
					_mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
						item.src = st.replaceSrc(item, ratio);
					});
				}
			}

		}
	}
});

/*>>retina*/
 _checkInstance(); }));
(function defineMustache(global,factory){if(typeof exports==="object"&&exports&&typeof exports.nodeName!=="string"){factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],factory)}else{global.Mustache={};factory(global.Mustache)}})(this,function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n")stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){value=context.view;names=name.split(".");index=0;while(value!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(value,names[index]);value=value[names[index++]]}}else{value=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials){var tokens=this.parse(template);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,originalTemplate);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.renderPartial=function renderPartial(token,context,partials){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)return this.renderTokens(this.parse(value),context,partials,value)};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="2.3.2";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer;return mustache});

/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */

!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){v(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))},g=function(a){return a.replace(c.regex.minmaxwh,"").match(c.regex.other)};if(c.ajax=f,c.queue=d,c.unsupportedmq=g,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,comments:/\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,minmaxwh:/\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,other:/\([^\)]*\)/g},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var h,i,j,k=a.document,l=k.documentElement,m=[],n=[],o=[],p={},q=30,r=k.getElementsByTagName("head")[0]||l,s=k.getElementsByTagName("base")[0],t=r.getElementsByTagName("link"),u=function(){var a,b=k.createElement("div"),c=k.body,d=l.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=k.createElement("body"),c.style.background="none"),l.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&l.insertBefore(c,l.firstChild),a=b.offsetWidth,f?l.removeChild(c):c.removeChild(b),l.style.fontSize=d,e&&(c.style.fontSize=e),a=j=parseFloat(a)},v=function(b){var c="clientWidth",d=l[c],e="CSS1Compat"===k.compatMode&&d||k.body[c]||d,f={},g=t[t.length-1],p=(new Date).getTime();if(b&&h&&q>p-h)return a.clearTimeout(i),i=a.setTimeout(v,q),void 0;h=p;for(var s in m)if(m.hasOwnProperty(s)){var w=m[s],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?j||u():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?j||u():1)),w.hasquery&&(z&&A||!(z||e>=x)||!(A||y>=e))||(f[w.media]||(f[w.media]=[]),f[w.media].push(n[w.rules]))}for(var C in o)o.hasOwnProperty(C)&&o[C]&&o[C].parentNode===r&&r.removeChild(o[C]);o.length=0;for(var D in f)if(f.hasOwnProperty(D)){var E=k.createElement("style"),F=f[D].join("\n");E.type="text/css",E.media=D,r.insertBefore(E,g.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(k.createTextNode(F)),o.push(E)}},w=function(a,b,d){var e=a.replace(c.regex.comments,"").replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var h=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},i=!f&&d;b.length&&(b+="/"),i&&(f=1);for(var j=0;f>j;j++){var k,l,o,p;i?(k=d,n.push(h(a))):(k=e[j].match(c.regex.findStyles)&&RegExp.$1,n.push(RegExp.$2&&h(RegExp.$2))),o=k.split(","),p=o.length;for(var q=0;p>q;q++)l=o[q],g(l)||m.push({media:l.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:n.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}v()},x=function(){if(d.length){var b=d.shift();f(b.href,function(c){w(c,b.href,b.media),p[b.href]=!0,a.setTimeout(function(){x()},0)})}},y=function(){for(var b=0;b<t.length;b++){var c=t[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase();e&&g&&!p[e]&&(c.styleSheet&&c.styleSheet.rawCssText?(w(c.styleSheet.rawCssText,e,f),p[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!s||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}x()};y(),c.update=y,c.getEmValue=u,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);
/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
 */
(function () {
    'use strict';
    var $;

    /*===========================
    Swiper
    ===========================*/
    var Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);
    

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            flip: {
                slideShadows : true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',
        
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onBeforeResize: function (swiper)
            onAfterResize: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            onKeyPress: function (swiper, keyCode)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            }
            else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Params
        s.params = params;
        s.originalParams = originalParams;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;
        
        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [], point;
            for ( point in s.params.breakpoints ) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                for ( var param in breakPointsParams ) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if(needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }
        
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push(s.params.containerModifierClass + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }
        
            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            }
            else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }
        
        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;
        
        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };
        
        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function(moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing': 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null || !s) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;
            var i;
        
            // Find slides currently in view
            if(s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if(index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }
        
            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }
        
            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }
        
            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
        
            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css(
                            'margin-' + (s.isHorizontal() ? 'top' : 'left'),
                            (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        )
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);
        
                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if(prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Dynamic Slides Per View
          ===========================*/
        s.currentSlidesPerView = function () {
            var spv = 1, i, j;
            if (s.params.centeredSlides) {
                var size = s.slides[s.activeIndex].swiperSlideSize;
                var breakLoop;
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slides[i] && !breakLoop) {
                        size += s.slides[i].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
                for (j = s.activeIndex - 1; j >= 0; j--) {
                    if (s.slides[j] && !breakLoop) {
                        size += s.slides[j].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
            }
            else {
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
                        spv++;
                    }
                }
            }
            return spv;
        };
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;
        
            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function(){
            s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }
        
            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    }
                    else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    }
                    else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    }
                    else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    }
                    else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        }
                        else {
                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    }
                    else {
                        paginationHTML =
                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
                            ' / ' +
                            '<span class="' + s.params.paginationTotalClass+'"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    }
                    else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            if (!s) return;
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            var newTranslate;
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
            else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            if (s.params.onBeforeResize) s.params.onBeforeResize(s);
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
        
            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
        
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
        
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            }
            else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
            if (s.params.onAfterResize) s.params.onAfterResize(s);
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        s.touchEventsDesktop = {start: 'mousedown', move: 'mousemove', end: 'mouseup'};
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = {start: 'pointerdown', move: 'pointermove', end: 'pointerup'};
        else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = {start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp'};
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : s.touchEventsDesktop.start,
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if ((params.simulateTouch && !s.device.ios && !s.device.android) || (params.simulateTouch && !s.support.touch && s.device.ios)) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides,
                    slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + slidesPerView/2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                    else {
                        if (slideToIndex > s.slides.length - slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button, video',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
        
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        
            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }
        
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (
                        (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
                else {
                    if (
                        (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
                    isScrolling = false;
                }
                else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined') {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
        
            if (!s.params.followFinger) return;
        
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched  && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex ) return false;
            }
        
            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
        
            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    }
                    else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
        
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    }
                    else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
        
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }
        
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = s.isHorizontal() ? x : y;
        
            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            }
            else {
                progress = (translate - s.minTranslate()) / (translatesDiff);
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
        
            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
        
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (s.rtl) {
                            rotateY = -rotateY;
                        }
        
                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
        
                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
        
                        slide
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
        
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
        
                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
        
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };
        

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
        
                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], (src || background), srcset, sizes, false, function () {
                        if (typeof s === 'undefined' || s === null || !s) return;
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        }
                        else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
        
                        }
        
                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
        
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
        
            },
            load: function () {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function (e) {
                var sb = s.scrollbar;
                var x = 0, y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ?
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                }
                else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function (e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
        
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
        
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
        
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: (function () {
                if ((s.params.simulateTouch === false && !s.support.touch)) return s.touchEventsDesktop;
                else return s.touchEvents;
            })(),
            enableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
                $(target).off(sb.draggableEvents.move, sb.dragMove);
                $(target).off(sb.draggableEvents.end, sb.dragEnd);
            },
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
        
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };
        

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function (x, y) {
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        return maxIndex;
                    };
                })();
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;
        
                this.interpolate = function (x2) {
                    if (!x2) return 0;
        
                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
        
                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function(c){
                if(!s.controller.spline) s.controller.spline = s.params.loop ?
                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function (translate, byController) {
               var controlled = s.params.control;
               var multiplier, controlledTranslate;
               function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }
        
                    if(!controlledTranslate || s.params.controlBy === 'container'){
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }
        
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
               }
               if (Array.isArray(controlled)) {
                   for (var i = 0; i < controlled.length; i++) {
                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                           setControlledTranslate(controlled[i]);
                       }
                   }
               }
               else if (controlled instanceof Swiper && byController !== controlled) {
        
                   setControlledTranslate(controlled);
               }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
        
                        });
                    }
                }
                if (Array.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };
        

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function (e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + (newHash) + '"]').index());
                }
            },
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function () {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, ('#' + s.slides.eq(s.activeIndex).attr('data-hash') || ''));
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function () {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (hash) {
                    var speed = 0;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                        if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                        }
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function () {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };
        

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function () {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function (key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            },
            scrollToSlide: function(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };
        

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
                    ) {
                        inView = true;
                    }
        
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            }
            else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
            s.emit('onKeyPress', s, kc);
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };
        

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;
        
            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }
        
            if (!isSupported &&
                document.implementation &&
                document.implementation.hasFeature &&
                    // always returns true in newer browsers as per the standard.
                    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
                document.implementation.hasFeature('', '') !== true ) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }
        
            return isSupported;
        }
        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/ event ) /*object*/ {
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;
        
            var sX = 0, sY = 0,       // spinX, spinY
                pX = 0, pY = 0;       // pixelX, pixelY
        
            // Legacy
            if( 'detail' in event ) {
                sY = event.detail;
            }
            if( 'wheelDelta' in event ) {
                sY = -event.wheelDelta / 120;
            }
            if( 'wheelDeltaY' in event ) {
                sY = -event.wheelDeltaY / 120;
            }
            if( 'wheelDeltaX' in event ) {
                sX = -event.wheelDeltaX / 120;
            }
        
            // side scrolling on FF with DOMMouseScroll
            if( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
                sX = sY;
                sY = 0;
            }
        
            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;
        
            if( 'deltaY' in event ) {
                pY = event.deltaY;
            }
            if( 'deltaX' in event ) {
                pX = event.deltaX;
            }
        
            if( (pX || pY) && event.deltaMode ) {
                if( event.deltaMode === 1 ) {          // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {                             // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }
        
            // Fall-back if spin cannot be determined
            if( pX && !sX ) {
                sX = (pX < 1) ? -1 : 1;
            }
            if( pY && !sY ) {
                sY = (pY < 1) ? -1 : 1;
            }
        
            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = (navigator.userAgent.indexOf('firefox') > -1) ?
                'DOMMouseScroll' :
                isEventSupported() ?
                    'wheel' : 'mousewheel';
        }
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;
        
            var data = normalizeWheel( e );
        
            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;
                    else return;
                }
                else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;
                    else return;
                }
            }
            else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? - data.pixelX * rtlFactor : - data.pixelY;
            }
        
            if (delta === 0) return;
        
            if (s.params.mousewheelInvert) delta = -delta;
        
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                    else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
        
            }
            else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;
        
                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();
        
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
        
                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }
        
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                }
                else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);
        
                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();
        
                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = false;
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = true;
            return true;
        };
        

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
        
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
        
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            }
            else {
                pX = pX * progress * rtlFactor + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
        
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
        
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax ;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                }
                else {
                    z.scale = (z.gesture.scaleMove / z.gesture.scaleStart) * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow((z.scale - z.gesture.zoomMax + 1), 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale =  s.params.zoomMin + 1 - Math.pow((s.params.zoomMin - z.scale + 1), 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function (e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;
        
                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                    if (s.rtl) z.image.startX = -z.image.startX;
                    if (s.rtl) z.image.startY = -z.image.startY;
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
        
                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;
        
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
        
                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() &&
                        (Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x) ||
                        (Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                    else if (!s.isHorizontal() &&
                        (Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y) ||
                        (Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
        
                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;
        
                if (z.image.currentX < z.image.minX) {
                    z.image.currentX =  z.image.minX + 1 - Math.pow((z.image.minX - z.image.currentX + 1), 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow((z.image.currentX - z.image.maxX + 1), 0.8);
                }
        
                if (z.image.currentY < z.image.minY) {
                    z.image.currentY =  z.image.minY + 1 - Math.pow((z.image.minY - z.image.currentY + 1), 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow((z.image.currentY - z.image.maxY + 1), 0.8);
                }
        
                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();
        
                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;
        
                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);
        
                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function (s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
        
                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;
        
                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                }
                else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }
        
                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                }
                else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth/2 - touchX;
                        diffY = offsetY + slideHeight/2 - touchY;
        
                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;
        
                        translateMinX = Math.min((slideWidth / 2 - scaledWidth / 2), 0);
                        translateMinY = Math.min((slideHeight / 2 - scaledHeight / 2), 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;
        
                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;
        
                        if (translateX < translateMinX) {
                            translateX =  translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }
        
                        if (translateY < translateMinY) {
                            translateY =  translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
        
                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    }
                    else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }
        
                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide){
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);
        
                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function () {
                s.zoom.attachEvents();
            },
            destroy: function () {
                s.zoom.attachEvents(true);
            }
        };
        

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };
        

        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },
        
            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function () {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
        
            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav)  {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        

    
        // Return swiper instance
        return s;
    };
    

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
            lteIE9: (function() {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            })()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = window.navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })(),
    
            passiveListener: (function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            })(),
    
            gestures: (function () {
                return 'ongesturestart' in window;
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                    }
                    catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }
                    else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
    
        return $;
    })();
    

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
    	if (window[swiperDomPlugins[i]]) {
    		addLibraryPlugin(window[swiperDomPlugins[i]]);
    	}
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
    	domLib = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
    	domLib = Dom7;
    }
    

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            };
        }
    }
    

    window.Swiper = Swiper;
})();

/*===========================
Swiper AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Swiper;
    });
}

//# sourceMappingURL=maps/swiper.js.map

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVybml6ci1jdXN0b20ubWluLmpzIiwiaHRtbDVzaGl2LmpzIiwianF1ZXJ5Lm1hZ25pZmljLXBvcHVwLmpzIiwibXVzdGFjaGUubWluLmpzIiwicmVzcG9uZC5taW4uanMiLCJzd2lwZXIuanMiLCJib290c3RyYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ24wREE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzF1S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ2ZW5kb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgbW9kZXJuaXpyIDMuMy4xIChDdXN0b20gQnVpbGQpIHwgTUlUICpcbiAqIGh0dHA6Ly9tb2Rlcm5penIuY29tL2Rvd25sb2FkLz8tdG91Y2hldmVudHMgISovXG4hZnVuY3Rpb24oZSxuLHQpe2Z1bmN0aW9uIG8oZSxuKXtyZXR1cm4gdHlwZW9mIGU9PT1ufWZ1bmN0aW9uIHMoKXt2YXIgZSxuLHQscyxpLGEscjtmb3IodmFyIGwgaW4gZilpZihmLmhhc093blByb3BlcnR5KGwpKXtpZihlPVtdLG49ZltsXSxuLm5hbWUmJihlLnB1c2gobi5uYW1lLnRvTG93ZXJDYXNlKCkpLG4ub3B0aW9ucyYmbi5vcHRpb25zLmFsaWFzZXMmJm4ub3B0aW9ucy5hbGlhc2VzLmxlbmd0aCkpZm9yKHQ9MDt0PG4ub3B0aW9ucy5hbGlhc2VzLmxlbmd0aDt0KyspZS5wdXNoKG4ub3B0aW9ucy5hbGlhc2VzW3RdLnRvTG93ZXJDYXNlKCkpO2ZvcihzPW8obi5mbixcImZ1bmN0aW9uXCIpP24uZm4oKTpuLmZuLGk9MDtpPGUubGVuZ3RoO2krKylhPWVbaV0scj1hLnNwbGl0KFwiLlwiKSwxPT09ci5sZW5ndGg/TW9kZXJuaXpyW3JbMF1dPXM6KCFNb2Rlcm5penJbclswXV18fE1vZGVybml6cltyWzBdXWluc3RhbmNlb2YgQm9vbGVhbnx8KE1vZGVybml6cltyWzBdXT1uZXcgQm9vbGVhbihNb2Rlcm5penJbclswXV0pKSxNb2Rlcm5penJbclswXV1bclsxXV09cyksZC5wdXNoKChzP1wiXCI6XCJuby1cIikrci5qb2luKFwiLVwiKSl9fWZ1bmN0aW9uIGkoKXtyZXR1cm5cImZ1bmN0aW9uXCIhPXR5cGVvZiBuLmNyZWF0ZUVsZW1lbnQ/bi5jcmVhdGVFbGVtZW50KGFyZ3VtZW50c1swXSk6cD9uLmNyZWF0ZUVsZW1lbnROUy5jYWxsKG4sXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLGFyZ3VtZW50c1swXSk6bi5jcmVhdGVFbGVtZW50LmFwcGx5KG4sYXJndW1lbnRzKX1mdW5jdGlvbiBhKCl7dmFyIGU9bi5ib2R5O3JldHVybiBlfHwoZT1pKHA/XCJzdmdcIjpcImJvZHlcIiksZS5mYWtlPSEwKSxlfWZ1bmN0aW9uIHIoZSx0LG8scyl7dmFyIHIsZixsLGQsdT1cIm1vZGVybml6clwiLHA9aShcImRpdlwiKSxoPWEoKTtpZihwYXJzZUludChvLDEwKSlmb3IoO28tLTspbD1pKFwiZGl2XCIpLGwuaWQ9cz9zW29dOnUrKG8rMSkscC5hcHBlbmRDaGlsZChsKTtyZXR1cm4gcj1pKFwic3R5bGVcIiksci50eXBlPVwidGV4dC9jc3NcIixyLmlkPVwic1wiK3UsKGguZmFrZT9oOnApLmFwcGVuZENoaWxkKHIpLGguYXBwZW5kQ2hpbGQocCksci5zdHlsZVNoZWV0P3Iuc3R5bGVTaGVldC5jc3NUZXh0PWU6ci5hcHBlbmRDaGlsZChuLmNyZWF0ZVRleHROb2RlKGUpKSxwLmlkPXUsaC5mYWtlJiYoaC5zdHlsZS5iYWNrZ3JvdW5kPVwiXCIsaC5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLGQ9Yy5zdHlsZS5vdmVyZmxvdyxjLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIsYy5hcHBlbmRDaGlsZChoKSksZj10KHAsZSksaC5mYWtlPyhoLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaCksYy5zdHlsZS5vdmVyZmxvdz1kLGMub2Zmc2V0SGVpZ2h0KTpwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocCksISFmfXZhciBmPVtdLGw9e192ZXJzaW9uOlwiMy4zLjFcIixfY29uZmlnOntjbGFzc1ByZWZpeDpcIlwiLGVuYWJsZUNsYXNzZXM6ITAsZW5hYmxlSlNDbGFzczohMCx1c2VQcmVmaXhlczohMH0sX3E6W10sb246ZnVuY3Rpb24oZSxuKXt2YXIgdD10aGlzO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtuKHRbZV0pfSwwKX0sYWRkVGVzdDpmdW5jdGlvbihlLG4sdCl7Zi5wdXNoKHtuYW1lOmUsZm46bixvcHRpb25zOnR9KX0sYWRkQXN5bmNUZXN0OmZ1bmN0aW9uKGUpe2YucHVzaCh7bmFtZTpudWxsLGZuOmV9KX19LE1vZGVybml6cj1mdW5jdGlvbigpe307TW9kZXJuaXpyLnByb3RvdHlwZT1sLE1vZGVybml6cj1uZXcgTW9kZXJuaXpyO3ZhciBkPVtdLHU9bC5fY29uZmlnLnVzZVByZWZpeGVzP1wiIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtIFwiLnNwbGl0KFwiIFwiKTpbXCJcIixcIlwiXTtsLl9wcmVmaXhlcz11O3ZhciBjPW4uZG9jdW1lbnRFbGVtZW50LHA9XCJzdmdcIj09PWMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxoPWwudGVzdFN0eWxlcz1yO01vZGVybml6ci5hZGRUZXN0KFwidG91Y2hldmVudHNcIixmdW5jdGlvbigpe3ZhciB0O2lmKFwib250b3VjaHN0YXJ0XCJpbiBlfHxlLkRvY3VtZW50VG91Y2gmJm4gaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKXQ9ITA7ZWxzZXt2YXIgbz1bXCJAbWVkaWEgKFwiLHUuam9pbihcInRvdWNoLWVuYWJsZWQpLChcIiksXCJoZWFydHpcIixcIilcIixcInsjbW9kZXJuaXpye3RvcDo5cHg7cG9zaXRpb246YWJzb2x1dGV9fVwiXS5qb2luKFwiXCIpO2gobyxmdW5jdGlvbihlKXt0PTk9PT1lLm9mZnNldFRvcH0pfXJldHVybiB0fSkscygpLGRlbGV0ZSBsLmFkZFRlc3QsZGVsZXRlIGwuYWRkQXN5bmNUZXN0O2Zvcih2YXIgbT0wO208TW9kZXJuaXpyLl9xLmxlbmd0aDttKyspTW9kZXJuaXpyLl9xW21dKCk7ZS5Nb2Rlcm5penI9TW9kZXJuaXpyfSh3aW5kb3csZG9jdW1lbnQpOyIsIi8qKlxuKiBAcHJlc2VydmUgSFRNTDUgU2hpdiAzLjcuMyB8IEBhZmFya2FzIEBqZGFsdG9uIEBqb25fbmVhbCBAcmVtIHwgTUlUL0dQTDIgTGljZW5zZWRcbiovXG47KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpIHtcbi8qanNoaW50IGV2aWw6dHJ1ZSAqL1xuICAvKiogdmVyc2lvbiAqL1xuICB2YXIgdmVyc2lvbiA9ICczLjcuMy1wcmUnO1xuXG4gIC8qKiBQcmVzZXQgb3B0aW9ucyAqL1xuICB2YXIgb3B0aW9ucyA9IHdpbmRvdy5odG1sNSB8fCB7fTtcblxuICAvKiogVXNlZCB0byBza2lwIHByb2JsZW0gZWxlbWVudHMgKi9cbiAgdmFyIHJlU2tpcCA9IC9ePHxeKD86YnV0dG9ufG1hcHxzZWxlY3R8dGV4dGFyZWF8b2JqZWN0fGlmcmFtZXxvcHRpb258b3B0Z3JvdXApJC9pO1xuXG4gIC8qKiBOb3QgYWxsIGVsZW1lbnRzIGNhbiBiZSBjbG9uZWQgaW4gSUUgKiovXG4gIHZhciBzYXZlQ2xvbmVzID0gL14oPzphfGJ8Y29kZXxkaXZ8ZmllbGRzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aXxsYWJlbHxsaXxvbHxwfHF8c3BhbnxzdHJvbmd8c3R5bGV8dGFibGV8dGJvZHl8dGR8dGh8dHJ8dWwpJC9pO1xuXG4gIC8qKiBEZXRlY3Qgd2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyBkZWZhdWx0IGh0bWw1IHN0eWxlcyAqL1xuICB2YXIgc3VwcG9ydHNIdG1sNVN0eWxlcztcblxuICAvKiogTmFtZSBvZiB0aGUgZXhwYW5kbywgdG8gd29yayB3aXRoIG11bHRpcGxlIGRvY3VtZW50cyBvciB0byByZS1zaGl2IG9uZSBkb2N1bWVudCAqL1xuICB2YXIgZXhwYW5kbyA9ICdfaHRtbDVzaGl2JztcblxuICAvKiogVGhlIGlkIGZvciB0aGUgdGhlIGRvY3VtZW50cyBleHBhbmRvICovXG4gIHZhciBleHBhbklEID0gMDtcblxuICAvKiogQ2FjaGVkIGRhdGEgZm9yIGVhY2ggZG9jdW1lbnQgKi9cbiAgdmFyIGV4cGFuZG9EYXRhID0ge307XG5cbiAgLyoqIERldGVjdCB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHVua25vd24gZWxlbWVudHMgKi9cbiAgdmFyIHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzO1xuXG4gIChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgYS5pbm5lckhUTUwgPSAnPHh5ej48L3h5ej4nO1xuICAgICAgICAvL2lmIHRoZSBoaWRkZW4gcHJvcGVydHkgaXMgaW1wbGVtZW50ZWQgd2UgY2FuIGFzc3VtZSwgdGhhdCB0aGUgYnJvd3NlciBzdXBwb3J0cyBiYXNpYyBIVE1MNSBTdHlsZXNcbiAgICAgICAgc3VwcG9ydHNIdG1sNVN0eWxlcyA9ICgnaGlkZGVuJyBpbiBhKTtcblxuICAgICAgICBzdXBwb3J0c1Vua25vd25FbGVtZW50cyA9IGEuY2hpbGROb2Rlcy5sZW5ndGggPT0gMSB8fCAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gYXNzaWduIGEgZmFsc2UgcG9zaXRpdmUgaWYgdW5hYmxlIHRvIHNoaXZcbiAgICAgICAgICAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCkoJ2EnKTtcbiAgICAgICAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdHlwZW9mIGZyYWcuY2xvbmVOb2RlID09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICB0eXBlb2YgZnJhZy5jcmVhdGVEb2N1bWVudEZyYWdtZW50ID09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICB0eXBlb2YgZnJhZy5jcmVhdGVFbGVtZW50ID09ICd1bmRlZmluZWQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSgpKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIC8vIGFzc2lnbiBhIGZhbHNlIHBvc2l0aXZlIGlmIGRldGVjdGlvbiBmYWlscyA9PiB1bmFibGUgdG8gc2hpdlxuICAgICAgc3VwcG9ydHNIdG1sNVN0eWxlcyA9IHRydWU7XG4gICAgICBzdXBwb3J0c1Vua25vd25FbGVtZW50cyA9IHRydWU7XG4gICAgfVxuXG4gIH0oKSk7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBzdHlsZSBzaGVldCB3aXRoIHRoZSBnaXZlbiBDU1MgdGV4dCBhbmQgYWRkcyBpdCB0byB0aGUgZG9jdW1lbnQuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGRvY3VtZW50LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY3NzVGV4dCBUaGUgQ1NTIHRleHQuXG4gICAqIEByZXR1cm5zIHtTdHlsZVNoZWV0fSBUaGUgc3R5bGUgZWxlbWVudC5cbiAgICovXG4gIGZ1bmN0aW9uIGFkZFN0eWxlU2hlZXQob3duZXJEb2N1bWVudCwgY3NzVGV4dCkge1xuICAgIHZhciBwID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgICAgIHBhcmVudCA9IG93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSB8fCBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHAuaW5uZXJIVE1MID0gJ3g8c3R5bGU+JyArIGNzc1RleHQgKyAnPC9zdHlsZT4nO1xuICAgIHJldHVybiBwYXJlbnQuaW5zZXJ0QmVmb3JlKHAubGFzdENoaWxkLCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYGh0bWw1LmVsZW1lbnRzYCBhcyBhbiBhcnJheS5cbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBvZiBzaGl2ZWQgZWxlbWVudCBub2RlIG5hbWVzLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0RWxlbWVudHMoKSB7XG4gICAgdmFyIGVsZW1lbnRzID0gaHRtbDUuZWxlbWVudHM7XG4gICAgcmV0dXJuIHR5cGVvZiBlbGVtZW50cyA9PSAnc3RyaW5nJyA/IGVsZW1lbnRzLnNwbGl0KCcgJykgOiBlbGVtZW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmRzIHRoZSBidWlsdC1pbiBsaXN0IG9mIGh0bWw1IGVsZW1lbnRzXG4gICAqIEBtZW1iZXJPZiBodG1sNVxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbmV3RWxlbWVudHMgd2hpdGVzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvciBhcnJheSBvZiBuZXcgZWxlbWVudCBuYW1lcyB0byBzaGl2XG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGNvbnRleHQgZG9jdW1lbnQuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRFbGVtZW50cyhuZXdFbGVtZW50cywgb3duZXJEb2N1bWVudCkge1xuICAgIHZhciBlbGVtZW50cyA9IGh0bWw1LmVsZW1lbnRzO1xuICAgIGlmKHR5cGVvZiBlbGVtZW50cyAhPSAnc3RyaW5nJyl7XG4gICAgICBlbGVtZW50cyA9IGVsZW1lbnRzLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIG5ld0VsZW1lbnRzICE9ICdzdHJpbmcnKXtcbiAgICAgIG5ld0VsZW1lbnRzID0gbmV3RWxlbWVudHMuam9pbignICcpO1xuICAgIH1cbiAgICBodG1sNS5lbGVtZW50cyA9IGVsZW1lbnRzICsnICcrIG5ld0VsZW1lbnRzO1xuICAgIHNoaXZEb2N1bWVudChvd25lckRvY3VtZW50KTtcbiAgfVxuXG4gICAvKipcbiAgICogUmV0dXJucyB0aGUgZGF0YSBhc3NvY2lhdGVkIHRvIHRoZSBnaXZlbiBkb2N1bWVudFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBkb2N1bWVudC5cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IG9mIGRhdGEuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KSB7XG4gICAgdmFyIGRhdGEgPSBleHBhbmRvRGF0YVtvd25lckRvY3VtZW50W2V4cGFuZG9dXTtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICBleHBhbklEKys7XG4gICAgICAgIG93bmVyRG9jdW1lbnRbZXhwYW5kb10gPSBleHBhbklEO1xuICAgICAgICBleHBhbmRvRGF0YVtleHBhbklEXSA9IGRhdGE7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSBzaGl2ZWQgZWxlbWVudCBmb3IgdGhlIGdpdmVuIG5vZGVOYW1lIGFuZCBkb2N1bWVudFxuICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5vZGVOYW1lIG5hbWUgb2YgdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudCBUaGUgY29udGV4dCBkb2N1bWVudC5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIHNoaXZlZCBlbGVtZW50LlxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlTmFtZSwgb3duZXJEb2N1bWVudCwgZGF0YSl7XG4gICAgaWYgKCFvd25lckRvY3VtZW50KSB7XG4gICAgICAgIG93bmVyRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB9XG4gICAgaWYoc3VwcG9ydHNVbmtub3duRWxlbWVudHMpe1xuICAgICAgICByZXR1cm4gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGVOYW1lKTtcbiAgICB9XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KTtcbiAgICB9XG4gICAgdmFyIG5vZGU7XG5cbiAgICBpZiAoZGF0YS5jYWNoZVtub2RlTmFtZV0pIHtcbiAgICAgICAgbm9kZSA9IGRhdGEuY2FjaGVbbm9kZU5hbWVdLmNsb25lTm9kZSgpO1xuICAgIH0gZWxzZSBpZiAoc2F2ZUNsb25lcy50ZXN0KG5vZGVOYW1lKSkge1xuICAgICAgICBub2RlID0gKGRhdGEuY2FjaGVbbm9kZU5hbWVdID0gZGF0YS5jcmVhdGVFbGVtKG5vZGVOYW1lKSkuY2xvbmVOb2RlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZSA9IGRhdGEuY3JlYXRlRWxlbShub2RlTmFtZSk7XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgYWRkaW5nIHNvbWUgZWxlbWVudHMgdG8gZnJhZ21lbnRzIGluIElFIDwgOSBiZWNhdXNlXG4gICAgLy8gKiBBdHRyaWJ1dGVzIGxpa2UgYG5hbWVgIG9yIGB0eXBlYCBjYW5ub3QgYmUgc2V0L2NoYW5nZWQgb25jZSBhbiBlbGVtZW50XG4gICAgLy8gICBpcyBpbnNlcnRlZCBpbnRvIGEgZG9jdW1lbnQvZnJhZ21lbnRcbiAgICAvLyAqIExpbmsgZWxlbWVudHMgd2l0aCBgc3JjYCBhdHRyaWJ1dGVzIHRoYXQgYXJlIGluYWNjZXNzaWJsZSwgYXMgd2l0aFxuICAgIC8vICAgYSA0MDMgcmVzcG9uc2UsIHdpbGwgY2F1c2UgdGhlIHRhYi93aW5kb3cgdG8gY3Jhc2hcbiAgICAvLyAqIFNjcmlwdCBlbGVtZW50cyBhcHBlbmRlZCB0byBmcmFnbWVudHMgd2lsbCBleGVjdXRlIHdoZW4gdGhlaXIgYHNyY2BcbiAgICAvLyAgIG9yIGB0ZXh0YCBwcm9wZXJ0eSBpcyBzZXRcbiAgICByZXR1cm4gbm9kZS5jYW5IYXZlQ2hpbGRyZW4gJiYgIXJlU2tpcC50ZXN0KG5vZGVOYW1lKSAmJiAhbm9kZS50YWdVcm4gPyBkYXRhLmZyYWcuYXBwZW5kQ2hpbGQobm9kZSkgOiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSBzaGl2ZWQgRG9jdW1lbnRGcmFnbWVudCBmb3IgdGhlIGdpdmVuIGRvY3VtZW50XG4gICAqIEBtZW1iZXJPZiBodG1sNVxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBjb250ZXh0IGRvY3VtZW50LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgc2hpdmVkIERvY3VtZW50RnJhZ21lbnQuXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50KG93bmVyRG9jdW1lbnQsIGRhdGEpe1xuICAgIGlmICghb3duZXJEb2N1bWVudCkge1xuICAgICAgICBvd25lckRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgfVxuICAgIGlmKHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzKXtcbiAgICAgICAgcmV0dXJuIG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIH1cbiAgICBkYXRhID0gZGF0YSB8fCBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KTtcbiAgICB2YXIgY2xvbmUgPSBkYXRhLmZyYWcuY2xvbmVOb2RlKCksXG4gICAgICAgIGkgPSAwLFxuICAgICAgICBlbGVtcyA9IGdldEVsZW1lbnRzKCksXG4gICAgICAgIGwgPSBlbGVtcy5sZW5ndGg7XG4gICAgZm9yKDtpPGw7aSsrKXtcbiAgICAgICAgY2xvbmUuY3JlYXRlRWxlbWVudChlbGVtc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGl2cyB0aGUgYGNyZWF0ZUVsZW1lbnRgIGFuZCBgY3JlYXRlRG9jdW1lbnRGcmFnbWVudGAgbWV0aG9kcyBvZiB0aGUgZG9jdW1lbnQuXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gb3duZXJEb2N1bWVudCBUaGUgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIG9mIHRoZSBkb2N1bWVudC5cbiAgICovXG4gIGZ1bmN0aW9uIHNoaXZNZXRob2RzKG93bmVyRG9jdW1lbnQsIGRhdGEpIHtcbiAgICBpZiAoIWRhdGEuY2FjaGUpIHtcbiAgICAgICAgZGF0YS5jYWNoZSA9IHt9O1xuICAgICAgICBkYXRhLmNyZWF0ZUVsZW0gPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQ7XG4gICAgICAgIGRhdGEuY3JlYXRlRnJhZyA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudDtcbiAgICAgICAgZGF0YS5mcmFnID0gZGF0YS5jcmVhdGVGcmFnKCk7XG4gICAgfVxuXG5cbiAgICBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbihub2RlTmFtZSkge1xuICAgICAgLy9hYm9ydCBzaGl2XG4gICAgICBpZiAoIWh0bWw1LnNoaXZNZXRob2RzKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGEuY3JlYXRlRWxlbShub2RlTmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChub2RlTmFtZSwgb3duZXJEb2N1bWVudCwgZGF0YSk7XG4gICAgfTtcblxuICAgIG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9IEZ1bmN0aW9uKCdoLGYnLCAncmV0dXJuIGZ1bmN0aW9uKCl7JyArXG4gICAgICAndmFyIG49Zi5jbG9uZU5vZGUoKSxjPW4uY3JlYXRlRWxlbWVudDsnICtcbiAgICAgICdoLnNoaXZNZXRob2RzJiYoJyArXG4gICAgICAgIC8vIHVucm9sbCB0aGUgYGNyZWF0ZUVsZW1lbnRgIGNhbGxzXG4gICAgICAgIGdldEVsZW1lbnRzKCkuam9pbigpLnJlcGxhY2UoL1tcXHdcXC06XSsvZywgZnVuY3Rpb24obm9kZU5hbWUpIHtcbiAgICAgICAgICBkYXRhLmNyZWF0ZUVsZW0obm9kZU5hbWUpO1xuICAgICAgICAgIGRhdGEuZnJhZy5jcmVhdGVFbGVtZW50KG5vZGVOYW1lKTtcbiAgICAgICAgICByZXR1cm4gJ2MoXCInICsgbm9kZU5hbWUgKyAnXCIpJztcbiAgICAgICAgfSkgK1xuICAgICAgJyk7cmV0dXJuIG59J1xuICAgICkoaHRtbDUsIGRhdGEuZnJhZyk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogU2hpdnMgdGhlIGdpdmVuIGRvY3VtZW50LlxuICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudCBUaGUgZG9jdW1lbnQgdG8gc2hpdi5cbiAgICogQHJldHVybnMge0RvY3VtZW50fSBUaGUgc2hpdmVkIGRvY3VtZW50LlxuICAgKi9cbiAgZnVuY3Rpb24gc2hpdkRvY3VtZW50KG93bmVyRG9jdW1lbnQpIHtcbiAgICBpZiAoIW93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgb3duZXJEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIH1cbiAgICB2YXIgZGF0YSA9IGdldEV4cGFuZG9EYXRhKG93bmVyRG9jdW1lbnQpO1xuXG4gICAgaWYgKGh0bWw1LnNoaXZDU1MgJiYgIXN1cHBvcnRzSHRtbDVTdHlsZXMgJiYgIWRhdGEuaGFzQ1NTKSB7XG4gICAgICBkYXRhLmhhc0NTUyA9ICEhYWRkU3R5bGVTaGVldChvd25lckRvY3VtZW50LFxuICAgICAgICAvLyBjb3JyZWN0cyBibG9jayBkaXNwbGF5IG5vdCBkZWZpbmVkIGluIElFNi83LzgvOVxuICAgICAgICAnYXJ0aWNsZSxhc2lkZSxkaWFsb2csZmlnY2FwdGlvbixmaWd1cmUsZm9vdGVyLGhlYWRlcixoZ3JvdXAsbWFpbixuYXYsc2VjdGlvbntkaXNwbGF5OmJsb2NrfScgK1xuICAgICAgICAvLyBhZGRzIHN0eWxpbmcgbm90IHByZXNlbnQgaW4gSUU2LzcvOC85XG4gICAgICAgICdtYXJre2JhY2tncm91bmQ6I0ZGMDtjb2xvcjojMDAwfScgK1xuICAgICAgICAvLyBoaWRlcyBub24tcmVuZGVyZWQgZWxlbWVudHNcbiAgICAgICAgJ3RlbXBsYXRle2Rpc3BsYXk6bm9uZX0nXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXN1cHBvcnRzVW5rbm93bkVsZW1lbnRzKSB7XG4gICAgICBzaGl2TWV0aG9kcyhvd25lckRvY3VtZW50LCBkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG93bmVyRG9jdW1lbnQ7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogVGhlIGBodG1sNWAgb2JqZWN0IGlzIGV4cG9zZWQgc28gdGhhdCBtb3JlIGVsZW1lbnRzIGNhbiBiZSBzaGl2ZWQgYW5kXG4gICAqIGV4aXN0aW5nIHNoaXZpbmcgY2FuIGJlIGRldGVjdGVkIG9uIGlmcmFtZXMuXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAvLyBvcHRpb25zIGNhbiBiZSBjaGFuZ2VkIGJlZm9yZSB0aGUgc2NyaXB0IGlzIGluY2x1ZGVkXG4gICAqIGh0bWw1ID0geyAnZWxlbWVudHMnOiAnbWFyayBzZWN0aW9uJywgJ3NoaXZDU1MnOiBmYWxzZSwgJ3NoaXZNZXRob2RzJzogZmFsc2UgfTtcbiAgICovXG4gIHZhciBodG1sNSA9IHtcblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9yIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2Ygbm9kZSBuYW1lcyBvZiB0aGUgZWxlbWVudHMgdG8gc2hpdi5cbiAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgKiBAdHlwZSBBcnJheXxTdHJpbmdcbiAgICAgKi9cbiAgICAnZWxlbWVudHMnOiBvcHRpb25zLmVsZW1lbnRzIHx8ICdhYmJyIGFydGljbGUgYXNpZGUgYXVkaW8gYmRpIGNhbnZhcyBkYXRhIGRhdGFsaXN0IGRldGFpbHMgZGlhbG9nIGZpZ2NhcHRpb24gZmlndXJlIGZvb3RlciBoZWFkZXIgaGdyb3VwIG1haW4gbWFyayBtZXRlciBuYXYgb3V0cHV0IHBpY3R1cmUgcHJvZ3Jlc3Mgc2VjdGlvbiBzdW1tYXJ5IHRlbXBsYXRlIHRpbWUgdmlkZW8nLFxuXG4gICAgLyoqXG4gICAgICogY3VycmVudCB2ZXJzaW9uIG9mIGh0bWw1c2hpdlxuICAgICAqL1xuICAgICd2ZXJzaW9uJzogdmVyc2lvbixcblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSBIVE1MNSBzdHlsZSBzaGVldCBzaG91bGQgYmUgaW5zZXJ0ZWQuXG4gICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgICdzaGl2Q1NTJzogKG9wdGlvbnMuc2hpdkNTUyAhPT0gZmFsc2UpLFxuXG4gICAgLyoqXG4gICAgICogSXMgZXF1YWwgdG8gdHJ1ZSBpZiBhIGJyb3dzZXIgc3VwcG9ydHMgY3JlYXRpbmcgdW5rbm93bi9IVE1MNSBlbGVtZW50c1xuICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgKi9cbiAgICAnc3VwcG9ydHNVbmtub3duRWxlbWVudHMnOiBzdXBwb3J0c1Vua25vd25FbGVtZW50cyxcblxuICAgIC8qKlxuICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSBkb2N1bWVudCdzIGBjcmVhdGVFbGVtZW50YCBhbmQgYGNyZWF0ZURvY3VtZW50RnJhZ21lbnRgXG4gICAgICogbWV0aG9kcyBzaG91bGQgYmUgb3ZlcndyaXR0ZW4uXG4gICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICogQHR5cGUgQm9vbGVhblxuICAgICAqL1xuICAgICdzaGl2TWV0aG9kcyc6IChvcHRpb25zLnNoaXZNZXRob2RzICE9PSBmYWxzZSksXG5cbiAgICAvKipcbiAgICAgKiBBIHN0cmluZyB0byBkZXNjcmliZSB0aGUgdHlwZSBvZiBgaHRtbDVgIG9iamVjdCAoXCJkZWZhdWx0XCIgb3IgXCJkZWZhdWx0IHByaW50XCIpLlxuICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAqL1xuICAgICd0eXBlJzogJ2RlZmF1bHQnLFxuXG4gICAgLy8gc2hpdnMgdGhlIGRvY3VtZW50IGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIGBodG1sNWAgb2JqZWN0IG9wdGlvbnNcbiAgICAnc2hpdkRvY3VtZW50Jzogc2hpdkRvY3VtZW50LFxuXG4gICAgLy9jcmVhdGVzIGEgc2hpdmVkIGVsZW1lbnRcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuXG4gICAgLy9jcmVhdGVzIGEgc2hpdmVkIGRvY3VtZW50RnJhZ21lbnRcbiAgICBjcmVhdGVEb2N1bWVudEZyYWdtZW50OiBjcmVhdGVEb2N1bWVudEZyYWdtZW50LFxuXG4gICAgLy9leHRlbmRzIGxpc3Qgb2YgZWxlbWVudHNcbiAgICBhZGRFbGVtZW50czogYWRkRWxlbWVudHNcbiAgfTtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvLyBleHBvc2UgaHRtbDVcbiAgd2luZG93Lmh0bWw1ID0gaHRtbDU7XG5cbiAgLy8gc2hpdiB0aGUgZG9jdW1lbnRcbiAgc2hpdkRvY3VtZW50KGRvY3VtZW50KTtcblxuICBpZih0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGh0bWw1O1xuICB9XG5cbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGRvY3VtZW50KSk7XG4iLCIvKiEgTWFnbmlmaWMgUG9wdXAgLSB2MS4xLjAgLSAyMDE2LTAyLTIwXG4qIGh0dHA6Ly9kaW1zZW1lbm92LmNvbS9wbHVnaW5zL21hZ25pZmljLXBvcHVwL1xuKiBDb3B5cmlnaHQgKGMpIDIwMTYgRG1pdHJ5IFNlbWVub3Y7ICovXG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7IFxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgeyBcbiAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuIFxuIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTsgXG4gfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHsgXG4gLy8gTm9kZS9Db21tb25KUyBcbiBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTsgXG4gfSBlbHNlIHsgXG4gLy8gQnJvd3NlciBnbG9iYWxzIFxuIGZhY3Rvcnkod2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG8pOyBcbiB9IFxuIH0oZnVuY3Rpb24oJCkgeyBcblxuLyo+PmNvcmUqL1xuLyoqXG4gKiBcbiAqIE1hZ25pZmljIFBvcHVwIENvcmUgSlMgZmlsZVxuICogXG4gKi9cblxuXG4vKipcbiAqIFByaXZhdGUgc3RhdGljIGNvbnN0YW50c1xuICovXG52YXIgQ0xPU0VfRVZFTlQgPSAnQ2xvc2UnLFxuXHRCRUZPUkVfQ0xPU0VfRVZFTlQgPSAnQmVmb3JlQ2xvc2UnLFxuXHRBRlRFUl9DTE9TRV9FVkVOVCA9ICdBZnRlckNsb3NlJyxcblx0QkVGT1JFX0FQUEVORF9FVkVOVCA9ICdCZWZvcmVBcHBlbmQnLFxuXHRNQVJLVVBfUEFSU0VfRVZFTlQgPSAnTWFya3VwUGFyc2UnLFxuXHRPUEVOX0VWRU5UID0gJ09wZW4nLFxuXHRDSEFOR0VfRVZFTlQgPSAnQ2hhbmdlJyxcblx0TlMgPSAnbWZwJyxcblx0RVZFTlRfTlMgPSAnLicgKyBOUyxcblx0UkVBRFlfQ0xBU1MgPSAnbWZwLXJlYWR5Jyxcblx0UkVNT1ZJTkdfQ0xBU1MgPSAnbWZwLXJlbW92aW5nJyxcblx0UFJFVkVOVF9DTE9TRV9DTEFTUyA9ICdtZnAtcHJldmVudC1jbG9zZSc7XG5cblxuLyoqXG4gKiBQcml2YXRlIHZhcnMgXG4gKi9cbi8qanNoaW50IC1XMDc5ICovXG52YXIgbWZwLCAvLyBBcyB3ZSBoYXZlIG9ubHkgb25lIGluc3RhbmNlIG9mIE1hZ25pZmljUG9wdXAgb2JqZWN0LCB3ZSBkZWZpbmUgaXQgbG9jYWxseSB0byBub3QgdG8gdXNlICd0aGlzJ1xuXHRNYWduaWZpY1BvcHVwID0gZnVuY3Rpb24oKXt9LFxuXHRfaXNKUSA9ICEhKHdpbmRvdy5qUXVlcnkpLFxuXHRfcHJldlN0YXR1cyxcblx0X3dpbmRvdyA9ICQod2luZG93KSxcblx0X2RvY3VtZW50LFxuXHRfcHJldkNvbnRlbnRUeXBlLFxuXHRfd3JhcENsYXNzZXMsXG5cdF9jdXJyUG9wdXBUeXBlO1xuXG5cbi8qKlxuICogUHJpdmF0ZSBmdW5jdGlvbnNcbiAqL1xudmFyIF9tZnBPbiA9IGZ1bmN0aW9uKG5hbWUsIGYpIHtcblx0XHRtZnAuZXYub24oTlMgKyBuYW1lICsgRVZFTlRfTlMsIGYpO1xuXHR9LFxuXHRfZ2V0RWwgPSBmdW5jdGlvbihjbGFzc05hbWUsIGFwcGVuZFRvLCBodG1sLCByYXcpIHtcblx0XHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRlbC5jbGFzc05hbWUgPSAnbWZwLScrY2xhc3NOYW1lO1xuXHRcdGlmKGh0bWwpIHtcblx0XHRcdGVsLmlubmVySFRNTCA9IGh0bWw7XG5cdFx0fVxuXHRcdGlmKCFyYXcpIHtcblx0XHRcdGVsID0gJChlbCk7XG5cdFx0XHRpZihhcHBlbmRUbykge1xuXHRcdFx0XHRlbC5hcHBlbmRUbyhhcHBlbmRUbyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmKGFwcGVuZFRvKSB7XG5cdFx0XHRhcHBlbmRUby5hcHBlbmRDaGlsZChlbCk7XG5cdFx0fVxuXHRcdHJldHVybiBlbDtcblx0fSxcblx0X21mcFRyaWdnZXIgPSBmdW5jdGlvbihlLCBkYXRhKSB7XG5cdFx0bWZwLmV2LnRyaWdnZXJIYW5kbGVyKE5TICsgZSwgZGF0YSk7XG5cblx0XHRpZihtZnAuc3QuY2FsbGJhY2tzKSB7XG5cdFx0XHQvLyBjb252ZXJ0cyBcIm1mcEV2ZW50TmFtZVwiIHRvIFwiZXZlbnROYW1lXCIgY2FsbGJhY2sgYW5kIHRyaWdnZXJzIGl0IGlmIGl0J3MgcHJlc2VudFxuXHRcdFx0ZSA9IGUuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBlLnNsaWNlKDEpO1xuXHRcdFx0aWYobWZwLnN0LmNhbGxiYWNrc1tlXSkge1xuXHRcdFx0XHRtZnAuc3QuY2FsbGJhY2tzW2VdLmFwcGx5KG1mcCwgJC5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRfZ2V0Q2xvc2VCdG4gPSBmdW5jdGlvbih0eXBlKSB7XG5cdFx0aWYodHlwZSAhPT0gX2N1cnJQb3B1cFR5cGUgfHwgIW1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4pIHtcblx0XHRcdG1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4gPSAkKCBtZnAuc3QuY2xvc2VNYXJrdXAucmVwbGFjZSgnJXRpdGxlJScsIG1mcC5zdC50Q2xvc2UgKSApO1xuXHRcdFx0X2N1cnJQb3B1cFR5cGUgPSB0eXBlO1xuXHRcdH1cblx0XHRyZXR1cm4gbWZwLmN1cnJUZW1wbGF0ZS5jbG9zZUJ0bjtcblx0fSxcblx0Ly8gSW5pdGlhbGl6ZSBNYWduaWZpYyBQb3B1cCBvbmx5IHdoZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2Vcblx0X2NoZWNrSW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcblx0XHRpZighJC5tYWduaWZpY1BvcHVwLmluc3RhbmNlKSB7XG5cdFx0XHQvKmpzaGludCAtVzAyMCAqL1xuXHRcdFx0bWZwID0gbmV3IE1hZ25pZmljUG9wdXAoKTtcblx0XHRcdG1mcC5pbml0KCk7XG5cdFx0XHQkLm1hZ25pZmljUG9wdXAuaW5zdGFuY2UgPSBtZnA7XG5cdFx0fVxuXHR9LFxuXHQvLyBDU1MgdHJhbnNpdGlvbiBkZXRlY3Rpb24sIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzI2NDg5OS9kZXRlY3QtY3NzLXRyYW5zaXRpb25zLXVzaW5nLWphdmFzY3JpcHQtYW5kLXdpdGhvdXQtbW9kZXJuaXpyXG5cdHN1cHBvcnRzVHJhbnNpdGlvbnMgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKS5zdHlsZSwgLy8gJ3MnIGZvciBzdHlsZS4gYmV0dGVyIHRvIGNyZWF0ZSBhbiBlbGVtZW50IGlmIGJvZHkgeWV0IHRvIGV4aXN0XG5cdFx0XHR2ID0gWydtcycsJ08nLCdNb3onLCdXZWJraXQnXTsgLy8gJ3YnIGZvciB2ZW5kb3JcblxuXHRcdGlmKCBzWyd0cmFuc2l0aW9uJ10gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybiB0cnVlOyBcblx0XHR9XG5cdFx0XHRcblx0XHR3aGlsZSggdi5sZW5ndGggKSB7XG5cdFx0XHRpZiggdi5wb3AoKSArICdUcmFuc2l0aW9uJyBpbiBzICkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cbi8qKlxuICogUHVibGljIGZ1bmN0aW9uc1xuICovXG5NYWduaWZpY1BvcHVwLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogTWFnbmlmaWNQb3B1cCxcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZXMgTWFnbmlmaWMgUG9wdXAgcGx1Z2luLiBcblx0ICogVGhpcyBmdW5jdGlvbiBpcyB0cmlnZ2VyZWQgb25seSBvbmNlIHdoZW4gJC5mbi5tYWduaWZpY1BvcHVwIG9yICQubWFnbmlmaWNQb3B1cCBpcyBleGVjdXRlZFxuXHQgKi9cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGFwcFZlcnNpb24gPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcblx0XHRtZnAuaXNMb3dJRSA9IG1mcC5pc0lFOCA9IGRvY3VtZW50LmFsbCAmJiAhZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcjtcblx0XHRtZnAuaXNBbmRyb2lkID0gKC9hbmRyb2lkL2dpKS50ZXN0KGFwcFZlcnNpb24pO1xuXHRcdG1mcC5pc0lPUyA9ICgvaXBob25lfGlwYWR8aXBvZC9naSkudGVzdChhcHBWZXJzaW9uKTtcblx0XHRtZnAuc3VwcG9ydHNUcmFuc2l0aW9uID0gc3VwcG9ydHNUcmFuc2l0aW9ucygpO1xuXG5cdFx0Ly8gV2UgZGlzYWJsZSBmaXhlZCBwb3NpdGlvbmVkIGxpZ2h0Ym94IG9uIGRldmljZXMgdGhhdCBkb24ndCBoYW5kbGUgaXQgbmljZWx5LlxuXHRcdC8vIElmIHlvdSBrbm93IGEgYmV0dGVyIHdheSBvZiBkZXRlY3RpbmcgdGhpcyAtIGxldCBtZSBrbm93LlxuXHRcdG1mcC5wcm9iYWJseU1vYmlsZSA9IChtZnAuaXNBbmRyb2lkIHx8IG1mcC5pc0lPUyB8fCAvKE9wZXJhIE1pbmkpfEtpbmRsZXx3ZWJPU3xCbGFja0JlcnJ5fChPcGVyYSBNb2JpKXwoV2luZG93cyBQaG9uZSl8SUVNb2JpbGUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICk7XG5cdFx0X2RvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cblx0XHRtZnAucG9wdXBzQ2FjaGUgPSB7fTtcblx0fSxcblxuXHQvKipcblx0ICogT3BlbnMgcG9wdXBcblx0ICogQHBhcmFtICBkYXRhIFtkZXNjcmlwdGlvbl1cblx0ICovXG5cdG9wZW46IGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdHZhciBpO1xuXG5cdFx0aWYoZGF0YS5pc09iaiA9PT0gZmFsc2UpIHsgXG5cdFx0XHQvLyBjb252ZXJ0IGpRdWVyeSBjb2xsZWN0aW9uIHRvIGFycmF5IHRvIGF2b2lkIGNvbmZsaWN0cyBsYXRlclxuXHRcdFx0bWZwLml0ZW1zID0gZGF0YS5pdGVtcy50b0FycmF5KCk7XG5cblx0XHRcdG1mcC5pbmRleCA9IDA7XG5cdFx0XHR2YXIgaXRlbXMgPSBkYXRhLml0ZW1zLFxuXHRcdFx0XHRpdGVtO1xuXHRcdFx0Zm9yKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aXRlbSA9IGl0ZW1zW2ldO1xuXHRcdFx0XHRpZihpdGVtLnBhcnNlZCkge1xuXHRcdFx0XHRcdGl0ZW0gPSBpdGVtLmVsWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGl0ZW0gPT09IGRhdGEuZWxbMF0pIHtcblx0XHRcdFx0XHRtZnAuaW5kZXggPSBpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1mcC5pdGVtcyA9ICQuaXNBcnJheShkYXRhLml0ZW1zKSA/IGRhdGEuaXRlbXMgOiBbZGF0YS5pdGVtc107XG5cdFx0XHRtZnAuaW5kZXggPSBkYXRhLmluZGV4IHx8IDA7XG5cdFx0fVxuXG5cdFx0Ly8gaWYgcG9wdXAgaXMgYWxyZWFkeSBvcGVuZWQgLSB3ZSBqdXN0IHVwZGF0ZSB0aGUgY29udGVudFxuXHRcdGlmKG1mcC5pc09wZW4pIHtcblx0XHRcdG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHRtZnAudHlwZXMgPSBbXTsgXG5cdFx0X3dyYXBDbGFzc2VzID0gJyc7XG5cdFx0aWYoZGF0YS5tYWluRWwgJiYgZGF0YS5tYWluRWwubGVuZ3RoKSB7XG5cdFx0XHRtZnAuZXYgPSBkYXRhLm1haW5FbC5lcSgwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWZwLmV2ID0gX2RvY3VtZW50O1xuXHRcdH1cblxuXHRcdGlmKGRhdGEua2V5KSB7XG5cdFx0XHRpZighbWZwLnBvcHVwc0NhY2hlW2RhdGEua2V5XSkge1xuXHRcdFx0XHRtZnAucG9wdXBzQ2FjaGVbZGF0YS5rZXldID0ge307XG5cdFx0XHR9XG5cdFx0XHRtZnAuY3VyclRlbXBsYXRlID0gbWZwLnBvcHVwc0NhY2hlW2RhdGEua2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWZwLmN1cnJUZW1wbGF0ZSA9IHt9O1xuXHRcdH1cblxuXG5cblx0XHRtZnAuc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5tYWduaWZpY1BvcHVwLmRlZmF1bHRzLCBkYXRhICk7IFxuXHRcdG1mcC5maXhlZENvbnRlbnRQb3MgPSBtZnAuc3QuZml4ZWRDb250ZW50UG9zID09PSAnYXV0bycgPyAhbWZwLnByb2JhYmx5TW9iaWxlIDogbWZwLnN0LmZpeGVkQ29udGVudFBvcztcblxuXHRcdGlmKG1mcC5zdC5tb2RhbCkge1xuXHRcdFx0bWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2sgPSBmYWxzZTtcblx0XHRcdG1mcC5zdC5jbG9zZU9uQmdDbGljayA9IGZhbHNlO1xuXHRcdFx0bWZwLnN0LnNob3dDbG9zZUJ0biA9IGZhbHNlO1xuXHRcdFx0bWZwLnN0LmVuYWJsZUVzY2FwZUtleSA9IGZhbHNlO1xuXHRcdH1cblx0XHRcblxuXHRcdC8vIEJ1aWxkaW5nIG1hcmt1cFxuXHRcdC8vIG1haW4gY29udGFpbmVycyBhcmUgY3JlYXRlZCBvbmx5IG9uY2Vcblx0XHRpZighbWZwLmJnT3ZlcmxheSkge1xuXG5cdFx0XHQvLyBEYXJrIG92ZXJsYXlcblx0XHRcdG1mcC5iZ092ZXJsYXkgPSBfZ2V0RWwoJ2JnJykub24oJ2NsaWNrJytFVkVOVF9OUywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG1mcC5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1mcC53cmFwID0gX2dldEVsKCd3cmFwJykuYXR0cigndGFiaW5kZXgnLCAtMSkub24oJ2NsaWNrJytFVkVOVF9OUywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihtZnAuX2NoZWNrSWZDbG9zZShlLnRhcmdldCkpIHtcblx0XHRcdFx0XHRtZnAuY2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdG1mcC5jb250YWluZXIgPSBfZ2V0RWwoJ2NvbnRhaW5lcicsIG1mcC53cmFwKTtcblx0XHR9XG5cblx0XHRtZnAuY29udGVudENvbnRhaW5lciA9IF9nZXRFbCgnY29udGVudCcpO1xuXHRcdGlmKG1mcC5zdC5wcmVsb2FkZXIpIHtcblx0XHRcdG1mcC5wcmVsb2FkZXIgPSBfZ2V0RWwoJ3ByZWxvYWRlcicsIG1mcC5jb250YWluZXIsIG1mcC5zdC50TG9hZGluZyk7XG5cdFx0fVxuXG5cblx0XHQvLyBJbml0aWFsaXppbmcgbW9kdWxlc1xuXHRcdHZhciBtb2R1bGVzID0gJC5tYWduaWZpY1BvcHVwLm1vZHVsZXM7XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG4gPSBtb2R1bGVzW2ldO1xuXHRcdFx0biA9IG4uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuLnNsaWNlKDEpO1xuXHRcdFx0bWZwWydpbml0JytuXS5jYWxsKG1mcCk7XG5cdFx0fVxuXHRcdF9tZnBUcmlnZ2VyKCdCZWZvcmVPcGVuJyk7XG5cblxuXHRcdGlmKG1mcC5zdC5zaG93Q2xvc2VCdG4pIHtcblx0XHRcdC8vIENsb3NlIGJ1dHRvblxuXHRcdFx0aWYoIW1mcC5zdC5jbG9zZUJ0bkluc2lkZSkge1xuXHRcdFx0XHRtZnAud3JhcC5hcHBlbmQoIF9nZXRDbG9zZUJ0bigpICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfbWZwT24oTUFSS1VQX1BBUlNFX0VWRU5ULCBmdW5jdGlvbihlLCB0ZW1wbGF0ZSwgdmFsdWVzLCBpdGVtKSB7XG5cdFx0XHRcdFx0dmFsdWVzLmNsb3NlX3JlcGxhY2VXaXRoID0gX2dldENsb3NlQnRuKGl0ZW0udHlwZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRfd3JhcENsYXNzZXMgKz0gJyBtZnAtY2xvc2UtYnRuLWluJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihtZnAuc3QuYWxpZ25Ub3ApIHtcblx0XHRcdF93cmFwQ2xhc3NlcyArPSAnIG1mcC1hbGlnbi10b3AnO1xuXHRcdH1cblxuXHRcblxuXHRcdGlmKG1mcC5maXhlZENvbnRlbnRQb3MpIHtcblx0XHRcdG1mcC53cmFwLmNzcyh7XG5cdFx0XHRcdG92ZXJmbG93OiBtZnAuc3Qub3ZlcmZsb3dZLFxuXHRcdFx0XHRvdmVyZmxvd1g6ICdoaWRkZW4nLFxuXHRcdFx0XHRvdmVyZmxvd1k6IG1mcC5zdC5vdmVyZmxvd1lcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZnAud3JhcC5jc3MoeyBcblx0XHRcdFx0dG9wOiBfd2luZG93LnNjcm9sbFRvcCgpLFxuXHRcdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmKCBtZnAuc3QuZml4ZWRCZ1BvcyA9PT0gZmFsc2UgfHwgKG1mcC5zdC5maXhlZEJnUG9zID09PSAnYXV0bycgJiYgIW1mcC5maXhlZENvbnRlbnRQb3MpICkge1xuXHRcdFx0bWZwLmJnT3ZlcmxheS5jc3Moe1xuXHRcdFx0XHRoZWlnaHQ6IF9kb2N1bWVudC5oZWlnaHQoKSxcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdFxuXG5cdFx0aWYobWZwLnN0LmVuYWJsZUVzY2FwZUtleSkge1xuXHRcdFx0Ly8gQ2xvc2Ugb24gRVNDIGtleVxuXHRcdFx0X2RvY3VtZW50Lm9uKCdrZXl1cCcgKyBFVkVOVF9OUywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihlLmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHRcdFx0bWZwLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdF93aW5kb3cub24oJ3Jlc2l6ZScgKyBFVkVOVF9OUywgZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAudXBkYXRlU2l6ZSgpO1xuXHRcdH0pO1xuXG5cblx0XHRpZighbWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2spIHtcblx0XHRcdF93cmFwQ2xhc3NlcyArPSAnIG1mcC1hdXRvLWN1cnNvcic7XG5cdFx0fVxuXHRcdFxuXHRcdGlmKF93cmFwQ2xhc3Nlcylcblx0XHRcdG1mcC53cmFwLmFkZENsYXNzKF93cmFwQ2xhc3Nlcyk7XG5cblxuXHRcdC8vIHRoaXMgdHJpZ2dlcnMgcmVjYWxjdWxhdGlvbiBvZiBsYXlvdXQsIHNvIHdlIGdldCBpdCBvbmNlIHRvIG5vdCB0byB0cmlnZ2VyIHR3aWNlXG5cdFx0dmFyIHdpbmRvd0hlaWdodCA9IG1mcC53SCA9IF93aW5kb3cuaGVpZ2h0KCk7XG5cblx0XHRcblx0XHR2YXIgd2luZG93U3R5bGVzID0ge307XG5cblx0XHRpZiggbWZwLmZpeGVkQ29udGVudFBvcyApIHtcbiAgICAgICAgICAgIGlmKG1mcC5faGFzU2Nyb2xsQmFyKHdpbmRvd0hlaWdodCkpe1xuICAgICAgICAgICAgICAgIHZhciBzID0gbWZwLl9nZXRTY3JvbGxiYXJTaXplKCk7XG4gICAgICAgICAgICAgICAgaWYocykge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3dTdHlsZXMubWFyZ2luUmlnaHQgPSBzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0aWYobWZwLmZpeGVkQ29udGVudFBvcykge1xuXHRcdFx0aWYoIW1mcC5pc0lFNykge1xuXHRcdFx0XHR3aW5kb3dTdHlsZXMub3ZlcmZsb3cgPSAnaGlkZGVuJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGllNyBkb3VibGUtc2Nyb2xsIGJ1Z1xuXHRcdFx0XHQkKCdib2R5LCBodG1sJykuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRcblx0XHRcblx0XHR2YXIgY2xhc3Nlc1RvYWRkID0gbWZwLnN0Lm1haW5DbGFzcztcblx0XHRpZihtZnAuaXNJRTcpIHtcblx0XHRcdGNsYXNzZXNUb2FkZCArPSAnIG1mcC1pZTcnO1xuXHRcdH1cblx0XHRpZihjbGFzc2VzVG9hZGQpIHtcblx0XHRcdG1mcC5fYWRkQ2xhc3NUb01GUCggY2xhc3Nlc1RvYWRkICk7XG5cdFx0fVxuXG5cdFx0Ly8gYWRkIGNvbnRlbnRcblx0XHRtZnAudXBkYXRlSXRlbUhUTUwoKTtcblxuXHRcdF9tZnBUcmlnZ2VyKCdCdWlsZENvbnRyb2xzJyk7XG5cblx0XHQvLyByZW1vdmUgc2Nyb2xsYmFyLCBhZGQgbWFyZ2luIGUudC5jXG5cdFx0JCgnaHRtbCcpLmNzcyh3aW5kb3dTdHlsZXMpO1xuXHRcdFxuXHRcdC8vIGFkZCBldmVyeXRoaW5nIHRvIERPTVxuXHRcdG1mcC5iZ092ZXJsYXkuYWRkKG1mcC53cmFwKS5wcmVwZW5kVG8oIG1mcC5zdC5wcmVwZW5kVG8gfHwgJChkb2N1bWVudC5ib2R5KSApO1xuXG5cdFx0Ly8gU2F2ZSBsYXN0IGZvY3VzZWQgZWxlbWVudFxuXHRcdG1mcC5fbGFzdEZvY3VzZWRFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdFx0XG5cdFx0Ly8gV2FpdCBmb3IgbmV4dCBjeWNsZSB0byBhbGxvdyBDU1MgdHJhbnNpdGlvblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcblx0XHRcdGlmKG1mcC5jb250ZW50KSB7XG5cdFx0XHRcdG1mcC5fYWRkQ2xhc3NUb01GUChSRUFEWV9DTEFTUyk7XG5cdFx0XHRcdG1mcC5fc2V0Rm9jdXMoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIGNvbnRlbnQgaXMgbm90IGRlZmluZWQgKG5vdCBsb2FkZWQgZS50LmMpIHdlIGFkZCBjbGFzcyBvbmx5IGZvciBCR1xuXHRcdFx0XHRtZnAuYmdPdmVybGF5LmFkZENsYXNzKFJFQURZX0NMQVNTKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gVHJhcCB0aGUgZm9jdXMgaW4gcG9wdXBcblx0XHRcdF9kb2N1bWVudC5vbignZm9jdXNpbicgKyBFVkVOVF9OUywgbWZwLl9vbkZvY3VzSW4pO1xuXG5cdFx0fSwgMTYpO1xuXG5cdFx0bWZwLmlzT3BlbiA9IHRydWU7XG5cdFx0bWZwLnVwZGF0ZVNpemUod2luZG93SGVpZ2h0KTtcblx0XHRfbWZwVHJpZ2dlcihPUEVOX0VWRU5UKTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIHBvcHVwXG5cdCAqL1xuXHRjbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW1mcC5pc09wZW4pIHJldHVybjtcblx0XHRfbWZwVHJpZ2dlcihCRUZPUkVfQ0xPU0VfRVZFTlQpO1xuXG5cdFx0bWZwLmlzT3BlbiA9IGZhbHNlO1xuXHRcdC8vIGZvciBDU1MzIGFuaW1hdGlvblxuXHRcdGlmKG1mcC5zdC5yZW1vdmFsRGVsYXkgJiYgIW1mcC5pc0xvd0lFICYmIG1mcC5zdXBwb3J0c1RyYW5zaXRpb24gKSAge1xuXHRcdFx0bWZwLl9hZGRDbGFzc1RvTUZQKFJFTU9WSU5HX0NMQVNTKTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG1mcC5fY2xvc2UoKTtcblx0XHRcdH0sIG1mcC5zdC5yZW1vdmFsRGVsYXkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZnAuX2Nsb3NlKCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgZm9yIGNsb3NlKCkgZnVuY3Rpb25cblx0ICovXG5cdF9jbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0X21mcFRyaWdnZXIoQ0xPU0VfRVZFTlQpO1xuXG5cdFx0dmFyIGNsYXNzZXNUb1JlbW92ZSA9IFJFTU9WSU5HX0NMQVNTICsgJyAnICsgUkVBRFlfQ0xBU1MgKyAnICc7XG5cblx0XHRtZnAuYmdPdmVybGF5LmRldGFjaCgpO1xuXHRcdG1mcC53cmFwLmRldGFjaCgpO1xuXHRcdG1mcC5jb250YWluZXIuZW1wdHkoKTtcblxuXHRcdGlmKG1mcC5zdC5tYWluQ2xhc3MpIHtcblx0XHRcdGNsYXNzZXNUb1JlbW92ZSArPSBtZnAuc3QubWFpbkNsYXNzICsgJyAnO1xuXHRcdH1cblxuXHRcdG1mcC5fcmVtb3ZlQ2xhc3NGcm9tTUZQKGNsYXNzZXNUb1JlbW92ZSk7XG5cblx0XHRpZihtZnAuZml4ZWRDb250ZW50UG9zKSB7XG5cdFx0XHR2YXIgd2luZG93U3R5bGVzID0ge21hcmdpblJpZ2h0OiAnJ307XG5cdFx0XHRpZihtZnAuaXNJRTcpIHtcblx0XHRcdFx0JCgnYm9keSwgaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3dTdHlsZXMub3ZlcmZsb3cgPSAnJztcblx0XHRcdH1cblx0XHRcdCQoJ2h0bWwnKS5jc3Mod2luZG93U3R5bGVzKTtcblx0XHR9XG5cdFx0XG5cdFx0X2RvY3VtZW50Lm9mZigna2V5dXAnICsgRVZFTlRfTlMgKyAnIGZvY3VzaW4nICsgRVZFTlRfTlMpO1xuXHRcdG1mcC5ldi5vZmYoRVZFTlRfTlMpO1xuXG5cdFx0Ly8gY2xlYW4gdXAgRE9NIGVsZW1lbnRzIHRoYXQgYXJlbid0IHJlbW92ZWRcblx0XHRtZnAud3JhcC5hdHRyKCdjbGFzcycsICdtZnAtd3JhcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0bWZwLmJnT3ZlcmxheS5hdHRyKCdjbGFzcycsICdtZnAtYmcnKTtcblx0XHRtZnAuY29udGFpbmVyLmF0dHIoJ2NsYXNzJywgJ21mcC1jb250YWluZXInKTtcblxuXHRcdC8vIHJlbW92ZSBjbG9zZSBidXR0b24gZnJvbSB0YXJnZXQgZWxlbWVudFxuXHRcdGlmKG1mcC5zdC5zaG93Q2xvc2VCdG4gJiZcblx0XHQoIW1mcC5zdC5jbG9zZUJ0bkluc2lkZSB8fCBtZnAuY3VyclRlbXBsYXRlW21mcC5jdXJySXRlbS50eXBlXSA9PT0gdHJ1ZSkpIHtcblx0XHRcdGlmKG1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4pXG5cdFx0XHRcdG1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4uZGV0YWNoKCk7XG5cdFx0fVxuXG5cblx0XHRpZihtZnAuc3QuYXV0b0ZvY3VzTGFzdCAmJiBtZnAuX2xhc3RGb2N1c2VkRWwpIHtcblx0XHRcdCQobWZwLl9sYXN0Rm9jdXNlZEVsKS5mb2N1cygpOyAvLyBwdXQgdGFiIGZvY3VzIGJhY2tcblx0XHR9XG5cdFx0bWZwLmN1cnJJdGVtID0gbnVsbDtcdFxuXHRcdG1mcC5jb250ZW50ID0gbnVsbDtcblx0XHRtZnAuY3VyclRlbXBsYXRlID0gbnVsbDtcblx0XHRtZnAucHJldkhlaWdodCA9IDA7XG5cblx0XHRfbWZwVHJpZ2dlcihBRlRFUl9DTE9TRV9FVkVOVCk7XG5cdH0sXG5cdFxuXHR1cGRhdGVTaXplOiBmdW5jdGlvbih3aW5IZWlnaHQpIHtcblxuXHRcdGlmKG1mcC5pc0lPUykge1xuXHRcdFx0Ly8gZml4ZXMgaU9TIG5hdiBiYXJzIGh0dHBzOi8vZ2l0aHViLmNvbS9kaW1zZW1lbm92L01hZ25pZmljLVBvcHVwL2lzc3Vlcy8yXG5cdFx0XHR2YXIgem9vbUxldmVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIC8gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0XHR2YXIgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogem9vbUxldmVsO1xuXHRcdFx0bWZwLndyYXAuY3NzKCdoZWlnaHQnLCBoZWlnaHQpO1xuXHRcdFx0bWZwLndIID0gaGVpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZnAud0ggPSB3aW5IZWlnaHQgfHwgX3dpbmRvdy5oZWlnaHQoKTtcblx0XHR9XG5cdFx0Ly8gRml4ZXMgIzg0OiBwb3B1cCBpbmNvcnJlY3RseSBwb3NpdGlvbmVkIHdpdGggcG9zaXRpb246cmVsYXRpdmUgb24gYm9keVxuXHRcdGlmKCFtZnAuZml4ZWRDb250ZW50UG9zKSB7XG5cdFx0XHRtZnAud3JhcC5jc3MoJ2hlaWdodCcsIG1mcC53SCk7XG5cdFx0fVxuXG5cdFx0X21mcFRyaWdnZXIoJ1Jlc2l6ZScpO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBjb250ZW50IG9mIHBvcHVwIGJhc2VkIG9uIGN1cnJlbnQgaW5kZXhcblx0ICovXG5cdHVwZGF0ZUl0ZW1IVE1MOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaXRlbSA9IG1mcC5pdGVtc1ttZnAuaW5kZXhdO1xuXG5cdFx0Ly8gRGV0YWNoIGFuZCBwZXJmb3JtIG1vZGlmaWNhdGlvbnNcblx0XHRtZnAuY29udGVudENvbnRhaW5lci5kZXRhY2goKTtcblxuXHRcdGlmKG1mcC5jb250ZW50KVxuXHRcdFx0bWZwLmNvbnRlbnQuZGV0YWNoKCk7XG5cblx0XHRpZighaXRlbS5wYXJzZWQpIHtcblx0XHRcdGl0ZW0gPSBtZnAucGFyc2VFbCggbWZwLmluZGV4ICk7XG5cdFx0fVxuXG5cdFx0dmFyIHR5cGUgPSBpdGVtLnR5cGU7XG5cblx0XHRfbWZwVHJpZ2dlcignQmVmb3JlQ2hhbmdlJywgW21mcC5jdXJySXRlbSA/IG1mcC5jdXJySXRlbS50eXBlIDogJycsIHR5cGVdKTtcblx0XHQvLyBCZWZvcmVDaGFuZ2UgZXZlbnQgd29ya3MgbGlrZSBzbzpcblx0XHQvLyBfbWZwT24oJ0JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKGUsIHByZXZUeXBlLCBuZXdUeXBlKSB7IH0pO1xuXG5cdFx0bWZwLmN1cnJJdGVtID0gaXRlbTtcblxuXHRcdGlmKCFtZnAuY3VyclRlbXBsYXRlW3R5cGVdKSB7XG5cdFx0XHR2YXIgbWFya3VwID0gbWZwLnN0W3R5cGVdID8gbWZwLnN0W3R5cGVdLm1hcmt1cCA6IGZhbHNlO1xuXG5cdFx0XHQvLyBhbGxvd3MgdG8gbW9kaWZ5IG1hcmt1cFxuXHRcdFx0X21mcFRyaWdnZXIoJ0ZpcnN0TWFya3VwUGFyc2UnLCBtYXJrdXApO1xuXG5cdFx0XHRpZihtYXJrdXApIHtcblx0XHRcdFx0bWZwLmN1cnJUZW1wbGF0ZVt0eXBlXSA9ICQobWFya3VwKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIHRoZXJlIGlzIG5vIG1hcmt1cCBmb3VuZCB3ZSBqdXN0IGRlZmluZSB0aGF0IHRlbXBsYXRlIGlzIHBhcnNlZFxuXHRcdFx0XHRtZnAuY3VyclRlbXBsYXRlW3R5cGVdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihfcHJldkNvbnRlbnRUeXBlICYmIF9wcmV2Q29udGVudFR5cGUgIT09IGl0ZW0udHlwZSkge1xuXHRcdFx0bWZwLmNvbnRhaW5lci5yZW1vdmVDbGFzcygnbWZwLScrX3ByZXZDb250ZW50VHlwZSsnLWhvbGRlcicpO1xuXHRcdH1cblxuXHRcdHZhciBuZXdDb250ZW50ID0gbWZwWydnZXQnICsgdHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSldKGl0ZW0sIG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0pO1xuXHRcdG1mcC5hcHBlbmRDb250ZW50KG5ld0NvbnRlbnQsIHR5cGUpO1xuXG5cdFx0aXRlbS5wcmVsb2FkZWQgPSB0cnVlO1xuXG5cdFx0X21mcFRyaWdnZXIoQ0hBTkdFX0VWRU5ULCBpdGVtKTtcblx0XHRfcHJldkNvbnRlbnRUeXBlID0gaXRlbS50eXBlO1xuXG5cdFx0Ly8gQXBwZW5kIGNvbnRhaW5lciBiYWNrIGFmdGVyIGl0cyBjb250ZW50IGNoYW5nZWRcblx0XHRtZnAuY29udGFpbmVyLnByZXBlbmQobWZwLmNvbnRlbnRDb250YWluZXIpO1xuXG5cdFx0X21mcFRyaWdnZXIoJ0FmdGVyQ2hhbmdlJyk7XG5cdH0sXG5cblxuXHQvKipcblx0ICogU2V0IEhUTUwgY29udGVudCBvZiBwb3B1cFxuXHQgKi9cblx0YXBwZW5kQ29udGVudDogZnVuY3Rpb24obmV3Q29udGVudCwgdHlwZSkge1xuXHRcdG1mcC5jb250ZW50ID0gbmV3Q29udGVudDtcblxuXHRcdGlmKG5ld0NvbnRlbnQpIHtcblx0XHRcdGlmKG1mcC5zdC5zaG93Q2xvc2VCdG4gJiYgbWZwLnN0LmNsb3NlQnRuSW5zaWRlICYmXG5cdFx0XHRcdG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0gPT09IHRydWUpIHtcblx0XHRcdFx0Ly8gaWYgdGhlcmUgaXMgbm8gbWFya3VwLCB3ZSBqdXN0IGFwcGVuZCBjbG9zZSBidXR0b24gZWxlbWVudCBpbnNpZGVcblx0XHRcdFx0aWYoIW1mcC5jb250ZW50LmZpbmQoJy5tZnAtY2xvc2UnKS5sZW5ndGgpIHtcblx0XHRcdFx0XHRtZnAuY29udGVudC5hcHBlbmQoX2dldENsb3NlQnRuKCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtZnAuY29udGVudCA9IG5ld0NvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1mcC5jb250ZW50ID0gJyc7XG5cdFx0fVxuXG5cdFx0X21mcFRyaWdnZXIoQkVGT1JFX0FQUEVORF9FVkVOVCk7XG5cdFx0bWZwLmNvbnRhaW5lci5hZGRDbGFzcygnbWZwLScrdHlwZSsnLWhvbGRlcicpO1xuXG5cdFx0bWZwLmNvbnRlbnRDb250YWluZXIuYXBwZW5kKG1mcC5jb250ZW50KTtcblx0fSxcblxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIE1hZ25pZmljIFBvcHVwIGRhdGEgb2JqZWN0IGJhc2VkIG9uIGdpdmVuIGRhdGFcblx0ICogQHBhcmFtICB7aW50fSBpbmRleCBJbmRleCBvZiBpdGVtIHRvIHBhcnNlXG5cdCAqL1xuXHRwYXJzZUVsOiBmdW5jdGlvbihpbmRleCkge1xuXHRcdHZhciBpdGVtID0gbWZwLml0ZW1zW2luZGV4XSxcblx0XHRcdHR5cGU7XG5cblx0XHRpZihpdGVtLnRhZ05hbWUpIHtcblx0XHRcdGl0ZW0gPSB7IGVsOiAkKGl0ZW0pIH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHR5cGUgPSBpdGVtLnR5cGU7XG5cdFx0XHRpdGVtID0geyBkYXRhOiBpdGVtLCBzcmM6IGl0ZW0uc3JjIH07XG5cdFx0fVxuXG5cdFx0aWYoaXRlbS5lbCkge1xuXHRcdFx0dmFyIHR5cGVzID0gbWZwLnR5cGVzO1xuXG5cdFx0XHQvLyBjaGVjayBmb3IgJ21mcC1UWVBFJyBjbGFzc1xuXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmKCBpdGVtLmVsLmhhc0NsYXNzKCdtZnAtJyt0eXBlc1tpXSkgKSB7XG5cdFx0XHRcdFx0dHlwZSA9IHR5cGVzW2ldO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGl0ZW0uc3JjID0gaXRlbS5lbC5hdHRyKCdkYXRhLW1mcC1zcmMnKTtcblx0XHRcdGlmKCFpdGVtLnNyYykge1xuXHRcdFx0XHRpdGVtLnNyYyA9IGl0ZW0uZWwuYXR0cignaHJlZicpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGl0ZW0udHlwZSA9IHR5cGUgfHwgbWZwLnN0LnR5cGUgfHwgJ2lubGluZSc7XG5cdFx0aXRlbS5pbmRleCA9IGluZGV4O1xuXHRcdGl0ZW0ucGFyc2VkID0gdHJ1ZTtcblx0XHRtZnAuaXRlbXNbaW5kZXhdID0gaXRlbTtcblx0XHRfbWZwVHJpZ2dlcignRWxlbWVudFBhcnNlJywgaXRlbSk7XG5cblx0XHRyZXR1cm4gbWZwLml0ZW1zW2luZGV4XTtcblx0fSxcblxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplcyBzaW5nbGUgcG9wdXAgb3IgYSBncm91cCBvZiBwb3B1cHNcblx0ICovXG5cdGFkZEdyb3VwOiBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuXHRcdHZhciBlSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUubWZwRWwgPSB0aGlzO1xuXHRcdFx0bWZwLl9vcGVuQ2xpY2soZSwgZWwsIG9wdGlvbnMpO1xuXHRcdH07XG5cblx0XHRpZighb3B0aW9ucykge1xuXHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdH1cblxuXHRcdHZhciBlTmFtZSA9ICdjbGljay5tYWduaWZpY1BvcHVwJztcblx0XHRvcHRpb25zLm1haW5FbCA9IGVsO1xuXG5cdFx0aWYob3B0aW9ucy5pdGVtcykge1xuXHRcdFx0b3B0aW9ucy5pc09iaiA9IHRydWU7XG5cdFx0XHRlbC5vZmYoZU5hbWUpLm9uKGVOYW1lLCBlSGFuZGxlcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9wdGlvbnMuaXNPYmogPSBmYWxzZTtcblx0XHRcdGlmKG9wdGlvbnMuZGVsZWdhdGUpIHtcblx0XHRcdFx0ZWwub2ZmKGVOYW1lKS5vbihlTmFtZSwgb3B0aW9ucy5kZWxlZ2F0ZSAsIGVIYW5kbGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMuaXRlbXMgPSBlbDtcblx0XHRcdFx0ZWwub2ZmKGVOYW1lKS5vbihlTmFtZSwgZUhhbmRsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0X29wZW5DbGljazogZnVuY3Rpb24oZSwgZWwsIG9wdGlvbnMpIHtcblx0XHR2YXIgbWlkQ2xpY2sgPSBvcHRpb25zLm1pZENsaWNrICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1pZENsaWNrIDogJC5tYWduaWZpY1BvcHVwLmRlZmF1bHRzLm1pZENsaWNrO1xuXG5cblx0XHRpZighbWlkQ2xpY2sgJiYgKCBlLndoaWNoID09PSAyIHx8IGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgZS5hbHRLZXkgfHwgZS5zaGlmdEtleSApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBkaXNhYmxlT24gPSBvcHRpb25zLmRpc2FibGVPbiAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5kaXNhYmxlT24gOiAkLm1hZ25pZmljUG9wdXAuZGVmYXVsdHMuZGlzYWJsZU9uO1xuXG5cdFx0aWYoZGlzYWJsZU9uKSB7XG5cdFx0XHRpZigkLmlzRnVuY3Rpb24oZGlzYWJsZU9uKSkge1xuXHRcdFx0XHRpZiggIWRpc2FibGVPbi5jYWxsKG1mcCkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7IC8vIGVsc2UgaXQncyBudW1iZXJcblx0XHRcdFx0aWYoIF93aW5kb3cud2lkdGgoKSA8IGRpc2FibGVPbiApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKGUudHlwZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQvLyBUaGlzIHdpbGwgcHJldmVudCBwb3B1cCBmcm9tIGNsb3NpbmcgaWYgZWxlbWVudCBpcyBpbnNpZGUgYW5kIHBvcHVwIGlzIGFscmVhZHkgb3BlbmVkXG5cdFx0XHRpZihtZnAuaXNPcGVuKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b3B0aW9ucy5lbCA9ICQoZS5tZnBFbCk7XG5cdFx0aWYob3B0aW9ucy5kZWxlZ2F0ZSkge1xuXHRcdFx0b3B0aW9ucy5pdGVtcyA9IGVsLmZpbmQob3B0aW9ucy5kZWxlZ2F0ZSk7XG5cdFx0fVxuXHRcdG1mcC5vcGVuKG9wdGlvbnMpO1xuXHR9LFxuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGV4dCBvbiBwcmVsb2FkZXJcblx0ICovXG5cdHVwZGF0ZVN0YXR1czogZnVuY3Rpb24oc3RhdHVzLCB0ZXh0KSB7XG5cblx0XHRpZihtZnAucHJlbG9hZGVyKSB7XG5cdFx0XHRpZihfcHJldlN0YXR1cyAhPT0gc3RhdHVzKSB7XG5cdFx0XHRcdG1mcC5jb250YWluZXIucmVtb3ZlQ2xhc3MoJ21mcC1zLScrX3ByZXZTdGF0dXMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZighdGV4dCAmJiBzdGF0dXMgPT09ICdsb2FkaW5nJykge1xuXHRcdFx0XHR0ZXh0ID0gbWZwLnN0LnRMb2FkaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZGF0YSA9IHtcblx0XHRcdFx0c3RhdHVzOiBzdGF0dXMsXG5cdFx0XHRcdHRleHQ6IHRleHRcblx0XHRcdH07XG5cdFx0XHQvLyBhbGxvd3MgdG8gbW9kaWZ5IHN0YXR1c1xuXHRcdFx0X21mcFRyaWdnZXIoJ1VwZGF0ZVN0YXR1cycsIGRhdGEpO1xuXG5cdFx0XHRzdGF0dXMgPSBkYXRhLnN0YXR1cztcblx0XHRcdHRleHQgPSBkYXRhLnRleHQ7XG5cblx0XHRcdG1mcC5wcmVsb2FkZXIuaHRtbCh0ZXh0KTtcblxuXHRcdFx0bWZwLnByZWxvYWRlci5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1mcC5jb250YWluZXIuYWRkQ2xhc3MoJ21mcC1zLScrc3RhdHVzKTtcblx0XHRcdF9wcmV2U3RhdHVzID0gc3RhdHVzO1xuXHRcdH1cblx0fSxcblxuXG5cdC8qXG5cdFx0XCJQcml2YXRlXCIgaGVscGVycyB0aGF0IGFyZW4ndCBwcml2YXRlIGF0IGFsbFxuXHQgKi9cblx0Ly8gQ2hlY2sgdG8gY2xvc2UgcG9wdXAgb3Igbm90XG5cdC8vIFwidGFyZ2V0XCIgaXMgYW4gZWxlbWVudCB0aGF0IHdhcyBjbGlja2VkXG5cdF9jaGVja0lmQ2xvc2U6IGZ1bmN0aW9uKHRhcmdldCkge1xuXG5cdFx0aWYoJCh0YXJnZXQpLmhhc0NsYXNzKFBSRVZFTlRfQ0xPU0VfQ0xBU1MpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGNsb3NlT25Db250ZW50ID0gbWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2s7XG5cdFx0dmFyIGNsb3NlT25CZyA9IG1mcC5zdC5jbG9zZU9uQmdDbGljaztcblxuXHRcdGlmKGNsb3NlT25Db250ZW50ICYmIGNsb3NlT25CZykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gV2UgY2xvc2UgdGhlIHBvcHVwIGlmIGNsaWNrIGlzIG9uIGNsb3NlIGJ1dHRvbiBvciBvbiBwcmVsb2FkZXIuIE9yIGlmIHRoZXJlIGlzIG5vIGNvbnRlbnQuXG5cdFx0XHRpZighbWZwLmNvbnRlbnQgfHwgJCh0YXJnZXQpLmhhc0NsYXNzKCdtZnAtY2xvc2UnKSB8fCAobWZwLnByZWxvYWRlciAmJiB0YXJnZXQgPT09IG1mcC5wcmVsb2FkZXJbMF0pICkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgY2xpY2sgaXMgb3V0c2lkZSB0aGUgY29udGVudFxuXHRcdFx0aWYoICAodGFyZ2V0ICE9PSBtZnAuY29udGVudFswXSAmJiAhJC5jb250YWlucyhtZnAuY29udGVudFswXSwgdGFyZ2V0KSkgICkge1xuXHRcdFx0XHRpZihjbG9zZU9uQmcpIHtcblx0XHRcdFx0XHQvLyBsYXN0IGNoZWNrLCBpZiB0aGUgY2xpY2tlZCBlbGVtZW50IGlzIGluIERPTSwgKGluIGNhc2UgaXQncyByZW1vdmVkIG9uY2xpY2spXG5cdFx0XHRcdFx0aWYoICQuY29udGFpbnMoZG9jdW1lbnQsIHRhcmdldCkgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZihjbG9zZU9uQ29udGVudCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdF9hZGRDbGFzc1RvTUZQOiBmdW5jdGlvbihjTmFtZSkge1xuXHRcdG1mcC5iZ092ZXJsYXkuYWRkQ2xhc3MoY05hbWUpO1xuXHRcdG1mcC53cmFwLmFkZENsYXNzKGNOYW1lKTtcblx0fSxcblx0X3JlbW92ZUNsYXNzRnJvbU1GUDogZnVuY3Rpb24oY05hbWUpIHtcblx0XHR0aGlzLmJnT3ZlcmxheS5yZW1vdmVDbGFzcyhjTmFtZSk7XG5cdFx0bWZwLndyYXAucmVtb3ZlQ2xhc3MoY05hbWUpO1xuXHR9LFxuXHRfaGFzU2Nyb2xsQmFyOiBmdW5jdGlvbih3aW5IZWlnaHQpIHtcblx0XHRyZXR1cm4gKCAgKG1mcC5pc0lFNyA/IF9kb2N1bWVudC5oZWlnaHQoKSA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KSA+ICh3aW5IZWlnaHQgfHwgX3dpbmRvdy5oZWlnaHQoKSkgKTtcblx0fSxcblx0X3NldEZvY3VzOiBmdW5jdGlvbigpIHtcblx0XHQobWZwLnN0LmZvY3VzID8gbWZwLmNvbnRlbnQuZmluZChtZnAuc3QuZm9jdXMpLmVxKDApIDogbWZwLndyYXApLmZvY3VzKCk7XG5cdH0sXG5cdF9vbkZvY3VzSW46IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiggZS50YXJnZXQgIT09IG1mcC53cmFwWzBdICYmICEkLmNvbnRhaW5zKG1mcC53cmFwWzBdLCBlLnRhcmdldCkgKSB7XG5cdFx0XHRtZnAuX3NldEZvY3VzKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9LFxuXHRfcGFyc2VNYXJrdXA6IGZ1bmN0aW9uKHRlbXBsYXRlLCB2YWx1ZXMsIGl0ZW0pIHtcblx0XHR2YXIgYXJyO1xuXHRcdGlmKGl0ZW0uZGF0YSkge1xuXHRcdFx0dmFsdWVzID0gJC5leHRlbmQoaXRlbS5kYXRhLCB2YWx1ZXMpO1xuXHRcdH1cblx0XHRfbWZwVHJpZ2dlcihNQVJLVVBfUEFSU0VfRVZFTlQsIFt0ZW1wbGF0ZSwgdmFsdWVzLCBpdGVtXSApO1xuXG5cdFx0JC5lYWNoKHZhbHVlcywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0aWYodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRhcnIgPSBrZXkuc3BsaXQoJ18nKTtcblx0XHRcdGlmKGFyci5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdHZhciBlbCA9IHRlbXBsYXRlLmZpbmQoRVZFTlRfTlMgKyAnLScrYXJyWzBdKTtcblxuXHRcdFx0XHRpZihlbC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGF0dHIgPSBhcnJbMV07XG5cdFx0XHRcdFx0aWYoYXR0ciA9PT0gJ3JlcGxhY2VXaXRoJykge1xuXHRcdFx0XHRcdFx0aWYoZWxbMF0gIT09IHZhbHVlWzBdKSB7XG5cdFx0XHRcdFx0XHRcdGVsLnJlcGxhY2VXaXRoKHZhbHVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYoYXR0ciA9PT0gJ2ltZycpIHtcblx0XHRcdFx0XHRcdGlmKGVsLmlzKCdpbWcnKSkge1xuXHRcdFx0XHRcdFx0XHRlbC5hdHRyKCdzcmMnLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbC5yZXBsYWNlV2l0aCggJCgnPGltZz4nKS5hdHRyKCdzcmMnLCB2YWx1ZSkuYXR0cignY2xhc3MnLCBlbC5hdHRyKCdjbGFzcycpKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbC5hdHRyKGFyclsxXSwgdmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0ZW1wbGF0ZS5maW5kKEVWRU5UX05TICsgJy0nK2tleSkuaHRtbCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0X2dldFNjcm9sbGJhclNpemU6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoeCBEYXZpZFxuXHRcdGlmKG1mcC5zY3JvbGxiYXJTaXplID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c2Nyb2xsRGl2LnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6IDk5cHg7IGhlaWdodDogOTlweDsgb3ZlcmZsb3c6IHNjcm9sbDsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IC05OTk5cHg7Jztcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcblx0XHRcdG1mcC5zY3JvbGxiYXJTaXplID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuXHRcdH1cblx0XHRyZXR1cm4gbWZwLnNjcm9sbGJhclNpemU7XG5cdH1cblxufTsgLyogTWFnbmlmaWNQb3B1cCBjb3JlIHByb3RvdHlwZSBlbmQgKi9cblxuXG5cblxuLyoqXG4gKiBQdWJsaWMgc3RhdGljIGZ1bmN0aW9uc1xuICovXG4kLm1hZ25pZmljUG9wdXAgPSB7XG5cdGluc3RhbmNlOiBudWxsLFxuXHRwcm90bzogTWFnbmlmaWNQb3B1cC5wcm90b3R5cGUsXG5cdG1vZHVsZXM6IFtdLFxuXG5cdG9wZW46IGZ1bmN0aW9uKG9wdGlvbnMsIGluZGV4KSB7XG5cdFx0X2NoZWNrSW5zdGFuY2UoKTtcblxuXHRcdGlmKCFvcHRpb25zKSB7XG5cdFx0XHRvcHRpb25zID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0b3B0aW9ucy5pc09iaiA9IHRydWU7XG5cdFx0b3B0aW9ucy5pbmRleCA9IGluZGV4IHx8IDA7XG5cdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2Uub3BlbihvcHRpb25zKTtcblx0fSxcblxuXHRjbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICQubWFnbmlmaWNQb3B1cC5pbnN0YW5jZSAmJiAkLm1hZ25pZmljUG9wdXAuaW5zdGFuY2UuY2xvc2UoKTtcblx0fSxcblxuXHRyZWdpc3Rlck1vZHVsZTogZnVuY3Rpb24obmFtZSwgbW9kdWxlKSB7XG5cdFx0aWYobW9kdWxlLm9wdGlvbnMpIHtcblx0XHRcdCQubWFnbmlmaWNQb3B1cC5kZWZhdWx0c1tuYW1lXSA9IG1vZHVsZS5vcHRpb25zO1xuXHRcdH1cblx0XHQkLmV4dGVuZCh0aGlzLnByb3RvLCBtb2R1bGUucHJvdG8pO1xuXHRcdHRoaXMubW9kdWxlcy5wdXNoKG5hbWUpO1xuXHR9LFxuXG5cdGRlZmF1bHRzOiB7XG5cblx0XHQvLyBJbmZvIGFib3V0IG9wdGlvbnMgaXMgaW4gZG9jczpcblx0XHQvLyBodHRwOi8vZGltc2VtZW5vdi5jb20vcGx1Z2lucy9tYWduaWZpYy1wb3B1cC9kb2N1bWVudGF0aW9uLmh0bWwjb3B0aW9uc1xuXG5cdFx0ZGlzYWJsZU9uOiAwLFxuXG5cdFx0a2V5OiBudWxsLFxuXG5cdFx0bWlkQ2xpY2s6IGZhbHNlLFxuXG5cdFx0bWFpbkNsYXNzOiAnJyxcblxuXHRcdHByZWxvYWRlcjogdHJ1ZSxcblxuXHRcdGZvY3VzOiAnJywgLy8gQ1NTIHNlbGVjdG9yIG9mIGlucHV0IHRvIGZvY3VzIGFmdGVyIHBvcHVwIGlzIG9wZW5lZFxuXG5cdFx0Y2xvc2VPbkNvbnRlbnRDbGljazogZmFsc2UsXG5cblx0XHRjbG9zZU9uQmdDbGljazogdHJ1ZSxcblxuXHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxuXG5cdFx0c2hvd0Nsb3NlQnRuOiB0cnVlLFxuXG5cdFx0ZW5hYmxlRXNjYXBlS2V5OiB0cnVlLFxuXG5cdFx0bW9kYWw6IGZhbHNlLFxuXG5cdFx0YWxpZ25Ub3A6IGZhbHNlLFxuXG5cdFx0cmVtb3ZhbERlbGF5OiAwLFxuXG5cdFx0cHJlcGVuZFRvOiBudWxsLFxuXG5cdFx0Zml4ZWRDb250ZW50UG9zOiAnYXV0bycsXG5cblx0XHRmaXhlZEJnUG9zOiAnYXV0bycsXG5cblx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcblxuXHRcdGNsb3NlTWFya3VwOiAnPGJ1dHRvbiB0aXRsZT1cIiV0aXRsZSVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZnAtY2xvc2VcIj4mIzIxNTs8L2J1dHRvbj4nLFxuXG5cdFx0dENsb3NlOiAnQ2xvc2UgKEVzYyknLFxuXG5cdFx0dExvYWRpbmc6ICdMb2FkaW5nLi4uJyxcblxuXHRcdGF1dG9Gb2N1c0xhc3Q6IHRydWVcblxuXHR9XG59O1xuXG5cblxuJC5mbi5tYWduaWZpY1BvcHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRfY2hlY2tJbnN0YW5jZSgpO1xuXG5cdHZhciBqcUVsID0gJCh0aGlzKTtcblxuXHQvLyBXZSBjYWxsIHNvbWUgQVBJIG1ldGhvZCBvZiBmaXJzdCBwYXJhbSBpcyBhIHN0cmluZ1xuXHRpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRpZihvcHRpb25zID09PSAnb3BlbicpIHtcblx0XHRcdHZhciBpdGVtcyxcblx0XHRcdFx0aXRlbU9wdHMgPSBfaXNKUSA/IGpxRWwuZGF0YSgnbWFnbmlmaWNQb3B1cCcpIDoganFFbFswXS5tYWduaWZpY1BvcHVwLFxuXHRcdFx0XHRpbmRleCA9IHBhcnNlSW50KGFyZ3VtZW50c1sxXSwgMTApIHx8IDA7XG5cblx0XHRcdGlmKGl0ZW1PcHRzLml0ZW1zKSB7XG5cdFx0XHRcdGl0ZW1zID0gaXRlbU9wdHMuaXRlbXNbaW5kZXhdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXRlbXMgPSBqcUVsO1xuXHRcdFx0XHRpZihpdGVtT3B0cy5kZWxlZ2F0ZSkge1xuXHRcdFx0XHRcdGl0ZW1zID0gaXRlbXMuZmluZChpdGVtT3B0cy5kZWxlZ2F0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aXRlbXMgPSBpdGVtcy5lcSggaW5kZXggKTtcblx0XHRcdH1cblx0XHRcdG1mcC5fb3BlbkNsaWNrKHttZnBFbDppdGVtc30sIGpxRWwsIGl0ZW1PcHRzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYobWZwLmlzT3Blbilcblx0XHRcdFx0bWZwW29wdGlvbnNdLmFwcGx5KG1mcCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdFx0fVxuXG5cdH0gZWxzZSB7XG5cdFx0Ly8gY2xvbmUgb3B0aW9ucyBvYmpcblx0XHRvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIG9wdGlvbnMpO1xuXG5cdFx0Lypcblx0XHQgKiBBcyBaZXB0byBkb2Vzbid0IHN1cHBvcnQgLmRhdGEoKSBtZXRob2QgZm9yIG9iamVjdHNcblx0XHQgKiBhbmQgaXQgd29ya3Mgb25seSBpbiBub3JtYWwgYnJvd3NlcnNcblx0XHQgKiB3ZSBhc3NpZ24gXCJvcHRpb25zXCIgb2JqZWN0IGRpcmVjdGx5IHRvIHRoZSBET00gZWxlbWVudC4gRlRXIVxuXHRcdCAqL1xuXHRcdGlmKF9pc0pRKSB7XG5cdFx0XHRqcUVsLmRhdGEoJ21hZ25pZmljUG9wdXAnLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFFbFswXS5tYWduaWZpY1BvcHVwID0gb3B0aW9ucztcblx0XHR9XG5cblx0XHRtZnAuYWRkR3JvdXAoanFFbCwgb3B0aW9ucyk7XG5cblx0fVxuXHRyZXR1cm4ganFFbDtcbn07XG5cbi8qPj5jb3JlKi9cblxuLyo+PmlubGluZSovXG5cbnZhciBJTkxJTkVfTlMgPSAnaW5saW5lJyxcblx0X2hpZGRlbkNsYXNzLFxuXHRfaW5saW5lUGxhY2Vob2xkZXIsXG5cdF9sYXN0SW5saW5lRWxlbWVudCxcblx0X3B1dElubGluZUVsZW1lbnRzQmFjayA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKF9sYXN0SW5saW5lRWxlbWVudCkge1xuXHRcdFx0X2lubGluZVBsYWNlaG9sZGVyLmFmdGVyKCBfbGFzdElubGluZUVsZW1lbnQuYWRkQ2xhc3MoX2hpZGRlbkNsYXNzKSApLmRldGFjaCgpO1xuXHRcdFx0X2xhc3RJbmxpbmVFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cdH07XG5cbiQubWFnbmlmaWNQb3B1cC5yZWdpc3Rlck1vZHVsZShJTkxJTkVfTlMsIHtcblx0b3B0aW9uczoge1xuXHRcdGhpZGRlbkNsYXNzOiAnaGlkZScsIC8vIHdpbGwgYmUgYXBwZW5kZWQgd2l0aCBgbWZwLWAgcHJlZml4XG5cdFx0bWFya3VwOiAnJyxcblx0XHR0Tm90Rm91bmQ6ICdDb250ZW50IG5vdCBmb3VuZCdcblx0fSxcblx0cHJvdG86IHtcblxuXHRcdGluaXRJbmxpbmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0bWZwLnR5cGVzLnB1c2goSU5MSU5FX05TKTtcblxuXHRcdFx0X21mcE9uKENMT1NFX0VWRU5UKycuJytJTkxJTkVfTlMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfcHV0SW5saW5lRWxlbWVudHNCYWNrKCk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Z2V0SW5saW5lOiBmdW5jdGlvbihpdGVtLCB0ZW1wbGF0ZSkge1xuXG5cdFx0XHRfcHV0SW5saW5lRWxlbWVudHNCYWNrKCk7XG5cblx0XHRcdGlmKGl0ZW0uc3JjKSB7XG5cdFx0XHRcdHZhciBpbmxpbmVTdCA9IG1mcC5zdC5pbmxpbmUsXG5cdFx0XHRcdFx0ZWwgPSAkKGl0ZW0uc3JjKTtcblxuXHRcdFx0XHRpZihlbC5sZW5ndGgpIHtcblxuXHRcdFx0XHRcdC8vIElmIHRhcmdldCBlbGVtZW50IGhhcyBwYXJlbnQgLSB3ZSByZXBsYWNlIGl0IHdpdGggcGxhY2Vob2xkZXIgYW5kIHB1dCBpdCBiYWNrIGFmdGVyIHBvcHVwIGlzIGNsb3NlZFxuXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBlbFswXS5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdGlmKHBhcmVudCAmJiBwYXJlbnQudGFnTmFtZSkge1xuXHRcdFx0XHRcdFx0aWYoIV9pbmxpbmVQbGFjZWhvbGRlcikge1xuXHRcdFx0XHRcdFx0XHRfaGlkZGVuQ2xhc3MgPSBpbmxpbmVTdC5oaWRkZW5DbGFzcztcblx0XHRcdFx0XHRcdFx0X2lubGluZVBsYWNlaG9sZGVyID0gX2dldEVsKF9oaWRkZW5DbGFzcyk7XG5cdFx0XHRcdFx0XHRcdF9oaWRkZW5DbGFzcyA9ICdtZnAtJytfaGlkZGVuQ2xhc3M7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyByZXBsYWNlIHRhcmdldCBpbmxpbmUgZWxlbWVudCB3aXRoIHBsYWNlaG9sZGVyXG5cdFx0XHRcdFx0XHRfbGFzdElubGluZUVsZW1lbnQgPSBlbC5hZnRlcihfaW5saW5lUGxhY2Vob2xkZXIpLmRldGFjaCgpLnJlbW92ZUNsYXNzKF9oaWRkZW5DbGFzcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygncmVhZHknKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdlcnJvcicsIGlubGluZVN0LnROb3RGb3VuZCk7XG5cdFx0XHRcdFx0ZWwgPSAkKCc8ZGl2PicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aXRlbS5pbmxpbmVFbGVtZW50ID0gZWw7XG5cdFx0XHRcdHJldHVybiBlbDtcblx0XHRcdH1cblxuXHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygncmVhZHknKTtcblx0XHRcdG1mcC5fcGFyc2VNYXJrdXAodGVtcGxhdGUsIHt9LCBpdGVtKTtcblx0XHRcdHJldHVybiB0ZW1wbGF0ZTtcblx0XHR9XG5cdH1cbn0pO1xuXG4vKj4+aW5saW5lKi9cblxuLyo+PmFqYXgqL1xudmFyIEFKQVhfTlMgPSAnYWpheCcsXG5cdF9hamF4Q3VyLFxuXHRfcmVtb3ZlQWpheEN1cnNvciA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKF9hamF4Q3VyKSB7XG5cdFx0XHQkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKF9hamF4Q3VyKTtcblx0XHR9XG5cdH0sXG5cdF9kZXN0cm95QWpheFJlcXVlc3QgPSBmdW5jdGlvbigpIHtcblx0XHRfcmVtb3ZlQWpheEN1cnNvcigpO1xuXHRcdGlmKG1mcC5yZXEpIHtcblx0XHRcdG1mcC5yZXEuYWJvcnQoKTtcblx0XHR9XG5cdH07XG5cbiQubWFnbmlmaWNQb3B1cC5yZWdpc3Rlck1vZHVsZShBSkFYX05TLCB7XG5cblx0b3B0aW9uczoge1xuXHRcdHNldHRpbmdzOiBudWxsLFxuXHRcdGN1cnNvcjogJ21mcC1hamF4LWN1cicsXG5cdFx0dEVycm9yOiAnPGEgaHJlZj1cIiV1cmwlXCI+VGhlIGNvbnRlbnQ8L2E+IGNvdWxkIG5vdCBiZSBsb2FkZWQuJ1xuXHR9LFxuXG5cdHByb3RvOiB7XG5cdFx0aW5pdEFqYXg6IGZ1bmN0aW9uKCkge1xuXHRcdFx0bWZwLnR5cGVzLnB1c2goQUpBWF9OUyk7XG5cdFx0XHRfYWpheEN1ciA9IG1mcC5zdC5hamF4LmN1cnNvcjtcblxuXHRcdFx0X21mcE9uKENMT1NFX0VWRU5UKycuJytBSkFYX05TLCBfZGVzdHJveUFqYXhSZXF1ZXN0KTtcblx0XHRcdF9tZnBPbignQmVmb3JlQ2hhbmdlLicgKyBBSkFYX05TLCBfZGVzdHJveUFqYXhSZXF1ZXN0KTtcblx0XHR9LFxuXHRcdGdldEFqYXg6IGZ1bmN0aW9uKGl0ZW0pIHtcblxuXHRcdFx0aWYoX2FqYXhDdXIpIHtcblx0XHRcdFx0JChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcyhfYWpheEN1cik7XG5cdFx0XHR9XG5cblx0XHRcdG1mcC51cGRhdGVTdGF0dXMoJ2xvYWRpbmcnKTtcblxuXHRcdFx0dmFyIG9wdHMgPSAkLmV4dGVuZCh7XG5cdFx0XHRcdHVybDogaXRlbS5zcmMsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSKSB7XG5cdFx0XHRcdFx0dmFyIHRlbXAgPSB7XG5cdFx0XHRcdFx0XHRkYXRhOmRhdGEsXG5cdFx0XHRcdFx0XHR4aHI6anFYSFJcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0X21mcFRyaWdnZXIoJ1BhcnNlQWpheCcsIHRlbXApO1xuXG5cdFx0XHRcdFx0bWZwLmFwcGVuZENvbnRlbnQoICQodGVtcC5kYXRhKSwgQUpBWF9OUyApO1xuXG5cdFx0XHRcdFx0aXRlbS5maW5pc2hlZCA9IHRydWU7XG5cblx0XHRcdFx0XHRfcmVtb3ZlQWpheEN1cnNvcigpO1xuXG5cdFx0XHRcdFx0bWZwLl9zZXRGb2N1cygpO1xuXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdG1mcC53cmFwLmFkZENsYXNzKFJFQURZX0NMQVNTKTtcblx0XHRcdFx0XHR9LCAxNik7XG5cblx0XHRcdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXG5cdFx0XHRcdFx0X21mcFRyaWdnZXIoJ0FqYXhDb250ZW50QWRkZWQnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdF9yZW1vdmVBamF4Q3Vyc29yKCk7XG5cdFx0XHRcdFx0aXRlbS5maW5pc2hlZCA9IGl0ZW0ubG9hZEVycm9yID0gdHJ1ZTtcblx0XHRcdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdlcnJvcicsIG1mcC5zdC5hamF4LnRFcnJvci5yZXBsYWNlKCcldXJsJScsIGl0ZW0uc3JjKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIG1mcC5zdC5hamF4LnNldHRpbmdzKTtcblxuXHRcdFx0bWZwLnJlcSA9ICQuYWpheChvcHRzKTtcblxuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0fVxufSk7XG5cbi8qPj5hamF4Ki9cblxuLyo+PmltYWdlKi9cbnZhciBfaW1nSW50ZXJ2YWwsXG5cdF9nZXRUaXRsZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRpZihpdGVtLmRhdGEgJiYgaXRlbS5kYXRhLnRpdGxlICE9PSB1bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4gaXRlbS5kYXRhLnRpdGxlO1xuXG5cdFx0dmFyIHNyYyA9IG1mcC5zdC5pbWFnZS50aXRsZVNyYztcblxuXHRcdGlmKHNyYykge1xuXHRcdFx0aWYoJC5pc0Z1bmN0aW9uKHNyYykpIHtcblx0XHRcdFx0cmV0dXJuIHNyYy5jYWxsKG1mcCwgaXRlbSk7XG5cdFx0XHR9IGVsc2UgaWYoaXRlbS5lbCkge1xuXHRcdFx0XHRyZXR1cm4gaXRlbS5lbC5hdHRyKHNyYykgfHwgJyc7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fTtcblxuJC5tYWduaWZpY1BvcHVwLnJlZ2lzdGVyTW9kdWxlKCdpbWFnZScsIHtcblxuXHRvcHRpb25zOiB7XG5cdFx0bWFya3VwOiAnPGRpdiBjbGFzcz1cIm1mcC1maWd1cmVcIj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwibWZwLWNsb3NlXCI+PC9kaXY+Jytcblx0XHRcdFx0XHQnPGZpZ3VyZT4nK1xuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJtZnAtaW1nXCI+PC9kaXY+Jytcblx0XHRcdFx0XHRcdCc8ZmlnY2FwdGlvbj4nK1xuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cIm1mcC1ib3R0b20tYmFyXCI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cIm1mcC10aXRsZVwiPjwvZGl2PicrXG5cdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJtZnAtY291bnRlclwiPjwvZGl2PicrXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHRcdFx0JzwvZmlnY2FwdGlvbj4nK1xuXHRcdFx0XHRcdCc8L2ZpZ3VyZT4nK1xuXHRcdFx0XHQnPC9kaXY+Jyxcblx0XHRjdXJzb3I6ICdtZnAtem9vbS1vdXQtY3VyJyxcblx0XHR0aXRsZVNyYzogJ3RpdGxlJyxcblx0XHR2ZXJ0aWNhbEZpdDogdHJ1ZSxcblx0XHR0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj5UaGUgaW1hZ2U8L2E+IGNvdWxkIG5vdCBiZSBsb2FkZWQuJ1xuXHR9LFxuXG5cdHByb3RvOiB7XG5cdFx0aW5pdEltYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpbWdTdCA9IG1mcC5zdC5pbWFnZSxcblx0XHRcdFx0bnMgPSAnLmltYWdlJztcblxuXHRcdFx0bWZwLnR5cGVzLnB1c2goJ2ltYWdlJyk7XG5cblx0XHRcdF9tZnBPbihPUEVOX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLmN1cnJJdGVtLnR5cGUgPT09ICdpbWFnZScgJiYgaW1nU3QuY3Vyc29yKSB7XG5cdFx0XHRcdFx0JChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcyhpbWdTdC5jdXJzb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0X21mcE9uKENMT1NFX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYoaW1nU3QuY3Vyc29yKSB7XG5cdFx0XHRcdFx0JChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcyhpbWdTdC5jdXJzb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF93aW5kb3cub2ZmKCdyZXNpemUnICsgRVZFTlRfTlMpO1xuXHRcdFx0fSk7XG5cblx0XHRcdF9tZnBPbignUmVzaXplJytucywgbWZwLnJlc2l6ZUltYWdlKTtcblx0XHRcdGlmKG1mcC5pc0xvd0lFKSB7XG5cdFx0XHRcdF9tZnBPbignQWZ0ZXJDaGFuZ2UnLCBtZnAucmVzaXplSW1hZ2UpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVzaXplSW1hZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGl0ZW0gPSBtZnAuY3Vyckl0ZW07XG5cdFx0XHRpZighaXRlbSB8fCAhaXRlbS5pbWcpIHJldHVybjtcblxuXHRcdFx0aWYobWZwLnN0LmltYWdlLnZlcnRpY2FsRml0KSB7XG5cdFx0XHRcdHZhciBkZWNyID0gMDtcblx0XHRcdFx0Ly8gZml4IGJveC1zaXppbmcgaW4gaWU3Lzhcblx0XHRcdFx0aWYobWZwLmlzTG93SUUpIHtcblx0XHRcdFx0XHRkZWNyID0gcGFyc2VJbnQoaXRlbS5pbWcuY3NzKCdwYWRkaW5nLXRvcCcpLCAxMCkgKyBwYXJzZUludChpdGVtLmltZy5jc3MoJ3BhZGRpbmctYm90dG9tJyksMTApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW0uaW1nLmNzcygnbWF4LWhlaWdodCcsIG1mcC53SC1kZWNyKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdF9vbkltYWdlSGFzU2l6ZTogZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0aWYoaXRlbS5pbWcpIHtcblxuXHRcdFx0XHRpdGVtLmhhc1NpemUgPSB0cnVlO1xuXG5cdFx0XHRcdGlmKF9pbWdJbnRlcnZhbCkge1xuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoX2ltZ0ludGVydmFsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGl0ZW0uaXNDaGVja2luZ0ltZ1NpemUgPSBmYWxzZTtcblxuXHRcdFx0XHRfbWZwVHJpZ2dlcignSW1hZ2VIYXNTaXplJywgaXRlbSk7XG5cblx0XHRcdFx0aWYoaXRlbS5pbWdIaWRkZW4pIHtcblx0XHRcdFx0XHRpZihtZnAuY29udGVudClcblx0XHRcdFx0XHRcdG1mcC5jb250ZW50LnJlbW92ZUNsYXNzKCdtZnAtbG9hZGluZycpO1xuXG5cdFx0XHRcdFx0aXRlbS5pbWdIaWRkZW4gPSBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uIHRoYXQgbG9vcHMgdW50aWwgdGhlIGltYWdlIGhhcyBzaXplIHRvIGRpc3BsYXkgZWxlbWVudHMgdGhhdCByZWx5IG9uIGl0IGFzYXBcblx0XHQgKi9cblx0XHRmaW5kSW1hZ2VTaXplOiBmdW5jdGlvbihpdGVtKSB7XG5cblx0XHRcdHZhciBjb3VudGVyID0gMCxcblx0XHRcdFx0aW1nID0gaXRlbS5pbWdbMF0sXG5cdFx0XHRcdG1mcFNldEludGVydmFsID0gZnVuY3Rpb24oZGVsYXkpIHtcblxuXHRcdFx0XHRcdGlmKF9pbWdJbnRlcnZhbCkge1xuXHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChfaW1nSW50ZXJ2YWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBkZWNlbGVyYXRpbmcgaW50ZXJ2YWwgdGhhdCBjaGVja3MgZm9yIHNpemUgb2YgYW4gaW1hZ2Vcblx0XHRcdFx0XHRfaW1nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmKGltZy5uYXR1cmFsV2lkdGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdG1mcC5fb25JbWFnZUhhc1NpemUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYoY291bnRlciA+IDIwMCkge1xuXHRcdFx0XHRcdFx0XHRjbGVhckludGVydmFsKF9pbWdJbnRlcnZhbCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvdW50ZXIrKztcblx0XHRcdFx0XHRcdGlmKGNvdW50ZXIgPT09IDMpIHtcblx0XHRcdFx0XHRcdFx0bWZwU2V0SW50ZXJ2YWwoMTApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmKGNvdW50ZXIgPT09IDQwKSB7XG5cdFx0XHRcdFx0XHRcdG1mcFNldEludGVydmFsKDUwKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZihjb3VudGVyID09PSAxMDApIHtcblx0XHRcdFx0XHRcdFx0bWZwU2V0SW50ZXJ2YWwoNTAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCBkZWxheSk7XG5cdFx0XHRcdH07XG5cblx0XHRcdG1mcFNldEludGVydmFsKDEpO1xuXHRcdH0sXG5cblx0XHRnZXRJbWFnZTogZnVuY3Rpb24oaXRlbSwgdGVtcGxhdGUpIHtcblxuXHRcdFx0dmFyIGd1YXJkID0gMCxcblxuXHRcdFx0XHQvLyBpbWFnZSBsb2FkIGNvbXBsZXRlIGhhbmRsZXJcblx0XHRcdFx0b25Mb2FkQ29tcGxldGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbS5pbWdbMF0uY29tcGxldGUpIHtcblx0XHRcdFx0XHRcdFx0aXRlbS5pbWcub2ZmKCcubWZwbG9hZGVyJyk7XG5cblx0XHRcdFx0XHRcdFx0aWYoaXRlbSA9PT0gbWZwLmN1cnJJdGVtKXtcblx0XHRcdFx0XHRcdFx0XHRtZnAuX29uSW1hZ2VIYXNTaXplKGl0ZW0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygncmVhZHknKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGl0ZW0uaGFzU2l6ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGl0ZW0ubG9hZGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdFx0XHRfbWZwVHJpZ2dlcignSW1hZ2VMb2FkQ29tcGxldGUnKTtcblxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIGlmIGltYWdlIGNvbXBsZXRlIGNoZWNrIGZhaWxzIDIwMCB0aW1lcyAoMjAgc2VjKSwgd2UgYXNzdW1lIHRoYXQgdGhlcmUgd2FzIGFuIGVycm9yLlxuXHRcdFx0XHRcdFx0XHRndWFyZCsrO1xuXHRcdFx0XHRcdFx0XHRpZihndWFyZCA8IDIwMCkge1xuXHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQob25Mb2FkQ29tcGxldGUsMTAwKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRvbkxvYWRFcnJvcigpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIGltYWdlIGVycm9yIGhhbmRsZXJcblx0XHRcdFx0b25Mb2FkRXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtLmltZy5vZmYoJy5tZnBsb2FkZXInKTtcblx0XHRcdFx0XHRcdGlmKGl0ZW0gPT09IG1mcC5jdXJySXRlbSl7XG5cdFx0XHRcdFx0XHRcdG1mcC5fb25JbWFnZUhhc1NpemUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdG1mcC51cGRhdGVTdGF0dXMoJ2Vycm9yJywgaW1nU3QudEVycm9yLnJlcGxhY2UoJyV1cmwlJywgaXRlbS5zcmMpICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGl0ZW0uaGFzU2l6ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRpdGVtLmxvYWRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRpdGVtLmxvYWRFcnJvciA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbWdTdCA9IG1mcC5zdC5pbWFnZTtcblxuXG5cdFx0XHR2YXIgZWwgPSB0ZW1wbGF0ZS5maW5kKCcubWZwLWltZycpO1xuXHRcdFx0aWYoZWwubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRcdFx0aW1nLmNsYXNzTmFtZSA9ICdtZnAtaW1nJztcblx0XHRcdFx0aWYoaXRlbS5lbCAmJiBpdGVtLmVsLmZpbmQoJ2ltZycpLmxlbmd0aCkge1xuXHRcdFx0XHRcdGltZy5hbHQgPSBpdGVtLmVsLmZpbmQoJ2ltZycpLmF0dHIoJ2FsdCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW0uaW1nID0gJChpbWcpLm9uKCdsb2FkLm1mcGxvYWRlcicsIG9uTG9hZENvbXBsZXRlKS5vbignZXJyb3IubWZwbG9hZGVyJywgb25Mb2FkRXJyb3IpO1xuXHRcdFx0XHRpbWcuc3JjID0gaXRlbS5zcmM7XG5cblx0XHRcdFx0Ly8gd2l0aG91dCBjbG9uZSgpIFwiZXJyb3JcIiBldmVudCBpcyBub3QgZmlyaW5nIHdoZW4gSU1HIGlzIHJlcGxhY2VkIGJ5IG5ldyBJTUdcblx0XHRcdFx0Ly8gVE9ETzogZmluZCBhIHdheSB0byBhdm9pZCBzdWNoIGNsb25pbmdcblx0XHRcdFx0aWYoZWwuaXMoJ2ltZycpKSB7XG5cdFx0XHRcdFx0aXRlbS5pbWcgPSBpdGVtLmltZy5jbG9uZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aW1nID0gaXRlbS5pbWdbMF07XG5cdFx0XHRcdGlmKGltZy5uYXR1cmFsV2lkdGggPiAwKSB7XG5cdFx0XHRcdFx0aXRlbS5oYXNTaXplID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIGlmKCFpbWcud2lkdGgpIHtcblx0XHRcdFx0XHRpdGVtLmhhc1NpemUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRtZnAuX3BhcnNlTWFya3VwKHRlbXBsYXRlLCB7XG5cdFx0XHRcdHRpdGxlOiBfZ2V0VGl0bGUoaXRlbSksXG5cdFx0XHRcdGltZ19yZXBsYWNlV2l0aDogaXRlbS5pbWdcblx0XHRcdH0sIGl0ZW0pO1xuXG5cdFx0XHRtZnAucmVzaXplSW1hZ2UoKTtcblxuXHRcdFx0aWYoaXRlbS5oYXNTaXplKSB7XG5cdFx0XHRcdGlmKF9pbWdJbnRlcnZhbCkgY2xlYXJJbnRlcnZhbChfaW1nSW50ZXJ2YWwpO1xuXG5cdFx0XHRcdGlmKGl0ZW0ubG9hZEVycm9yKSB7XG5cdFx0XHRcdFx0dGVtcGxhdGUuYWRkQ2xhc3MoJ21mcC1sb2FkaW5nJyk7XG5cdFx0XHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygnZXJyb3InLCBpbWdTdC50RXJyb3IucmVwbGFjZSgnJXVybCUnLCBpdGVtLnNyYykgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0ZW1wbGF0ZS5yZW1vdmVDbGFzcygnbWZwLWxvYWRpbmcnKTtcblx0XHRcdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0ZW1wbGF0ZTtcblx0XHRcdH1cblxuXHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygnbG9hZGluZycpO1xuXHRcdFx0aXRlbS5sb2FkaW5nID0gdHJ1ZTtcblxuXHRcdFx0aWYoIWl0ZW0uaGFzU2l6ZSkge1xuXHRcdFx0XHRpdGVtLmltZ0hpZGRlbiA9IHRydWU7XG5cdFx0XHRcdHRlbXBsYXRlLmFkZENsYXNzKCdtZnAtbG9hZGluZycpO1xuXHRcdFx0XHRtZnAuZmluZEltYWdlU2l6ZShpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlO1xuXHRcdH1cblx0fVxufSk7XG5cbi8qPj5pbWFnZSovXG5cbi8qPj56b29tKi9cbnZhciBoYXNNb3pUcmFuc2Zvcm0sXG5cdGdldEhhc01velRyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKGhhc01velRyYW5zZm9ybSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRoYXNNb3pUcmFuc2Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykuc3R5bGUuTW96VHJhbnNmb3JtICE9PSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBoYXNNb3pUcmFuc2Zvcm07XG5cdH07XG5cbiQubWFnbmlmaWNQb3B1cC5yZWdpc3Rlck1vZHVsZSgnem9vbScsIHtcblxuXHRvcHRpb25zOiB7XG5cdFx0ZW5hYmxlZDogZmFsc2UsXG5cdFx0ZWFzaW5nOiAnZWFzZS1pbi1vdXQnLFxuXHRcdGR1cmF0aW9uOiAzMDAsXG5cdFx0b3BlbmVyOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gZWxlbWVudC5pcygnaW1nJykgPyBlbGVtZW50IDogZWxlbWVudC5maW5kKCdpbWcnKTtcblx0XHR9XG5cdH0sXG5cblx0cHJvdG86IHtcblxuXHRcdGluaXRab29tOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB6b29tU3QgPSBtZnAuc3Quem9vbSxcblx0XHRcdFx0bnMgPSAnLnpvb20nLFxuXHRcdFx0XHRpbWFnZTtcblxuXHRcdFx0aWYoIXpvb21TdC5lbmFibGVkIHx8ICFtZnAuc3VwcG9ydHNUcmFuc2l0aW9uKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGR1cmF0aW9uID0gem9vbVN0LmR1cmF0aW9uLFxuXHRcdFx0XHRnZXRFbFRvQW5pbWF0ZSA9IGZ1bmN0aW9uKGltYWdlKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0ltZyA9IGltYWdlLmNsb25lKCkucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVBdHRyKCdjbGFzcycpLmFkZENsYXNzKCdtZnAtYW5pbWF0ZWQtaW1hZ2UnKSxcblx0XHRcdFx0XHRcdHRyYW5zaXRpb24gPSAnYWxsICcrKHpvb21TdC5kdXJhdGlvbi8xMDAwKSsncyAnICsgem9vbVN0LmVhc2luZyxcblx0XHRcdFx0XHRcdGNzc09iaiA9IHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0XHRcdFx0XHRcdHpJbmRleDogOTk5OSxcblx0XHRcdFx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRcdFx0XHQnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5JzogJ2hpZGRlbidcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR0ID0gJ3RyYW5zaXRpb24nO1xuXG5cdFx0XHRcdFx0Y3NzT2JqWyctd2Via2l0LScrdF0gPSBjc3NPYmpbJy1tb3otJyt0XSA9IGNzc09ialsnLW8tJyt0XSA9IGNzc09ialt0XSA9IHRyYW5zaXRpb247XG5cblx0XHRcdFx0XHRuZXdJbWcuY3NzKGNzc09iaik7XG5cdFx0XHRcdFx0cmV0dXJuIG5ld0ltZztcblx0XHRcdFx0fSxcblx0XHRcdFx0c2hvd01haW5Db250ZW50ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0bWZwLmNvbnRlbnQuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0b3BlblRpbWVvdXQsXG5cdFx0XHRcdGFuaW1hdGVkSW1nO1xuXG5cdFx0XHRfbWZwT24oJ0J1aWxkQ29udHJvbHMnK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLl9hbGxvd1pvb20oKSkge1xuXG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG9wZW5UaW1lb3V0KTtcblx0XHRcdFx0XHRtZnAuY29udGVudC5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0XHQvLyBCYXNpY2FsbHksIGFsbCBjb2RlIGJlbG93IGRvZXMgaXMgY2xvbmVzIGV4aXN0aW5nIGltYWdlLCBwdXRzIGluIG9uIHRvcCBvZiB0aGUgY3VycmVudCBvbmUgYW5kIGFuaW1hdGVkIGl0XG5cblx0XHRcdFx0XHRpbWFnZSA9IG1mcC5fZ2V0SXRlbVRvWm9vbSgpO1xuXG5cdFx0XHRcdFx0aWYoIWltYWdlKSB7XG5cdFx0XHRcdFx0XHRzaG93TWFpbkNvbnRlbnQoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhbmltYXRlZEltZyA9IGdldEVsVG9BbmltYXRlKGltYWdlKTtcblxuXHRcdFx0XHRcdGFuaW1hdGVkSW1nLmNzcyggbWZwLl9nZXRPZmZzZXQoKSApO1xuXG5cdFx0XHRcdFx0bWZwLndyYXAuYXBwZW5kKGFuaW1hdGVkSW1nKTtcblxuXHRcdFx0XHRcdG9wZW5UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGFuaW1hdGVkSW1nLmNzcyggbWZwLl9nZXRPZmZzZXQoIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0b3BlblRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHNob3dNYWluQ29udGVudCgpO1xuXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0YW5pbWF0ZWRJbWcucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdFx0aW1hZ2UgPSBhbmltYXRlZEltZyA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdFx0X21mcFRyaWdnZXIoJ1pvb21BbmltYXRpb25FbmRlZCcpO1xuXHRcdFx0XHRcdFx0XHR9LCAxNik7IC8vIGF2b2lkIGJsaW5rIHdoZW4gc3dpdGNoaW5nIGltYWdlc1xuXG5cdFx0XHRcdFx0XHR9LCBkdXJhdGlvbik7IC8vIHRoaXMgdGltZW91dCBlcXVhbHMgYW5pbWF0aW9uIGR1cmF0aW9uXG5cblx0XHRcdFx0XHR9LCAxNik7IC8vIGJ5IGFkZGluZyB0aGlzIHRpbWVvdXQgd2UgYXZvaWQgc2hvcnQgZ2xpdGNoIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW5pbWF0aW9uXG5cblxuXHRcdFx0XHRcdC8vIExvdHMgb2YgdGltZW91dHMuLi5cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRfbWZwT24oQkVGT1JFX0NMT1NFX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLl9hbGxvd1pvb20oKSkge1xuXG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG9wZW5UaW1lb3V0KTtcblxuXHRcdFx0XHRcdG1mcC5zdC5yZW1vdmFsRGVsYXkgPSBkdXJhdGlvbjtcblxuXHRcdFx0XHRcdGlmKCFpbWFnZSkge1xuXHRcdFx0XHRcdFx0aW1hZ2UgPSBtZnAuX2dldEl0ZW1Ub1pvb20oKTtcblx0XHRcdFx0XHRcdGlmKCFpbWFnZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhbmltYXRlZEltZyA9IGdldEVsVG9BbmltYXRlKGltYWdlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhbmltYXRlZEltZy5jc3MoIG1mcC5fZ2V0T2Zmc2V0KHRydWUpICk7XG5cdFx0XHRcdFx0bWZwLndyYXAuYXBwZW5kKGFuaW1hdGVkSW1nKTtcblx0XHRcdFx0XHRtZnAuY29udGVudC5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0YW5pbWF0ZWRJbWcuY3NzKCBtZnAuX2dldE9mZnNldCgpICk7XG5cdFx0XHRcdFx0fSwgMTYpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oQ0xPU0VfRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZihtZnAuX2FsbG93Wm9vbSgpKSB7XG5cdFx0XHRcdFx0c2hvd01haW5Db250ZW50KCk7XG5cdFx0XHRcdFx0aWYoYW5pbWF0ZWRJbWcpIHtcblx0XHRcdFx0XHRcdGFuaW1hdGVkSW1nLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpbWFnZSA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRfYWxsb3dab29tOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBtZnAuY3Vyckl0ZW0udHlwZSA9PT0gJ2ltYWdlJztcblx0XHR9LFxuXG5cdFx0X2dldEl0ZW1Ub1pvb206IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYobWZwLmN1cnJJdGVtLmhhc1NpemUpIHtcblx0XHRcdFx0cmV0dXJuIG1mcC5jdXJySXRlbS5pbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIEdldCBlbGVtZW50IHBvc3Rpb24gcmVsYXRpdmUgdG8gdmlld3BvcnRcblx0XHRfZ2V0T2Zmc2V0OiBmdW5jdGlvbihpc0xhcmdlKSB7XG5cdFx0XHR2YXIgZWw7XG5cdFx0XHRpZihpc0xhcmdlKSB7XG5cdFx0XHRcdGVsID0gbWZwLmN1cnJJdGVtLmltZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsID0gbWZwLnN0Lnpvb20ub3BlbmVyKG1mcC5jdXJySXRlbS5lbCB8fCBtZnAuY3Vyckl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb2Zmc2V0ID0gZWwub2Zmc2V0KCk7XG5cdFx0XHR2YXIgcGFkZGluZ1RvcCA9IHBhcnNlSW50KGVsLmNzcygncGFkZGluZy10b3AnKSwxMCk7XG5cdFx0XHR2YXIgcGFkZGluZ0JvdHRvbSA9IHBhcnNlSW50KGVsLmNzcygncGFkZGluZy1ib3R0b20nKSwxMCk7XG5cdFx0XHRvZmZzZXQudG9wIC09ICggJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gcGFkZGluZ1RvcCApO1xuXG5cblx0XHRcdC8qXG5cblx0XHRcdEFuaW1hdGluZyBsZWZ0ICsgdG9wICsgd2lkdGgvaGVpZ2h0IGxvb2tzIGdsaXRjaHkgaW4gRmlyZWZveCwgYnV0IHBlcmZlY3QgaW4gQ2hyb21lLiBBbmQgdmljZS12ZXJzYS5cblxuXHRcdFx0ICovXG5cdFx0XHR2YXIgb2JqID0ge1xuXHRcdFx0XHR3aWR0aDogZWwud2lkdGgoKSxcblx0XHRcdFx0Ly8gZml4IFplcHRvIGhlaWdodCtwYWRkaW5nIGlzc3VlXG5cdFx0XHRcdGhlaWdodDogKF9pc0pRID8gZWwuaW5uZXJIZWlnaHQoKSA6IGVsWzBdLm9mZnNldEhlaWdodCkgLSBwYWRkaW5nQm90dG9tIC0gcGFkZGluZ1RvcFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gSSBoYXRlIHRvIGRvIHRoaXMsIGJ1dCB0aGVyZSBpcyBubyBhbm90aGVyIG9wdGlvblxuXHRcdFx0aWYoIGdldEhhc01velRyYW5zZm9ybSgpICkge1xuXHRcdFx0XHRvYmpbJy1tb3otdHJhbnNmb3JtJ10gPSBvYmpbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZSgnICsgb2Zmc2V0LmxlZnQgKyAncHgsJyArIG9mZnNldC50b3AgKyAncHgpJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9iai5sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdG9iai50b3AgPSBvZmZzZXQudG9wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XG5cblx0fVxufSk7XG5cblxuXG4vKj4+em9vbSovXG5cbi8qPj5pZnJhbWUqL1xuXG52YXIgSUZSQU1FX05TID0gJ2lmcmFtZScsXG5cdF9lbXB0eVBhZ2UgPSAnLy9hYm91dDpibGFuaycsXG5cblx0X2ZpeElmcmFtZUJ1Z3MgPSBmdW5jdGlvbihpc1Nob3dpbmcpIHtcblx0XHRpZihtZnAuY3VyclRlbXBsYXRlW0lGUkFNRV9OU10pIHtcblx0XHRcdHZhciBlbCA9IG1mcC5jdXJyVGVtcGxhdGVbSUZSQU1FX05TXS5maW5kKCdpZnJhbWUnKTtcblx0XHRcdGlmKGVsLmxlbmd0aCkge1xuXHRcdFx0XHQvLyByZXNldCBzcmMgYWZ0ZXIgdGhlIHBvcHVwIGlzIGNsb3NlZCB0byBhdm9pZCBcInZpZGVvIGtlZXBzIHBsYXlpbmcgYWZ0ZXIgcG9wdXAgaXMgY2xvc2VkXCIgYnVnXG5cdFx0XHRcdGlmKCFpc1Nob3dpbmcpIHtcblx0XHRcdFx0XHRlbFswXS5zcmMgPSBfZW1wdHlQYWdlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSUU4IGJsYWNrIHNjcmVlbiBidWcgZml4XG5cdFx0XHRcdGlmKG1mcC5pc0lFOCkge1xuXHRcdFx0XHRcdGVsLmNzcygnZGlzcGxheScsIGlzU2hvd2luZyA/ICdibG9jaycgOiAnbm9uZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoSUZSQU1FX05TLCB7XG5cblx0b3B0aW9uczoge1xuXHRcdG1hcmt1cDogJzxkaXYgY2xhc3M9XCJtZnAtaWZyYW1lLXNjYWxlclwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJtZnAtY2xvc2VcIj48L2Rpdj4nK1xuXHRcdFx0XHRcdCc8aWZyYW1lIGNsYXNzPVwibWZwLWlmcmFtZVwiIHNyYz1cIi8vYWJvdXQ6YmxhbmtcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+Jytcblx0XHRcdFx0JzwvZGl2PicsXG5cblx0XHRzcmNBY3Rpb246ICdpZnJhbWVfc3JjJyxcblxuXHRcdC8vIHdlIGRvbid0IGNhcmUgYW5kIHN1cHBvcnQgb25seSBvbmUgZGVmYXVsdCB0eXBlIG9mIFVSTCBieSBkZWZhdWx0XG5cdFx0cGF0dGVybnM6IHtcblx0XHRcdHlvdXR1YmU6IHtcblx0XHRcdFx0aW5kZXg6ICd5b3V0dWJlLmNvbScsXG5cdFx0XHRcdGlkOiAndj0nLFxuXHRcdFx0XHRzcmM6ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8laWQlP2F1dG9wbGF5PTEnXG5cdFx0XHR9LFxuXHRcdFx0dmltZW86IHtcblx0XHRcdFx0aW5kZXg6ICd2aW1lby5jb20vJyxcblx0XHRcdFx0aWQ6ICcvJyxcblx0XHRcdFx0c3JjOiAnLy9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLyVpZCU/YXV0b3BsYXk9MSdcblx0XHRcdH0sXG5cdFx0XHRnbWFwczoge1xuXHRcdFx0XHRpbmRleDogJy8vbWFwcy5nb29nbGUuJyxcblx0XHRcdFx0c3JjOiAnJWlkJSZvdXRwdXQ9ZW1iZWQnXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHByb3RvOiB7XG5cdFx0aW5pdElmcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAudHlwZXMucHVzaChJRlJBTUVfTlMpO1xuXG5cdFx0XHRfbWZwT24oJ0JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKGUsIHByZXZUeXBlLCBuZXdUeXBlKSB7XG5cdFx0XHRcdGlmKHByZXZUeXBlICE9PSBuZXdUeXBlKSB7XG5cdFx0XHRcdFx0aWYocHJldlR5cGUgPT09IElGUkFNRV9OUykge1xuXHRcdFx0XHRcdFx0X2ZpeElmcmFtZUJ1Z3MoKTsgLy8gaWZyYW1lIGlmIHJlbW92ZWRcblx0XHRcdFx0XHR9IGVsc2UgaWYobmV3VHlwZSA9PT0gSUZSQU1FX05TKSB7XG5cdFx0XHRcdFx0XHRfZml4SWZyYW1lQnVncyh0cnVlKTsgLy8gaWZyYW1lIGlzIHNob3dpbmdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0vLyBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZnJhbWUgc291cmNlIGlzIHN3aXRjaGVkLCBkb24ndCBkbyBhbnl0aGluZ1xuXHRcdFx0XHQvL31cblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oQ0xPU0VfRVZFTlQgKyAnLicgKyBJRlJBTUVfTlMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfZml4SWZyYW1lQnVncygpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdGdldElmcmFtZTogZnVuY3Rpb24oaXRlbSwgdGVtcGxhdGUpIHtcblx0XHRcdHZhciBlbWJlZFNyYyA9IGl0ZW0uc3JjO1xuXHRcdFx0dmFyIGlmcmFtZVN0ID0gbWZwLnN0LmlmcmFtZTtcblxuXHRcdFx0JC5lYWNoKGlmcmFtZVN0LnBhdHRlcm5zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYoZW1iZWRTcmMuaW5kZXhPZiggdGhpcy5pbmRleCApID4gLTEpIHtcblx0XHRcdFx0XHRpZih0aGlzLmlkKSB7XG5cdFx0XHRcdFx0XHRpZih0eXBlb2YgdGhpcy5pZCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdFx0ZW1iZWRTcmMgPSBlbWJlZFNyYy5zdWJzdHIoZW1iZWRTcmMubGFzdEluZGV4T2YodGhpcy5pZCkrdGhpcy5pZC5sZW5ndGgsIGVtYmVkU3JjLmxlbmd0aCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbWJlZFNyYyA9IHRoaXMuaWQuY2FsbCggdGhpcywgZW1iZWRTcmMgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZW1iZWRTcmMgPSB0aGlzLnNyYy5yZXBsYWNlKCclaWQlJywgZW1iZWRTcmMgKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7IC8vIGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIGRhdGFPYmogPSB7fTtcblx0XHRcdGlmKGlmcmFtZVN0LnNyY0FjdGlvbikge1xuXHRcdFx0XHRkYXRhT2JqW2lmcmFtZVN0LnNyY0FjdGlvbl0gPSBlbWJlZFNyYztcblx0XHRcdH1cblx0XHRcdG1mcC5fcGFyc2VNYXJrdXAodGVtcGxhdGUsIGRhdGFPYmosIGl0ZW0pO1xuXG5cdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXG5cdFx0XHRyZXR1cm4gdGVtcGxhdGU7XG5cdFx0fVxuXHR9XG59KTtcblxuXG5cbi8qPj5pZnJhbWUqL1xuXG4vKj4+Z2FsbGVyeSovXG4vKipcbiAqIEdldCBsb29wZWQgaW5kZXggZGVwZW5kaW5nIG9uIG51bWJlciBvZiBzbGlkZXNcbiAqL1xudmFyIF9nZXRMb29wZWRJZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0dmFyIG51bVNsaWRlcyA9IG1mcC5pdGVtcy5sZW5ndGg7XG5cdFx0aWYoaW5kZXggPiBudW1TbGlkZXMgLSAxKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXggLSBudW1TbGlkZXM7XG5cdFx0fSBlbHNlICBpZihpbmRleCA8IDApIHtcblx0XHRcdHJldHVybiBudW1TbGlkZXMgKyBpbmRleDtcblx0XHR9XG5cdFx0cmV0dXJuIGluZGV4O1xuXHR9LFxuXHRfcmVwbGFjZUN1cnJUb3RhbCA9IGZ1bmN0aW9uKHRleHQsIGN1cnIsIHRvdGFsKSB7XG5cdFx0cmV0dXJuIHRleHQucmVwbGFjZSgvJWN1cnIlL2dpLCBjdXJyICsgMSkucmVwbGFjZSgvJXRvdGFsJS9naSwgdG90YWwpO1xuXHR9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoJ2dhbGxlcnknLCB7XG5cblx0b3B0aW9uczoge1xuXHRcdGVuYWJsZWQ6IGZhbHNlLFxuXHRcdGFycm93TWFya3VwOiAnPGJ1dHRvbiB0aXRsZT1cIiV0aXRsZSVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZnAtYXJyb3cgbWZwLWFycm93LSVkaXIlXCI+PC9idXR0b24+Jyxcblx0XHRwcmVsb2FkOiBbMCwyXSxcblx0XHRuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXG5cdFx0YXJyb3dzOiB0cnVlLFxuXG5cdFx0dFByZXY6ICdQcmV2aW91cyAoTGVmdCBhcnJvdyBrZXkpJyxcblx0XHR0TmV4dDogJ05leHQgKFJpZ2h0IGFycm93IGtleSknLFxuXHRcdHRDb3VudGVyOiAnJWN1cnIlIG9mICV0b3RhbCUnXG5cdH0sXG5cblx0cHJvdG86IHtcblx0XHRpbml0R2FsbGVyeTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdHZhciBnU3QgPSBtZnAuc3QuZ2FsbGVyeSxcblx0XHRcdFx0bnMgPSAnLm1mcC1nYWxsZXJ5JztcblxuXHRcdFx0bWZwLmRpcmVjdGlvbiA9IHRydWU7IC8vIHRydWUgLSBuZXh0LCBmYWxzZSAtIHByZXZcblxuXHRcdFx0aWYoIWdTdCB8fCAhZ1N0LmVuYWJsZWQgKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdF93cmFwQ2xhc3NlcyArPSAnIG1mcC1nYWxsZXJ5JztcblxuXHRcdFx0X21mcE9uKE9QRU5fRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGlmKGdTdC5uYXZpZ2F0ZUJ5SW1nQ2xpY2spIHtcblx0XHRcdFx0XHRtZnAud3JhcC5vbignY2xpY2snK25zLCAnLm1mcC1pbWcnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmKG1mcC5pdGVtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0XHRcdG1mcC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9kb2N1bWVudC5vbigna2V5ZG93bicrbnMsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRpZiAoZS5rZXlDb2RlID09PSAzNykge1xuXHRcdFx0XHRcdFx0bWZwLnByZXYoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcblx0XHRcdFx0XHRcdG1mcC5uZXh0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oJ1VwZGF0ZVN0YXR1cycrbnMsIGZ1bmN0aW9uKGUsIGRhdGEpIHtcblx0XHRcdFx0aWYoZGF0YS50ZXh0KSB7XG5cdFx0XHRcdFx0ZGF0YS50ZXh0ID0gX3JlcGxhY2VDdXJyVG90YWwoZGF0YS50ZXh0LCBtZnAuY3Vyckl0ZW0uaW5kZXgsIG1mcC5pdGVtcy5sZW5ndGgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0X21mcE9uKE1BUktVUF9QQVJTRV9FVkVOVCtucywgZnVuY3Rpb24oZSwgZWxlbWVudCwgdmFsdWVzLCBpdGVtKSB7XG5cdFx0XHRcdHZhciBsID0gbWZwLml0ZW1zLmxlbmd0aDtcblx0XHRcdFx0dmFsdWVzLmNvdW50ZXIgPSBsID4gMSA/IF9yZXBsYWNlQ3VyclRvdGFsKGdTdC50Q291bnRlciwgaXRlbS5pbmRleCwgbCkgOiAnJztcblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oJ0J1aWxkQ29udHJvbHMnICsgbnMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZihtZnAuaXRlbXMubGVuZ3RoID4gMSAmJiBnU3QuYXJyb3dzICYmICFtZnAuYXJyb3dMZWZ0KSB7XG5cdFx0XHRcdFx0dmFyIG1hcmt1cCA9IGdTdC5hcnJvd01hcmt1cCxcblx0XHRcdFx0XHRcdGFycm93TGVmdCA9IG1mcC5hcnJvd0xlZnQgPSAkKCBtYXJrdXAucmVwbGFjZSgvJXRpdGxlJS9naSwgZ1N0LnRQcmV2KS5yZXBsYWNlKC8lZGlyJS9naSwgJ2xlZnQnKSApLmFkZENsYXNzKFBSRVZFTlRfQ0xPU0VfQ0xBU1MpLFxuXHRcdFx0XHRcdFx0YXJyb3dSaWdodCA9IG1mcC5hcnJvd1JpZ2h0ID0gJCggbWFya3VwLnJlcGxhY2UoLyV0aXRsZSUvZ2ksIGdTdC50TmV4dCkucmVwbGFjZSgvJWRpciUvZ2ksICdyaWdodCcpICkuYWRkQ2xhc3MoUFJFVkVOVF9DTE9TRV9DTEFTUyk7XG5cblx0XHRcdFx0XHRhcnJvd0xlZnQuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRtZnAucHJldigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGFycm93UmlnaHQuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRtZnAubmV4dCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0bWZwLmNvbnRhaW5lci5hcHBlbmQoYXJyb3dMZWZ0LmFkZChhcnJvd1JpZ2h0KSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oQ0hBTkdFX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLl9wcmVsb2FkVGltZW91dCkgY2xlYXJUaW1lb3V0KG1mcC5fcHJlbG9hZFRpbWVvdXQpO1xuXG5cdFx0XHRcdG1mcC5fcHJlbG9hZFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdG1mcC5wcmVsb2FkTmVhcmJ5SW1hZ2VzKCk7XG5cdFx0XHRcdFx0bWZwLl9wcmVsb2FkVGltZW91dCA9IG51bGw7XG5cdFx0XHRcdH0sIDE2KTtcblx0XHRcdH0pO1xuXG5cblx0XHRcdF9tZnBPbihDTE9TRV9FVkVOVCtucywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdF9kb2N1bWVudC5vZmYobnMpO1xuXHRcdFx0XHRtZnAud3JhcC5vZmYoJ2NsaWNrJytucyk7XG5cdFx0XHRcdG1mcC5hcnJvd1JpZ2h0ID0gbWZwLmFycm93TGVmdCA9IG51bGw7XG5cdFx0XHR9KTtcblxuXHRcdH0sXG5cdFx0bmV4dDogZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAuZGlyZWN0aW9uID0gdHJ1ZTtcblx0XHRcdG1mcC5pbmRleCA9IF9nZXRMb29wZWRJZChtZnAuaW5kZXggKyAxKTtcblx0XHRcdG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuXHRcdH0sXG5cdFx0cHJldjogZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAuZGlyZWN0aW9uID0gZmFsc2U7XG5cdFx0XHRtZnAuaW5kZXggPSBfZ2V0TG9vcGVkSWQobWZwLmluZGV4IC0gMSk7XG5cdFx0XHRtZnAudXBkYXRlSXRlbUhUTUwoKTtcblx0XHR9LFxuXHRcdGdvVG86IGZ1bmN0aW9uKG5ld0luZGV4KSB7XG5cdFx0XHRtZnAuZGlyZWN0aW9uID0gKG5ld0luZGV4ID49IG1mcC5pbmRleCk7XG5cdFx0XHRtZnAuaW5kZXggPSBuZXdJbmRleDtcblx0XHRcdG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuXHRcdH0sXG5cdFx0cHJlbG9hZE5lYXJieUltYWdlczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcCA9IG1mcC5zdC5nYWxsZXJ5LnByZWxvYWQsXG5cdFx0XHRcdHByZWxvYWRCZWZvcmUgPSBNYXRoLm1pbihwWzBdLCBtZnAuaXRlbXMubGVuZ3RoKSxcblx0XHRcdFx0cHJlbG9hZEFmdGVyID0gTWF0aC5taW4ocFsxXSwgbWZwLml0ZW1zLmxlbmd0aCksXG5cdFx0XHRcdGk7XG5cblx0XHRcdGZvcihpID0gMTsgaSA8PSAobWZwLmRpcmVjdGlvbiA/IHByZWxvYWRBZnRlciA6IHByZWxvYWRCZWZvcmUpOyBpKyspIHtcblx0XHRcdFx0bWZwLl9wcmVsb2FkSXRlbShtZnAuaW5kZXgraSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IoaSA9IDE7IGkgPD0gKG1mcC5kaXJlY3Rpb24gPyBwcmVsb2FkQmVmb3JlIDogcHJlbG9hZEFmdGVyKTsgaSsrKSB7XG5cdFx0XHRcdG1mcC5fcHJlbG9hZEl0ZW0obWZwLmluZGV4LWkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0X3ByZWxvYWRJdGVtOiBmdW5jdGlvbihpbmRleCkge1xuXHRcdFx0aW5kZXggPSBfZ2V0TG9vcGVkSWQoaW5kZXgpO1xuXG5cdFx0XHRpZihtZnAuaXRlbXNbaW5kZXhdLnByZWxvYWRlZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpdGVtID0gbWZwLml0ZW1zW2luZGV4XTtcblx0XHRcdGlmKCFpdGVtLnBhcnNlZCkge1xuXHRcdFx0XHRpdGVtID0gbWZwLnBhcnNlRWwoIGluZGV4ICk7XG5cdFx0XHR9XG5cblx0XHRcdF9tZnBUcmlnZ2VyKCdMYXp5TG9hZCcsIGl0ZW0pO1xuXG5cdFx0XHRpZihpdGVtLnR5cGUgPT09ICdpbWFnZScpIHtcblx0XHRcdFx0aXRlbS5pbWcgPSAkKCc8aW1nIGNsYXNzPVwibWZwLWltZ1wiIC8+Jykub24oJ2xvYWQubWZwbG9hZGVyJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aXRlbS5oYXNTaXplID0gdHJ1ZTtcblx0XHRcdFx0fSkub24oJ2Vycm9yLm1mcGxvYWRlcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGl0ZW0uaGFzU2l6ZSA9IHRydWU7XG5cdFx0XHRcdFx0aXRlbS5sb2FkRXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRcdF9tZnBUcmlnZ2VyKCdMYXp5TG9hZEVycm9yJywgaXRlbSk7XG5cdFx0XHRcdH0pLmF0dHIoJ3NyYycsIGl0ZW0uc3JjKTtcblx0XHRcdH1cblxuXG5cdFx0XHRpdGVtLnByZWxvYWRlZCA9IHRydWU7XG5cdFx0fVxuXHR9XG59KTtcblxuLyo+PmdhbGxlcnkqL1xuXG4vKj4+cmV0aW5hKi9cblxudmFyIFJFVElOQV9OUyA9ICdyZXRpbmEnO1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoUkVUSU5BX05TLCB7XG5cdG9wdGlvbnM6IHtcblx0XHRyZXBsYWNlU3JjOiBmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRyZXR1cm4gaXRlbS5zcmMucmVwbGFjZSgvXFwuXFx3KyQvLCBmdW5jdGlvbihtKSB7IHJldHVybiAnQDJ4JyArIG07IH0pO1xuXHRcdH0sXG5cdFx0cmF0aW86IDEgLy8gRnVuY3Rpb24gb3IgbnVtYmVyLiAgU2V0IHRvIDEgdG8gZGlzYWJsZS5cblx0fSxcblx0cHJvdG86IHtcblx0XHRpbml0UmV0aW5hOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuXG5cdFx0XHRcdHZhciBzdCA9IG1mcC5zdC5yZXRpbmEsXG5cdFx0XHRcdFx0cmF0aW8gPSBzdC5yYXRpbztcblxuXHRcdFx0XHRyYXRpbyA9ICFpc05hTihyYXRpbykgPyByYXRpbyA6IHJhdGlvKCk7XG5cblx0XHRcdFx0aWYocmF0aW8gPiAxKSB7XG5cdFx0XHRcdFx0X21mcE9uKCdJbWFnZUhhc1NpemUnICsgJy4nICsgUkVUSU5BX05TLCBmdW5jdGlvbihlLCBpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtLmltZy5jc3Moe1xuXHRcdFx0XHRcdFx0XHQnbWF4LXdpZHRoJzogaXRlbS5pbWdbMF0ubmF0dXJhbFdpZHRoIC8gcmF0aW8sXG5cdFx0XHRcdFx0XHRcdCd3aWR0aCc6ICcxMDAlJ1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0X21mcE9uKCdFbGVtZW50UGFyc2UnICsgJy4nICsgUkVUSU5BX05TLCBmdW5jdGlvbihlLCBpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtLnNyYyA9IHN0LnJlcGxhY2VTcmMoaXRlbSwgcmF0aW8pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cbn0pO1xuXG4vKj4+cmV0aW5hKi9cbiBfY2hlY2tJbnN0YW5jZSgpOyB9KSk7IiwiKGZ1bmN0aW9uIGRlZmluZU11c3RhY2hlKGdsb2JhbCxmYWN0b3J5KXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJmV4cG9ydHMmJnR5cGVvZiBleHBvcnRzLm5vZGVOYW1lIT09XCJzdHJpbmdcIil7ZmFjdG9yeShleHBvcnRzKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXCJleHBvcnRzXCJdLGZhY3RvcnkpfWVsc2V7Z2xvYmFsLk11c3RhY2hlPXt9O2ZhY3RvcnkoZ2xvYmFsLk11c3RhY2hlKX19KSh0aGlzLGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeShtdXN0YWNoZSl7dmFyIG9iamVjdFRvU3RyaW5nPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7dmFyIGlzQXJyYXk9QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24gaXNBcnJheVBvbHlmaWxsKG9iamVjdCl7cmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KT09PVwiW29iamVjdCBBcnJheV1cIn07ZnVuY3Rpb24gaXNGdW5jdGlvbihvYmplY3Qpe3JldHVybiB0eXBlb2Ygb2JqZWN0PT09XCJmdW5jdGlvblwifWZ1bmN0aW9uIHR5cGVTdHIob2JqKXtyZXR1cm4gaXNBcnJheShvYmopP1wiYXJyYXlcIjp0eXBlb2Ygb2JqfWZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpe3JldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csXCJcXFxcJCZcIil9ZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLHByb3BOYW1lKXtyZXR1cm4gb2JqIT1udWxsJiZ0eXBlb2Ygb2JqPT09XCJvYmplY3RcIiYmcHJvcE5hbWUgaW4gb2JqfXZhciByZWdFeHBUZXN0PVJlZ0V4cC5wcm90b3R5cGUudGVzdDtmdW5jdGlvbiB0ZXN0UmVnRXhwKHJlLHN0cmluZyl7cmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSxzdHJpbmcpfXZhciBub25TcGFjZVJlPS9cXFMvO2Z1bmN0aW9uIGlzV2hpdGVzcGFjZShzdHJpbmcpe3JldHVybiF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsc3RyaW5nKX12YXIgZW50aXR5TWFwPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiMzOTtcIixcIi9cIjpcIiYjeDJGO1wiLFwiYFwiOlwiJiN4NjA7XCIsXCI9XCI6XCImI3gzRDtcIn07ZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpe3JldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKXtyZXR1cm4gZW50aXR5TWFwW3NdfSl9dmFyIHdoaXRlUmU9L1xccyovO3ZhciBzcGFjZVJlPS9cXHMrLzt2YXIgZXF1YWxzUmU9L1xccyo9Lzt2YXIgY3VybHlSZT0vXFxzKlxcfS87dmFyIHRhZ1JlPS8jfFxcXnxcXC98PnxcXHt8Jnw9fCEvO2Z1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsdGFncyl7aWYoIXRlbXBsYXRlKXJldHVybltdO3ZhciBzZWN0aW9ucz1bXTt2YXIgdG9rZW5zPVtdO3ZhciBzcGFjZXM9W107dmFyIGhhc1RhZz1mYWxzZTt2YXIgbm9uU3BhY2U9ZmFsc2U7ZnVuY3Rpb24gc3RyaXBTcGFjZSgpe2lmKGhhc1RhZyYmIW5vblNwYWNlKXt3aGlsZShzcGFjZXMubGVuZ3RoKWRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXX1lbHNle3NwYWNlcz1bXX1oYXNUYWc9ZmFsc2U7bm9uU3BhY2U9ZmFsc2V9dmFyIG9wZW5pbmdUYWdSZSxjbG9zaW5nVGFnUmUsY2xvc2luZ0N1cmx5UmU7ZnVuY3Rpb24gY29tcGlsZVRhZ3ModGFnc1RvQ29tcGlsZSl7aWYodHlwZW9mIHRhZ3NUb0NvbXBpbGU9PT1cInN0cmluZ1wiKXRhZ3NUb0NvbXBpbGU9dGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLDIpO2lmKCFpc0FycmF5KHRhZ3NUb0NvbXBpbGUpfHx0YWdzVG9Db21waWxlLmxlbmd0aCE9PTIpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0YWdzOiBcIit0YWdzVG9Db21waWxlKTtvcGVuaW5nVGFnUmU9bmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVswXSkrXCJcXFxccypcIik7Y2xvc2luZ1RhZ1JlPW5ldyBSZWdFeHAoXCJcXFxccypcIitlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO2Nsb3NpbmdDdXJseVJlPW5ldyBSZWdFeHAoXCJcXFxccypcIitlc2NhcGVSZWdFeHAoXCJ9XCIrdGFnc1RvQ29tcGlsZVsxXSkpfWNvbXBpbGVUYWdzKHRhZ3N8fG11c3RhY2hlLnRhZ3MpO3ZhciBzY2FubmVyPW5ldyBTY2FubmVyKHRlbXBsYXRlKTt2YXIgc3RhcnQsdHlwZSx2YWx1ZSxjaHIsdG9rZW4sb3BlblNlY3Rpb247d2hpbGUoIXNjYW5uZXIuZW9zKCkpe3N0YXJ0PXNjYW5uZXIucG9zO3ZhbHVlPXNjYW5uZXIuc2NhblVudGlsKG9wZW5pbmdUYWdSZSk7aWYodmFsdWUpe2Zvcih2YXIgaT0wLHZhbHVlTGVuZ3RoPXZhbHVlLmxlbmd0aDtpPHZhbHVlTGVuZ3RoOysraSl7Y2hyPXZhbHVlLmNoYXJBdChpKTtpZihpc1doaXRlc3BhY2UoY2hyKSl7c3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCl9ZWxzZXtub25TcGFjZT10cnVlfXRva2Vucy5wdXNoKFtcInRleHRcIixjaHIsc3RhcnQsc3RhcnQrMV0pO3N0YXJ0Kz0xO2lmKGNocj09PVwiXFxuXCIpc3RyaXBTcGFjZSgpfX1pZighc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpYnJlYWs7aGFzVGFnPXRydWU7dHlwZT1zY2FubmVyLnNjYW4odGFnUmUpfHxcIm5hbWVcIjtzY2FubmVyLnNjYW4od2hpdGVSZSk7aWYodHlwZT09PVwiPVwiKXt2YWx1ZT1zY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7c2Nhbm5lci5zY2FuKGVxdWFsc1JlKTtzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpfWVsc2UgaWYodHlwZT09PVwie1wiKXt2YWx1ZT1zY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nQ3VybHlSZSk7c2Nhbm5lci5zY2FuKGN1cmx5UmUpO3NjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7dHlwZT1cIiZcIn1lbHNle3ZhbHVlPXNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSl9aWYoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKXRocm93IG5ldyBFcnJvcihcIlVuY2xvc2VkIHRhZyBhdCBcIitzY2FubmVyLnBvcyk7dG9rZW49W3R5cGUsdmFsdWUsc3RhcnQsc2Nhbm5lci5wb3NdO3Rva2Vucy5wdXNoKHRva2VuKTtpZih0eXBlPT09XCIjXCJ8fHR5cGU9PT1cIl5cIil7c2VjdGlvbnMucHVzaCh0b2tlbil9ZWxzZSBpZih0eXBlPT09XCIvXCIpe29wZW5TZWN0aW9uPXNlY3Rpb25zLnBvcCgpO2lmKCFvcGVuU2VjdGlvbil0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInK3ZhbHVlKydcIiBhdCAnK3N0YXJ0KTtpZihvcGVuU2VjdGlvblsxXSE9PXZhbHVlKXRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicrb3BlblNlY3Rpb25bMV0rJ1wiIGF0ICcrc3RhcnQpfWVsc2UgaWYodHlwZT09PVwibmFtZVwifHx0eXBlPT09XCJ7XCJ8fHR5cGU9PT1cIiZcIil7bm9uU3BhY2U9dHJ1ZX1lbHNlIGlmKHR5cGU9PT1cIj1cIil7Y29tcGlsZVRhZ3ModmFsdWUpfX1vcGVuU2VjdGlvbj1zZWN0aW9ucy5wb3AoKTtpZihvcGVuU2VjdGlvbil0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInK29wZW5TZWN0aW9uWzFdKydcIiBhdCAnK3NjYW5uZXIucG9zKTtyZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSl9ZnVuY3Rpb24gc3F1YXNoVG9rZW5zKHRva2Vucyl7dmFyIHNxdWFzaGVkVG9rZW5zPVtdO3ZhciB0b2tlbixsYXN0VG9rZW47Zm9yKHZhciBpPTAsbnVtVG9rZW5zPXRva2Vucy5sZW5ndGg7aTxudW1Ub2tlbnM7KytpKXt0b2tlbj10b2tlbnNbaV07aWYodG9rZW4pe2lmKHRva2VuWzBdPT09XCJ0ZXh0XCImJmxhc3RUb2tlbiYmbGFzdFRva2VuWzBdPT09XCJ0ZXh0XCIpe2xhc3RUb2tlblsxXSs9dG9rZW5bMV07bGFzdFRva2VuWzNdPXRva2VuWzNdfWVsc2V7c3F1YXNoZWRUb2tlbnMucHVzaCh0b2tlbik7bGFzdFRva2VuPXRva2VufX19cmV0dXJuIHNxdWFzaGVkVG9rZW5zfWZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKXt2YXIgbmVzdGVkVG9rZW5zPVtdO3ZhciBjb2xsZWN0b3I9bmVzdGVkVG9rZW5zO3ZhciBzZWN0aW9ucz1bXTt2YXIgdG9rZW4sc2VjdGlvbjtmb3IodmFyIGk9MCxudW1Ub2tlbnM9dG9rZW5zLmxlbmd0aDtpPG51bVRva2VuczsrK2kpe3Rva2VuPXRva2Vuc1tpXTtzd2l0Y2godG9rZW5bMF0pe2Nhc2VcIiNcIjpjYXNlXCJeXCI6Y29sbGVjdG9yLnB1c2godG9rZW4pO3NlY3Rpb25zLnB1c2godG9rZW4pO2NvbGxlY3Rvcj10b2tlbls0XT1bXTticmVhaztjYXNlXCIvXCI6c2VjdGlvbj1zZWN0aW9ucy5wb3AoKTtzZWN0aW9uWzVdPXRva2VuWzJdO2NvbGxlY3Rvcj1zZWN0aW9ucy5sZW5ndGg+MD9zZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGgtMV1bNF06bmVzdGVkVG9rZW5zO2JyZWFrO2RlZmF1bHQ6Y29sbGVjdG9yLnB1c2godG9rZW4pfX1yZXR1cm4gbmVzdGVkVG9rZW5zfWZ1bmN0aW9uIFNjYW5uZXIoc3RyaW5nKXt0aGlzLnN0cmluZz1zdHJpbmc7dGhpcy50YWlsPXN0cmluZzt0aGlzLnBvcz0wfVNjYW5uZXIucHJvdG90eXBlLmVvcz1mdW5jdGlvbiBlb3MoKXtyZXR1cm4gdGhpcy50YWlsPT09XCJcIn07U2Nhbm5lci5wcm90b3R5cGUuc2Nhbj1mdW5jdGlvbiBzY2FuKHJlKXt2YXIgbWF0Y2g9dGhpcy50YWlsLm1hdGNoKHJlKTtpZighbWF0Y2h8fG1hdGNoLmluZGV4IT09MClyZXR1cm5cIlwiO3ZhciBzdHJpbmc9bWF0Y2hbMF07dGhpcy50YWlsPXRoaXMudGFpbC5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCk7dGhpcy5wb3MrPXN0cmluZy5sZW5ndGg7cmV0dXJuIHN0cmluZ307U2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsPWZ1bmN0aW9uIHNjYW5VbnRpbChyZSl7dmFyIGluZGV4PXRoaXMudGFpbC5zZWFyY2gocmUpLG1hdGNoO3N3aXRjaChpbmRleCl7Y2FzZS0xOm1hdGNoPXRoaXMudGFpbDt0aGlzLnRhaWw9XCJcIjticmVhaztjYXNlIDA6bWF0Y2g9XCJcIjticmVhaztkZWZhdWx0Om1hdGNoPXRoaXMudGFpbC5zdWJzdHJpbmcoMCxpbmRleCk7dGhpcy50YWlsPXRoaXMudGFpbC5zdWJzdHJpbmcoaW5kZXgpfXRoaXMucG9zKz1tYXRjaC5sZW5ndGg7cmV0dXJuIG1hdGNofTtmdW5jdGlvbiBDb250ZXh0KHZpZXcscGFyZW50Q29udGV4dCl7dGhpcy52aWV3PXZpZXc7dGhpcy5jYWNoZT17XCIuXCI6dGhpcy52aWV3fTt0aGlzLnBhcmVudD1wYXJlbnRDb250ZXh0fUNvbnRleHQucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24gcHVzaCh2aWV3KXtyZXR1cm4gbmV3IENvbnRleHQodmlldyx0aGlzKX07Q29udGV4dC5wcm90b3R5cGUubG9va3VwPWZ1bmN0aW9uIGxvb2t1cChuYW1lKXt2YXIgY2FjaGU9dGhpcy5jYWNoZTt2YXIgdmFsdWU7aWYoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpe3ZhbHVlPWNhY2hlW25hbWVdfWVsc2V7dmFyIGNvbnRleHQ9dGhpcyxuYW1lcyxpbmRleCxsb29rdXBIaXQ9ZmFsc2U7d2hpbGUoY29udGV4dCl7aWYobmFtZS5pbmRleE9mKFwiLlwiKT4wKXt2YWx1ZT1jb250ZXh0LnZpZXc7bmFtZXM9bmFtZS5zcGxpdChcIi5cIik7aW5kZXg9MDt3aGlsZSh2YWx1ZSE9bnVsbCYmaW5kZXg8bmFtZXMubGVuZ3RoKXtpZihpbmRleD09PW5hbWVzLmxlbmd0aC0xKWxvb2t1cEhpdD1oYXNQcm9wZXJ0eSh2YWx1ZSxuYW1lc1tpbmRleF0pO3ZhbHVlPXZhbHVlW25hbWVzW2luZGV4KytdXX19ZWxzZXt2YWx1ZT1jb250ZXh0LnZpZXdbbmFtZV07bG9va3VwSGl0PWhhc1Byb3BlcnR5KGNvbnRleHQudmlldyxuYW1lKX1pZihsb29rdXBIaXQpYnJlYWs7Y29udGV4dD1jb250ZXh0LnBhcmVudH1jYWNoZVtuYW1lXT12YWx1ZX1pZihpc0Z1bmN0aW9uKHZhbHVlKSl2YWx1ZT12YWx1ZS5jYWxsKHRoaXMudmlldyk7cmV0dXJuIHZhbHVlfTtmdW5jdGlvbiBXcml0ZXIoKXt0aGlzLmNhY2hlPXt9fVdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZT1mdW5jdGlvbiBjbGVhckNhY2hlKCl7dGhpcy5jYWNoZT17fX07V3JpdGVyLnByb3RvdHlwZS5wYXJzZT1mdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSx0YWdzKXt2YXIgY2FjaGU9dGhpcy5jYWNoZTt2YXIgdG9rZW5zPWNhY2hlW3RlbXBsYXRlXTtpZih0b2tlbnM9PW51bGwpdG9rZW5zPWNhY2hlW3RlbXBsYXRlXT1wYXJzZVRlbXBsYXRlKHRlbXBsYXRlLHRhZ3MpO3JldHVybiB0b2tlbnN9O1dyaXRlci5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSx2aWV3LHBhcnRpYWxzKXt2YXIgdG9rZW5zPXRoaXMucGFyc2UodGVtcGxhdGUpO3ZhciBjb250ZXh0PXZpZXcgaW5zdGFuY2VvZiBDb250ZXh0P3ZpZXc6bmV3IENvbnRleHQodmlldyk7cmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2Vucyxjb250ZXh0LHBhcnRpYWxzLHRlbXBsYXRlKX07V3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnM9ZnVuY3Rpb24gcmVuZGVyVG9rZW5zKHRva2Vucyxjb250ZXh0LHBhcnRpYWxzLG9yaWdpbmFsVGVtcGxhdGUpe3ZhciBidWZmZXI9XCJcIjt2YXIgdG9rZW4sc3ltYm9sLHZhbHVlO2Zvcih2YXIgaT0wLG51bVRva2Vucz10b2tlbnMubGVuZ3RoO2k8bnVtVG9rZW5zOysraSl7dmFsdWU9dW5kZWZpbmVkO3Rva2VuPXRva2Vuc1tpXTtzeW1ib2w9dG9rZW5bMF07aWYoc3ltYm9sPT09XCIjXCIpdmFsdWU9dGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLGNvbnRleHQscGFydGlhbHMsb3JpZ2luYWxUZW1wbGF0ZSk7ZWxzZSBpZihzeW1ib2w9PT1cIl5cIil2YWx1ZT10aGlzLnJlbmRlckludmVydGVkKHRva2VuLGNvbnRleHQscGFydGlhbHMsb3JpZ2luYWxUZW1wbGF0ZSk7ZWxzZSBpZihzeW1ib2w9PT1cIj5cIil2YWx1ZT10aGlzLnJlbmRlclBhcnRpYWwodG9rZW4sY29udGV4dCxwYXJ0aWFscyxvcmlnaW5hbFRlbXBsYXRlKTtlbHNlIGlmKHN5bWJvbD09PVwiJlwiKXZhbHVlPXRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sY29udGV4dCk7ZWxzZSBpZihzeW1ib2w9PT1cIm5hbWVcIil2YWx1ZT10aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbixjb250ZXh0KTtlbHNlIGlmKHN5bWJvbD09PVwidGV4dFwiKXZhbHVlPXRoaXMucmF3VmFsdWUodG9rZW4pO2lmKHZhbHVlIT09dW5kZWZpbmVkKWJ1ZmZlcis9dmFsdWV9cmV0dXJuIGJ1ZmZlcn07V3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uPWZ1bmN0aW9uIHJlbmRlclNlY3Rpb24odG9rZW4sY29udGV4dCxwYXJ0aWFscyxvcmlnaW5hbFRlbXBsYXRlKXt2YXIgc2VsZj10aGlzO3ZhciBidWZmZXI9XCJcIjt2YXIgdmFsdWU9Y29udGV4dC5sb29rdXAodG9rZW5bMV0pO2Z1bmN0aW9uIHN1YlJlbmRlcih0ZW1wbGF0ZSl7cmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLGNvbnRleHQscGFydGlhbHMpfWlmKCF2YWx1ZSlyZXR1cm47aWYoaXNBcnJheSh2YWx1ZSkpe2Zvcih2YXIgaj0wLHZhbHVlTGVuZ3RoPXZhbHVlLmxlbmd0aDtqPHZhbHVlTGVuZ3RoOysrail7YnVmZmVyKz10aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSxjb250ZXh0LnB1c2godmFsdWVbal0pLHBhcnRpYWxzLG9yaWdpbmFsVGVtcGxhdGUpfX1lbHNlIGlmKHR5cGVvZiB2YWx1ZT09PVwib2JqZWN0XCJ8fHR5cGVvZiB2YWx1ZT09PVwic3RyaW5nXCJ8fHR5cGVvZiB2YWx1ZT09PVwibnVtYmVyXCIpe2J1ZmZlcis9dGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sY29udGV4dC5wdXNoKHZhbHVlKSxwYXJ0aWFscyxvcmlnaW5hbFRlbXBsYXRlKX1lbHNlIGlmKGlzRnVuY3Rpb24odmFsdWUpKXtpZih0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSE9PVwic3RyaW5nXCIpdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGVcIik7dmFsdWU9dmFsdWUuY2FsbChjb250ZXh0LnZpZXcsb3JpZ2luYWxUZW1wbGF0ZS5zbGljZSh0b2tlblszXSx0b2tlbls1XSksc3ViUmVuZGVyKTtpZih2YWx1ZSE9bnVsbClidWZmZXIrPXZhbHVlfWVsc2V7YnVmZmVyKz10aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSxjb250ZXh0LHBhcnRpYWxzLG9yaWdpbmFsVGVtcGxhdGUpfXJldHVybiBidWZmZXJ9O1dyaXRlci5wcm90b3R5cGUucmVuZGVySW52ZXJ0ZWQ9ZnVuY3Rpb24gcmVuZGVySW52ZXJ0ZWQodG9rZW4sY29udGV4dCxwYXJ0aWFscyxvcmlnaW5hbFRlbXBsYXRlKXt2YXIgdmFsdWU9Y29udGV4dC5sb29rdXAodG9rZW5bMV0pO2lmKCF2YWx1ZXx8aXNBcnJheSh2YWx1ZSkmJnZhbHVlLmxlbmd0aD09PTApcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLGNvbnRleHQscGFydGlhbHMsb3JpZ2luYWxUZW1wbGF0ZSl9O1dyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbD1mdW5jdGlvbiByZW5kZXJQYXJ0aWFsKHRva2VuLGNvbnRleHQscGFydGlhbHMpe2lmKCFwYXJ0aWFscylyZXR1cm47dmFyIHZhbHVlPWlzRnVuY3Rpb24ocGFydGlhbHMpP3BhcnRpYWxzKHRva2VuWzFdKTpwYXJ0aWFsc1t0b2tlblsxXV07aWYodmFsdWUhPW51bGwpcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLGNvbnRleHQscGFydGlhbHMsdmFsdWUpfTtXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlPWZ1bmN0aW9uIHVuZXNjYXBlZFZhbHVlKHRva2VuLGNvbnRleHQpe3ZhciB2YWx1ZT1jb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7aWYodmFsdWUhPW51bGwpcmV0dXJuIHZhbHVlfTtXcml0ZXIucHJvdG90eXBlLmVzY2FwZWRWYWx1ZT1mdW5jdGlvbiBlc2NhcGVkVmFsdWUodG9rZW4sY29udGV4dCl7dmFyIHZhbHVlPWNvbnRleHQubG9va3VwKHRva2VuWzFdKTtpZih2YWx1ZSE9bnVsbClyZXR1cm4gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKX07V3JpdGVyLnByb3RvdHlwZS5yYXdWYWx1ZT1mdW5jdGlvbiByYXdWYWx1ZSh0b2tlbil7cmV0dXJuIHRva2VuWzFdfTttdXN0YWNoZS5uYW1lPVwibXVzdGFjaGUuanNcIjttdXN0YWNoZS52ZXJzaW9uPVwiMi4zLjJcIjttdXN0YWNoZS50YWdzPVtcInt7XCIsXCJ9fVwiXTt2YXIgZGVmYXVsdFdyaXRlcj1uZXcgV3JpdGVyO211c3RhY2hlLmNsZWFyQ2FjaGU9ZnVuY3Rpb24gY2xlYXJDYWNoZSgpe3JldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKX07bXVzdGFjaGUucGFyc2U9ZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsdGFncyl7cmV0dXJuIGRlZmF1bHRXcml0ZXIucGFyc2UodGVtcGxhdGUsdGFncyl9O211c3RhY2hlLnJlbmRlcj1mdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsdmlldyxwYXJ0aWFscyl7aWYodHlwZW9mIHRlbXBsYXRlIT09XCJzdHJpbmdcIil7dGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSEgVGVtcGxhdGUgc2hvdWxkIGJlIGEgXCJzdHJpbmdcIiAnKydidXQgXCInK3R5cGVTdHIodGVtcGxhdGUpKydcIiB3YXMgZ2l2ZW4gYXMgdGhlIGZpcnN0ICcrXCJhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscylcIil9cmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLHZpZXcscGFydGlhbHMpfTttdXN0YWNoZS50b19odG1sPWZ1bmN0aW9uIHRvX2h0bWwodGVtcGxhdGUsdmlldyxwYXJ0aWFscyxzZW5kKXt2YXIgcmVzdWx0PW11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSx2aWV3LHBhcnRpYWxzKTtpZihpc0Z1bmN0aW9uKHNlbmQpKXtzZW5kKHJlc3VsdCl9ZWxzZXtyZXR1cm4gcmVzdWx0fX07bXVzdGFjaGUuZXNjYXBlPWVzY2FwZUh0bWw7bXVzdGFjaGUuU2Nhbm5lcj1TY2FubmVyO211c3RhY2hlLkNvbnRleHQ9Q29udGV4dDttdXN0YWNoZS5Xcml0ZXI9V3JpdGVyO3JldHVybiBtdXN0YWNoZX0pO1xuIiwiLyohIFJlc3BvbmQuanMgdjEuNC4yOiBtaW4vbWF4LXdpZHRoIG1lZGlhIHF1ZXJ5IHBvbHlmaWxsXHJcbiAqIENvcHlyaWdodCAyMDE0IFNjb3R0IEplaGxcclxuICogTGljZW5zZWQgdW5kZXIgTUlUXHJcbiAqIGh0dHA6Ly9qLm1wL3Jlc3BvbmRqcyAqL1xyXG5cclxuIWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2EubWF0Y2hNZWRpYT1hLm1hdGNoTWVkaWF8fGZ1bmN0aW9uKGEpe3ZhciBiLGM9YS5kb2N1bWVudEVsZW1lbnQsZD1jLmZpcnN0RWxlbWVudENoaWxkfHxjLmZpcnN0Q2hpbGQsZT1hLmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpLGY9YS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBmLmlkPVwibXEtdGVzdC0xXCIsZi5zdHlsZS5jc3NUZXh0PVwicG9zaXRpb246YWJzb2x1dGU7dG9wOi0xMDBlbVwiLGUuc3R5bGUuYmFja2dyb3VuZD1cIm5vbmVcIixlLmFwcGVuZENoaWxkKGYpLGZ1bmN0aW9uKGEpe3JldHVybiBmLmlubmVySFRNTD0nJnNoeTs8c3R5bGUgbWVkaWE9XCInK2ErJ1wiPiAjbXEtdGVzdC0xIHsgd2lkdGg6IDQycHg7IH08L3N0eWxlPicsYy5pbnNlcnRCZWZvcmUoZSxkKSxiPTQyPT09Zi5vZmZzZXRXaWR0aCxjLnJlbW92ZUNoaWxkKGUpLHttYXRjaGVzOmIsbWVkaWE6YX19fShhLmRvY3VtZW50KX0odGhpcyksZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYigpe3YoITApfXZhciBjPXt9O2EucmVzcG9uZD1jLGMudXBkYXRlPWZ1bmN0aW9uKCl7fTt2YXIgZD1bXSxlPWZ1bmN0aW9uKCl7dmFyIGI9ITE7dHJ5e2I9bmV3IGEuWE1MSHR0cFJlcXVlc3R9Y2F0Y2goYyl7Yj1uZXcgYS5BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIil9cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGJ9fSgpLGY9ZnVuY3Rpb24oYSxiKXt2YXIgYz1lKCk7YyYmKGMub3BlbihcIkdFVFwiLGEsITApLGMub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7NCE9PWMucmVhZHlTdGF0ZXx8MjAwIT09Yy5zdGF0dXMmJjMwNCE9PWMuc3RhdHVzfHxiKGMucmVzcG9uc2VUZXh0KX0sNCE9PWMucmVhZHlTdGF0ZSYmYy5zZW5kKG51bGwpKX0sZz1mdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKGMucmVnZXgubWlubWF4d2gsXCJcIikubWF0Y2goYy5yZWdleC5vdGhlcil9O2lmKGMuYWpheD1mLGMucXVldWU9ZCxjLnVuc3VwcG9ydGVkbXE9ZyxjLnJlZ2V4PXttZWRpYTovQG1lZGlhW15cXHtdK1xceyhbXlxce1xcfV0qXFx7W15cXH1cXHtdKlxcfSkrL2dpLGtleWZyYW1lczovQCg/OlxcLSg/Om98bW96fHdlYmtpdClcXC0pP2tleWZyYW1lc1teXFx7XStcXHsoPzpbXlxce1xcfV0qXFx7W15cXH1cXHtdKlxcfSkrW15cXH1dKlxcfS9naSxjb21tZW50czovXFwvXFwqW14qXSpcXCorKFteL11bXipdKlxcKispKlxcLy9naSx1cmxzOi8odXJsXFwoKVsnXCJdPyhbXlxcL1xcKSdcIl1bXjpcXCknXCJdKylbJ1wiXT8oXFwpKS9nLGZpbmRTdHlsZXM6L0BtZWRpYSAqKFteXFx7XSspXFx7KFtcXFNcXHNdKz8pJC8sb25seTovKG9ubHlcXHMrKT8oW2EtekEtWl0rKVxccz8vLG1pbnc6L1xcKFxccyptaW5cXC13aWR0aFxccyo6XFxzKihcXHMqWzAtOVxcLl0rKShweHxlbSlcXHMqXFwpLyxtYXh3Oi9cXChcXHMqbWF4XFwtd2lkdGhcXHMqOlxccyooXFxzKlswLTlcXC5dKykocHh8ZW0pXFxzKlxcKS8sbWlubWF4d2g6L1xcKFxccyptKGlufGF4KVxcLShoZWlnaHR8d2lkdGgpXFxzKjpcXHMqKFxccypbMC05XFwuXSspKHB4fGVtKVxccypcXCkvZ2ksb3RoZXI6L1xcKFteXFwpXSpcXCkvZ30sYy5tZWRpYVF1ZXJpZXNTdXBwb3J0ZWQ9YS5tYXRjaE1lZGlhJiZudWxsIT09YS5tYXRjaE1lZGlhKFwib25seSBhbGxcIikmJmEubWF0Y2hNZWRpYShcIm9ubHkgYWxsXCIpLm1hdGNoZXMsIWMubWVkaWFRdWVyaWVzU3VwcG9ydGVkKXt2YXIgaCxpLGosaz1hLmRvY3VtZW50LGw9ay5kb2N1bWVudEVsZW1lbnQsbT1bXSxuPVtdLG89W10scD17fSxxPTMwLHI9ay5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF18fGwscz1rLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYmFzZVwiKVswXSx0PXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpLHU9ZnVuY3Rpb24oKXt2YXIgYSxiPWsuY3JlYXRlRWxlbWVudChcImRpdlwiKSxjPWsuYm9keSxkPWwuc3R5bGUuZm9udFNpemUsZT1jJiZjLnN0eWxlLmZvbnRTaXplLGY9ITE7cmV0dXJuIGIuc3R5bGUuY3NzVGV4dD1cInBvc2l0aW9uOmFic29sdXRlO2ZvbnQtc2l6ZToxZW07d2lkdGg6MWVtXCIsY3x8KGM9Zj1rLmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpLGMuc3R5bGUuYmFja2dyb3VuZD1cIm5vbmVcIiksbC5zdHlsZS5mb250U2l6ZT1cIjEwMCVcIixjLnN0eWxlLmZvbnRTaXplPVwiMTAwJVwiLGMuYXBwZW5kQ2hpbGQoYiksZiYmbC5pbnNlcnRCZWZvcmUoYyxsLmZpcnN0Q2hpbGQpLGE9Yi5vZmZzZXRXaWR0aCxmP2wucmVtb3ZlQ2hpbGQoYyk6Yy5yZW1vdmVDaGlsZChiKSxsLnN0eWxlLmZvbnRTaXplPWQsZSYmKGMuc3R5bGUuZm9udFNpemU9ZSksYT1qPXBhcnNlRmxvYXQoYSl9LHY9ZnVuY3Rpb24oYil7dmFyIGM9XCJjbGllbnRXaWR0aFwiLGQ9bFtjXSxlPVwiQ1NTMUNvbXBhdFwiPT09ay5jb21wYXRNb2RlJiZkfHxrLmJvZHlbY118fGQsZj17fSxnPXRbdC5sZW5ndGgtMV0scD0obmV3IERhdGUpLmdldFRpbWUoKTtpZihiJiZoJiZxPnAtaClyZXR1cm4gYS5jbGVhclRpbWVvdXQoaSksaT1hLnNldFRpbWVvdXQodixxKSx2b2lkIDA7aD1wO2Zvcih2YXIgcyBpbiBtKWlmKG0uaGFzT3duUHJvcGVydHkocykpe3ZhciB3PW1bc10seD13Lm1pbncseT13Lm1heHcsej1udWxsPT09eCxBPW51bGw9PT15LEI9XCJlbVwiO3gmJih4PXBhcnNlRmxvYXQoeCkqKHguaW5kZXhPZihCKT4tMT9qfHx1KCk6MSkpLHkmJih5PXBhcnNlRmxvYXQoeSkqKHkuaW5kZXhPZihCKT4tMT9qfHx1KCk6MSkpLHcuaGFzcXVlcnkmJih6JiZBfHwhKHp8fGU+PXgpfHwhKEF8fHk+PWUpKXx8KGZbdy5tZWRpYV18fChmW3cubWVkaWFdPVtdKSxmW3cubWVkaWFdLnB1c2goblt3LnJ1bGVzXSkpfWZvcih2YXIgQyBpbiBvKW8uaGFzT3duUHJvcGVydHkoQykmJm9bQ10mJm9bQ10ucGFyZW50Tm9kZT09PXImJnIucmVtb3ZlQ2hpbGQob1tDXSk7by5sZW5ndGg9MDtmb3IodmFyIEQgaW4gZilpZihmLmhhc093blByb3BlcnR5KEQpKXt2YXIgRT1rLmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKSxGPWZbRF0uam9pbihcIlxcblwiKTtFLnR5cGU9XCJ0ZXh0L2Nzc1wiLEUubWVkaWE9RCxyLmluc2VydEJlZm9yZShFLGcubmV4dFNpYmxpbmcpLEUuc3R5bGVTaGVldD9FLnN0eWxlU2hlZXQuY3NzVGV4dD1GOkUuYXBwZW5kQ2hpbGQoay5jcmVhdGVUZXh0Tm9kZShGKSksby5wdXNoKEUpfX0sdz1mdW5jdGlvbihhLGIsZCl7dmFyIGU9YS5yZXBsYWNlKGMucmVnZXguY29tbWVudHMsXCJcIikucmVwbGFjZShjLnJlZ2V4LmtleWZyYW1lcyxcIlwiKS5tYXRjaChjLnJlZ2V4Lm1lZGlhKSxmPWUmJmUubGVuZ3RofHwwO2I9Yi5zdWJzdHJpbmcoMCxiLmxhc3RJbmRleE9mKFwiL1wiKSk7dmFyIGg9ZnVuY3Rpb24oYSl7cmV0dXJuIGEucmVwbGFjZShjLnJlZ2V4LnVybHMsXCIkMVwiK2IrXCIkMiQzXCIpfSxpPSFmJiZkO2IubGVuZ3RoJiYoYis9XCIvXCIpLGkmJihmPTEpO2Zvcih2YXIgaj0wO2Y+ajtqKyspe3ZhciBrLGwsbyxwO2k/KGs9ZCxuLnB1c2goaChhKSkpOihrPWVbal0ubWF0Y2goYy5yZWdleC5maW5kU3R5bGVzKSYmUmVnRXhwLiQxLG4ucHVzaChSZWdFeHAuJDImJmgoUmVnRXhwLiQyKSkpLG89ay5zcGxpdChcIixcIikscD1vLmxlbmd0aDtmb3IodmFyIHE9MDtwPnE7cSsrKWw9b1txXSxnKGwpfHxtLnB1c2goe21lZGlhOmwuc3BsaXQoXCIoXCIpWzBdLm1hdGNoKGMucmVnZXgub25seSkmJlJlZ0V4cC4kMnx8XCJhbGxcIixydWxlczpuLmxlbmd0aC0xLGhhc3F1ZXJ5OmwuaW5kZXhPZihcIihcIik+LTEsbWludzpsLm1hdGNoKGMucmVnZXgubWludykmJnBhcnNlRmxvYXQoUmVnRXhwLiQxKSsoUmVnRXhwLiQyfHxcIlwiKSxtYXh3OmwubWF0Y2goYy5yZWdleC5tYXh3KSYmcGFyc2VGbG9hdChSZWdFeHAuJDEpKyhSZWdFeHAuJDJ8fFwiXCIpfSl9digpfSx4PWZ1bmN0aW9uKCl7aWYoZC5sZW5ndGgpe3ZhciBiPWQuc2hpZnQoKTtmKGIuaHJlZixmdW5jdGlvbihjKXt3KGMsYi5ocmVmLGIubWVkaWEpLHBbYi5ocmVmXT0hMCxhLnNldFRpbWVvdXQoZnVuY3Rpb24oKXt4KCl9LDApfSl9fSx5PWZ1bmN0aW9uKCl7Zm9yKHZhciBiPTA7Yjx0Lmxlbmd0aDtiKyspe3ZhciBjPXRbYl0sZT1jLmhyZWYsZj1jLm1lZGlhLGc9Yy5yZWwmJlwic3R5bGVzaGVldFwiPT09Yy5yZWwudG9Mb3dlckNhc2UoKTtlJiZnJiYhcFtlXSYmKGMuc3R5bGVTaGVldCYmYy5zdHlsZVNoZWV0LnJhd0Nzc1RleHQ/KHcoYy5zdHlsZVNoZWV0LnJhd0Nzc1RleHQsZSxmKSxwW2VdPSEwKTooIS9eKFthLXpBLVo6XSpcXC9cXC8pLy50ZXN0KGUpJiYhc3x8ZS5yZXBsYWNlKFJlZ0V4cC4kMSxcIlwiKS5zcGxpdChcIi9cIilbMF09PT1hLmxvY2F0aW9uLmhvc3QpJiYoXCIvL1wiPT09ZS5zdWJzdHJpbmcoMCwyKSYmKGU9YS5sb2NhdGlvbi5wcm90b2NvbCtlKSxkLnB1c2goe2hyZWY6ZSxtZWRpYTpmfSkpKX14KCl9O3koKSxjLnVwZGF0ZT15LGMuZ2V0RW1WYWx1ZT11LGEuYWRkRXZlbnRMaXN0ZW5lcj9hLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixiLCExKTphLmF0dGFjaEV2ZW50JiZhLmF0dGFjaEV2ZW50KFwib25yZXNpemVcIixiKX19KHRoaXMpOyIsIi8qKlxuICogU3dpcGVyIDMuNC4yXG4gKiBNb3N0IG1vZGVybiBtb2JpbGUgdG91Y2ggc2xpZGVyIGFuZCBmcmFtZXdvcmsgd2l0aCBoYXJkd2FyZSBhY2NlbGVyYXRlZCB0cmFuc2l0aW9uc1xuICogXG4gKiBodHRwOi8vd3d3LmlkYW5nZXJvLnVzL3N3aXBlci9cbiAqIFxuICogQ29weXJpZ2h0IDIwMTcsIFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gKiBUaGUgaURhbmdlcm8udXNcbiAqIGh0dHA6Ly93d3cuaWRhbmdlcm8udXMvXG4gKiBcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVFxuICogXG4gKiBSZWxlYXNlZCBvbjogTWFyY2ggMTAsIDIwMTdcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyICQ7XG5cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFN3aXBlclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgdmFyIFN3aXBlciA9IGZ1bmN0aW9uIChjb250YWluZXIsIHBhcmFtcykge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU3dpcGVyKSkgcmV0dXJuIG5ldyBTd2lwZXIoY29udGFpbmVyLCBwYXJhbXMpO1xuICAgIFxuXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgdG91Y2hFdmVudHNUYXJnZXQ6ICdjb250YWluZXInLFxuICAgICAgICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgICAgIC8vIGF1dG9wbGF5XG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXlTdG9wT25MYXN0OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFRvIHN1cHBvcnQgaU9TJ3Mgc3dpcGUtdG8tZ28tYmFjayBnZXN0dXJlICh3aGVuIGJlaW5nIHVzZWQgaW4tYXBwLCB3aXRoIFVJV2ViVmlldykuXG4gICAgICAgICAgICBpT1NFZGdlU3dpcGVEZXRlY3Rpb246IGZhbHNlLFxuICAgICAgICAgICAgaU9TRWRnZVN3aXBlVGhyZXNob2xkOiAyMCxcbiAgICAgICAgICAgIC8vIEZyZWUgbW9kZVxuICAgICAgICAgICAgZnJlZU1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgZnJlZU1vZGVNb21lbnR1bTogdHJ1ZSxcbiAgICAgICAgICAgIGZyZWVNb2RlTW9tZW50dW1SYXRpbzogMSxcbiAgICAgICAgICAgIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2U6IHRydWUsXG4gICAgICAgICAgICBmcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW86IDEsXG4gICAgICAgICAgICBmcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbzogMSxcbiAgICAgICAgICAgIGZyZWVNb2RlU3RpY2t5OiBmYWxzZSxcbiAgICAgICAgICAgIGZyZWVNb2RlTWluaW11bVZlbG9jaXR5OiAwLjAyLFxuICAgICAgICAgICAgLy8gQXV0b2hlaWdodFxuICAgICAgICAgICAgYXV0b0hlaWdodDogZmFsc2UsXG4gICAgICAgICAgICAvLyBTZXQgd3JhcHBlciB3aWR0aFxuICAgICAgICAgICAgc2V0V3JhcHBlclNpemU6IGZhbHNlLFxuICAgICAgICAgICAgLy8gVmlydHVhbCBUcmFuc2xhdGVcbiAgICAgICAgICAgIHZpcnR1YWxUcmFuc2xhdGU6IGZhbHNlLFxuICAgICAgICAgICAgLy8gRWZmZWN0c1xuICAgICAgICAgICAgZWZmZWN0OiAnc2xpZGUnLCAvLyAnc2xpZGUnIG9yICdmYWRlJyBvciAnY3ViZScgb3IgJ2NvdmVyZmxvdycgb3IgJ2ZsaXAnXG4gICAgICAgICAgICBjb3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgICByb3RhdGU6IDUwLFxuICAgICAgICAgICAgICAgIHN0cmV0Y2g6IDAsXG4gICAgICAgICAgICAgICAgZGVwdGg6IDEwMCxcbiAgICAgICAgICAgICAgICBtb2RpZmllcjogMSxcbiAgICAgICAgICAgICAgICBzbGlkZVNoYWRvd3MgOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmxpcDoge1xuICAgICAgICAgICAgICAgIHNsaWRlU2hhZG93cyA6IHRydWUsXG4gICAgICAgICAgICAgICAgbGltaXRSb3RhdGlvbjogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGN1YmU6IHtcbiAgICAgICAgICAgICAgICBzbGlkZVNoYWRvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hhZG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHNoYWRvd09mZnNldDogMjAsXG4gICAgICAgICAgICAgICAgc2hhZG93U2NhbGU6IDAuOTRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWRlOiB7XG4gICAgICAgICAgICAgICAgY3Jvc3NGYWRlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFBhcmFsbGF4XG4gICAgICAgICAgICBwYXJhbGxheDogZmFsc2UsXG4gICAgICAgICAgICAvLyBab29tXG4gICAgICAgICAgICB6b29tOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21NYXg6IDMsXG4gICAgICAgICAgICB6b29tTWluOiAxLFxuICAgICAgICAgICAgem9vbVRvZ2dsZTogdHJ1ZSxcbiAgICAgICAgICAgIC8vIFNjcm9sbGJhclxuICAgICAgICAgICAgc2Nyb2xsYmFyOiBudWxsLFxuICAgICAgICAgICAgc2Nyb2xsYmFySGlkZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjcm9sbGJhckRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBzY3JvbGxiYXJTbmFwT25SZWxlYXNlOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEtleWJvYXJkIE1vdXNld2hlZWxcbiAgICAgICAgICAgIGtleWJvYXJkQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBtb3VzZXdoZWVsQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBtb3VzZXdoZWVsUmVsZWFzZU9uRWRnZXM6IGZhbHNlLFxuICAgICAgICAgICAgbW91c2V3aGVlbEludmVydDogZmFsc2UsXG4gICAgICAgICAgICBtb3VzZXdoZWVsRm9yY2VUb0F4aXM6IGZhbHNlLFxuICAgICAgICAgICAgbW91c2V3aGVlbFNlbnNpdGl2aXR5OiAxLFxuICAgICAgICAgICAgbW91c2V3aGVlbEV2ZW50c1RhcmdlZDogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgICAvLyBIYXNoIE5hdmlnYXRpb25cbiAgICAgICAgICAgIGhhc2huYXY6IGZhbHNlLFxuICAgICAgICAgICAgaGFzaG5hdldhdGNoU3RhdGU6IGZhbHNlLFxuICAgICAgICAgICAgLy8gSGlzdG9yeVxuICAgICAgICAgICAgaGlzdG9yeTogZmFsc2UsXG4gICAgICAgICAgICAvLyBDb21tb25nIE5hdiBTdGF0ZVxuICAgICAgICAgICAgcmVwbGFjZVN0YXRlOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEJyZWFrcG9pbnRzXG4gICAgICAgICAgICBicmVha3BvaW50czogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gU2xpZGVzIGdyaWRcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBzbGlkZXNQZXJDb2x1bW46IDEsXG4gICAgICAgICAgICBzbGlkZXNQZXJDb2x1bW5GaWxsOiAnY29sdW1uJyxcbiAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICAgICAgICAgICAgc2xpZGVzT2Zmc2V0QmVmb3JlOiAwLCAvLyBpbiBweFxuICAgICAgICAgICAgc2xpZGVzT2Zmc2V0QWZ0ZXI6IDAsIC8vIGluIHB4XG4gICAgICAgICAgICAvLyBSb3VuZCBsZW5ndGhcbiAgICAgICAgICAgIHJvdW5kTGVuZ3RoczogZmFsc2UsXG4gICAgICAgICAgICAvLyBUb3VjaGVzXG4gICAgICAgICAgICB0b3VjaFJhdGlvOiAxLFxuICAgICAgICAgICAgdG91Y2hBbmdsZTogNDUsXG4gICAgICAgICAgICBzaW11bGF0ZVRvdWNoOiB0cnVlLFxuICAgICAgICAgICAgc2hvcnRTd2lwZXM6IHRydWUsXG4gICAgICAgICAgICBsb25nU3dpcGVzOiB0cnVlLFxuICAgICAgICAgICAgbG9uZ1N3aXBlc1JhdGlvOiAwLjUsXG4gICAgICAgICAgICBsb25nU3dpcGVzTXM6IDMwMCxcbiAgICAgICAgICAgIGZvbGxvd0ZpbmdlcjogdHJ1ZSxcbiAgICAgICAgICAgIG9ubHlFeHRlcm5hbDogZmFsc2UsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgICAgICB0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246IHRydWUsXG4gICAgICAgICAgICB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFVuaXF1ZSBOYXZpZ2F0aW9uIEVsZW1lbnRzXG4gICAgICAgICAgICB1bmlxdWVOYXZFbGVtZW50czogdHJ1ZSxcbiAgICAgICAgICAgIC8vIFBhZ2luYXRpb25cbiAgICAgICAgICAgIHBhZ2luYXRpb246IG51bGwsXG4gICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudDogJ3NwYW4nLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBwYWdpbmF0aW9uSGlkZTogZmFsc2UsXG4gICAgICAgICAgICBwYWdpbmF0aW9uQnVsbGV0UmVuZGVyOiBudWxsLFxuICAgICAgICAgICAgcGFnaW5hdGlvblByb2dyZXNzUmVuZGVyOiBudWxsLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkZyYWN0aW9uUmVuZGVyOiBudWxsLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkN1c3RvbVJlbmRlcjogbnVsbCxcbiAgICAgICAgICAgIHBhZ2luYXRpb25UeXBlOiAnYnVsbGV0cycsIC8vICdidWxsZXRzJyBvciAncHJvZ3Jlc3MnIG9yICdmcmFjdGlvbicgb3IgJ2N1c3RvbSdcbiAgICAgICAgICAgIC8vIFJlc2lzdGFuY2VcbiAgICAgICAgICAgIHJlc2lzdGFuY2U6IHRydWUsXG4gICAgICAgICAgICByZXNpc3RhbmNlUmF0aW86IDAuODUsXG4gICAgICAgICAgICAvLyBOZXh0L3ByZXYgYnV0dG9uc1xuICAgICAgICAgICAgbmV4dEJ1dHRvbjogbnVsbCxcbiAgICAgICAgICAgIHByZXZCdXR0b246IG51bGwsXG4gICAgICAgICAgICAvLyBQcm9ncmVzc1xuICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogZmFsc2UsXG4gICAgICAgICAgICB3YXRjaFNsaWRlc1Zpc2liaWxpdHk6IGZhbHNlLFxuICAgICAgICAgICAgLy8gQ3Vyc29yXG4gICAgICAgICAgICBncmFiQ3Vyc29yOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIENsaWNrc1xuICAgICAgICAgICAgcHJldmVudENsaWNrczogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlLFxuICAgICAgICAgICAgLy8gTGF6eSBMb2FkaW5nXG4gICAgICAgICAgICBsYXp5TG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBsYXp5TG9hZGluZ0luUHJldk5leHQ6IGZhbHNlLFxuICAgICAgICAgICAgbGF6eUxvYWRpbmdJblByZXZOZXh0QW1vdW50OiAxLFxuICAgICAgICAgICAgbGF6eUxvYWRpbmdPblRyYW5zaXRpb25TdGFydDogZmFsc2UsXG4gICAgICAgICAgICAvLyBJbWFnZXNcbiAgICAgICAgICAgIHByZWxvYWRJbWFnZXM6IHRydWUsXG4gICAgICAgICAgICB1cGRhdGVPbkltYWdlc1JlYWR5OiB0cnVlLFxuICAgICAgICAgICAgLy8gbG9vcFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICBsb29wQWRkaXRpb25hbFNsaWRlczogMCxcbiAgICAgICAgICAgIGxvb3BlZFNsaWRlczogbnVsbCxcbiAgICAgICAgICAgIC8vIENvbnRyb2xcbiAgICAgICAgICAgIGNvbnRyb2w6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvbnRyb2xJbnZlcnNlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRyb2xCeTogJ3NsaWRlJywgLy9vciAnY29udGFpbmVyJ1xuICAgICAgICAgICAgbm9ybWFsaXplU2xpZGVJbmRleDogdHJ1ZSxcbiAgICAgICAgICAgIC8vIFN3aXBpbmcvbm8gc3dpcGluZ1xuICAgICAgICAgICAgYWxsb3dTd2lwZVRvUHJldjogdHJ1ZSxcbiAgICAgICAgICAgIGFsbG93U3dpcGVUb05leHQ6IHRydWUsXG4gICAgICAgICAgICBzd2lwZUhhbmRsZXI6IG51bGwsIC8vJy5zd2lwZS1oYW5kbGVyJyxcbiAgICAgICAgICAgIG5vU3dpcGluZzogdHJ1ZSxcbiAgICAgICAgICAgIG5vU3dpcGluZ0NsYXNzOiAnc3dpcGVyLW5vLXN3aXBpbmcnLFxuICAgICAgICAgICAgLy8gUGFzc2l2ZSBMaXN0ZW5lcnNcbiAgICAgICAgICAgIHBhc3NpdmVMaXN0ZW5lcnM6IHRydWUsXG4gICAgICAgICAgICAvLyBOU1xuICAgICAgICAgICAgY29udGFpbmVyTW9kaWZpZXJDbGFzczogJ3N3aXBlci1jb250YWluZXItJywgLy8gTkVXXG4gICAgICAgICAgICBzbGlkZUNsYXNzOiAnc3dpcGVyLXNsaWRlJyxcbiAgICAgICAgICAgIHNsaWRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtYWN0aXZlJyxcbiAgICAgICAgICAgIHNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLWFjdGl2ZScsXG4gICAgICAgICAgICBzbGlkZVZpc2libGVDbGFzczogJ3N3aXBlci1zbGlkZS12aXNpYmxlJyxcbiAgICAgICAgICAgIHNsaWRlRHVwbGljYXRlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlJyxcbiAgICAgICAgICAgIHNsaWRlTmV4dENsYXNzOiAnc3dpcGVyLXNsaWRlLW5leHQnLFxuICAgICAgICAgICAgc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLW5leHQnLFxuICAgICAgICAgICAgc2xpZGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtcHJldicsXG4gICAgICAgICAgICBzbGlkZUR1cGxpY2F0ZVByZXZDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtcHJldicsXG4gICAgICAgICAgICB3cmFwcGVyQ2xhc3M6ICdzd2lwZXItd3JhcHBlcicsXG4gICAgICAgICAgICBidWxsZXRDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCcsXG4gICAgICAgICAgICBidWxsZXRBY3RpdmVDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnLFxuICAgICAgICAgICAgYnV0dG9uRGlzYWJsZWRDbGFzczogJ3N3aXBlci1idXR0b24tZGlzYWJsZWQnLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkN1cnJlbnRDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnLFxuICAgICAgICAgICAgcGFnaW5hdGlvblRvdGFsQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi10b3RhbCcsXG4gICAgICAgICAgICBwYWdpbmF0aW9uSGlkZGVuQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1oaWRkZW4nLFxuICAgICAgICAgICAgcGFnaW5hdGlvblByb2dyZXNzYmFyQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2JhcicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uQ2xpY2thYmxlQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1jbGlja2FibGUnLCAvLyBORVdcbiAgICAgICAgICAgIHBhZ2luYXRpb25Nb2RpZmllckNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tJywgLy8gTkVXXG4gICAgICAgICAgICBsYXp5TG9hZGluZ0NsYXNzOiAnc3dpcGVyLWxhenknLFxuICAgICAgICAgICAgbGF6eVN0YXR1c0xvYWRpbmdDbGFzczogJ3N3aXBlci1sYXp5LWxvYWRpbmcnLFxuICAgICAgICAgICAgbGF6eVN0YXR1c0xvYWRlZENsYXNzOiAnc3dpcGVyLWxhenktbG9hZGVkJyxcbiAgICAgICAgICAgIGxhenlQcmVsb2FkZXJDbGFzczogJ3N3aXBlci1sYXp5LXByZWxvYWRlcicsXG4gICAgICAgICAgICBub3RpZmljYXRpb25DbGFzczogJ3N3aXBlci1ub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgcHJlbG9hZGVyQ2xhc3M6ICdwcmVsb2FkZXInLFxuICAgICAgICAgICAgem9vbUNvbnRhaW5lckNsYXNzOiAnc3dpcGVyLXpvb20tY29udGFpbmVyJyxcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBPYnNlcnZlclxuICAgICAgICAgICAgb2JzZXJ2ZXI6IGZhbHNlLFxuICAgICAgICAgICAgb2JzZXJ2ZVBhcmVudHM6IGZhbHNlLFxuICAgICAgICAgICAgLy8gQWNjZXNzaWJpbGl0eVxuICAgICAgICAgICAgYTExeTogZmFsc2UsXG4gICAgICAgICAgICBwcmV2U2xpZGVNZXNzYWdlOiAnUHJldmlvdXMgc2xpZGUnLFxuICAgICAgICAgICAgbmV4dFNsaWRlTWVzc2FnZTogJ05leHQgc2xpZGUnLFxuICAgICAgICAgICAgZmlyc3RTbGlkZU1lc3NhZ2U6ICdUaGlzIGlzIHRoZSBmaXJzdCBzbGlkZScsXG4gICAgICAgICAgICBsYXN0U2xpZGVNZXNzYWdlOiAnVGhpcyBpcyB0aGUgbGFzdCBzbGlkZScsXG4gICAgICAgICAgICBwYWdpbmF0aW9uQnVsbGV0TWVzc2FnZTogJ0dvIHRvIHNsaWRlIHt7aW5kZXh9fScsXG4gICAgICAgICAgICAvLyBDYWxsYmFja3NcbiAgICAgICAgICAgIHJ1bkNhbGxiYWNrc09uSW5pdDogdHJ1ZVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIENhbGxiYWNrczpcbiAgICAgICAgICAgIG9uSW5pdDogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uRGVzdHJveTogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uQmVmb3JlUmVzaXplOiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25BZnRlclJlc2l6ZTogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIChzd2lwZXIsIGUpXG4gICAgICAgICAgICBvblRhcDogZnVuY3Rpb24gKHN3aXBlciwgZSlcbiAgICAgICAgICAgIG9uRG91YmxlVGFwOiBmdW5jdGlvbiAoc3dpcGVyLCBlKVxuICAgICAgICAgICAgb25TbGlkZXJNb3ZlOiBmdW5jdGlvbiAoc3dpcGVyLCBlKVxuICAgICAgICAgICAgb25TbGlkZUNoYW5nZVN0YXJ0OiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25TbGlkZUNoYW5nZUVuZDogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvblN0YXJ0OiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25JbWFnZXNSZWFkeTogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uIChzd2lwZXIsIHByb2dyZXNzKVxuICAgICAgICAgICAgb25Ub3VjaFN0YXJ0OiBmdW5jdGlvbiAoc3dpcGVyLCBlKVxuICAgICAgICAgICAgb25Ub3VjaE1vdmU6IGZ1bmN0aW9uIChzd2lwZXIsIGUpXG4gICAgICAgICAgICBvblRvdWNoTW92ZU9wcG9zaXRlOiBmdW5jdGlvbiAoc3dpcGVyLCBlKVxuICAgICAgICAgICAgb25Ub3VjaEVuZDogZnVuY3Rpb24gKHN3aXBlciwgZSlcbiAgICAgICAgICAgIG9uUmVhY2hCZWdpbm5pbmc6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvblJlYWNoRW5kOiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25TZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiAoc3dpcGVyLCBkdXJhdGlvbilcbiAgICAgICAgICAgIG9uU2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoc3dpcGVyLCB0cmFuc2xhdGUpXG4gICAgICAgICAgICBvbkF1dG9wbGF5U3RhcnQ6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvbkF1dG9wbGF5U3RvcDogZnVuY3Rpb24gKHN3aXBlciksXG4gICAgICAgICAgICBvbkxhenlJbWFnZUxvYWQ6IGZ1bmN0aW9uIChzd2lwZXIsIHNsaWRlLCBpbWFnZSlcbiAgICAgICAgICAgIG9uTGF6eUltYWdlUmVhZHk6IGZ1bmN0aW9uIChzd2lwZXIsIHNsaWRlLCBpbWFnZSlcbiAgICAgICAgICAgIG9uS2V5UHJlc3M6IGZ1bmN0aW9uIChzd2lwZXIsIGtleUNvZGUpXG4gICAgICAgICAgICAqL1xuICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGluaXRpYWxWaXJ0dWFsVHJhbnNsYXRlID0gcGFyYW1zICYmIHBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlO1xuICAgICAgICBcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgICB2YXIgb3JpZ2luYWxQYXJhbXMgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1twYXJhbV0gPT09ICdvYmplY3QnICYmIHBhcmFtc1twYXJhbV0gIT09IG51bGwgJiYgIShwYXJhbXNbcGFyYW1dLm5vZGVUeXBlIHx8IHBhcmFtc1twYXJhbV0gPT09IHdpbmRvdyB8fCBwYXJhbXNbcGFyYW1dID09PSBkb2N1bWVudCB8fCAodHlwZW9mIERvbTcgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1twYXJhbV0gaW5zdGFuY2VvZiBEb203KSB8fCAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zW3BhcmFtXSBpbnN0YW5jZW9mIGpRdWVyeSkpKSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxQYXJhbXNbcGFyYW1dID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZGVlcFBhcmFtIGluIHBhcmFtc1twYXJhbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQYXJhbXNbcGFyYW1dW2RlZXBQYXJhbV0gPSBwYXJhbXNbcGFyYW1dW2RlZXBQYXJhbV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxQYXJhbXNbcGFyYW1dID0gcGFyYW1zW3BhcmFtXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBkZWYgaW4gZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zW2RlZl0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2RlZl0gPSBkZWZhdWx0c1tkZWZdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHBhcmFtc1tkZWZdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGRlZXBEZWYgaW4gZGVmYXVsdHNbZGVmXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1tkZWZdW2RlZXBEZWZdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zW2RlZl1bZGVlcERlZl0gPSBkZWZhdWx0c1tkZWZdW2RlZXBEZWZdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTd2lwZXJcbiAgICAgICAgdmFyIHMgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgLy8gUGFyYW1zXG4gICAgICAgIHMucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICBzLm9yaWdpbmFsUGFyYW1zID0gb3JpZ2luYWxQYXJhbXM7XG4gICAgICAgIFxuICAgICAgICAvLyBDbGFzc25hbWVcbiAgICAgICAgcy5jbGFzc05hbWVzID0gW107XG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIERvbSBMaWJyYXJ5IGFuZCBwbHVnaW5zXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgaWYgKHR5cGVvZiAkICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRG9tNyAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgJCA9IERvbTc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiAkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBEb203ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICQgPSB3aW5kb3cuRG9tNyB8fCB3aW5kb3cuWmVwdG8gfHwgd2luZG93LmpRdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQgPSBEb203O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEkKSByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhwb3J0IGl0IHRvIFN3aXBlciBpbnN0YW5jZVxuICAgICAgICBzLiQgPSAkO1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgQnJlYWtwb2ludHNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmN1cnJlbnRCcmVha3BvaW50ID0gdW5kZWZpbmVkO1xuICAgICAgICBzLmdldEFjdGl2ZUJyZWFrcG9pbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL0dldCBicmVha3BvaW50IGZvciB3aW5kb3cgd2lkdGhcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYnJlYWtwb2ludHMpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHZhciBicmVha3BvaW50ID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gW10sIHBvaW50O1xuICAgICAgICAgICAgZm9yICggcG9pbnQgaW4gcy5wYXJhbXMuYnJlYWtwb2ludHMgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmJyZWFrcG9pbnRzLmhhc093blByb3BlcnR5KHBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChwb2ludCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9pbnRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoYSwgMTApID4gcGFyc2VJbnQoYiwgMTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBvaW50ID0gcG9pbnRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChwb2ludCA+PSB3aW5kb3cuaW5uZXJXaWR0aCAmJiAhYnJlYWtwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50ID0gcG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJyZWFrcG9pbnQgfHwgJ21heCc7XG4gICAgICAgIH07XG4gICAgICAgIHMuc2V0QnJlYWtwb2ludCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vU2V0IGJyZWFrcG9pbnQgZm9yIHdpbmRvdyB3aWR0aCBhbmQgdXBkYXRlIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIHZhciBicmVha3BvaW50ID0gcy5nZXRBY3RpdmVCcmVha3BvaW50KCk7XG4gICAgICAgICAgICBpZiAoYnJlYWtwb2ludCAmJiBzLmN1cnJlbnRCcmVha3BvaW50ICE9PSBicmVha3BvaW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJyZWFrUG9pbnRzUGFyYW1zID0gYnJlYWtwb2ludCBpbiBzLnBhcmFtcy5icmVha3BvaW50cyA/IHMucGFyYW1zLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdIDogcy5vcmlnaW5hbFBhcmFtcztcbiAgICAgICAgICAgICAgICB2YXIgbmVlZHNSZUxvb3AgPSBzLnBhcmFtcy5sb29wICYmIChicmVha1BvaW50c1BhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTtcbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgcGFyYW0gaW4gYnJlYWtQb2ludHNQYXJhbXMgKSB7XG4gICAgICAgICAgICAgICAgICAgIHMucGFyYW1zW3BhcmFtXSA9IGJyZWFrUG9pbnRzUGFyYW1zW3BhcmFtXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcy5jdXJyZW50QnJlYWtwb2ludCA9IGJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgaWYobmVlZHNSZUxvb3AgJiYgcy5kZXN0cm95TG9vcCkge1xuICAgICAgICAgICAgICAgICAgICBzLnJlTG9vcCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIFNldCBicmVha3BvaW50IG9uIGxvYWRcbiAgICAgICAgaWYgKHMucGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICBzLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgUHJlcGFyYXRpb24gLSBEZWZpbmUgQ29udGFpbmVyLCBXcmFwcGVyIGFuZCBQYWdpbmF0aW9uXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5jb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG4gICAgICAgIGlmIChzLmNvbnRhaW5lci5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgaWYgKHMuY29udGFpbmVyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBzd2lwZXJzID0gW107XG4gICAgICAgICAgICBzLmNvbnRhaW5lci5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgICAgICAgICBzd2lwZXJzLnB1c2gobmV3IFN3aXBlcih0aGlzLCBwYXJhbXMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN3aXBlcnM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFNhdmUgaW5zdGFuY2UgaW4gY29udGFpbmVyIEhUTUwgRWxlbWVudCBhbmQgaW4gZGF0YVxuICAgICAgICBzLmNvbnRhaW5lclswXS5zd2lwZXIgPSBzO1xuICAgICAgICBzLmNvbnRhaW5lci5kYXRhKCdzd2lwZXInLCBzKTtcbiAgICAgICAgXG4gICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyBzLnBhcmFtcy5kaXJlY3Rpb24pO1xuICAgICAgICBcbiAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgJ2ZyZWUtbW9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcy5zdXBwb3J0LmZsZXhib3gpIHtcbiAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnbm8tZmxleGJveCcpO1xuICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocy5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgcy5jbGFzc05hbWVzLnB1c2gocy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyArICdhdXRvaGVpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5hYmxlIHNsaWRlcyBwcm9ncmVzcyB3aGVuIHJlcXVpcmVkXG4gICAgICAgIGlmIChzLnBhcmFtcy5wYXJhbGxheCB8fCBzLnBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIE1heCByZXNpc3RhbmNlIHdoZW4gdG91Y2hSZWxlYXNlT25FZGdlc1xuICAgICAgICBpZiAocy5wYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgICAgICAgICAgcy5wYXJhbXMucmVzaXN0YW5jZVJhdGlvID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb3ZlcmZsb3cgLyAzRFxuICAgICAgICBpZiAoWydjdWJlJywgJ2NvdmVyZmxvdycsICdmbGlwJ10uaW5kZXhPZihzLnBhcmFtcy5lZmZlY3QpID49IDApIHtcbiAgICAgICAgICAgIGlmIChzLnN1cHBvcnQudHJhbnNmb3JtczNkKSB7XG4gICAgICAgICAgICAgICAgcy5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcy5jbGFzc05hbWVzLnB1c2gocy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyArICczZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy5wYXJhbXMuZWZmZWN0ID0gJ3NsaWRlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgcy5wYXJhbXMuZWZmZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ID09PSAnY3ViZScpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLnJlc2lzdGFuY2VSYXRpbyA9IDA7XG4gICAgICAgICAgICBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID0gMTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbiA9IDE7XG4gICAgICAgICAgICBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA9IDE7XG4gICAgICAgICAgICBzLnBhcmFtcy5jZW50ZXJlZFNsaWRlcyA9IGZhbHNlO1xuICAgICAgICAgICAgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuID0gMDtcbiAgICAgICAgICAgIHMucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzLnBhcmFtcy5lZmZlY3QgPT09ICdmYWRlJyB8fCBzLnBhcmFtcy5lZmZlY3QgPT09ICdmbGlwJykge1xuICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9IDE7XG4gICAgICAgICAgICBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPSAxO1xuICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPSAxO1xuICAgICAgICAgICAgcy5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICBzLnBhcmFtcy5zcGFjZUJldHdlZW4gPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsVmlydHVhbFRyYW5zbGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gR3JhYiBDdXJzb3JcbiAgICAgICAgaWYgKHMucGFyYW1zLmdyYWJDdXJzb3IgJiYgcy5zdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5ncmFiQ3Vyc29yID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFdyYXBwZXJcbiAgICAgICAgcy53cmFwcGVyID0gcy5jb250YWluZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMud3JhcHBlckNsYXNzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFBhZ2luYXRpb25cbiAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lciA9ICQocy5wYXJhbXMucGFnaW5hdGlvbik7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHMucGFyYW1zLnBhZ2luYXRpb24gPT09ICdzdHJpbmcnICYmIHMucGFnaW5hdGlvbkNvbnRhaW5lci5sZW5ndGggPiAxICYmIHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMucGFnaW5hdGlvbikubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyID0gcy5jb250YWluZXIuZmluZChzLnBhcmFtcy5wYWdpbmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdidWxsZXRzJyAmJiBzLnBhcmFtcy5wYWdpbmF0aW9uQ2xpY2thYmxlKSB7XG4gICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmFkZENsYXNzKHMucGFyYW1zLnBhZ2luYXRpb25Nb2RpZmllckNsYXNzICsgJ2NsaWNrYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy5wYXJhbXMucGFnaW5hdGlvbkNsaWNrYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmFkZENsYXNzKHMucGFyYW1zLnBhZ2luYXRpb25Nb2RpZmllckNsYXNzICsgcy5wYXJhbXMucGFnaW5hdGlvblR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5leHQvUHJldiBCdXR0b25zXG4gICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uIHx8IHMucGFyYW1zLnByZXZCdXR0b24pIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgcy5uZXh0QnV0dG9uID0gJChzLnBhcmFtcy5uZXh0QnV0dG9uKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHMucGFyYW1zLm5leHRCdXR0b24gPT09ICdzdHJpbmcnICYmIHMubmV4dEJ1dHRvbi5sZW5ndGggPiAxICYmIHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMubmV4dEJ1dHRvbikubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHMubmV4dEJ1dHRvbiA9IHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMubmV4dEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnByZXZCdXR0b24pIHtcbiAgICAgICAgICAgICAgICBzLnByZXZCdXR0b24gPSAkKHMucGFyYW1zLnByZXZCdXR0b24pO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2Ygcy5wYXJhbXMucHJldkJ1dHRvbiA9PT0gJ3N0cmluZycgJiYgcy5wcmV2QnV0dG9uLmxlbmd0aCA+IDEgJiYgcy5jb250YWluZXIuZmluZChzLnBhcmFtcy5wcmV2QnV0dG9uKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5wcmV2QnV0dG9uID0gcy5jb250YWluZXIuZmluZChzLnBhcmFtcy5wcmV2QnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIElzIEhvcml6b250YWxcbiAgICAgICAgcy5pc0hvcml6b250YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHMuaXNIID0gaXNIO1xuICAgICAgICBcbiAgICAgICAgLy8gUlRMXG4gICAgICAgIHMucnRsID0gcy5pc0hvcml6b250YWwoKSAmJiAocy5jb250YWluZXJbMF0uZGlyLnRvTG93ZXJDYXNlKCkgPT09ICdydGwnIHx8IHMuY29udGFpbmVyLmNzcygnZGlyZWN0aW9uJykgPT09ICdydGwnKTtcbiAgICAgICAgaWYgKHMucnRsKSB7XG4gICAgICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgJ3J0bCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBXcm9uZyBSVEwgc3VwcG9ydFxuICAgICAgICBpZiAocy5ydGwpIHtcbiAgICAgICAgICAgIHMud3JvbmdSVEwgPSBzLndyYXBwZXIuY3NzKCdkaXNwbGF5JykgPT09ICctd2Via2l0LWJveCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIENvbHVtbnNcbiAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbiA+IDEpIHtcbiAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnbXVsdGlyb3cnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQ2hlY2sgZm9yIEFuZHJvaWRcbiAgICAgICAgaWYgKHMuZGV2aWNlLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnYW5kcm9pZCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgY2xhc3Nlc1xuICAgICAgICBzLmNvbnRhaW5lci5hZGRDbGFzcyhzLmNsYXNzTmFtZXMuam9pbignICcpKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRyYW5zbGF0ZVxuICAgICAgICBzLnRyYW5zbGF0ZSA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBQcm9ncmVzc1xuICAgICAgICBzLnByb2dyZXNzID0gMDtcbiAgICAgICAgXG4gICAgICAgIC8vIFZlbG9jaXR5XG4gICAgICAgIHMudmVsb2NpdHkgPSAwO1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgTG9ja3MsIHVubG9ja3NcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmxvY2tTd2lwZVRvTmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID09PSBmYWxzZSAmJiBzLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgcy51bnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy5sb2NrU3dpcGVUb1ByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9PT0gZmFsc2UgJiYgcy5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgICAgICAgIHMudW5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMubG9ja1N3aXBlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZ3JhYkN1cnNvcikgcy51bnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy51bmxvY2tTd2lwZVRvTmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgPT09IHRydWUgJiYgcy5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgICAgICAgIHMuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLnVubG9ja1N3aXBlVG9QcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9IHRydWU7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9PT0gdHJ1ZSAmJiBzLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgcy5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMudW5sb2NrU3dpcGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9IHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmdyYWJDdXJzb3IpIHMuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgUm91bmQgaGVscGVyXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgZnVuY3Rpb24gcm91bmQoYSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYSk7XG4gICAgICAgIH1cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgU2V0IGdyYWIgY3Vyc29yXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5zZXRHcmFiQ3Vyc29yID0gZnVuY3Rpb24obW92aW5nKSB7XG4gICAgICAgICAgICBzLmNvbnRhaW5lclswXS5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gICAgICAgICAgICBzLmNvbnRhaW5lclswXS5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnLXdlYmtpdC1ncmFiYmluZycgOiAnLXdlYmtpdC1ncmFiJztcbiAgICAgICAgICAgIHMuY29udGFpbmVyWzBdLnN0eWxlLmN1cnNvciA9IG1vdmluZyA/ICctbW96LWdyYWJiaW4nIDogJy1tb3otZ3JhYic7XG4gICAgICAgICAgICBzLmNvbnRhaW5lclswXS5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnZ3JhYmJpbmcnOiAnZ3JhYic7XG4gICAgICAgIH07XG4gICAgICAgIHMudW5zZXRHcmFiQ3Vyc29yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5jb250YWluZXJbMF0uc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgICBzLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfVxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBVcGRhdGUgb24gSW1hZ2VzIFJlYWR5XG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5pbWFnZXNUb0xvYWQgPSBbXTtcbiAgICAgICAgcy5pbWFnZXNMb2FkZWQgPSAwO1xuICAgICAgICBcbiAgICAgICAgcy5sb2FkSW1hZ2UgPSBmdW5jdGlvbiAoaW1nRWxlbWVudCwgc3JjLCBzcmNzZXQsIHNpemVzLCBjaGVja0ZvckNvbXBsZXRlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGltYWdlO1xuICAgICAgICAgICAgZnVuY3Rpb24gb25SZWFkeSAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpbWdFbGVtZW50LmNvbXBsZXRlIHx8ICFjaGVja0ZvckNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gb25SZWFkeTtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9IG9uUmVhZHk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc2l6ZXMgPSBzaXplcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Jjc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZS5zcmNzZXQgPSBzcmNzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Ugey8vaW1hZ2UgYWxyZWFkeSBsb2FkZWQuLi5cbiAgICAgICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMucHJlbG9hZEltYWdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMuaW1hZ2VzVG9Mb2FkID0gcy5jb250YWluZXIuZmluZCgnaW1nJyk7XG4gICAgICAgICAgICBmdW5jdGlvbiBfb25SZWFkeSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHMgPT09ICd1bmRlZmluZWQnIHx8IHMgPT09IG51bGwgfHwgIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAocy5pbWFnZXNMb2FkZWQgIT09IHVuZGVmaW5lZCkgcy5pbWFnZXNMb2FkZWQrKztcbiAgICAgICAgICAgICAgICBpZiAocy5pbWFnZXNMb2FkZWQgPT09IHMuaW1hZ2VzVG9Mb2FkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMudXBkYXRlT25JbWFnZXNSZWFkeSkgcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkltYWdlc1JlYWR5Jywgcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmltYWdlc1RvTG9hZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHMubG9hZEltYWdlKHMuaW1hZ2VzVG9Mb2FkW2ldLCAocy5pbWFnZXNUb0xvYWRbaV0uY3VycmVudFNyYyB8fCBzLmltYWdlc1RvTG9hZFtpXS5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwgKHMuaW1hZ2VzVG9Mb2FkW2ldLnNyY3NldCB8fCBzLmltYWdlc1RvTG9hZFtpXS5nZXRBdHRyaWJ1dGUoJ3NyY3NldCcpKSwgcy5pbWFnZXNUb0xvYWRbaV0uc2l6ZXMgfHwgcy5pbWFnZXNUb0xvYWRbaV0uZ2V0QXR0cmlidXRlKCdzaXplcycpLCB0cnVlLCBfb25SZWFkeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBBdXRvcGxheVxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuYXV0b3BsYXlUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHMuYXV0b3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgcy5hdXRvcGxheVBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBmdW5jdGlvbiBhdXRvcGxheSgpIHtcbiAgICAgICAgICAgIHZhciBhdXRvcGxheURlbGF5ID0gcy5wYXJhbXMuYXV0b3BsYXk7XG4gICAgICAgICAgICB2YXIgYWN0aXZlU2xpZGUgPSBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1hdXRvcGxheScpKSB7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlEZWxheSA9IGFjdGl2ZVNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLWF1dG9wbGF5JykgfHwgcy5wYXJhbXMuYXV0b3BsYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmF1dG9wbGF5VGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgcy5maXhMb29wKCk7XG4gICAgICAgICAgICAgICAgICAgIHMuX3NsaWRlTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uQXV0b3BsYXknLCBzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcy5pc0VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5fc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uQXV0b3BsYXknLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFyYW1zLmF1dG9wbGF5U3RvcE9uTGFzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuX3NsaWRlVG8oMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkF1dG9wbGF5Jywgcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgYXV0b3BsYXlEZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgcy5zdGFydEF1dG9wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzLmF1dG9wbGF5VGltZW91dElkICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5hdXRvcGxheSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKHMuYXV0b3BsYXlpbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHMuYXV0b3BsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgcy5lbWl0KCdvbkF1dG9wbGF5U3RhcnQnLCBzKTtcbiAgICAgICAgICAgIGF1dG9wbGF5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHMuc3RvcEF1dG9wbGF5ID0gZnVuY3Rpb24gKGludGVybmFsKSB7XG4gICAgICAgICAgICBpZiAoIXMuYXV0b3BsYXlUaW1lb3V0SWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChzLmF1dG9wbGF5VGltZW91dElkKSBjbGVhclRpbWVvdXQocy5hdXRvcGxheVRpbWVvdXRJZCk7XG4gICAgICAgICAgICBzLmF1dG9wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBzLmF1dG9wbGF5VGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcy5lbWl0KCdvbkF1dG9wbGF5U3RvcCcsIHMpO1xuICAgICAgICB9O1xuICAgICAgICBzLnBhdXNlQXV0b3BsYXkgPSBmdW5jdGlvbiAoc3BlZWQpIHtcbiAgICAgICAgICAgIGlmIChzLmF1dG9wbGF5UGF1c2VkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAocy5hdXRvcGxheVRpbWVvdXRJZCkgY2xlYXJUaW1lb3V0KHMuYXV0b3BsYXlUaW1lb3V0SWQpO1xuICAgICAgICAgICAgcy5hdXRvcGxheVBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzLmF1dG9wbGF5UGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHMuYXV0b3BsYXlQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzLmF1dG9wbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBNaW4vTWF4IFRyYW5zbGF0ZVxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMubWluVHJhbnNsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICgtcy5zbmFwR3JpZFswXSk7XG4gICAgICAgIH07XG4gICAgICAgIHMubWF4VHJhbnNsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICgtcy5zbmFwR3JpZFtzLnNuYXBHcmlkLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgU2xpZGVyL3NsaWRlcyBzaXplc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmVTbGlkZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBuZXdIZWlnaHQgPSAwO1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRmluZCBzbGlkZXMgY3VycmVudGx5IGluIHZpZXdcbiAgICAgICAgICAgIGlmKHMucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwocy5wYXJhbXMuc2xpZGVzUGVyVmlldyk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBzLmFjdGl2ZUluZGV4ICsgaTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPiBzLnNsaWRlcy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChzLnNsaWRlcy5lcShpbmRleClbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVzLnB1c2gocy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleClbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEZpbmQgbmV3IGhlaWdodCBmcm9tIGhlaWdoZXN0IHNsaWRlIGluIHZpZXdcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhY3RpdmVTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGl2ZVNsaWRlc1tpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IGFjdGl2ZVNsaWRlc1tpXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IGhlaWdodCA+IG5ld0hlaWdodCA/IGhlaWdodCA6IG5ld0hlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIEhlaWdodFxuICAgICAgICAgICAgaWYgKG5ld0hlaWdodCkgcy53cmFwcGVyLmNzcygnaGVpZ2h0JywgbmV3SGVpZ2h0ICsgJ3B4Jyk7XG4gICAgICAgIH07XG4gICAgICAgIHMudXBkYXRlQ29udGFpbmVyU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCwgaGVpZ2h0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzLnBhcmFtcy53aWR0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IHMucGFyYW1zLndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBzLmNvbnRhaW5lclswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5wYXJhbXMuaGVpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHMucGFyYW1zLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHMuY29udGFpbmVyWzBdLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3aWR0aCA9PT0gMCAmJiBzLmlzSG9yaXpvbnRhbCgpIHx8IGhlaWdodCA9PT0gMCAmJiAhcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvL1N1YnRyYWN0IHBhZGRpbmdzXG4gICAgICAgICAgICB3aWR0aCA9IHdpZHRoIC0gcGFyc2VJbnQocy5jb250YWluZXIuY3NzKCdwYWRkaW5nLWxlZnQnKSwgMTApIC0gcGFyc2VJbnQocy5jb250YWluZXIuY3NzKCdwYWRkaW5nLXJpZ2h0JyksIDEwKTtcbiAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCAtIHBhcnNlSW50KHMuY29udGFpbmVyLmNzcygncGFkZGluZy10b3AnKSwgMTApIC0gcGFyc2VJbnQocy5jb250YWluZXIuY3NzKCdwYWRkaW5nLWJvdHRvbScpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gU3RvcmUgdmFsdWVzXG4gICAgICAgICAgICBzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICBzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHMuc2l6ZSA9IHMuaXNIb3Jpem9udGFsKCkgPyBzLndpZHRoIDogcy5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzLnVwZGF0ZVNsaWRlc1NpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnNsaWRlcyA9IHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKTtcbiAgICAgICAgICAgIHMuc25hcEdyaWQgPSBbXTtcbiAgICAgICAgICAgIHMuc2xpZGVzR3JpZCA9IFtdO1xuICAgICAgICAgICAgcy5zbGlkZXNTaXplc0dyaWQgPSBbXTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3BhY2VCZXR3ZWVuID0gcy5wYXJhbXMuc3BhY2VCZXR3ZWVuLFxuICAgICAgICAgICAgICAgIHNsaWRlUG9zaXRpb24gPSAtcy5wYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlLFxuICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgcHJldlNsaWRlU2l6ZSA9IDAsXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzLnNpemUgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gJ3N0cmluZycgJiYgc3BhY2VCZXR3ZWVuLmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4ucmVwbGFjZSgnJScsICcnKSkgLyAxMDAgKiBzLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcy52aXJ0dWFsU2l6ZSA9IC1zcGFjZUJldHdlZW47XG4gICAgICAgICAgICAvLyByZXNldCBtYXJnaW5zXG4gICAgICAgICAgICBpZiAocy5ydGwpIHMuc2xpZGVzLmNzcyh7bWFyZ2luTGVmdDogJycsIG1hcmdpblRvcDogJyd9KTtcbiAgICAgICAgICAgIGVsc2Ugcy5zbGlkZXMuY3NzKHttYXJnaW5SaWdodDogJycsIG1hcmdpbkJvdHRvbTogJyd9KTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguZmxvb3Iocy5zbGlkZXMubGVuZ3RoIC8gcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSA9PT0gcy5zbGlkZXMubGVuZ3RoIC8gcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgPSBzLnNsaWRlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gTWF0aC5jZWlsKHMuc2xpZGVzLmxlbmd0aCAvIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbikgKiBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uRmlsbCA9PT0gJ3JvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IE1hdGgubWF4KHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MsIHMucGFyYW1zLnNsaWRlc1BlclZpZXcgKiBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBDYWxjIHNsaWRlc1xuICAgICAgICAgICAgdmFyIHNsaWRlU2l6ZTtcbiAgICAgICAgICAgIHZhciBzbGlkZXNQZXJDb2x1bW4gPSBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW47XG4gICAgICAgICAgICB2YXIgc2xpZGVzUGVyUm93ID0gc2xpZGVzTnVtYmVyRXZlblRvUm93cyAvIHNsaWRlc1BlckNvbHVtbjtcbiAgICAgICAgICAgIHZhciBudW1GdWxsQ29sdW1ucyA9IHNsaWRlc1BlclJvdyAtIChzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gKiBzbGlkZXNQZXJSb3cgLSBzLnNsaWRlcy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVTaXplID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgc2xpZGVzIG9yZGVyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTbGlkZU9yZGVySW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2x1bW4sIHJvdztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbkZpbGwgPT09ICdjb2x1bW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKGkgLyBzbGlkZXNQZXJDb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gaSAtIGNvbHVtbiAqIHNsaWRlc1BlckNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4gPiBudW1GdWxsQ29sdW1ucyB8fCAoY29sdW1uID09PSBudW1GdWxsQ29sdW1ucyAmJiByb3cgPT09IHNsaWRlc1BlckNvbHVtbi0xKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK3JvdyA+PSBzbGlkZXNQZXJDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2xpZGVPcmRlckluZGV4ID0gY29sdW1uICsgcm93ICogc2xpZGVzTnVtYmVyRXZlblRvUm93cyAvIHNsaWRlc1BlckNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICctd2Via2l0LWJveC1vcmRpbmFsLWdyb3VwJzogbmV3U2xpZGVPcmRlckluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLW1vei1ib3gtb3JkaW5hbC1ncm91cCc6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy1tcy1mbGV4LW9yZGVyJzogbmV3U2xpZGVPcmRlckluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC1vcmRlcic6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29yZGVyJzogbmV3U2xpZGVPcmRlckluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmZsb29yKGkgLyBzbGlkZXNQZXJSb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gaSAtIHJvdyAqIHNsaWRlc1BlclJvdztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbGlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luLScgKyAocy5pc0hvcml6b250YWwoKSA/ICd0b3AnIDogJ2xlZnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocm93ICE9PSAwICYmIHMucGFyYW1zLnNwYWNlQmV0d2VlbikgJiYgKHMucGFyYW1zLnNwYWNlQmV0d2VlbiArICdweCcpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zd2lwZXItY29sdW1uJywgY29sdW1uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc3dpcGVyLXJvdycsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2xpZGUuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZVNpemUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUub3V0ZXJXaWR0aCh0cnVlKSA6IHNsaWRlLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVNpemUgPSByb3VuZChzbGlkZVNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVTaXplID0gKHMuc2l6ZSAtIChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3IC0gMSkgKiBzcGFjZUJldHdlZW4pIC8gcy5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gcm91bmQoc2xpZGVTaXplKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1tpXS5zdHlsZS53aWR0aCA9IHNsaWRlU2l6ZSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1tpXS5zdHlsZS5oZWlnaHQgPSBzbGlkZVNpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMuc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICAgICAgICAgICAgICBzLnNsaWRlc1NpemVzR3JpZC5wdXNoKHNsaWRlU2l6ZSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgLyAyICsgcHJldlNsaWRlU2l6ZSAvIDIgKyBzcGFjZUJldHdlZW47XG4gICAgICAgICAgICAgICAgICAgIGlmKHByZXZTbGlkZVNpemUgPT09IDAgJiYgaSAhPT0gMCkgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSBzLnNpemUgLyAyIC0gc3BhY2VCZXR3ZWVuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSBzLnNpemUgLyAyIC0gc3BhY2VCZXR3ZWVuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoc2xpZGVQb3NpdGlvbikgPCAxIC8gMTAwMCkgc2xpZGVQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoaW5kZXgpICUgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHMuc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGluZGV4KSAlIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSBzLnNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHMudmlydHVhbFNpemUgKz0gc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBwcmV2U2xpZGVTaXplID0gc2xpZGVTaXplO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpbmRleCArKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMudmlydHVhbFNpemUgPSBNYXRoLm1heChzLnZpcnR1YWxTaXplLCBzLnNpemUpICsgcy5wYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXI7XG4gICAgICAgICAgICB2YXIgbmV3U2xpZGVzR3JpZDtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgcy5ydGwgJiYgcy53cm9uZ1JUTCAmJiAocy5wYXJhbXMuZWZmZWN0ID09PSAnc2xpZGUnIHx8IHMucGFyYW1zLmVmZmVjdCA9PT0gJ2NvdmVyZmxvdycpKSB7XG4gICAgICAgICAgICAgICAgcy53cmFwcGVyLmNzcyh7d2lkdGg6IHMudmlydHVhbFNpemUgKyBzLnBhcmFtcy5zcGFjZUJldHdlZW4gKyAncHgnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXMuc3VwcG9ydC5mbGV4Ym94IHx8IHMucGFyYW1zLnNldFdyYXBwZXJTaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHMud3JhcHBlci5jc3Moe3dpZHRoOiBzLnZpcnR1YWxTaXplICsgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuICsgJ3B4J30pO1xuICAgICAgICAgICAgICAgIGVsc2Ugcy53cmFwcGVyLmNzcyh7aGVpZ2h0OiBzLnZpcnR1YWxTaXplICsgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuICsgJ3B4J30pO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgcy52aXJ0dWFsU2l6ZSA9IChzbGlkZVNpemUgKyBzLnBhcmFtcy5zcGFjZUJldHdlZW4pICogc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgICAgICAgICAgICAgICBzLnZpcnR1YWxTaXplID0gTWF0aC5jZWlsKHMudmlydHVhbFNpemUgLyBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pIC0gcy5wYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSBzLndyYXBwZXIuY3NzKHt3aWR0aDogcy52aXJ0dWFsU2l6ZSArIHMucGFyYW1zLnNwYWNlQmV0d2VlbiArICdweCd9KTtcbiAgICAgICAgICAgICAgICBlbHNlIHMud3JhcHBlci5jc3Moe2hlaWdodDogcy52aXJ0dWFsU2l6ZSArIHMucGFyYW1zLnNwYWNlQmV0d2VlbiArICdweCd9KTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2xpZGVzR3JpZCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcy5zbmFwR3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuc25hcEdyaWRbaV0gPCBzLnZpcnR1YWxTaXplICsgcy5zbmFwR3JpZFswXSkgbmV3U2xpZGVzR3JpZC5wdXNoKHMuc25hcEdyaWRbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMuc25hcEdyaWQgPSBuZXdTbGlkZXNHcmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBSZW1vdmUgbGFzdCBncmlkIGVsZW1lbnRzIGRlcGVuZGluZyBvbiB3aWR0aFxuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgICAgICAgIG5ld1NsaWRlc0dyaWQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcy5zbmFwR3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5zbmFwR3JpZFtpXSA8PSBzLnZpcnR1YWxTaXplIC0gcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTbGlkZXNHcmlkLnB1c2gocy5zbmFwR3JpZFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcy5zbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguZmxvb3Iocy52aXJ0dWFsU2l6ZSAtIHMuc2l6ZSkgLSBNYXRoLmZsb29yKHMuc25hcEdyaWRbcy5zbmFwR3JpZC5sZW5ndGggLSAxXSkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc25hcEdyaWQucHVzaChzLnZpcnR1YWxTaXplIC0gcy5zaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5zbmFwR3JpZC5sZW5ndGggPT09IDApIHMuc25hcEdyaWQgPSBbMF07XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNwYWNlQmV0d2VlbiAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkgcy5zbGlkZXMuY3NzKHttYXJnaW5MZWZ0OiBzcGFjZUJldHdlZW4gKyAncHgnfSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugcy5zbGlkZXMuY3NzKHttYXJnaW5SaWdodDogc3BhY2VCZXR3ZWVuICsgJ3B4J30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHMuc2xpZGVzLmNzcyh7bWFyZ2luQm90dG9tOiBzcGFjZUJldHdlZW4gKyAncHgnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMudXBkYXRlU2xpZGVzT2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHMuc2xpZGVzW2ldLnN3aXBlclNsaWRlT2Zmc2V0ID0gcy5pc0hvcml6b250YWwoKSA/IHMuc2xpZGVzW2ldLm9mZnNldExlZnQgOiBzLnNsaWRlc1tpXS5vZmZzZXRUb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBEeW5hbWljIFNsaWRlcyBQZXIgVmlld1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuY3VycmVudFNsaWRlc1BlclZpZXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3B2ID0gMSwgaSwgajtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgICAgICAgIHZhciBzaXplID0gcy5zbGlkZXNbcy5hY3RpdmVJbmRleF0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgICAgICAgIHZhciBicmVha0xvb3A7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gcy5hY3RpdmVJbmRleCArIDE7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbaV0gJiYgIWJyZWFrTG9vcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSArPSBzLnNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcHYgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZSA+IHMuc2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGogPSBzLmFjdGl2ZUluZGV4IC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2xpZGVzW2pdICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgKz0gcy5zbGlkZXNbal0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3B2ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgPiBzLnNpemUpIGJyZWFrTG9vcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBzLmFjdGl2ZUluZGV4ICsgMTsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc0dyaWRbaV0gLSBzLnNsaWRlc0dyaWRbcy5hY3RpdmVJbmRleF0gPCBzLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwdisrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNwdjtcbiAgICAgICAgfTtcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgU2xpZGVyL3NsaWRlcyBwcm9ncmVzc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMudXBkYXRlU2xpZGVzUHJvZ3Jlc3MgPSBmdW5jdGlvbiAodHJhbnNsYXRlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRyYW5zbGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUgPSBzLnRyYW5zbGF0ZSB8fCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMuc2xpZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzLnNsaWRlc1swXS5zd2lwZXJTbGlkZU9mZnNldCA9PT0gJ3VuZGVmaW5lZCcpIHMudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIG9mZnNldENlbnRlciA9IC10cmFuc2xhdGU7XG4gICAgICAgICAgICBpZiAocy5ydGwpIG9mZnNldENlbnRlciA9IHRyYW5zbGF0ZTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBWaXNpYmxlIFNsaWRlc1xuICAgICAgICAgICAgcy5zbGlkZXMucmVtb3ZlQ2xhc3Mocy5wYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZVByb2dyZXNzID0gKG9mZnNldENlbnRlciArIChzLnBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHMubWluVHJhbnNsYXRlKCkgOiAwKSAtIHNsaWRlLnN3aXBlclNsaWRlT2Zmc2V0KSAvIChzbGlkZS5zd2lwZXJTbGlkZVNpemUgKyBzLnBhcmFtcy5zcGFjZUJldHdlZW4pO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlQmVmb3JlID0gLShvZmZzZXRDZW50ZXIgLSBzbGlkZS5zd2lwZXJTbGlkZU9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUFmdGVyID0gc2xpZGVCZWZvcmUgKyBzLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVmlzaWJsZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVCZWZvcmUgPj0gMCAmJiBzbGlkZUJlZm9yZSA8IHMuc2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChzbGlkZUFmdGVyID4gMCAmJiBzbGlkZUFmdGVyIDw9IHMuc2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChzbGlkZUJlZm9yZSA8PSAwICYmIHNsaWRlQWZ0ZXIgPj0gcy5zaXplKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXMuZXEoaSkuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNsaWRlLnByb2dyZXNzID0gcy5ydGwgPyAtc2xpZGVQcm9ncmVzcyA6IHNsaWRlUHJvZ3Jlc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMudXBkYXRlUHJvZ3Jlc3MgPSBmdW5jdGlvbiAodHJhbnNsYXRlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRyYW5zbGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUgPSBzLnRyYW5zbGF0ZSB8fCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZXNEaWZmID0gcy5tYXhUcmFuc2xhdGUoKSAtIHMubWluVHJhbnNsYXRlKCk7XG4gICAgICAgICAgICB2YXIgd2FzQmVnaW5uaW5nID0gcy5pc0JlZ2lubmluZztcbiAgICAgICAgICAgIHZhciB3YXNFbmQgPSBzLmlzRW5kO1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcy5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICAgICAgcy5pc0JlZ2lubmluZyA9IHMuaXNFbmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy5wcm9ncmVzcyA9ICh0cmFuc2xhdGUgLSBzLm1pblRyYW5zbGF0ZSgpKSAvICh0cmFuc2xhdGVzRGlmZik7XG4gICAgICAgICAgICAgICAgcy5pc0JlZ2lubmluZyA9IHMucHJvZ3Jlc3MgPD0gMDtcbiAgICAgICAgICAgICAgICBzLmlzRW5kID0gcy5wcm9ncmVzcyA+PSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMuaXNCZWdpbm5pbmcgJiYgIXdhc0JlZ2lubmluZykgcy5lbWl0KCdvblJlYWNoQmVnaW5uaW5nJywgcyk7XG4gICAgICAgICAgICBpZiAocy5pc0VuZCAmJiAhd2FzRW5kKSBzLmVtaXQoJ29uUmVhY2hFbmQnLCBzKTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykgcy51cGRhdGVTbGlkZXNQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICAgICAgICAgICAgcy5lbWl0KCdvblByb2dyZXNzJywgcywgcy5wcm9ncmVzcyk7XG4gICAgICAgIH07XG4gICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gcy5ydGwgPyBzLnRyYW5zbGF0ZSA6IC1zLnRyYW5zbGF0ZTtcbiAgICAgICAgICAgIHZhciBuZXdBY3RpdmVJbmRleCwgaSwgc25hcEluZGV4O1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuc2xpZGVzR3JpZC5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHMuc2xpZGVzR3JpZFtpICsgMV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGUgPj0gcy5zbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZSA8IHMuc2xpZGVzR3JpZFtpICsgMV0gLSAocy5zbGlkZXNHcmlkW2kgKyAxXSAtIHMuc2xpZGVzR3JpZFtpXSkgLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHJhbnNsYXRlID49IHMuc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzLnNsaWRlc0dyaWRbaSArIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IGkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRlID49IHMuc2xpZGVzR3JpZFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTm9ybWFsaXplIHNsaWRlSW5kZXhcbiAgICAgICAgICAgIGlmKHMucGFyYW1zLm5vcm1hbGl6ZVNsaWRlSW5kZXgpe1xuICAgICAgICAgICAgICAgIGlmIChuZXdBY3RpdmVJbmRleCA8IDAgfHwgdHlwZW9mIG5ld0FjdGl2ZUluZGV4ID09PSAndW5kZWZpbmVkJykgbmV3QWN0aXZlSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZm9yIChpID0gMDsgaSA8IHMuc2xpZGVzR3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIGlmICgtIHRyYW5zbGF0ZSA+PSBzLnNsaWRlc0dyaWRbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV3QWN0aXZlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHNuYXBJbmRleCA9IE1hdGguZmxvb3IobmV3QWN0aXZlSW5kZXggLyBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgICAgICAgICBpZiAoc25hcEluZGV4ID49IHMuc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzLnNuYXBHcmlkLmxlbmd0aCAtIDE7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKG5ld0FjdGl2ZUluZGV4ID09PSBzLmFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5zbmFwSW5kZXggPSBzbmFwSW5kZXg7XG4gICAgICAgICAgICBzLnByZXZpb3VzSW5kZXggPSBzLmFjdGl2ZUluZGV4O1xuICAgICAgICAgICAgcy5hY3RpdmVJbmRleCA9IG5ld0FjdGl2ZUluZGV4O1xuICAgICAgICAgICAgcy51cGRhdGVDbGFzc2VzKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZVJlYWxJbmRleCgpO1xuICAgICAgICB9O1xuICAgICAgICBzLnVwZGF0ZVJlYWxJbmRleCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzLnJlYWxJbmRleCA9IHBhcnNlSW50KHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgfHwgcy5hY3RpdmVJbmRleCwgMTApO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgQ2xhc3Nlc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMudXBkYXRlQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMuc2xpZGVzLnJlbW92ZUNsYXNzKHMucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MgKyAnICcgKyBzLnBhcmFtcy5zbGlkZU5leHRDbGFzcyArICcgJyArIHMucGFyYW1zLnNsaWRlUHJldkNsYXNzICsgJyAnICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyArICcgJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzICsgJyAnICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpO1xuICAgICAgICAgICAgdmFyIGFjdGl2ZVNsaWRlID0gcy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICAvLyBBY3RpdmUgY2xhc3Nlc1xuICAgICAgICAgICAgYWN0aXZlU2xpZGUuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAvLyBEdXBsaWNhdGUgdG8gYWxsIGxvb3BlZCBzbGlkZXNcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlU2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnOm5vdCguJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicgKyBzLnJlYWxJbmRleCArICdcIl0nKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJy4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgcy5yZWFsSW5kZXggKyAnXCJdJykuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTmV4dCBTbGlkZVxuICAgICAgICAgICAgdmFyIG5leHRTbGlkZSA9IGFjdGl2ZVNsaWRlLm5leHQoJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcykuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVOZXh0Q2xhc3MpO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3AgJiYgbmV4dFNsaWRlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG5leHRTbGlkZSA9IHMuc2xpZGVzLmVxKDApO1xuICAgICAgICAgICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQcmV2IFNsaWRlXG4gICAgICAgICAgICB2YXIgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCAmJiBwcmV2U2xpZGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJldlNsaWRlID0gcy5zbGlkZXMuZXEoLTEpO1xuICAgICAgICAgICAgICAgIHByZXZTbGlkZS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAvLyBEdXBsaWNhdGUgdG8gYWxsIGxvb3BlZCBzbGlkZXNcbiAgICAgICAgICAgICAgICBpZiAobmV4dFNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJzpub3QoLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJylbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgbmV4dFNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgKyAnXCJdJykuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicgKyBuZXh0U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSArICdcIl0nKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcmV2U2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnOm5vdCguJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicgKyBwcmV2U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSArICdcIl0nKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICcuJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIHByZXZTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpICsgJ1wiXScpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gUGFnaW5hdGlvblxuICAgICAgICAgICAgaWYgKHMucGFnaW5hdGlvbkNvbnRhaW5lciAmJiBzLnBhZ2luYXRpb25Db250YWluZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIEN1cnJlbnQvVG90YWxcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCxcbiAgICAgICAgICAgICAgICAgICAgdG90YWwgPSBzLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKChzLnNsaWRlcy5sZW5ndGggLSBzLmxvb3BlZFNsaWRlcyAqIDIpIC8gcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogcy5zbmFwR3JpZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IE1hdGguY2VpbCgocy5hY3RpdmVJbmRleCAtIHMubG9vcGVkU2xpZGVzKS9zLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gcy5zbGlkZXMubGVuZ3RoIC0gMSAtIHMubG9vcGVkU2xpZGVzICogMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQgLSAocy5zbGlkZXMubGVuZ3RoIC0gcy5sb29wZWRTbGlkZXMgKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHRvdGFsIC0gMSkgY3VycmVudCA9IGN1cnJlbnQgLSB0b3RhbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAwICYmIHMucGFyYW1zLnBhZ2luYXRpb25UeXBlICE9PSAnYnVsbGV0cycpIGN1cnJlbnQgPSB0b3RhbCArIGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHMuc25hcEluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHMuc25hcEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHMuYWN0aXZlSW5kZXggfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBUeXBlc1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSA9PT0gJ2J1bGxldHMnICYmIHMuYnVsbGV0cyAmJiBzLmJ1bGxldHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzLmJ1bGxldHMucmVtb3ZlQ2xhc3Mocy5wYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYWdpbmF0aW9uQ29udGFpbmVyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYnVsbGV0cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pbmRleCgpID09PSBjdXJyZW50KSAkKHRoaXMpLmFkZENsYXNzKHMucGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5idWxsZXRzLmVxKGN1cnJlbnQpLmFkZENsYXNzKHMucGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmZpbmQoJy4nICsgcy5wYXJhbXMucGFnaW5hdGlvbkN1cnJlbnRDbGFzcykudGV4dChjdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5maW5kKCcuJyArIHMucGFyYW1zLnBhZ2luYXRpb25Ub3RhbENsYXNzKS50ZXh0KHRvdGFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlID09PSAncHJvZ3Jlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY2FsZSA9IChjdXJyZW50ICsgMSkgLyB0b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlWCA9IHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVZID0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZVkgPSBzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlWCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmZpbmQoJy4nICsgcy5wYXJhbXMucGFnaW5hdGlvblByb2dyZXNzYmFyQ2xhc3MpLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlWCgnICsgc2NhbGVYICsgJykgc2NhbGVZKCcgKyBzY2FsZVkgKyAnKScpLnRyYW5zaXRpb24ocy5wYXJhbXMuc3BlZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdjdXN0b20nICYmIHMucGFyYW1zLnBhZ2luYXRpb25DdXN0b21SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmh0bWwocy5wYXJhbXMucGFnaW5hdGlvbkN1c3RvbVJlbmRlcihzLCBjdXJyZW50ICsgMSwgdG90YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblBhZ2luYXRpb25SZW5kZXJlZCcsIHMsIHMucGFnaW5hdGlvbkNvbnRhaW5lclswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIE5leHQvYWN0aXZlIGJ1dHRvbnNcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmV2QnV0dG9uICYmIHMucHJldkJ1dHRvbiAmJiBzLnByZXZCdXR0b24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5pc0JlZ2lubmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5wcmV2QnV0dG9uLmFkZENsYXNzKHMucGFyYW1zLmJ1dHRvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLmExMXkuZGlzYWJsZShzLnByZXZCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5wcmV2QnV0dG9uLnJlbW92ZUNsYXNzKHMucGFyYW1zLmJ1dHRvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLmExMXkuZW5hYmxlKHMucHJldkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLm5leHRCdXR0b24gJiYgcy5uZXh0QnV0dG9uICYmIHMubmV4dEJ1dHRvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmlzRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLm5leHRCdXR0b24uYWRkQ2xhc3Mocy5wYXJhbXMuYnV0dG9uRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMuYTExeS5kaXNhYmxlKHMubmV4dEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLm5leHRCdXR0b24ucmVtb3ZlQ2xhc3Mocy5wYXJhbXMuYnV0dG9uRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMuYTExeS5lbmFibGUocy5uZXh0QnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFBhZ2luYXRpb25cbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLnVwZGF0ZVBhZ2luYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLnBhZ2luYXRpb24pIHJldHVybjtcbiAgICAgICAgICAgIGlmIChzLnBhZ2luYXRpb25Db250YWluZXIgJiYgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFnaW5hdGlvbkhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdidWxsZXRzJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyT2ZCdWxsZXRzID0gcy5wYXJhbXMubG9vcCA/IE1hdGguY2VpbCgocy5zbGlkZXMubGVuZ3RoIC0gcy5sb29wZWRTbGlkZXMgKiAyKSAvIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHMuc25hcEdyaWQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mQnVsbGV0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvbkJ1bGxldFJlbmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IHMucGFyYW1zLnBhZ2luYXRpb25CdWxsZXRSZW5kZXIocywgaSwgcy5wYXJhbXMuYnVsbGV0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gJzwnICsgcy5wYXJhbXMucGFnaW5hdGlvbkVsZW1lbnQrJyBjbGFzcz1cIicgKyBzLnBhcmFtcy5idWxsZXRDbGFzcyArICdcIj48LycgKyBzLnBhcmFtcy5wYWdpbmF0aW9uRWxlbWVudCArICc+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgICAgICAgICAgICAgICAgIHMuYnVsbGV0cyA9IHMucGFnaW5hdGlvbkNvbnRhaW5lci5maW5kKCcuJyArIHMucGFyYW1zLmJ1bGxldENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25DbGlja2FibGUgJiYgcy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYTExeS5pbml0UGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvbkZyYWN0aW9uUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHMucGFyYW1zLnBhZ2luYXRpb25GcmFjdGlvblJlbmRlcihzLCBzLnBhcmFtcy5wYWdpbmF0aW9uQ3VycmVudENsYXNzLCBzLnBhcmFtcy5wYWdpbmF0aW9uVG90YWxDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiJyArIHMucGFyYW1zLnBhZ2luYXRpb25DdXJyZW50Q2xhc3MgKyAnXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgLyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCInICsgcy5wYXJhbXMucGFnaW5hdGlvblRvdGFsQ2xhc3MrJ1wiPjwvc3Bhbj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5odG1sKHBhZ2luYXRpb25IVE1MKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlID09PSAncHJvZ3Jlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uUHJvZ3Jlc3NSZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gcy5wYXJhbXMucGFnaW5hdGlvblByb2dyZXNzUmVuZGVyKHMsIHMucGFyYW1zLnBhZ2luYXRpb25Qcm9ncmVzc2JhckNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gJzxzcGFuIGNsYXNzPVwiJyArIHMucGFyYW1zLnBhZ2luYXRpb25Qcm9ncmVzc2JhckNsYXNzICsgJ1wiPjwvc3Bhbj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5odG1sKHBhZ2luYXRpb25IVE1MKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlICE9PSAnY3VzdG9tJykge1xuICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uUGFnaW5hdGlvblJlbmRlcmVkJywgcywgcy5wYWdpbmF0aW9uQ29udGFpbmVyWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIENvbW1vbiB1cGRhdGUgbWV0aG9kXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy51cGRhdGUgPSBmdW5jdGlvbiAodXBkYXRlVHJhbnNsYXRlKSB7XG4gICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgIHMudXBkYXRlQ29udGFpbmVyU2l6ZSgpO1xuICAgICAgICAgICAgcy51cGRhdGVTbGlkZXNTaXplKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgIHMudXBkYXRlQ2xhc3NlcygpO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhciAmJiBzLnNjcm9sbGJhcikge1xuICAgICAgICAgICAgICAgIHMuc2Nyb2xsYmFyLnNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld1RyYW5zbGF0ZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvcmNlU2V0VHJhbnNsYXRlKCkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGUgPSBzLnJ0bCA/IC1zLnRyYW5zbGF0ZSA6IHMudHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgIG5ld1RyYW5zbGF0ZSA9IE1hdGgubWluKE1hdGgubWF4KHMudHJhbnNsYXRlLCBzLm1heFRyYW5zbGF0ZSgpKSwgcy5taW5UcmFuc2xhdGUoKSk7XG4gICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQ2xhc3NlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwZGF0ZVRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGVkO1xuICAgICAgICAgICAgICAgIGlmIChzLmNvbnRyb2xsZXIgJiYgcy5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICAgICAgICAgICAgICBzLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VTZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgcy5pc0VuZCAmJiAhcy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzLnNsaWRlVG8ocy5zbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlZCA9IHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc2xhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZVNldFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocy5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgUmVzaXplIEhhbmRsZXJcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLm9uUmVzaXplID0gZnVuY3Rpb24gKGZvcmNlVXBkYXRlUGFnaW5hdGlvbikge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm9uQmVmb3JlUmVzaXplKSBzLnBhcmFtcy5vbkJlZm9yZVJlc2l6ZShzKTtcbiAgICAgICAgICAgIC8vQnJlYWtwb2ludHNcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgICAgIHMuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIERpc2FibGUgbG9ja3Mgb24gcmVzaXplXG4gICAgICAgICAgICB2YXIgYWxsb3dTd2lwZVRvUHJldiA9IHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXY7XG4gICAgICAgICAgICB2YXIgYWxsb3dTd2lwZVRvTmV4dCA9IHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQ7XG4gICAgICAgICAgICBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID0gcy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICAgICAgcy51cGRhdGVDb250YWluZXJTaXplKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZVNsaWRlc1NpemUoKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgfHwgcy5wYXJhbXMuZnJlZU1vZGUgfHwgZm9yY2VVcGRhdGVQYWdpbmF0aW9uKSBzLnVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXIgJiYgcy5zY3JvbGxiYXIpIHtcbiAgICAgICAgICAgICAgICBzLnNjcm9sbGJhci5zZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLmNvbnRyb2xsZXIgJiYgcy5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICAgICAgICAgIHMuY29udHJvbGxlci5zcGxpbmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2xpZGVDaGFuZ2VkQnlTbGlkZVRvID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VHJhbnNsYXRlID0gTWF0aC5taW4oTWF0aC5tYXgocy50cmFuc2xhdGUsIHMubWF4VHJhbnNsYXRlKCkpLCBzLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVDbGFzc2VzKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQ2xhc3NlcygpO1xuICAgICAgICAgICAgICAgIGlmICgocy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzLmlzRW5kICYmICFzLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZUNoYW5nZWRCeVNsaWRlVG8gPSBzLnNsaWRlVG8ocy5zbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2VkQnlTbGlkZVRvID0gcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubGF6eUxvYWRpbmcgJiYgIXNsaWRlQ2hhbmdlZEJ5U2xpZGVUbyAmJiBzLmxhenkpIHtcbiAgICAgICAgICAgICAgICBzLmxhenkubG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmV0dXJuIGxvY2tzIGFmdGVyIHJlc2l6ZVxuICAgICAgICAgICAgcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9IGFsbG93U3dpcGVUb1ByZXY7XG4gICAgICAgICAgICBzLnBhcmFtcy5hbGxvd1N3aXBlVG9OZXh0ID0gYWxsb3dTd2lwZVRvTmV4dDtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5vbkFmdGVyUmVzaXplKSBzLnBhcmFtcy5vbkFmdGVyUmVzaXplKHMpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgRXZlbnRzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgXG4gICAgICAgIC8vRGVmaW5lIFRvdWNoIEV2ZW50c1xuICAgICAgICBzLnRvdWNoRXZlbnRzRGVza3RvcCA9IHtzdGFydDogJ21vdXNlZG93bicsIG1vdmU6ICdtb3VzZW1vdmUnLCBlbmQ6ICdtb3VzZXVwJ307XG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkKSBzLnRvdWNoRXZlbnRzRGVza3RvcCA9IHtzdGFydDogJ3BvaW50ZXJkb3duJywgbW92ZTogJ3BvaW50ZXJtb3ZlJywgZW5kOiAncG9pbnRlcnVwJ307XG4gICAgICAgIGVsc2UgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCkgcy50b3VjaEV2ZW50c0Rlc2t0b3AgPSB7c3RhcnQ6ICdNU1BvaW50ZXJEb3duJywgbW92ZTogJ01TUG9pbnRlck1vdmUnLCBlbmQ6ICdNU1BvaW50ZXJVcCd9O1xuICAgICAgICBzLnRvdWNoRXZlbnRzID0ge1xuICAgICAgICAgICAgc3RhcnQgOiBzLnN1cHBvcnQudG91Y2ggfHwgIXMucGFyYW1zLnNpbXVsYXRlVG91Y2ggID8gJ3RvdWNoc3RhcnQnIDogcy50b3VjaEV2ZW50c0Rlc2t0b3Auc3RhcnQsXG4gICAgICAgICAgICBtb3ZlIDogcy5zdXBwb3J0LnRvdWNoIHx8ICFzLnBhcmFtcy5zaW11bGF0ZVRvdWNoID8gJ3RvdWNobW92ZScgOiBzLnRvdWNoRXZlbnRzRGVza3RvcC5tb3ZlLFxuICAgICAgICAgICAgZW5kIDogcy5zdXBwb3J0LnRvdWNoIHx8ICFzLnBhcmFtcy5zaW11bGF0ZVRvdWNoID8gJ3RvdWNoZW5kJyA6IHMudG91Y2hFdmVudHNEZXNrdG9wLmVuZFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIFdQOCBUb3VjaCBFdmVudHMgRml4XG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkIHx8IHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCkge1xuICAgICAgICAgICAgKHMucGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnY29udGFpbmVyJyA/IHMuY29udGFpbmVyIDogcy53cmFwcGVyKS5hZGRDbGFzcygnc3dpcGVyLXdwOC0nICsgcy5wYXJhbXMuZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQXR0YWNoL2RldGFjaCBldmVudHNcbiAgICAgICAgcy5pbml0RXZlbnRzID0gZnVuY3Rpb24gKGRldGFjaCkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbkRvbSA9IGRldGFjaCA/ICdvZmYnIDogJ29uJztcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBkZXRhY2ggPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnYWRkRXZlbnRMaXN0ZW5lcic7XG4gICAgICAgICAgICB2YXIgdG91Y2hFdmVudHNUYXJnZXQgPSBzLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyBzLmNvbnRhaW5lclswXSA6IHMud3JhcHBlclswXTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzLnN1cHBvcnQudG91Y2ggPyB0b3VjaEV2ZW50c1RhcmdldCA6IGRvY3VtZW50O1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBtb3ZlQ2FwdHVyZSA9IHMucGFyYW1zLm5lc3RlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL1RvdWNoIEV2ZW50c1xuICAgICAgICAgICAgaWYgKHMuYnJvd3Nlci5pZSkge1xuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnRzVGFyZ2V0W2FjdGlvbl0ocy50b3VjaEV2ZW50cy5zdGFydCwgcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbYWN0aW9uXShzLnRvdWNoRXZlbnRzLm1vdmUsIHMub25Ub3VjaE1vdmUsIG1vdmVDYXB0dXJlKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbYWN0aW9uXShzLnRvdWNoRXZlbnRzLmVuZCwgcy5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocy5zdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSBzLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgcy5zdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBzLnBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlfSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKHMudG91Y2hFdmVudHMuc3RhcnQsIHMub25Ub3VjaFN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKHMudG91Y2hFdmVudHMubW92ZSwgcy5vblRvdWNoTW92ZSwgbW92ZUNhcHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKHMudG91Y2hFdmVudHMuZW5kLCBzLm9uVG91Y2hFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgocGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgIXMuZGV2aWNlLmlvcyAmJiAhcy5kZXZpY2UuYW5kcm9pZCkgfHwgKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFzLnN1cHBvcnQudG91Y2ggJiYgcy5kZXZpY2UuaW9zKSkge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKCdtb3VzZWRvd24nLCBzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFthY3Rpb25dKCdtb3VzZW1vdmUnLCBzLm9uVG91Y2hNb3ZlLCBtb3ZlQ2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50W2FjdGlvbl0oJ21vdXNldXAnLCBzLm9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3dbYWN0aW9uXSgncmVzaXplJywgcy5vblJlc2l6ZSk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gTmV4dCwgUHJldiwgSW5kZXhcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uICYmIHMubmV4dEJ1dHRvbiAmJiBzLm5leHRCdXR0b24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHMubmV4dEJ1dHRvblthY3Rpb25Eb21dKCdjbGljaycsIHMub25DbGlja05leHQpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5uZXh0QnV0dG9uW2FjdGlvbkRvbV0oJ2tleWRvd24nLCBzLmExMXkub25FbnRlcktleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldkJ1dHRvbiAmJiBzLnByZXZCdXR0b24gJiYgcy5wcmV2QnV0dG9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzLnByZXZCdXR0b25bYWN0aW9uRG9tXSgnY2xpY2snLCBzLm9uQ2xpY2tQcmV2KTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMucHJldkJ1dHRvblthY3Rpb25Eb21dKCdrZXlkb3duJywgcy5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb24gJiYgcy5wYXJhbXMucGFnaW5hdGlvbkNsaWNrYWJsZSkge1xuICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lclthY3Rpb25Eb21dKCdjbGljaycsICcuJyArIHMucGFyYW1zLmJ1bGxldENsYXNzLCBzLm9uQ2xpY2tJbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLnBhZ2luYXRpb25Db250YWluZXJbYWN0aW9uRG9tXSgna2V5ZG93bicsICcuJyArIHMucGFyYW1zLmJ1bGxldENsYXNzLCBzLmExMXkub25FbnRlcktleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gUHJldmVudCBMaW5rcyBDbGlja3NcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHMucGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikgdG91Y2hFdmVudHNUYXJnZXRbYWN0aW9uXSgnY2xpY2snLCBzLnByZXZlbnRDbGlja3MsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBzLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMuaW5pdEV2ZW50cygpO1xuICAgICAgICB9O1xuICAgICAgICBzLmRldGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMuaW5pdEV2ZW50cyh0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEhhbmRsZSBDbGlja3NcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICAvLyBQcmV2ZW50IENsaWNrc1xuICAgICAgICBzLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgICBzLnByZXZlbnRDbGlja3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFzLmFsbG93Q2xpY2spIHtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldmVudENsaWNrcykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24gJiYgcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIENsaWNrc1xuICAgICAgICBzLm9uQ2xpY2tOZXh0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChzLmlzRW5kICYmICFzLnBhcmFtcy5sb29wKSByZXR1cm47XG4gICAgICAgICAgICBzLnNsaWRlTmV4dCgpO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uQ2xpY2tQcmV2ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChzLmlzQmVnaW5uaW5nICYmICFzLnBhcmFtcy5sb29wKSByZXR1cm47XG4gICAgICAgICAgICBzLnNsaWRlUHJldigpO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uQ2xpY2tJbmRleCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCkgKiBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSBpbmRleCA9IGluZGV4ICsgcy5sb29wZWRTbGlkZXM7XG4gICAgICAgICAgICBzLnNsaWRlVG8oaW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgSGFuZGxlIFRvdWNoZXNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBmdW5jdGlvbiBmaW5kRWxlbWVudEluRXZlbnQoZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHZhciBlbCA9ICQoZS50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKCFlbC5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudHMoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxlY3Rvci5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQ7XG4gICAgICAgICAgICAgICAgICAgIGVsLnBhcmVudHMoKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgX2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2VsID09PSBzZWxlY3RvcikgZm91bmQgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsWzBdO1xuICAgICAgICB9XG4gICAgICAgIHMudXBkYXRlQ2xpY2tlZFNsaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZSA9IGZpbmRFbGVtZW50SW5FdmVudChlLCAnLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKTtcbiAgICAgICAgICAgIHZhciBzbGlkZUZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2xpZGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tpXSA9PT0gc2xpZGUpIHNsaWRlRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoc2xpZGUgJiYgc2xpZGVGb3VuZCkge1xuICAgICAgICAgICAgICAgIHMuY2xpY2tlZFNsaWRlID0gc2xpZGU7XG4gICAgICAgICAgICAgICAgcy5jbGlja2VkSW5kZXggPSAkKHNsaWRlKS5pbmRleCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy5jbGlja2VkU2xpZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcy5jbGlja2VkSW5kZXggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlVG9DbGlja2VkU2xpZGUgJiYgcy5jbGlja2VkSW5kZXggIT09IHVuZGVmaW5lZCAmJiBzLmNsaWNrZWRJbmRleCAhPT0gcy5hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZVRvSW5kZXggPSBzLmNsaWNrZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcmVhbEluZGV4LFxuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVkU2xpZGVzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3ID0gcy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nID8gcy5jdXJyZW50U2xpZGVzUGVyVmlldygpIDogcy5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5hbmltYXRpbmcpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcmVhbEluZGV4ID0gcGFyc2VJbnQoJChzLmNsaWNrZWRTbGlkZSkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc2xpZGVUb0luZGV4IDwgcy5sb29wZWRTbGlkZXMgLSBzbGlkZXNQZXJWaWV3LzIpIHx8IChzbGlkZVRvSW5kZXggPiBzLnNsaWRlcy5sZW5ndGggLSBzLmxvb3BlZFNsaWRlcyArIHNsaWRlc1BlclZpZXcvMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVRvSW5kZXggPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgcmVhbEluZGV4ICsgJ1wiXTpub3QoLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJyknKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlVG9JbmRleCA+IHMuc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVRvSW5kZXggPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgcmVhbEluZGV4ICsgJ1wiXTpub3QoLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJyknKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB2YXIgaXNUb3VjaGVkLFxuICAgICAgICAgICAgaXNNb3ZlZCxcbiAgICAgICAgICAgIGFsbG93VG91Y2hDYWxsYmFja3MsXG4gICAgICAgICAgICB0b3VjaFN0YXJ0VGltZSxcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nLFxuICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSxcbiAgICAgICAgICAgIHN0YXJ0VHJhbnNsYXRlLFxuICAgICAgICAgICAgYWxsb3dUaHJlc2hvbGRNb3ZlLFxuICAgICAgICAgICAgLy8gRm9ybSBlbGVtZW50cyB0byBtYXRjaFxuICAgICAgICAgICAgZm9ybUVsZW1lbnRzID0gJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIHZpZGVvJyxcbiAgICAgICAgICAgIC8vIExhc3QgY2xpY2sgdGltZVxuICAgICAgICAgICAgbGFzdENsaWNrVGltZSA9IERhdGUubm93KCksIGNsaWNrVGltZW91dCxcbiAgICAgICAgICAgIC8vVmVsb2NpdGllc1xuICAgICAgICAgICAgdmVsb2NpdGllcyA9IFtdLFxuICAgICAgICAgICAgYWxsb3dNb21lbnR1bUJvdW5jZTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFuaW1hdGluZyBGbGFnXG4gICAgICAgIHMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICAvLyBUb3VjaGVzIGluZm9ybWF0aW9uXG4gICAgICAgIHMudG91Y2hlcyA9IHtcbiAgICAgICAgICAgIHN0YXJ0WDogMCxcbiAgICAgICAgICAgIHN0YXJ0WTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRYOiAwLFxuICAgICAgICAgICAgY3VycmVudFk6IDAsXG4gICAgICAgICAgICBkaWZmOiAwXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvLyBUb3VjaCBoYW5kbGVyc1xuICAgICAgICB2YXIgaXNUb3VjaEV2ZW50LCBzdGFydE1vdmluZztcbiAgICAgICAgcy5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIGlzVG91Y2hFdmVudCA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnO1xuICAgICAgICAgICAgaWYgKCFpc1RvdWNoRXZlbnQgJiYgJ3doaWNoJyBpbiBlICYmIGUud2hpY2ggPT09IDMpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5ub1N3aXBpbmcgJiYgZmluZEVsZW1lbnRJbkV2ZW50KGUsICcuJyArIHMucGFyYW1zLm5vU3dpcGluZ0NsYXNzKSkge1xuICAgICAgICAgICAgICAgIHMuYWxsb3dDbGljayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnN3aXBlSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGlmICghZmluZEVsZW1lbnRJbkV2ZW50KGUsIHMucGFyYW1zLnN3aXBlSGFuZGxlcikpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3RhcnRYID0gcy50b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICAgICAgdmFyIHN0YXJ0WSA9IHMudG91Y2hlcy5jdXJyZW50WSA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBEbyBOT1Qgc3RhcnQgaWYgaU9TIGVkZ2Ugc3dpcGUgaXMgZGV0ZWN0ZWQuIE90aGVyd2lzZSBpT1MgYXBwIChVSVdlYlZpZXcpIGNhbm5vdCBzd2lwZS10by1nby1iYWNrIGFueW1vcmVcbiAgICAgICAgICAgIGlmKHMuZGV2aWNlLmlvcyAmJiBzLnBhcmFtcy5pT1NFZGdlU3dpcGVEZXRlY3Rpb24gJiYgc3RhcnRYIDw9IHMucGFyYW1zLmlPU0VkZ2VTd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpc1RvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYWxsb3dUb3VjaENhbGxiYWNrcyA9IHRydWU7XG4gICAgICAgICAgICBpc1Njcm9sbGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHN0YXJ0TW92aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WCA9IHN0YXJ0WDtcbiAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFkgPSBzdGFydFk7XG4gICAgICAgICAgICB0b3VjaFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBzLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgcy51cGRhdGVDb250YWluZXJTaXplKCk7XG4gICAgICAgICAgICBzLnN3aXBlRGlyZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnRocmVzaG9sZCA+IDApIGFsbG93VGhyZXNob2xkTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoZm9ybUVsZW1lbnRzKSkgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKGZvcm1FbGVtZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5lbWl0KCdvblRvdWNoU3RhcnQnLCBzLCBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHMub25Ub3VjaE1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIGlmIChpc1RvdWNoRXZlbnQgJiYgZS50eXBlID09PSAnbW91c2Vtb3ZlJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIpIHtcbiAgICAgICAgICAgICAgICBzLnRvdWNoZXMuc3RhcnRYID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WSA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5vbmx5RXh0ZXJuYWwpIHtcbiAgICAgICAgICAgICAgICAvLyBpc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNUb3VjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFggPSBzLnRvdWNoZXMuY3VycmVudFggPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WSA9IHMudG91Y2hlcy5jdXJyZW50WSA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1RvdWNoRXZlbnQgJiYgcy5wYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcyAmJiAhcy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBWZXJ0aWNhbFxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAocy50b3VjaGVzLmN1cnJlbnRZIDwgcy50b3VjaGVzLnN0YXJ0WSAmJiBzLnRyYW5zbGF0ZSA8PSBzLm1heFRyYW5zbGF0ZSgpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHMudG91Y2hlcy5jdXJyZW50WSA+IHMudG91Y2hlcy5zdGFydFkgJiYgcy50cmFuc2xhdGUgPj0gcy5taW5UcmFuc2xhdGUoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAocy50b3VjaGVzLmN1cnJlbnRYIDwgcy50b3VjaGVzLnN0YXJ0WCAmJiBzLnRyYW5zbGF0ZSA8PSBzLm1heFRyYW5zbGF0ZSgpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHMudG91Y2hlcy5jdXJyZW50WCA+IHMudG91Y2hlcy5zdGFydFggJiYgcy50cmFuc2xhdGUgPj0gcy5taW5UcmFuc2xhdGUoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzVG91Y2hFdmVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICQoZS50YXJnZXQpLmlzKGZvcm1FbGVtZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHMuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbG93VG91Y2hDYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uVG91Y2hNb3ZlJywgcywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAxKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgcy50b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgICBzLnRvdWNoZXMuY3VycmVudFkgPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlzU2Nyb2xsaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhciB0b3VjaEFuZ2xlO1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpICYmIHMudG91Y2hlcy5jdXJyZW50WSA9PT0gcy50b3VjaGVzLnN0YXJ0WSB8fCAhcy5pc0hvcml6b250YWwoKSAmJiBzLnRvdWNoZXMuY3VycmVudFggPT09IHMudG91Y2hlcy5zdGFydFgpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoQW5nbGUgPSBNYXRoLmF0YW4yKE1hdGguYWJzKHMudG91Y2hlcy5jdXJyZW50WSAtIHMudG91Y2hlcy5zdGFydFkpLCBNYXRoLmFicyhzLnRvdWNoZXMuY3VycmVudFggLSBzLnRvdWNoZXMuc3RhcnRYKSkgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICBpc1Njcm9sbGluZyA9IHMuaXNIb3Jpem9udGFsKCkgPyB0b3VjaEFuZ2xlID4gcy5wYXJhbXMudG91Y2hBbmdsZSA6ICg5MCAtIHRvdWNoQW5nbGUgPiBzLnBhcmFtcy50b3VjaEFuZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uVG91Y2hNb3ZlT3Bwb3NpdGUnLCBzLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnRNb3ZpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMudG91Y2hlcy5jdXJyZW50WCAhPT0gcy50b3VjaGVzLnN0YXJ0WCB8fCBzLnRvdWNoZXMuY3VycmVudFkgIT09IHMudG91Y2hlcy5zdGFydFkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRNb3ZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoaXNTY3JvbGxpbmcpICB7XG4gICAgICAgICAgICAgICAgaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGFydE1vdmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgcy5lbWl0KCdvblNsaWRlck1vdmUnLCBzLCBlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy50b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24gJiYgIXMucGFyYW1zLm5lc3RlZCkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFpc01vdmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuZml4TG9vcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydFRyYW5zbGF0ZSA9IHMuZ2V0V3JhcHBlclRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgaWYgKHMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmlnZ2VyKCd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgTVNUcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b3BsYXkgJiYgcy5hdXRvcGxheWluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMucGF1c2VBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFsbG93TW9tZW50dW1Cb3VuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvL0dyYWIgQ3Vyc29yXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmdyYWJDdXJzb3IgJiYgKHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPT09IHRydWUgfHwgcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zZXRHcmFiQ3Vyc29yKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBkaWZmID0gcy50b3VjaGVzLmRpZmYgPSBzLmlzSG9yaXpvbnRhbCgpID8gcy50b3VjaGVzLmN1cnJlbnRYIC0gcy50b3VjaGVzLnN0YXJ0WCA6IHMudG91Y2hlcy5jdXJyZW50WSAtIHMudG91Y2hlcy5zdGFydFk7XG4gICAgICAgIFxuICAgICAgICAgICAgZGlmZiA9IGRpZmYgKiBzLnBhcmFtcy50b3VjaFJhdGlvO1xuICAgICAgICAgICAgaWYgKHMucnRsKSBkaWZmID0gLWRpZmY7XG4gICAgICAgIFxuICAgICAgICAgICAgcy5zd2lwZURpcmVjdGlvbiA9IGRpZmYgPiAwID8gJ3ByZXYnIDogJ25leHQnO1xuICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBzdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGlzYWJsZVBhcmVudFN3aXBlciA9IHRydWU7XG4gICAgICAgICAgICBpZiAoKGRpZmYgPiAwICYmIGN1cnJlbnRUcmFuc2xhdGUgPiBzLm1pblRyYW5zbGF0ZSgpKSkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucmVzaXN0YW5jZSkgY3VycmVudFRyYW5zbGF0ZSA9IHMubWluVHJhbnNsYXRlKCkgLSAxICsgTWF0aC5wb3coLXMubWluVHJhbnNsYXRlKCkgKyBzdGFydFRyYW5zbGF0ZSArIGRpZmYsIHMucGFyYW1zLnJlc2lzdGFuY2VSYXRpbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmIDwgMCAmJiBjdXJyZW50VHJhbnNsYXRlIDwgcy5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucmVzaXN0YW5jZSkgY3VycmVudFRyYW5zbGF0ZSA9IHMubWF4VHJhbnNsYXRlKCkgKyAxIC0gTWF0aC5wb3cocy5tYXhUcmFuc2xhdGUoKSAtIHN0YXJ0VHJhbnNsYXRlIC0gZGlmZiwgcy5wYXJhbXMucmVzaXN0YW5jZVJhdGlvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlcikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIERpcmVjdGlvbnMgbG9ja3NcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCAmJiBzLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcgJiYgY3VycmVudFRyYW5zbGF0ZSA8IHN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IHN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ICYmIHMuc3dpcGVEaXJlY3Rpb24gPT09ICdwcmV2JyAmJiBjdXJyZW50VHJhbnNsYXRlID4gc3RhcnRUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFRocmVzaG9sZFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnRocmVzaG9sZCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZikgPiBzLnBhcmFtcy50aHJlc2hvbGQgfHwgYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd1RocmVzaG9sZE1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WCA9IHMudG91Y2hlcy5jdXJyZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFkgPSBzLnRvdWNoZXMuY3VycmVudFk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnRvdWNoZXMuZGlmZiA9IHMuaXNIb3Jpem9udGFsKCkgPyBzLnRvdWNoZXMuY3VycmVudFggLSBzLnRvdWNoZXMuc3RhcnRYIDogcy50b3VjaGVzLmN1cnJlbnRZIC0gcy50b3VjaGVzLnN0YXJ0WTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IHN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuZm9sbG93RmluZ2VyKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIGFjdGl2ZSBpbmRleCBpbiBmcmVlIG1vZGVcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZSB8fCBzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9WZWxvY2l0eVxuICAgICAgICAgICAgICAgIGlmICh2ZWxvY2l0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0aWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHMudG91Y2hlc1tzLmlzSG9yaXpvbnRhbCgpID8gJ3N0YXJ0WCcgOiAnc3RhcnRZJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiB0b3VjaFN0YXJ0VGltZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmVsb2NpdGllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHMudG91Y2hlc1tzLmlzSG9yaXpvbnRhbCgpID8gJ2N1cnJlbnRYJyA6ICdjdXJyZW50WSddLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiAobmV3IHdpbmRvdy5EYXRlKCkpLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIHByb2dyZXNzXG4gICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKGN1cnJlbnRUcmFuc2xhdGUpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRyYW5zbGF0ZVxuICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlKGN1cnJlbnRUcmFuc2xhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uVG91Y2hFbmQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIGlmIChhbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcy5lbWl0KCdvblRvdWNoRW5kJywgcywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIWlzVG91Y2hlZCkgcmV0dXJuO1xuICAgICAgICAgICAgLy9SZXR1cm4gR3JhYiBDdXJzb3JcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5ncmFiQ3Vyc29yICYmIGlzTW92ZWQgJiYgaXNUb3VjaGVkICAmJiAocy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9PT0gdHJ1ZSB8fCBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIHMuc2V0R3JhYkN1cnNvcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gVGltZSBkaWZmXG4gICAgICAgICAgICB2YXIgdG91Y2hFbmRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHZhciB0aW1lRGlmZiA9IHRvdWNoRW5kVGltZSAtIHRvdWNoU3RhcnRUaW1lO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFRhcCwgZG91YmxlVGFwLCBDbGlja1xuICAgICAgICAgICAgaWYgKHMuYWxsb3dDbGljaykge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQ2xpY2tlZFNsaWRlKGUpO1xuICAgICAgICAgICAgICAgIHMuZW1pdCgnb25UYXAnLCBzLCBlKTtcbiAgICAgICAgICAgICAgICBpZiAodGltZURpZmYgPCAzMDAgJiYgKHRvdWNoRW5kVGltZSAtIGxhc3RDbGlja1RpbWUpID4gMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGlja1RpbWVvdXQpIGNsZWFyVGltZW91dChjbGlja1RpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICBjbGlja1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25IaWRlICYmIHMucGFnaW5hdGlvbkNvbnRhaW5lci5sZW5ndGggPiAwICYmICEkKGUudGFyZ2V0KS5oYXNDbGFzcyhzLnBhcmFtcy5idWxsZXRDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIudG9nZ2xlQ2xhc3Mocy5wYXJhbXMucGFnaW5hdGlvbkhpZGRlbkNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25DbGljaycsIHMsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVEaWZmIDwgMzAwICYmICh0b3VjaEVuZFRpbWUgLSBsYXN0Q2xpY2tUaW1lKSA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tUaW1lb3V0KSBjbGVhclRpbWVvdXQoY2xpY2tUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkRvdWJsZVRhcCcsIHMsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBsYXN0Q2xpY2tUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzKSBzLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFpc1RvdWNoZWQgfHwgIWlzTW92ZWQgfHwgIXMuc3dpcGVEaXJlY3Rpb24gfHwgcy50b3VjaGVzLmRpZmYgPT09IDAgfHwgY3VycmVudFRyYW5zbGF0ZSA9PT0gc3RhcnRUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgICBpc1RvdWNoZWQgPSBpc01vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNUb3VjaGVkID0gaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZvbGxvd0Zpbmdlcikge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBzLnJ0bCA/IHMudHJhbnNsYXRlIDogLXMudHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvcyA9IC1jdXJyZW50VHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3MgPCAtcy5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8ocy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudFBvcyA+IC1zLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlcy5sZW5ndGggPCBzLnNuYXBHcmlkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMuc25hcEdyaWQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8ocy5zbGlkZXMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlTW9tZW50dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlbG9jaXRpZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RNb3ZlRXZlbnQgPSB2ZWxvY2l0aWVzLnBvcCgpLCB2ZWxvY2l0eUV2ZW50ID0gdmVsb2NpdGllcy5wb3AoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBsYXN0TW92ZUV2ZW50LnBvc2l0aW9uIC0gdmVsb2NpdHlFdmVudC5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lID0gbGFzdE1vdmVFdmVudC50aW1lIC0gdmVsb2NpdHlFdmVudC50aW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy52ZWxvY2l0eSA9IGRpc3RhbmNlIC8gdGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudmVsb2NpdHkgPSBzLnZlbG9jaXR5IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhzLnZlbG9jaXR5KSA8IHMucGFyYW1zLmZyZWVNb2RlTWluaW11bVZlbG9jaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy52ZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGltcGxpZXMgdGhhdCB0aGUgdXNlciBzdG9wcGVkIG1vdmluZyBhIGZpbmdlciB0aGVuIHJlbGVhc2VkLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmUgd291bGQgYmUgbm8gZXZlbnRzIHdpdGggZGlzdGFuY2UgemVybywgc28gdGhlIGxhc3QgZXZlbnQgaXMgc3RhbGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGltZSA+IDE1MCB8fCAobmV3IHdpbmRvdy5EYXRlKCkuZ2V0VGltZSgpIC0gbGFzdE1vdmVFdmVudC50aW1lKSA+IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy52ZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcy52ZWxvY2l0eSA9IHMudmVsb2NpdHkgKiBzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZlbG9jaXRpZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRHVyYXRpb24gPSAxMDAwICogcy5wYXJhbXMuZnJlZU1vZGVNb21lbnR1bVJhdGlvO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZSA9IHMudmVsb2NpdHkgKiBtb21lbnR1bUR1cmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gcy50cmFuc2xhdGUgKyBtb21lbnR1bURpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIG5ld1Bvc2l0aW9uID0gLSBuZXdQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvQm91bmNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZnRlckJvdW5jZVBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm91bmNlQW1vdW50ID0gTWF0aC5hYnMocy52ZWxvY2l0eSkgKiAyMCAqIHMucGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uIDwgcy5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3UG9zaXRpb24gKyBzLm1heFRyYW5zbGF0ZSgpIDwgLWJvdW5jZUFtb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMubWF4VHJhbnNsYXRlKCkgLSBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyQm91bmNlUG9zaXRpb24gPSBzLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gcy5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChuZXdQb3NpdGlvbiA+IHMubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtQm91bmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uIC0gcy5taW5UcmFuc2xhdGUoKSA+IGJvdW5jZUFtb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMubWluVHJhbnNsYXRlKCkgKyBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyQm91bmNlUG9zaXRpb24gPSBzLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gcy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBzLnNuYXBHcmlkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuc25hcEdyaWRbal0gPiAtbmV3UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlID0gajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhzLnNuYXBHcmlkW25leHRTbGlkZV0gLSBuZXdQb3NpdGlvbikgPCBNYXRoLmFicyhzLnNuYXBHcmlkW25leHRTbGlkZSAtIDFdIC0gbmV3UG9zaXRpb24pIHx8IHMuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gcy5zbmFwR3JpZFtuZXh0U2xpZGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMuc25hcEdyaWRbbmV4dFNsaWRlIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMucnRsKSBuZXdQb3NpdGlvbiA9IC0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9GaXggZHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKHMudmVsb2NpdHkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudHVtRHVyYXRpb24gPSBNYXRoLmFicygoLW5ld1Bvc2l0aW9uIC0gcy50cmFuc2xhdGUpIC8gcy52ZWxvY2l0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uIC0gcy50cmFuc2xhdGUpIC8gcy52ZWxvY2l0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVSZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZSAmJiBkb0JvdW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcyhhZnRlckJvdW5jZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5vblRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcyB8fCAhYWxsb3dNb21lbnR1bUJvdW5jZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25Nb21lbnR1bUJvdW5jZScsIHMpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2l0aW9uKHMucGFyYW1zLnNwZWVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5vblRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHMudmVsb2NpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3MobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZShuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLm9uVHJhbnNpdGlvblN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcyhuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtIHx8IHRpbWVEaWZmID49IHMucGFyYW1zLmxvbmdTd2lwZXNNcykge1xuICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEZpbmQgY3VycmVudCBzbGlkZVxuICAgICAgICAgICAgdmFyIGksIHN0b3BJbmRleCA9IDAsIGdyb3VwU2l6ZSA9IHMuc2xpZGVzU2l6ZXNHcmlkWzBdO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHMuc2xpZGVzR3JpZFtpICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBvcyA+PSBzLnNsaWRlc0dyaWRbaV0gJiYgY3VycmVudFBvcyA8IHMuc2xpZGVzR3JpZFtpICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBTaXplID0gcy5zbGlkZXNHcmlkW2kgKyBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cF0gLSBzLnNsaWRlc0dyaWRbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UG9zID49IHMuc2xpZGVzR3JpZFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwU2l6ZSA9IHMuc2xpZGVzR3JpZFtzLnNsaWRlc0dyaWQubGVuZ3RoIC0gMV0gLSBzLnNsaWRlc0dyaWRbcy5zbGlkZXNHcmlkLmxlbmd0aCAtIDJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEZpbmQgY3VycmVudCBzbGlkZSBzaXplXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSAoY3VycmVudFBvcyAtIHMuc2xpZGVzR3JpZFtzdG9wSW5kZXhdKSAvIGdyb3VwU2l6ZTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodGltZURpZmYgPiBzLnBhcmFtcy5sb25nU3dpcGVzTXMpIHtcbiAgICAgICAgICAgICAgICAvLyBMb25nIHRvdWNoZXNcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLmxvbmdTd2lwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhdGlvID49IHMucGFyYW1zLmxvbmdTd2lwZXNSYXRpbykgcy5zbGlkZVRvKHN0b3BJbmRleCArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhdGlvID4gKDEgLSBzLnBhcmFtcy5sb25nU3dpcGVzUmF0aW8pKSBzLnNsaWRlVG8oc3RvcEluZGV4ICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHMuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFNob3J0IHN3aXBlc1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuc2hvcnRTd2lwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHN0b3BJbmRleCArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBUcmFuc2l0aW9uc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuX3NsaWRlVG8gPSBmdW5jdGlvbiAoc2xpZGVJbmRleCwgc3BlZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnNsaWRlVG8oc2xpZGVJbmRleCwgc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBzLnNsaWRlVG8gPSBmdW5jdGlvbiAoc2xpZGVJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcnVuQ2FsbGJhY2tzID09PSAndW5kZWZpbmVkJykgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2xpZGVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHNsaWRlSW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggPCAwKSBzbGlkZUluZGV4ID0gMDtcbiAgICAgICAgICAgIHMuc25hcEluZGV4ID0gTWF0aC5mbG9vcihzbGlkZUluZGV4IC8gcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgICAgICAgaWYgKHMuc25hcEluZGV4ID49IHMuc25hcEdyaWQubGVuZ3RoKSBzLnNuYXBJbmRleCA9IHMuc25hcEdyaWQubGVuZ3RoIC0gMTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gLSBzLnNuYXBHcmlkW3Muc25hcEluZGV4XTtcbiAgICAgICAgICAgIC8vIFN0b3AgYXV0b3BsYXlcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvcGxheSAmJiBzLmF1dG9wbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVybmFsIHx8ICFzLnBhcmFtcy5hdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMucGF1c2VBdXRvcGxheShzcGVlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBwcm9ncmVzc1xuICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG4gICAgICAgICAgICBpZihzLnBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KXtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzR3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoLSBNYXRoLmZsb29yKHRyYW5zbGF0ZSAqIDEwMCkgPj0gTWF0aC5mbG9vcihzLnNsaWRlc0dyaWRbaV0gKiAxMDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgJiYgdHJhbnNsYXRlIDwgcy50cmFuc2xhdGUgJiYgdHJhbnNsYXRlIDwgcy5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiAmJiB0cmFuc2xhdGUgPiBzLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPiBzLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKChzLmFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4ICkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBJbmRleFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gJ3VuZGVmaW5lZCcpIHNwZWVkID0gcy5wYXJhbXMuc3BlZWQ7XG4gICAgICAgICAgICBzLnByZXZpb3VzSW5kZXggPSBzLmFjdGl2ZUluZGV4IHx8IDA7XG4gICAgICAgICAgICBzLmFjdGl2ZUluZGV4ID0gc2xpZGVJbmRleDtcbiAgICAgICAgICAgIHMudXBkYXRlUmVhbEluZGV4KCk7XG4gICAgICAgICAgICBpZiAoKHMucnRsICYmIC10cmFuc2xhdGUgPT09IHMudHJhbnNsYXRlKSB8fCAoIXMucnRsICYmIHRyYW5zbGF0ZSA9PT0gcy50cmFuc2xhdGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIEhlaWdodFxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgIHMub25UcmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzKTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3BlZWQgPT09IDAgfHwgcy5icm93c2VyLmx0ZUlFOSkge1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgcy5vblRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24oc3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICghcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMub25UcmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzLm9uVHJhbnNpdGlvblN0YXJ0ID0gZnVuY3Rpb24gKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBydW5DYWxsYmFja3MgPT09ICd1bmRlZmluZWQnKSBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLmxhenkpIHMubGF6eS5vblRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHMuZW1pdCgnb25UcmFuc2l0aW9uU3RhcnQnLCBzKTtcbiAgICAgICAgICAgICAgICBpZiAocy5hY3RpdmVJbmRleCAhPT0gcy5wcmV2aW91c0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TbGlkZUNoYW5nZVN0YXJ0Jywgcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmFjdGl2ZUluZGV4ID4gcy5wcmV2aW91c0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2xpZGVOZXh0U3RhcnQnLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TbGlkZVByZXZTdGFydCcsIHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy5vblRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcnVuQ2FsbGJhY2tzID09PSAndW5kZWZpbmVkJykgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzLmxhenkpIHMubGF6eS5vblRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uVHJhbnNpdGlvbkVuZCcsIHMpO1xuICAgICAgICAgICAgICAgIGlmIChzLmFjdGl2ZUluZGV4ICE9PSBzLnByZXZpb3VzSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblNsaWRlQ2hhbmdlRW5kJywgcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmFjdGl2ZUluZGV4ID4gcy5wcmV2aW91c0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2xpZGVOZXh0RW5kJywgcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2xpZGVQcmV2RW5kJywgcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuaGlzdG9yeSAmJiBzLmhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICBzLmhpc3Rvcnkuc2V0SGlzdG9yeShzLnBhcmFtcy5oaXN0b3J5LCBzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oYXNobmF2ICYmIHMuaGFzaG5hdikge1xuICAgICAgICAgICAgICAgIHMuaGFzaG5hdi5zZXRIYXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBzLnNsaWRlTmV4dCA9IGZ1bmN0aW9uIChydW5DYWxsYmFja3MsIHNwZWVkLCBpbnRlcm5hbCkge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAocy5hbmltYXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICB2YXIgY2xpZW50TGVmdCA9IHMuY29udGFpbmVyWzBdLmNsaWVudExlZnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4ICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4ICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5fc2xpZGVOZXh0ID0gZnVuY3Rpb24gKHNwZWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5zbGlkZU5leHQodHJ1ZSwgc3BlZWQsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBzLnNsaWRlUHJldiA9IGZ1bmN0aW9uIChydW5DYWxsYmFja3MsIHNwZWVkLCBpbnRlcm5hbCkge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAocy5hbmltYXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICB2YXIgY2xpZW50TGVmdCA9IHMuY29udGFpbmVyWzBdLmNsaWVudExlZnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4IC0gMSwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSByZXR1cm4gcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXggLSAxLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgICAgIH07XG4gICAgICAgIHMuX3NsaWRlUHJldiA9IGZ1bmN0aW9uIChzcGVlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHMuc2xpZGVQcmV2KHRydWUsIHNwZWVkLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5zbGlkZVJlc2V0ID0gZnVuY3Rpb24gKHJ1bkNhbGxiYWNrcywgc3BlZWQsIGludGVybmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcy5kaXNhYmxlVG91Y2hDb250cm9sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5wYXJhbXMub25seUV4dGVybmFsID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzLmVuYWJsZVRvdWNoQ29udHJvbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLm9ubHlFeHRlcm5hbCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBUcmFuc2xhdGUvdHJhbnNpdGlvbiBoZWxwZXJzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gICAgICAgICAgICBzLndyYXBwZXIudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnICYmIHMuZWZmZWN0c1tzLnBhcmFtcy5lZmZlY3RdKSB7XG4gICAgICAgICAgICAgICAgcy5lZmZlY3RzW3MucGFyYW1zLmVmZmVjdF0uc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucGFyYWxsYXggJiYgcy5wYXJhbGxheCkge1xuICAgICAgICAgICAgICAgIHMucGFyYWxsYXguc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuY29udHJvbCAmJiBzLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICBzLmNvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuZW1pdCgnb25TZXRUcmFuc2l0aW9uJywgcywgZHVyYXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUgPSBmdW5jdGlvbiAodHJhbnNsYXRlLCB1cGRhdGVBY3RpdmVJbmRleCwgYnlDb250cm9sbGVyKSB7XG4gICAgICAgICAgICB2YXIgeCA9IDAsIHkgPSAwLCB6ID0gMDtcbiAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgeCA9IHMucnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHkgPSB0cmFuc2xhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJvdW5kTGVuZ3Rocykge1xuICAgICAgICAgICAgICAgIHggPSByb3VuZCh4KTtcbiAgICAgICAgICAgICAgICB5ID0gcm91bmQoeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC50cmFuc2Zvcm1zM2QpIHMud3JhcHBlci50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgJyArIHogKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgZWxzZSBzLndyYXBwZXIudHJhbnNmb3JtKCd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4KScpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHMudHJhbnNsYXRlID0gcy5pc0hvcml6b250YWwoKSA/IHggOiB5O1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gdXBkYXRlIHByb2dyZXNzXG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3M7XG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRlc0RpZmYgPSBzLm1heFRyYW5zbGF0ZSgpIC0gcy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHMubWluVHJhbnNsYXRlKCkpIC8gKHRyYW5zbGF0ZXNEaWZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9ncmVzcyAhPT0gcy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodXBkYXRlQWN0aXZlSW5kZXgpIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5lZmZlY3QgIT09ICdzbGlkZScgJiYgcy5lZmZlY3RzW3MucGFyYW1zLmVmZmVjdF0pIHtcbiAgICAgICAgICAgICAgICBzLmVmZmVjdHNbcy5wYXJhbXMuZWZmZWN0XS5zZXRUcmFuc2xhdGUocy50cmFuc2xhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhcmFsbGF4ICYmIHMucGFyYWxsYXgpIHtcbiAgICAgICAgICAgICAgICBzLnBhcmFsbGF4LnNldFRyYW5zbGF0ZShzLnRyYW5zbGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuc2V0VHJhbnNsYXRlKHMudHJhbnNsYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jb250cm9sICYmIHMuY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIHMuY29udHJvbGxlci5zZXRUcmFuc2xhdGUocy50cmFuc2xhdGUsIGJ5Q29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmVtaXQoJ29uU2V0VHJhbnNsYXRlJywgcywgcy50cmFuc2xhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcy5nZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiAoZWwsIGF4aXMpIHtcbiAgICAgICAgICAgIHZhciBtYXRyaXgsIGN1clRyYW5zZm9ybSwgY3VyU3R5bGUsIHRyYW5zZm9ybU1hdHJpeDtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBhdXRvbWF0aWMgYXhpcyBkZXRlY3Rpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXhpcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBheGlzID0gJ3gnO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMucnRsID8gLXMudHJhbnNsYXRlIDogcy50cmFuc2xhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgY3VyU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XG4gICAgICAgICAgICBpZiAod2luZG93LldlYktpdENTU01hdHJpeCkge1xuICAgICAgICAgICAgICAgIGN1clRyYW5zZm9ybSA9IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS53ZWJraXRUcmFuc2Zvcm07XG4gICAgICAgICAgICAgICAgaWYgKGN1clRyYW5zZm9ybS5zcGxpdCgnLCcpLmxlbmd0aCA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gY3VyVHJhbnNmb3JtLnNwbGl0KCcsICcpLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhLnJlcGxhY2UoJywnLCcuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIFdlYmtpdCBjaG9rZSB3aGVuICdub25lJyBpcyBwYXNzZWQ7IHBhc3NcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBzdHJpbmcgaW5zdGVhZCBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1NYXRyaXggPSBuZXcgd2luZG93LldlYktpdENTU01hdHJpeChjdXJUcmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogY3VyVHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU1hdHJpeCA9IGN1clN0eWxlLk1velRyYW5zZm9ybSB8fCBjdXJTdHlsZS5PVHJhbnNmb3JtIHx8IGN1clN0eWxlLk1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLm1zVHJhbnNmb3JtICB8fCBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykucmVwbGFjZSgndHJhbnNsYXRlKCcsICdtYXRyaXgoMSwgMCwgMCwgMSwnKTtcbiAgICAgICAgICAgICAgICBtYXRyaXggPSB0cmFuc2Zvcm1NYXRyaXgudG9TdHJpbmcoKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAvL0xhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpXG4gICAgICAgICAgICAgICAgICAgIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7XG4gICAgICAgICAgICAgICAgLy9DcmF6eSBJRTEwIE1hdHJpeFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KVxuICAgICAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxMl0pO1xuICAgICAgICAgICAgICAgIC8vTm9ybWFsIEJyb3dzZXJzXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs0XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgLy9MYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KVxuICAgICAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQyO1xuICAgICAgICAgICAgICAgIC8vQ3JhenkgSUUxMCBNYXRyaXhcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNilcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTNdKTtcbiAgICAgICAgICAgICAgICAvL05vcm1hbCBCcm93c2Vyc1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucnRsICYmIGN1clRyYW5zZm9ybSkgY3VyVHJhbnNmb3JtID0gLWN1clRyYW5zZm9ybTtcbiAgICAgICAgICAgIHJldHVybiBjdXJUcmFuc2Zvcm0gfHwgMDtcbiAgICAgICAgfTtcbiAgICAgICAgcy5nZXRXcmFwcGVyVHJhbnNsYXRlID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXhpcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBheGlzID0gcy5pc0hvcml6b250YWwoKSA/ICd4JyA6ICd5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzLmdldFRyYW5zbGF0ZShzLndyYXBwZXJbMF0sIGF4aXMpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgT2JzZXJ2ZXJcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICBmdW5jdGlvbiBpbml0T2JzZXJ2ZXIodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgICAgICAgICAgdmFyIE9ic2VydmVyRnVuYyA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5XZWJraXRNdXRhdGlvbk9ic2VydmVyO1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE9ic2VydmVyRnVuYyhmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMub25SZXNpemUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25PYnNlcnZlclVwZGF0ZScsIHMsIG11dGF0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHlwZW9mIG9wdGlvbnMuYXR0cmlidXRlcyA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHlwZW9mIG9wdGlvbnMuY2hpbGRMaXN0ID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoaWxkTGlzdCxcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0eXBlb2Ygb3B0aW9ucy5jaGFyYWN0ZXJEYXRhID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoYXJhY3RlckRhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIHMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHMuaW5pdE9ic2VydmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5vYnNlcnZlUGFyZW50cykge1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJQYXJlbnRzID0gcy5jb250YWluZXIucGFyZW50cygpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVyUGFyZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpbml0T2JzZXJ2ZXIoY29udGFpbmVyUGFyZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIE9ic2VydmUgY29udGFpbmVyXG4gICAgICAgICAgICBpbml0T2JzZXJ2ZXIocy5jb250YWluZXJbMF0sIHtjaGlsZExpc3Q6IGZhbHNlfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gT2JzZXJ2ZSB3cmFwcGVyXG4gICAgICAgICAgICBpbml0T2JzZXJ2ZXIocy53cmFwcGVyWzBdLCB7YXR0cmlidXRlczogZmFsc2V9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5kaXNjb25uZWN0T2JzZXJ2ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLm9ic2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHMub2JzZXJ2ZXJzW2ldLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMub2JzZXJ2ZXJzID0gW107XG4gICAgICAgIH07XG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIExvb3BcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICAvLyBDcmVhdGUgbG9vcGVkIHNsaWRlc1xuICAgICAgICBzLmNyZWF0ZUxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlZCBzbGlkZXNcbiAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJy4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykucmVtb3ZlKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZihzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgIXMucGFyYW1zLmxvb3BlZFNsaWRlcykgcy5wYXJhbXMubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgXG4gICAgICAgICAgICBzLmxvb3BlZFNsaWRlcyA9IHBhcnNlSW50KHMucGFyYW1zLmxvb3BlZFNsaWRlcyB8fCBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCk7XG4gICAgICAgICAgICBzLmxvb3BlZFNsaWRlcyA9IHMubG9vcGVkU2xpZGVzICsgcy5wYXJhbXMubG9vcEFkZGl0aW9uYWxTbGlkZXM7XG4gICAgICAgICAgICBpZiAocy5sb29wZWRTbGlkZXMgPiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcy5sb29wZWRTbGlkZXMgPSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHZhciBwcmVwZW5kU2xpZGVzID0gW10sIGFwcGVuZFNsaWRlcyA9IFtdLCBpO1xuICAgICAgICAgICAgc2xpZGVzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgcy5sb29wZWRTbGlkZXMpIGFwcGVuZFNsaWRlcy5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBzbGlkZXMubGVuZ3RoICYmIGluZGV4ID49IHNsaWRlcy5sZW5ndGggLSBzLmxvb3BlZFNsaWRlcykgcHJlcGVuZFNsaWRlcy5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICBzbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFwcGVuZFNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci5hcHBlbmQoJChhcHBlbmRTbGlkZXNbaV0uY2xvbmVOb2RlKHRydWUpKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSBwcmVwZW5kU2xpZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgcy53cmFwcGVyLnByZXBlbmQoJChwcmVwZW5kU2xpZGVzW2ldLmNsb25lTm9kZSh0cnVlKSkuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLmRlc3Ryb3lMb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHMuc2xpZGVzLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgIH07XG4gICAgICAgIHMucmVMb29wID0gZnVuY3Rpb24gKHVwZGF0ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICB2YXIgb2xkSW5kZXggPSBzLmFjdGl2ZUluZGV4IC0gcy5sb29wZWRTbGlkZXM7XG4gICAgICAgICAgICBzLmRlc3Ryb3lMb29wKCk7XG4gICAgICAgICAgICBzLmNyZWF0ZUxvb3AoKTtcbiAgICAgICAgICAgIHMudXBkYXRlU2xpZGVzU2l6ZSgpO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKG9sZEluZGV4ICsgcy5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIHMuZml4TG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuZXdJbmRleDtcbiAgICAgICAgICAgIC8vRml4IEZvciBOZWdhdGl2ZSBPdmVyc2xpZGluZ1xuICAgICAgICAgICAgaWYgKHMuYWN0aXZlSW5kZXggPCBzLmxvb3BlZFNsaWRlcykge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gcy5zbGlkZXMubGVuZ3RoIC0gcy5sb29wZWRTbGlkZXMgKiAzICsgcy5hY3RpdmVJbmRleDtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IG5ld0luZGV4ICsgcy5sb29wZWRTbGlkZXM7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKG5ld0luZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0ZpeCBGb3IgUG9zaXRpdmUgT3ZlcnNsaWRpbmdcbiAgICAgICAgICAgIGVsc2UgaWYgKChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgcy5hY3RpdmVJbmRleCA+PSBzLmxvb3BlZFNsaWRlcyAqIDIpIHx8IChzLmFjdGl2ZUluZGV4ID4gcy5zbGlkZXMubGVuZ3RoIC0gcy5wYXJhbXMuc2xpZGVzUGVyVmlldyAqIDIpKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSAtcy5zbGlkZXMubGVuZ3RoICsgcy5hY3RpdmVJbmRleCArIHMubG9vcGVkU2xpZGVzO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggKyBzLmxvb3BlZFNsaWRlcztcbiAgICAgICAgICAgICAgICBzLnNsaWRlVG8obmV3SW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgQXBwZW5kL1ByZXBlbmQvUmVtb3ZlIFNsaWRlc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuYXBwZW5kU2xpZGUgPSBmdW5jdGlvbiAoc2xpZGVzKSB7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuZGVzdHJveUxvb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSkgcy53cmFwcGVyLmFwcGVuZChzbGlkZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci5hcHBlbmQoc2xpZGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgcy5jcmVhdGVMb29wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShzLnBhcmFtcy5vYnNlcnZlciAmJiBzLnN1cHBvcnQub2JzZXJ2ZXIpKSB7XG4gICAgICAgICAgICAgICAgcy51cGRhdGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMucHJlcGVuZFNsaWRlID0gZnVuY3Rpb24gKHNsaWRlcykge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLmRlc3Ryb3lMb29wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3QWN0aXZlSW5kZXggPSBzLmFjdGl2ZUluZGV4ICsgMTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSkgcy53cmFwcGVyLnByZXBlbmQoc2xpZGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBzLmFjdGl2ZUluZGV4ICsgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci5wcmVwZW5kKHNsaWRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuY3JlYXRlTG9vcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEocy5wYXJhbXMub2JzZXJ2ZXIgJiYgcy5zdXBwb3J0Lm9ic2VydmVyKSkge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIHMucmVtb3ZlU2xpZGUgPSBmdW5jdGlvbiAoc2xpZGVzSW5kZXhlcykge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLmRlc3Ryb3lMb29wKCk7XG4gICAgICAgICAgICAgICAgcy5zbGlkZXMgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3QWN0aXZlSW5kZXggPSBzLmFjdGl2ZUluZGV4LFxuICAgICAgICAgICAgICAgIGluZGV4VG9SZW1vdmU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNsaWRlc0luZGV4ZXMgPT09ICdvYmplY3QnICYmIHNsaWRlc0luZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNJbmRleGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHMuc2xpZGVzLmVxKGluZGV4VG9SZW1vdmUpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSBuZXdBY3RpdmVJbmRleC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzO1xuICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgcy5zbGlkZXMuZXEoaW5kZXhUb1JlbW92ZSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPCBuZXdBY3RpdmVJbmRleCkgbmV3QWN0aXZlSW5kZXgtLTtcbiAgICAgICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuY3JlYXRlTG9vcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICghKHMucGFyYW1zLm9ic2VydmVyICYmIHMuc3VwcG9ydC5vYnNlcnZlcikpIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4ICsgcy5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgcy5yZW1vdmVBbGxTbGlkZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2xpZGVzSW5kZXhlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNsaWRlc0luZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMucmVtb3ZlU2xpZGUoc2xpZGVzSW5kZXhlcyk7XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEVmZmVjdHNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmVmZmVjdHMgPSB7XG4gICAgICAgICAgICBmYWRlOiB7XG4gICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzLmVxKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IHNsaWRlWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR4ID0gLW9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkgdHggPSB0eCAtIHMudHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5ID0gdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlT3BhY2l0eSA9IHMucGFyYW1zLmZhZGUuY3Jvc3NGYWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMSAtIE1hdGguYWJzKHNsaWRlWzBdLnByb2dyZXNzKSwgMCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxICsgTWF0aC5taW4oTWF0aC5tYXgoc2xpZGVbMF0ucHJvZ3Jlc3MsIC0xKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBzbGlkZU9wYWNpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyB0eCArICdweCwgJyArIHR5ICsgJ3B4LCAwcHgpJyk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSAmJiBkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50VHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlcy50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRUcmlnZ2VyZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlckV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJywgJ29UcmFuc2l0aW9uRW5kJywgJ01TVHJhbnNpdGlvbkVuZCcsICdtc1RyYW5zaXRpb25FbmQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyaWdnZXJFdmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmxpcDoge1xuICAgICAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IHNsaWRlWzBdLnByb2dyZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZsaXAubGltaXRSb3RhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oc2xpZGVbMF0ucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gc2xpZGVbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm90YXRlID0gLTE4MCAqIHByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZVkgPSByb3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlWCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAtb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5ID0gdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZVggPSAtcm90YXRlWTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVZID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMucnRsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlWSA9IC1yb3RhdGVZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlWzBdLnN0eWxlLnpJbmRleCA9IC1NYXRoLmFicyhNYXRoLnJvdW5kKHByb2dyZXNzKSkgKyBzLnNsaWRlcy5sZW5ndGg7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZsaXAuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgc2hhZG93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dCZWZvcmUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0FmdGVyID0gcy5pc0hvcml6b250YWwoKSA/IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nICsgKHMuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJykgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJyArIChzLmlzSG9yaXpvbnRhbCgpID8gJ3JpZ2h0JyA6ICdib3R0b20nKSArICdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kKHNoYWRvd0FmdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgoLXByb2dyZXNzLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoJyArIHR4ICsgJ3B4LCAnICsgdHkgKyAncHgsIDBweCkgcm90YXRlWCgnICsgcm90YXRlWCArICdkZWcpIHJvdGF0ZVkoJyArIHJvdGF0ZVkgKyAnZGVnKScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXMudHJhbnNpdGlvbihkdXJhdGlvbikuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlICYmIGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudFRyaWdnZXJlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcyhzLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmlnZ2VyRXZlbnRzID0gWyd3ZWJraXRUcmFuc2l0aW9uRW5kJywgJ3RyYW5zaXRpb25lbmQnLCAnb1RyYW5zaXRpb25FbmQnLCAnTVNUcmFuc2l0aW9uRW5kJywgJ21zVHJhbnNpdGlvbkVuZCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJpZ2dlckV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJpZ2dlcih0cmlnZ2VyRXZlbnRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdWJlOiB7XG4gICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3cmFwcGVyUm90YXRlID0gMCwgY3ViZVNoYWRvdztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmN1YmUuc2hhZG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1YmVTaGFkb3cgPSBzLndyYXBwZXIuZmluZCgnLnN3aXBlci1jdWJlLXNoYWRvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdWJlU2hhZG93Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdWJlU2hhZG93ID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1jdWJlLXNoYWRvd1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuYXBwZW5kKGN1YmVTaGFkb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdWJlU2hhZG93LmNzcyh7aGVpZ2h0OiBzLndpZHRoICsgJ3B4J30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdyA9IHMuY29udGFpbmVyLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3ViZVNoYWRvdy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdyA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5jb250YWluZXIuYXBwZW5kKGN1YmVTaGFkb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUFuZ2xlID0gaSAqIDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdW5kID0gTWF0aC5mbG9vcihzbGlkZUFuZ2xlIC8gMzYwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlQW5nbGUgPSAtc2xpZGVBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3VuZCA9IE1hdGguZmxvb3IoLXNsaWRlQW5nbGUgLyAzNjApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oc2xpZGVbMF0ucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHggPSAwLCB0eSA9IDAsIHR6ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICUgNCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gLSByb3VuZCAqIDQgKiBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGkgLSAxKSAlIDQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHogPSAtIHJvdW5kICogNCAqIHMuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChpIC0gMikgJSA0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSBzLnNpemUgKyByb3VuZCAqIDQgKiBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHogPSBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoaSAtIDMpICUgNCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gLSBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHogPSAzICogcy5zaXplICsgcy5zaXplICogNCAqIHJvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucnRsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAtdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHkgPSB0eDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICdyb3RhdGVYKCcgKyAocy5pc0hvcml6b250YWwoKSA/IDAgOiAtc2xpZGVBbmdsZSkgKyAnZGVnKSByb3RhdGVZKCcgKyAocy5pc0hvcml6b250YWwoKSA/IHNsaWRlQW5nbGUgOiAwKSArICdkZWcpIHRyYW5zbGF0ZTNkKCcgKyB0eCArICdweCwgJyArIHR5ICsgJ3B4LCAnICsgdHogKyAncHgpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8PSAxICYmIHByb2dyZXNzID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyUm90YXRlID0gaSAqIDkwICsgcHJvZ3Jlc3MgKiA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIHdyYXBwZXJSb3RhdGUgPSAtaSAqIDkwIC0gcHJvZ3Jlc3MgKiA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLnRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmN1YmUuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgc2hhZG93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dCZWZvcmUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0FmdGVyID0gcy5pc0hvcml6b250YWwoKSA/IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nICsgKHMuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJykgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJyArIChzLmlzSG9yaXpvbnRhbCgpID8gJ3JpZ2h0JyA6ICdib3R0b20nKSArICdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kKHNoYWRvd0FmdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgoLXByb2dyZXNzLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbic6ICc1MCUgNTAlIC0nICsgKHMuc2l6ZSAvIDIpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICctbW96LXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJSAtJyArIChzLnNpemUgLyAyKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnLW1zLXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJSAtJyArIChzLnNpemUgLyAyKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtLW9yaWdpbic6ICc1MCUgNTAlIC0nICsgKHMuc2l6ZSAvIDIpICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jdWJlLnNoYWRvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdWJlU2hhZG93LnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMHB4LCAnICsgKHMud2lkdGggLyAyICsgcy5wYXJhbXMuY3ViZS5zaGFkb3dPZmZzZXQpICsgJ3B4LCAnICsgKC1zLndpZHRoIC8gMikgKyAncHgpIHJvdGF0ZVgoOTBkZWcpIHJvdGF0ZVooMGRlZykgc2NhbGUoJyArIChzLnBhcmFtcy5jdWJlLnNoYWRvd1NjYWxlKSArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hhZG93QW5nbGUgPSBNYXRoLmFicyh3cmFwcGVyUm90YXRlKSAtIE1hdGguZmxvb3IoTWF0aC5hYnMod3JhcHBlclJvdGF0ZSkgLyA5MCkgKiA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXVsdGlwbGllciA9IDEuNSAtIChNYXRoLnNpbihzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJIC8gMzYwKSAvIDIgKyBNYXRoLmNvcyhzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJIC8gMzYwKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY2FsZTEgPSBzLnBhcmFtcy5jdWJlLnNoYWRvd1NjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTIgPSBzLnBhcmFtcy5jdWJlLnNoYWRvd1NjYWxlIC8gbXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gcy5wYXJhbXMuY3ViZS5zaGFkb3dPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdy50cmFuc2Zvcm0oJ3NjYWxlM2QoJyArIHNjYWxlMSArICcsIDEsICcgKyBzY2FsZTIgKyAnKSB0cmFuc2xhdGUzZCgwcHgsICcgKyAocy5oZWlnaHQgLyAyICsgb2Zmc2V0KSArICdweCwgJyArICgtcy5oZWlnaHQgLyAyIC8gc2NhbGUyKSArICdweCkgcm90YXRlWCgtOTBkZWcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHpGYWN0b3IgPSAocy5pc1NhZmFyaSB8fCBzLmlzVWlXZWJWaWV3KSA/ICgtcy5zaXplIC8gMikgOiAwO1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwcHgsMCwnICsgekZhY3RvciArICdweCkgcm90YXRlWCgnICsgKHMuaXNIb3Jpem9udGFsKCkgPyAwIDogd3JhcHBlclJvdGF0ZSkgKyAnZGVnKSByb3RhdGVZKCcgKyAocy5pc0hvcml6b250YWwoKSA/IC13cmFwcGVyUm90YXRlIDogMCkgKyAnZGVnKScpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLnRyYW5zaXRpb24oZHVyYXRpb24pLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY3ViZS5zaGFkb3cgJiYgIXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuY29udGFpbmVyLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKS50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHMudHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2VudGVyID0gcy5pc0hvcml6b250YWwoKSA/IC10cmFuc2Zvcm0gKyBzLndpZHRoIC8gMiA6IC10cmFuc2Zvcm0gKyBzLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3RhdGUgPSBzLmlzSG9yaXpvbnRhbCgpID8gcy5wYXJhbXMuY292ZXJmbG93LnJvdGF0ZTogLXMucGFyYW1zLmNvdmVyZmxvdy5yb3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGUgPSBzLnBhcmFtcy5jb3ZlcmZsb3cuZGVwdGg7XG4gICAgICAgICAgICAgICAgICAgIC8vRWFjaCBzbGlkZSBvZmZzZXQgZnJvbSBjZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHMuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZVNpemUgPSBzLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZU9mZnNldCA9IHNsaWRlWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldE11bHRpcGxpZXIgPSAoY2VudGVyIC0gc2xpZGVPZmZzZXQgLSBzbGlkZVNpemUgLyAyKSAvIHNsaWRlU2l6ZSAqIHMucGFyYW1zLmNvdmVyZmxvdy5tb2RpZmllcjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm90YXRlWSA9IHMuaXNIb3Jpem9udGFsKCkgPyByb3RhdGUgKiBvZmZzZXRNdWx0aXBsaWVyIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3RhdGVYID0gcy5pc0hvcml6b250YWwoKSA/IDAgOiByb3RhdGUgKiBvZmZzZXRNdWx0aXBsaWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHJvdGF0ZVogPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlWiA9IC10cmFuc2xhdGUgKiBNYXRoLmFicyhvZmZzZXRNdWx0aXBsaWVyKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlWSA9IHMuaXNIb3Jpem9udGFsKCkgPyAwIDogcy5wYXJhbXMuY292ZXJmbG93LnN0cmV0Y2ggKiAob2Zmc2V0TXVsdGlwbGllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlWCA9IHMuaXNIb3Jpem9udGFsKCkgPyBzLnBhcmFtcy5jb3ZlcmZsb3cuc3RyZXRjaCAqIChvZmZzZXRNdWx0aXBsaWVyKSA6IDA7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXggZm9yIHVsdHJhIHNtYWxsIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVgpIDwgMC4wMDEpIHRyYW5zbGF0ZVggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVkpIDwgMC4wMDEpIHRyYW5zbGF0ZVkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVopIDwgMC4wMDEpIHRyYW5zbGF0ZVogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVkpIDwgMC4wMDEpIHJvdGF0ZVkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVgpIDwgMC4wMDEpIHJvdGF0ZVggPSAwO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZVRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlWCArICdweCwnICsgdHJhbnNsYXRlWSArICdweCwnICsgdHJhbnNsYXRlWiArICdweCkgIHJvdGF0ZVgoJyArIHJvdGF0ZVggKyAnZGVnKSByb3RhdGVZKCcgKyByb3RhdGVZICsgJ2RlZyknO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLnRyYW5zZm9ybShzbGlkZVRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChvZmZzZXRNdWx0aXBsaWVyKSkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNvdmVyZmxvdy5zbGlkZVNoYWRvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBzaGFkb3dzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0JlZm9yZSA9IHMuaXNIb3Jpem9udGFsKCkgPyBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykgOiBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hhZG93QWZ0ZXIgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0JlZm9yZSA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LScgKyAocy5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnKSArICdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kKHNoYWRvd0JlZm9yZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93QWZ0ZXIgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nICsgKHMuaXNIb3Jpem9udGFsKCkgPyAncmlnaHQnIDogJ2JvdHRvbScpICsgJ1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5hcHBlbmQoc2hhZG93QWZ0ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCkgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBvZmZzZXRNdWx0aXBsaWVyID4gMCA/IG9mZnNldE11bHRpcGxpZXIgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGgpIHNoYWRvd0FmdGVyWzBdLnN0eWxlLm9wYWNpdHkgPSAoLW9mZnNldE11bHRpcGxpZXIpID4gMCA/IC1vZmZzZXRNdWx0aXBsaWVyIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgY29ycmVjdCBwZXJzcGVjdGl2ZSBmb3IgSUUxMFxuICAgICAgICAgICAgICAgICAgICBpZiAocy5icm93c2VyLmllKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd3MgPSBzLndyYXBwZXJbMF0uc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cy5wZXJzcGVjdGl2ZU9yaWdpbiA9IGNlbnRlciArICdweCA1MCUnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXMudHJhbnNpdGlvbihkdXJhdGlvbikuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBJbWFnZXMgTGF6eSBMb2FkaW5nXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5sYXp5ID0ge1xuICAgICAgICAgICAgaW5pdGlhbEltYWdlTG9hZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGxvYWRJbWFnZUluU2xpZGU6IGZ1bmN0aW9uIChpbmRleCwgbG9hZEluRHVwbGljYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGxvYWRJbkR1cGxpY2F0ZSA9PT0gJ3VuZGVmaW5lZCcpIGxvYWRJbkR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHMuc2xpZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpbmRleCk7XG4gICAgICAgICAgICAgICAgdmFyIGltZyA9IHNsaWRlLmZpbmQoJy4nICsgcy5wYXJhbXMubGF6eUxvYWRpbmdDbGFzcyArICc6bm90KC4nICsgcy5wYXJhbXMubGF6eVN0YXR1c0xvYWRlZENsYXNzICsgJyk6bm90KC4nICsgcy5wYXJhbXMubGF6eVN0YXR1c0xvYWRpbmdDbGFzcyArICcpJyk7XG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLmxhenlMb2FkaW5nQ2xhc3MpICYmICFzbGlkZS5oYXNDbGFzcyhzLnBhcmFtcy5sYXp5U3RhdHVzTG9hZGVkQ2xhc3MpICYmICFzbGlkZS5oYXNDbGFzcyhzLnBhcmFtcy5sYXp5U3RhdHVzTG9hZGluZ0NsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBpbWcgPSBpbWcuYWRkKHNsaWRlWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGltZy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaW1nLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2ltZyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIF9pbWcuYWRkQ2xhc3Mocy5wYXJhbXMubGF6eVN0YXR1c0xvYWRpbmdDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0gX2ltZy5hdHRyKCdkYXRhLWJhY2tncm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNyYyA9IF9pbWcuYXR0cignZGF0YS1zcmMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY3NldCA9IF9pbWcuYXR0cignZGF0YS1zcmNzZXQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzID0gX2ltZy5hdHRyKCdkYXRhLXNpemVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHMubG9hZEltYWdlKF9pbWdbMF0sIChzcmMgfHwgYmFja2dyb3VuZCksIHNyY3NldCwgc2l6ZXMsIGZhbHNlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHMgPT09ICd1bmRlZmluZWQnIHx8IHMgPT09IG51bGwgfHwgIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKFwiJyArIGJhY2tncm91bmQgKyAnXCIpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5yZW1vdmVBdHRyKCdkYXRhLWJhY2tncm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcmNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5hdHRyKCdzcmNzZXQnLCBzcmNzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLnJlbW92ZUF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLmF0dHIoJ3NpemVzJywgc2l6ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLnJlbW92ZUF0dHIoJ2RhdGEtc2l6ZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLmF0dHIoJ3NyYycsIHNyYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbWcucmVtb3ZlQXR0cignZGF0YS1zcmMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pbWcuYWRkQ2xhc3Mocy5wYXJhbXMubGF6eVN0YXR1c0xvYWRlZENsYXNzKS5yZW1vdmVDbGFzcyhzLnBhcmFtcy5sYXp5U3RhdHVzTG9hZGluZ0NsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmZpbmQoJy4nICsgcy5wYXJhbXMubGF6eVByZWxvYWRlckNsYXNzICsgJywgLicgKyBzLnBhcmFtcy5wcmVsb2FkZXJDbGFzcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCAmJiBsb2FkSW5EdXBsaWNhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVPcmlnaW5hbEluZGV4ID0gc2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsU2xpZGUgPSBzLndyYXBwZXIuY2hpbGRyZW4oJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicgKyBzbGlkZU9yaWdpbmFsSW5kZXggKyAnXCJdOm5vdCguJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZEltYWdlSW5TbGlkZShvcmlnaW5hbFNsaWRlLmluZGV4KCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdXBsaWNhdGVkU2xpZGUgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgc2xpZGVPcmlnaW5hbEluZGV4ICsgJ1wiXScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZEltYWdlSW5TbGlkZShkdXBsaWNhdGVkU2xpZGUuaW5kZXgoKSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25MYXp5SW1hZ2VSZWFkeScsIHMsIHNsaWRlWzBdLCBfaW1nWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uTGF6eUltYWdlTG9hZCcsIHMsIHNsaWRlWzBdLCBfaW1nWzBdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXNQZXJWaWV3ID0gcy5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXcgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXMubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpIHMubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubGF6eS5sb2FkSW1hZ2VJblNsaWRlKCQodGhpcykuaW5kZXgoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1BlclZpZXcgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBzLmFjdGl2ZUluZGV4OyBpIDwgcy5hY3RpdmVJbmRleCArIHNsaWRlc1BlclZpZXcgOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbaV0pIHMubGF6eS5sb2FkSW1hZ2VJblNsaWRlKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmxvYWRJbWFnZUluU2xpZGUocy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxhenlMb2FkaW5nSW5QcmV2TmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVzUGVyVmlldyA+IDEgfHwgKHMucGFyYW1zLmxhenlMb2FkaW5nSW5QcmV2TmV4dEFtb3VudCAmJiBzLnBhcmFtcy5sYXp5TG9hZGluZ0luUHJldk5leHRBbW91bnQgPiAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFtb3VudCA9IHMucGFyYW1zLmxhenlMb2FkaW5nSW5QcmV2TmV4dEFtb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcHYgPSBzbGlkZXNQZXJWaWV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heEluZGV4ID0gTWF0aC5taW4ocy5hY3RpdmVJbmRleCArIHNwdiArIE1hdGgubWF4KGFtb3VudCwgc3B2KSwgcy5zbGlkZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW5JbmRleCA9IE1hdGgubWF4KHMuYWN0aXZlSW5kZXggLSBNYXRoLm1heChzcHYsIGFtb3VudCksIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV4dCBTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IHMuYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3OyBpIDwgbWF4SW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tpXSkgcy5sYXp5LmxvYWRJbWFnZUluU2xpZGUoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmV2IFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gbWluSW5kZXg7IGkgPCBzLmFjdGl2ZUluZGV4IDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2xpZGVzW2ldKSBzLmxhenkubG9hZEltYWdlSW5TbGlkZShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0U2xpZGUgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVOZXh0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZS5sZW5ndGggPiAwKSBzLmxhenkubG9hZEltYWdlSW5TbGlkZShuZXh0U2xpZGUuaW5kZXgoKSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZTbGlkZSA9IHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldlNsaWRlLmxlbmd0aCA+IDApIHMubGF6eS5sb2FkSW1hZ2VJblNsaWRlKHByZXZTbGlkZS5pbmRleCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRyYW5zaXRpb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sYXp5TG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubGF6eUxvYWRpbmdPblRyYW5zaXRpb25TdGFydCB8fCAoIXMucGFyYW1zLmxhenlMb2FkaW5nT25UcmFuc2l0aW9uU3RhcnQgJiYgIXMubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sYXp5TG9hZGluZyAmJiAhcy5wYXJhbXMubGF6eUxvYWRpbmdPblRyYW5zaXRpb25TdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgU2Nyb2xsYmFyXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5zY3JvbGxiYXIgPSB7XG4gICAgICAgICAgICBpc1RvdWNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc2V0RHJhZ1Bvc2l0aW9uOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBzYiA9IHMuc2Nyb2xsYmFyO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gMCwgeSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnRlclBvc2l0aW9uID0gcy5pc0hvcml6b250YWwoKSA/XG4gICAgICAgICAgICAgICAgICAgICgoZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAndG91Y2htb3ZlJykgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYIHx8IGUuY2xpZW50WCkgOlxuICAgICAgICAgICAgICAgICAgICAoKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3RvdWNobW92ZScpID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWSB8fCBlLmNsaWVudFkpIDtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSAocG9pbnRlclBvc2l0aW9uKSAtIHNiLnRyYWNrLm9mZnNldCgpW3MuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJ10gLSBzYi5kcmFnU2l6ZSAvIDI7XG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uTWluID0gLXMubWluVHJhbnNsYXRlKCkgKiBzYi5tb3ZlRGl2aWRlcjtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25NYXggPSAtcy5tYXhUcmFuc2xhdGUoKSAqIHNiLm1vdmVEaXZpZGVyO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8IHBvc2l0aW9uTWluKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb25NaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvc2l0aW9uID4gcG9zaXRpb25NYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbk1heDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAtcG9zaXRpb24gLyBzYi5tb3ZlRGl2aWRlcjtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUocG9zaXRpb24sIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWdTdGFydDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICBzYi5pc1RvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBzYi5zZXREcmFnUG9zaXRpb24oZSk7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNiLmRyYWdUaW1lb3V0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgc2IudHJhY2sudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFySGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFjay5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb24oMTAwKTtcbiAgICAgICAgICAgICAgICBzYi5kcmFnLnRyYW5zaXRpb24oMTAwKTtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2Nyb2xsYmFyRHJhZ1N0YXJ0Jywgcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZ01vdmU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNiID0gcy5zY3JvbGxiYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFzYi5pc1RvdWNoZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNiLnNldERyYWdQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICBzYi50cmFjay50cmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgICAgIHNiLmRyYWcudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2Nyb2xsYmFyRHJhZ01vdmUnLCBzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBzYiA9IHMuc2Nyb2xsYmFyO1xuICAgICAgICAgICAgICAgIGlmICghc2IuaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgc2IuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhckhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNiLmRyYWdUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZ1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrLmNzcygnb3BhY2l0eScsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2IudHJhY2sudHJhbnNpdGlvbig0MDApO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TY3JvbGxiYXJEcmFnRW5kJywgcyk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhclNuYXBPblJlbGVhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVJlc2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUV2ZW50czogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHMucGFyYW1zLnNpbXVsYXRlVG91Y2ggPT09IGZhbHNlICYmICFzLnN1cHBvcnQudG91Y2gpKSByZXR1cm4gcy50b3VjaEV2ZW50c0Rlc2t0b3A7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gcy50b3VjaEV2ZW50cztcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICBlbmFibGVEcmFnZ2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcy5zdXBwb3J0LnRvdWNoID8gc2IudHJhY2sgOiBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICAkKHNiLnRyYWNrKS5vbihzYi5kcmFnZ2FibGVFdmVudHMuc3RhcnQsIHNiLmRyYWdTdGFydCk7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLm9uKHNiLmRyYWdnYWJsZUV2ZW50cy5tb3ZlLCBzYi5kcmFnTW92ZSk7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLm9uKHNiLmRyYWdnYWJsZUV2ZW50cy5lbmQsIHNiLmRyYWdFbmQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2FibGVEcmFnZ2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcy5zdXBwb3J0LnRvdWNoID8gc2IudHJhY2sgOiBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICAkKHNiLnRyYWNrKS5vZmYoc2IuZHJhZ2dhYmxlRXZlbnRzLnN0YXJ0LCBzYi5kcmFnU3RhcnQpO1xuICAgICAgICAgICAgICAgICQodGFyZ2V0KS5vZmYoc2IuZHJhZ2dhYmxlRXZlbnRzLm1vdmUsIHNiLmRyYWdNb3ZlKTtcbiAgICAgICAgICAgICAgICAkKHRhcmdldCkub2ZmKHNiLmRyYWdnYWJsZUV2ZW50cy5lbmQsIHNiLmRyYWdFbmQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuc2Nyb2xsYmFyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHNiID0gcy5zY3JvbGxiYXI7XG4gICAgICAgICAgICAgICAgc2IudHJhY2sgPSAkKHMucGFyYW1zLnNjcm9sbGJhcik7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBzLnBhcmFtcy5zY3JvbGxiYXIgPT09ICdzdHJpbmcnICYmIHNiLnRyYWNrLmxlbmd0aCA+IDEgJiYgcy5jb250YWluZXIuZmluZChzLnBhcmFtcy5zY3JvbGxiYXIpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFjayA9IHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMuc2Nyb2xsYmFyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2IuZHJhZyA9IHNiLnRyYWNrLmZpbmQoJy5zd2lwZXItc2Nyb2xsYmFyLWRyYWcnKTtcbiAgICAgICAgICAgICAgICBpZiAoc2IuZHJhZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZyA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItc2Nyb2xsYmFyLWRyYWdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2IudHJhY2suYXBwZW5kKHNiLmRyYWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYi5kcmFnWzBdLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAgICAgICAgICAgc2IuZHJhZ1swXS5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgICAgICAgICBzYi50cmFja1NpemUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2IudHJhY2tbMF0ub2Zmc2V0V2lkdGggOiBzYi50cmFja1swXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHNiLmRpdmlkZXIgPSBzLnNpemUgLyBzLnZpcnR1YWxTaXplO1xuICAgICAgICAgICAgICAgIHNiLm1vdmVEaXZpZGVyID0gc2IuZGl2aWRlciAqIChzYi50cmFja1NpemUgLyBzLnNpemUpO1xuICAgICAgICAgICAgICAgIHNiLmRyYWdTaXplID0gc2IudHJhY2tTaXplICogc2IuZGl2aWRlcjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZ1swXS5zdHlsZS53aWR0aCA9IHNiLmRyYWdTaXplICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNiLmRyYWdbMF0uc3R5bGUuaGVpZ2h0ID0gc2IuZHJhZ1NpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNiLmRpdmlkZXIgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFja1swXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2IudHJhY2tbMF0uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFySGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFja1swXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5zY3JvbGxiYXIpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgZGlmZjtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gcy50cmFuc2xhdGUgfHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgbmV3U2l6ZSA9IHNiLmRyYWdTaXplO1xuICAgICAgICAgICAgICAgIG5ld1BvcyA9IChzYi50cmFja1NpemUgLSBzYi5kcmFnU2l6ZSkgKiBzLnByb2dyZXNzO1xuICAgICAgICAgICAgICAgIGlmIChzLnJ0bCAmJiBzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BvcyA9IC1uZXdQb3M7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdQb3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaXplID0gc2IuZHJhZ1NpemUgLSBuZXdQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKC1uZXdQb3MgKyBzYi5kcmFnU2l6ZSA+IHNiLnRyYWNrU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2l6ZSA9IHNiLnRyYWNrU2l6ZSArIG5ld1BvcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1BvcyA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NpemUgPSBzYi5kcmFnU2l6ZSArIG5ld1BvcztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmV3UG9zICsgc2IuZHJhZ1NpemUgPiBzYi50cmFja1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NpemUgPSBzYi50cmFja1NpemUgLSBuZXdQb3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC50cmFuc2Zvcm1zM2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLmRyYWcudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgnICsgKG5ld1BvcykgKyAncHgsIDAsIDApJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5kcmFnLnRyYW5zZm9ybSgndHJhbnNsYXRlWCgnICsgKG5ld1BvcykgKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZ1swXS5zdHlsZS53aWR0aCA9IG5ld1NpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC50cmFuc2Zvcm1zM2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLmRyYWcudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwcHgsICcgKyAobmV3UG9zKSArICdweCwgMCknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLmRyYWcudHJhbnNmb3JtKCd0cmFuc2xhdGVZKCcgKyAobmV3UG9zKSArICdweCknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzYi5kcmFnWzBdLnN0eWxlLmhlaWdodCA9IG5ld1NpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFySGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2IudGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrWzBdLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgICAgICBzYi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi50cmFja1swXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrLnRyYW5zaXRpb24oNDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuc2Nyb2xsYmFyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuZHJhZy50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgQ29udHJvbGxlclxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuY29udHJvbGxlciA9IHtcbiAgICAgICAgICAgIExpbmVhclNwbGluZTogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmluYXJ5U2VhcmNoID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4SW5kZXgsIG1pbkluZGV4LCBndWVzcztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhJbmRleCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChtYXhJbmRleCAtIG1pbkluZGV4ID4gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlbZ3Vlc3MgPSBtYXhJbmRleCArIG1pbkluZGV4ID4+IDFdIDw9IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5JbmRleCA9IGd1ZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEluZGV4ID0gZ3Vlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1heEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEluZGV4ID0geC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIC8vIEdpdmVuIGFuIHggdmFsdWUgKHgyKSwgcmV0dXJuIHRoZSBleHBlY3RlZCB5MiB2YWx1ZTpcbiAgICAgICAgICAgICAgICAvLyAoeDEseTEpIGlzIHRoZSBrbm93biBwb2ludCBiZWZvcmUgZ2l2ZW4gdmFsdWUsXG4gICAgICAgICAgICAgICAgLy8gKHgzLHkzKSBpcyB0aGUga25vd24gcG9pbnQgYWZ0ZXIgZ2l2ZW4gdmFsdWUuXG4gICAgICAgICAgICAgICAgdmFyIGkxLCBpMztcbiAgICAgICAgICAgICAgICB2YXIgbCA9IHRoaXMueC5sZW5ndGg7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJwb2xhdGUgPSBmdW5jdGlvbiAoeDIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF4MikgcmV0dXJuIDA7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGluZGV4ZXMgb2YgeDEgYW5kIHgzICh0aGUgYXJyYXkgaW5kZXhlcyBiZWZvcmUgYW5kIGFmdGVyIGdpdmVuIHgyKTpcbiAgICAgICAgICAgICAgICAgICAgaTMgPSBiaW5hcnlTZWFyY2godGhpcy54LCB4Mik7XG4gICAgICAgICAgICAgICAgICAgIGkxID0gaTMgLSAxO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBvdXIgaW5kZXhlcyBpMSAmIGkzLCBzbyB3ZSBjYW4gY2FsY3VsYXRlIGFscmVhZHk6XG4gICAgICAgICAgICAgICAgICAgIC8vIHkyIDo9ICgoeDLiiJJ4MSkgw5cgKHkz4oiSeTEpKSDDtyAoeDPiiJJ4MSkgKyB5MVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh4MiAtIHRoaXMueFtpMV0pICogKHRoaXMueVtpM10gLSB0aGlzLnlbaTFdKSkgLyAodGhpcy54W2kzXSAtIHRoaXMueFtpMV0pICsgdGhpcy55W2kxXTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8veHh4OiBmb3Igbm93IGkgd2lsbCBqdXN0IHNhdmUgb25lIHNwbGluZSBmdW5jdGlvbiB0byB0b1xuICAgICAgICAgICAgZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbjogZnVuY3Rpb24oYyl7XG4gICAgICAgICAgICAgICAgaWYoIXMuY29udHJvbGxlci5zcGxpbmUpIHMuY29udHJvbGxlci5zcGxpbmUgPSBzLnBhcmFtcy5sb29wID9cbiAgICAgICAgICAgICAgICAgICAgbmV3IHMuY29udHJvbGxlci5MaW5lYXJTcGxpbmUocy5zbGlkZXNHcmlkLCBjLnNsaWRlc0dyaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgbmV3IHMuY29udHJvbGxlci5MaW5lYXJTcGxpbmUocy5zbmFwR3JpZCwgYy5zbmFwR3JpZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVkID0gcy5wYXJhbXMuY29udHJvbDtcbiAgICAgICAgICAgICAgIHZhciBtdWx0aXBsaWVyLCBjb250cm9sbGVkVHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgYW4gSW50ZXJwb2xhdGUgZnVuY3Rpb24gYmFzZWQgb24gdGhlIHNuYXBHcmlkc1xuICAgICAgICAgICAgICAgICAgICAvLyB4IGlzIHRoZSBHcmlkIG9mIHRoZSBzY3JvbGxlZCBzY3JvbGxlciBhbmQgeSB3aWxsIGJlIHRoZSBjb250cm9sbGVkIHNjcm9sbGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IG1ha2VzIHNlbnNlIHRvIGNyZWF0ZSB0aGlzIG9ubHkgb25jZSBhbmQgcmVjYWxsIGl0IGZvciB0aGUgaW50ZXJwb2xhdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZnVuY3Rpb24gZG9lcyBhIGxvdCBvZiB2YWx1ZSBjYWNoaW5nIGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUgPSBjLnJ0bCAmJiBjLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/IC1zLnRyYW5zbGF0ZSA6IHMudHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY29udHJvbEJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmNvbnRyb2xsZXIuZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbihjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGkgYW0gbm90IHN1cmUgd2h5IHRoZSB2YWx1ZXMgaGF2ZSB0byBiZSBtdWx0aXBsaWNhdGVkIHRoaXMgd2F5LCB0cmllZCB0byBpbnZlcnQgdGhlIHNuYXBHcmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgaXQgZGlkIG5vdCB3b3JrIG91dFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9IC1zLmNvbnRyb2xsZXIuc3BsaW5lLmludGVycG9sYXRlKC10cmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZighY29udHJvbGxlZFRyYW5zbGF0ZSB8fCBzLnBhcmFtcy5jb250cm9sQnkgPT09ICdjb250YWluZXInKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAoYy5tYXhUcmFuc2xhdGUoKSAtIGMubWluVHJhbnNsYXRlKCkpIC8gKHMubWF4VHJhbnNsYXRlKCkgLSBzLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZWRUcmFuc2xhdGUgPSAodHJhbnNsYXRlIC0gcy5taW5UcmFuc2xhdGUoKSkgKiBtdWx0aXBsaWVyICsgYy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNvbnRyb2xJbnZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gYy5tYXhUcmFuc2xhdGUoKSAtIGNvbnRyb2xsZWRUcmFuc2xhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYy51cGRhdGVQcm9ncmVzcyhjb250cm9sbGVkVHJhbnNsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgYy5zZXRXcmFwcGVyVHJhbnNsYXRlKGNvbnRyb2xsZWRUcmFuc2xhdGUsIGZhbHNlLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgYy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29udHJvbGxlZCkpIHtcbiAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyb2xsZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNsYXRlKGNvbnRyb2xsZWRbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgZWxzZSBpZiAoY29udHJvbGxlZCBpbnN0YW5jZW9mIFN3aXBlciAmJiBieUNvbnRyb2xsZXIgIT09IGNvbnRyb2xsZWQpIHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjb250cm9sbGVkKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZHVyYXRpb24sIGJ5Q29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVkID0gcy5wYXJhbXMuY29udHJvbDtcbiAgICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjKSB7XG4gICAgICAgICAgICAgICAgICAgIGMuc2V0V3JhcHBlclRyYW5zaXRpb24oZHVyYXRpb24sIHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHVyYXRpb24gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMub25UcmFuc2l0aW9uU3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMud3JhcHBlci50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250cm9sbGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMucGFyYW1zLmxvb3AgJiYgcy5wYXJhbXMuY29udHJvbEJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuZml4TG9vcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLm9uVHJhbnNpdGlvbkVuZCgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRyb2xsZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb250cm9sbGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlZFtpXSAhPT0gYnlDb250cm9sbGVyICYmIGNvbnRyb2xsZWRbaV0gaW5zdGFuY2VvZiBTd2lwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjb250cm9sbGVkW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb250cm9sbGVkIGluc3RhbmNlb2YgU3dpcGVyICYmIGJ5Q29udHJvbGxlciAhPT0gY29udHJvbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjb250cm9sbGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEhhc2ggTmF2aWdhdGlvblxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuaGFzaG5hdiA9IHtcbiAgICAgICAgICAgIG9uSGFzaENhbmdlOiBmdW5jdGlvbiAoZSwgYSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdIYXNoID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTbGlkZUhhc2ggPSBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3SGFzaCAhPT0gYWN0aXZlU2xpZGVIYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICdbZGF0YS1oYXNoPVwiJyArIChuZXdIYXNoKSArICdcIl0nKS5pbmRleCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0YWNoRXZlbnRzOiBmdW5jdGlvbiAoZGV0YWNoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGRldGFjaCA/ICdvZmYnIDogJ29uJztcbiAgICAgICAgICAgICAgICAkKHdpbmRvdylbYWN0aW9uXSgnaGFzaGNoYW5nZScsIHMuaGFzaG5hdi5vbkhhc2hDYW5nZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SGFzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5oYXNobmF2LmluaXRpYWxpemVkIHx8ICFzLnBhcmFtcy5oYXNobmF2KSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJlcGxhY2VTdGF0ZSAmJiB3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIG51bGwsICgnIycgKyBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKSB8fCAnJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzaCA9IHNsaWRlLmF0dHIoJ2RhdGEtaGFzaCcpIHx8IHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5oYXNoID0gaGFzaCB8fCAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuaGFzaG5hdiB8fCBzLnBhcmFtcy5oaXN0b3J5KSByZXR1cm47XG4gICAgICAgICAgICAgICAgcy5oYXNobmF2LmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzaCA9IGRvY3VtZW50LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFzaCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcy5zbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzLmVxKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlSGFzaCA9IHNsaWRlLmF0dHIoJ2RhdGEtaGFzaCcpIHx8IHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlSGFzaCA9PT0gaGFzaCAmJiAhc2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHMucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmhhc2huYXZXYXRjaFN0YXRlKSBzLmhhc2huYXYuYXR0YWNoRXZlbnRzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oYXNobmF2V2F0Y2hTdGF0ZSkgcy5oYXNobmF2LmF0dGFjaEV2ZW50cyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgSGlzdG9yeSBBcGkgd2l0aCBmYWxsYmFjayB0byBIYXNobmF2XG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5oaXN0b3J5ID0ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuaGlzdG9yeSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICghd2luZG93Lmhpc3RvcnkgfHwgIXdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBzLnBhcmFtcy5oaXN0b3J5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHMucGFyYW1zLmhhc2huYXYgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMuaGlzdG9yeS5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRocyA9IHRoaXMuZ2V0UGF0aFZhbHVlcygpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYXRocy5rZXkgJiYgIXRoaXMucGF0aHMudmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvU2xpZGUoMCwgdGhpcy5wYXRocy52YWx1ZSwgcy5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KTtcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLnNldEhpc3RvcnlQb3BTdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhpc3RvcnlQb3BTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcy5oaXN0b3J5LnBhdGhzID0gcy5oaXN0b3J5LmdldFBhdGhWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICBzLmhpc3Rvcnkuc2Nyb2xsVG9TbGlkZShzLnBhcmFtcy5zcGVlZCwgcy5oaXN0b3J5LnBhdGhzLnZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UGF0aFZhbHVlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhdGhBcnJheSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgxKS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IHBhdGhBcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IHBhdGhBcnJheVt0b3RhbCAtIDJdO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhdGhBcnJheVt0b3RhbCAtIDFdO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRIaXN0b3J5OiBmdW5jdGlvbiAoa2V5LCBpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5oaXN0b3J5LmluaXRpYWxpemVkIHx8ICFzLnBhcmFtcy5oaXN0b3J5KSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gcy5zbGlkZXMuZXEoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuc2x1Z2lmeShzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKSk7XG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGtleSArICcvJyArIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2x1Z2lmeTogZnVuY3Rpb24odGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCAnLScpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXlxcd1xcLV0rL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwtXFwtKy9nLCAnLScpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eLSsvLCAnJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0rJC8sICcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY3JvbGxUb1NsaWRlOiBmdW5jdGlvbihzcGVlZCwgdmFsdWUsIHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcy5zbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzLmVxKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlSGlzdG9yeSA9IHRoaXMuc2x1Z2lmeShzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVIaXN0b3J5ID09PSB2YWx1ZSAmJiAhc2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oMCwgc3BlZWQsIHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBLZXlib2FyZCBDb250cm9sXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlS2V5Ym9hcmQoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDsgLy9qcXVlcnkgZml4XG4gICAgICAgICAgICB2YXIga2MgPSBlLmtleUNvZGUgfHwgZS5jaGFyQ29kZTtcbiAgICAgICAgICAgIC8vIERpcmVjdGlvbnMgbG9ja3NcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCAmJiAocy5pc0hvcml6b250YWwoKSAmJiBrYyA9PT0gMzkgfHwgIXMuaXNIb3Jpem9udGFsKCkgJiYga2MgPT09IDQwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiAmJiAocy5pc0hvcml6b250YWwoKSAmJiBrYyA9PT0gMzcgfHwgIXMuaXNIb3Jpem9udGFsKCkgJiYga2MgPT09IDM4KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5IHx8IGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lICYmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrYyA9PT0gMzcgfHwga2MgPT09IDM5IHx8IGtjID09PSAzOCB8fCBrYyA9PT0gNDApIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5WaWV3ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy9DaGVjayB0aGF0IHN3aXBlciBzaG91bGQgYmUgaW5zaWRlIG9mIHZpc2libGUgYXJlYSBvZiB3aW5kb3dcbiAgICAgICAgICAgICAgICBpZiAocy5jb250YWluZXIucGFyZW50cygnLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKS5sZW5ndGggPiAwICYmIHMuY29udGFpbmVyLnBhcmVudHMoJy4nICsgcy5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd1Njcm9sbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHdpbmRvdy5wYWdlWU9mZnNldFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyT2Zmc2V0ID0gcy5jb250YWluZXIub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHMucnRsKSBzd2lwZXJPZmZzZXQubGVmdCA9IHN3aXBlck9mZnNldC5sZWZ0IC0gcy5jb250YWluZXJbMF0uc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyQ29vcmQgPSBbXG4gICAgICAgICAgICAgICAgICAgIFtzd2lwZXJPZmZzZXQubGVmdCwgc3dpcGVyT2Zmc2V0LnRvcF0sXG4gICAgICAgICAgICAgICAgICAgIFtzd2lwZXJPZmZzZXQubGVmdCArIHMud2lkdGgsIHN3aXBlck9mZnNldC50b3BdLFxuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3AgKyBzLmhlaWdodF0sXG4gICAgICAgICAgICAgICAgICAgIFtzd2lwZXJPZmZzZXQubGVmdCArIHMud2lkdGgsIHN3aXBlck9mZnNldC50b3AgKyBzLmhlaWdodF1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3dpcGVyQ29vcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gc3dpcGVyQ29vcmRbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50WzBdID49IHdpbmRvd1Njcm9sbC5sZWZ0ICYmIHBvaW50WzBdIDw9IHdpbmRvd1Njcm9sbC5sZWZ0ICsgd2luZG93V2lkdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50WzFdID49IHdpbmRvd1Njcm9sbC50b3AgJiYgcG9pbnRbMV0gPD0gd2luZG93U2Nyb2xsLnRvcCArIHdpbmRvd0hlaWdodFxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluVmlldyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaW5WaWV3KSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgIGlmIChrYyA9PT0gMzcgfHwga2MgPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKGtjID09PSAzOSAmJiAhcy5ydGwpIHx8IChrYyA9PT0gMzcgJiYgcy5ydGwpKSBzLnNsaWRlTmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmICgoa2MgPT09IDM3ICYmICFzLnJ0bCkgfHwgKGtjID09PSAzOSAmJiBzLnJ0bCkpIHMuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoa2MgPT09IDM4IHx8IGtjID09PSA0MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGtjID09PSA0MCkgcy5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoa2MgPT09IDM4KSBzLnNsaWRlUHJldigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5lbWl0KCdvbktleVByZXNzJywgcywga2MpO1xuICAgICAgICB9XG4gICAgICAgIHMuZGlzYWJsZUtleWJvYXJkQ29udHJvbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmtleWJvYXJkQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duJywgaGFuZGxlS2V5Ym9hcmQpO1xuICAgICAgICB9O1xuICAgICAgICBzLmVuYWJsZUtleWJvYXJkQ29udHJvbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmtleWJvYXJkQ29udHJvbCA9IHRydWU7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIGhhbmRsZUtleWJvYXJkKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgTW91c2V3aGVlbCBDb250cm9sXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5tb3VzZXdoZWVsID0ge1xuICAgICAgICAgICAgZXZlbnQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdFNjcm9sbFRpbWU6IChuZXcgd2luZG93LkRhdGUoKSkuZ2V0VGltZSgpXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGlzRXZlbnRTdXBwb3J0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gJ29ud2hlZWwnO1xuICAgICAgICAgICAgdmFyIGlzU3VwcG9ydGVkID0gZXZlbnROYW1lIGluIGRvY3VtZW50O1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGV2ZW50TmFtZSwgJ3JldHVybjsnKTtcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZCA9IHR5cGVvZiBlbGVtZW50W2V2ZW50TmFtZV0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCAmJlxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uICYmXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSAmJlxuICAgICAgICAgICAgICAgICAgICAvLyBhbHdheXMgcmV0dXJucyB0cnVlIGluIG5ld2VyIGJyb3dzZXJzIGFzIHBlciB0aGUgc3RhbmRhcmQuXG4gICAgICAgICAgICAgICAgICAgIC8vIEBzZWUgaHR0cDovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1kb21pbXBsZW1lbnRhdGlvbi1oYXNmZWF0dXJlXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSgnJywgJycpICE9PSB0cnVlICkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIG9ubHkgd2F5IHRvIHRlc3Qgc3VwcG9ydCBmb3IgdGhlIGB3aGVlbGAgZXZlbnQgaW4gSUU5Ky5cbiAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoJ0V2ZW50cy53aGVlbCcsICczLjAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vdXNlIHdoZWVsIChhbmQgMi1maW5nZXIgdHJhY2twYWQpIHN1cHBvcnQgb24gdGhlIHdlYiBzdWNrcy4gIEl0IGlzXG4gICAgICAgICAqIGNvbXBsaWNhdGVkLCB0aHVzIHRoaXMgZG9jIGlzIGxvbmcgYW5kIChob3BlZnVsbHkpIGRldGFpbGVkIGVub3VnaCB0byBhbnN3ZXJcbiAgICAgICAgICogeW91ciBxdWVzdGlvbnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHlvdSBuZWVkIHRvIHJlYWN0IHRvIHRoZSBtb3VzZSB3aGVlbCBpbiBhIHByZWRpY3RhYmxlIHdheSwgdGhpcyBjb2RlIGlzXG4gICAgICAgICAqIGxpa2UgeW91ciBiZXN0ZXN0IGZyaWVuZC4gKiBodWdzICpcbiAgICAgICAgICpcbiAgICAgICAgICogQXMgb2YgdG9kYXksIHRoZXJlIGFyZSA0IERPTSBldmVudCB0eXBlcyB5b3UgY2FuIGxpc3RlbiB0bzpcbiAgICAgICAgICpcbiAgICAgICAgICogICAnd2hlZWwnICAgICAgICAgICAgICAgIC0tIENocm9tZSgzMSspLCBGRigxNyspLCBJRSg5KylcbiAgICAgICAgICogICAnbW91c2V3aGVlbCcgICAgICAgICAgIC0tIENocm9tZSwgSUUoNispLCBPcGVyYSwgU2FmYXJpXG4gICAgICAgICAqICAgJ01vek1vdXNlUGl4ZWxTY3JvbGwnICAtLSBGRigzLjUgb25seSEpICgyMDEwLTIwMTMpIC0tIGRvbid0IGJvdGhlciFcbiAgICAgICAgICogICAnRE9NTW91c2VTY3JvbGwnICAgICAgIC0tIEZGKDAuOS43Kykgc2luY2UgMjAwM1xuICAgICAgICAgKlxuICAgICAgICAgKiBTbyB3aGF0IHRvIGRvPyAgVGhlIGlzIHRoZSBiZXN0OlxuICAgICAgICAgKlxuICAgICAgICAgKiAgIG5vcm1hbGl6ZVdoZWVsLmdldEV2ZW50VHlwZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiBJbiB5b3VyIGV2ZW50IGNhbGxiYWNrLCB1c2UgdGhpcyBjb2RlIHRvIGdldCBzYW5lIGludGVycHJldGF0aW9uIG9mIHRoZVxuICAgICAgICAgKiBkZWx0YXMuICBUaGlzIGNvZGUgd2lsbCByZXR1cm4gYW4gb2JqZWN0IHdpdGggcHJvcGVydGllczpcbiAgICAgICAgICpcbiAgICAgICAgICogICBzcGluWCAgIC0tIG5vcm1hbGl6ZWQgc3BpbiBzcGVlZCAodXNlIGZvciB6b29tKSAtIHggcGxhbmVcbiAgICAgICAgICogICBzcGluWSAgIC0tIFwiIC0geSBwbGFuZVxuICAgICAgICAgKiAgIHBpeGVsWCAgLS0gbm9ybWFsaXplZCBkaXN0YW5jZSAodG8gcGl4ZWxzKSAtIHggcGxhbmVcbiAgICAgICAgICogICBwaXhlbFkgIC0tIFwiIC0geSBwbGFuZVxuICAgICAgICAgKlxuICAgICAgICAgKiBXaGVlbCB2YWx1ZXMgYXJlIHByb3ZpZGVkIGJ5IHRoZSBicm93c2VyIGFzc3VtaW5nIHlvdSBhcmUgdXNpbmcgdGhlIHdoZWVsIHRvXG4gICAgICAgICAqIHNjcm9sbCBhIHdlYiBwYWdlIGJ5IGEgbnVtYmVyIG9mIGxpbmVzIG9yIHBpeGVscyAob3IgcGFnZXMpLiAgVmFsdWVzIGNhbiB2YXJ5XG4gICAgICAgICAqIHNpZ25pZmljYW50bHkgb24gZGlmZmVyZW50IHBsYXRmb3JtcyBhbmQgYnJvd3NlcnMsIGZvcmdldHRpbmcgdGhhdCB5b3UgY2FuXG4gICAgICAgICAqIHNjcm9sbCBhdCBkaWZmZXJlbnQgc3BlZWRzLiAgU29tZSBkZXZpY2VzIChsaWtlIHRyYWNrcGFkcykgZW1pdCBtb3JlIGV2ZW50c1xuICAgICAgICAgKiBhdCBzbWFsbGVyIGluY3JlbWVudHMgd2l0aCBmaW5lIGdyYW51bGFyaXR5LCBhbmQgc29tZSBlbWl0IG1hc3NpdmUganVtcHMgd2l0aFxuICAgICAgICAgKiBsaW5lYXIgc3BlZWQgb3IgYWNjZWxlcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIGNvZGUgZG9lcyBpdHMgYmVzdCB0byBub3JtYWxpemUgdGhlIGRlbHRhcyBmb3IgeW91OlxuICAgICAgICAgKlxuICAgICAgICAgKiAgIC0gc3BpbiBpcyB0cnlpbmcgdG8gbm9ybWFsaXplIGhvdyBmYXIgdGhlIHdoZWVsIHdhcyBzcHVuIChvciB0cmFja3BhZFxuICAgICAgICAgKiAgICAgZHJhZ2dlZCkuICBUaGlzIGlzIHN1cGVyIHVzZWZ1bCBmb3Igem9vbSBzdXBwb3J0IHdoZXJlIHlvdSB3YW50IHRvXG4gICAgICAgICAqICAgICB0aHJvdyBhd2F5IHRoZSBjaHVua3kgc2Nyb2xsIHN0ZXBzIG9uIHRoZSBQQyBhbmQgbWFrZSB0aG9zZSBlcXVhbCB0b1xuICAgICAgICAgKiAgICAgdGhlIHNsb3cgYW5kIHNtb290aCB0aW55IHN0ZXBzIG9uIHRoZSBNYWMuIEtleSBkYXRhOiBUaGlzIGNvZGUgdHJpZXMgdG9cbiAgICAgICAgICogICAgIHJlc29sdmUgYSBzaW5nbGUgc2xvdyBzdGVwIG9uIGEgd2hlZWwgdG8gMS5cbiAgICAgICAgICpcbiAgICAgICAgICogICAtIHBpeGVsIGlzIG5vcm1hbGl6aW5nIHRoZSBkZXNpcmVkIHNjcm9sbCBkZWx0YSBpbiBwaXhlbCB1bml0cy4gIFlvdSdsbFxuICAgICAgICAgKiAgICAgZ2V0IHRoZSBjcmF6eSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGJyb3dzZXJzLCBidXQgYXQgbGVhc3QgaXQnbGwgYmUgaW5cbiAgICAgICAgICogICAgIHBpeGVscyFcbiAgICAgICAgICpcbiAgICAgICAgICogICAtIHBvc2l0aXZlIHZhbHVlIGluZGljYXRlcyBzY3JvbGxpbmcgRE9XTi9SSUdIVCwgbmVnYXRpdmUgVVAvTEVGVC4gIFRoaXNcbiAgICAgICAgICogICAgIHNob3VsZCB0cmFuc2xhdGUgdG8gcG9zaXRpdmUgdmFsdWUgem9vbWluZyBJTiwgbmVnYXRpdmUgem9vbWluZyBPVVQuXG4gICAgICAgICAqICAgICBUaGlzIG1hdGNoZXMgdGhlIG5ld2VyICd3aGVlbCcgZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIFdoeSBhcmUgdGhlcmUgc3BpblgsIHNwaW5ZIChvciBwaXhlbHMpP1xuICAgICAgICAgKlxuICAgICAgICAgKiAgIC0gc3BpblggaXMgYSAyLWZpbmdlciBzaWRlIGRyYWcgb24gdGhlIHRyYWNrcGFkLCBhbmQgYSBzaGlmdCArIHdoZWVsIHR1cm5cbiAgICAgICAgICogICAgIHdpdGggYSBtb3VzZS4gIEl0IHJlc3VsdHMgaW4gc2lkZS1zY3JvbGxpbmcgaW4gdGhlIGJyb3dzZXIgYnkgZGVmYXVsdC5cbiAgICAgICAgICpcbiAgICAgICAgICogICAtIHNwaW5ZIGlzIHdoYXQgeW91IGV4cGVjdCAtLSBpdCdzIHRoZSBjbGFzc2ljIGF4aXMgb2YgYSBtb3VzZSB3aGVlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogICAtIEkgZHJvcHBlZCBzcGluWi9waXhlbFouICBJdCBpcyBzdXBwb3J0ZWQgYnkgdGhlIERPTSAzICd3aGVlbCcgZXZlbnQgYW5kXG4gICAgICAgICAqICAgICBwcm9iYWJseSBpcyBieSBicm93c2VycyBpbiBjb25qdW5jdGlvbiB3aXRoIGZhbmN5IDNEIGNvbnRyb2xsZXJzIC4uIGJ1dFxuICAgICAgICAgKiAgICAgeW91IGtub3cuXG4gICAgICAgICAqXG4gICAgICAgICAqIEltcGxlbWVudGF0aW9uIGluZm86XG4gICAgICAgICAqXG4gICAgICAgICAqIEV4YW1wbGVzIG9mICd3aGVlbCcgZXZlbnQgaWYgeW91IHNjcm9sbCBzbG93bHkgKGRvd24pIGJ5IG9uZSBzdGVwIHdpdGggYW5cbiAgICAgICAgICogYXZlcmFnZSBtb3VzZTpcbiAgICAgICAgICpcbiAgICAgICAgICogICBPUyBYICsgQ2hyb21lICAobW91c2UpICAgICAtICAgIDQgICBwaXhlbCBkZWx0YSAgKHdoZWVsRGVsdGEgLTEyMClcbiAgICAgICAgICogICBPUyBYICsgU2FmYXJpICAobW91c2UpICAgICAtICBOL0EgICBwaXhlbCBkZWx0YSAgKHdoZWVsRGVsdGEgIC0xMilcbiAgICAgICAgICogICBPUyBYICsgRmlyZWZveCAobW91c2UpICAgICAtICAgIDAuMSBsaW5lICBkZWx0YSAgKHdoZWVsRGVsdGEgIE4vQSlcbiAgICAgICAgICogICBXaW44ICsgQ2hyb21lICAobW91c2UpICAgICAtICAxMDAgICBwaXhlbCBkZWx0YSAgKHdoZWVsRGVsdGEgLTEyMClcbiAgICAgICAgICogICBXaW44ICsgRmlyZWZveCAobW91c2UpICAgICAtICAgIDMgICBsaW5lICBkZWx0YSAgKHdoZWVsRGVsdGEgLTEyMClcbiAgICAgICAgICpcbiAgICAgICAgICogT24gdGhlIHRyYWNrcGFkOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgIE9TIFggKyBDaHJvbWUgICh0cmFja3BhZCkgIC0gICAgMiAgIHBpeGVsIGRlbHRhICAod2hlZWxEZWx0YSAgIC02KVxuICAgICAgICAgKiAgIE9TIFggKyBGaXJlZm94ICh0cmFja3BhZCkgIC0gICAgMSAgIHBpeGVsIGRlbHRhICAod2hlZWxEZWx0YSAgTi9BKVxuICAgICAgICAgKlxuICAgICAgICAgKiBPbiBvdGhlci9vbGRlciBicm93c2Vycy4uIGl0J3MgbW9yZSBjb21wbGljYXRlZCBhcyB0aGVyZSBjYW4gYmUgbXVsdGlwbGUgYW5kXG4gICAgICAgICAqIGFsc28gbWlzc2luZyBkZWx0YSB2YWx1ZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSAnd2hlZWwnIGV2ZW50IGlzIG1vcmUgc3RhbmRhcmQ6XG4gICAgICAgICAqXG4gICAgICAgICAqIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnRzLXdoZWVsZXZlbnRzXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBiYXNpY3MgaXMgdGhhdCBpdCBpbmNsdWRlcyBhIHVuaXQsIGRlbHRhTW9kZSAocGl4ZWxzLCBsaW5lcywgcGFnZXMpLCBhbmRcbiAgICAgICAgICogZGVsdGFYLCBkZWx0YVkgYW5kIGRlbHRhWi4gIFNvbWUgYnJvd3NlcnMgcHJvdmlkZSBvdGhlciB2YWx1ZXMgdG8gbWFpbnRhaW5cbiAgICAgICAgICogYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIG9sZGVyIGV2ZW50cy4gIFRob3NlIG90aGVyIHZhbHVlcyBoZWxwIHVzXG4gICAgICAgICAqIGJldHRlciBub3JtYWxpemUgc3BpbiBzcGVlZC4gIEV4YW1wbGUgb2Ygd2hhdCB0aGUgYnJvd3NlcnMgcHJvdmlkZTpcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIHwgZXZlbnQud2hlZWxEZWx0YSB8IGV2ZW50LmRldGFpbFxuICAgICAgICAgKiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLVxuICAgICAgICAgKiAgICAgICAgICBTYWZhcmkgdjUvT1MgWCAgfCAgICAgICAtMTIwICAgICAgIHwgICAgICAgMFxuICAgICAgICAgKiAgICAgICAgICBTYWZhcmkgdjUvV2luNyAgfCAgICAgICAtMTIwICAgICAgIHwgICAgICAgMFxuICAgICAgICAgKiAgICAgICAgIENocm9tZSB2MTcvT1MgWCAgfCAgICAgICAtMTIwICAgICAgIHwgICAgICAgMFxuICAgICAgICAgKiAgICAgICAgIENocm9tZSB2MTcvV2luNyAgfCAgICAgICAtMTIwICAgICAgIHwgICAgICAgMFxuICAgICAgICAgKiAgICAgICAgICAgICAgICBJRTkvV2luNyAgfCAgICAgICAtMTIwICAgICAgIHwgICB1bmRlZmluZWRcbiAgICAgICAgICogICAgICAgICBGaXJlZm94IHY0L09TIFggIHwgICAgIHVuZGVmaW5lZCAgICB8ICAgICAgIDFcbiAgICAgICAgICogICAgICAgICBGaXJlZm94IHY0L1dpbjcgIHwgICAgIHVuZGVmaW5lZCAgICB8ICAgICAgIDNcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVdoZWVsKCAvKm9iamVjdCovIGV2ZW50ICkgLypvYmplY3QqLyB7XG4gICAgICAgICAgICAvLyBSZWFzb25hYmxlIGRlZmF1bHRzXG4gICAgICAgICAgICB2YXIgUElYRUxfU1RFUCA9IDEwO1xuICAgICAgICAgICAgdmFyIExJTkVfSEVJR0hUID0gNDA7XG4gICAgICAgICAgICB2YXIgUEFHRV9IRUlHSFQgPSA4MDA7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHNYID0gMCwgc1kgPSAwLCAgICAgICAvLyBzcGluWCwgc3BpbllcbiAgICAgICAgICAgICAgICBwWCA9IDAsIHBZID0gMDsgICAgICAgLy8gcGl4ZWxYLCBwaXhlbFlcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBMZWdhY3lcbiAgICAgICAgICAgIGlmKCAnZGV0YWlsJyBpbiBldmVudCApIHtcbiAgICAgICAgICAgICAgICBzWSA9IGV2ZW50LmRldGFpbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCAnd2hlZWxEZWx0YScgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgc1kgPSAtZXZlbnQud2hlZWxEZWx0YSAvIDEyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCAnd2hlZWxEZWx0YVknIGluIGV2ZW50ICkge1xuICAgICAgICAgICAgICAgIHNZID0gLWV2ZW50LndoZWVsRGVsdGFZIC8gMTIwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoICd3aGVlbERlbHRhWCcgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgc1ggPSAtZXZlbnQud2hlZWxEZWx0YVggLyAxMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2lkZSBzY3JvbGxpbmcgb24gRkYgd2l0aCBET01Nb3VzZVNjcm9sbFxuICAgICAgICAgICAgaWYoICdheGlzJyBpbiBldmVudCAmJiBldmVudC5heGlzID09PSBldmVudC5IT1JJWk9OVEFMX0FYSVMgKSB7XG4gICAgICAgICAgICAgICAgc1ggPSBzWTtcbiAgICAgICAgICAgICAgICBzWSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcFggPSBzWCAqIFBJWEVMX1NURVA7XG4gICAgICAgICAgICBwWSA9IHNZICogUElYRUxfU1RFUDtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiggJ2RlbHRhWScgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgcFkgPSBldmVudC5kZWx0YVk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggJ2RlbHRhWCcgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgcFggPSBldmVudC5kZWx0YVg7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYoIChwWCB8fCBwWSkgJiYgZXZlbnQuZGVsdGFNb2RlICkge1xuICAgICAgICAgICAgICAgIGlmKCBldmVudC5kZWx0YU1vZGUgPT09IDEgKSB7ICAgICAgICAgIC8vIGRlbHRhIGluIExJTkUgdW5pdHNcbiAgICAgICAgICAgICAgICAgICAgcFggKj0gTElORV9IRUlHSFQ7XG4gICAgICAgICAgICAgICAgICAgIHBZICo9IExJTkVfSEVJR0hUO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWx0YSBpbiBQQUdFIHVuaXRzXG4gICAgICAgICAgICAgICAgICAgIHBYICo9IFBBR0VfSEVJR0hUO1xuICAgICAgICAgICAgICAgICAgICBwWSAqPSBQQUdFX0hFSUdIVDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRmFsbC1iYWNrIGlmIHNwaW4gY2Fubm90IGJlIGRldGVybWluZWRcbiAgICAgICAgICAgIGlmKCBwWCAmJiAhc1ggKSB7XG4gICAgICAgICAgICAgICAgc1ggPSAocFggPCAxKSA/IC0xIDogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCBwWSAmJiAhc1kgKSB7XG4gICAgICAgICAgICAgICAgc1kgPSAocFkgPCAxKSA/IC0xIDogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwaW5YOiBzWCxcbiAgICAgICAgICAgICAgICBzcGluWTogc1ksXG4gICAgICAgICAgICAgICAgcGl4ZWxYOiBwWCxcbiAgICAgICAgICAgICAgICBwaXhlbFk6IHBZXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsQ29udHJvbCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgYmVzdCBjb21iaW5hdGlvbiBpZiB5b3UgcHJlZmVyIHNwaW5YICsgc3Bpblkgbm9ybWFsaXphdGlvbi4gIEl0IGZhdm9yc1xuICAgICAgICAgICAgICogdGhlIG9sZGVyIERPTU1vdXNlU2Nyb2xsIGZvciBGaXJlZm94LCBhcyBGRiBkb2VzIG5vdCBpbmNsdWRlIHdoZWVsRGVsdGEgd2l0aFxuICAgICAgICAgICAgICogJ3doZWVsJyBldmVudCwgbWFraW5nIHNwaW4gc3BlZWQgZGV0ZXJtaW5hdGlvbiBpbXBvc3NpYmxlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzLm1vdXNld2hlZWwuZXZlbnQgPSAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdmaXJlZm94JykgPiAtMSkgP1xuICAgICAgICAgICAgICAgICdET01Nb3VzZVNjcm9sbCcgOlxuICAgICAgICAgICAgICAgIGlzRXZlbnRTdXBwb3J0ZWQoKSA/XG4gICAgICAgICAgICAgICAgICAgICd3aGVlbCcgOiAnbW91c2V3aGVlbCc7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlTW91c2V3aGVlbChlKSB7XG4gICAgICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50OyAvL2pxdWVyeSBmaXhcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgICAgICB2YXIgcnRsRmFjdG9yID0gcy5ydGwgPyAtMSA6IDE7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIGRhdGEgPSBub3JtYWxpemVXaGVlbCggZSApO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsRm9yY2VUb0F4aXMpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGF0YS5waXhlbFgpID4gTWF0aC5hYnMoZGF0YS5waXhlbFkpKSBkZWx0YSA9IGRhdGEucGl4ZWxYICogcnRsRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWSkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWCkpIGRlbHRhID0gZGF0YS5waXhlbFk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbHRhID0gTWF0aC5hYnMoZGF0YS5waXhlbFgpID4gTWF0aC5hYnMoZGF0YS5waXhlbFkpID8gLSBkYXRhLnBpeGVsWCAqIHJ0bEZhY3RvciA6IC0gZGF0YS5waXhlbFk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKGRlbHRhID09PSAwKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm1vdXNld2hlZWxJbnZlcnQpIGRlbHRhID0gLWRlbHRhO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoKG5ldyB3aW5kb3cuRGF0ZSgpKS5nZXRUaW1lKCkgLSBzLm1vdXNld2hlZWwubGFzdFNjcm9sbFRpbWUgPiA2MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKCFzLmlzRW5kIHx8IHMucGFyYW1zLmxvb3ApICYmICFzLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblNjcm9sbCcsIHMsIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wYXJhbXMubW91c2V3aGVlbFJlbGVhc2VPbkVkZ2VzKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoIXMuaXNCZWdpbm5pbmcgfHwgcy5wYXJhbXMubG9vcCkgJiYgIXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2Nyb2xsJywgcywgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsUmVsZWFzZU9uRWRnZXMpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMubW91c2V3aGVlbC5sYXN0U2Nyb2xsVGltZSA9IChuZXcgd2luZG93LkRhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vRnJlZW1vZGUgb3Igc2Nyb2xsQ29udGFpbmVyOlxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHMuZ2V0V3JhcHBlclRyYW5zbGF0ZSgpICsgZGVsdGEgKiBzLnBhcmFtcy5tb3VzZXdoZWVsU2Vuc2l0aXZpdHk7XG4gICAgICAgICAgICAgICAgdmFyIHdhc0JlZ2lubmluZyA9IHMuaXNCZWdpbm5pbmcsXG4gICAgICAgICAgICAgICAgICAgIHdhc0VuZCA9IHMuaXNFbmQ7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA+PSBzLm1pblRyYW5zbGF0ZSgpKSBwb3NpdGlvbiA9IHMubWluVHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IHMubWF4VHJhbnNsYXRlKCkpIHBvc2l0aW9uID0gcy5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghd2FzQmVnaW5uaW5nICYmIHMuaXNCZWdpbm5pbmcgfHwgIXdhc0VuZCAmJiBzLmlzRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQ2xhc3NlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlU3RpY2t5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzLm1vdXNld2hlZWwudGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHMubW91c2V3aGVlbC50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlUmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sYXp5TG9hZGluZyAmJiBzLmxhenkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubGF6eS5sb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRW1pdCBldmVudFxuICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TY3JvbGwnLCBzLCBlKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gU3RvcCBhdXRvcGxheVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvcGxheSAmJiBzLnBhcmFtcy5hdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uKSBzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gcGFnZSBzY3JvbGwgb24gZWRnZSBwb3NpdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IDAgfHwgcG9zaXRpb24gPT09IHMubWF4VHJhbnNsYXRlKCkpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcy5kaXNhYmxlTW91c2V3aGVlbENvbnRyb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXMubW91c2V3aGVlbC5ldmVudCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHMuY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm1vdXNld2hlZWxFdmVudHNUYXJnZWQgIT09ICdjb250YWluZXInKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gJChzLnBhcmFtcy5tb3VzZXdoZWVsRXZlbnRzVGFyZ2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5vZmYocy5tb3VzZXdoZWVsLmV2ZW50LCBoYW5kbGVNb3VzZXdoZWVsKTtcbiAgICAgICAgICAgIHMucGFyYW1zLm1vdXNld2hlZWxDb250cm9sID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHMuZW5hYmxlTW91c2V3aGVlbENvbnRyb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXMubW91c2V3aGVlbC5ldmVudCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHMuY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm1vdXNld2hlZWxFdmVudHNUYXJnZWQgIT09ICdjb250YWluZXInKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gJChzLnBhcmFtcy5tb3VzZXdoZWVsRXZlbnRzVGFyZ2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5vbihzLm1vdXNld2hlZWwuZXZlbnQsIGhhbmRsZU1vdXNld2hlZWwpO1xuICAgICAgICAgICAgcy5wYXJhbXMubW91c2V3aGVlbENvbnRyb2wgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFBhcmFsbGF4XG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgZnVuY3Rpb24gc2V0UGFyYWxsYXhUcmFuc2Zvcm0oZWwsIHByb2dyZXNzKSB7XG4gICAgICAgICAgICBlbCA9ICQoZWwpO1xuICAgICAgICAgICAgdmFyIHAsIHBYLCBwWTtcbiAgICAgICAgICAgIHZhciBydGxGYWN0b3IgPSBzLnJ0bCA/IC0xIDogMTtcbiAgICAgICAgXG4gICAgICAgICAgICBwID0gZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgnKSB8fCAnMCc7XG4gICAgICAgICAgICBwWCA9IGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LXgnKTtcbiAgICAgICAgICAgIHBZID0gZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgteScpO1xuICAgICAgICAgICAgaWYgKHBYIHx8IHBZKSB7XG4gICAgICAgICAgICAgICAgcFggPSBwWCB8fCAnMCc7XG4gICAgICAgICAgICAgICAgcFkgPSBwWSB8fCAnMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICBwWCA9IHA7XG4gICAgICAgICAgICAgICAgICAgIHBZID0gJzAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcFkgPSBwO1xuICAgICAgICAgICAgICAgICAgICBwWCA9ICcwJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKChwWCkuaW5kZXhPZignJScpID49IDApIHtcbiAgICAgICAgICAgICAgICBwWCA9IHBhcnNlSW50KHBYLCAxMCkgKiBwcm9ncmVzcyAqIHJ0bEZhY3RvciArICclJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBYID0gcFggKiBwcm9ncmVzcyAqIHJ0bEZhY3RvciArICdweCcgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChwWSkuaW5kZXhPZignJScpID49IDApIHtcbiAgICAgICAgICAgICAgICBwWSA9IHBhcnNlSW50KHBZLCAxMCkgKiBwcm9ncmVzcyArICclJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBZID0gcFkgKiBwcm9ncmVzcyArICdweCcgO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGVsLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoJyArIHBYICsgJywgJyArIHBZICsgJywwcHgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgcy5wYXJhbGxheCA9IHtcbiAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHMuY29udGFpbmVyLmNoaWxkcmVuKCdbZGF0YS1zd2lwZXItcGFyYWxsYXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC15XScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0UGFyYWxsYXhUcmFuc2Zvcm0odGhpcywgcy5wcm9ncmVzcyk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHMuc2xpZGVzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZS5maW5kKCdbZGF0YS1zd2lwZXItcGFyYWxsYXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC15XScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgoc2xpZGVbMF0ucHJvZ3Jlc3MsIC0xKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQYXJhbGxheFRyYW5zZm9ybSh0aGlzLCBwcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZHVyYXRpb24gPT09ICd1bmRlZmluZWQnKSBkdXJhdGlvbiA9IHMucGFyYW1zLnNwZWVkO1xuICAgICAgICAgICAgICAgIHMuY29udGFpbmVyLmZpbmQoJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYWxsYXhEdXJhdGlvbiA9IHBhcnNlSW50KGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LWR1cmF0aW9uJyksIDEwKSB8fCBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR1cmF0aW9uID09PSAwKSBwYXJhbGxheER1cmF0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZWwudHJhbnNpdGlvbihwYXJhbGxheER1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgWm9vbVxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuem9vbSA9IHtcbiAgICAgICAgICAgIC8vIFwiR2xvYmFsXCIgUHJvcHNcbiAgICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgICAgY3VycmVudFNjYWxlOiAxLFxuICAgICAgICAgICAgaXNTY2FsaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGdlc3R1cmU6IHtcbiAgICAgICAgICAgICAgICBzbGlkZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHNsaWRlV2lkdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzbGlkZUhlaWdodDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGltYWdlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgem9vbU1heDogcy5wYXJhbXMuem9vbU1heFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICAgICAgaXNUb3VjaGVkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaXNNb3ZlZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRYOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY3VycmVudFk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBtaW5YOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgbWluWTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIG1heFg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBtYXhZOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzdGFydFg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzdGFydFk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB0b3VjaGVzU3RhcnQ6IHt9LFxuICAgICAgICAgICAgICAgIHRvdWNoZXNDdXJyZW50OiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZlbG9jaXR5OiB7XG4gICAgICAgICAgICAgICAgeDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwcmV2UG9zaXRpb25YOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcHJldlBvc2l0aW9uWTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHByZXZUaW1lOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxjIFNjYWxlIEZyb20gTXVsdGktdG91Y2hlc1xuICAgICAgICAgICAgZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlczogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIHZhciB4MSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgeTEgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVksXG4gICAgICAgICAgICAgICAgICAgIHgyID0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICB5MiA9IGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWTtcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coeDIgLSB4MSwgMikgKyBNYXRoLnBvdyh5MiAtIHkxLCAyKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIEV2ZW50c1xuICAgICAgICAgICAgb25HZXN0dXJlU3RhcnQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBzLnpvb207XG4gICAgICAgICAgICAgICAgaWYgKCFzLnN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnNjYWxlU3RhcnQgPSB6LmdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghei5nZXN0dXJlLnNsaWRlIHx8ICF6Lmdlc3R1cmUuc2xpZGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5zbGlkZSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh6Lmdlc3R1cmUuc2xpZGUubGVuZ3RoID09PSAwKSB6Lmdlc3R1cmUuc2xpZGUgPSBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlID0gei5nZXN0dXJlLnNsaWRlLmZpbmQoJ2ltZywgc3ZnLCBjYW52YXMnKTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlV3JhcCA9IHouZ2VzdHVyZS5pbWFnZS5wYXJlbnQoJy4nICsgcy5wYXJhbXMuem9vbUNvbnRhaW5lckNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnpvb21NYXggPSB6Lmdlc3R1cmUuaW1hZ2VXcmFwLmF0dHIoJ2RhdGEtc3dpcGVyLXpvb20nKSB8fCBzLnBhcmFtcy56b29tTWF4IDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHouZ2VzdHVyZS5pbWFnZVdyYXAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlLnRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgei5pc1NjYWxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uR2VzdHVyZUNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHMuem9vbTtcbiAgICAgICAgICAgICAgICBpZiAoIXMuc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS50eXBlICE9PSAndG91Y2htb3ZlJyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnNjYWxlTW92ZSA9IHouZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlcyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF6Lmdlc3R1cmUuaW1hZ2UgfHwgei5nZXN0dXJlLmltYWdlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChzLnN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgei5zY2FsZSA9IGUuc2NhbGUgKiB6LmN1cnJlbnRTY2FsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHouc2NhbGUgPSAoei5nZXN0dXJlLnNjYWxlTW92ZSAvIHouZ2VzdHVyZS5zY2FsZVN0YXJ0KSAqIHouY3VycmVudFNjYWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoei5zY2FsZSA+IHouZ2VzdHVyZS56b29tTWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHouc2NhbGUgPSB6Lmdlc3R1cmUuem9vbU1heCAtIDEgKyBNYXRoLnBvdygoei5zY2FsZSAtIHouZ2VzdHVyZS56b29tTWF4ICsgMSksIDAuNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh6LnNjYWxlIDwgcy5wYXJhbXMuem9vbU1pbikge1xuICAgICAgICAgICAgICAgICAgICB6LnNjYWxlID0gIHMucGFyYW1zLnpvb21NaW4gKyAxIC0gTWF0aC5wb3coKHMucGFyYW1zLnpvb21NaW4gLSB6LnNjYWxlICsgMSksIDAuNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgnICsgei5zY2FsZSArICcpJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25HZXN0dXJlRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcy56b29tO1xuICAgICAgICAgICAgICAgIGlmICghcy5zdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaGVuZCcgfHwgZS50eXBlID09PSAndG91Y2hlbmQnICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghei5nZXN0dXJlLmltYWdlIHx8IHouZ2VzdHVyZS5pbWFnZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICB6LnNjYWxlID0gTWF0aC5tYXgoTWF0aC5taW4oei5zY2FsZSwgei5nZXN0dXJlLnpvb21NYXgpLCBzLnBhcmFtcy56b29tTWluKTtcbiAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UudHJhbnNpdGlvbihzLnBhcmFtcy5zcGVlZCkudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoJyArIHouc2NhbGUgKyAnKScpO1xuICAgICAgICAgICAgICAgIHouY3VycmVudFNjYWxlID0gei5zY2FsZTtcbiAgICAgICAgICAgICAgICB6LmlzU2NhbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh6LnNjYWxlID09PSAxKSB6Lmdlc3R1cmUuc2xpZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Ub3VjaFN0YXJ0OiBmdW5jdGlvbiAocywgZSkge1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcy56b29tO1xuICAgICAgICAgICAgICAgIGlmICghei5nZXN0dXJlLmltYWdlIHx8IHouZ2VzdHVyZS5pbWFnZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoei5pbWFnZS5pc1RvdWNoZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAocy5kZXZpY2Uub3MgPT09ICdhbmRyb2lkJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UuaXNUb3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLnRvdWNoZXNTdGFydC54ID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UudG91Y2hlc1N0YXJ0LnkgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Ub3VjaE1vdmU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBzLnpvb207XG4gICAgICAgICAgICAgICAgaWYgKCF6Lmdlc3R1cmUuaW1hZ2UgfHwgei5nZXN0dXJlLmltYWdlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHMuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghei5pbWFnZS5pc1RvdWNoZWQgfHwgIXouZ2VzdHVyZS5zbGlkZSkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXouaW1hZ2UuaXNNb3ZlZCkge1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLndpZHRoID0gei5nZXN0dXJlLmltYWdlWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmhlaWdodCA9IHouZ2VzdHVyZS5pbWFnZVswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2Uuc3RhcnRYID0gcy5nZXRUcmFuc2xhdGUoei5nZXN0dXJlLmltYWdlV3JhcFswXSwgJ3gnKSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLnN0YXJ0WSA9IHMuZ2V0VHJhbnNsYXRlKHouZ2VzdHVyZS5pbWFnZVdyYXBbMF0sICd5JykgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnNsaWRlV2lkdGggPSB6Lmdlc3R1cmUuc2xpZGVbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5zbGlkZUhlaWdodCA9IHouZ2VzdHVyZS5zbGlkZVswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZVdyYXAudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucnRsKSB6LmltYWdlLnN0YXJ0WCA9IC16LmltYWdlLnN0YXJ0WDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucnRsKSB6LmltYWdlLnN0YXJ0WSA9IC16LmltYWdlLnN0YXJ0WTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIGlmIHdlIG5lZWQgaW1hZ2UgZHJhZ1xuICAgICAgICAgICAgICAgIHZhciBzY2FsZWRXaWR0aCA9IHouaW1hZ2Uud2lkdGggKiB6LnNjYWxlO1xuICAgICAgICAgICAgICAgIHZhciBzY2FsZWRIZWlnaHQgPSB6LmltYWdlLmhlaWdodCAqIHouc2NhbGU7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzY2FsZWRXaWR0aCA8IHouZ2VzdHVyZS5zbGlkZVdpZHRoICYmIHNjYWxlZEhlaWdodCA8IHouZ2VzdHVyZS5zbGlkZUhlaWdodCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB6LmltYWdlLm1pblggPSBNYXRoLm1pbigoei5nZXN0dXJlLnNsaWRlV2lkdGggLyAyIC0gc2NhbGVkV2lkdGggLyAyKSwgMCk7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5tYXhYID0gLXouaW1hZ2UubWluWDtcbiAgICAgICAgICAgICAgICB6LmltYWdlLm1pblkgPSBNYXRoLm1pbigoei5nZXN0dXJlLnNsaWRlSGVpZ2h0IC8gMiAtIHNjYWxlZEhlaWdodCAvIDIpLCAwKTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLm1heFkgPSAtei5pbWFnZS5taW5ZO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB6LmltYWdlLnRvdWNoZXNDdXJyZW50LnggPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgICB6LmltYWdlLnRvdWNoZXNDdXJyZW50LnkgPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCF6LmltYWdlLmlzTW92ZWQgJiYgIXouaXNTY2FsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoTWF0aC5mbG9vcih6LmltYWdlLm1pblgpID09PSBNYXRoLmZsb29yKHouaW1hZ2Uuc3RhcnRYKSAmJiB6LmltYWdlLnRvdWNoZXNDdXJyZW50LnggPCB6LmltYWdlLnRvdWNoZXNTdGFydC54KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKE1hdGguZmxvb3Ioei5pbWFnZS5tYXhYKSA9PT0gTWF0aC5mbG9vcih6LmltYWdlLnN0YXJ0WCkgJiYgei5pbWFnZS50b3VjaGVzQ3VycmVudC54ID4gei5pbWFnZS50b3VjaGVzU3RhcnQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghcy5pc0hvcml6b250YWwoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKE1hdGguZmxvb3Ioei5pbWFnZS5taW5ZKSA9PT0gTWF0aC5mbG9vcih6LmltYWdlLnN0YXJ0WSkgJiYgei5pbWFnZS50b3VjaGVzQ3VycmVudC55IDwgei5pbWFnZS50b3VjaGVzU3RhcnQueSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChNYXRoLmZsb29yKHouaW1hZ2UubWF4WSkgPT09IE1hdGguZmxvb3Ioei5pbWFnZS5zdGFydFkpICYmIHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueSA+IHouaW1hZ2UudG91Y2hlc1N0YXJ0LnkpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHouaW1hZ2UuaXNNb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WCA9IHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIHouaW1hZ2UudG91Y2hlc1N0YXJ0LnggKyB6LmltYWdlLnN0YXJ0WDtcbiAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRZID0gei5pbWFnZS50b3VjaGVzQ3VycmVudC55IC0gei5pbWFnZS50b3VjaGVzU3RhcnQueSArIHouaW1hZ2Uuc3RhcnRZO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoei5pbWFnZS5jdXJyZW50WCA8IHouaW1hZ2UubWluWCkge1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRYID0gIHouaW1hZ2UubWluWCArIDEgLSBNYXRoLnBvdygoei5pbWFnZS5taW5YIC0gei5pbWFnZS5jdXJyZW50WCArIDEpLCAwLjgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoei5pbWFnZS5jdXJyZW50WCA+IHouaW1hZ2UubWF4WCkge1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRYID0gei5pbWFnZS5tYXhYIC0gMSArIE1hdGgucG93KCh6LmltYWdlLmN1cnJlbnRYIC0gei5pbWFnZS5tYXhYICsgMSksIDAuOCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoei5pbWFnZS5jdXJyZW50WSA8IHouaW1hZ2UubWluWSkge1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRZID0gIHouaW1hZ2UubWluWSArIDEgLSBNYXRoLnBvdygoei5pbWFnZS5taW5ZIC0gei5pbWFnZS5jdXJyZW50WSArIDEpLCAwLjgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoei5pbWFnZS5jdXJyZW50WSA+IHouaW1hZ2UubWF4WSkge1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRZID0gei5pbWFnZS5tYXhZIC0gMSArIE1hdGgucG93KCh6LmltYWdlLmN1cnJlbnRZIC0gei5pbWFnZS5tYXhZICsgMSksIDAuOCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAvL1ZlbG9jaXR5XG4gICAgICAgICAgICAgICAgaWYgKCF6LnZlbG9jaXR5LnByZXZQb3NpdGlvblgpIHoudmVsb2NpdHkucHJldlBvc2l0aW9uWCA9IHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueDtcbiAgICAgICAgICAgICAgICBpZiAoIXoudmVsb2NpdHkucHJldlBvc2l0aW9uWSkgei52ZWxvY2l0eS5wcmV2UG9zaXRpb25ZID0gei5pbWFnZS50b3VjaGVzQ3VycmVudC55O1xuICAgICAgICAgICAgICAgIGlmICghei52ZWxvY2l0eS5wcmV2VGltZSkgei52ZWxvY2l0eS5wcmV2VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgei52ZWxvY2l0eS54ID0gKHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIHoudmVsb2NpdHkucHJldlBvc2l0aW9uWCkgLyAoRGF0ZS5ub3coKSAtIHoudmVsb2NpdHkucHJldlRpbWUpIC8gMjtcbiAgICAgICAgICAgICAgICB6LnZlbG9jaXR5LnkgPSAoei5pbWFnZS50b3VjaGVzQ3VycmVudC55IC0gei52ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSAvIChEYXRlLm5vdygpIC0gei52ZWxvY2l0eS5wcmV2VGltZSkgLyAyO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh6LmltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB6LnZlbG9jaXR5LnByZXZQb3NpdGlvblgpIDwgMikgei52ZWxvY2l0eS54ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoei5pbWFnZS50b3VjaGVzQ3VycmVudC55IC0gei52ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSA8IDIpIHoudmVsb2NpdHkueSA9IDA7XG4gICAgICAgICAgICAgICAgei52ZWxvY2l0eS5wcmV2UG9zaXRpb25YID0gei5pbWFnZS50b3VjaGVzQ3VycmVudC54O1xuICAgICAgICAgICAgICAgIHoudmVsb2NpdHkucHJldlBvc2l0aW9uWSA9IHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueTtcbiAgICAgICAgICAgICAgICB6LnZlbG9jaXR5LnByZXZUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlV3JhcC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyB6LmltYWdlLmN1cnJlbnRYICsgJ3B4LCAnICsgei5pbWFnZS5jdXJyZW50WSArICdweCwwKScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hFbmQ6IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBzLnpvb207XG4gICAgICAgICAgICAgICAgaWYgKCF6Lmdlc3R1cmUuaW1hZ2UgfHwgei5nZXN0dXJlLmltYWdlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICghei5pbWFnZS5pc1RvdWNoZWQgfHwgIXouaW1hZ2UuaXNNb3ZlZCkge1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB6LmltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBtb21lbnR1bUR1cmF0aW9uWCA9IDMwMDtcbiAgICAgICAgICAgICAgICB2YXIgbW9tZW50dW1EdXJhdGlvblkgPSAzMDA7XG4gICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRGlzdGFuY2VYID0gei52ZWxvY2l0eS54ICogbW9tZW50dW1EdXJhdGlvblg7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uWCA9IHouaW1hZ2UuY3VycmVudFggKyBtb21lbnR1bURpc3RhbmNlWDtcbiAgICAgICAgICAgICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZVkgPSB6LnZlbG9jaXR5LnkgKiBtb21lbnR1bUR1cmF0aW9uWTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zaXRpb25ZID0gei5pbWFnZS5jdXJyZW50WSArIG1vbWVudHVtRGlzdGFuY2VZO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAvL0ZpeCBkdXJhdGlvblxuICAgICAgICAgICAgICAgIGlmICh6LnZlbG9jaXR5LnggIT09IDApIG1vbWVudHVtRHVyYXRpb25YID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uWCAtIHouaW1hZ2UuY3VycmVudFgpIC8gei52ZWxvY2l0eS54KTtcbiAgICAgICAgICAgICAgICBpZiAoei52ZWxvY2l0eS55ICE9PSAwKSBtb21lbnR1bUR1cmF0aW9uWSA9IE1hdGguYWJzKChuZXdQb3NpdGlvblkgLSB6LmltYWdlLmN1cnJlbnRZKSAvIHoudmVsb2NpdHkueSk7XG4gICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRHVyYXRpb24gPSBNYXRoLm1heChtb21lbnR1bUR1cmF0aW9uWCwgbW9tZW50dW1EdXJhdGlvblkpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRYID0gbmV3UG9zaXRpb25YO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFkgPSBuZXdQb3NpdGlvblk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBpZiB3ZSBuZWVkIGltYWdlIGRyYWdcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGVkV2lkdGggPSB6LmltYWdlLndpZHRoICogei5zY2FsZTtcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGVkSGVpZ2h0ID0gei5pbWFnZS5oZWlnaHQgKiB6LnNjYWxlO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UubWluWCA9IE1hdGgubWluKCh6Lmdlc3R1cmUuc2xpZGVXaWR0aCAvIDIgLSBzY2FsZWRXaWR0aCAvIDIpLCAwKTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLm1heFggPSAtei5pbWFnZS5taW5YO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UubWluWSA9IE1hdGgubWluKCh6Lmdlc3R1cmUuc2xpZGVIZWlnaHQgLyAyIC0gc2NhbGVkSGVpZ2h0IC8gMiksIDApO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UubWF4WSA9IC16LmltYWdlLm1pblk7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WCA9IE1hdGgubWF4KE1hdGgubWluKHouaW1hZ2UuY3VycmVudFgsIHouaW1hZ2UubWF4WCksIHouaW1hZ2UubWluWCk7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WSA9IE1hdGgubWF4KE1hdGgubWluKHouaW1hZ2UuY3VycmVudFksIHouaW1hZ2UubWF4WSksIHouaW1hZ2UubWluWSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZVdyYXAudHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyB6LmltYWdlLmN1cnJlbnRYICsgJ3B4LCAnICsgei5pbWFnZS5jdXJyZW50WSArICdweCwwKScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHMuem9vbTtcbiAgICAgICAgICAgICAgICBpZiAoei5nZXN0dXJlLnNsaWRlICYmIHMucHJldmlvdXNJbmRleCAhPT0gcy5hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoMSknKTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlV3JhcC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuc2xpZGUgPSB6Lmdlc3R1cmUuaW1hZ2UgPSB6Lmdlc3R1cmUuaW1hZ2VXcmFwID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB6LnNjYWxlID0gei5jdXJyZW50U2NhbGUgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBUb2dnbGUgWm9vbVxuICAgICAgICAgICAgdG9nZ2xlWm9vbTogZnVuY3Rpb24gKHMsIGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHMuem9vbTtcbiAgICAgICAgICAgICAgICBpZiAoIXouZ2VzdHVyZS5zbGlkZSkge1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuc2xpZGUgPSBzLmNsaWNrZWRTbGlkZSA/ICQocy5jbGlja2VkU2xpZGUpIDogcy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZSA9IHouZ2VzdHVyZS5zbGlkZS5maW5kKCdpbWcsIHN2ZywgY2FudmFzJyk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZVdyYXAgPSB6Lmdlc3R1cmUuaW1hZ2UucGFyZW50KCcuJyArIHMucGFyYW1zLnpvb21Db250YWluZXJDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghei5nZXN0dXJlLmltYWdlIHx8IHouZ2VzdHVyZS5pbWFnZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHRvdWNoWCwgdG91Y2hZLCBvZmZzZXRYLCBvZmZzZXRZLCBkaWZmWCwgZGlmZlksIHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVksIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0LCB0cmFuc2xhdGVNaW5YLCB0cmFuc2xhdGVNaW5ZLCB0cmFuc2xhdGVNYXhYLCB0cmFuc2xhdGVNYXhZLCBzbGlkZVdpZHRoLCBzbGlkZUhlaWdodDtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB6LmltYWdlLnRvdWNoZXNTdGFydC54ID09PSAndW5kZWZpbmVkJyAmJiBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoWCA9IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFkgPSBlLnR5cGUgPT09ICd0b3VjaGVuZCcgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoWCA9IHouaW1hZ2UudG91Y2hlc1N0YXJ0Lng7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoWSA9IHouaW1hZ2UudG91Y2hlc1N0YXJ0Lnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoei5zY2FsZSAmJiB6LnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFpvb20gT3V0XG4gICAgICAgICAgICAgICAgICAgIHouc2NhbGUgPSB6LmN1cnJlbnRTY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZVdyYXAudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApJyk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZS50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoMSknKTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnNsaWRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gWm9vbSBJblxuICAgICAgICAgICAgICAgICAgICB6LnNjYWxlID0gei5jdXJyZW50U2NhbGUgPSB6Lmdlc3R1cmUuaW1hZ2VXcmFwLmF0dHIoJ2RhdGEtc3dpcGVyLXpvb20nKSB8fCBzLnBhcmFtcy56b29tTWF4O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVXaWR0aCA9IHouZ2VzdHVyZS5zbGlkZVswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlSGVpZ2h0ID0gei5nZXN0dXJlLnNsaWRlWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSB6Lmdlc3R1cmUuc2xpZGUub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSB6Lmdlc3R1cmUuc2xpZGUub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZlggPSBvZmZzZXRYICsgc2xpZGVXaWR0aC8yIC0gdG91Y2hYO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZlkgPSBvZmZzZXRZICsgc2xpZGVIZWlnaHQvMiAtIHRvdWNoWTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gei5nZXN0dXJlLmltYWdlWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQgPSB6Lmdlc3R1cmUuaW1hZ2VbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVkV2lkdGggPSBpbWFnZVdpZHRoICogei5zY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlZEhlaWdodCA9IGltYWdlSGVpZ2h0ICogei5zY2FsZTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVNaW5YID0gTWF0aC5taW4oKHNsaWRlV2lkdGggLyAyIC0gc2NhbGVkV2lkdGggLyAyKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVNaW5ZID0gTWF0aC5taW4oKHNsaWRlSGVpZ2h0IC8gMiAtIHNjYWxlZEhlaWdodCAvIDIpLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU1heFggPSAtdHJhbnNsYXRlTWluWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU1heFkgPSAtdHJhbnNsYXRlTWluWTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYID0gZGlmZlggKiB6LnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWSA9IGRpZmZZICogei5zY2FsZTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRlWCA8IHRyYW5zbGF0ZU1pblgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYID0gIHRyYW5zbGF0ZU1pblg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRlWCA+IHRyYW5zbGF0ZU1heFgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYID0gdHJhbnNsYXRlTWF4WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRlWSA8IHRyYW5zbGF0ZU1pblkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVZID0gIHRyYW5zbGF0ZU1pblk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRlWSA+IHRyYW5zbGF0ZU1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVZID0gdHJhbnNsYXRlTWF4WTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlV3JhcC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlWCArICdweCwgJyArIHRyYW5zbGF0ZVkgKyAncHgsMCknKTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgnICsgei5zY2FsZSArICcpJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIEF0dGFjaC9EZXRhY2ggRXZlbnRzXG4gICAgICAgICAgICBhdHRhY2hFdmVudHM6IGZ1bmN0aW9uIChkZXRhY2gpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gZGV0YWNoID8gJ29mZicgOiAnb24nO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuem9vbSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcy5zbGlkZXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSBzLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgcy5zdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBzLnBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlfSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvLyBTY2FsZSBpbWFnZVxuICAgICAgICAgICAgICAgICAgICBpZiAocy5zdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1thY3Rpb25dKCdnZXN0dXJlc3RhcnQnLCBzLnpvb20ub25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1thY3Rpb25dKCdnZXN0dXJlY2hhbmdlJywgcy56b29tLm9uR2VzdHVyZUNoYW5nZSwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzW2FjdGlvbl0oJ2dlc3R1cmVlbmQnLCBzLnpvb20ub25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNbYWN0aW9uXShzLnRvdWNoRXZlbnRzLnN0YXJ0LCBzLnpvb20ub25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1thY3Rpb25dKHMudG91Y2hFdmVudHMubW92ZSwgcy56b29tLm9uR2VzdHVyZUNoYW5nZSwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzW2FjdGlvbl0ocy50b3VjaEV2ZW50cy5lbmQsIHMuem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgc1thY3Rpb25dKCd0b3VjaFN0YXJ0Jywgcy56b29tLm9uVG91Y2hTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBzbGlkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChzbGlkZSkuZmluZCgnLicgKyBzLnBhcmFtcy56b29tQ29udGFpbmVyQ2xhc3MpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNsaWRlKVthY3Rpb25dKHMudG91Y2hFdmVudHMubW92ZSwgcy56b29tLm9uVG91Y2hNb3ZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNbYWN0aW9uXSgndG91Y2hFbmQnLCBzLnpvb20ub25Ub3VjaEVuZCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBTY2FsZSBPdXRcbiAgICAgICAgICAgICAgICAgICAgc1thY3Rpb25dKCd0cmFuc2l0aW9uRW5kJywgcy56b29tLm9uVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy56b29tVG9nZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLm9uKCdkb3VibGVUYXAnLCBzLnpvb20udG9nZ2xlWm9vbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHMuem9vbS5hdHRhY2hFdmVudHMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcy56b29tLmF0dGFjaEV2ZW50cyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgUGx1Z2lucyBBUEkuIENvbGxlY3QgYWxsIGFuZCBpbml0IGFsbCBwbHVnaW5zXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5fcGx1Z2lucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBwbHVnaW4gaW4gcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICB2YXIgcCA9IHMucGx1Z2luc1twbHVnaW5dKHMsIHMucGFyYW1zW3BsdWdpbl0pO1xuICAgICAgICAgICAgaWYgKHApIHMuX3BsdWdpbnMucHVzaChwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNZXRob2QgdG8gY2FsbCBhbGwgcGx1Z2lucyBldmVudC9tZXRob2RcbiAgICAgICAgcy5jYWxsUGx1Z2lucyA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5fcGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudE5hbWUgaW4gcy5fcGx1Z2luc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBzLl9wbHVnaW5zW2ldW2V2ZW50TmFtZV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdLCBhcmd1bWVudHNbNV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgRXZlbnRzL0NhbGxiYWNrcy9QbHVnaW5zIEVtaXR0ZXJcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVFdmVudE5hbWUgKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZS5pbmRleE9mKCdvbicpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50TmFtZVswXSAhPT0gZXZlbnROYW1lWzBdLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gJ29uJyArIGV2ZW50TmFtZVswXS50b1VwcGVyQ2FzZSgpICsgZXZlbnROYW1lLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9ICdvbicgKyBldmVudE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBzLmVtaXR0ZXJFdmVudExpc3RlbmVycyA9IHtcbiAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIHMuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIC8vIFRyaWdnZXIgY2FsbGJhY2tzXG4gICAgICAgICAgICBpZiAocy5wYXJhbXNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgIHMucGFyYW1zW2V2ZW50TmFtZV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdLCBhcmd1bWVudHNbNV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50c1xuICAgICAgICAgICAgaWYgKHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdW2ldKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSwgYXJndW1lbnRzWzVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHBsdWdpbnNcbiAgICAgICAgICAgIGlmIChzLmNhbGxQbHVnaW5zKSBzLmNhbGxQbHVnaW5zKGV2ZW50TmFtZSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdLCBhcmd1bWVudHNbNV0pO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgZXZlbnROYW1lID0gbm9ybWFsaXplRXZlbnROYW1lKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICBpZiAoIXMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0pIHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgIHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9O1xuICAgICAgICBzLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgZXZlbnROYW1lID0gbm9ybWFsaXplRXZlbnROYW1lKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBoYW5kbGVycyBmb3Igc3VjaCBldmVudFxuICAgICAgICAgICAgICAgIHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdW2ldID09PSBoYW5kbGVyKSBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBldmVudE5hbWUgPSBub3JtYWxpemVFdmVudE5hbWUoZXZlbnROYW1lKTtcbiAgICAgICAgICAgIHZhciBfaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdKTtcbiAgICAgICAgICAgICAgICBzLm9mZihldmVudE5hbWUsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzLm9uKGV2ZW50TmFtZSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8vIEFjY2Vzc2liaWxpdHkgdG9vbHNcbiAgICAgICAgcy5hMTF5ID0ge1xuICAgICAgICAgICAgbWFrZUZvY3VzYWJsZTogZnVuY3Rpb24gKCRlbCkge1xuICAgICAgICAgICAgICAgICRlbC5hdHRyKCd0YWJJbmRleCcsICcwJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRSb2xlOiBmdW5jdGlvbiAoJGVsLCByb2xlKSB7XG4gICAgICAgICAgICAgICAgJGVsLmF0dHIoJ3JvbGUnLCByb2xlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBhZGRMYWJlbDogZnVuY3Rpb24gKCRlbCwgbGFiZWwpIHtcbiAgICAgICAgICAgICAgICAkZWwuYXR0cignYXJpYS1sYWJlbCcsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiAoJGVsKSB7XG4gICAgICAgICAgICAgICAgJGVsLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBlbmFibGU6IGZ1bmN0aW9uICgkZWwpIHtcbiAgICAgICAgICAgICAgICAkZWwuYXR0cignYXJpYS1kaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBvbkVudGVyS2V5OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSAhPT0gMTMpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHMucGFyYW1zLm5leHRCdXR0b24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHMub25DbGlja05leHQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5pc0VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hMTF5Lm5vdGlmeShzLnBhcmFtcy5sYXN0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYTExeS5ub3RpZnkocy5wYXJhbXMubmV4dFNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJChldmVudC50YXJnZXQpLmlzKHMucGFyYW1zLnByZXZCdXR0b24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHMub25DbGlja1ByZXYoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5pc0JlZ2lubmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hMTF5Lm5vdGlmeShzLnBhcmFtcy5maXJzdFNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmExMXkubm90aWZ5KHMucGFyYW1zLnByZXZTbGlkZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaXMoJy4nICsgcy5wYXJhbXMuYnVsbGV0Q2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KVswXS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgbGl2ZVJlZ2lvbjogJCgnPHNwYW4gY2xhc3M9XCInICsgcy5wYXJhbXMubm90aWZpY2F0aW9uQ2xhc3MgKyAnXCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCI+PC9zcGFuPicpLFxuICAgICAgICBcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gcy5hMTF5LmxpdmVSZWdpb247XG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmh0bWwobWVzc2FnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIFNldHVwIGFjY2Vzc2liaWxpdHlcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubmV4dEJ1dHRvbiAmJiBzLm5leHRCdXR0b24gJiYgcy5uZXh0QnV0dG9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcy5hMTF5Lm1ha2VGb2N1c2FibGUocy5uZXh0QnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgcy5hMTF5LmFkZFJvbGUocy5uZXh0QnV0dG9uLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgICAgIHMuYTExeS5hZGRMYWJlbChzLm5leHRCdXR0b24sIHMucGFyYW1zLm5leHRTbGlkZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldkJ1dHRvbiAmJiBzLnByZXZCdXR0b24gJiYgcy5wcmV2QnV0dG9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcy5hMTF5Lm1ha2VGb2N1c2FibGUocy5wcmV2QnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgcy5hMTF5LmFkZFJvbGUocy5wcmV2QnV0dG9uLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgICAgIHMuYTExeS5hZGRMYWJlbChzLnByZXZCdXR0b24sIHMucGFyYW1zLnByZXZTbGlkZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgJChzLmNvbnRhaW5lcikuYXBwZW5kKHMuYTExeS5saXZlUmVnaW9uKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0UGFnaW5hdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uICYmIHMucGFyYW1zLnBhZ2luYXRpb25DbGlja2FibGUgJiYgcy5idWxsZXRzICYmIHMuYnVsbGV0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5idWxsZXRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmExMXkubWFrZUZvY3VzYWJsZShidWxsZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hMTF5LmFkZFJvbGUoYnVsbGV0LCAnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmExMXkuYWRkTGFiZWwoYnVsbGV0LCBzLnBhcmFtcy5wYWdpbmF0aW9uQnVsbGV0TWVzc2FnZS5yZXBsYWNlKC97e2luZGV4fX0vLCBidWxsZXQuaW5kZXgoKSArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5hMTF5LmxpdmVSZWdpb24gJiYgcy5hMTF5LmxpdmVSZWdpb24ubGVuZ3RoID4gMCkgcy5hMTF5LmxpdmVSZWdpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEluaXQvRGVzdHJveVxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSBzLmNyZWF0ZUxvb3AoKTtcbiAgICAgICAgICAgIHMudXBkYXRlQ29udGFpbmVyU2l6ZSgpO1xuICAgICAgICAgICAgcy51cGRhdGVTbGlkZXNTaXplKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZVBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXIgJiYgcy5zY3JvbGxiYXIpIHtcbiAgICAgICAgICAgICAgICBzLnNjcm9sbGJhci5zZXQoKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyRHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2Nyb2xsYmFyLmVuYWJsZURyYWdnYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5lZmZlY3QgIT09ICdzbGlkZScgJiYgcy5lZmZlY3RzW3MucGFyYW1zLmVmZmVjdF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLmxvb3ApIHMudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICBzLmVmZmVjdHNbcy5wYXJhbXMuZWZmZWN0XS5zZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMucGFyYW1zLmluaXRpYWxTbGlkZSArIHMubG9vcGVkU2xpZGVzLCAwLCBzLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMucGFyYW1zLmluaXRpYWxTbGlkZSwgMCwgcy5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuaW5pdGlhbFNsaWRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFsbGF4ICYmIHMucGFyYW1zLnBhcmFsbGF4KSBzLnBhcmFsbGF4LnNldFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5sYXp5ICYmIHMucGFyYW1zLmxhenlMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmluaXRpYWxJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmF0dGFjaEV2ZW50cygpO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm9ic2VydmVyICYmIHMuc3VwcG9ydC5vYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIHMuaW5pdE9ic2VydmVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnByZWxvYWRJbWFnZXMgJiYgIXMucGFyYW1zLmxhenlMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgcy5wcmVsb2FkSW1hZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuem9vbSAmJiBzLnpvb20pIHtcbiAgICAgICAgICAgICAgICBzLnpvb20uaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgcy5zdGFydEF1dG9wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMua2V5Ym9hcmRDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuZW5hYmxlS2V5Ym9hcmRDb250cm9sKSBzLmVuYWJsZUtleWJvYXJkQ29udHJvbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm1vdXNld2hlZWxDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuZW5hYmxlTW91c2V3aGVlbENvbnRyb2wpIHMuZW5hYmxlTW91c2V3aGVlbENvbnRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERlcHJlY2F0ZWQgaGFzaG5hdlJlcGxhY2VTdGF0ZSBjaGFuZ2VkIHRvIHJlcGxhY2VTdGF0ZSBmb3IgdXNlIGluIGhhc2huYXYgYW5kIGhpc3RvcnlcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oYXNobmF2UmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgcy5wYXJhbXMucmVwbGFjZVN0YXRlID0gcy5wYXJhbXMuaGFzaG5hdlJlcGxhY2VTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuaGlzdG9yeSkgcy5oaXN0b3J5LmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oYXNobmF2KSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuaGFzaG5hdikgcy5oYXNobmF2LmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5hMTF5LmluaXQoKTtcbiAgICAgICAgICAgIHMuZW1pdCgnb25Jbml0Jywgcyk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvLyBDbGVhbnVwIGR5bmFtaWMgc3R5bGVzXG4gICAgICAgIHMuY2xlYW51cFN0eWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIENvbnRhaW5lclxuICAgICAgICAgICAgcy5jb250YWluZXIucmVtb3ZlQ2xhc3Mocy5jbGFzc05hbWVzLmpvaW4oJyAnKSkucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBXcmFwcGVyXG4gICAgICAgICAgICBzLndyYXBwZXIucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBTbGlkZXNcbiAgICAgICAgICAgIGlmIChzLnNsaWRlcyAmJiBzLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzLnNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoW1xuICAgICAgICAgICAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVOZXh0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVQcmV2Q2xhc3NcbiAgICAgICAgICAgICAgICAgICAgXS5qb2luKCcgJykpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1jb2x1bW4nKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItcm93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gUGFnaW5hdGlvbi9CdWxsZXRzXG4gICAgICAgICAgICBpZiAocy5wYWdpbmF0aW9uQ29udGFpbmVyICYmIHMucGFnaW5hdGlvbkNvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIucmVtb3ZlQ2xhc3Mocy5wYXJhbXMucGFnaW5hdGlvbkhpZGRlbkNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLmJ1bGxldHMgJiYgcy5idWxsZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHMuYnVsbGV0cy5yZW1vdmVDbGFzcyhzLnBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gQnV0dG9uc1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnByZXZCdXR0b24pICQocy5wYXJhbXMucHJldkJ1dHRvbikucmVtb3ZlQ2xhc3Mocy5wYXJhbXMuYnV0dG9uRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubmV4dEJ1dHRvbikgJChzLnBhcmFtcy5uZXh0QnV0dG9uKS5yZW1vdmVDbGFzcyhzLnBhcmFtcy5idXR0b25EaXNhYmxlZENsYXNzKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBTY3JvbGxiYXJcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXIgJiYgcy5zY3JvbGxiYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5zY3JvbGxiYXIudHJhY2sgJiYgcy5zY3JvbGxiYXIudHJhY2subGVuZ3RoKSBzLnNjcm9sbGJhci50cmFjay5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIGlmIChzLnNjcm9sbGJhci5kcmFnICYmIHMuc2Nyb2xsYmFyLmRyYWcubGVuZ3RoKSBzLnNjcm9sbGJhci5kcmFnLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvLyBEZXN0cm95XG4gICAgICAgIHMuZGVzdHJveSA9IGZ1bmN0aW9uIChkZWxldGVJbnN0YW5jZSwgY2xlYW51cFN0eWxlcykge1xuICAgICAgICAgICAgLy8gRGV0YWNoIGV2ZWJ0c1xuICAgICAgICAgICAgcy5kZXRhY2hFdmVudHMoKTtcbiAgICAgICAgICAgIC8vIFN0b3AgYXV0b3BsYXlcbiAgICAgICAgICAgIHMuc3RvcEF1dG9wbGF5KCk7XG4gICAgICAgICAgICAvLyBEaXNhYmxlIGRyYWdnYWJsZVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhciAmJiBzLnNjcm9sbGJhcikge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXJEcmFnZ2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuZGlzYWJsZURyYWdnYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERlc3Ryb3kgbG9vcFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLmRlc3Ryb3lMb29wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDbGVhbnVwIHN0eWxlc1xuICAgICAgICAgICAgaWYgKGNsZWFudXBTdHlsZXMpIHtcbiAgICAgICAgICAgICAgICBzLmNsZWFudXBTdHlsZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERpc2Nvbm5lY3Qgb2JzZXJ2ZXJcbiAgICAgICAgICAgIHMuZGlzY29ubmVjdE9ic2VydmVycygpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIERlc3Ryb3kgem9vbVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnpvb20gJiYgcy56b29tKSB7XG4gICAgICAgICAgICAgICAgcy56b29tLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERpc2FibGUga2V5Ym9hcmQvbW91c2V3aGVlbFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmtleWJvYXJkQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIGlmIChzLmRpc2FibGVLZXlib2FyZENvbnRyb2wpIHMuZGlzYWJsZUtleWJvYXJkQ29udHJvbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm1vdXNld2hlZWxDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuZGlzYWJsZU1vdXNld2hlZWxDb250cm9sKSBzLmRpc2FibGVNb3VzZXdoZWVsQ29udHJvbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGlzYWJsZSBhMTF5XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMuYTExeS5kZXN0cm95KCk7XG4gICAgICAgICAgICAvLyBEZWxldGUgaGlzdG9yeSBwb3BzdGF0ZVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmhpc3RvcnkgJiYgIXMucGFyYW1zLnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHMuaGlzdG9yeS5zZXRIaXN0b3J5UG9wU3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmhhc2huYXYgJiYgcy5oYXNobmF2KSAge1xuICAgICAgICAgICAgICAgIHMuaGFzaG5hdi5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEZXN0cm95IGNhbGxiYWNrXG4gICAgICAgICAgICBzLmVtaXQoJ29uRGVzdHJveScpO1xuICAgICAgICAgICAgLy8gRGVsZXRlIGluc3RhbmNlXG4gICAgICAgICAgICBpZiAoZGVsZXRlSW5zdGFuY2UgIT09IGZhbHNlKSBzID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHMuaW5pdCgpO1xuICAgICAgICBcblxuICAgIFxuICAgICAgICAvLyBSZXR1cm4gc3dpcGVyIGluc3RhbmNlXG4gICAgICAgIHJldHVybiBzO1xuICAgIH07XG4gICAgXG5cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIFByb3RvdHlwZVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIFN3aXBlci5wcm90b3R5cGUgPSB7XG4gICAgICAgIGlzU2FmYXJpOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiAodWEuaW5kZXhPZignc2FmYXJpJykgPj0gMCAmJiB1YS5pbmRleE9mKCdjaHJvbWUnKSA8IDAgJiYgdWEuaW5kZXhPZignYW5kcm9pZCcpIDwgMCk7XG4gICAgICAgIH0pKCksXG4gICAgICAgIGlzVWlXZWJWaWV3OiAvKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdCg/IS4qU2FmYXJpKS9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpLFxuICAgICAgICBpc0FycmF5OiBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShhcnIpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgICAgICB9LFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIEJyb3dzZXJcbiAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIGJyb3dzZXI6IHtcbiAgICAgICAgICAgIGllOiB3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkIHx8IHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCxcbiAgICAgICAgICAgIGllVG91Y2g6ICh3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgJiYgd2luZG93Lm5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMSkgfHwgKHdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgJiYgd2luZG93Lm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDEpLFxuICAgICAgICAgICAgbHRlSUU5OiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRlbXBvcmFyeSBESVZcbiAgICAgICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGNvbnRlbnQgdG8gdG1wIERJViB3aGljaCBpcyB3cmFwcGVkIGludG8gdGhlIElFIEhUTUwgY29uZGl0aW9uYWwgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIGx0ZSBJRSA5XT48aT48L2k+PCFbZW5kaWZdLS0+JztcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZSAvIGZhbHNlIHZhbHVlIGJhc2VkIG9uIHdoYXQgd2lsbCBicm93c2VyIHJlbmRlclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICB9KSgpXG4gICAgICAgIH0sXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgRGV2aWNlc1xuICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgZGV2aWNlOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgICB2YXIgYW5kcm9pZCA9IHVhLm1hdGNoKC8oQW5kcm9pZCk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKTtcbiAgICAgICAgICAgIHZhciBpcGFkID0gdWEubWF0Y2goLyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvKTtcbiAgICAgICAgICAgIHZhciBpcG9kID0gdWEubWF0Y2goLyhpUG9kKSguKk9TXFxzKFtcXGRfXSspKT8vKTtcbiAgICAgICAgICAgIHZhciBpcGhvbmUgPSAhaXBhZCAmJiB1YS5tYXRjaCgvKGlQaG9uZVxcc09TfGlPUylcXHMoW1xcZF9dKykvKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaW9zOiBpcGFkIHx8IGlwaG9uZSB8fCBpcG9kLFxuICAgICAgICAgICAgICAgIGFuZHJvaWQ6IGFuZHJvaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKCksXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgRmVhdHVyZSBEZXRlY3Rpb25cbiAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHN1cHBvcnQ6IHtcbiAgICAgICAgICAgIHRvdWNoIDogKHdpbmRvdy5Nb2Rlcm5penIgJiYgTW9kZXJuaXpyLnRvdWNoID09PSB0cnVlKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhISgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpO1xuICAgICAgICAgICAgfSkoKSxcbiAgICBcbiAgICAgICAgICAgIHRyYW5zZm9ybXMzZCA6ICh3aW5kb3cuTW9kZXJuaXpyICYmIE1vZGVybml6ci5jc3N0cmFuc2Zvcm1zM2QgPT09IHRydWUpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlO1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ3dlYmtpdFBlcnNwZWN0aXZlJyBpbiBkaXYgfHwgJ01velBlcnNwZWN0aXZlJyBpbiBkaXYgfHwgJ09QZXJzcGVjdGl2ZScgaW4gZGl2IHx8ICdNc1BlcnNwZWN0aXZlJyBpbiBkaXYgfHwgJ3BlcnNwZWN0aXZlJyBpbiBkaXYpO1xuICAgICAgICAgICAgfSkoKSxcbiAgICBcbiAgICAgICAgICAgIGZsZXhib3g6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlO1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMgPSAoJ2FsaWduSXRlbXMgd2Via2l0QWxpZ25JdGVtcyB3ZWJraXRCb3hBbGlnbiBtc0ZsZXhBbGlnbiBtb3pCb3hBbGlnbiB3ZWJraXRGbGV4RGlyZWN0aW9uIG1zRmxleERpcmVjdGlvbiBtb3pCb3hEaXJlY3Rpb24gbW96Qm94T3JpZW50IHdlYmtpdEJveERpcmVjdGlvbiB3ZWJraXRCb3hPcmllbnQnKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZXNbaV0gaW4gZGl2KSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpLFxuICAgIFxuICAgICAgICAgICAgb2JzZXJ2ZXI6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnTXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93IHx8ICdXZWJraXRNdXRhdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cpO1xuICAgICAgICAgICAgfSkoKSxcbiAgICBcbiAgICAgICAgICAgIHBhc3NpdmVMaXN0ZW5lcjogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlTGlzdGVuZXInLCBudWxsLCBvcHRzKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0c1Bhc3NpdmU7XG4gICAgICAgICAgICB9KSgpLFxuICAgIFxuICAgICAgICAgICAgZ2VzdHVyZXM6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdvbmdlc3R1cmVzdGFydCcgaW4gd2luZG93O1xuICAgICAgICAgICAgfSkoKVxuICAgICAgICB9LFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIFBsdWdpbnNcbiAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHBsdWdpbnM6IHt9XG4gICAgfTtcbiAgICBcblxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgRG9tNyBMaWJyYXJ5XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICB2YXIgRG9tNyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBEb203ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcywgaSA9IDA7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYXJyYXktbGlrZSBvYmplY3RcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBfdGhpc1tpXSA9IGFycltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgICAgICAgICAvLyBSZXR1cm4gY29sbGVjdGlvbiB3aXRoIG1ldGhvZHNcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgJCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIGFyciA9IFtdLCBpID0gMDtcbiAgICAgICAgICAgIGlmIChzZWxlY3RvciAmJiAhY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIC8vIFN0cmluZ1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbHMsIHRlbXBQYXJlbnQsIGh0bWwgPSBzZWxlY3Rvci50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzwnKSA+PSAwICYmIGh0bWwuaW5kZXhPZignPicpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b0NyZWF0ZSA9ICdkaXYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPGxpJykgPT09IDApIHRvQ3JlYXRlID0gJ3VsJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzx0cicpID09PSAwKSB0b0NyZWF0ZSA9ICd0Ym9keSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dGQnKSA9PT0gMCB8fCBodG1sLmluZGV4T2YoJzx0aCcpID09PSAwKSB0b0NyZWF0ZSA9ICd0cic7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dGJvZHknKSA9PT0gMCkgdG9DcmVhdGUgPSAndGFibGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPG9wdGlvbicpID09PSAwKSB0b0NyZWF0ZSA9ICdzZWxlY3QnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodG9DcmVhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFBhcmVudC5pbm5lckhUTUwgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0ZW1wUGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh0ZW1wUGFyZW50LmNoaWxkTm9kZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0ICYmIHNlbGVjdG9yWzBdID09PSAnIycgJiYgIXNlbGVjdG9yLm1hdGNoKC9bIC48Pjp+XS8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHVyZSBJRCBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVscyA9IFtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci5zcGxpdCgnIycpWzFdKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlciBzZWxlY3RvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHMgPSAoY29udGV4dCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsc1tpXSkgYXJyLnB1c2goZWxzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBOb2RlL2VsZW1lbnRcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciA9PT0gd2luZG93IHx8IHNlbGVjdG9yID09PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vQXJyYXkgb2YgZWxlbWVudHMgb3IgaW5zdGFuY2Ugb2YgRG9tXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3IubGVuZ3RoID4gMCAmJiBzZWxlY3RvclswXS5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHNlbGVjdG9yW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhhcnIpO1xuICAgICAgICB9O1xuICAgICAgICBEb203LnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIC8vIENsYXNzZXMgYW5kIGF0dHJpdXRlc1xuICAgICAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tqXS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2pdLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXNbMF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzWzBdLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2pdLmNsYXNzTGlzdC50b2dnbGUoY2xhc3Nlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0cjogZnVuY3Rpb24gKGF0dHJzLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhdHRycyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGF0dHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHJldHVybiB0aGlzWzBdLmdldEF0dHJpYnV0ZShhdHRycyk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBhdHRyc1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5zZXRBdHRyaWJ1dGUoYXR0cnMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGF0dHJOYW1lIGluIGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV1bYXR0ck5hbWVdID0gYXR0cnNbYXR0ck5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbaV0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1swXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFLZXkgPSB0aGlzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5KSByZXR1cm4gZGF0YUtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXNbMF0uZG9tN0VsZW1lbnREYXRhU3RvcmFnZSAmJiAoa2V5IGluIHRoaXNbMF0uZG9tN0VsZW1lbnREYXRhU3RvcmFnZSkpIHJldHVybiB0aGlzWzBdLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2Vba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbC5kb203RWxlbWVudERhdGFTdG9yYWdlKSBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gVHJhbnNmb3Jtc1xuICAgICAgICAgICAgdHJhbnNmb3JtIDogZnVuY3Rpb24gKHRyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxTdHlsZSA9IHRoaXNbaV0uc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIGVsU3R5bGUud2Via2l0VHJhbnNmb3JtID0gZWxTdHlsZS5Nc1RyYW5zZm9ybSA9IGVsU3R5bGUubXNUcmFuc2Zvcm0gPSBlbFN0eWxlLk1velRyYW5zZm9ybSA9IGVsU3R5bGUuT1RyYW5zZm9ybSA9IGVsU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGR1cmF0aW9uICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbFN0eWxlID0gdGhpc1tpXS5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgZWxTdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLk1zVHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS5tc1RyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUuTW96VHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS5PVHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy9FdmVudHNcbiAgICAgICAgICAgIG9uOiBmdW5jdGlvbiAoZXZlbnROYW1lLCB0YXJnZXRTZWxlY3RvciwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVMaXZlRXZlbnQoZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRhcmdldCkuaXModGFyZ2V0U2VsZWN0b3IpKSBsaXN0ZW5lci5jYWxsKHRhcmdldCwgZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudHMgPSAkKHRhcmdldCkucGFyZW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBwYXJlbnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQocGFyZW50c1trXSkuaXModGFyZ2V0U2VsZWN0b3IpKSBsaXN0ZW5lci5jYWxsKHBhcmVudHNba10sIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSBldmVudE5hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICB2YXIgaSwgajtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSAnZnVuY3Rpb24nIHx8IHRhcmdldFNlbGVjdG9yID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXN1YWwgZXZlbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZSA9IGFyZ3VtZW50c1syXSB8fCBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzW2pdLCBsaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0xpdmUgZXZlbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZXZlbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzW2ldLmRvbTdMaXZlTGlzdGVuZXJzKSB0aGlzW2ldLmRvbTdMaXZlTGlzdGVuZXJzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5kb203TGl2ZUxpc3RlbmVycy5wdXNoKHtsaXN0ZW5lcjogbGlzdGVuZXIsIGxpdmVMaXN0ZW5lcjogaGFuZGxlTGl2ZUV2ZW50fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50c1tqXSwgaGFuZGxlTGl2ZUV2ZW50LCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvZmY6IGZ1bmN0aW9uIChldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSBldmVudE5hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0U2VsZWN0b3IgPT09ICdmdW5jdGlvbicgfHwgdGFyZ2V0U2VsZWN0b3IgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXN1YWwgZXZlbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZSA9IGFyZ3VtZW50c1syXSB8fCBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tqXS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgbGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGl2ZSBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2pdLmRvbTdMaXZlTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpc1tqXS5kb203TGl2ZUxpc3RlbmVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbal0uZG9tN0xpdmVMaXN0ZW5lcnNba10ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tqXS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgdGhpc1tqXS5kb203TGl2ZUxpc3RlbmVyc1trXS5saXZlTGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uY2U6IGZ1bmN0aW9uIChldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgICAgICAgICAgICAgIHZhciBkb20gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0U2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U2VsZWN0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgICAgIGNhcHR1cmUgPSBhcmd1bWVudHNbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHByb3h5KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIoZSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5vZmYoZXZlbnROYW1lLCB0YXJnZXRTZWxlY3RvciwgcHJveHksIGNhcHR1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb20ub24oZXZlbnROYW1lLCB0YXJnZXRTZWxlY3RvciwgcHJveHksIGNhcHR1cmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50RGF0YSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZ0O1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChldmVudE5hbWUsIHtkZXRhaWw6IGV2ZW50RGF0YSwgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5kZXRhaWwgPSBldmVudERhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCcsICdvVHJhbnNpdGlvbkVuZCcsICdNU1RyYW5zaXRpb25FbmQnLCAnbXNUcmFuc2l0aW9uRW5kJ10sXG4gICAgICAgICAgICAgICAgICAgIGksIGosIGRvbSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZmlyZUNhbGxCYWNrKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5vZmYoZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb20ub24oZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFNpemluZy9TdHlsZXNcbiAgICAgICAgICAgIHdpZHRoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0gPT09IHdpbmRvdykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmNzcygnd2lkdGgnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdXRlcldpZHRoOiBmdW5jdGlvbiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlTWFyZ2lucylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldFdpZHRoICsgcGFyc2VGbG9hdCh0aGlzLmNzcygnbWFyZ2luLXJpZ2h0JykpICsgcGFyc2VGbG9hdCh0aGlzLmNzcygnbWFyZ2luLWxlZnQnKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlaWdodDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRoaXMuY3NzKCdoZWlnaHQnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdXRlckhlaWdodDogZnVuY3Rpb24gKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZU1hcmdpbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRIZWlnaHQgKyBwYXJzZUZsb2F0KHRoaXMuY3NzKCdtYXJnaW4tdG9wJykpICsgcGFyc2VGbG9hdCh0aGlzLmNzcygnbWFyZ2luLWJvdHRvbScpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9mZnNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGllbnRUb3AgID0gZWwuY2xpZW50VG9wICB8fCBib2R5LmNsaWVudFRvcCAgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudExlZnQgPSBlbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG9wICA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBlbC5zY3JvbGxUb3A7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGVsLnNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGJveC50b3AgICsgc2Nyb2xsVG9wICAtIGNsaWVudFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjc3M6IGZ1bmN0aW9uIChwcm9wcywgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzWzBdLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLnN0eWxlW3Byb3BdID0gcHJvcHNbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5zdHlsZVtwcm9wc10gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgIFxuICAgICAgICAgICAgLy9Eb20gbWFuaXB1bGF0aW9uXG4gICAgICAgICAgICBlYWNoOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzW2ldLCBpLCB0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaHRtbDogZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGh0bWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS5pbm5lckhUTUwgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXNbMF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGFyZVdpdGgsIGk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsID09PSBkb2N1bWVudCkgcmV0dXJuIHNlbGVjdG9yID09PSBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsID09PSB3aW5kb3cpIHJldHVybiBzZWxlY3RvciA9PT0gd2luZG93O1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwubWF0Y2hlcykgcmV0dXJuIGVsLm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbC5tb3pNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbC5tb3pNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbC5tc01hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJlV2l0aCA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbXBhcmVXaXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSB0aGlzWzBdKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxlY3RvciA9PT0gZG9jdW1lbnQpIHJldHVybiB0aGlzWzBdID09PSBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxlY3RvciA9PT0gd2luZG93KSByZXR1cm4gdGhpc1swXSA9PT0gd2luZG93O1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgc2VsZWN0b3IgaW5zdGFuY2VvZiBEb203KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJlV2l0aCA9IHNlbGVjdG9yLm5vZGVUeXBlID8gW3NlbGVjdG9yXSA6IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbXBhcmVXaXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSB0aGlzWzBdKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluZGV4OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpc1swXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSBpKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcTogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgcmV0dXJuSW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gbGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkluZGV4ID0gbGVuZ3RoICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5JbmRleCA8IDApIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5ldyBEb203KFt0aGlzW3JldHVybkluZGV4XV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcoW3RoaXNbaW5kZXhdXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXBwZW5kOiBmdW5jdGlvbiAobmV3Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgajtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5ld0NoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gbmV3Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcERpdi5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5hcHBlbmRDaGlsZCh0ZW1wRGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5ld0NoaWxkIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG5ld0NoaWxkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5hcHBlbmRDaGlsZChuZXdDaGlsZFtqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmVwZW5kOiBmdW5jdGlvbiAobmV3Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwgajtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5ld0NoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gbmV3Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSB0ZW1wRGl2LmNoaWxkTm9kZXMubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmluc2VydEJlZm9yZSh0ZW1wRGl2LmNoaWxkTm9kZXNbal0sIHRoaXNbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzW2ldLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIG5ld0NoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBuZXdDaGlsZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkW2pdLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHRoaXNbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmVmb3JlID0gJChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiZWZvcmUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmVbMF0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpc1tpXSwgYmVmb3JlWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChiZWZvcmUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBiZWZvcmUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmVbal0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpc1tpXS5jbG9uZU5vZGUodHJ1ZSksIGJlZm9yZVtqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBhZnRlciA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWZ0ZXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlclswXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLCBhZnRlclswXS5uZXh0U2libGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYWZ0ZXIubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhZnRlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyW2pdLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXNbaV0uY2xvbmVOb2RlKHRydWUpLCBhZnRlcltqXS5uZXh0U2libGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZyAmJiAkKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHJldHVybiBuZXcgRG9tNyhbdGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZykgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0QWxsOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEVscyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgICAgICAgICAgICAgaWYgKCFlbCkgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQobmV4dCkuaXMoc2VsZWN0b3IpKSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGVsID0gbmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KG5leHRFbHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXY6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmICQodGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHJldHVybiBuZXcgRG9tNyhbdGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSByZXR1cm4gbmV3IERvbTcoW3RoaXNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2QWxsOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldkVscyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgICAgICAgICAgICAgaWYgKCFlbCkgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZWwucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldiA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJChwcmV2KS5pcyhzZWxlY3RvcikpIHByZXZFbHMucHVzaChwcmV2KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHByZXZFbHMucHVzaChwcmV2KTtcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBwcmV2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcocHJldkVscyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyZW50OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXNbaV0ucGFyZW50Tm9kZSkuaXMoc2VsZWN0b3IpKSBwYXJlbnRzLnB1c2godGhpc1tpXS5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaCh0aGlzW2ldLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAkKCQudW5pcXVlKHBhcmVudHMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJlbnRzOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpc1tpXS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChwYXJlbnQpLmlzKHNlbGVjdG9yKSkgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAkKCQudW5pcXVlKHBhcmVudHMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5kIDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gdGhpc1tpXS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBmb3VuZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRFbGVtZW50cy5wdXNoKGZvdW5kW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcoZm91bmRFbGVtZW50cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRyZW46IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGROb2RlcyA9IHRoaXNbaV0uY2hpbGROb2RlcztcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaGlsZE5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZXNbal0ubm9kZVR5cGUgPT09IDEpIGNoaWxkcmVuLnB1c2goY2hpbGROb2Rlc1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2Rlc1tqXS5ub2RlVHlwZSA9PT0gMSAmJiAkKGNoaWxkTm9kZXNbal0pLmlzKHNlbGVjdG9yKSkgY2hpbGRyZW4ucHVzaChjaGlsZE5vZGVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcoJC51bmlxdWUoY2hpbGRyZW4pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbaV0ucGFyZW50Tm9kZSkgdGhpc1tpXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgaSwgajtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b0FkZCA9ICQoYXJndW1lbnRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHRvQWRkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb21bZG9tLmxlbmd0aF0gPSB0b0FkZFtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5sZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkLmZuID0gRG9tNy5wcm90b3R5cGU7XG4gICAgICAgICQudW5pcXVlID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgICAgdmFyIHVuaXF1ZSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodW5pcXVlLmluZGV4T2YoYXJyW2ldKSA9PT0gLTEpIHVuaXF1ZS5wdXNoKGFycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICByZXR1cm4gJDtcbiAgICB9KSgpO1xuICAgIFxuXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgR2V0IERvbSBsaWJyYXJpZXNcbiAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICB2YXIgc3dpcGVyRG9tUGx1Z2lucyA9IFsnalF1ZXJ5JywgJ1plcHRvJywgJ0RvbTcnXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN3aXBlckRvbVBsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICBcdGlmICh3aW5kb3dbc3dpcGVyRG9tUGx1Z2luc1tpXV0pIHtcbiAgICBcdFx0YWRkTGlicmFyeVBsdWdpbih3aW5kb3dbc3dpcGVyRG9tUGx1Z2luc1tpXV0pO1xuICAgIFx0fVxuICAgIH1cbiAgICAvLyBSZXF1aXJlZCBET00gUGx1Z2luc1xuICAgIHZhciBkb21MaWI7XG4gICAgaWYgKHR5cGVvZiBEb203ID09PSAndW5kZWZpbmVkJykge1xuICAgIFx0ZG9tTGliID0gd2luZG93LkRvbTcgfHwgd2luZG93LlplcHRvIHx8IHdpbmRvdy5qUXVlcnk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgIFx0ZG9tTGliID0gRG9tNztcbiAgICB9XG4gICAgXG5cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIEFkZCAuc3dpcGVyIHBsdWdpbiBmcm9tIERvbSBsaWJyYXJpZXNcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIGZ1bmN0aW9uIGFkZExpYnJhcnlQbHVnaW4obGliKSB7XG4gICAgICAgIGxpYi5mbi5zd2lwZXIgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICB2YXIgZmlyc3RJbnN0YW5jZTtcbiAgICAgICAgICAgIGxpYih0aGlzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG5ldyBTd2lwZXIodGhpcywgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0SW5zdGFuY2UpIGZpcnN0SW5zdGFuY2UgPSBzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmlyc3RJbnN0YW5jZTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGRvbUxpYikge1xuICAgICAgICBpZiAoISgndHJhbnNpdGlvbkVuZCcgaW4gZG9tTGliLmZuKSkge1xuICAgICAgICAgICAgZG9tTGliLmZuLnRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gWyd3ZWJraXRUcmFuc2l0aW9uRW5kJywgJ3RyYW5zaXRpb25lbmQnLCAnb1RyYW5zaXRpb25FbmQnLCAnTVNUcmFuc2l0aW9uRW5kJywgJ21zVHJhbnNpdGlvbkVuZCddLFxuICAgICAgICAgICAgICAgICAgICBpLCBqLCBkb20gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpcmVDYWxsQmFjayhlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb20ub2ZmKGV2ZW50c1tpXSwgZmlyZUNhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLm9uKGV2ZW50c1tpXSwgZmlyZUNhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoJ3RyYW5zZm9ybScgaW4gZG9tTGliLmZuKSkge1xuICAgICAgICAgICAgZG9tTGliLmZuLnRyYW5zZm9ybSA9IGZ1bmN0aW9uICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsU3R5bGUgPSB0aGlzW2ldLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICBlbFN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGVsU3R5bGUuTXNUcmFuc2Zvcm0gPSBlbFN0eWxlLm1zVHJhbnNmb3JtID0gZWxTdHlsZS5Nb3pUcmFuc2Zvcm0gPSBlbFN0eWxlLk9UcmFuc2Zvcm0gPSBlbFN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghKCd0cmFuc2l0aW9uJyBpbiBkb21MaWIuZm4pKSB7XG4gICAgICAgICAgICBkb21MaWIuZm4udHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZHVyYXRpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsU3R5bGUgPSB0aGlzW2ldLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICBlbFN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUuTXNUcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLm1zVHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS5Nb3pUcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLk9UcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoJ291dGVyV2lkdGgnIGluIGRvbUxpYi5mbikpIHtcbiAgICAgICAgICAgIGRvbUxpYi5mbi5vdXRlcldpZHRoID0gZnVuY3Rpb24gKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZU1hcmdpbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aCArIHBhcnNlRmxvYXQodGhpcy5jc3MoJ21hcmdpbi1yaWdodCcpKSArIHBhcnNlRmxvYXQodGhpcy5jc3MoJ21hcmdpbi1sZWZ0JykpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICB3aW5kb3cuU3dpcGVyID0gU3dpcGVyO1xufSkoKTtcblxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT1cblN3aXBlciBBTUQgRXhwb3J0XG49PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuaWYgKHR5cGVvZihtb2R1bGUpICE9PSAndW5kZWZpbmVkJylcbntcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5Td2lwZXI7XG59XG5lbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICByZXR1cm4gd2luZG93LlN3aXBlcjtcbiAgICB9KTtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9zd2lwZXIuanMubWFwXG4iLCIvKiFcbiAqIEJvb3RzdHJhcCB2My4zLjcgKGh0dHA6Ly9nZXRib290c3RyYXAuY29tKVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuXG5pZiAodHlwZW9mIGpRdWVyeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdCb290c3RyYXBcXCdzIEphdmFTY3JpcHQgcmVxdWlyZXMgalF1ZXJ5Jylcbn1cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHZlcnNpb24gPSAkLmZuLmpxdWVyeS5zcGxpdCgnICcpWzBdLnNwbGl0KCcuJylcbiAgaWYgKCh2ZXJzaW9uWzBdIDwgMiAmJiB2ZXJzaW9uWzFdIDwgOSkgfHwgKHZlcnNpb25bMF0gPT0gMSAmJiB2ZXJzaW9uWzFdID09IDkgJiYgdmVyc2lvblsyXSA8IDEpIHx8ICh2ZXJzaW9uWzBdID4gMykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnkgdmVyc2lvbiAxLjkuMSBvciBoaWdoZXIsIGJ1dCBsb3dlciB0aGFuIHZlcnNpb24gNCcpXG4gIH1cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRyYW5zaXRpb24uanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0cmFuc2l0aW9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENTUyBUUkFOU0lUSU9OIFNVUFBPUlQgKFNob3V0b3V0OiBodHRwOi8vd3d3Lm1vZGVybml6ci5jb20vKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Jvb3RzdHJhcCcpXG5cbiAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgICAgV2Via2l0VHJhbnNpdGlvbiA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgIE1velRyYW5zaXRpb24gICAgOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICBPVHJhbnNpdGlvbiAgICAgIDogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgIHRyYW5zaXRpb24gICAgICAgOiAndHJhbnNpdGlvbmVuZCdcbiAgICB9XG5cbiAgICBmb3IgKHZhciBuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgICAgaWYgKGVsLnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgZW5kOiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV0gfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZSAvLyBleHBsaWNpdCBmb3IgaWU4ICggIC5fLilcbiAgfVxuXG4gIC8vIGh0dHA6Ly9ibG9nLmFsZXhtYWNjYXcuY29tL2Nzcy10cmFuc2l0aW9uc1xuICAkLmZuLmVtdWxhdGVUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gICAgdmFyICRlbCA9IHRoaXNcbiAgICAkKHRoaXMpLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkgeyBjYWxsZWQgPSB0cnVlIH0pXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBpZiAoIWNhbGxlZCkgJCgkZWwpLnRyaWdnZXIoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKSB9XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgZHVyYXRpb24pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gICQoZnVuY3Rpb24gKCkge1xuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uID0gdHJhbnNpdGlvbkVuZCgpXG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm5cblxuICAgICQuZXZlbnQuc3BlY2lhbC5ic1RyYW5zaXRpb25FbmQgPSB7XG4gICAgICBiaW5kVHlwZTogJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLFxuICAgICAgZGVsZWdhdGVUeXBlOiAkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsXG4gICAgICBoYW5kbGU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyh0aGlzKSkgcmV0dXJuIGUuaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYWxlcnQuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNhbGVydHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBTEVSVCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgZGlzbWlzcyA9ICdbZGF0YS1kaXNtaXNzPVwiYWxlcnRcIl0nXG4gIHZhciBBbGVydCAgID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgJChlbCkub24oJ2NsaWNrJywgZGlzbWlzcywgdGhpcy5jbG9zZSlcbiAgfVxuXG4gIEFsZXJ0LlZFUlNJT04gPSAnMy4zLjcnXG5cbiAgQWxlcnQuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIEFsZXJ0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgID0gJCh0aGlzKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yICYmIHNlbGVjdG9yLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgfVxuXG4gICAgdmFyICRwYXJlbnQgPSAkKHNlbGVjdG9yID09PSAnIycgPyBbXSA6IHNlbGVjdG9yKVxuXG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgaWYgKCEkcGFyZW50Lmxlbmd0aCkge1xuICAgICAgJHBhcmVudCA9ICR0aGlzLmNsb3Nlc3QoJy5hbGVydCcpXG4gICAgfVxuXG4gICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdjbG9zZS5icy5hbGVydCcpKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudCgpIHtcbiAgICAgIC8vIGRldGFjaCBmcm9tIHBhcmVudCwgZmlyZSBldmVudCB0aGVuIGNsZWFuIHVwIGRhdGFcbiAgICAgICRwYXJlbnQuZGV0YWNoKCkudHJpZ2dlcignY2xvc2VkLmJzLmFsZXJ0JykucmVtb3ZlKClcbiAgICB9XG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiAkcGFyZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgJHBhcmVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCByZW1vdmVFbGVtZW50KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQWxlcnQuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgcmVtb3ZlRWxlbWVudCgpXG4gIH1cblxuXG4gIC8vIEFMRVJUIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuYWxlcnQnKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmFsZXJ0JywgKGRhdGEgPSBuZXcgQWxlcnQodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5hbGVydFxuXG4gICQuZm4uYWxlcnQgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5hbGVydC5Db25zdHJ1Y3RvciA9IEFsZXJ0XG5cblxuICAvLyBBTEVSVCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYWxlcnQubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmFsZXJ0ID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQUxFUlQgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMuYWxlcnQuZGF0YS1hcGknLCBkaXNtaXNzLCBBbGVydC5wcm90b3R5cGUuY2xvc2UpXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGJ1dHRvbi5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2J1dHRvbnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBCVVRUT04gUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIEJ1dHRvbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgPSAkLmV4dGVuZCh7fSwgQnV0dG9uLkRFRkFVTFRTLCBvcHRpb25zKVxuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgfVxuXG4gIEJ1dHRvbi5WRVJTSU9OICA9ICczLjMuNydcblxuICBCdXR0b24uREVGQVVMVFMgPSB7XG4gICAgbG9hZGluZ1RleHQ6ICdsb2FkaW5nLi4uJ1xuICB9XG5cbiAgQnV0dG9uLnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgIHZhciBkICAgID0gJ2Rpc2FibGVkJ1xuICAgIHZhciAkZWwgID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciB2YWwgID0gJGVsLmlzKCdpbnB1dCcpID8gJ3ZhbCcgOiAnaHRtbCdcbiAgICB2YXIgZGF0YSA9ICRlbC5kYXRhKClcblxuICAgIHN0YXRlICs9ICdUZXh0J1xuXG4gICAgaWYgKGRhdGEucmVzZXRUZXh0ID09IG51bGwpICRlbC5kYXRhKCdyZXNldFRleHQnLCAkZWxbdmFsXSgpKVxuXG4gICAgLy8gcHVzaCB0byBldmVudCBsb29wIHRvIGFsbG93IGZvcm1zIHRvIHN1Ym1pdFxuICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbiAoKSB7XG4gICAgICAkZWxbdmFsXShkYXRhW3N0YXRlXSA9PSBudWxsID8gdGhpcy5vcHRpb25zW3N0YXRlXSA6IGRhdGFbc3RhdGVdKVxuXG4gICAgICBpZiAoc3RhdGUgPT0gJ2xvYWRpbmdUZXh0Jykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgJGVsLmFkZENsYXNzKGQpLmF0dHIoZCwgZCkucHJvcChkLCB0cnVlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICRlbC5yZW1vdmVDbGFzcyhkKS5yZW1vdmVBdHRyKGQpLnByb3AoZCwgZmFsc2UpXG4gICAgICB9XG4gICAgfSwgdGhpcyksIDApXG4gIH1cblxuICBCdXR0b24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hhbmdlZCA9IHRydWVcbiAgICB2YXIgJHBhcmVudCA9IHRoaXMuJGVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScpXG5cbiAgICBpZiAoJHBhcmVudC5sZW5ndGgpIHtcbiAgICAgIHZhciAkaW5wdXQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2lucHV0JylcbiAgICAgIGlmICgkaW5wdXQucHJvcCgndHlwZScpID09ICdyYWRpbycpIHtcbiAgICAgICAgaWYgKCRpbnB1dC5wcm9wKCdjaGVja2VkJykpIGNoYW5nZWQgPSBmYWxzZVxuICAgICAgICAkcGFyZW50LmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgIH0gZWxzZSBpZiAoJGlucHV0LnByb3AoJ3R5cGUnKSA9PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGlmICgoJGlucHV0LnByb3AoJ2NoZWNrZWQnKSkgIT09IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSBjaGFuZ2VkID0gZmFsc2VcbiAgICAgICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgIH1cbiAgICAgICRpbnB1dC5wcm9wKCdjaGVja2VkJywgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICBpZiAoY2hhbmdlZCkgJGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1wcmVzc2VkJywgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICB9XG4gIH1cblxuXG4gIC8vIEJVVFRPTiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuYnV0dG9uJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5idXR0b24nLCAoZGF0YSA9IG5ldyBCdXR0b24odGhpcywgb3B0aW9ucykpKVxuXG4gICAgICBpZiAob3B0aW9uID09ICd0b2dnbGUnKSBkYXRhLnRvZ2dsZSgpXG4gICAgICBlbHNlIGlmIChvcHRpb24pIGRhdGEuc2V0U3RhdGUob3B0aW9uKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5idXR0b25cblxuICAkLmZuLmJ1dHRvbiAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmJ1dHRvbi5Db25zdHJ1Y3RvciA9IEJ1dHRvblxuXG5cbiAgLy8gQlVUVE9OIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYnV0dG9uLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5idXR0b24gPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBCVVRUT04gREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmJ1dHRvbi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciAkYnRuID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmJ0bicpXG4gICAgICBQbHVnaW4uY2FsbCgkYnRuLCAndG9nZ2xlJylcbiAgICAgIGlmICghKCQoZS50YXJnZXQpLmlzKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpKSkge1xuICAgICAgICAvLyBQcmV2ZW50IGRvdWJsZSBjbGljayBvbiByYWRpb3MsIGFuZCB0aGUgZG91YmxlIHNlbGVjdGlvbnMgKHNvIGNhbmNlbGxhdGlvbikgb24gY2hlY2tib3hlc1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgLy8gVGhlIHRhcmdldCBjb21wb25lbnQgc3RpbGwgcmVjZWl2ZSB0aGUgZm9jdXNcbiAgICAgICAgaWYgKCRidG4uaXMoJ2lucHV0LGJ1dHRvbicpKSAkYnRuLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgZWxzZSAkYnRuLmZpbmQoJ2lucHV0OnZpc2libGUsYnV0dG9uOnZpc2libGUnKS5maXJzdCgpLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgIH1cbiAgICB9KVxuICAgIC5vbignZm9jdXMuYnMuYnV0dG9uLmRhdGEtYXBpIGJsdXIuYnMuYnV0dG9uLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZV49XCJidXR0b25cIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgJChlLnRhcmdldCkuY2xvc2VzdCgnLmJ0bicpLnRvZ2dsZUNsYXNzKCdmb2N1cycsIC9eZm9jdXMoaW4pPyQvLnRlc3QoZS50eXBlKSlcbiAgICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjYXJvdXNlbC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2Nhcm91c2VsXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ0FST1VTRUwgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIENhcm91c2VsID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGluZGljYXRvcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJylcbiAgICB0aGlzLm9wdGlvbnMgICAgID0gb3B0aW9uc1xuICAgIHRoaXMucGF1c2VkICAgICAgPSBudWxsXG4gICAgdGhpcy5zbGlkaW5nICAgICA9IG51bGxcbiAgICB0aGlzLmludGVydmFsICAgID0gbnVsbFxuICAgIHRoaXMuJGFjdGl2ZSAgICAgPSBudWxsXG4gICAgdGhpcy4kaXRlbXMgICAgICA9IG51bGxcblxuICAgIHRoaXMub3B0aW9ucy5rZXlib2FyZCAmJiB0aGlzLiRlbGVtZW50Lm9uKCdrZXlkb3duLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLmtleWRvd24sIHRoaXMpKVxuXG4gICAgdGhpcy5vcHRpb25zLnBhdXNlID09ICdob3ZlcicgJiYgISgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpICYmIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbignbW91c2VlbnRlci5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5wYXVzZSwgdGhpcykpXG4gICAgICAub24oJ21vdXNlbGVhdmUuYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMuY3ljbGUsIHRoaXMpKVxuICB9XG5cbiAgQ2Fyb3VzZWwuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDYwMFxuXG4gIENhcm91c2VsLkRFRkFVTFRTID0ge1xuICAgIGludGVydmFsOiA1MDAwLFxuICAgIHBhdXNlOiAnaG92ZXInLFxuICAgIHdyYXA6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWVcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChlLnRhcmdldC50YWdOYW1lKSkgcmV0dXJuXG4gICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICBjYXNlIDM3OiB0aGlzLnByZXYoKTsgYnJlYWtcbiAgICAgIGNhc2UgMzk6IHRoaXMubmV4dCgpOyBicmVha1xuICAgICAgZGVmYXVsdDogcmV0dXJuXG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuY3ljbGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUgfHwgKHRoaXMucGF1c2VkID0gZmFsc2UpXG5cbiAgICB0aGlzLmludGVydmFsICYmIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHRoaXMub3B0aW9ucy5pbnRlcnZhbFxuICAgICAgJiYgIXRoaXMucGF1c2VkXG4gICAgICAmJiAodGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCQucHJveHkodGhpcy5uZXh0LCB0aGlzKSwgdGhpcy5vcHRpb25zLmludGVydmFsKSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbUluZGV4ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB0aGlzLiRpdGVtcyA9IGl0ZW0ucGFyZW50KCkuY2hpbGRyZW4oJy5pdGVtJylcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuaW5kZXgoaXRlbSB8fCB0aGlzLiRhY3RpdmUpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuZ2V0SXRlbUZvckRpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24sIGFjdGl2ZSkge1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGFjdGl2ZSlcbiAgICB2YXIgd2lsbFdyYXAgPSAoZGlyZWN0aW9uID09ICdwcmV2JyAmJiBhY3RpdmVJbmRleCA9PT0gMClcbiAgICAgICAgICAgICAgICB8fCAoZGlyZWN0aW9uID09ICduZXh0JyAmJiBhY3RpdmVJbmRleCA9PSAodGhpcy4kaXRlbXMubGVuZ3RoIC0gMSkpXG4gICAgaWYgKHdpbGxXcmFwICYmICF0aGlzLm9wdGlvbnMud3JhcCkgcmV0dXJuIGFjdGl2ZVxuICAgIHZhciBkZWx0YSA9IGRpcmVjdGlvbiA9PSAncHJldicgPyAtMSA6IDFcbiAgICB2YXIgaXRlbUluZGV4ID0gKGFjdGl2ZUluZGV4ICsgZGVsdGEpICUgdGhpcy4kaXRlbXMubGVuZ3RoXG4gICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmVxKGl0ZW1JbmRleClcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgPSB0aGlzXG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgodGhpcy4kYWN0aXZlID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXRlbS5hY3RpdmUnKSlcblxuICAgIGlmIChwb3MgPiAodGhpcy4kaXRlbXMubGVuZ3RoIC0gMSkgfHwgcG9zIDwgMCkgcmV0dXJuXG5cbiAgICBpZiAodGhpcy5zbGlkaW5nKSAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5vbmUoJ3NsaWQuYnMuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoKSB7IHRoYXQudG8ocG9zKSB9KSAvLyB5ZXMsIFwic2xpZFwiXG4gICAgaWYgKGFjdGl2ZUluZGV4ID09IHBvcykgcmV0dXJuIHRoaXMucGF1c2UoKS5jeWNsZSgpXG5cbiAgICByZXR1cm4gdGhpcy5zbGlkZShwb3MgPiBhY3RpdmVJbmRleCA/ICduZXh0JyA6ICdwcmV2JywgdGhpcy4kaXRlbXMuZXEocG9zKSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZSB8fCAodGhpcy5wYXVzZWQgPSB0cnVlKVxuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuZmluZCgnLm5leHQsIC5wcmV2JykubGVuZ3RoICYmICQuc3VwcG9ydC50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKVxuICAgICAgdGhpcy5jeWNsZSh0cnVlKVxuICAgIH1cblxuICAgIHRoaXMuaW50ZXJ2YWwgPSBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGluZykgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUoJ25leHQnKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2xpZGluZykgcmV0dXJuXG4gICAgcmV0dXJuIHRoaXMuc2xpZGUoJ3ByZXYnKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24gKHR5cGUsIG5leHQpIHtcbiAgICB2YXIgJGFjdGl2ZSAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXRlbS5hY3RpdmUnKVxuICAgIHZhciAkbmV4dCAgICAgPSBuZXh0IHx8IHRoaXMuZ2V0SXRlbUZvckRpcmVjdGlvbih0eXBlLCAkYWN0aXZlKVxuICAgIHZhciBpc0N5Y2xpbmcgPSB0aGlzLmludGVydmFsXG4gICAgdmFyIGRpcmVjdGlvbiA9IHR5cGUgPT0gJ25leHQnID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgIHZhciB0aGF0ICAgICAgPSB0aGlzXG5cbiAgICBpZiAoJG5leHQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm4gKHRoaXMuc2xpZGluZyA9IGZhbHNlKVxuXG4gICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSAkbmV4dFswXVxuICAgIHZhciBzbGlkZUV2ZW50ID0gJC5FdmVudCgnc2xpZGUuYnMuY2Fyb3VzZWwnLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0LFxuICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb25cbiAgICB9KVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkZUV2ZW50KVxuICAgIGlmIChzbGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuc2xpZGluZyA9IHRydWVcblxuICAgIGlzQ3ljbGluZyAmJiB0aGlzLnBhdXNlKClcblxuICAgIGlmICh0aGlzLiRpbmRpY2F0b3JzLmxlbmd0aCkge1xuICAgICAgdGhpcy4kaW5kaWNhdG9ycy5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB2YXIgJG5leHRJbmRpY2F0b3IgPSAkKHRoaXMuJGluZGljYXRvcnMuY2hpbGRyZW4oKVt0aGlzLmdldEl0ZW1JbmRleCgkbmV4dCldKVxuICAgICAgJG5leHRJbmRpY2F0b3IgJiYgJG5leHRJbmRpY2F0b3IuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgdmFyIHNsaWRFdmVudCA9ICQuRXZlbnQoJ3NsaWQuYnMuY2Fyb3VzZWwnLCB7IHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsIGRpcmVjdGlvbjogZGlyZWN0aW9uIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnc2xpZGUnKSkge1xuICAgICAgJG5leHQuYWRkQ2xhc3ModHlwZSlcbiAgICAgICRuZXh0WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgJGFjdGl2ZS5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkbmV4dC5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkbmV4dC5yZW1vdmVDbGFzcyhbdHlwZSwgZGlyZWN0aW9uXS5qb2luKCcgJykpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICRhY3RpdmUucmVtb3ZlQ2xhc3MoWydhY3RpdmUnLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSlcbiAgICAgICAgICB0aGF0LnNsaWRpbmcgPSBmYWxzZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICAgICAgICB9LCAwKVxuICAgICAgICB9KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICB9IGVsc2Uge1xuICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICRuZXh0LmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgdGhpcy5zbGlkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkRXZlbnQpXG4gICAgfVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMuY3ljbGUoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ2Fyb3VzZWwuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG4gICAgICB2YXIgYWN0aW9uICA9IHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycgPyBvcHRpb24gOiBvcHRpb25zLnNsaWRlXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnLCAoZGF0YSA9IG5ldyBDYXJvdXNlbCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnbnVtYmVyJykgZGF0YS50byhvcHRpb24pXG4gICAgICBlbHNlIGlmIChhY3Rpb24pIGRhdGFbYWN0aW9uXSgpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLmludGVydmFsKSBkYXRhLnBhdXNlKCkuY3ljbGUoKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5jYXJvdXNlbFxuXG4gICQuZm4uY2Fyb3VzZWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5jYXJvdXNlbC5Db25zdHJ1Y3RvciA9IENhcm91c2VsXG5cblxuICAvLyBDQVJPVVNFTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uY2Fyb3VzZWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmNhcm91c2VsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgaHJlZlxuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmID0gJHRoaXMuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIGlmICghJHRhcmdldC5oYXNDbGFzcygnY2Fyb3VzZWwnKSkgcmV0dXJuXG4gICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcbiAgICB2YXIgc2xpZGVJbmRleCA9ICR0aGlzLmF0dHIoJ2RhdGEtc2xpZGUtdG8nKVxuICAgIGlmIChzbGlkZUluZGV4KSBvcHRpb25zLmludGVydmFsID0gZmFsc2VcblxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbnMpXG5cbiAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgJHRhcmdldC5kYXRhKCdicy5jYXJvdXNlbCcpLnRvKHNsaWRlSW5kZXgpXG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGVdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMuY2Fyb3VzZWwuZGF0YS1hcGknLCAnW2RhdGEtc2xpZGUtdG9dJywgY2xpY2tIYW5kbGVyKVxuXG4gICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1yaWRlPVwiY2Fyb3VzZWxcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkY2Fyb3VzZWwgPSAkKHRoaXMpXG4gICAgICBQbHVnaW4uY2FsbCgkY2Fyb3VzZWwsICRjYXJvdXNlbC5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogY29sbGFwc2UuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNjb2xsYXBzZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoganNoaW50IGxhdGVkZWY6IGZhbHNlICovXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ09MTEFQU0UgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ29sbGFwc2UgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy4kdHJpZ2dlciAgICAgID0gJCgnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1baHJlZj1cIiMnICsgZWxlbWVudC5pZCArICdcIl0sJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS10YXJnZXQ9XCIjJyArIGVsZW1lbnQuaWQgKyAnXCJdJylcbiAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSBudWxsXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmVudCkge1xuICAgICAgdGhpcy4kcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0aGlzLiRlbGVtZW50LCB0aGlzLiR0cmlnZ2VyKVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9nZ2xlKSB0aGlzLnRvZ2dsZSgpXG4gIH1cblxuICBDb2xsYXBzZS5WRVJTSU9OICA9ICczLjMuNydcblxuICBDb2xsYXBzZS5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMzUwXG5cbiAgQ29sbGFwc2UuREVGQVVMVFMgPSB7XG4gICAgdG9nZ2xlOiB0cnVlXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuZGltZW5zaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYXNXaWR0aCA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3dpZHRoJylcbiAgICByZXR1cm4gaGFzV2lkdGggPyAnd2lkdGgnIDogJ2hlaWdodCdcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25pbmcgfHwgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgYWN0aXZlc0RhdGFcbiAgICB2YXIgYWN0aXZlcyA9IHRoaXMuJHBhcmVudCAmJiB0aGlzLiRwYXJlbnQuY2hpbGRyZW4oJy5wYW5lbCcpLmNoaWxkcmVuKCcuaW4sIC5jb2xsYXBzaW5nJylcblxuICAgIGlmIChhY3RpdmVzICYmIGFjdGl2ZXMubGVuZ3RoKSB7XG4gICAgICBhY3RpdmVzRGF0YSA9IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgaWYgKGFjdGl2ZXNEYXRhICYmIGFjdGl2ZXNEYXRhLnRyYW5zaXRpb25pbmcpIHJldHVyblxuICAgIH1cblxuICAgIHZhciBzdGFydEV2ZW50ID0gJC5FdmVudCgnc2hvdy5icy5jb2xsYXBzZScpXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIFBsdWdpbi5jYWxsKGFjdGl2ZXMsICdoaWRlJylcbiAgICAgIGFjdGl2ZXNEYXRhIHx8IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnLCBudWxsKVxuICAgIH1cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpW2RpbWVuc2lvbl0oMClcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMuJHRyaWdnZXJcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDFcblxuICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgICAgLmFkZENsYXNzKCdjb2xsYXBzZSBpbicpW2RpbWVuc2lvbl0oJycpXG4gICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAwXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC50cmlnZ2VyKCdzaG93bi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHZhciBzY3JvbGxTaXplID0gJC5jYW1lbENhc2UoWydzY3JvbGwnLCBkaW1lbnNpb25dLmpvaW4oJy0nKSlcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04pW2RpbWVuc2lvbl0odGhpcy4kZWxlbWVudFswXVtzY3JvbGxTaXplXSlcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25pbmcgfHwgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykpIHJldHVyblxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5kaW1lbnNpb24oKVxuXG4gICAgdGhpcy4kZWxlbWVudFtkaW1lbnNpb25dKHRoaXMuJGVsZW1lbnRbZGltZW5zaW9uXSgpKVswXS5vZmZzZXRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlIGluJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICB0aGlzLiR0cmlnZ2VyXG4gICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMFxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgICAgLnRyaWdnZXIoJ2hpZGRlbi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIFtkaW1lbnNpb25dKDApXG4gICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KGNvbXBsZXRlLCB0aGlzKSlcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChDb2xsYXBzZS5UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzW3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykgPyAnaGlkZScgOiAnc2hvdyddKClcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5nZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQodGhpcy5vcHRpb25zLnBhcmVudClcbiAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXBhcmVudD1cIicgKyB0aGlzLm9wdGlvbnMucGFyZW50ICsgJ1wiXScpXG4gICAgICAuZWFjaCgkLnByb3h5KGZ1bmN0aW9uIChpLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudClcbiAgICAgICAgdGhpcy5hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZ2V0VGFyZ2V0RnJvbVRyaWdnZXIoJGVsZW1lbnQpLCAkZWxlbWVudClcbiAgICAgIH0sIHRoaXMpKVxuICAgICAgLmVuZCgpXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkdHJpZ2dlcikge1xuICAgIHZhciBpc09wZW4gPSAkZWxlbWVudC5oYXNDbGFzcygnaW4nKVxuXG4gICAgJGVsZW1lbnQuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3BlbilcbiAgICAkdHJpZ2dlclxuICAgICAgLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnLCAhaXNPcGVuKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdHJpZ2dlcikge1xuICAgIHZhciBocmVmXG4gICAgdmFyIHRhcmdldCA9ICR0cmlnZ2VyLmF0dHIoJ2RhdGEtdGFyZ2V0JylcbiAgICAgIHx8IChocmVmID0gJHRyaWdnZXIuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG5cbiAgICByZXR1cm4gJCh0YXJnZXQpXG4gIH1cblxuXG4gIC8vIENPTExBUFNFIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIENvbGxhcHNlLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEgJiYgb3B0aW9ucy50b2dnbGUgJiYgL3Nob3d8aGlkZS8udGVzdChvcHRpb24pKSBvcHRpb25zLnRvZ2dsZSA9IGZhbHNlXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJywgKGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNvbGxhcHNlXG5cbiAgJC5mbi5jb2xsYXBzZSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNvbGxhcHNlLkNvbnN0cnVjdG9yID0gQ29sbGFwc2VcblxuXG4gIC8vIENPTExBUFNFIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jb2xsYXBzZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY29sbGFwc2UgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDT0xMQVBTRSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5jb2xsYXBzZS5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG5cbiAgICBpZiAoISR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdmFyICR0YXJnZXQgPSBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdGhpcylcbiAgICB2YXIgZGF0YSAgICA9ICR0YXJnZXQuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgIHZhciBvcHRpb24gID0gZGF0YSA/ICd0b2dnbGUnIDogJHRoaXMuZGF0YSgpXG5cbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGRyb3Bkb3duLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jZHJvcGRvd25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gRFJPUERPV04gQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIGJhY2tkcm9wID0gJy5kcm9wZG93bi1iYWNrZHJvcCdcbiAgdmFyIHRvZ2dsZSAgID0gJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJ1xuICB2YXIgRHJvcGRvd24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICQoZWxlbWVudCkub24oJ2NsaWNrLmJzLmRyb3Bkb3duJywgdGhpcy50b2dnbGUpXG4gIH1cblxuICBEcm9wZG93bi5WRVJTSU9OID0gJzMuMy43J1xuXG4gIGZ1bmN0aW9uIGdldFBhcmVudCgkdGhpcykge1xuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yICYmIC8jW0EtWmEtel0vLnRlc3Qoc2VsZWN0b3IpICYmIHNlbGVjdG9yLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgfVxuXG4gICAgdmFyICRwYXJlbnQgPSBzZWxlY3RvciAmJiAkKHNlbGVjdG9yKVxuXG4gICAgcmV0dXJuICRwYXJlbnQgJiYgJHBhcmVudC5sZW5ndGggPyAkcGFyZW50IDogJHRoaXMucGFyZW50KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyTWVudXMoZSkge1xuICAgIGlmIChlICYmIGUud2hpY2ggPT09IDMpIHJldHVyblxuICAgICQoYmFja2Ryb3ApLnJlbW92ZSgpXG4gICAgJCh0b2dnbGUpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgICAgICAgPSAkKHRoaXMpXG4gICAgICB2YXIgJHBhcmVudCAgICAgICA9IGdldFBhcmVudCgkdGhpcylcbiAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0geyByZWxhdGVkVGFyZ2V0OiB0aGlzIH1cblxuICAgICAgaWYgKCEkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJykpIHJldHVyblxuXG4gICAgICBpZiAoZSAmJiBlLnR5cGUgPT0gJ2NsaWNrJyAmJiAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGUudGFyZ2V0LnRhZ05hbWUpICYmICQuY29udGFpbnMoJHBhcmVudFswXSwgZS50YXJnZXQpKSByZXR1cm5cblxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdoaWRlLmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHRoaXMuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdvcGVuJykudHJpZ2dlcigkLkV2ZW50KCdoaWRkZW4uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9KVxuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgaWYgKCR0aGlzLmlzKCcuZGlzYWJsZWQsIDpkaXNhYmxlZCcpKSByZXR1cm5cblxuICAgIHZhciAkcGFyZW50ICA9IGdldFBhcmVudCgkdGhpcylcbiAgICB2YXIgaXNBY3RpdmUgPSAkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJylcblxuICAgIGNsZWFyTWVudXMoKVxuXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAhJHBhcmVudC5jbG9zZXN0KCcubmF2YmFyLW5hdicpLmxlbmd0aCkge1xuICAgICAgICAvLyBpZiBtb2JpbGUgd2UgdXNlIGEgYmFja2Ryb3AgYmVjYXVzZSBjbGljayBldmVudHMgZG9uJ3QgZGVsZWdhdGVcbiAgICAgICAgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgICAuYWRkQ2xhc3MoJ2Ryb3Bkb3duLWJhY2tkcm9wJylcbiAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJCh0aGlzKSlcbiAgICAgICAgICAub24oJ2NsaWNrJywgY2xlYXJNZW51cylcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdzaG93LmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHRoaXNcbiAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpXG5cbiAgICAgICRwYXJlbnRcbiAgICAgICAgLnRvZ2dsZUNsYXNzKCdvcGVuJylcbiAgICAgICAgLnRyaWdnZXIoJC5FdmVudCgnc2hvd24uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIS8oMzh8NDB8Mjd8MzIpLy50ZXN0KGUud2hpY2gpIHx8IC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkpIHJldHVyblxuXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgaWYgKCR0aGlzLmlzKCcuZGlzYWJsZWQsIDpkaXNhYmxlZCcpKSByZXR1cm5cblxuICAgIHZhciAkcGFyZW50ICA9IGdldFBhcmVudCgkdGhpcylcbiAgICB2YXIgaXNBY3RpdmUgPSAkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJylcblxuICAgIGlmICghaXNBY3RpdmUgJiYgZS53aGljaCAhPSAyNyB8fCBpc0FjdGl2ZSAmJiBlLndoaWNoID09IDI3KSB7XG4gICAgICBpZiAoZS53aGljaCA9PSAyNykgJHBhcmVudC5maW5kKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgcmV0dXJuICR0aGlzLnRyaWdnZXIoJ2NsaWNrJylcbiAgICB9XG5cbiAgICB2YXIgZGVzYyA9ICcgbGk6bm90KC5kaXNhYmxlZCk6dmlzaWJsZSBhJ1xuICAgIHZhciAkaXRlbXMgPSAkcGFyZW50LmZpbmQoJy5kcm9wZG93bi1tZW51JyArIGRlc2MpXG5cbiAgICBpZiAoISRpdGVtcy5sZW5ndGgpIHJldHVyblxuXG4gICAgdmFyIGluZGV4ID0gJGl0ZW1zLmluZGV4KGUudGFyZ2V0KVxuXG4gICAgaWYgKGUud2hpY2ggPT0gMzggJiYgaW5kZXggPiAwKSAgICAgICAgICAgICAgICAgaW5kZXgtLSAgICAgICAgIC8vIHVwXG4gICAgaWYgKGUud2hpY2ggPT0gNDAgJiYgaW5kZXggPCAkaXRlbXMubGVuZ3RoIC0gMSkgaW5kZXgrKyAgICAgICAgIC8vIGRvd25cbiAgICBpZiAoIX5pbmRleCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDBcblxuICAgICRpdGVtcy5lcShpbmRleCkudHJpZ2dlcignZm9jdXMnKVxuICB9XG5cblxuICAvLyBEUk9QRE9XTiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICA9ICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5kcm9wZG93bicsIChkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0uY2FsbCgkdGhpcylcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uZHJvcGRvd25cblxuICAkLmZuLmRyb3Bkb3duICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uZHJvcGRvd24uQ29uc3RydWN0b3IgPSBEcm9wZG93blxuXG5cbiAgLy8gRFJPUERPV04gTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmRyb3Bkb3duLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5kcm9wZG93biA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEFQUExZIFRPIFNUQU5EQVJEIERST1BET1dOIEVMRU1FTlRTXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgY2xlYXJNZW51cylcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgJy5kcm9wZG93biBmb3JtJywgZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9KVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCB0b2dnbGUsIERyb3Bkb3duLnByb3RvdHlwZS50b2dnbGUpXG4gICAgLm9uKCdrZXlkb3duLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgdG9nZ2xlLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnLmRyb3Bkb3duLW1lbnUnLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogbW9kYWwuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNtb2RhbHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBNT0RBTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgTW9kYWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyAgICAgICAgICAgICA9IG9wdGlvbnNcbiAgICB0aGlzLiRib2R5ICAgICAgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kZWxlbWVudCAgICAgICAgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGRpYWxvZyAgICAgICAgICAgICA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLm1vZGFsLWRpYWxvZycpXG4gICAgdGhpcy4kYmFja2Ryb3AgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuaXNTaG93biAgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCAgICAgPSBudWxsXG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCAgICAgID0gMFxuICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW90ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuZmluZCgnLm1vZGFsLWNvbnRlbnQnKVxuICAgICAgICAubG9hZCh0aGlzLm9wdGlvbnMucmVtb3RlLCAkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2xvYWRlZC5icy5tb2RhbCcpXG4gICAgICAgIH0sIHRoaXMpKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzMDBcbiAgTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIE1vZGFsLkRFRkFVTFRTID0ge1xuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIHNob3c6IHRydWVcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coX3JlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBlICAgID0gJC5FdmVudCgnc2hvdy5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKHRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IHRydWVcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxiYXIoKVxuICAgIHRoaXMuc2V0U2Nyb2xsYmFyKClcbiAgICB0aGlzLiRib2R5LmFkZENsYXNzKCdtb2RhbC1vcGVuJylcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJywgJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsICQucHJveHkodGhpcy5oaWRlLCB0aGlzKSlcblxuICAgIHRoaXMuJGRpYWxvZy5vbignbW91c2Vkb3duLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRlbGVtZW50Lm9uZSgnbW91c2V1cC5kaXNtaXNzLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKHRoYXQuJGVsZW1lbnQpKSB0aGF0Lmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSB0cnVlXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9uID0gJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhhdC4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpXG5cbiAgICAgIGlmICghdGhhdC4kZWxlbWVudC5wYXJlbnQoKS5sZW5ndGgpIHtcbiAgICAgICAgdGhhdC4kZWxlbWVudC5hcHBlbmRUbyh0aGF0LiRib2R5KSAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgdGhhdC4kZWxlbWVudFxuICAgICAgICAuc2hvdygpXG4gICAgICAgIC5zY3JvbGxUb3AoMClcblxuICAgICAgdGhhdC5hZGp1c3REaWFsb2coKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0aGF0LiRlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50LmFkZENsYXNzKCdpbicpXG5cbiAgICAgIHRoYXQuZW5mb3JjZUZvY3VzKClcblxuICAgICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93bi5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgICAgdHJhbnNpdGlvbiA/XG4gICAgICAgIHRoYXQuJGRpYWxvZyAvLyB3YWl0IGZvciBtb2RhbCB0byBzbGlkZSBpblxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJykudHJpZ2dlcihlKVxuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgZSA9ICQuRXZlbnQoJ2hpZGUuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAoIXRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IGZhbHNlXG5cbiAgICB0aGlzLmVzY2FwZSgpXG4gICAgdGhpcy5yZXNpemUoKVxuXG4gICAgJChkb2N1bWVudCkub2ZmKCdmb2N1c2luLmJzLm1vZGFsJylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnaW4nKVxuICAgICAgLm9mZignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcpXG4gICAgICAub2ZmKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9mZignbW91c2Vkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuXG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgJC5wcm94eSh0aGlzLmhpZGVNb2RhbCwgdGhpcykpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICB0aGlzLmhpZGVNb2RhbCgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuZW5mb3JjZUZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICQoZG9jdW1lbnQpXG4gICAgICAub2ZmKCdmb2N1c2luLmJzLm1vZGFsJykgLy8gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBmb2N1cyBsb29wXG4gICAgICAub24oJ2ZvY3VzaW4uYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChkb2N1bWVudCAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnRbMF0gIT09IGUudGFyZ2V0ICYmXG4gICAgICAgICAgICAhdGhpcy4kZWxlbWVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICB9XG4gICAgICB9LCB0aGlzKSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lc2NhcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMua2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS53aGljaCA9PSAyNyAmJiB0aGlzLmhpZGUoKVxuICAgICAgfSwgdGhpcykpXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzU2hvd24pIHtcbiAgICAgICQod2luZG93KS5vbigncmVzaXplLmJzLm1vZGFsJywgJC5wcm94eSh0aGlzLmhhbmRsZVVwZGF0ZSwgdGhpcykpXG4gICAgfSBlbHNlIHtcbiAgICAgICQod2luZG93KS5vZmYoJ3Jlc2l6ZS5icy5tb2RhbCcpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB0aGlzLiRlbGVtZW50LmhpZGUoKVxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC4kYm9keS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpXG4gICAgICB0aGF0LnJlc2V0QWRqdXN0bWVudHMoKVxuICAgICAgdGhhdC5yZXNldFNjcm9sbGJhcigpXG4gICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2hpZGRlbi5icy5tb2RhbCcpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZW1vdmVCYWNrZHJvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRiYWNrZHJvcCAmJiB0aGlzLiRiYWNrZHJvcC5yZW1vdmUoKVxuICAgIHRoaXMuJGJhY2tkcm9wID0gbnVsbFxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmJhY2tkcm9wID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGFuaW1hdGUgPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgPyAnZmFkZScgOiAnJ1xuXG4gICAgaWYgKHRoaXMuaXNTaG93biAmJiB0aGlzLm9wdGlvbnMuYmFja2Ryb3ApIHtcbiAgICAgIHZhciBkb0FuaW1hdGUgPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiBhbmltYXRlXG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgLmFkZENsYXNzKCdtb2RhbC1iYWNrZHJvcCAnICsgYW5pbWF0ZSlcbiAgICAgICAgLmFwcGVuZFRvKHRoaXMuJGJvZHkpXG5cbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2spIHtcbiAgICAgICAgICB0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSByZXR1cm5cbiAgICAgICAgdGhpcy5vcHRpb25zLmJhY2tkcm9wID09ICdzdGF0aWMnXG4gICAgICAgICAgPyB0aGlzLiRlbGVtZW50WzBdLmZvY3VzKClcbiAgICAgICAgICA6IHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcblxuICAgICAgaWYgKGRvQW5pbWF0ZSkgdGhpcy4kYmFja2Ryb3BbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wLmFkZENsYXNzKCdpbicpXG5cbiAgICAgIGlmICghY2FsbGJhY2spIHJldHVyblxuXG4gICAgICBkb0FuaW1hdGUgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrKClcblxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93biAmJiB0aGlzLiRiYWNrZHJvcCkge1xuICAgICAgdGhpcy4kYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICAgdmFyIGNhbGxiYWNrUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LnJlbW92ZUJhY2tkcm9wKClcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfVxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjYWxsYmFja1JlbW92ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjYWxsYmFja1JlbW92ZSgpXG5cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgLy8gdGhlc2UgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuXG4gIE1vZGFsLnByb3RvdHlwZS5oYW5kbGVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hZGp1c3REaWFsb2coKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmFkanVzdERpYWxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbW9kYWxJc092ZXJmbG93aW5nID0gdGhpcy4kZWxlbWVudFswXS5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG5cbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICBwYWRkaW5nTGVmdDogICF0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmIG1vZGFsSXNPdmVyZmxvd2luZyA/IHRoaXMuc2Nyb2xsYmFyV2lkdGggOiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogdGhpcy5ib2R5SXNPdmVyZmxvd2luZyAmJiAhbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNldEFkanVzdG1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmNoZWNrU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmdWxsV2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGlmICghZnVsbFdpbmRvd1dpZHRoKSB7IC8vIHdvcmthcm91bmQgZm9yIG1pc3Npbmcgd2luZG93LmlubmVyV2lkdGggaW4gSUU4XG4gICAgICB2YXIgZG9jdW1lbnRFbGVtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgZnVsbFdpbmRvd1dpZHRoID0gZG9jdW1lbnRFbGVtZW50UmVjdC5yaWdodCAtIE1hdGguYWJzKGRvY3VtZW50RWxlbWVudFJlY3QubGVmdClcbiAgICB9XG4gICAgdGhpcy5ib2R5SXNPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCBmdWxsV2luZG93V2lkdGhcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5tZWFzdXJlU2Nyb2xsYmFyKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvZHlQYWQgPSBwYXJzZUludCgodGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnKSB8fCAwKSwgMTApXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWQgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB8fCAnJ1xuICAgIGlmICh0aGlzLmJvZHlJc092ZXJmbG93aW5nKSB0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcsIGJvZHlQYWQgKyB0aGlzLnNjcm9sbGJhcldpZHRoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgdGhpcy5vcmlnaW5hbEJvZHlQYWQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUubWVhc3VyZVNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHsgLy8gdGh4IHdhbHNoXG4gICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZSdcbiAgICB0aGlzLiRib2R5LmFwcGVuZChzY3JvbGxEaXYpXG4gICAgdmFyIHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoXG4gICAgdGhpcy4kYm9keVswXS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpXG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG4gIH1cblxuXG4gIC8vIE1PREFMIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbiwgX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5tb2RhbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBNb2RhbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5tb2RhbCcsIChkYXRhID0gbmV3IE1vZGFsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oX3JlbGF0ZWRUYXJnZXQpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLnNob3cpIGRhdGEuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4ubW9kYWxcblxuICAkLmZuLm1vZGFsICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4ubW9kYWwuQ29uc3RydWN0b3IgPSBNb2RhbFxuXG5cbiAgLy8gTU9EQUwgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLm1vZGFsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5tb2RhbCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIE1PREFMIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLm1vZGFsLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICB2YXIgaHJlZiAgICA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIHZhciBvcHRpb24gID0gJHRhcmdldC5kYXRhKCdicy5tb2RhbCcpID8gJ3RvZ2dsZScgOiAkLmV4dGVuZCh7IHJlbW90ZTogIS8jLy50ZXN0KGhyZWYpICYmIGhyZWYgfSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcblxuICAgIGlmICgkdGhpcy5pcygnYScpKSBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICR0YXJnZXQub25lKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKHNob3dFdmVudCkge1xuICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICR0YXJnZXQub25lKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICR0aGlzLmlzKCc6dmlzaWJsZScpICYmICR0aGlzLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgIH0pXG4gICAgfSlcbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24sIHRoaXMpXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRvb2x0aXAuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0b29sdGlwXG4gKiBJbnNwaXJlZCBieSB0aGUgb3JpZ2luYWwgalF1ZXJ5LnRpcHN5IGJ5IEphc29uIEZyYW1lXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVE9PTFRJUCBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIFRvb2x0aXAgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMudHlwZSAgICAgICA9IG51bGxcbiAgICB0aGlzLm9wdGlvbnMgICAgPSBudWxsXG4gICAgdGhpcy5lbmFibGVkICAgID0gbnVsbFxuICAgIHRoaXMudGltZW91dCAgICA9IG51bGxcbiAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG4gICAgdGhpcy4kZWxlbWVudCAgID0gbnVsbFxuICAgIHRoaXMuaW5TdGF0ZSAgICA9IG51bGxcblxuICAgIHRoaXMuaW5pdCgndG9vbHRpcCcsIGVsZW1lbnQsIG9wdGlvbnMpXG4gIH1cblxuICBUb29sdGlwLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIFRvb2x0aXAuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIFRvb2x0aXAuREVGQVVMVFMgPSB7XG4gICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgIHBsYWNlbWVudDogJ3RvcCcsXG4gICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInRvb2x0aXBcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJ0b29sdGlwLWFycm93XCI+PC9kaXY+PGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nLFxuICAgIHRyaWdnZXI6ICdob3ZlciBmb2N1cycsXG4gICAgdGl0bGU6ICcnLFxuICAgIGRlbGF5OiAwLFxuICAgIGh0bWw6IGZhbHNlLFxuICAgIGNvbnRhaW5lcjogZmFsc2UsXG4gICAgdmlld3BvcnQ6IHtcbiAgICAgIHNlbGVjdG9yOiAnYm9keScsXG4gICAgICBwYWRkaW5nOiAwXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICh0eXBlLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5lbmFibGVkICAgPSB0cnVlXG4gICAgdGhpcy50eXBlICAgICAgPSB0eXBlXG4gICAgdGhpcy4kZWxlbWVudCAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgPSB0aGlzLmdldE9wdGlvbnMob3B0aW9ucylcbiAgICB0aGlzLiR2aWV3cG9ydCA9IHRoaXMub3B0aW9ucy52aWV3cG9ydCAmJiAkKCQuaXNGdW5jdGlvbih0aGlzLm9wdGlvbnMudmlld3BvcnQpID8gdGhpcy5vcHRpb25zLnZpZXdwb3J0LmNhbGwodGhpcywgdGhpcy4kZWxlbWVudCkgOiAodGhpcy5vcHRpb25zLnZpZXdwb3J0LnNlbGVjdG9yIHx8IHRoaXMub3B0aW9ucy52aWV3cG9ydCkpXG4gICAgdGhpcy5pblN0YXRlICAgPSB7IGNsaWNrOiBmYWxzZSwgaG92ZXI6IGZhbHNlLCBmb2N1czogZmFsc2UgfVxuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnRbMF0gaW5zdGFuY2VvZiBkb2N1bWVudC5jb25zdHJ1Y3RvciAmJiAhdGhpcy5vcHRpb25zLnNlbGVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BzZWxlY3RvcmAgb3B0aW9uIG11c3QgYmUgc3BlY2lmaWVkIHdoZW4gaW5pdGlhbGl6aW5nICcgKyB0aGlzLnR5cGUgKyAnIG9uIHRoZSB3aW5kb3cuZG9jdW1lbnQgb2JqZWN0IScpXG4gICAgfVxuXG4gICAgdmFyIHRyaWdnZXJzID0gdGhpcy5vcHRpb25zLnRyaWdnZXIuc3BsaXQoJyAnKVxuXG4gICAgZm9yICh2YXIgaSA9IHRyaWdnZXJzLmxlbmd0aDsgaS0tOykge1xuICAgICAgdmFyIHRyaWdnZXIgPSB0cmlnZ2Vyc1tpXVxuXG4gICAgICBpZiAodHJpZ2dlciA9PSAnY2xpY2snKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLnRvZ2dsZSwgdGhpcykpXG4gICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgIT0gJ21hbnVhbCcpIHtcbiAgICAgICAgdmFyIGV2ZW50SW4gID0gdHJpZ2dlciA9PSAnaG92ZXInID8gJ21vdXNlZW50ZXInIDogJ2ZvY3VzaW4nXG4gICAgICAgIHZhciBldmVudE91dCA9IHRyaWdnZXIgPT0gJ2hvdmVyJyA/ICdtb3VzZWxlYXZlJyA6ICdmb2N1c291dCdcblxuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKGV2ZW50SW4gICsgJy4nICsgdGhpcy50eXBlLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsICQucHJveHkodGhpcy5lbnRlciwgdGhpcykpXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oZXZlbnRPdXQgKyAnLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLmxlYXZlLCB0aGlzKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMuc2VsZWN0b3IgP1xuICAgICAgKHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCB7IHRyaWdnZXI6ICdtYW51YWwnLCBzZWxlY3RvcjogJycgfSkpIDpcbiAgICAgIHRoaXMuZml4VGl0bGUoKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFRvb2x0aXAuREVGQVVMVFNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0cygpLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucylcblxuICAgIGlmIChvcHRpb25zLmRlbGF5ICYmIHR5cGVvZiBvcHRpb25zLmRlbGF5ID09ICdudW1iZXInKSB7XG4gICAgICBvcHRpb25zLmRlbGF5ID0ge1xuICAgICAgICBzaG93OiBvcHRpb25zLmRlbGF5LFxuICAgICAgICBoaWRlOiBvcHRpb25zLmRlbGF5XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldERlbGVnYXRlT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyAgPSB7fVxuICAgIHZhciBkZWZhdWx0cyA9IHRoaXMuZ2V0RGVmYXVsdHMoKVxuXG4gICAgdGhpcy5fb3B0aW9ucyAmJiAkLmVhY2godGhpcy5fb3B0aW9ucywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChkZWZhdWx0c1trZXldICE9IHZhbHVlKSBvcHRpb25zW2tleV0gPSB2YWx1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZW50ZXIgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHNlbGYgPSBvYmogaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID9cbiAgICAgIG9iaiA6ICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAoIXNlbGYpIHtcbiAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihvYmouY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgfVxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mICQuRXZlbnQpIHtcbiAgICAgIHNlbGYuaW5TdGF0ZVtvYmoudHlwZSA9PSAnZm9jdXNpbicgPyAnZm9jdXMnIDogJ2hvdmVyJ10gPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHNlbGYudGlwKCkuaGFzQ2xhc3MoJ2luJykgfHwgc2VsZi5ob3ZlclN0YXRlID09ICdpbicpIHtcbiAgICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdpbidcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG5cbiAgICBzZWxmLmhvdmVyU3RhdGUgPSAnaW4nXG5cbiAgICBpZiAoIXNlbGYub3B0aW9ucy5kZWxheSB8fCAhc2VsZi5vcHRpb25zLmRlbGF5LnNob3cpIHJldHVybiBzZWxmLnNob3coKVxuXG4gICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5ob3ZlclN0YXRlID09ICdpbicpIHNlbGYuc2hvdygpXG4gICAgfSwgc2VsZi5vcHRpb25zLmRlbGF5LnNob3cpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pc0luU3RhdGVUcnVlID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmluU3RhdGUpIHtcbiAgICAgIGlmICh0aGlzLmluU3RhdGVba2V5XSkgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmxlYXZlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBzZWxmID0gb2JqIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvciA/XG4gICAgICBvYmogOiAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuXG4gICAgaWYgKCFzZWxmKSB7XG4gICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3Iob2JqLmN1cnJlbnRUYXJnZXQsIHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpXG4gICAgICAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlLCBzZWxmKVxuICAgIH1cblxuICAgIGlmIChvYmogaW5zdGFuY2VvZiAkLkV2ZW50KSB7XG4gICAgICBzZWxmLmluU3RhdGVbb2JqLnR5cGUgPT0gJ2ZvY3Vzb3V0JyA/ICdmb2N1cycgOiAnaG92ZXInXSA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHNlbGYuaXNJblN0YXRlVHJ1ZSgpKSByZXR1cm5cblxuICAgIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG5cbiAgICBzZWxmLmhvdmVyU3RhdGUgPSAnb3V0J1xuXG4gICAgaWYgKCFzZWxmLm9wdGlvbnMuZGVsYXkgfHwgIXNlbGYub3B0aW9ucy5kZWxheS5oaWRlKSByZXR1cm4gc2VsZi5oaWRlKClcblxuICAgIHNlbGYudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuaG92ZXJTdGF0ZSA9PSAnb3V0Jykgc2VsZi5oaWRlKClcbiAgICB9LCBzZWxmLm9wdGlvbnMuZGVsYXkuaGlkZSlcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93LmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAodGhpcy5oYXNDb250ZW50KCkgJiYgdGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgICAgdmFyIGluRG9tID0gJC5jb250YWlucyh0aGlzLiRlbGVtZW50WzBdLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLiRlbGVtZW50WzBdKVxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgIWluRG9tKSByZXR1cm5cbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuXG4gICAgICB2YXIgJHRpcCA9IHRoaXMudGlwKClcblxuICAgICAgdmFyIHRpcElkID0gdGhpcy5nZXRVSUQodGhpcy50eXBlKVxuXG4gICAgICB0aGlzLnNldENvbnRlbnQoKVxuICAgICAgJHRpcC5hdHRyKCdpZCcsIHRpcElkKVxuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgdGlwSWQpXG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSAkdGlwLmFkZENsYXNzKCdmYWRlJylcblxuICAgICAgdmFyIHBsYWNlbWVudCA9IHR5cGVvZiB0aGlzLm9wdGlvbnMucGxhY2VtZW50ID09ICdmdW5jdGlvbicgP1xuICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50LmNhbGwodGhpcywgJHRpcFswXSwgdGhpcy4kZWxlbWVudFswXSkgOlxuICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50XG5cbiAgICAgIHZhciBhdXRvVG9rZW4gPSAvXFxzP2F1dG8/XFxzPy9pXG4gICAgICB2YXIgYXV0b1BsYWNlID0gYXV0b1Rva2VuLnRlc3QocGxhY2VtZW50KVxuICAgICAgaWYgKGF1dG9QbGFjZSkgcGxhY2VtZW50ID0gcGxhY2VtZW50LnJlcGxhY2UoYXV0b1Rva2VuLCAnJykgfHwgJ3RvcCdcblxuICAgICAgJHRpcFxuICAgICAgICAuZGV0YWNoKClcbiAgICAgICAgLmNzcyh7IHRvcDogMCwgbGVmdDogMCwgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgICAuYWRkQ2xhc3MocGxhY2VtZW50KVxuICAgICAgICAuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgdGhpcylcblxuICAgICAgdGhpcy5vcHRpb25zLmNvbnRhaW5lciA/ICR0aXAuYXBwZW5kVG8odGhpcy5vcHRpb25zLmNvbnRhaW5lcikgOiAkdGlwLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2luc2VydGVkLmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICAgIHZhciBwb3MgICAgICAgICAgPSB0aGlzLmdldFBvc2l0aW9uKClcbiAgICAgIHZhciBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgICB2YXIgYWN0dWFsSGVpZ2h0ID0gJHRpcFswXS5vZmZzZXRIZWlnaHRcblxuICAgICAgaWYgKGF1dG9QbGFjZSkge1xuICAgICAgICB2YXIgb3JnUGxhY2VtZW50ID0gcGxhY2VtZW50XG4gICAgICAgIHZhciB2aWV3cG9ydERpbSA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy4kdmlld3BvcnQpXG5cbiAgICAgICAgcGxhY2VtZW50ID0gcGxhY2VtZW50ID09ICdib3R0b20nICYmIHBvcy5ib3R0b20gKyBhY3R1YWxIZWlnaHQgPiB2aWV3cG9ydERpbS5ib3R0b20gPyAndG9wJyAgICA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAndG9wJyAgICAmJiBwb3MudG9wICAgIC0gYWN0dWFsSGVpZ2h0IDwgdmlld3BvcnREaW0udG9wICAgID8gJ2JvdHRvbScgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAgJiYgcG9zLnJpZ2h0ICArIGFjdHVhbFdpZHRoICA+IHZpZXdwb3J0RGltLndpZHRoICA/ICdsZWZ0JyAgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICdsZWZ0JyAgICYmIHBvcy5sZWZ0ICAgLSBhY3R1YWxXaWR0aCAgPCB2aWV3cG9ydERpbS5sZWZ0ICAgPyAncmlnaHQnICA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudFxuXG4gICAgICAgICR0aXBcbiAgICAgICAgICAucmVtb3ZlQ2xhc3Mob3JnUGxhY2VtZW50KVxuICAgICAgICAgIC5hZGRDbGFzcyhwbGFjZW1lbnQpXG4gICAgICB9XG5cbiAgICAgIHZhciBjYWxjdWxhdGVkT2Zmc2V0ID0gdGhpcy5nZXRDYWxjdWxhdGVkT2Zmc2V0KHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KVxuXG4gICAgICB0aGlzLmFwcGx5UGxhY2VtZW50KGNhbGN1bGF0ZWRPZmZzZXQsIHBsYWNlbWVudClcblxuICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldkhvdmVyU3RhdGUgPSB0aGF0LmhvdmVyU3RhdGVcbiAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdzaG93bi5icy4nICsgdGhhdC50eXBlKVxuICAgICAgICB0aGF0LmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICAgICAgaWYgKHByZXZIb3ZlclN0YXRlID09ICdvdXQnKSB0aGF0LmxlYXZlKHRoYXQpXG4gICAgICB9XG5cbiAgICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgJHRpcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNvbXBsZXRlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUb29sdGlwLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY29tcGxldGUoKVxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmFwcGx5UGxhY2VtZW50ID0gZnVuY3Rpb24gKG9mZnNldCwgcGxhY2VtZW50KSB7XG4gICAgdmFyICR0aXAgICA9IHRoaXMudGlwKClcbiAgICB2YXIgd2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgIHZhciBoZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgLy8gbWFudWFsbHkgcmVhZCBtYXJnaW5zIGJlY2F1c2UgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGluY2x1ZGVzIGRpZmZlcmVuY2VcbiAgICB2YXIgbWFyZ2luVG9wID0gcGFyc2VJbnQoJHRpcC5jc3MoJ21hcmdpbi10b3AnKSwgMTApXG4gICAgdmFyIG1hcmdpbkxlZnQgPSBwYXJzZUludCgkdGlwLmNzcygnbWFyZ2luLWxlZnQnKSwgMTApXG5cbiAgICAvLyB3ZSBtdXN0IGNoZWNrIGZvciBOYU4gZm9yIGllIDgvOVxuICAgIGlmIChpc05hTihtYXJnaW5Ub3ApKSAgbWFyZ2luVG9wICA9IDBcbiAgICBpZiAoaXNOYU4obWFyZ2luTGVmdCkpIG1hcmdpbkxlZnQgPSAwXG5cbiAgICBvZmZzZXQudG9wICArPSBtYXJnaW5Ub3BcbiAgICBvZmZzZXQubGVmdCArPSBtYXJnaW5MZWZ0XG5cbiAgICAvLyAkLmZuLm9mZnNldCBkb2Vzbid0IHJvdW5kIHBpeGVsIHZhbHVlc1xuICAgIC8vIHNvIHdlIHVzZSBzZXRPZmZzZXQgZGlyZWN0bHkgd2l0aCBvdXIgb3duIGZ1bmN0aW9uIEItMFxuICAgICQub2Zmc2V0LnNldE9mZnNldCgkdGlwWzBdLCAkLmV4dGVuZCh7XG4gICAgICB1c2luZzogZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgICR0aXAuY3NzKHtcbiAgICAgICAgICB0b3A6IE1hdGgucm91bmQocHJvcHMudG9wKSxcbiAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKHByb3BzLmxlZnQpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSwgb2Zmc2V0KSwgMClcblxuICAgICR0aXAuYWRkQ2xhc3MoJ2luJylcblxuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBwbGFjaW5nIHRpcCBpbiBuZXcgb2Zmc2V0IGNhdXNlZCB0aGUgdGlwIHRvIHJlc2l6ZSBpdHNlbGZcbiAgICB2YXIgYWN0dWFsV2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgaWYgKHBsYWNlbWVudCA9PSAndG9wJyAmJiBhY3R1YWxIZWlnaHQgIT0gaGVpZ2h0KSB7XG4gICAgICBvZmZzZXQudG9wID0gb2Zmc2V0LnRvcCArIGhlaWdodCAtIGFjdHVhbEhlaWdodFxuICAgIH1cblxuICAgIHZhciBkZWx0YSA9IHRoaXMuZ2V0Vmlld3BvcnRBZGp1c3RlZERlbHRhKHBsYWNlbWVudCwgb2Zmc2V0LCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KVxuXG4gICAgaWYgKGRlbHRhLmxlZnQpIG9mZnNldC5sZWZ0ICs9IGRlbHRhLmxlZnRcbiAgICBlbHNlIG9mZnNldC50b3AgKz0gZGVsdGEudG9wXG5cbiAgICB2YXIgaXNWZXJ0aWNhbCAgICAgICAgICA9IC90b3B8Ym90dG9tLy50ZXN0KHBsYWNlbWVudClcbiAgICB2YXIgYXJyb3dEZWx0YSAgICAgICAgICA9IGlzVmVydGljYWwgPyBkZWx0YS5sZWZ0ICogMiAtIHdpZHRoICsgYWN0dWFsV2lkdGggOiBkZWx0YS50b3AgKiAyIC0gaGVpZ2h0ICsgYWN0dWFsSGVpZ2h0XG4gICAgdmFyIGFycm93T2Zmc2V0UG9zaXRpb24gPSBpc1ZlcnRpY2FsID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnXG5cbiAgICAkdGlwLm9mZnNldChvZmZzZXQpXG4gICAgdGhpcy5yZXBsYWNlQXJyb3coYXJyb3dEZWx0YSwgJHRpcFswXVthcnJvd09mZnNldFBvc2l0aW9uXSwgaXNWZXJ0aWNhbClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnJlcGxhY2VBcnJvdyA9IGZ1bmN0aW9uIChkZWx0YSwgZGltZW5zaW9uLCBpc1ZlcnRpY2FsKSB7XG4gICAgdGhpcy5hcnJvdygpXG4gICAgICAuY3NzKGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJywgNTAgKiAoMSAtIGRlbHRhIC8gZGltZW5zaW9uKSArICclJylcbiAgICAgIC5jc3MoaXNWZXJ0aWNhbCA/ICd0b3AnIDogJ2xlZnQnLCAnJylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aXAgID0gdGhpcy50aXAoKVxuICAgIHZhciB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKVxuXG4gICAgJHRpcC5maW5kKCcudG9vbHRpcC1pbm5lcicpW3RoaXMub3B0aW9ucy5odG1sID8gJ2h0bWwnIDogJ3RleHQnXSh0aXRsZSlcbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdmYWRlIGluIHRvcCBib3R0b20gbGVmdCByaWdodCcpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyICR0aXAgPSAkKHRoaXMuJHRpcClcbiAgICB2YXIgZSAgICA9ICQuRXZlbnQoJ2hpZGUuYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgaWYgKHRoYXQuaG92ZXJTdGF0ZSAhPSAnaW4nKSAkdGlwLmRldGFjaCgpXG4gICAgICBpZiAodGhhdC4kZWxlbWVudCkgeyAvLyBUT0RPOiBDaGVjayB3aGV0aGVyIGd1YXJkaW5nIHRoaXMgY29kZSB3aXRoIHRoaXMgYGlmYCBpcyByZWFsbHkgbmVjZXNzYXJ5LlxuICAgICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknKVxuICAgICAgICAgIC50cmlnZ2VyKCdoaWRkZW4uYnMuJyArIHRoYXQudHlwZSlcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmICR0aXAuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAkdGlwXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICBjb21wbGV0ZSgpXG5cbiAgICB0aGlzLmhvdmVyU3RhdGUgPSBudWxsXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZml4VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIGlmICgkZS5hdHRyKCd0aXRsZScpIHx8IHR5cGVvZiAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJykgIT0gJ3N0cmluZycpIHtcbiAgICAgICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCAkZS5hdHRyKCd0aXRsZScpIHx8ICcnKS5hdHRyKCd0aXRsZScsICcnKVxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmhhc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUoKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcbiAgICAkZWxlbWVudCAgID0gJGVsZW1lbnQgfHwgdGhpcy4kZWxlbWVudFxuXG4gICAgdmFyIGVsICAgICA9ICRlbGVtZW50WzBdXG4gICAgdmFyIGlzQm9keSA9IGVsLnRhZ05hbWUgPT0gJ0JPRFknXG5cbiAgICB2YXIgZWxSZWN0ICAgID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBpZiAoZWxSZWN0LndpZHRoID09IG51bGwpIHtcbiAgICAgIC8vIHdpZHRoIGFuZCBoZWlnaHQgYXJlIG1pc3NpbmcgaW4gSUU4LCBzbyBjb21wdXRlIHRoZW0gbWFudWFsbHk7IHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzE0MDkzXG4gICAgICBlbFJlY3QgPSAkLmV4dGVuZCh7fSwgZWxSZWN0LCB7IHdpZHRoOiBlbFJlY3QucmlnaHQgLSBlbFJlY3QubGVmdCwgaGVpZ2h0OiBlbFJlY3QuYm90dG9tIC0gZWxSZWN0LnRvcCB9KVxuICAgIH1cbiAgICB2YXIgaXNTdmcgPSB3aW5kb3cuU1ZHRWxlbWVudCAmJiBlbCBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50XG4gICAgLy8gQXZvaWQgdXNpbmcgJC5vZmZzZXQoKSBvbiBTVkdzIHNpbmNlIGl0IGdpdmVzIGluY29ycmVjdCByZXN1bHRzIGluIGpRdWVyeSAzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvaXNzdWVzLzIwMjgwXG4gICAgdmFyIGVsT2Zmc2V0ICA9IGlzQm9keSA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiAoaXNTdmcgPyBudWxsIDogJGVsZW1lbnQub2Zmc2V0KCkpXG4gICAgdmFyIHNjcm9sbCAgICA9IHsgc2Nyb2xsOiBpc0JvZHkgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIDogJGVsZW1lbnQuc2Nyb2xsVG9wKCkgfVxuICAgIHZhciBvdXRlckRpbXMgPSBpc0JvZHkgPyB7IHdpZHRoOiAkKHdpbmRvdykud2lkdGgoKSwgaGVpZ2h0OiAkKHdpbmRvdykuaGVpZ2h0KCkgfSA6IG51bGxcblxuICAgIHJldHVybiAkLmV4dGVuZCh7fSwgZWxSZWN0LCBzY3JvbGwsIG91dGVyRGltcywgZWxPZmZzZXQpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRDYWxjdWxhdGVkT2Zmc2V0ID0gZnVuY3Rpb24gKHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KSB7XG4gICAgcmV0dXJuIHBsYWNlbWVudCA9PSAnYm90dG9tJyA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCwgICBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAndG9wJyAgICA/IHsgdG9wOiBwb3MudG9wIC0gYWN0dWFsSGVpZ2h0LCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCAvIDIgLSBhY3R1YWxXaWR0aCAvIDIgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAnbGVmdCcgICA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCAtIGFjdHVhbFdpZHRoIH0gOlxuICAgICAgICAvKiBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAqLyB7IHRvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQgLyAyIC0gYWN0dWFsSGVpZ2h0IC8gMiwgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggfVxuXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEgPSBmdW5jdGlvbiAocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpIHtcbiAgICB2YXIgZGVsdGEgPSB7IHRvcDogMCwgbGVmdDogMCB9XG4gICAgaWYgKCF0aGlzLiR2aWV3cG9ydCkgcmV0dXJuIGRlbHRhXG5cbiAgICB2YXIgdmlld3BvcnRQYWRkaW5nID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmIHRoaXMub3B0aW9ucy52aWV3cG9ydC5wYWRkaW5nIHx8IDBcbiAgICB2YXIgdmlld3BvcnREaW1lbnNpb25zID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLiR2aWV3cG9ydClcblxuICAgIGlmICgvcmlnaHR8bGVmdC8udGVzdChwbGFjZW1lbnQpKSB7XG4gICAgICB2YXIgdG9wRWRnZU9mZnNldCAgICA9IHBvcy50b3AgLSB2aWV3cG9ydFBhZGRpbmcgLSB2aWV3cG9ydERpbWVuc2lvbnMuc2Nyb2xsXG4gICAgICB2YXIgYm90dG9tRWRnZU9mZnNldCA9IHBvcy50b3AgKyB2aWV3cG9ydFBhZGRpbmcgLSB2aWV3cG9ydERpbWVuc2lvbnMuc2Nyb2xsICsgYWN0dWFsSGVpZ2h0XG4gICAgICBpZiAodG9wRWRnZU9mZnNldCA8IHZpZXdwb3J0RGltZW5zaW9ucy50b3ApIHsgLy8gdG9wIG92ZXJmbG93XG4gICAgICAgIGRlbHRhLnRvcCA9IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgLSB0b3BFZGdlT2Zmc2V0XG4gICAgICB9IGVsc2UgaWYgKGJvdHRvbUVkZ2VPZmZzZXQgPiB2aWV3cG9ydERpbWVuc2lvbnMudG9wICsgdmlld3BvcnREaW1lbnNpb25zLmhlaWdodCkgeyAvLyBib3R0b20gb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEudG9wID0gdmlld3BvcnREaW1lbnNpb25zLnRvcCArIHZpZXdwb3J0RGltZW5zaW9ucy5oZWlnaHQgLSBib3R0b21FZGdlT2Zmc2V0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBsZWZ0RWRnZU9mZnNldCAgPSBwb3MubGVmdCAtIHZpZXdwb3J0UGFkZGluZ1xuICAgICAgdmFyIHJpZ2h0RWRnZU9mZnNldCA9IHBvcy5sZWZ0ICsgdmlld3BvcnRQYWRkaW5nICsgYWN0dWFsV2lkdGhcbiAgICAgIGlmIChsZWZ0RWRnZU9mZnNldCA8IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0KSB7IC8vIGxlZnQgb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEubGVmdCA9IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0IC0gbGVmdEVkZ2VPZmZzZXRcbiAgICAgIH0gZWxzZSBpZiAocmlnaHRFZGdlT2Zmc2V0ID4gdmlld3BvcnREaW1lbnNpb25zLnJpZ2h0KSB7IC8vIHJpZ2h0IG92ZXJmbG93XG4gICAgICAgIGRlbHRhLmxlZnQgPSB2aWV3cG9ydERpbWVuc2lvbnMubGVmdCArIHZpZXdwb3J0RGltZW5zaW9ucy53aWR0aCAtIHJpZ2h0RWRnZU9mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWx0YVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0VGl0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRpdGxlXG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciBvICA9IHRoaXMub3B0aW9uc1xuXG4gICAgdGl0bGUgPSAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJylcbiAgICAgIHx8ICh0eXBlb2Ygby50aXRsZSA9PSAnZnVuY3Rpb24nID8gby50aXRsZS5jYWxsKCRlWzBdKSA6ICBvLnRpdGxlKVxuXG4gICAgcmV0dXJuIHRpdGxlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRVSUQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgZG8gcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKVxuICAgIHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKVxuICAgIHJldHVybiBwcmVmaXhcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuJHRpcCkge1xuICAgICAgdGhpcy4kdGlwID0gJCh0aGlzLm9wdGlvbnMudGVtcGxhdGUpXG4gICAgICBpZiAodGhpcy4kdGlwLmxlbmd0aCAhPSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnR5cGUgKyAnIGB0ZW1wbGF0ZWAgb3B0aW9uIG11c3QgY29uc2lzdCBvZiBleGFjdGx5IDEgdG9wLWxldmVsIGVsZW1lbnQhJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuJHRpcFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuYXJyb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZCgnLnRvb2x0aXAtYXJyb3cnKSlcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS50b2dnbGVFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWRcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgaWYgKGUpIHtcbiAgICAgIHNlbGYgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcbiAgICAgIGlmICghc2VsZikge1xuICAgICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgICAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgc2VsZi5pblN0YXRlLmNsaWNrID0gIXNlbGYuaW5TdGF0ZS5jbGlja1xuICAgICAgaWYgKHNlbGYuaXNJblN0YXRlVHJ1ZSgpKSBzZWxmLmVudGVyKHNlbGYpXG4gICAgICBlbHNlIHNlbGYubGVhdmUoc2VsZilcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSA/IHNlbGYubGVhdmUoc2VsZikgOiBzZWxmLmVudGVyKHNlbGYpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxuICAgIHRoaXMuaGlkZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRlbGVtZW50Lm9mZignLicgKyB0aGF0LnR5cGUpLnJlbW92ZURhdGEoJ2JzLicgKyB0aGF0LnR5cGUpXG4gICAgICBpZiAodGhhdC4kdGlwKSB7XG4gICAgICAgIHRoYXQuJHRpcC5kZXRhY2goKVxuICAgICAgfVxuICAgICAgdGhhdC4kdGlwID0gbnVsbFxuICAgICAgdGhhdC4kYXJyb3cgPSBudWxsXG4gICAgICB0aGF0LiR2aWV3cG9ydCA9IG51bGxcbiAgICAgIHRoYXQuJGVsZW1lbnQgPSBudWxsXG4gICAgfSlcbiAgfVxuXG5cbiAgLy8gVE9PTFRJUCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnRvb2x0aXAnKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChvcHRpb24pKSByZXR1cm5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcsIChkYXRhID0gbmV3IFRvb2x0aXAodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRvb2x0aXBcblxuICAkLmZuLnRvb2x0aXAgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yID0gVG9vbHRpcFxuXG5cbiAgLy8gVE9PTFRJUCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi50b29sdGlwLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi50b29sdGlwID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBwb3BvdmVyLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jcG9wb3ZlcnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBQT1BPVkVSIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgUG9wb3ZlciA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbml0KCdwb3BvdmVyJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICghJC5mbi50b29sdGlwKSB0aHJvdyBuZXcgRXJyb3IoJ1BvcG92ZXIgcmVxdWlyZXMgdG9vbHRpcC5qcycpXG5cbiAgUG9wb3Zlci5WRVJTSU9OICA9ICczLjMuNydcblxuICBQb3BvdmVyLkRFRkFVTFRTID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5ERUZBVUxUUywge1xuICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgICB0cmlnZ2VyOiAnY2xpY2snLFxuICAgIGNvbnRlbnQ6ICcnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PjxoMyBjbGFzcz1cInBvcG92ZXItdGl0bGVcIj48L2gzPjxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nXG4gIH0pXG5cblxuICAvLyBOT1RFOiBQT1BPVkVSIEVYVEVORFMgdG9vbHRpcC5qc1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIFBvcG92ZXIucHJvdG90eXBlID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5wcm90b3R5cGUpXG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQb3BvdmVyXG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFBvcG92ZXIuREVGQVVMVFNcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aXAgICAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlICAgPSB0aGlzLmdldFRpdGxlKClcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpXG5cbiAgICAkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJylbdGhpcy5vcHRpb25zLmh0bWwgPyAnaHRtbCcgOiAndGV4dCddKHRpdGxlKVxuICAgICR0aXAuZmluZCgnLnBvcG92ZXItY29udGVudCcpLmNoaWxkcmVuKCkuZGV0YWNoKCkuZW5kKClbIC8vIHdlIHVzZSBhcHBlbmQgZm9yIGh0bWwgb2JqZWN0cyB0byBtYWludGFpbiBqcyBldmVudHNcbiAgICAgIHRoaXMub3B0aW9ucy5odG1sID8gKHR5cGVvZiBjb250ZW50ID09ICdzdHJpbmcnID8gJ2h0bWwnIDogJ2FwcGVuZCcpIDogJ3RleHQnXG4gICAgXShjb250ZW50KVxuXG4gICAgJHRpcC5yZW1vdmVDbGFzcygnZmFkZSB0b3AgYm90dG9tIGxlZnQgcmlnaHQgaW4nKVxuXG4gICAgLy8gSUU4IGRvZXNuJ3QgYWNjZXB0IGhpZGluZyB2aWEgdGhlIGA6ZW1wdHlgIHBzZXVkbyBzZWxlY3Rvciwgd2UgaGF2ZSB0byBkb1xuICAgIC8vIHRoaXMgbWFudWFsbHkgYnkgY2hlY2tpbmcgdGhlIGNvbnRlbnRzLlxuICAgIGlmICghJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpLmh0bWwoKSkgJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpLmhpZGUoKVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuaGFzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpIHx8IHRoaXMuZ2V0Q29udGVudCgpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkZSA9IHRoaXMuJGVsZW1lbnRcbiAgICB2YXIgbyAgPSB0aGlzLm9wdGlvbnNcblxuICAgIHJldHVybiAkZS5hdHRyKCdkYXRhLWNvbnRlbnQnKVxuICAgICAgfHwgKHR5cGVvZiBvLmNvbnRlbnQgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICBvLmNvbnRlbnQuY2FsbCgkZVswXSkgOlxuICAgICAgICAgICAgby5jb250ZW50KVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuYXJyb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLiRhcnJvdyA9IHRoaXMuJGFycm93IHx8IHRoaXMudGlwKCkuZmluZCgnLmFycm93JykpXG4gIH1cblxuXG4gIC8vIFBPUE9WRVIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5wb3BvdmVyJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhICYmIC9kZXN0cm95fGhpZGUvLnRlc3Qob3B0aW9uKSkgcmV0dXJuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnBvcG92ZXInLCAoZGF0YSA9IG5ldyBQb3BvdmVyKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5wb3BvdmVyXG5cbiAgJC5mbi5wb3BvdmVyICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4ucG9wb3Zlci5Db25zdHJ1Y3RvciA9IFBvcG92ZXJcblxuXG4gIC8vIFBPUE9WRVIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4ucG9wb3Zlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4ucG9wb3ZlciA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogc2Nyb2xsc3B5LmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jc2Nyb2xsc3B5XG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gU0NST0xMU1BZIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBTY3JvbGxTcHkoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudCA9ICQoZWxlbWVudCkuaXMoZG9jdW1lbnQuYm9keSkgPyAkKHdpbmRvdykgOiAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgICAgICA9ICQuZXh0ZW5kKHt9LCBTY3JvbGxTcHkuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5zZWxlY3RvciAgICAgICA9ICh0aGlzLm9wdGlvbnMudGFyZ2V0IHx8ICcnKSArICcgLm5hdiBsaSA+IGEnXG4gICAgdGhpcy5vZmZzZXRzICAgICAgICA9IFtdXG4gICAgdGhpcy50YXJnZXRzICAgICAgICA9IFtdXG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbEhlaWdodCAgID0gMFxuXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudC5vbignc2Nyb2xsLmJzLnNjcm9sbHNweScsICQucHJveHkodGhpcy5wcm9jZXNzLCB0aGlzKSlcbiAgICB0aGlzLnJlZnJlc2goKVxuICAgIHRoaXMucHJvY2VzcygpXG4gIH1cblxuICBTY3JvbGxTcHkuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgU2Nyb2xsU3B5LkRFRkFVTFRTID0ge1xuICAgIG9mZnNldDogMTBcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuZ2V0U2Nyb2xsSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRzY3JvbGxFbGVtZW50WzBdLnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heCh0aGlzLiRib2R5WzBdLnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodClcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgICA9IHRoaXNcbiAgICB2YXIgb2Zmc2V0TWV0aG9kICA9ICdvZmZzZXQnXG4gICAgdmFyIG9mZnNldEJhc2UgICAgPSAwXG5cbiAgICB0aGlzLm9mZnNldHMgICAgICA9IFtdXG4gICAgdGhpcy50YXJnZXRzICAgICAgPSBbXVxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuXG4gICAgaWYgKCEkLmlzV2luZG93KHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0pKSB7XG4gICAgICBvZmZzZXRNZXRob2QgPSAncG9zaXRpb24nXG4gICAgICBvZmZzZXRCYXNlICAgPSB0aGlzLiRzY3JvbGxFbGVtZW50LnNjcm9sbFRvcCgpXG4gICAgfVxuXG4gICAgdGhpcy4kYm9keVxuICAgICAgLmZpbmQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsICAgPSAkKHRoaXMpXG4gICAgICAgIHZhciBocmVmICA9ICRlbC5kYXRhKCd0YXJnZXQnKSB8fCAkZWwuYXR0cignaHJlZicpXG4gICAgICAgIHZhciAkaHJlZiA9IC9eIy4vLnRlc3QoaHJlZikgJiYgJChocmVmKVxuXG4gICAgICAgIHJldHVybiAoJGhyZWZcbiAgICAgICAgICAmJiAkaHJlZi5sZW5ndGhcbiAgICAgICAgICAmJiAkaHJlZi5pcygnOnZpc2libGUnKVxuICAgICAgICAgICYmIFtbJGhyZWZbb2Zmc2V0TWV0aG9kXSgpLnRvcCArIG9mZnNldEJhc2UsIGhyZWZdXSkgfHwgbnVsbFxuICAgICAgfSlcbiAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhWzBdIC0gYlswXSB9KVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0Lm9mZnNldHMucHVzaCh0aGlzWzBdKVxuICAgICAgICB0aGF0LnRhcmdldHMucHVzaCh0aGlzWzFdKVxuICAgICAgfSlcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3AoKSArIHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuICAgIHZhciBtYXhTY3JvbGwgICAgPSB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgc2Nyb2xsSGVpZ2h0IC0gdGhpcy4kc2Nyb2xsRWxlbWVudC5oZWlnaHQoKVxuICAgIHZhciBvZmZzZXRzICAgICAgPSB0aGlzLm9mZnNldHNcbiAgICB2YXIgdGFyZ2V0cyAgICAgID0gdGhpcy50YXJnZXRzXG4gICAgdmFyIGFjdGl2ZVRhcmdldCA9IHRoaXMuYWN0aXZlVGFyZ2V0XG4gICAgdmFyIGlcblxuICAgIGlmICh0aGlzLnNjcm9sbEhlaWdodCAhPSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgIHJldHVybiBhY3RpdmVUYXJnZXQgIT0gKGkgPSB0YXJnZXRzW3RhcmdldHMubGVuZ3RoIC0gMV0pICYmIHRoaXMuYWN0aXZhdGUoaSlcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlVGFyZ2V0ICYmIHNjcm9sbFRvcCA8IG9mZnNldHNbMF0pIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFyZ2V0ID0gbnVsbFxuICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKVxuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICBhY3RpdmVUYXJnZXQgIT0gdGFyZ2V0c1tpXVxuICAgICAgICAmJiBzY3JvbGxUb3AgPj0gb2Zmc2V0c1tpXVxuICAgICAgICAmJiAob2Zmc2V0c1tpICsgMV0gPT09IHVuZGVmaW5lZCB8fCBzY3JvbGxUb3AgPCBvZmZzZXRzW2kgKyAxXSlcbiAgICAgICAgJiYgdGhpcy5hY3RpdmF0ZSh0YXJnZXRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgPSB0YXJnZXRcblxuICAgIHRoaXMuY2xlYXIoKVxuXG4gICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciArXG4gICAgICAnW2RhdGEtdGFyZ2V0PVwiJyArIHRhcmdldCArICdcIl0sJyArXG4gICAgICB0aGlzLnNlbGVjdG9yICsgJ1tocmVmPVwiJyArIHRhcmdldCArICdcIl0nXG5cbiAgICB2YXIgYWN0aXZlID0gJChzZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzKCdsaScpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICBpZiAoYWN0aXZlLnBhcmVudCgnLmRyb3Bkb3duLW1lbnUnKS5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZSA9IGFjdGl2ZVxuICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgYWN0aXZlLnRyaWdnZXIoJ2FjdGl2YXRlLmJzLnNjcm9sbHNweScpXG4gIH1cblxuICBTY3JvbGxTcHkucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzVW50aWwodGhpcy5vcHRpb25zLnRhcmdldCwgJy5hY3RpdmUnKVxuICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnNjcm9sbHNweScpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuc2Nyb2xsc3B5JywgKGRhdGEgPSBuZXcgU2Nyb2xsU3B5KHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5zY3JvbGxzcHlcblxuICAkLmZuLnNjcm9sbHNweSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnNjcm9sbHNweS5Db25zdHJ1Y3RvciA9IFNjcm9sbFNweVxuXG5cbiAgLy8gU0NST0xMU1BZIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uc2Nyb2xsc3B5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5zY3JvbGxzcHkgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT09XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkLmJzLnNjcm9sbHNweS5kYXRhLWFwaScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1zcHk9XCJzY3JvbGxcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkc3B5ID0gJCh0aGlzKVxuICAgICAgUGx1Z2luLmNhbGwoJHNweSwgJHNweS5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdGFiLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jdGFic1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFRBQiBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIFRhYiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8ganNjczpkaXNhYmxlIHJlcXVpcmVEb2xsYXJCZWZvcmVqUXVlcnlBc3NpZ25tZW50XG4gICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KVxuICAgIC8vIGpzY3M6ZW5hYmxlIHJlcXVpcmVEb2xsYXJCZWZvcmVqUXVlcnlBc3NpZ25tZW50XG4gIH1cblxuICBUYWIuVkVSU0lPTiA9ICczLjMuNydcblxuICBUYWIuVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIFRhYi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRoaXMgICAgPSB0aGlzLmVsZW1lbnRcbiAgICB2YXIgJHVsICAgICAgPSAkdGhpcy5jbG9zZXN0KCd1bDpub3QoLmRyb3Bkb3duLW1lbnUpJylcbiAgICB2YXIgc2VsZWN0b3IgPSAkdGhpcy5kYXRhKCd0YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICBpZiAoJHRoaXMucGFyZW50KCdsaScpLmhhc0NsYXNzKCdhY3RpdmUnKSkgcmV0dXJuXG5cbiAgICB2YXIgJHByZXZpb3VzID0gJHVsLmZpbmQoJy5hY3RpdmU6bGFzdCBhJylcbiAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudCgnaGlkZS5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkdGhpc1swXVxuICAgIH0pXG4gICAgdmFyIHNob3dFdmVudCA9ICQuRXZlbnQoJ3Nob3cuYnMudGFiJywge1xuICAgICAgcmVsYXRlZFRhcmdldDogJHByZXZpb3VzWzBdXG4gICAgfSlcblxuICAgICRwcmV2aW91cy50cmlnZ2VyKGhpZGVFdmVudClcbiAgICAkdGhpcy50cmlnZ2VyKHNob3dFdmVudClcblxuICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciAkdGFyZ2V0ID0gJChzZWxlY3RvcilcblxuICAgIHRoaXMuYWN0aXZhdGUoJHRoaXMuY2xvc2VzdCgnbGknKSwgJHVsKVxuICAgIHRoaXMuYWN0aXZhdGUoJHRhcmdldCwgJHRhcmdldC5wYXJlbnQoKSwgZnVuY3Rpb24gKCkge1xuICAgICAgJHByZXZpb3VzLnRyaWdnZXIoe1xuICAgICAgICB0eXBlOiAnaGlkZGVuLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgICB9KVxuICAgICAgJHRoaXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdzaG93bi5icy50YWInLFxuICAgICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIFRhYi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuICAgIHZhciAkYWN0aXZlICAgID0gY29udGFpbmVyLmZpbmQoJz4gLmFjdGl2ZScpXG4gICAgdmFyIHRyYW5zaXRpb24gPSBjYWxsYmFja1xuICAgICAgJiYgJC5zdXBwb3J0LnRyYW5zaXRpb25cbiAgICAgICYmICgkYWN0aXZlLmxlbmd0aCAmJiAkYWN0aXZlLmhhc0NsYXNzKCdmYWRlJykgfHwgISFjb250YWluZXIuZmluZCgnPiAuZmFkZScpLmxlbmd0aClcblxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJz4gLmRyb3Bkb3duLW1lbnUgPiAuYWN0aXZlJylcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgICBlbGVtZW50XG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICBlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIHJlZmxvdyBmb3IgdHJhbnNpdGlvblxuICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdpbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdmYWRlJylcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50KCcuZHJvcGRvd24tbWVudScpLmxlbmd0aCkge1xuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgLmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgICRhY3RpdmUubGVuZ3RoICYmIHRyYW5zaXRpb24gP1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBuZXh0KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVGFiLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIG5leHQoKVxuXG4gICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnaW4nKVxuICB9XG5cblxuICAvLyBUQUIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMudGFiJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50YWInLCAoZGF0YSA9IG5ldyBUYWIodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRhYlxuXG4gICQuZm4udGFiICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4udGFiLkNvbnN0cnVjdG9yID0gVGFiXG5cblxuICAvLyBUQUIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJC5mbi50YWIubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRhYiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFRBQiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBQbHVnaW4uY2FsbCgkKHRoaXMpLCAnc2hvdycpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScsIGNsaWNrSGFuZGxlcilcbiAgICAub24oJ2NsaWNrLmJzLnRhYi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJwaWxsXCJdJywgY2xpY2tIYW5kbGVyKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhZmZpeC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FmZml4XG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQUZGSVggQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIEFmZml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQWZmaXguREVGQVVMVFMsIG9wdGlvbnMpXG5cbiAgICB0aGlzLiR0YXJnZXQgPSAkKHRoaXMub3B0aW9ucy50YXJnZXQpXG4gICAgICAub24oJ3Njcm9sbC5icy5hZmZpeC5kYXRhLWFwaScsICQucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uLCB0aGlzKSlcbiAgICAgIC5vbignY2xpY2suYnMuYWZmaXguZGF0YS1hcGknLCAgJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wLCB0aGlzKSlcblxuICAgIHRoaXMuJGVsZW1lbnQgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuYWZmaXhlZCAgICAgID0gbnVsbFxuICAgIHRoaXMudW5waW4gICAgICAgID0gbnVsbFxuICAgIHRoaXMucGlubmVkT2Zmc2V0ID0gbnVsbFxuXG4gICAgdGhpcy5jaGVja1Bvc2l0aW9uKClcbiAgfVxuXG4gIEFmZml4LlZFUlNJT04gID0gJzMuMy43J1xuXG4gIEFmZml4LlJFU0VUICAgID0gJ2FmZml4IGFmZml4LXRvcCBhZmZpeC1ib3R0b20nXG5cbiAgQWZmaXguREVGQVVMVFMgPSB7XG4gICAgb2Zmc2V0OiAwLFxuICAgIHRhcmdldDogd2luZG93XG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbiAoc2Nyb2xsSGVpZ2h0LCBoZWlnaHQsIG9mZnNldFRvcCwgb2Zmc2V0Qm90dG9tKSB7XG4gICAgdmFyIHNjcm9sbFRvcCAgICA9IHRoaXMuJHRhcmdldC5zY3JvbGxUb3AoKVxuICAgIHZhciBwb3NpdGlvbiAgICAgPSB0aGlzLiRlbGVtZW50Lm9mZnNldCgpXG4gICAgdmFyIHRhcmdldEhlaWdodCA9IHRoaXMuJHRhcmdldC5oZWlnaHQoKVxuXG4gICAgaWYgKG9mZnNldFRvcCAhPSBudWxsICYmIHRoaXMuYWZmaXhlZCA9PSAndG9wJykgcmV0dXJuIHNjcm9sbFRvcCA8IG9mZnNldFRvcCA/ICd0b3AnIDogZmFsc2VcblxuICAgIGlmICh0aGlzLmFmZml4ZWQgPT0gJ2JvdHRvbScpIHtcbiAgICAgIGlmIChvZmZzZXRUb3AgIT0gbnVsbCkgcmV0dXJuIChzY3JvbGxUb3AgKyB0aGlzLnVucGluIDw9IHBvc2l0aW9uLnRvcCkgPyBmYWxzZSA6ICdib3R0b20nXG4gICAgICByZXR1cm4gKHNjcm9sbFRvcCArIHRhcmdldEhlaWdodCA8PSBzY3JvbGxIZWlnaHQgLSBvZmZzZXRCb3R0b20pID8gZmFsc2UgOiAnYm90dG9tJ1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsaXppbmcgICA9IHRoaXMuYWZmaXhlZCA9PSBudWxsXG4gICAgdmFyIGNvbGxpZGVyVG9wICAgID0gaW5pdGlhbGl6aW5nID8gc2Nyb2xsVG9wIDogcG9zaXRpb24udG9wXG4gICAgdmFyIGNvbGxpZGVySGVpZ2h0ID0gaW5pdGlhbGl6aW5nID8gdGFyZ2V0SGVpZ2h0IDogaGVpZ2h0XG5cbiAgICBpZiAob2Zmc2V0VG9wICE9IG51bGwgJiYgc2Nyb2xsVG9wIDw9IG9mZnNldFRvcCkgcmV0dXJuICd0b3AnXG4gICAgaWYgKG9mZnNldEJvdHRvbSAhPSBudWxsICYmIChjb2xsaWRlclRvcCArIGNvbGxpZGVySGVpZ2h0ID49IHNjcm9sbEhlaWdodCAtIG9mZnNldEJvdHRvbSkpIHJldHVybiAnYm90dG9tJ1xuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuZ2V0UGlubmVkT2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnBpbm5lZE9mZnNldCkgcmV0dXJuIHRoaXMucGlubmVkT2Zmc2V0XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhBZmZpeC5SRVNFVCkuYWRkQ2xhc3MoJ2FmZml4JylcbiAgICB2YXIgc2Nyb2xsVG9wID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICByZXR1cm4gKHRoaXMucGlubmVkT2Zmc2V0ID0gcG9zaXRpb24udG9wIC0gc2Nyb2xsVG9wKVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wID0gZnVuY3Rpb24gKCkge1xuICAgIHNldFRpbWVvdXQoJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpLCAxKVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmNoZWNrUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLiRlbGVtZW50LmlzKCc6dmlzaWJsZScpKSByZXR1cm5cblxuICAgIHZhciBoZWlnaHQgICAgICAgPSB0aGlzLiRlbGVtZW50LmhlaWdodCgpXG4gICAgdmFyIG9mZnNldCAgICAgICA9IHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB2YXIgb2Zmc2V0VG9wICAgID0gb2Zmc2V0LnRvcFxuICAgIHZhciBvZmZzZXRCb3R0b20gPSBvZmZzZXQuYm90dG9tXG4gICAgdmFyIHNjcm9sbEhlaWdodCA9IE1hdGgubWF4KCQoZG9jdW1lbnQpLmhlaWdodCgpLCAkKGRvY3VtZW50LmJvZHkpLmhlaWdodCgpKVxuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgIT0gJ29iamVjdCcpICAgICAgICAgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0VG9wID0gb2Zmc2V0XG4gICAgaWYgKHR5cGVvZiBvZmZzZXRUb3AgPT0gJ2Z1bmN0aW9uJykgICAgb2Zmc2V0VG9wICAgID0gb2Zmc2V0LnRvcCh0aGlzLiRlbGVtZW50KVxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0Qm90dG9tID09ICdmdW5jdGlvbicpIG9mZnNldEJvdHRvbSA9IG9mZnNldC5ib3R0b20odGhpcy4kZWxlbWVudClcblxuICAgIHZhciBhZmZpeCA9IHRoaXMuZ2V0U3RhdGUoc2Nyb2xsSGVpZ2h0LCBoZWlnaHQsIG9mZnNldFRvcCwgb2Zmc2V0Qm90dG9tKVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCAhPSBhZmZpeCkge1xuICAgICAgaWYgKHRoaXMudW5waW4gIT0gbnVsbCkgdGhpcy4kZWxlbWVudC5jc3MoJ3RvcCcsICcnKVxuXG4gICAgICB2YXIgYWZmaXhUeXBlID0gJ2FmZml4JyArIChhZmZpeCA/ICctJyArIGFmZml4IDogJycpXG4gICAgICB2YXIgZSAgICAgICAgID0gJC5FdmVudChhZmZpeFR5cGUgKyAnLmJzLmFmZml4JylcblxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgdGhpcy5hZmZpeGVkID0gYWZmaXhcbiAgICAgIHRoaXMudW5waW4gPSBhZmZpeCA9PSAnYm90dG9tJyA/IHRoaXMuZ2V0UGlubmVkT2Zmc2V0KCkgOiBudWxsXG5cbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKEFmZml4LlJFU0VUKVxuICAgICAgICAuYWRkQ2xhc3MoYWZmaXhUeXBlKVxuICAgICAgICAudHJpZ2dlcihhZmZpeFR5cGUucmVwbGFjZSgnYWZmaXgnLCAnYWZmaXhlZCcpICsgJy5icy5hZmZpeCcpXG4gICAgfVxuXG4gICAgaWYgKGFmZml4ID09ICdib3R0b20nKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZnNldCh7XG4gICAgICAgIHRvcDogc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0IC0gb2Zmc2V0Qm90dG9tXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gQUZGSVggUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuYWZmaXgnKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmFmZml4JywgKGRhdGEgPSBuZXcgQWZmaXgodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmFmZml4XG5cbiAgJC5mbi5hZmZpeCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmFmZml4LkNvbnN0cnVjdG9yID0gQWZmaXhcblxuXG4gIC8vIEFGRklYIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5hZmZpeC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYWZmaXggPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBRkZJWCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1zcHk9XCJhZmZpeFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRzcHkgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSA9ICRzcHkuZGF0YSgpXG5cbiAgICAgIGRhdGEub2Zmc2V0ID0gZGF0YS5vZmZzZXQgfHwge31cblxuICAgICAgaWYgKGRhdGEub2Zmc2V0Qm90dG9tICE9IG51bGwpIGRhdGEub2Zmc2V0LmJvdHRvbSA9IGRhdGEub2Zmc2V0Qm90dG9tXG4gICAgICBpZiAoZGF0YS5vZmZzZXRUb3AgICAgIT0gbnVsbCkgZGF0YS5vZmZzZXQudG9wICAgID0gZGF0YS5vZmZzZXRUb3BcblxuICAgICAgUGx1Z2luLmNhbGwoJHNweSwgZGF0YSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG4iXX0=
