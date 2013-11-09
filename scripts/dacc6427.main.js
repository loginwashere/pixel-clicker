(function () {
  (function (window, document, undefined) {
    'use strict';
    var lowercase = function (string) {
      return isString(string) ? string.toLowerCase() : string;
    };
    var uppercase = function (string) {
      return isString(string) ? string.toUpperCase() : string;
    };
    var manualLowercase = function (s) {
      return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
        return String.fromCharCode(ch.charCodeAt(0) | 32);
      }) : s;
    };
    var manualUppercase = function (s) {
      return isString(s) ? s.replace(/[a-z]/g, function (ch) {
        return String.fromCharCode(ch.charCodeAt(0) & ~32);
      }) : s;
    };
    if ('i' !== 'I'.toLowerCase()) {
      lowercase = manualLowercase;
      uppercase = manualUppercase;
    }
    var msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]), jqLite, jQuery, slice = [].slice, push = [].push, toString = Object.prototype.toString, angular = window.angular || (window.angular = {}), angularModule, nodeName_, uid = [
        '0',
        '0',
        '0'
      ];
    function isArrayLike(obj) {
      if (!obj || typeof obj.length !== 'number')
        return false;
      if (typeof obj.hasOwnProperty != 'function' && typeof obj.constructor != 'function') {
        return true;
      } else {
        return obj instanceof JQLite || jQuery && obj instanceof jQuery || toString.call(obj) !== '[object Object]' || typeof obj.callee === 'function';
      }
    }
    function forEach(obj, iterator, context) {
      var key;
      if (obj) {
        if (isFunction(obj)) {
          for (key in obj) {
            if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
              iterator.call(context, obj[key], key);
            }
          }
        } else if (obj.forEach && obj.forEach !== forEach) {
          obj.forEach(iterator, context);
        } else if (isArrayLike(obj)) {
          for (key = 0; key < obj.length; key++)
            iterator.call(context, obj[key], key);
        } else {
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              iterator.call(context, obj[key], key);
            }
          }
        }
      }
      return obj;
    }
    function sortedKeys(obj) {
      var keys = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys.sort();
    }
    function forEachSorted(obj, iterator, context) {
      var keys = sortedKeys(obj);
      for (var i = 0; i < keys.length; i++) {
        iterator.call(context, obj[keys[i]], keys[i]);
      }
      return keys;
    }
    function reverseParams(iteratorFn) {
      return function (value, key) {
        iteratorFn(key, value);
      };
    }
    function nextUid() {
      var index = uid.length;
      var digit;
      while (index) {
        index--;
        digit = uid[index].charCodeAt(0);
        if (digit == 57) {
          uid[index] = 'A';
          return uid.join('');
        }
        if (digit == 90) {
          uid[index] = '0';
        } else {
          uid[index] = String.fromCharCode(digit + 1);
          return uid.join('');
        }
      }
      uid.unshift('0');
      return uid.join('');
    }
    function setHashKey(obj, h) {
      if (h) {
        obj.$$hashKey = h;
      } else {
        delete obj.$$hashKey;
      }
    }
    function extend(dst) {
      var h = dst.$$hashKey;
      forEach(arguments, function (obj) {
        if (obj !== dst) {
          forEach(obj, function (value, key) {
            dst[key] = value;
          });
        }
      });
      setHashKey(dst, h);
      return dst;
    }
    function int(str) {
      return parseInt(str, 10);
    }
    function inherit(parent, extra) {
      return extend(new (extend(function () {
      }, { prototype: parent }))(), extra);
    }
    function noop() {
    }
    noop.$inject = [];
    function identity($) {
      return $;
    }
    identity.$inject = [];
    function valueFn(value) {
      return function () {
        return value;
      };
    }
    function isUndefined(value) {
      return typeof value == 'undefined';
    }
    function isDefined(value) {
      return typeof value != 'undefined';
    }
    function isObject(value) {
      return value != null && typeof value == 'object';
    }
    function isString(value) {
      return typeof value == 'string';
    }
    function isNumber(value) {
      return typeof value == 'number';
    }
    function isDate(value) {
      return toString.apply(value) == '[object Date]';
    }
    function isArray(value) {
      return toString.apply(value) == '[object Array]';
    }
    function isFunction(value) {
      return typeof value == 'function';
    }
    function isRegExp(value) {
      return toString.apply(value) == '[object RegExp]';
    }
    function isWindow(obj) {
      return obj && obj.document && obj.location && obj.alert && obj.setInterval;
    }
    function isScope(obj) {
      return obj && obj.$evalAsync && obj.$watch;
    }
    function isFile(obj) {
      return toString.apply(obj) === '[object File]';
    }
    function isBoolean(value) {
      return typeof value == 'boolean';
    }
    var trim = function () {
        if (!String.prototype.trim) {
          return function (value) {
            return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
          };
        }
        return function (value) {
          return isString(value) ? value.trim() : value;
        };
      }();
    function isElement(node) {
      return node && (node.nodeName || node.bind && node.find);
    }
    function makeMap(str) {
      var obj = {}, items = str.split(','), i;
      for (i = 0; i < items.length; i++)
        obj[items[i]] = true;
      return obj;
    }
    if (msie < 9) {
      nodeName_ = function (element) {
        element = element.nodeName ? element : element[0];
        return element.scopeName && element.scopeName != 'HTML' ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
      };
    } else {
      nodeName_ = function (element) {
        return element.nodeName ? element.nodeName : element[0].nodeName;
      };
    }
    function map(obj, iterator, context) {
      var results = [];
      forEach(obj, function (value, index, list) {
        results.push(iterator.call(context, value, index, list));
      });
      return results;
    }
    function size(obj, ownPropsOnly) {
      var size = 0, key;
      if (isArray(obj) || isString(obj)) {
        return obj.length;
      } else if (isObject(obj)) {
        for (key in obj)
          if (!ownPropsOnly || obj.hasOwnProperty(key))
            size++;
      }
      return size;
    }
    function includes(array, obj) {
      return indexOf(array, obj) != -1;
    }
    function indexOf(array, obj) {
      if (array.indexOf)
        return array.indexOf(obj);
      for (var i = 0; i < array.length; i++) {
        if (obj === array[i])
          return i;
      }
      return -1;
    }
    function arrayRemove(array, value) {
      var index = indexOf(array, value);
      if (index >= 0)
        array.splice(index, 1);
      return value;
    }
    function isLeafNode(node) {
      if (node) {
        switch (node.nodeName) {
        case 'OPTION':
        case 'PRE':
        case 'TITLE':
          return true;
        }
      }
      return false;
    }
    function copy(source, destination) {
      if (isWindow(source) || isScope(source))
        throw Error('Can\'t copy Window or Scope');
      if (!destination) {
        destination = source;
        if (source) {
          if (isArray(source)) {
            destination = copy(source, []);
          } else if (isDate(source)) {
            destination = new Date(source.getTime());
          } else if (isRegExp(source)) {
            destination = new RegExp(source.source);
          } else if (isObject(source)) {
            destination = copy(source, {});
          }
        }
      } else {
        if (source === destination)
          throw Error('Can\'t copy equivalent objects or arrays');
        if (isArray(source)) {
          destination.length = 0;
          for (var i = 0; i < source.length; i++) {
            destination.push(copy(source[i]));
          }
        } else {
          var h = destination.$$hashKey;
          forEach(destination, function (value, key) {
            delete destination[key];
          });
          for (var key in source) {
            destination[key] = copy(source[key]);
          }
          setHashKey(destination, h);
        }
      }
      return destination;
    }
    function shallowCopy(src, dst) {
      dst = dst || {};
      for (var key in src) {
        if (src.hasOwnProperty(key) && key.substr(0, 2) !== '$$') {
          dst[key] = src[key];
        }
      }
      return dst;
    }
    function equals(o1, o2) {
      if (o1 === o2)
        return true;
      if (o1 === null || o2 === null)
        return false;
      if (o1 !== o1 && o2 !== o2)
        return true;
      var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
      if (t1 == t2) {
        if (t1 == 'object') {
          if (isArray(o1)) {
            if (!isArray(o2))
              return false;
            if ((length = o1.length) == o2.length) {
              for (key = 0; key < length; key++) {
                if (!equals(o1[key], o2[key]))
                  return false;
              }
              return true;
            }
          } else if (isDate(o1)) {
            return isDate(o2) && o1.getTime() == o2.getTime();
          } else if (isRegExp(o1) && isRegExp(o2)) {
            return o1.toString() == o2.toString();
          } else {
            if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2))
              return false;
            keySet = {};
            for (key in o1) {
              if (key.charAt(0) === '$' || isFunction(o1[key]))
                continue;
              if (!equals(o1[key], o2[key]))
                return false;
              keySet[key] = true;
            }
            for (key in o2) {
              if (!keySet[key] && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key]))
                return false;
            }
            return true;
          }
        }
      }
      return false;
    }
    function concat(array1, array2, index) {
      return array1.concat(slice.call(array2, index));
    }
    function sliceArgs(args, startIndex) {
      return slice.call(args, startIndex || 0);
    }
    function bind(self, fn) {
      var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
      if (isFunction(fn) && !(fn instanceof RegExp)) {
        return curryArgs.length ? function () {
          return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
        } : function () {
          return arguments.length ? fn.apply(self, arguments) : fn.call(self);
        };
      } else {
        return fn;
      }
    }
    function toJsonReplacer(key, value) {
      var val = value;
      if (/^\$+/.test(key)) {
        val = undefined;
      } else if (isWindow(value)) {
        val = '$WINDOW';
      } else if (value && document === value) {
        val = '$DOCUMENT';
      } else if (isScope(value)) {
        val = '$SCOPE';
      }
      return val;
    }
    function toJson(obj, pretty) {
      if (typeof obj === 'undefined')
        return undefined;
      return JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
    }
    function fromJson(json) {
      return isString(json) ? JSON.parse(json) : json;
    }
    function toBoolean(value) {
      if (value && value.length !== 0) {
        var v = lowercase('' + value);
        value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
      } else {
        value = false;
      }
      return value;
    }
    function startingTag(element) {
      element = jqLite(element).clone();
      try {
        element.html('');
      } catch (e) {
      }
      var TEXT_NODE = 3;
      var elemHtml = jqLite('<div>').append(element).html();
      try {
        return element[0].nodeType === TEXT_NODE ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (match, nodeName) {
          return '<' + lowercase(nodeName);
        });
      } catch (e) {
        return lowercase(elemHtml);
      }
    }
    function tryDecodeURIComponent(value) {
      try {
        return decodeURIComponent(value);
      } catch (e) {
      }
    }
    function parseKeyValue(keyValue) {
      var obj = {}, key_value, key;
      forEach((keyValue || '').split('&'), function (keyValue) {
        if (keyValue) {
          key_value = keyValue.split('=');
          key = tryDecodeURIComponent(key_value[0]);
          if (isDefined(key)) {
            obj[key] = isDefined(key_value[1]) ? tryDecodeURIComponent(key_value[1]) : true;
          }
        }
      });
      return obj;
    }
    function toKeyValue(obj) {
      var parts = [];
      forEach(obj, function (value, key) {
        parts.push(encodeUriQuery(key, true) + (value === true ? '' : '=' + encodeUriQuery(value, true)));
      });
      return parts.length ? parts.join('&') : '';
    }
    function encodeUriSegment(val) {
      return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
    }
    function encodeUriQuery(val, pctEncodeSpaces) {
      return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
    }
    function angularInit(element, bootstrap) {
      var elements = [element], appElement, module, names = [
          'ng:app',
          'ng-app',
          'x-ng-app',
          'data-ng-app'
        ], NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
      function append(element) {
        element && elements.push(element);
      }
      forEach(names, function (name) {
        names[name] = true;
        append(document.getElementById(name));
        name = name.replace(':', '\\:');
        if (element.querySelectorAll) {
          forEach(element.querySelectorAll('.' + name), append);
          forEach(element.querySelectorAll('.' + name + '\\:'), append);
          forEach(element.querySelectorAll('[' + name + ']'), append);
        }
      });
      forEach(elements, function (element) {
        if (!appElement) {
          var className = ' ' + element.className + ' ';
          var match = NG_APP_CLASS_REGEXP.exec(className);
          if (match) {
            appElement = element;
            module = (match[2] || '').replace(/\s+/g, ',');
          } else {
            forEach(element.attributes, function (attr) {
              if (!appElement && names[attr.name]) {
                appElement = element;
                module = attr.value;
              }
            });
          }
        }
      });
      if (appElement) {
        bootstrap(appElement, module ? [module] : []);
      }
    }
    function bootstrap(element, modules) {
      var doBootstrap = function () {
        element = jqLite(element);
        modules = modules || [];
        modules.unshift([
          '$provide',
          function ($provide) {
            $provide.value('$rootElement', element);
          }
        ]);
        modules.unshift('ng');
        var injector = createInjector(modules);
        injector.invoke([
          '$rootScope',
          '$rootElement',
          '$compile',
          '$injector',
          function (scope, element, compile, injector) {
            scope.$apply(function () {
              element.data('$injector', injector);
              compile(element)(scope);
            });
          }
        ]);
        return injector;
      };
      var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
      if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
        return doBootstrap();
      }
      window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
      angular.resumeBootstrap = function (extraModules) {
        forEach(extraModules, function (module) {
          modules.push(module);
        });
        doBootstrap();
      };
    }
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    function snake_case(name, separator) {
      separator = separator || '_';
      return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
      });
    }
    function bindJQuery() {
      jQuery = window.jQuery;
      if (jQuery) {
        jqLite = jQuery;
        extend(jQuery.fn, {
          scope: JQLitePrototype.scope,
          controller: JQLitePrototype.controller,
          injector: JQLitePrototype.injector,
          inheritedData: JQLitePrototype.inheritedData
        });
        JQLitePatchJQueryRemove('remove', true, true, false);
        JQLitePatchJQueryRemove('empty', false, false, false);
        JQLitePatchJQueryRemove('html', false, false, true);
      } else {
        jqLite = JQLite;
      }
      angular.element = jqLite;
    }
    function assertArg(arg, name, reason) {
      if (!arg) {
        throw new Error('Argument \'' + (name || '?') + '\' is ' + (reason || 'required'));
      }
      return arg;
    }
    function assertArgFn(arg, name, acceptArrayAnnotation) {
      if (acceptArrayAnnotation && isArray(arg)) {
        arg = arg[arg.length - 1];
      }
      assertArg(isFunction(arg), name, 'not a function, got ' + (arg && typeof arg == 'object' ? arg.constructor.name || 'Object' : typeof arg));
      return arg;
    }
    function getter(obj, path, bindFnToScope) {
      if (!path)
        return obj;
      var keys = path.split('.');
      var key;
      var lastInstance = obj;
      var len = keys.length;
      for (var i = 0; i < len; i++) {
        key = keys[i];
        if (obj) {
          obj = (lastInstance = obj)[key];
        }
      }
      if (!bindFnToScope && isFunction(obj)) {
        return bind(lastInstance, obj);
      }
      return obj;
    }
    function setupModuleLoader(window) {
      function ensure(obj, name, factory) {
        return obj[name] || (obj[name] = factory());
      }
      return ensure(ensure(window, 'angular', Object), 'module', function () {
        var modules = {};
        return function module(name, requires, configFn) {
          if (requires && modules.hasOwnProperty(name)) {
            modules[name] = null;
          }
          return ensure(modules, name, function () {
            if (!requires) {
              throw Error('No module: ' + name);
            }
            var invokeQueue = [];
            var runBlocks = [];
            var config = invokeLater('$injector', 'invoke');
            var moduleInstance = {
                _invokeQueue: invokeQueue,
                _runBlocks: runBlocks,
                requires: requires,
                name: name,
                provider: invokeLater('$provide', 'provider'),
                factory: invokeLater('$provide', 'factory'),
                service: invokeLater('$provide', 'service'),
                value: invokeLater('$provide', 'value'),
                constant: invokeLater('$provide', 'constant', 'unshift'),
                filter: invokeLater('$filterProvider', 'register'),
                controller: invokeLater('$controllerProvider', 'register'),
                directive: invokeLater('$compileProvider', 'directive'),
                config: config,
                run: function (block) {
                  runBlocks.push(block);
                  return this;
                }
              };
            if (configFn) {
              config(configFn);
            }
            return moduleInstance;
            function invokeLater(provider, method, insertMethod) {
              return function () {
                invokeQueue[insertMethod || 'push']([
                  provider,
                  method,
                  arguments
                ]);
                return moduleInstance;
              };
            }
          });
        };
      });
    }
    var version = {
        full: '1.0.8',
        major: 1,
        minor: 0,
        dot: 8,
        codeName: 'bubble-burst'
      };
    function publishExternalAPI(angular) {
      extend(angular, {
        'bootstrap': bootstrap,
        'copy': copy,
        'extend': extend,
        'equals': equals,
        'element': jqLite,
        'forEach': forEach,
        'injector': createInjector,
        'noop': noop,
        'bind': bind,
        'toJson': toJson,
        'fromJson': fromJson,
        'identity': identity,
        'isUndefined': isUndefined,
        'isDefined': isDefined,
        'isString': isString,
        'isFunction': isFunction,
        'isObject': isObject,
        'isNumber': isNumber,
        'isElement': isElement,
        'isArray': isArray,
        'version': version,
        'isDate': isDate,
        'lowercase': lowercase,
        'uppercase': uppercase,
        'callbacks': { counter: 0 }
      });
      angularModule = setupModuleLoader(window);
      try {
        angularModule('ngLocale');
      } catch (e) {
        angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
      }
      angularModule('ng', ['ngLocale'], [
        '$provide',
        function ngModule($provide) {
          $provide.provider('$compile', $CompileProvider).directive({
            a: htmlAnchorDirective,
            input: inputDirective,
            textarea: inputDirective,
            form: formDirective,
            script: scriptDirective,
            select: selectDirective,
            style: styleDirective,
            option: optionDirective,
            ngBind: ngBindDirective,
            ngBindHtmlUnsafe: ngBindHtmlUnsafeDirective,
            ngBindTemplate: ngBindTemplateDirective,
            ngClass: ngClassDirective,
            ngClassEven: ngClassEvenDirective,
            ngClassOdd: ngClassOddDirective,
            ngCsp: ngCspDirective,
            ngCloak: ngCloakDirective,
            ngController: ngControllerDirective,
            ngForm: ngFormDirective,
            ngHide: ngHideDirective,
            ngInclude: ngIncludeDirective,
            ngInit: ngInitDirective,
            ngNonBindable: ngNonBindableDirective,
            ngPluralize: ngPluralizeDirective,
            ngRepeat: ngRepeatDirective,
            ngShow: ngShowDirective,
            ngStyle: ngStyleDirective,
            ngSwitch: ngSwitchDirective,
            ngSwitchWhen: ngSwitchWhenDirective,
            ngSwitchDefault: ngSwitchDefaultDirective,
            ngOptions: ngOptionsDirective,
            ngView: ngViewDirective,
            ngTransclude: ngTranscludeDirective,
            ngModel: ngModelDirective,
            ngList: ngListDirective,
            ngChange: ngChangeDirective,
            required: requiredDirective,
            ngRequired: requiredDirective,
            ngValue: ngValueDirective
          }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
          $provide.provider({
            $anchorScroll: $AnchorScrollProvider,
            $browser: $BrowserProvider,
            $cacheFactory: $CacheFactoryProvider,
            $controller: $ControllerProvider,
            $document: $DocumentProvider,
            $exceptionHandler: $ExceptionHandlerProvider,
            $filter: $FilterProvider,
            $interpolate: $InterpolateProvider,
            $http: $HttpProvider,
            $httpBackend: $HttpBackendProvider,
            $location: $LocationProvider,
            $log: $LogProvider,
            $parse: $ParseProvider,
            $route: $RouteProvider,
            $routeParams: $RouteParamsProvider,
            $rootScope: $RootScopeProvider,
            $q: $QProvider,
            $sniffer: $SnifferProvider,
            $templateCache: $TemplateCacheProvider,
            $timeout: $TimeoutProvider,
            $window: $WindowProvider
          });
        }
      ]);
    }
    var jqCache = JQLite.cache = {}, jqName = JQLite.expando = 'ng-' + new Date().getTime(), jqId = 1, addEventListenerFn = window.document.addEventListener ? function (element, type, fn) {
        element.addEventListener(type, fn, false);
      } : function (element, type, fn) {
        element.attachEvent('on' + type, fn);
      }, removeEventListenerFn = window.document.removeEventListener ? function (element, type, fn) {
        element.removeEventListener(type, fn, false);
      } : function (element, type, fn) {
        element.detachEvent('on' + type, fn);
      };
    function jqNextId() {
      return ++jqId;
    }
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    function camelCase(name) {
      return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    function JQLitePatchJQueryRemove(name, dispatchThis, filterElems, getterIfNoArguments) {
      var originalJqFn = jQuery.fn[name];
      originalJqFn = originalJqFn.$original || originalJqFn;
      removePatch.$original = originalJqFn;
      jQuery.fn[name] = removePatch;
      function removePatch(param) {
        var list = filterElems && param ? [this.filter(param)] : [this], fireEvent = dispatchThis, set, setIndex, setLength, element, childIndex, childLength, children;
        if (!getterIfNoArguments || param != null) {
          while (list.length) {
            set = list.shift();
            for (setIndex = 0, setLength = set.length; setIndex < setLength; setIndex++) {
              element = jqLite(set[setIndex]);
              if (fireEvent) {
                element.triggerHandler('$destroy');
              } else {
                fireEvent = !fireEvent;
              }
              for (childIndex = 0, childLength = (children = element.children()).length; childIndex < childLength; childIndex++) {
                list.push(jQuery(children[childIndex]));
              }
            }
          }
        }
        return originalJqFn.apply(this, arguments);
      }
    }
    function JQLite(element) {
      if (element instanceof JQLite) {
        return element;
      }
      if (!(this instanceof JQLite)) {
        if (isString(element) && element.charAt(0) != '<') {
          throw Error('selectors not implemented');
        }
        return new JQLite(element);
      }
      if (isString(element)) {
        var div = document.createElement('div');
        div.innerHTML = '<div>&#160;</div>' + element;
        div.removeChild(div.firstChild);
        JQLiteAddNodes(this, div.childNodes);
        this.remove();
      } else {
        JQLiteAddNodes(this, element);
      }
    }
    function JQLiteClone(element) {
      return element.cloneNode(true);
    }
    function JQLiteDealoc(element) {
      JQLiteRemoveData(element);
      for (var i = 0, children = element.childNodes || []; i < children.length; i++) {
        JQLiteDealoc(children[i]);
      }
    }
    function JQLiteUnbind(element, type, fn) {
      var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
      if (!handle)
        return;
      if (isUndefined(type)) {
        forEach(events, function (eventHandler, type) {
          removeEventListenerFn(element, type, eventHandler);
          delete events[type];
        });
      } else {
        if (isUndefined(fn)) {
          removeEventListenerFn(element, type, events[type]);
          delete events[type];
        } else {
          arrayRemove(events[type] || [], fn);
        }
      }
    }
    function JQLiteRemoveData(element) {
      var expandoId = element[jqName], expandoStore = jqCache[expandoId];
      if (expandoStore) {
        if (expandoStore.handle) {
          expandoStore.events.$destroy && expandoStore.handle({}, '$destroy');
          JQLiteUnbind(element);
        }
        delete jqCache[expandoId];
        element[jqName] = undefined;
      }
    }
    function JQLiteExpandoStore(element, key, value) {
      var expandoId = element[jqName], expandoStore = jqCache[expandoId || -1];
      if (isDefined(value)) {
        if (!expandoStore) {
          element[jqName] = expandoId = jqNextId();
          expandoStore = jqCache[expandoId] = {};
        }
        expandoStore[key] = value;
      } else {
        return expandoStore && expandoStore[key];
      }
    }
    function JQLiteData(element, key, value) {
      var data = JQLiteExpandoStore(element, 'data'), isSetter = isDefined(value), keyDefined = !isSetter && isDefined(key), isSimpleGetter = keyDefined && !isObject(key);
      if (!data && !isSimpleGetter) {
        JQLiteExpandoStore(element, 'data', data = {});
      }
      if (isSetter) {
        data[key] = value;
      } else {
        if (keyDefined) {
          if (isSimpleGetter) {
            return data && data[key];
          } else {
            extend(data, key);
          }
        } else {
          return data;
        }
      }
    }
    function JQLiteHasClass(element, selector) {
      return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + selector + ' ') > -1;
    }
    function JQLiteRemoveClass(element, cssClasses) {
      if (cssClasses) {
        forEach(cssClasses.split(' '), function (cssClass) {
          element.className = trim((' ' + element.className + ' ').replace(/[\n\t]/g, ' ').replace(' ' + trim(cssClass) + ' ', ' '));
        });
      }
    }
    function JQLiteAddClass(element, cssClasses) {
      if (cssClasses) {
        forEach(cssClasses.split(' '), function (cssClass) {
          if (!JQLiteHasClass(element, cssClass)) {
            element.className = trim(element.className + ' ' + trim(cssClass));
          }
        });
      }
    }
    function JQLiteAddNodes(root, elements) {
      if (elements) {
        elements = !elements.nodeName && isDefined(elements.length) && !isWindow(elements) ? elements : [elements];
        for (var i = 0; i < elements.length; i++) {
          root.push(elements[i]);
        }
      }
    }
    function JQLiteController(element, name) {
      return JQLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
    }
    function JQLiteInheritedData(element, name, value) {
      element = jqLite(element);
      if (element[0].nodeType == 9) {
        element = element.find('html');
      }
      while (element.length) {
        if (value = element.data(name))
          return value;
        element = element.parent();
      }
    }
    var JQLitePrototype = JQLite.prototype = {
        ready: function (fn) {
          var fired = false;
          function trigger() {
            if (fired)
              return;
            fired = true;
            fn();
          }
          this.bind('DOMContentLoaded', trigger);
          JQLite(window).bind('load', trigger);
        },
        toString: function () {
          var value = [];
          forEach(this, function (e) {
            value.push('' + e);
          });
          return '[' + value.join(', ') + ']';
        },
        eq: function (index) {
          return index >= 0 ? jqLite(this[index]) : jqLite(this[this.length + index]);
        },
        length: 0,
        push: push,
        sort: [].sort,
        splice: [].splice
      };
    var BOOLEAN_ATTR = {};
    forEach('multiple,selected,checked,disabled,readOnly,required'.split(','), function (value) {
      BOOLEAN_ATTR[lowercase(value)] = value;
    });
    var BOOLEAN_ELEMENTS = {};
    forEach('input,select,option,textarea,button,form'.split(','), function (value) {
      BOOLEAN_ELEMENTS[uppercase(value)] = true;
    });
    function getBooleanAttrName(element, name) {
      var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
      return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
    }
    forEach({
      data: JQLiteData,
      inheritedData: JQLiteInheritedData,
      scope: function (element) {
        return JQLiteInheritedData(element, '$scope');
      },
      controller: JQLiteController,
      injector: function (element) {
        return JQLiteInheritedData(element, '$injector');
      },
      removeAttr: function (element, name) {
        element.removeAttribute(name);
      },
      hasClass: JQLiteHasClass,
      css: function (element, name, value) {
        name = camelCase(name);
        if (isDefined(value)) {
          element.style[name] = value;
        } else {
          var val;
          if (msie <= 8) {
            val = element.currentStyle && element.currentStyle[name];
            if (val === '')
              val = 'auto';
          }
          val = val || element.style[name];
          if (msie <= 8) {
            val = val === '' ? undefined : val;
          }
          return val;
        }
      },
      attr: function (element, name, value) {
        var lowercasedName = lowercase(name);
        if (BOOLEAN_ATTR[lowercasedName]) {
          if (isDefined(value)) {
            if (!!value) {
              element[name] = true;
              element.setAttribute(name, lowercasedName);
            } else {
              element[name] = false;
              element.removeAttribute(lowercasedName);
            }
          } else {
            return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
          }
        } else if (isDefined(value)) {
          element.setAttribute(name, value);
        } else if (element.getAttribute) {
          var ret = element.getAttribute(name, 2);
          return ret === null ? undefined : ret;
        }
      },
      prop: function (element, name, value) {
        if (isDefined(value)) {
          element[name] = value;
        } else {
          return element[name];
        }
      },
      text: extend(msie < 9 ? function (element, value) {
        if (element.nodeType == 1) {
          if (isUndefined(value))
            return element.innerText;
          element.innerText = value;
        } else {
          if (isUndefined(value))
            return element.nodeValue;
          element.nodeValue = value;
        }
      } : function (element, value) {
        if (isUndefined(value)) {
          return element.textContent;
        }
        element.textContent = value;
      }, { $dv: '' }),
      val: function (element, value) {
        if (isUndefined(value)) {
          if (nodeName_(element) === 'SELECT' && element.multiple) {
            var result = [];
            forEach(element.options, function (option) {
              if (option.selected) {
                result.push(option.value || option.text);
              }
            });
            return result.length === 0 ? null : result;
          }
          return element.value;
        }
        element.value = value;
      },
      html: function (element, value) {
        if (isUndefined(value)) {
          return element.innerHTML;
        }
        for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
          JQLiteDealoc(childNodes[i]);
        }
        element.innerHTML = value;
      }
    }, function (fn, name) {
      JQLite.prototype[name] = function (arg1, arg2) {
        var i, key;
        if ((fn.length == 2 && (fn !== JQLiteHasClass && fn !== JQLiteController) ? arg1 : arg2) === undefined) {
          if (isObject(arg1)) {
            for (i = 0; i < this.length; i++) {
              if (fn === JQLiteData) {
                fn(this[i], arg1);
              } else {
                for (key in arg1) {
                  fn(this[i], key, arg1[key]);
                }
              }
            }
            return this;
          } else {
            if (this.length)
              return fn(this[0], arg1, arg2);
          }
        } else {
          for (i = 0; i < this.length; i++) {
            fn(this[i], arg1, arg2);
          }
          return this;
        }
        return fn.$dv;
      };
    });
    function createEventHandler(element, events) {
      var eventHandler = function (event, type) {
        if (!event.preventDefault) {
          event.preventDefault = function () {
            event.returnValue = false;
          };
        }
        if (!event.stopPropagation) {
          event.stopPropagation = function () {
            event.cancelBubble = true;
          };
        }
        if (!event.target) {
          event.target = event.srcElement || document;
        }
        if (isUndefined(event.defaultPrevented)) {
          var prevent = event.preventDefault;
          event.preventDefault = function () {
            event.defaultPrevented = true;
            prevent.call(event);
          };
          event.defaultPrevented = false;
        }
        event.isDefaultPrevented = function () {
          return event.defaultPrevented;
        };
        forEach(events[type || event.type], function (fn) {
          fn.call(element, event);
        });
        if (msie <= 8) {
          event.preventDefault = null;
          event.stopPropagation = null;
          event.isDefaultPrevented = null;
        } else {
          delete event.preventDefault;
          delete event.stopPropagation;
          delete event.isDefaultPrevented;
        }
      };
      eventHandler.elem = element;
      return eventHandler;
    }
    forEach({
      removeData: JQLiteRemoveData,
      dealoc: JQLiteDealoc,
      bind: function bindFn(element, type, fn) {
        var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
        if (!events)
          JQLiteExpandoStore(element, 'events', events = {});
        if (!handle)
          JQLiteExpandoStore(element, 'handle', handle = createEventHandler(element, events));
        forEach(type.split(' '), function (type) {
          var eventFns = events[type];
          if (!eventFns) {
            if (type == 'mouseenter' || type == 'mouseleave') {
              var contains = document.body.contains || document.body.compareDocumentPosition ? function (a, b) {
                  var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                  return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                } : function (a, b) {
                  if (b) {
                    while (b = b.parentNode) {
                      if (b === a) {
                        return true;
                      }
                    }
                  }
                  return false;
                };
              events[type] = [];
              var eventmap = {
                  mouseleave: 'mouseout',
                  mouseenter: 'mouseover'
                };
              bindFn(element, eventmap[type], function (event) {
                var ret, target = this, related = event.relatedTarget;
                if (!related || related !== target && !contains(target, related)) {
                  handle(event, type);
                }
              });
            } else {
              addEventListenerFn(element, type, handle);
              events[type] = [];
            }
            eventFns = events[type];
          }
          eventFns.push(fn);
        });
      },
      unbind: JQLiteUnbind,
      replaceWith: function (element, replaceNode) {
        var index, parent = element.parentNode;
        JQLiteDealoc(element);
        forEach(new JQLite(replaceNode), function (node) {
          if (index) {
            parent.insertBefore(node, index.nextSibling);
          } else {
            parent.replaceChild(node, element);
          }
          index = node;
        });
      },
      children: function (element) {
        var children = [];
        forEach(element.childNodes, function (element) {
          if (element.nodeType === 1)
            children.push(element);
        });
        return children;
      },
      contents: function (element) {
        return element.childNodes || [];
      },
      append: function (element, node) {
        forEach(new JQLite(node), function (child) {
          if (element.nodeType === 1)
            element.appendChild(child);
        });
      },
      prepend: function (element, node) {
        if (element.nodeType === 1) {
          var index = element.firstChild;
          forEach(new JQLite(node), function (child) {
            element.insertBefore(child, index);
          });
        }
      },
      wrap: function (element, wrapNode) {
        wrapNode = jqLite(wrapNode)[0];
        var parent = element.parentNode;
        if (parent) {
          parent.replaceChild(wrapNode, element);
        }
        wrapNode.appendChild(element);
      },
      remove: function (element) {
        JQLiteDealoc(element);
        var parent = element.parentNode;
        if (parent)
          parent.removeChild(element);
      },
      after: function (element, newElement) {
        var index = element, parent = element.parentNode;
        forEach(new JQLite(newElement), function (node) {
          parent.insertBefore(node, index.nextSibling);
          index = node;
        });
      },
      addClass: JQLiteAddClass,
      removeClass: JQLiteRemoveClass,
      toggleClass: function (element, selector, condition) {
        if (isUndefined(condition)) {
          condition = !JQLiteHasClass(element, selector);
        }
        (condition ? JQLiteAddClass : JQLiteRemoveClass)(element, selector);
      },
      parent: function (element) {
        var parent = element.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      next: function (element) {
        if (element.nextElementSibling) {
          return element.nextElementSibling;
        }
        var elm = element.nextSibling;
        while (elm != null && elm.nodeType !== 1) {
          elm = elm.nextSibling;
        }
        return elm;
      },
      find: function (element, selector) {
        return element.getElementsByTagName(selector);
      },
      clone: JQLiteClone,
      triggerHandler: function (element, eventName) {
        var eventFns = (JQLiteExpandoStore(element, 'events') || {})[eventName];
        forEach(eventFns, function (fn) {
          fn.call(element, null);
        });
      }
    }, function (fn, name) {
      JQLite.prototype[name] = function (arg1, arg2) {
        var value;
        for (var i = 0; i < this.length; i++) {
          if (value == undefined) {
            value = fn(this[i], arg1, arg2);
            if (value !== undefined) {
              value = jqLite(value);
            }
          } else {
            JQLiteAddNodes(value, fn(this[i], arg1, arg2));
          }
        }
        return value == undefined ? this : value;
      };
    });
    function hashKey(obj) {
      var objType = typeof obj, key;
      if (objType == 'object' && obj !== null) {
        if (typeof (key = obj.$$hashKey) == 'function') {
          key = obj.$$hashKey();
        } else if (key === undefined) {
          key = obj.$$hashKey = nextUid();
        }
      } else {
        key = obj;
      }
      return objType + ':' + key;
    }
    function HashMap(array) {
      forEach(array, this.put, this);
    }
    HashMap.prototype = {
      put: function (key, value) {
        this[hashKey(key)] = value;
      },
      get: function (key) {
        return this[hashKey(key)];
      },
      remove: function (key) {
        var value = this[key = hashKey(key)];
        delete this[key];
        return value;
      }
    };
    function HashQueueMap() {
    }
    HashQueueMap.prototype = {
      push: function (key, value) {
        var array = this[key = hashKey(key)];
        if (!array) {
          this[key] = [value];
        } else {
          array.push(value);
        }
      },
      shift: function (key) {
        var array = this[key = hashKey(key)];
        if (array) {
          if (array.length == 1) {
            delete this[key];
            return array[0];
          } else {
            return array.shift();
          }
        }
      },
      peek: function (key) {
        var array = this[hashKey(key)];
        if (array) {
          return array[0];
        }
      }
    };
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    function annotate(fn) {
      var $inject, fnText, argDecl, last;
      if (typeof fn == 'function') {
        if (!($inject = fn.$inject)) {
          $inject = [];
          fnText = fn.toString().replace(STRIP_COMMENTS, '');
          argDecl = fnText.match(FN_ARGS);
          forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
            arg.replace(FN_ARG, function (all, underscore, name) {
              $inject.push(name);
            });
          });
          fn.$inject = $inject;
        }
      } else if (isArray(fn)) {
        last = fn.length - 1;
        assertArgFn(fn[last], 'fn');
        $inject = fn.slice(0, last);
      } else {
        assertArgFn(fn, 'fn', true);
      }
      return $inject;
    }
    function createInjector(modulesToLoad) {
      var INSTANTIATING = {}, providerSuffix = 'Provider', path = [], loadedModules = new HashMap(), providerCache = {
          $provide: {
            provider: supportObject(provider),
            factory: supportObject(factory),
            service: supportObject(service),
            value: supportObject(value),
            constant: supportObject(constant),
            decorator: decorator
          }
        }, providerInjector = createInternalInjector(providerCache, function () {
          throw Error('Unknown provider: ' + path.join(' <- '));
        }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function (servicename) {
          var provider = providerInjector.get(servicename + providerSuffix);
          return instanceInjector.invoke(provider.$get, provider);
        });
      forEach(loadModules(modulesToLoad), function (fn) {
        instanceInjector.invoke(fn || noop);
      });
      return instanceInjector;
      function supportObject(delegate) {
        return function (key, value) {
          if (isObject(key)) {
            forEach(key, reverseParams(delegate));
          } else {
            return delegate(key, value);
          }
        };
      }
      function provider(name, provider_) {
        if (isFunction(provider_) || isArray(provider_)) {
          provider_ = providerInjector.instantiate(provider_);
        }
        if (!provider_.$get) {
          throw Error('Provider ' + name + ' must define $get factory method.');
        }
        return providerCache[name + providerSuffix] = provider_;
      }
      function factory(name, factoryFn) {
        return provider(name, { $get: factoryFn });
      }
      function service(name, constructor) {
        return factory(name, [
          '$injector',
          function ($injector) {
            return $injector.instantiate(constructor);
          }
        ]);
      }
      function value(name, value) {
        return factory(name, valueFn(value));
      }
      function constant(name, value) {
        providerCache[name] = value;
        instanceCache[name] = value;
      }
      function decorator(serviceName, decorFn) {
        var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
        origProvider.$get = function () {
          var origInstance = instanceInjector.invoke(orig$get, origProvider);
          return instanceInjector.invoke(decorFn, null, { $delegate: origInstance });
        };
      }
      function loadModules(modulesToLoad) {
        var runBlocks = [];
        forEach(modulesToLoad, function (module) {
          if (loadedModules.get(module))
            return;
          loadedModules.put(module, true);
          if (isString(module)) {
            var moduleFn = angularModule(module);
            runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
            try {
              for (var invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
                var invokeArgs = invokeQueue[i], provider = invokeArgs[0] == '$injector' ? providerInjector : providerInjector.get(invokeArgs[0]);
                provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
              }
            } catch (e) {
              if (e.message)
                e.message += ' from ' + module;
              throw e;
            }
          } else if (isFunction(module)) {
            try {
              runBlocks.push(providerInjector.invoke(module));
            } catch (e) {
              if (e.message)
                e.message += ' from ' + module;
              throw e;
            }
          } else if (isArray(module)) {
            try {
              runBlocks.push(providerInjector.invoke(module));
            } catch (e) {
              if (e.message)
                e.message += ' from ' + String(module[module.length - 1]);
              throw e;
            }
          } else {
            assertArgFn(module, 'module');
          }
        });
        return runBlocks;
      }
      function createInternalInjector(cache, factory) {
        function getService(serviceName) {
          if (typeof serviceName !== 'string') {
            throw Error('Service name expected');
          }
          if (cache.hasOwnProperty(serviceName)) {
            if (cache[serviceName] === INSTANTIATING) {
              throw Error('Circular dependency: ' + path.join(' <- '));
            }
            return cache[serviceName];
          } else {
            try {
              path.unshift(serviceName);
              cache[serviceName] = INSTANTIATING;
              return cache[serviceName] = factory(serviceName);
            } finally {
              path.shift();
            }
          }
        }
        function invoke(fn, self, locals) {
          var args = [], $inject = annotate(fn), length, i, key;
          for (i = 0, length = $inject.length; i < length; i++) {
            key = $inject[i];
            args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
          }
          if (!fn.$inject) {
            fn = fn[length];
          }
          switch (self ? -1 : args.length) {
          case 0:
            return fn();
          case 1:
            return fn(args[0]);
          case 2:
            return fn(args[0], args[1]);
          case 3:
            return fn(args[0], args[1], args[2]);
          case 4:
            return fn(args[0], args[1], args[2], args[3]);
          case 5:
            return fn(args[0], args[1], args[2], args[3], args[4]);
          case 6:
            return fn(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7:
            return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          case 8:
            return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
          case 9:
            return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
          case 10:
            return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
          default:
            return fn.apply(self, args);
          }
        }
        function instantiate(Type, locals) {
          var Constructor = function () {
            }, instance, returnedValue;
          Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype;
          instance = new Constructor();
          returnedValue = invoke(Type, instance, locals);
          return isObject(returnedValue) ? returnedValue : instance;
        }
        return {
          invoke: invoke,
          instantiate: instantiate,
          get: getService,
          annotate: annotate
        };
      }
    }
    function $AnchorScrollProvider() {
      var autoScrollingEnabled = true;
      this.disableAutoScrolling = function () {
        autoScrollingEnabled = false;
      };
      this.$get = [
        '$window',
        '$location',
        '$rootScope',
        function ($window, $location, $rootScope) {
          var document = $window.document;
          function getFirstAnchor(list) {
            var result = null;
            forEach(list, function (element) {
              if (!result && lowercase(element.nodeName) === 'a')
                result = element;
            });
            return result;
          }
          function scroll() {
            var hash = $location.hash(), elm;
            if (!hash)
              $window.scrollTo(0, 0);
            else if (elm = document.getElementById(hash))
              elm.scrollIntoView();
            else if (elm = getFirstAnchor(document.getElementsByName(hash)))
              elm.scrollIntoView();
            else if (hash === 'top')
              $window.scrollTo(0, 0);
          }
          if (autoScrollingEnabled) {
            $rootScope.$watch(function autoScrollWatch() {
              return $location.hash();
            }, function autoScrollWatchAction() {
              $rootScope.$evalAsync(scroll);
            });
          }
          return scroll;
        }
      ];
    }
    function Browser(window, document, $log, $sniffer) {
      var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
      self.isMock = false;
      var outstandingRequestCount = 0;
      var outstandingRequestCallbacks = [];
      self.$$completeOutstandingRequest = completeOutstandingRequest;
      self.$$incOutstandingRequestCount = function () {
        outstandingRequestCount++;
      };
      function completeOutstandingRequest(fn) {
        try {
          fn.apply(null, sliceArgs(arguments, 1));
        } finally {
          outstandingRequestCount--;
          if (outstandingRequestCount === 0) {
            while (outstandingRequestCallbacks.length) {
              try {
                outstandingRequestCallbacks.pop()();
              } catch (e) {
                $log.error(e);
              }
            }
          }
        }
      }
      self.notifyWhenNoOutstandingRequests = function (callback) {
        forEach(pollFns, function (pollFn) {
          pollFn();
        });
        if (outstandingRequestCount === 0) {
          callback();
        } else {
          outstandingRequestCallbacks.push(callback);
        }
      };
      var pollFns = [], pollTimeout;
      self.addPollFn = function (fn) {
        if (isUndefined(pollTimeout))
          startPoller(100, setTimeout);
        pollFns.push(fn);
        return fn;
      };
      function startPoller(interval, setTimeout) {
        (function check() {
          forEach(pollFns, function (pollFn) {
            pollFn();
          });
          pollTimeout = setTimeout(check, interval);
        }());
      }
      var lastBrowserUrl = location.href, baseElement = document.find('base'), replacedUrl = null;
      self.url = function (url, replace) {
        if (url) {
          if (lastBrowserUrl == url)
            return;
          lastBrowserUrl = url;
          if ($sniffer.history) {
            if (replace)
              history.replaceState(null, '', url);
            else {
              history.pushState(null, '', url);
              baseElement.attr('href', baseElement.attr('href'));
            }
          } else {
            if (replace) {
              location.replace(url);
              replacedUrl = url;
            } else {
              location.href = url;
              replacedUrl = null;
            }
          }
          return self;
        } else {
          return replacedUrl || location.href.replace(/%27/g, '\'');
        }
      };
      var urlChangeListeners = [], urlChangeInit = false;
      function fireUrlChange() {
        if (lastBrowserUrl == self.url())
          return;
        lastBrowserUrl = self.url();
        forEach(urlChangeListeners, function (listener) {
          listener(self.url());
        });
      }
      self.onUrlChange = function (callback) {
        if (!urlChangeInit) {
          if ($sniffer.history)
            jqLite(window).bind('popstate', fireUrlChange);
          if ($sniffer.hashchange)
            jqLite(window).bind('hashchange', fireUrlChange);
          else
            self.addPollFn(fireUrlChange);
          urlChangeInit = true;
        }
        urlChangeListeners.push(callback);
        return callback;
      };
      self.baseHref = function () {
        var href = baseElement.attr('href');
        return href ? href.replace(/^https?\:\/\/[^\/]*/, '') : '';
      };
      var lastCookies = {};
      var lastCookieString = '';
      var cookiePath = self.baseHref();
      self.cookies = function (name, value) {
        var cookieLength, cookieArray, cookie, i, index;
        if (name) {
          if (value === undefined) {
            rawDocument.cookie = escape(name) + '=;path=' + cookiePath + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
          } else {
            if (isString(value)) {
              cookieLength = (rawDocument.cookie = escape(name) + '=' + escape(value) + ';path=' + cookiePath).length + 1;
              if (cookieLength > 4096) {
                $log.warn('Cookie \'' + name + '\' possibly not set or overflowed because it was too large (' + cookieLength + ' > 4096 bytes)!');
              }
            }
          }
        } else {
          if (rawDocument.cookie !== lastCookieString) {
            lastCookieString = rawDocument.cookie;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
              cookie = cookieArray[i];
              index = cookie.indexOf('=');
              if (index > 0) {
                var name = unescape(cookie.substring(0, index));
                if (lastCookies[name] === undefined) {
                  lastCookies[name] = unescape(cookie.substring(index + 1));
                }
              }
            }
          }
          return lastCookies;
        }
      };
      self.defer = function (fn, delay) {
        var timeoutId;
        outstandingRequestCount++;
        timeoutId = setTimeout(function () {
          delete pendingDeferIds[timeoutId];
          completeOutstandingRequest(fn);
        }, delay || 0);
        pendingDeferIds[timeoutId] = true;
        return timeoutId;
      };
      self.defer.cancel = function (deferId) {
        if (pendingDeferIds[deferId]) {
          delete pendingDeferIds[deferId];
          clearTimeout(deferId);
          completeOutstandingRequest(noop);
          return true;
        }
        return false;
      };
    }
    function $BrowserProvider() {
      this.$get = [
        '$window',
        '$log',
        '$sniffer',
        '$document',
        function ($window, $log, $sniffer, $document) {
          return new Browser($window, $document, $log, $sniffer);
        }
      ];
    }
    function $CacheFactoryProvider() {
      this.$get = function () {
        var caches = {};
        function cacheFactory(cacheId, options) {
          if (cacheId in caches) {
            throw Error('cacheId ' + cacheId + ' taken');
          }
          var size = 0, stats = extend({}, options, { id: cacheId }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
          return caches[cacheId] = {
            put: function (key, value) {
              var lruEntry = lruHash[key] || (lruHash[key] = { key: key });
              refresh(lruEntry);
              if (isUndefined(value))
                return;
              if (!(key in data))
                size++;
              data[key] = value;
              if (size > capacity) {
                this.remove(staleEnd.key);
              }
            },
            get: function (key) {
              var lruEntry = lruHash[key];
              if (!lruEntry)
                return;
              refresh(lruEntry);
              return data[key];
            },
            remove: function (key) {
              var lruEntry = lruHash[key];
              if (!lruEntry)
                return;
              if (lruEntry == freshEnd)
                freshEnd = lruEntry.p;
              if (lruEntry == staleEnd)
                staleEnd = lruEntry.n;
              link(lruEntry.n, lruEntry.p);
              delete lruHash[key];
              delete data[key];
              size--;
            },
            removeAll: function () {
              data = {};
              size = 0;
              lruHash = {};
              freshEnd = staleEnd = null;
            },
            destroy: function () {
              data = null;
              stats = null;
              lruHash = null;
              delete caches[cacheId];
            },
            info: function () {
              return extend({}, stats, { size: size });
            }
          };
          function refresh(entry) {
            if (entry != freshEnd) {
              if (!staleEnd) {
                staleEnd = entry;
              } else if (staleEnd == entry) {
                staleEnd = entry.n;
              }
              link(entry.n, entry.p);
              link(entry, freshEnd);
              freshEnd = entry;
              freshEnd.n = null;
            }
          }
          function link(nextEntry, prevEntry) {
            if (nextEntry != prevEntry) {
              if (nextEntry)
                nextEntry.p = prevEntry;
              if (prevEntry)
                prevEntry.n = nextEntry;
            }
          }
        }
        cacheFactory.info = function () {
          var info = {};
          forEach(caches, function (cache, cacheId) {
            info[cacheId] = cache.info();
          });
          return info;
        };
        cacheFactory.get = function (cacheId) {
          return caches[cacheId];
        };
        return cacheFactory;
      };
    }
    function $TemplateCacheProvider() {
      this.$get = [
        '$cacheFactory',
        function ($cacheFactory) {
          return $cacheFactory('templates');
        }
      ];
    }
    var NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';
    $CompileProvider.$inject = ['$provide'];
    function $CompileProvider($provide) {
      var hasDirectives = {}, Suffix = 'Directive', COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, MULTI_ROOT_TEMPLATE_ERROR = 'Template must have exactly one root element. was: ', urlSanitizationWhitelist = /^\s*(https?|ftp|mailto|file):/;
      this.directive = function registerDirective(name, directiveFactory) {
        if (isString(name)) {
          assertArg(directiveFactory, 'directive');
          if (!hasDirectives.hasOwnProperty(name)) {
            hasDirectives[name] = [];
            $provide.factory(name + Suffix, [
              '$injector',
              '$exceptionHandler',
              function ($injector, $exceptionHandler) {
                var directives = [];
                forEach(hasDirectives[name], function (directiveFactory) {
                  try {
                    var directive = $injector.invoke(directiveFactory);
                    if (isFunction(directive)) {
                      directive = { compile: valueFn(directive) };
                    } else if (!directive.compile && directive.link) {
                      directive.compile = valueFn(directive.link);
                    }
                    directive.priority = directive.priority || 0;
                    directive.name = directive.name || name;
                    directive.require = directive.require || directive.controller && directive.name;
                    directive.restrict = directive.restrict || 'A';
                    directives.push(directive);
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                });
                return directives;
              }
            ]);
          }
          hasDirectives[name].push(directiveFactory);
        } else {
          forEach(name, reverseParams(registerDirective));
        }
        return this;
      };
      this.urlSanitizationWhitelist = function (regexp) {
        if (isDefined(regexp)) {
          urlSanitizationWhitelist = regexp;
          return this;
        }
        return urlSanitizationWhitelist;
      };
      this.$get = [
        '$injector',
        '$interpolate',
        '$exceptionHandler',
        '$http',
        '$templateCache',
        '$parse',
        '$controller',
        '$rootScope',
        '$document',
        function ($injector, $interpolate, $exceptionHandler, $http, $templateCache, $parse, $controller, $rootScope, $document) {
          var Attributes = function (element, attr) {
            this.$$element = element;
            this.$attr = attr || {};
          };
          Attributes.prototype = {
            $normalize: directiveNormalize,
            $set: function (key, value, writeAttr, attrName) {
              var booleanKey = getBooleanAttrName(this.$$element[0], key), $$observers = this.$$observers, normalizedVal;
              if (booleanKey) {
                this.$$element.prop(key, value);
                attrName = booleanKey;
              }
              this[key] = value;
              if (attrName) {
                this.$attr[key] = attrName;
              } else {
                attrName = this.$attr[key];
                if (!attrName) {
                  this.$attr[key] = attrName = snake_case(key, '-');
                }
              }
              if (nodeName_(this.$$element[0]) === 'A' && key === 'href') {
                urlSanitizationNode.setAttribute('href', value);
                normalizedVal = urlSanitizationNode.href;
                if (normalizedVal !== '' && !normalizedVal.match(urlSanitizationWhitelist)) {
                  this[key] = value = 'unsafe:' + normalizedVal;
                }
              }
              if (writeAttr !== false) {
                if (value === null || value === undefined) {
                  this.$$element.removeAttr(attrName);
                } else {
                  this.$$element.attr(attrName, value);
                }
              }
              $$observers && forEach($$observers[key], function (fn) {
                try {
                  fn(value);
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
            },
            $observe: function (key, fn) {
              var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = {}), listeners = $$observers[key] || ($$observers[key] = []);
              listeners.push(fn);
              $rootScope.$evalAsync(function () {
                if (!listeners.$$inter) {
                  fn(attrs[key]);
                }
              });
              return fn;
            }
          };
          var urlSanitizationNode = $document[0].createElement('a'), startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = startSymbol == '{{' || endSymbol == '}}' ? identity : function denormalizeTemplate(template) {
              return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
            };
          return compile;
          function compile($compileNodes, transcludeFn, maxPriority) {
            if (!($compileNodes instanceof jqLite)) {
              $compileNodes = jqLite($compileNodes);
            }
            forEach($compileNodes, function (node, index) {
              if (node.nodeType == 3 && node.nodeValue.match(/\S+/)) {
                $compileNodes[index] = jqLite(node).wrap('<span></span>').parent()[0];
              }
            });
            var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority);
            return function publicLinkFn(scope, cloneConnectFn) {
              assertArg(scope, 'scope');
              var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes;
              for (var i = 0, ii = $linkNode.length; i < ii; i++) {
                var node = $linkNode[i];
                if (node.nodeType == 1 || node.nodeType == 9) {
                  $linkNode.eq(i).data('$scope', scope);
                }
              }
              safeAddClass($linkNode, 'ng-scope');
              if (cloneConnectFn)
                cloneConnectFn($linkNode, scope);
              if (compositeLinkFn)
                compositeLinkFn(scope, $linkNode, $linkNode);
              return $linkNode;
            };
          }
          function wrongMode(localName, mode) {
            throw Error('Unsupported \'' + mode + '\' for \'' + localName + '\'.');
          }
          function safeAddClass($element, className) {
            try {
              $element.addClass(className);
            } catch (e) {
            }
          }
          function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority) {
            var linkFns = [], nodeLinkFn, childLinkFn, directives, attrs, linkFnFound;
            for (var i = 0; i < nodeList.length; i++) {
              attrs = new Attributes();
              directives = collectDirectives(nodeList[i], [], attrs, maxPriority);
              nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement) : null;
              childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !nodeList[i].childNodes || !nodeList[i].childNodes.length ? null : compileNodes(nodeList[i].childNodes, nodeLinkFn ? nodeLinkFn.transclude : transcludeFn);
              linkFns.push(nodeLinkFn);
              linkFns.push(childLinkFn);
              linkFnFound = linkFnFound || nodeLinkFn || childLinkFn;
            }
            return linkFnFound ? compositeLinkFn : null;
            function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
              var nodeLinkFn, childLinkFn, node, childScope, childTranscludeFn, i, ii, n;
              var stableNodeList = [];
              for (i = 0, ii = nodeList.length; i < ii; i++) {
                stableNodeList.push(nodeList[i]);
              }
              for (i = 0, n = 0, ii = linkFns.length; i < ii; n++) {
                node = stableNodeList[n];
                nodeLinkFn = linkFns[i++];
                childLinkFn = linkFns[i++];
                if (nodeLinkFn) {
                  if (nodeLinkFn.scope) {
                    childScope = scope.$new(isObject(nodeLinkFn.scope));
                    jqLite(node).data('$scope', childScope);
                  } else {
                    childScope = scope;
                  }
                  childTranscludeFn = nodeLinkFn.transclude;
                  if (childTranscludeFn || !boundTranscludeFn && transcludeFn) {
                    nodeLinkFn(childLinkFn, childScope, node, $rootElement, function (transcludeFn) {
                      return function (cloneFn) {
                        var transcludeScope = scope.$new();
                        transcludeScope.$$transcluded = true;
                        return transcludeFn(transcludeScope, cloneFn).bind('$destroy', bind(transcludeScope, transcludeScope.$destroy));
                      };
                    }(childTranscludeFn || transcludeFn));
                  } else {
                    nodeLinkFn(childLinkFn, childScope, node, undefined, boundTranscludeFn);
                  }
                } else if (childLinkFn) {
                  childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn);
                }
              }
            }
          }
          function collectDirectives(node, directives, attrs, maxPriority) {
            var nodeType = node.nodeType, attrsMap = attrs.$attr, match, className;
            switch (nodeType) {
            case 1:
              addDirective(directives, directiveNormalize(nodeName_(node).toLowerCase()), 'E', maxPriority);
              for (var attr, name, nName, value, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
                attr = nAttrs[j];
                if (!msie || msie >= 8 || attr.specified) {
                  name = attr.name;
                  nName = directiveNormalize(name.toLowerCase());
                  attrsMap[nName] = name;
                  attrs[nName] = value = trim(msie && name == 'href' ? decodeURIComponent(node.getAttribute(name, 2)) : attr.value);
                  if (getBooleanAttrName(node, nName)) {
                    attrs[nName] = true;
                  }
                  addAttrInterpolateDirective(node, directives, value, nName);
                  addDirective(directives, nName, 'A', maxPriority);
                }
              }
              className = node.className;
              if (isString(className) && className !== '') {
                while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                  nName = directiveNormalize(match[2]);
                  if (addDirective(directives, nName, 'C', maxPriority)) {
                    attrs[nName] = trim(match[3]);
                  }
                  className = className.substr(match.index + match[0].length);
                }
              }
              break;
            case 3:
              addTextInterpolateDirective(directives, node.nodeValue);
              break;
            case 8:
              try {
                match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
                if (match) {
                  nName = directiveNormalize(match[1]);
                  if (addDirective(directives, nName, 'M', maxPriority)) {
                    attrs[nName] = trim(match[2]);
                  }
                }
              } catch (e) {
              }
              break;
            }
            directives.sort(byPriority);
            return directives;
          }
          function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection) {
            var terminalPriority = -Number.MAX_VALUE, preLinkFns = [], postLinkFns = [], newScopeDirective = null, newIsolateScopeDirective = null, templateDirective = null, $compileNode = templateAttrs.$$element = jqLite(compileNode), directive, directiveName, $template, transcludeDirective, childTranscludeFn = transcludeFn, controllerDirectives, linkFn, directiveValue;
            for (var i = 0, ii = directives.length; i < ii; i++) {
              directive = directives[i];
              $template = undefined;
              if (terminalPriority > directive.priority) {
                break;
              }
              if (directiveValue = directive.scope) {
                assertNoDuplicate('isolated scope', newIsolateScopeDirective, directive, $compileNode);
                if (isObject(directiveValue)) {
                  safeAddClass($compileNode, 'ng-isolate-scope');
                  newIsolateScopeDirective = directive;
                }
                safeAddClass($compileNode, 'ng-scope');
                newScopeDirective = newScopeDirective || directive;
              }
              directiveName = directive.name;
              if (directiveValue = directive.controller) {
                controllerDirectives = controllerDirectives || {};
                assertNoDuplicate('\'' + directiveName + '\' controller', controllerDirectives[directiveName], directive, $compileNode);
                controllerDirectives[directiveName] = directive;
              }
              if (directiveValue = directive.transclude) {
                assertNoDuplicate('transclusion', transcludeDirective, directive, $compileNode);
                transcludeDirective = directive;
                terminalPriority = directive.priority;
                if (directiveValue == 'element') {
                  $template = jqLite(compileNode);
                  $compileNode = templateAttrs.$$element = jqLite(document.createComment(' ' + directiveName + ': ' + templateAttrs[directiveName] + ' '));
                  compileNode = $compileNode[0];
                  replaceWith(jqCollection, jqLite($template[0]), compileNode);
                  childTranscludeFn = compile($template, transcludeFn, terminalPriority);
                } else {
                  $template = jqLite(JQLiteClone(compileNode)).contents();
                  $compileNode.html('');
                  childTranscludeFn = compile($template, transcludeFn);
                }
              }
              if (directiveValue = directive.template) {
                assertNoDuplicate('template', templateDirective, directive, $compileNode);
                templateDirective = directive;
                directiveValue = denormalizeTemplate(directiveValue);
                if (directive.replace) {
                  $template = jqLite('<div>' + trim(directiveValue) + '</div>').contents();
                  compileNode = $template[0];
                  if ($template.length != 1 || compileNode.nodeType !== 1) {
                    throw new Error(MULTI_ROOT_TEMPLATE_ERROR + directiveValue);
                  }
                  replaceWith(jqCollection, $compileNode, compileNode);
                  var newTemplateAttrs = { $attr: {} };
                  directives = directives.concat(collectDirectives(compileNode, directives.splice(i + 1, directives.length - (i + 1)), newTemplateAttrs));
                  mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                  ii = directives.length;
                } else {
                  $compileNode.html(directiveValue);
                }
              }
              if (directive.templateUrl) {
                assertNoDuplicate('template', templateDirective, directive, $compileNode);
                templateDirective = directive;
                nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), nodeLinkFn, $compileNode, templateAttrs, jqCollection, directive.replace, childTranscludeFn);
                ii = directives.length;
              } else if (directive.compile) {
                try {
                  linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                  if (isFunction(linkFn)) {
                    addLinkFns(null, linkFn);
                  } else if (linkFn) {
                    addLinkFns(linkFn.pre, linkFn.post);
                  }
                } catch (e) {
                  $exceptionHandler(e, startingTag($compileNode));
                }
              }
              if (directive.terminal) {
                nodeLinkFn.terminal = true;
                terminalPriority = Math.max(terminalPriority, directive.priority);
              }
            }
            nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope;
            nodeLinkFn.transclude = transcludeDirective && childTranscludeFn;
            return nodeLinkFn;
            function addLinkFns(pre, post) {
              if (pre) {
                pre.require = directive.require;
                preLinkFns.push(pre);
              }
              if (post) {
                post.require = directive.require;
                postLinkFns.push(post);
              }
            }
            function getControllers(require, $element) {
              var value, retrievalMethod = 'data', optional = false;
              if (isString(require)) {
                while ((value = require.charAt(0)) == '^' || value == '?') {
                  require = require.substr(1);
                  if (value == '^') {
                    retrievalMethod = 'inheritedData';
                  }
                  optional = optional || value == '?';
                }
                value = $element[retrievalMethod]('$' + require + 'Controller');
                if (!value && !optional) {
                  throw Error('No controller: ' + require);
                }
                return value;
              } else if (isArray(require)) {
                value = [];
                forEach(require, function (require) {
                  value.push(getControllers(require, $element));
                });
              }
              return value;
            }
            function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
              var attrs, $element, i, ii, linkFn, controller;
              if (compileNode === linkNode) {
                attrs = templateAttrs;
              } else {
                attrs = shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr));
              }
              $element = attrs.$$element;
              if (newIsolateScopeDirective) {
                var LOCAL_REGEXP = /^\s*([@=&])\s*(\w*)\s*$/;
                var parentScope = scope.$parent || scope;
                forEach(newIsolateScopeDirective.scope, function (definiton, scopeName) {
                  var match = definiton.match(LOCAL_REGEXP) || [], attrName = match[2] || scopeName, mode = match[1], lastValue, parentGet, parentSet;
                  scope.$$isolateBindings[scopeName] = mode + attrName;
                  switch (mode) {
                  case '@': {
                      attrs.$observe(attrName, function (value) {
                        scope[scopeName] = value;
                      });
                      attrs.$$observers[attrName].$$scope = parentScope;
                      break;
                    }
                  case '=': {
                      parentGet = $parse(attrs[attrName]);
                      parentSet = parentGet.assign || function () {
                        lastValue = scope[scopeName] = parentGet(parentScope);
                        throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + attrs[attrName] + ' (directive: ' + newIsolateScopeDirective.name + ')');
                      };
                      lastValue = scope[scopeName] = parentGet(parentScope);
                      scope.$watch(function parentValueWatch() {
                        var parentValue = parentGet(parentScope);
                        if (parentValue !== scope[scopeName]) {
                          if (parentValue !== lastValue) {
                            lastValue = scope[scopeName] = parentValue;
                          } else {
                            parentSet(parentScope, parentValue = lastValue = scope[scopeName]);
                          }
                        }
                        return parentValue;
                      });
                      break;
                    }
                  case '&': {
                      parentGet = $parse(attrs[attrName]);
                      scope[scopeName] = function (locals) {
                        return parentGet(parentScope, locals);
                      };
                      break;
                    }
                  default: {
                      throw Error('Invalid isolate scope definition for directive ' + newIsolateScopeDirective.name + ': ' + definiton);
                    }
                  }
                });
              }
              if (controllerDirectives) {
                forEach(controllerDirectives, function (directive) {
                  var locals = {
                      $scope: scope,
                      $element: $element,
                      $attrs: attrs,
                      $transclude: boundTranscludeFn
                    };
                  controller = directive.controller;
                  if (controller == '@') {
                    controller = attrs[directive.name];
                  }
                  $element.data('$' + directive.name + 'Controller', $controller(controller, locals));
                });
              }
              for (i = 0, ii = preLinkFns.length; i < ii; i++) {
                try {
                  linkFn = preLinkFns[i];
                  linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
                } catch (e) {
                  $exceptionHandler(e, startingTag($element));
                }
              }
              childLinkFn && childLinkFn(scope, linkNode.childNodes, undefined, boundTranscludeFn);
              for (i = 0, ii = postLinkFns.length; i < ii; i++) {
                try {
                  linkFn = postLinkFns[i];
                  linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
                } catch (e) {
                  $exceptionHandler(e, startingTag($element));
                }
              }
            }
          }
          function addDirective(tDirectives, name, location, maxPriority) {
            var match = false;
            if (hasDirectives.hasOwnProperty(name)) {
              for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
                try {
                  directive = directives[i];
                  if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                    tDirectives.push(directive);
                    match = true;
                  }
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
            }
            return match;
          }
          function mergeTemplateAttributes(dst, src) {
            var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
            forEach(dst, function (value, key) {
              if (key.charAt(0) != '$') {
                if (src[key]) {
                  value += (key === 'style' ? ';' : ' ') + src[key];
                }
                dst.$set(key, value, true, srcAttr[key]);
              }
            });
            forEach(src, function (value, key) {
              if (key == 'class') {
                safeAddClass($element, value);
                dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value;
              } else if (key == 'style') {
                $element.attr('style', $element.attr('style') + ';' + value);
              } else if (key.charAt(0) != '$' && !dst.hasOwnProperty(key)) {
                dst[key] = value;
                dstAttr[key] = srcAttr[key];
              }
            });
          }
          function compileTemplateUrl(directives, beforeTemplateNodeLinkFn, $compileNode, tAttrs, $rootElement, replace, childTranscludeFn) {
            var linkQueue = [], afterTemplateNodeLinkFn, afterTemplateChildLinkFn, beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
                controller: null,
                templateUrl: null,
                transclude: null,
                scope: null
              });
            $compileNode.html('');
            $http.get(origAsyncDirective.templateUrl, { cache: $templateCache }).success(function (content) {
              var compileNode, tempTemplateAttrs, $template;
              content = denormalizeTemplate(content);
              if (replace) {
                $template = jqLite('<div>' + trim(content) + '</div>').contents();
                compileNode = $template[0];
                if ($template.length != 1 || compileNode.nodeType !== 1) {
                  throw new Error(MULTI_ROOT_TEMPLATE_ERROR + content);
                }
                tempTemplateAttrs = { $attr: {} };
                replaceWith($rootElement, $compileNode, compileNode);
                collectDirectives(compileNode, directives, tempTemplateAttrs);
                mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
              } else {
                compileNode = beforeTemplateCompileNode;
                $compileNode.html(content);
              }
              directives.unshift(derivedSyncDirective);
              afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn);
              afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);
              while (linkQueue.length) {
                var controller = linkQueue.pop(), linkRootElement = linkQueue.pop(), beforeTemplateLinkNode = linkQueue.pop(), scope = linkQueue.pop(), linkNode = compileNode;
                if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                  linkNode = JQLiteClone(compileNode);
                  replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
                }
                afterTemplateNodeLinkFn(function () {
                  beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, controller);
                }, scope, linkNode, $rootElement, controller);
              }
              linkQueue = null;
            }).error(function (response, code, headers, config) {
              throw Error('Failed to load template: ' + config.url);
            });
            return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, controller) {
              if (linkQueue) {
                linkQueue.push(scope);
                linkQueue.push(node);
                linkQueue.push(rootElement);
                linkQueue.push(controller);
              } else {
                afterTemplateNodeLinkFn(function () {
                  beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, controller);
                }, scope, node, rootElement, controller);
              }
            };
          }
          function byPriority(a, b) {
            return b.priority - a.priority;
          }
          function assertNoDuplicate(what, previousDirective, directive, element) {
            if (previousDirective) {
              throw Error('Multiple directives [' + previousDirective.name + ', ' + directive.name + '] asking for ' + what + ' on: ' + startingTag(element));
            }
          }
          function addTextInterpolateDirective(directives, text) {
            var interpolateFn = $interpolate(text, true);
            if (interpolateFn) {
              directives.push({
                priority: 0,
                compile: valueFn(function textInterpolateLinkFn(scope, node) {
                  var parent = node.parent(), bindings = parent.data('$binding') || [];
                  bindings.push(interpolateFn);
                  safeAddClass(parent.data('$binding', bindings), 'ng-binding');
                  scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                    node[0].nodeValue = value;
                  });
                })
              });
            }
          }
          function addAttrInterpolateDirective(node, directives, value, name) {
            var interpolateFn = $interpolate(value, true);
            if (!interpolateFn)
              return;
            directives.push({
              priority: 100,
              compile: valueFn(function attrInterpolateLinkFn(scope, element, attr) {
                var $$observers = attr.$$observers || (attr.$$observers = {});
                if (name === 'class') {
                  interpolateFn = $interpolate(attr[name], true);
                }
                attr[name] = undefined;
                ($$observers[name] || ($$observers[name] = [])).$$inter = true;
                (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(value) {
                  attr.$set(name, value);
                });
              })
            });
          }
          function replaceWith($rootElement, $element, newNode) {
            var oldNode = $element[0], parent = oldNode.parentNode, i, ii;
            if ($rootElement) {
              for (i = 0, ii = $rootElement.length; i < ii; i++) {
                if ($rootElement[i] == oldNode) {
                  $rootElement[i] = newNode;
                  break;
                }
              }
            }
            if (parent) {
              parent.replaceChild(newNode, oldNode);
            }
            newNode[jqLite.expando] = oldNode[jqLite.expando];
            $element[0] = newNode;
          }
        }
      ];
    }
    var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
    function directiveNormalize(name) {
      return camelCase(name.replace(PREFIX_REGEXP, ''));
    }
    function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {
    }
    function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {
    }
    function $ControllerProvider() {
      var controllers = {};
      this.register = function (name, constructor) {
        if (isObject(name)) {
          extend(controllers, name);
        } else {
          controllers[name] = constructor;
        }
      };
      this.$get = [
        '$injector',
        '$window',
        function ($injector, $window) {
          return function (constructor, locals) {
            if (isString(constructor)) {
              var name = constructor;
              constructor = controllers.hasOwnProperty(name) ? controllers[name] : getter(locals.$scope, name, true) || getter($window, name, true);
              assertArgFn(constructor, name, true);
            }
            return $injector.instantiate(constructor, locals);
          };
        }
      ];
    }
    function $DocumentProvider() {
      this.$get = [
        '$window',
        function (window) {
          return jqLite(window.document);
        }
      ];
    }
    function $ExceptionHandlerProvider() {
      this.$get = [
        '$log',
        function ($log) {
          return function (exception, cause) {
            $log.error.apply($log, arguments);
          };
        }
      ];
    }
    function $InterpolateProvider() {
      var startSymbol = '{{';
      var endSymbol = '}}';
      this.startSymbol = function (value) {
        if (value) {
          startSymbol = value;
          return this;
        } else {
          return startSymbol;
        }
      };
      this.endSymbol = function (value) {
        if (value) {
          endSymbol = value;
          return this;
        } else {
          return endSymbol;
        }
      };
      this.$get = [
        '$parse',
        function ($parse) {
          var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length;
          function $interpolate(text, mustHaveExpression) {
            var startIndex, endIndex, index = 0, parts = [], length = text.length, hasInterpolation = false, fn, exp, concat = [];
            while (index < length) {
              if ((startIndex = text.indexOf(startSymbol, index)) != -1 && (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1) {
                index != startIndex && parts.push(text.substring(index, startIndex));
                parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex)));
                fn.exp = exp;
                index = endIndex + endSymbolLength;
                hasInterpolation = true;
              } else {
                index != length && parts.push(text.substring(index));
                index = length;
              }
            }
            if (!(length = parts.length)) {
              parts.push('');
              length = 1;
            }
            if (!mustHaveExpression || hasInterpolation) {
              concat.length = length;
              fn = function (context) {
                for (var i = 0, ii = length, part; i < ii; i++) {
                  if (typeof (part = parts[i]) == 'function') {
                    part = part(context);
                    if (part == null || part == undefined) {
                      part = '';
                    } else if (typeof part != 'string') {
                      part = toJson(part);
                    }
                  }
                  concat[i] = part;
                }
                return concat.join('');
              };
              fn.exp = text;
              fn.parts = parts;
              return fn;
            }
          }
          $interpolate.startSymbol = function () {
            return startSymbol;
          };
          $interpolate.endSymbol = function () {
            return endSymbol;
          };
          return $interpolate;
        }
      ];
    }
    var URL_MATCH = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, PATH_MATCH = /^([^\?#]*)?(\?([^#]*))?(#(.*))?$/, HASH_MATCH = PATH_MATCH, DEFAULT_PORTS = {
        'http': 80,
        'https': 443,
        'ftp': 21
      };
    function encodePath(path) {
      var segments = path.split('/'), i = segments.length;
      while (i--) {
        segments[i] = encodeUriSegment(segments[i]);
      }
      return segments.join('/');
    }
    function stripHash(url) {
      return url.split('#')[0];
    }
    function matchUrl(url, obj) {
      var match = URL_MATCH.exec(url);
      match = {
        protocol: match[1],
        host: match[3],
        port: int(match[5]) || DEFAULT_PORTS[match[1]] || null,
        path: match[6] || '/',
        search: match[8],
        hash: match[10]
      };
      if (obj) {
        obj.$$protocol = match.protocol;
        obj.$$host = match.host;
        obj.$$port = match.port;
      }
      return match;
    }
    function composeProtocolHostPort(protocol, host, port) {
      return protocol + '://' + host + (port == DEFAULT_PORTS[protocol] ? '' : ':' + port);
    }
    function pathPrefixFromBase(basePath) {
      return basePath.substr(0, basePath.lastIndexOf('/'));
    }
    function convertToHtml5Url(url, basePath, hashPrefix) {
      var match = matchUrl(url);
      if (decodeURIComponent(match.path) != basePath || isUndefined(match.hash) || match.hash.indexOf(hashPrefix) !== 0) {
        return url;
      } else {
        return composeProtocolHostPort(match.protocol, match.host, match.port) + pathPrefixFromBase(basePath) + match.hash.substr(hashPrefix.length);
      }
    }
    function convertToHashbangUrl(url, basePath, hashPrefix) {
      var match = matchUrl(url);
      if (decodeURIComponent(match.path) == basePath && !isUndefined(match.hash) && match.hash.indexOf(hashPrefix) === 0) {
        return url;
      } else {
        var search = match.search && '?' + match.search || '', hash = match.hash && '#' + match.hash || '', pathPrefix = pathPrefixFromBase(basePath), path = match.path.substr(pathPrefix.length);
        if (match.path.indexOf(pathPrefix) !== 0) {
          throw Error('Invalid url "' + url + '", missing path prefix "' + pathPrefix + '" !');
        }
        return composeProtocolHostPort(match.protocol, match.host, match.port) + basePath + '#' + hashPrefix + path + search + hash;
      }
    }
    function LocationUrl(url, pathPrefix, appBaseUrl) {
      pathPrefix = pathPrefix || '';
      this.$$parse = function (newAbsoluteUrl) {
        var match = matchUrl(newAbsoluteUrl, this);
        if (match.path.indexOf(pathPrefix) !== 0) {
          throw Error('Invalid url "' + newAbsoluteUrl + '", missing path prefix "' + pathPrefix + '" !');
        }
        this.$$path = decodeURIComponent(match.path.substr(pathPrefix.length));
        this.$$search = parseKeyValue(match.search);
        this.$$hash = match.hash && decodeURIComponent(match.hash) || '';
        this.$$compose();
      };
      this.$$compose = function () {
        var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
        this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
        this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + pathPrefix + this.$$url;
      };
      this.$$rewriteAppUrl = function (absoluteLinkUrl) {
        if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
          return absoluteLinkUrl;
        }
      };
      this.$$parse(url);
    }
    function LocationHashbangUrl(url, hashPrefix, appBaseUrl) {
      var basePath;
      this.$$parse = function (url) {
        var match = matchUrl(url, this);
        if (match.hash && match.hash.indexOf(hashPrefix) !== 0) {
          throw Error('Invalid url "' + url + '", missing hash prefix "' + hashPrefix + '" !');
        }
        basePath = match.path + (match.search ? '?' + match.search : '');
        match = HASH_MATCH.exec((match.hash || '').substr(hashPrefix.length));
        if (match[1]) {
          this.$$path = (match[1].charAt(0) == '/' ? '' : '/') + decodeURIComponent(match[1]);
        } else {
          this.$$path = '';
        }
        this.$$search = parseKeyValue(match[3]);
        this.$$hash = match[5] && decodeURIComponent(match[5]) || '';
        this.$$compose();
      };
      this.$$compose = function () {
        var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
        this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
        this.$$absUrl = composeProtocolHostPort(this.$$protocol, this.$$host, this.$$port) + basePath + (this.$$url ? '#' + hashPrefix + this.$$url : '');
      };
      this.$$rewriteAppUrl = function (absoluteLinkUrl) {
        if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
          return absoluteLinkUrl;
        }
      };
      this.$$parse(url);
    }
    LocationUrl.prototype = {
      $$replace: false,
      absUrl: locationGetter('$$absUrl'),
      url: function (url, replace) {
        if (isUndefined(url))
          return this.$$url;
        var match = PATH_MATCH.exec(url);
        if (match[1])
          this.path(decodeURIComponent(match[1]));
        if (match[2] || match[1])
          this.search(match[3] || '');
        this.hash(match[5] || '', replace);
        return this;
      },
      protocol: locationGetter('$$protocol'),
      host: locationGetter('$$host'),
      port: locationGetter('$$port'),
      path: locationGetterSetter('$$path', function (path) {
        return path.charAt(0) == '/' ? path : '/' + path;
      }),
      search: function (search, paramValue) {
        if (isUndefined(search))
          return this.$$search;
        if (isDefined(paramValue)) {
          if (paramValue === null) {
            delete this.$$search[search];
          } else {
            this.$$search[search] = paramValue;
          }
        } else {
          this.$$search = isString(search) ? parseKeyValue(search) : search;
        }
        this.$$compose();
        return this;
      },
      hash: locationGetterSetter('$$hash', identity),
      replace: function () {
        this.$$replace = true;
        return this;
      }
    };
    LocationHashbangUrl.prototype = inherit(LocationUrl.prototype);
    function LocationHashbangInHtml5Url(url, hashPrefix, appBaseUrl, baseExtra) {
      LocationHashbangUrl.apply(this, arguments);
      this.$$rewriteAppUrl = function (absoluteLinkUrl) {
        if (absoluteLinkUrl.indexOf(appBaseUrl) == 0) {
          return appBaseUrl + baseExtra + '#' + hashPrefix + absoluteLinkUrl.substr(appBaseUrl.length);
        }
      };
    }
    LocationHashbangInHtml5Url.prototype = inherit(LocationHashbangUrl.prototype);
    function locationGetter(property) {
      return function () {
        return this[property];
      };
    }
    function locationGetterSetter(property, preprocess) {
      return function (value) {
        if (isUndefined(value))
          return this[property];
        this[property] = preprocess(value);
        this.$$compose();
        return this;
      };
    }
    function $LocationProvider() {
      var hashPrefix = '', html5Mode = false;
      this.hashPrefix = function (prefix) {
        if (isDefined(prefix)) {
          hashPrefix = prefix;
          return this;
        } else {
          return hashPrefix;
        }
      };
      this.html5Mode = function (mode) {
        if (isDefined(mode)) {
          html5Mode = mode;
          return this;
        } else {
          return html5Mode;
        }
      };
      this.$get = [
        '$rootScope',
        '$browser',
        '$sniffer',
        '$rootElement',
        function ($rootScope, $browser, $sniffer, $rootElement) {
          var $location, basePath, pathPrefix, initUrl = $browser.url(), initUrlParts = matchUrl(initUrl), appBaseUrl;
          if (html5Mode) {
            basePath = $browser.baseHref() || '/';
            pathPrefix = pathPrefixFromBase(basePath);
            appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + pathPrefix + '/';
            if ($sniffer.history) {
              $location = new LocationUrl(convertToHtml5Url(initUrl, basePath, hashPrefix), pathPrefix, appBaseUrl);
            } else {
              $location = new LocationHashbangInHtml5Url(convertToHashbangUrl(initUrl, basePath, hashPrefix), hashPrefix, appBaseUrl, basePath.substr(pathPrefix.length + 1));
            }
          } else {
            appBaseUrl = composeProtocolHostPort(initUrlParts.protocol, initUrlParts.host, initUrlParts.port) + (initUrlParts.path || '') + (initUrlParts.search ? '?' + initUrlParts.search : '') + '#' + hashPrefix + '/';
            $location = new LocationHashbangUrl(initUrl, hashPrefix, appBaseUrl);
          }
          $rootElement.bind('click', function (event) {
            if (event.ctrlKey || event.metaKey || event.which == 2)
              return;
            var elm = jqLite(event.target);
            while (lowercase(elm[0].nodeName) !== 'a') {
              if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])
                return;
            }
            var absHref = elm.prop('href'), rewrittenUrl = $location.$$rewriteAppUrl(absHref);
            if (absHref && !elm.attr('target') && rewrittenUrl) {
              $location.$$parse(rewrittenUrl);
              $rootScope.$apply();
              event.preventDefault();
              window.angular['ff-684208-preventDefault'] = true;
            }
          });
          if ($location.absUrl() != initUrl) {
            $browser.url($location.absUrl(), true);
          }
          $browser.onUrlChange(function (newUrl) {
            if ($location.absUrl() != newUrl) {
              if ($rootScope.$broadcast('$locationChangeStart', newUrl, $location.absUrl()).defaultPrevented) {
                $browser.url($location.absUrl());
                return;
              }
              $rootScope.$evalAsync(function () {
                var oldUrl = $location.absUrl();
                $location.$$parse(newUrl);
                afterLocationChange(oldUrl);
              });
              if (!$rootScope.$$phase)
                $rootScope.$digest();
            }
          });
          var changeCounter = 0;
          $rootScope.$watch(function $locationWatch() {
            var oldUrl = $browser.url();
            var currentReplace = $location.$$replace;
            if (!changeCounter || oldUrl != $location.absUrl()) {
              changeCounter++;
              $rootScope.$evalAsync(function () {
                if ($rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented) {
                  $location.$$parse(oldUrl);
                } else {
                  $browser.url($location.absUrl(), currentReplace);
                  afterLocationChange(oldUrl);
                }
              });
            }
            $location.$$replace = false;
            return changeCounter;
          });
          return $location;
          function afterLocationChange(oldUrl) {
            $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
          }
        }
      ];
    }
    function $LogProvider() {
      this.$get = [
        '$window',
        function ($window) {
          return {
            log: consoleLog('log'),
            warn: consoleLog('warn'),
            info: consoleLog('info'),
            error: consoleLog('error')
          };
          function formatError(arg) {
            if (arg instanceof Error) {
              if (arg.stack) {
                arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
              } else if (arg.sourceURL) {
                arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
              }
            }
            return arg;
          }
          function consoleLog(type) {
            var console = $window.console || {}, logFn = console[type] || console.log || noop;
            if (logFn.apply) {
              return function () {
                var args = [];
                forEach(arguments, function (arg) {
                  args.push(formatError(arg));
                });
                return logFn.apply(console, args);
              };
            }
            return function (arg1, arg2) {
              logFn(arg1, arg2);
            };
          }
        }
      ];
    }
    var OPERATORS = {
        'null': function () {
          return null;
        },
        'true': function () {
          return true;
        },
        'false': function () {
          return false;
        },
        undefined: noop,
        '+': function (self, locals, a, b) {
          a = a(self, locals);
          b = b(self, locals);
          if (isDefined(a)) {
            if (isDefined(b)) {
              return a + b;
            }
            return a;
          }
          return isDefined(b) ? b : undefined;
        },
        '-': function (self, locals, a, b) {
          a = a(self, locals);
          b = b(self, locals);
          return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
        },
        '*': function (self, locals, a, b) {
          return a(self, locals) * b(self, locals);
        },
        '/': function (self, locals, a, b) {
          return a(self, locals) / b(self, locals);
        },
        '%': function (self, locals, a, b) {
          return a(self, locals) % b(self, locals);
        },
        '^': function (self, locals, a, b) {
          return a(self, locals) ^ b(self, locals);
        },
        '=': noop,
        '==': function (self, locals, a, b) {
          return a(self, locals) == b(self, locals);
        },
        '!=': function (self, locals, a, b) {
          return a(self, locals) != b(self, locals);
        },
        '<': function (self, locals, a, b) {
          return a(self, locals) < b(self, locals);
        },
        '>': function (self, locals, a, b) {
          return a(self, locals) > b(self, locals);
        },
        '<=': function (self, locals, a, b) {
          return a(self, locals) <= b(self, locals);
        },
        '>=': function (self, locals, a, b) {
          return a(self, locals) >= b(self, locals);
        },
        '&&': function (self, locals, a, b) {
          return a(self, locals) && b(self, locals);
        },
        '||': function (self, locals, a, b) {
          return a(self, locals) || b(self, locals);
        },
        '&': function (self, locals, a, b) {
          return a(self, locals) & b(self, locals);
        },
        '|': function (self, locals, a, b) {
          return b(self, locals)(self, locals, a(self, locals));
        },
        '!': function (self, locals, a) {
          return !a(self, locals);
        }
      };
    var ESCAPE = {
        'n': '\n',
        'f': '\f',
        'r': '\r',
        't': '\t',
        'v': '\x0B',
        '\'': '\'',
        '"': '"'
      };
    function lex(text, csp) {
      var tokens = [], token, index = 0, json = [], ch, lastCh = ':';
      while (index < text.length) {
        ch = text.charAt(index);
        if (is('"\'')) {
          readString(ch);
        } else if (isNumber(ch) || is('.') && isNumber(peek())) {
          readNumber();
        } else if (isIdent(ch)) {
          readIdent();
          if (was('{,') && json[0] == '{' && (token = tokens[tokens.length - 1])) {
            token.json = token.text.indexOf('.') == -1;
          }
        } else if (is('(){}[].,;:')) {
          tokens.push({
            index: index,
            text: ch,
            json: was(':[,') && is('{[') || is('}]:,')
          });
          if (is('{['))
            json.unshift(ch);
          if (is('}]'))
            json.shift();
          index++;
        } else if (isWhitespace(ch)) {
          index++;
          continue;
        } else {
          var ch2 = ch + peek(), fn = OPERATORS[ch], fn2 = OPERATORS[ch2];
          if (fn2) {
            tokens.push({
              index: index,
              text: ch2,
              fn: fn2
            });
            index += 2;
          } else if (fn) {
            tokens.push({
              index: index,
              text: ch,
              fn: fn,
              json: was('[,:') && is('+-')
            });
            index += 1;
          } else {
            throwError('Unexpected next character ', index, index + 1);
          }
        }
        lastCh = ch;
      }
      return tokens;
      function is(chars) {
        return chars.indexOf(ch) != -1;
      }
      function was(chars) {
        return chars.indexOf(lastCh) != -1;
      }
      function peek() {
        return index + 1 < text.length ? text.charAt(index + 1) : false;
      }
      function isNumber(ch) {
        return '0' <= ch && ch <= '9';
      }
      function isWhitespace(ch) {
        return ch == ' ' || ch == '\r' || ch == '\t' || ch == '\n' || ch == '\x0B' || ch == '\xa0';
      }
      function isIdent(ch) {
        return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || '_' == ch || ch == '$';
      }
      function isExpOperator(ch) {
        return ch == '-' || ch == '+' || isNumber(ch);
      }
      function throwError(error, start, end) {
        end = end || index;
        throw Error('Lexer Error: ' + error + ' at column' + (isDefined(start) ? 's ' + start + '-' + index + ' [' + text.substring(start, end) + ']' : ' ' + end) + ' in expression [' + text + '].');
      }
      function readNumber() {
        var number = '';
        var start = index;
        while (index < text.length) {
          var ch = lowercase(text.charAt(index));
          if (ch == '.' || isNumber(ch)) {
            number += ch;
          } else {
            var peekCh = peek();
            if (ch == 'e' && isExpOperator(peekCh)) {
              number += ch;
            } else if (isExpOperator(ch) && peekCh && isNumber(peekCh) && number.charAt(number.length - 1) == 'e') {
              number += ch;
            } else if (isExpOperator(ch) && (!peekCh || !isNumber(peekCh)) && number.charAt(number.length - 1) == 'e') {
              throwError('Invalid exponent');
            } else {
              break;
            }
          }
          index++;
        }
        number = 1 * number;
        tokens.push({
          index: start,
          text: number,
          json: true,
          fn: function () {
            return number;
          }
        });
      }
      function readIdent() {
        var ident = '', start = index, lastDot, peekIndex, methodName, ch;
        while (index < text.length) {
          ch = text.charAt(index);
          if (ch == '.' || isIdent(ch) || isNumber(ch)) {
            if (ch == '.')
              lastDot = index;
            ident += ch;
          } else {
            break;
          }
          index++;
        }
        if (lastDot) {
          peekIndex = index;
          while (peekIndex < text.length) {
            ch = text.charAt(peekIndex);
            if (ch == '(') {
              methodName = ident.substr(lastDot - start + 1);
              ident = ident.substr(0, lastDot - start);
              index = peekIndex;
              break;
            }
            if (isWhitespace(ch)) {
              peekIndex++;
            } else {
              break;
            }
          }
        }
        var token = {
            index: start,
            text: ident
          };
        if (OPERATORS.hasOwnProperty(ident)) {
          token.fn = token.json = OPERATORS[ident];
        } else {
          var getter = getterFn(ident, csp);
          token.fn = extend(function (self, locals) {
            return getter(self, locals);
          }, {
            assign: function (self, value) {
              return setter(self, ident, value);
            }
          });
        }
        tokens.push(token);
        if (methodName) {
          tokens.push({
            index: lastDot,
            text: '.',
            json: false
          });
          tokens.push({
            index: lastDot + 1,
            text: methodName,
            json: false
          });
        }
      }
      function readString(quote) {
        var start = index;
        index++;
        var string = '';
        var rawString = quote;
        var escape = false;
        while (index < text.length) {
          var ch = text.charAt(index);
          rawString += ch;
          if (escape) {
            if (ch == 'u') {
              var hex = text.substring(index + 1, index + 5);
              if (!hex.match(/[\da-f]{4}/i))
                throwError('Invalid unicode escape [\\u' + hex + ']');
              index += 4;
              string += String.fromCharCode(parseInt(hex, 16));
            } else {
              var rep = ESCAPE[ch];
              if (rep) {
                string += rep;
              } else {
                string += ch;
              }
            }
            escape = false;
          } else if (ch == '\\') {
            escape = true;
          } else if (ch == quote) {
            index++;
            tokens.push({
              index: start,
              text: rawString,
              string: string,
              json: true,
              fn: function () {
                return string;
              }
            });
            return;
          } else {
            string += ch;
          }
          index++;
        }
        throwError('Unterminated quote', start);
      }
    }
    function parser(text, json, $filter, csp) {
      var ZERO = valueFn(0), value, tokens = lex(text, csp), assignment = _assignment, functionCall = _functionCall, fieldAccess = _fieldAccess, objectIndex = _objectIndex, filterChain = _filterChain;
      if (json) {
        assignment = logicalOR;
        functionCall = fieldAccess = objectIndex = filterChain = function () {
          throwError('is not valid json', {
            text: text,
            index: 0
          });
        };
        value = primary();
      } else {
        value = statements();
      }
      if (tokens.length !== 0) {
        throwError('is an unexpected token', tokens[0]);
      }
      return value;
      function throwError(msg, token) {
        throw Error('Syntax Error: Token \'' + token.text + '\' ' + msg + ' at column ' + (token.index + 1) + ' of the expression [' + text + '] starting at [' + text.substring(token.index) + '].');
      }
      function peekToken() {
        if (tokens.length === 0)
          throw Error('Unexpected end of expression: ' + text);
        return tokens[0];
      }
      function peek(e1, e2, e3, e4) {
        if (tokens.length > 0) {
          var token = tokens[0];
          var t = token.text;
          if (t == e1 || t == e2 || t == e3 || t == e4 || !e1 && !e2 && !e3 && !e4) {
            return token;
          }
        }
        return false;
      }
      function expect(e1, e2, e3, e4) {
        var token = peek(e1, e2, e3, e4);
        if (token) {
          if (json && !token.json) {
            throwError('is not valid json', token);
          }
          tokens.shift();
          return token;
        }
        return false;
      }
      function consume(e1) {
        if (!expect(e1)) {
          throwError('is unexpected, expecting [' + e1 + ']', peek());
        }
      }
      function unaryFn(fn, right) {
        return function (self, locals) {
          return fn(self, locals, right);
        };
      }
      function binaryFn(left, fn, right) {
        return function (self, locals) {
          return fn(self, locals, left, right);
        };
      }
      function statements() {
        var statements = [];
        while (true) {
          if (tokens.length > 0 && !peek('}', ')', ';', ']'))
            statements.push(filterChain());
          if (!expect(';')) {
            return statements.length == 1 ? statements[0] : function (self, locals) {
              var value;
              for (var i = 0; i < statements.length; i++) {
                var statement = statements[i];
                if (statement)
                  value = statement(self, locals);
              }
              return value;
            };
          }
        }
      }
      function _filterChain() {
        var left = expression();
        var token;
        while (true) {
          if (token = expect('|')) {
            left = binaryFn(left, token.fn, filter());
          } else {
            return left;
          }
        }
      }
      function filter() {
        var token = expect();
        var fn = $filter(token.text);
        var argsFn = [];
        while (true) {
          if (token = expect(':')) {
            argsFn.push(expression());
          } else {
            var fnInvoke = function (self, locals, input) {
              var args = [input];
              for (var i = 0; i < argsFn.length; i++) {
                args.push(argsFn[i](self, locals));
              }
              return fn.apply(self, args);
            };
            return function () {
              return fnInvoke;
            };
          }
        }
      }
      function expression() {
        return assignment();
      }
      function _assignment() {
        var left = logicalOR();
        var right;
        var token;
        if (token = expect('=')) {
          if (!left.assign) {
            throwError('implies assignment but [' + text.substring(0, token.index) + '] can not be assigned to', token);
          }
          right = logicalOR();
          return function (scope, locals) {
            return left.assign(scope, right(scope, locals), locals);
          };
        } else {
          return left;
        }
      }
      function logicalOR() {
        var left = logicalAND();
        var token;
        while (true) {
          if (token = expect('||')) {
            left = binaryFn(left, token.fn, logicalAND());
          } else {
            return left;
          }
        }
      }
      function logicalAND() {
        var left = equality();
        var token;
        if (token = expect('&&')) {
          left = binaryFn(left, token.fn, logicalAND());
        }
        return left;
      }
      function equality() {
        var left = relational();
        var token;
        if (token = expect('==', '!=')) {
          left = binaryFn(left, token.fn, equality());
        }
        return left;
      }
      function relational() {
        var left = additive();
        var token;
        if (token = expect('<', '>', '<=', '>=')) {
          left = binaryFn(left, token.fn, relational());
        }
        return left;
      }
      function additive() {
        var left = multiplicative();
        var token;
        while (token = expect('+', '-')) {
          left = binaryFn(left, token.fn, multiplicative());
        }
        return left;
      }
      function multiplicative() {
        var left = unary();
        var token;
        while (token = expect('*', '/', '%')) {
          left = binaryFn(left, token.fn, unary());
        }
        return left;
      }
      function unary() {
        var token;
        if (expect('+')) {
          return primary();
        } else if (token = expect('-')) {
          return binaryFn(ZERO, token.fn, unary());
        } else if (token = expect('!')) {
          return unaryFn(token.fn, unary());
        } else {
          return primary();
        }
      }
      function primary() {
        var primary;
        if (expect('(')) {
          primary = filterChain();
          consume(')');
        } else if (expect('[')) {
          primary = arrayDeclaration();
        } else if (expect('{')) {
          primary = object();
        } else {
          var token = expect();
          primary = token.fn;
          if (!primary) {
            throwError('not a primary expression', token);
          }
        }
        var next, context;
        while (next = expect('(', '[', '.')) {
          if (next.text === '(') {
            primary = functionCall(primary, context);
            context = null;
          } else if (next.text === '[') {
            context = primary;
            primary = objectIndex(primary);
          } else if (next.text === '.') {
            context = primary;
            primary = fieldAccess(primary);
          } else {
            throwError('IMPOSSIBLE');
          }
        }
        return primary;
      }
      function _fieldAccess(object) {
        var field = expect().text;
        var getter = getterFn(field, csp);
        return extend(function (scope, locals, self) {
          return getter(self || object(scope, locals), locals);
        }, {
          assign: function (scope, value, locals) {
            return setter(object(scope, locals), field, value);
          }
        });
      }
      function _objectIndex(obj) {
        var indexFn = expression();
        consume(']');
        return extend(function (self, locals) {
          var o = obj(self, locals), i = indexFn(self, locals), v, p;
          if (!o)
            return undefined;
          v = o[i];
          if (v && v.then) {
            p = v;
            if (!('$$v' in v)) {
              p.$$v = undefined;
              p.then(function (val) {
                p.$$v = val;
              });
            }
            v = v.$$v;
          }
          return v;
        }, {
          assign: function (self, value, locals) {
            return obj(self, locals)[indexFn(self, locals)] = value;
          }
        });
      }
      function _functionCall(fn, contextGetter) {
        var argsFn = [];
        if (peekToken().text != ')') {
          do {
            argsFn.push(expression());
          } while (expect(','));
        }
        consume(')');
        return function (scope, locals) {
          var args = [], context = contextGetter ? contextGetter(scope, locals) : scope;
          for (var i = 0; i < argsFn.length; i++) {
            args.push(argsFn[i](scope, locals));
          }
          var fnPtr = fn(scope, locals, context) || noop;
          return fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
        };
      }
      function arrayDeclaration() {
        var elementFns = [];
        if (peekToken().text != ']') {
          do {
            elementFns.push(expression());
          } while (expect(','));
        }
        consume(']');
        return function (self, locals) {
          var array = [];
          for (var i = 0; i < elementFns.length; i++) {
            array.push(elementFns[i](self, locals));
          }
          return array;
        };
      }
      function object() {
        var keyValues = [];
        if (peekToken().text != '}') {
          do {
            var token = expect(), key = token.string || token.text;
            consume(':');
            var value = expression();
            keyValues.push({
              key: key,
              value: value
            });
          } while (expect(','));
        }
        consume('}');
        return function (self, locals) {
          var object = {};
          for (var i = 0; i < keyValues.length; i++) {
            var keyValue = keyValues[i];
            object[keyValue.key] = keyValue.value(self, locals);
          }
          return object;
        };
      }
    }
    function setter(obj, path, setValue) {
      var element = path.split('.');
      for (var i = 0; element.length > 1; i++) {
        var key = element.shift();
        var propertyObj = obj[key];
        if (!propertyObj) {
          propertyObj = {};
          obj[key] = propertyObj;
        }
        obj = propertyObj;
      }
      obj[element.shift()] = setValue;
      return setValue;
    }
    var getterFnCache = {};
    function cspSafeGetterFn(key0, key1, key2, key3, key4) {
      return function (scope, locals) {
        var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope, promise;
        if (pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key0];
        if (pathVal && pathVal.then) {
          if (!('$$v' in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function (val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        if (!key1 || pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key1];
        if (pathVal && pathVal.then) {
          if (!('$$v' in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function (val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        if (!key2 || pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key2];
        if (pathVal && pathVal.then) {
          if (!('$$v' in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function (val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        if (!key3 || pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key3];
        if (pathVal && pathVal.then) {
          if (!('$$v' in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function (val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        if (!key4 || pathVal === null || pathVal === undefined)
          return pathVal;
        pathVal = pathVal[key4];
        if (pathVal && pathVal.then) {
          if (!('$$v' in pathVal)) {
            promise = pathVal;
            promise.$$v = undefined;
            promise.then(function (val) {
              promise.$$v = val;
            });
          }
          pathVal = pathVal.$$v;
        }
        return pathVal;
      };
    }
    function getterFn(path, csp) {
      if (getterFnCache.hasOwnProperty(path)) {
        return getterFnCache[path];
      }
      var pathKeys = path.split('.'), pathKeysLength = pathKeys.length, fn;
      if (csp) {
        fn = pathKeysLength < 6 ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4]) : function (scope, locals) {
          var i = 0, val;
          do {
            val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++])(scope, locals);
            locals = undefined;
            scope = val;
          } while (i < pathKeysLength);
          return val;
        };
      } else {
        var code = 'var l, fn, p;\n';
        forEach(pathKeys, function (key, index) {
          code += 'if(s === null || s === undefined) return s;\n' + 'l=s;\n' + 's=' + (index ? 's' : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"]' + ';\n' + 'if (s && s.then) {\n' + ' if (!("$$v" in s)) {\n' + ' p=s;\n' + ' p.$$v = undefined;\n' + ' p.then(function(v) {p.$$v=v;});\n' + '}\n' + ' s=s.$$v\n' + '}\n';
        });
        code += 'return s;';
        fn = Function('s', 'k', code);
        fn.toString = function () {
          return code;
        };
      }
      return getterFnCache[path] = fn;
    }
    function $ParseProvider() {
      var cache = {};
      this.$get = [
        '$filter',
        '$sniffer',
        function ($filter, $sniffer) {
          return function (exp) {
            switch (typeof exp) {
            case 'string':
              return cache.hasOwnProperty(exp) ? cache[exp] : cache[exp] = parser(exp, false, $filter, $sniffer.csp);
            case 'function':
              return exp;
            default:
              return noop;
            }
          };
        }
      ];
    }
    function $QProvider() {
      this.$get = [
        '$rootScope',
        '$exceptionHandler',
        function ($rootScope, $exceptionHandler) {
          return qFactory(function (callback) {
            $rootScope.$evalAsync(callback);
          }, $exceptionHandler);
        }
      ];
    }
    function qFactory(nextTick, exceptionHandler) {
      var defer = function () {
        var pending = [], value, deferred;
        deferred = {
          resolve: function (val) {
            if (pending) {
              var callbacks = pending;
              pending = undefined;
              value = ref(val);
              if (callbacks.length) {
                nextTick(function () {
                  var callback;
                  for (var i = 0, ii = callbacks.length; i < ii; i++) {
                    callback = callbacks[i];
                    value.then(callback[0], callback[1]);
                  }
                });
              }
            }
          },
          reject: function (reason) {
            deferred.resolve(reject(reason));
          },
          promise: {
            then: function (callback, errback) {
              var result = defer();
              var wrappedCallback = function (value) {
                try {
                  result.resolve((callback || defaultCallback)(value));
                } catch (e) {
                  result.reject(e);
                  exceptionHandler(e);
                }
              };
              var wrappedErrback = function (reason) {
                try {
                  result.resolve((errback || defaultErrback)(reason));
                } catch (e) {
                  result.reject(e);
                  exceptionHandler(e);
                }
              };
              if (pending) {
                pending.push([
                  wrappedCallback,
                  wrappedErrback
                ]);
              } else {
                value.then(wrappedCallback, wrappedErrback);
              }
              return result.promise;
            }
          }
        };
        return deferred;
      };
      var ref = function (value) {
        if (value && value.then)
          return value;
        return {
          then: function (callback) {
            var result = defer();
            nextTick(function () {
              result.resolve(callback(value));
            });
            return result.promise;
          }
        };
      };
      var reject = function (reason) {
        return {
          then: function (callback, errback) {
            var result = defer();
            nextTick(function () {
              result.resolve((errback || defaultErrback)(reason));
            });
            return result.promise;
          }
        };
      };
      var when = function (value, callback, errback) {
        var result = defer(), done;
        var wrappedCallback = function (value) {
          try {
            return (callback || defaultCallback)(value);
          } catch (e) {
            exceptionHandler(e);
            return reject(e);
          }
        };
        var wrappedErrback = function (reason) {
          try {
            return (errback || defaultErrback)(reason);
          } catch (e) {
            exceptionHandler(e);
            return reject(e);
          }
        };
        nextTick(function () {
          ref(value).then(function (value) {
            if (done)
              return;
            done = true;
            result.resolve(ref(value).then(wrappedCallback, wrappedErrback));
          }, function (reason) {
            if (done)
              return;
            done = true;
            result.resolve(wrappedErrback(reason));
          });
        });
        return result.promise;
      };
      function defaultCallback(value) {
        return value;
      }
      function defaultErrback(reason) {
        return reject(reason);
      }
      function all(promises) {
        var deferred = defer(), counter = promises.length, results = [];
        if (counter) {
          forEach(promises, function (promise, index) {
            ref(promise).then(function (value) {
              if (index in results)
                return;
              results[index] = value;
              if (!--counter)
                deferred.resolve(results);
            }, function (reason) {
              if (index in results)
                return;
              deferred.reject(reason);
            });
          });
        } else {
          deferred.resolve(results);
        }
        return deferred.promise;
      }
      return {
        defer: defer,
        reject: reject,
        when: when,
        all: all
      };
    }
    function $RouteProvider() {
      var routes = {};
      this.when = function (path, route) {
        routes[path] = extend({ reloadOnSearch: true }, route);
        if (path) {
          var redirectPath = path[path.length - 1] == '/' ? path.substr(0, path.length - 1) : path + '/';
          routes[redirectPath] = { redirectTo: path };
        }
        return this;
      };
      this.otherwise = function (params) {
        this.when(null, params);
        return this;
      };
      this.$get = [
        '$rootScope',
        '$location',
        '$routeParams',
        '$q',
        '$injector',
        '$http',
        '$templateCache',
        function ($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache) {
          var forceReload = false, $route = {
              routes: routes,
              reload: function () {
                forceReload = true;
                $rootScope.$evalAsync(updateRoute);
              }
            };
          $rootScope.$on('$locationChangeSuccess', updateRoute);
          return $route;
          function switchRouteMatcher(on, when) {
            when = '^' + when.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$';
            var regex = '', params = [], dst = {};
            var re = /:(\w+)/g, paramMatch, lastMatchedIndex = 0;
            while ((paramMatch = re.exec(when)) !== null) {
              regex += when.slice(lastMatchedIndex, paramMatch.index);
              regex += '([^\\/]*)';
              params.push(paramMatch[1]);
              lastMatchedIndex = re.lastIndex;
            }
            regex += when.substr(lastMatchedIndex);
            var match = on.match(new RegExp(regex));
            if (match) {
              forEach(params, function (name, index) {
                dst[name] = match[index + 1];
              });
            }
            return match ? dst : null;
          }
          function updateRoute() {
            var next = parseRoute(), last = $route.current;
            if (next && last && next.$$route === last.$$route && equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
              last.params = next.params;
              copy(last.params, $routeParams);
              $rootScope.$broadcast('$routeUpdate', last);
            } else if (next || last) {
              forceReload = false;
              $rootScope.$broadcast('$routeChangeStart', next, last);
              $route.current = next;
              if (next) {
                if (next.redirectTo) {
                  if (isString(next.redirectTo)) {
                    $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace();
                  } else {
                    $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace();
                  }
                }
              }
              $q.when(next).then(function () {
                if (next) {
                  var keys = [], values = [], template;
                  forEach(next.resolve || {}, function (value, key) {
                    keys.push(key);
                    values.push(isString(value) ? $injector.get(value) : $injector.invoke(value));
                  });
                  if (isDefined(template = next.template)) {
                  } else if (isDefined(template = next.templateUrl)) {
                    template = $http.get(template, { cache: $templateCache }).then(function (response) {
                      return response.data;
                    });
                  }
                  if (isDefined(template)) {
                    keys.push('$template');
                    values.push(template);
                  }
                  return $q.all(values).then(function (values) {
                    var locals = {};
                    forEach(values, function (value, index) {
                      locals[keys[index]] = value;
                    });
                    return locals;
                  });
                }
              }).then(function (locals) {
                if (next == $route.current) {
                  if (next) {
                    next.locals = locals;
                    copy(next.params, $routeParams);
                  }
                  $rootScope.$broadcast('$routeChangeSuccess', next, last);
                }
              }, function (error) {
                if (next == $route.current) {
                  $rootScope.$broadcast('$routeChangeError', next, last, error);
                }
              });
            }
          }
          function parseRoute() {
            var params, match;
            forEach(routes, function (route, path) {
              if (!match && (params = switchRouteMatcher($location.path(), path))) {
                match = inherit(route, {
                  params: extend({}, $location.search(), params),
                  pathParams: params
                });
                match.$$route = route;
              }
            });
            return match || routes[null] && inherit(routes[null], {
              params: {},
              pathParams: {}
            });
          }
          function interpolate(string, params) {
            var result = [];
            forEach((string || '').split(':'), function (segment, i) {
              if (i == 0) {
                result.push(segment);
              } else {
                var segmentMatch = segment.match(/(\w+)(.*)/);
                var key = segmentMatch[1];
                result.push(params[key]);
                result.push(segmentMatch[2] || '');
                delete params[key];
              }
            });
            return result.join('');
          }
        }
      ];
    }
    function $RouteParamsProvider() {
      this.$get = valueFn({});
    }
    function $RootScopeProvider() {
      var TTL = 10;
      this.digestTtl = function (value) {
        if (arguments.length) {
          TTL = value;
        }
        return TTL;
      };
      this.$get = [
        '$injector',
        '$exceptionHandler',
        '$parse',
        function ($injector, $exceptionHandler, $parse) {
          function Scope() {
            this.$id = nextUid();
            this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
            this['this'] = this.$root = this;
            this.$$destroyed = false;
            this.$$asyncQueue = [];
            this.$$listeners = {};
            this.$$isolateBindings = {};
          }
          Scope.prototype = {
            $new: function (isolate) {
              var Child, child;
              if (isFunction(isolate)) {
                throw Error('API-CHANGE: Use $controller to instantiate controllers.');
              }
              if (isolate) {
                child = new Scope();
                child.$root = this.$root;
              } else {
                Child = function () {
                };
                Child.prototype = this;
                child = new Child();
                child.$id = nextUid();
              }
              child['this'] = child;
              child.$$listeners = {};
              child.$parent = this;
              child.$$asyncQueue = [];
              child.$$watchers = child.$$nextSibling = child.$$childHead = child.$$childTail = null;
              child.$$prevSibling = this.$$childTail;
              if (this.$$childHead) {
                this.$$childTail.$$nextSibling = child;
                this.$$childTail = child;
              } else {
                this.$$childHead = this.$$childTail = child;
              }
              return child;
            },
            $watch: function (watchExp, listener, objectEquality) {
              var scope = this, get = compileToFn(watchExp, 'watch'), array = scope.$$watchers, watcher = {
                  fn: listener,
                  last: initWatchVal,
                  get: get,
                  exp: watchExp,
                  eq: !!objectEquality
                };
              if (!isFunction(listener)) {
                var listenFn = compileToFn(listener || noop, 'listener');
                watcher.fn = function (newVal, oldVal, scope) {
                  listenFn(scope);
                };
              }
              if (!array) {
                array = scope.$$watchers = [];
              }
              array.unshift(watcher);
              return function () {
                arrayRemove(array, watcher);
              };
            },
            $digest: function () {
              var watch, value, last, watchers, asyncQueue, length, dirty, ttl = TTL, next, current, target = this, watchLog = [], logIdx, logMsg;
              beginPhase('$digest');
              do {
                dirty = false;
                current = target;
                do {
                  asyncQueue = current.$$asyncQueue;
                  while (asyncQueue.length) {
                    try {
                      current.$eval(asyncQueue.shift());
                    } catch (e) {
                      $exceptionHandler(e);
                    }
                  }
                  if (watchers = current.$$watchers) {
                    length = watchers.length;
                    while (length--) {
                      try {
                        watch = watchers[length];
                        if (watch && (value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : typeof value == 'number' && typeof last == 'number' && isNaN(value) && isNaN(last))) {
                          dirty = true;
                          watch.last = watch.eq ? copy(value) : value;
                          watch.fn(value, last === initWatchVal ? value : last, current);
                          if (ttl < 5) {
                            logIdx = 4 - ttl;
                            if (!watchLog[logIdx])
                              watchLog[logIdx] = [];
                            logMsg = isFunction(watch.exp) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp;
                            logMsg += '; newVal: ' + toJson(value) + '; oldVal: ' + toJson(last);
                            watchLog[logIdx].push(logMsg);
                          }
                        }
                      } catch (e) {
                        $exceptionHandler(e);
                      }
                    }
                  }
                  if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                    while (current !== target && !(next = current.$$nextSibling)) {
                      current = current.$parent;
                    }
                  }
                } while (current = next);
                if (dirty && !ttl--) {
                  clearPhase();
                  throw Error(TTL + ' $digest() iterations reached. Aborting!\n' + 'Watchers fired in the last 5 iterations: ' + toJson(watchLog));
                }
              } while (dirty || asyncQueue.length);
              clearPhase();
            },
            $destroy: function () {
              if ($rootScope == this || this.$$destroyed)
                return;
              var parent = this.$parent;
              this.$broadcast('$destroy');
              this.$$destroyed = true;
              if (parent.$$childHead == this)
                parent.$$childHead = this.$$nextSibling;
              if (parent.$$childTail == this)
                parent.$$childTail = this.$$prevSibling;
              if (this.$$prevSibling)
                this.$$prevSibling.$$nextSibling = this.$$nextSibling;
              if (this.$$nextSibling)
                this.$$nextSibling.$$prevSibling = this.$$prevSibling;
              this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
            },
            $eval: function (expr, locals) {
              return $parse(expr)(this, locals);
            },
            $evalAsync: function (expr) {
              this.$$asyncQueue.push(expr);
            },
            $apply: function (expr) {
              try {
                beginPhase('$apply');
                return this.$eval(expr);
              } catch (e) {
                $exceptionHandler(e);
              } finally {
                clearPhase();
                try {
                  $rootScope.$digest();
                } catch (e) {
                  $exceptionHandler(e);
                  throw e;
                }
              }
            },
            $on: function (name, listener) {
              var namedListeners = this.$$listeners[name];
              if (!namedListeners) {
                this.$$listeners[name] = namedListeners = [];
              }
              namedListeners.push(listener);
              return function () {
                namedListeners[indexOf(namedListeners, listener)] = null;
              };
            },
            $emit: function (name, args) {
              var empty = [], namedListeners, scope = this, stopPropagation = false, event = {
                  name: name,
                  targetScope: scope,
                  stopPropagation: function () {
                    stopPropagation = true;
                  },
                  preventDefault: function () {
                    event.defaultPrevented = true;
                  },
                  defaultPrevented: false
                }, listenerArgs = concat([event], arguments, 1), i, length;
              do {
                namedListeners = scope.$$listeners[name] || empty;
                event.currentScope = scope;
                for (i = 0, length = namedListeners.length; i < length; i++) {
                  if (!namedListeners[i]) {
                    namedListeners.splice(i, 1);
                    i--;
                    length--;
                    continue;
                  }
                  try {
                    namedListeners[i].apply(null, listenerArgs);
                    if (stopPropagation)
                      return event;
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                }
                scope = scope.$parent;
              } while (scope);
              return event;
            },
            $broadcast: function (name, args) {
              var target = this, current = target, next = target, event = {
                  name: name,
                  targetScope: target,
                  preventDefault: function () {
                    event.defaultPrevented = true;
                  },
                  defaultPrevented: false
                }, listenerArgs = concat([event], arguments, 1), listeners, i, length;
              do {
                current = next;
                event.currentScope = current;
                listeners = current.$$listeners[name] || [];
                for (i = 0, length = listeners.length; i < length; i++) {
                  if (!listeners[i]) {
                    listeners.splice(i, 1);
                    i--;
                    length--;
                    continue;
                  }
                  try {
                    listeners[i].apply(null, listenerArgs);
                  } catch (e) {
                    $exceptionHandler(e);
                  }
                }
                if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                  while (current !== target && !(next = current.$$nextSibling)) {
                    current = current.$parent;
                  }
                }
              } while (current = next);
              return event;
            }
          };
          var $rootScope = new Scope();
          return $rootScope;
          function beginPhase(phase) {
            if ($rootScope.$$phase) {
              throw Error($rootScope.$$phase + ' already in progress');
            }
            $rootScope.$$phase = phase;
          }
          function clearPhase() {
            $rootScope.$$phase = null;
          }
          function compileToFn(exp, name) {
            var fn = $parse(exp);
            assertArgFn(fn, name);
            return fn;
          }
          function initWatchVal() {
          }
        }
      ];
    }
    function $SnifferProvider() {
      this.$get = [
        '$window',
        function ($window) {
          var eventSupport = {}, android = int((/android (\d+)/.exec(lowercase($window.navigator.userAgent)) || [])[1]);
          return {
            history: !!($window.history && $window.history.pushState && !(android < 4)),
            hashchange: 'onhashchange' in $window && (!$window.document.documentMode || $window.document.documentMode > 7),
            hasEvent: function (event) {
              if (event == 'input' && msie == 9)
                return false;
              if (isUndefined(eventSupport[event])) {
                var divElm = $window.document.createElement('div');
                eventSupport[event] = 'on' + event in divElm;
              }
              return eventSupport[event];
            },
            csp: false
          };
        }
      ];
    }
    function $WindowProvider() {
      this.$get = valueFn(window);
    }
    function parseHeaders(headers) {
      var parsed = {}, key, val, i;
      if (!headers)
        return parsed;
      forEach(headers.split('\n'), function (line) {
        i = line.indexOf(':');
        key = lowercase(trim(line.substr(0, i)));
        val = trim(line.substr(i + 1));
        if (key) {
          if (parsed[key]) {
            parsed[key] += ', ' + val;
          } else {
            parsed[key] = val;
          }
        }
      });
      return parsed;
    }
    function headersGetter(headers) {
      var headersObj = isObject(headers) ? headers : undefined;
      return function (name) {
        if (!headersObj)
          headersObj = parseHeaders(headers);
        if (name) {
          return headersObj[lowercase(name)] || null;
        }
        return headersObj;
      };
    }
    function transformData(data, headers, fns) {
      if (isFunction(fns))
        return fns(data, headers);
      forEach(fns, function (fn) {
        data = fn(data, headers);
      });
      return data;
    }
    function isSuccess(status) {
      return 200 <= status && status < 300;
    }
    function $HttpProvider() {
      var JSON_START = /^\s*(\[|\{[^\{])/, JSON_END = /[\}\]]\s*$/, PROTECTION_PREFIX = /^\)\]\}',?\n/;
      var $config = this.defaults = {
          transformResponse: [function (data) {
              if (isString(data)) {
                data = data.replace(PROTECTION_PREFIX, '');
                if (JSON_START.test(data) && JSON_END.test(data))
                  data = fromJson(data, true);
              }
              return data;
            }],
          transformRequest: [function (d) {
              return isObject(d) && !isFile(d) ? toJson(d) : d;
            }],
          headers: {
            common: {
              'Accept': 'application/json, text/plain, */*',
              'X-Requested-With': 'XMLHttpRequest'
            },
            post: { 'Content-Type': 'application/json;charset=utf-8' },
            put: { 'Content-Type': 'application/json;charset=utf-8' }
          }
        };
      var providerResponseInterceptors = this.responseInterceptors = [];
      this.$get = [
        '$httpBackend',
        '$browser',
        '$cacheFactory',
        '$rootScope',
        '$q',
        '$injector',
        function ($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
          var defaultCache = $cacheFactory('$http'), responseInterceptors = [];
          forEach(providerResponseInterceptors, function (interceptor) {
            responseInterceptors.push(isString(interceptor) ? $injector.get(interceptor) : $injector.invoke(interceptor));
          });
          function $http(config) {
            config.method = uppercase(config.method);
            var reqTransformFn = config.transformRequest || $config.transformRequest, respTransformFn = config.transformResponse || $config.transformResponse, reqHeaders = extend({}, config.headers), defHeaders = extend({ 'X-XSRF-TOKEN': $browser.cookies()['XSRF-TOKEN'] }, $config.headers.common, $config.headers[lowercase(config.method)]), reqData, defHeaderName, lowercaseDefHeaderName, headerName, promise;
            defaultHeadersIteration:
              for (defHeaderName in defHeaders) {
                lowercaseDefHeaderName = lowercase(defHeaderName);
                for (headerName in config.headers) {
                  if (lowercase(headerName) === lowercaseDefHeaderName) {
                    continue defaultHeadersIteration;
                  }
                }
                reqHeaders[defHeaderName] = defHeaders[defHeaderName];
              }
            if (isUndefined(config.data)) {
              for (var header in reqHeaders) {
                if (lowercase(header) === 'content-type') {
                  delete reqHeaders[header];
                  break;
                }
              }
            }
            reqData = transformData(config.data, headersGetter(reqHeaders), reqTransformFn);
            promise = sendReq(config, reqData, reqHeaders);
            promise = promise.then(transformResponse, transformResponse);
            forEach(responseInterceptors, function (interceptor) {
              promise = interceptor(promise);
            });
            promise.success = function (fn) {
              promise.then(function (response) {
                fn(response.data, response.status, response.headers, config);
              });
              return promise;
            };
            promise.error = function (fn) {
              promise.then(null, function (response) {
                fn(response.data, response.status, response.headers, config);
              });
              return promise;
            };
            return promise;
            function transformResponse(response) {
              var resp = extend({}, response, { data: transformData(response.data, response.headers, respTransformFn) });
              return isSuccess(response.status) ? resp : $q.reject(resp);
            }
          }
          $http.pendingRequests = [];
          createShortMethods('get', 'delete', 'head', 'jsonp');
          createShortMethodsWithData('post', 'put');
          $http.defaults = $config;
          return $http;
          function createShortMethods(names) {
            forEach(arguments, function (name) {
              $http[name] = function (url, config) {
                return $http(extend(config || {}, {
                  method: name,
                  url: url
                }));
              };
            });
          }
          function createShortMethodsWithData(name) {
            forEach(arguments, function (name) {
              $http[name] = function (url, data, config) {
                return $http(extend(config || {}, {
                  method: name,
                  url: url,
                  data: data
                }));
              };
            });
          }
          function sendReq(config, reqData, reqHeaders) {
            var deferred = $q.defer(), promise = deferred.promise, cache, cachedResp, url = buildUrl(config.url, config.params);
            $http.pendingRequests.push(config);
            promise.then(removePendingReq, removePendingReq);
            if (config.cache && config.method == 'GET') {
              cache = isObject(config.cache) ? config.cache : defaultCache;
            }
            if (cache) {
              cachedResp = cache.get(url);
              if (cachedResp) {
                if (cachedResp.then) {
                  cachedResp.then(removePendingReq, removePendingReq);
                  return cachedResp;
                } else {
                  if (isArray(cachedResp)) {
                    resolvePromise(cachedResp[1], cachedResp[0], copy(cachedResp[2]));
                  } else {
                    resolvePromise(cachedResp, 200, {});
                  }
                }
              } else {
                cache.put(url, promise);
              }
            }
            if (!cachedResp) {
              $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials);
            }
            return promise;
            function done(status, response, headersString) {
              if (cache) {
                if (isSuccess(status)) {
                  cache.put(url, [
                    status,
                    response,
                    parseHeaders(headersString)
                  ]);
                } else {
                  cache.remove(url);
                }
              }
              resolvePromise(response, status, headersString);
              $rootScope.$apply();
            }
            function resolvePromise(response, status, headers) {
              status = Math.max(status, 0);
              (isSuccess(status) ? deferred.resolve : deferred.reject)({
                data: response,
                status: status,
                headers: headersGetter(headers),
                config: config
              });
            }
            function removePendingReq() {
              var idx = indexOf($http.pendingRequests, config);
              if (idx !== -1)
                $http.pendingRequests.splice(idx, 1);
            }
          }
          function buildUrl(url, params) {
            if (!params)
              return url;
            var parts = [];
            forEachSorted(params, function (value, key) {
              if (value == null || value == undefined)
                return;
              if (isObject(value)) {
                value = toJson(value);
              }
              parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            });
            return url + (url.indexOf('?') == -1 ? '?' : '&') + parts.join('&');
          }
        }
      ];
    }
    var XHR = window.XMLHttpRequest || function () {
        try {
          return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        } catch (e1) {
        }
        try {
          return new ActiveXObject('Msxml2.XMLHTTP.3.0');
        } catch (e2) {
        }
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e3) {
        }
        throw new Error('This browser does not support XMLHttpRequest.');
      };
    function $HttpBackendProvider() {
      this.$get = [
        '$browser',
        '$window',
        '$document',
        function ($browser, $window, $document) {
          return createHttpBackend($browser, XHR, $browser.defer, $window.angular.callbacks, $document[0], $window.location.protocol.replace(':', ''));
        }
      ];
    }
    function createHttpBackend($browser, XHR, $browserDefer, callbacks, rawDocument, locationProtocol) {
      return function (method, url, post, callback, headers, timeout, withCredentials) {
        $browser.$$incOutstandingRequestCount();
        url = url || $browser.url();
        if (lowercase(method) == 'jsonp') {
          var callbackId = '_' + (callbacks.counter++).toString(36);
          callbacks[callbackId] = function (data) {
            callbacks[callbackId].data = data;
          };
          jsonpReq(url.replace('JSON_CALLBACK', 'angular.callbacks.' + callbackId), function () {
            if (callbacks[callbackId].data) {
              completeRequest(callback, 200, callbacks[callbackId].data);
            } else {
              completeRequest(callback, -2);
            }
            delete callbacks[callbackId];
          });
        } else {
          var xhr = new XHR();
          xhr.open(method, url, true);
          forEach(headers, function (value, key) {
            if (value)
              xhr.setRequestHeader(key, value);
          });
          var status;
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              var responseHeaders = xhr.getAllResponseHeaders();
              var value, simpleHeaders = [
                  'Cache-Control',
                  'Content-Language',
                  'Content-Type',
                  'Expires',
                  'Last-Modified',
                  'Pragma'
                ];
              if (!responseHeaders) {
                responseHeaders = '';
                forEach(simpleHeaders, function (header) {
                  var value = xhr.getResponseHeader(header);
                  if (value) {
                    responseHeaders += header + ': ' + value + '\n';
                  }
                });
              }
              completeRequest(callback, status || xhr.status, xhr.responseText, responseHeaders);
            }
          };
          if (withCredentials) {
            xhr.withCredentials = true;
          }
          xhr.send(post || '');
          if (timeout > 0) {
            $browserDefer(function () {
              status = -1;
              xhr.abort();
            }, timeout);
          }
        }
        function completeRequest(callback, status, response, headersString) {
          var protocol = (url.match(URL_MATCH) || [
              '',
              locationProtocol
            ])[1];
          status = protocol == 'file' ? response ? 200 : 404 : status;
          status = status == 1223 ? 204 : status;
          callback(status, response, headersString);
          $browser.$$completeOutstandingRequest(noop);
        }
      };
      function jsonpReq(url, done) {
        var script = rawDocument.createElement('script'), doneWrapper = function () {
            rawDocument.body.removeChild(script);
            if (done)
              done();
          };
        script.type = 'text/javascript';
        script.src = url;
        if (msie) {
          script.onreadystatechange = function () {
            if (/loaded|complete/.test(script.readyState))
              doneWrapper();
          };
        } else {
          script.onload = script.onerror = doneWrapper;
        }
        rawDocument.body.appendChild(script);
      }
    }
    function $LocaleProvider() {
      this.$get = function () {
        return {
          id: 'en-us',
          NUMBER_FORMATS: {
            DECIMAL_SEP: '.',
            GROUP_SEP: ',',
            PATTERNS: [
              {
                minInt: 1,
                minFrac: 0,
                maxFrac: 3,
                posPre: '',
                posSuf: '',
                negPre: '-',
                negSuf: '',
                gSize: 3,
                lgSize: 3
              },
              {
                minInt: 1,
                minFrac: 2,
                maxFrac: 2,
                posPre: '\xa4',
                posSuf: '',
                negPre: '(\xa4',
                negSuf: ')',
                gSize: 3,
                lgSize: 3
              }
            ],
            CURRENCY_SYM: '$'
          },
          DATETIME_FORMATS: {
            MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
            SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
            DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
            SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
            AMPMS: [
              'AM',
              'PM'
            ],
            medium: 'MMM d, y h:mm:ss a',
            short: 'M/d/yy h:mm a',
            fullDate: 'EEEE, MMMM d, y',
            longDate: 'MMMM d, y',
            mediumDate: 'MMM d, y',
            shortDate: 'M/d/yy',
            mediumTime: 'h:mm:ss a',
            shortTime: 'h:mm a'
          },
          pluralCat: function (num) {
            if (num === 1) {
              return 'one';
            }
            return 'other';
          }
        };
      };
    }
    function $TimeoutProvider() {
      this.$get = [
        '$rootScope',
        '$browser',
        '$q',
        '$exceptionHandler',
        function ($rootScope, $browser, $q, $exceptionHandler) {
          var deferreds = {};
          function timeout(fn, delay, invokeApply) {
            var deferred = $q.defer(), promise = deferred.promise, skipApply = isDefined(invokeApply) && !invokeApply, timeoutId, cleanup;
            timeoutId = $browser.defer(function () {
              try {
                deferred.resolve(fn());
              } catch (e) {
                deferred.reject(e);
                $exceptionHandler(e);
              } finally {
                delete deferreds[promise.$$timeoutId];
              }
              if (!skipApply)
                $rootScope.$apply();
            }, delay);
            promise.$$timeoutId = timeoutId;
            deferreds[timeoutId] = deferred;
            return promise;
          }
          timeout.cancel = function (promise) {
            if (promise && promise.$$timeoutId in deferreds) {
              deferreds[promise.$$timeoutId].reject('canceled');
              delete deferreds[promise.$$timeoutId];
              return $browser.defer.cancel(promise.$$timeoutId);
            }
            return false;
          };
          return timeout;
        }
      ];
    }
    $FilterProvider.$inject = ['$provide'];
    function $FilterProvider($provide) {
      var suffix = 'Filter';
      function register(name, factory) {
        return $provide.factory(name + suffix, factory);
      }
      this.register = register;
      this.$get = [
        '$injector',
        function ($injector) {
          return function (name) {
            return $injector.get(name + suffix);
          };
        }
      ];
      register('currency', currencyFilter);
      register('date', dateFilter);
      register('filter', filterFilter);
      register('json', jsonFilter);
      register('limitTo', limitToFilter);
      register('lowercase', lowercaseFilter);
      register('number', numberFilter);
      register('orderBy', orderByFilter);
      register('uppercase', uppercaseFilter);
    }
    function filterFilter() {
      return function (array, expression) {
        if (!isArray(array))
          return array;
        var predicates = [];
        predicates.check = function (value) {
          for (var j = 0; j < predicates.length; j++) {
            if (!predicates[j](value)) {
              return false;
            }
          }
          return true;
        };
        var search = function (obj, text) {
          if (text.charAt(0) === '!') {
            return !search(obj, text.substr(1));
          }
          switch (typeof obj) {
          case 'boolean':
          case 'number':
          case 'string':
            return ('' + obj).toLowerCase().indexOf(text) > -1;
          case 'object':
            for (var objKey in obj) {
              if (objKey.charAt(0) !== '$' && search(obj[objKey], text)) {
                return true;
              }
            }
            return false;
          case 'array':
            for (var i = 0; i < obj.length; i++) {
              if (search(obj[i], text)) {
                return true;
              }
            }
            return false;
          default:
            return false;
          }
        };
        switch (typeof expression) {
        case 'boolean':
        case 'number':
        case 'string':
          expression = { $: expression };
        case 'object':
          for (var key in expression) {
            if (key == '$') {
              (function () {
                var text = ('' + expression[key]).toLowerCase();
                if (!text)
                  return;
                predicates.push(function (value) {
                  return search(value, text);
                });
              }());
            } else {
              (function () {
                var path = key;
                var text = ('' + expression[key]).toLowerCase();
                if (!text)
                  return;
                predicates.push(function (value) {
                  return search(getter(value, path), text);
                });
              }());
            }
          }
          break;
        case 'function':
          predicates.push(expression);
          break;
        default:
          return array;
        }
        var filtered = [];
        for (var j = 0; j < array.length; j++) {
          var value = array[j];
          if (predicates.check(value)) {
            filtered.push(value);
          }
        }
        return filtered;
      };
    }
    currencyFilter.$inject = ['$locale'];
    function currencyFilter($locale) {
      var formats = $locale.NUMBER_FORMATS;
      return function (amount, currencySymbol) {
        if (isUndefined(currencySymbol))
          currencySymbol = formats.CURRENCY_SYM;
        return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol);
      };
    }
    numberFilter.$inject = ['$locale'];
    function numberFilter($locale) {
      var formats = $locale.NUMBER_FORMATS;
      return function (number, fractionSize) {
        return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
      };
    }
    var DECIMAL_SEP = '.';
    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
      if (isNaN(number) || !isFinite(number))
        return '';
      var isNegative = number < 0;
      number = Math.abs(number);
      var numStr = number + '', formatedText = '', parts = [];
      var hasExponent = false;
      if (numStr.indexOf('e') !== -1) {
        var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
        if (match && match[2] == '-' && match[3] > fractionSize + 1) {
          numStr = '0';
        } else {
          formatedText = numStr;
          hasExponent = true;
        }
      }
      if (!hasExponent) {
        var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
        if (isUndefined(fractionSize)) {
          fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
        }
        var pow = Math.pow(10, fractionSize);
        number = Math.round(number * pow) / pow;
        var fraction = ('' + number).split(DECIMAL_SEP);
        var whole = fraction[0];
        fraction = fraction[1] || '';
        var pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
        if (whole.length >= lgroup + group) {
          pos = whole.length - lgroup;
          for (var i = 0; i < pos; i++) {
            if ((pos - i) % group === 0 && i !== 0) {
              formatedText += groupSep;
            }
            formatedText += whole.charAt(i);
          }
        }
        for (i = pos; i < whole.length; i++) {
          if ((whole.length - i) % lgroup === 0 && i !== 0) {
            formatedText += groupSep;
          }
          formatedText += whole.charAt(i);
        }
        while (fraction.length < fractionSize) {
          fraction += '0';
        }
        if (fractionSize && fractionSize !== '0')
          formatedText += decimalSep + fraction.substr(0, fractionSize);
      } else {
        if (fractionSize > 0 && number > -1 && number < 1) {
          formatedText = number.toFixed(fractionSize);
        }
      }
      parts.push(isNegative ? pattern.negPre : pattern.posPre);
      parts.push(formatedText);
      parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
      return parts.join('');
    }
    function padNumber(num, digits, trim) {
      var neg = '';
      if (num < 0) {
        neg = '-';
        num = -num;
      }
      num = '' + num;
      while (num.length < digits)
        num = '0' + num;
      if (trim)
        num = num.substr(num.length - digits);
      return neg + num;
    }
    function dateGetter(name, size, offset, trim) {
      offset = offset || 0;
      return function (date) {
        var value = date['get' + name]();
        if (offset > 0 || value > -offset)
          value += offset;
        if (value === 0 && offset == -12)
          value = 12;
        return padNumber(value, size, trim);
      };
    }
    function dateStrGetter(name, shortForm) {
      return function (date, formats) {
        var value = date['get' + name]();
        var get = uppercase(shortForm ? 'SHORT' + name : name);
        return formats[get][value];
      };
    }
    function timeZoneGetter(date) {
      var zone = -1 * date.getTimezoneOffset();
      var paddedZone = zone >= 0 ? '+' : '';
      paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
      return paddedZone;
    }
    function ampmGetter(date, formats) {
      return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
    }
    var DATE_FORMATS = {
        yyyy: dateGetter('FullYear', 4),
        yy: dateGetter('FullYear', 2, 0, true),
        y: dateGetter('FullYear', 1),
        MMMM: dateStrGetter('Month'),
        MMM: dateStrGetter('Month', true),
        MM: dateGetter('Month', 2, 1),
        M: dateGetter('Month', 1, 1),
        dd: dateGetter('Date', 2),
        d: dateGetter('Date', 1),
        HH: dateGetter('Hours', 2),
        H: dateGetter('Hours', 1),
        hh: dateGetter('Hours', 2, -12),
        h: dateGetter('Hours', 1, -12),
        mm: dateGetter('Minutes', 2),
        m: dateGetter('Minutes', 1),
        ss: dateGetter('Seconds', 2),
        s: dateGetter('Seconds', 1),
        EEEE: dateStrGetter('Day'),
        EEE: dateStrGetter('Day', true),
        a: ampmGetter,
        Z: timeZoneGetter
      };
    var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, NUMBER_STRING = /^\d+$/;
    dateFilter.$inject = ['$locale'];
    function dateFilter($locale) {
      var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
      function jsonStringToDate(string) {
        var match;
        if (match = string.match(R_ISO8601_STR)) {
          var date = new Date(0), tzHour = 0, tzMin = 0;
          if (match[9]) {
            tzHour = int(match[9] + match[10]);
            tzMin = int(match[9] + match[11]);
          }
          date.setUTCFullYear(int(match[1]), int(match[2]) - 1, int(match[3]));
          date.setUTCHours(int(match[4] || 0) - tzHour, int(match[5] || 0) - tzMin, int(match[6] || 0), int(match[7] || 0));
          return date;
        }
        return string;
      }
      return function (date, format) {
        var text = '', parts = [], fn, match;
        format = format || 'mediumDate';
        format = $locale.DATETIME_FORMATS[format] || format;
        if (isString(date)) {
          if (NUMBER_STRING.test(date)) {
            date = int(date);
          } else {
            date = jsonStringToDate(date);
          }
        }
        if (isNumber(date)) {
          date = new Date(date);
        }
        if (!isDate(date)) {
          return date;
        }
        while (format) {
          match = DATE_FORMATS_SPLIT.exec(format);
          if (match) {
            parts = concat(parts, match, 1);
            format = parts.pop();
          } else {
            parts.push(format);
            format = null;
          }
        }
        forEach(parts, function (value) {
          fn = DATE_FORMATS[value];
          text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
        });
        return text;
      };
    }
    function jsonFilter() {
      return function (object) {
        return toJson(object, true);
      };
    }
    var lowercaseFilter = valueFn(lowercase);
    var uppercaseFilter = valueFn(uppercase);
    function limitToFilter() {
      return function (array, limit) {
        if (!(array instanceof Array))
          return array;
        limit = int(limit);
        var out = [], i, n;
        if (!array || !(array instanceof Array))
          return out;
        if (limit > array.length)
          limit = array.length;
        else if (limit < -array.length)
          limit = -array.length;
        if (limit > 0) {
          i = 0;
          n = limit;
        } else {
          i = array.length + limit;
          n = array.length;
        }
        for (; i < n; i++) {
          out.push(array[i]);
        }
        return out;
      };
    }
    orderByFilter.$inject = ['$parse'];
    function orderByFilter($parse) {
      return function (array, sortPredicate, reverseOrder) {
        if (!isArray(array))
          return array;
        if (!sortPredicate)
          return array;
        sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
        sortPredicate = map(sortPredicate, function (predicate) {
          var descending = false, get = predicate || identity;
          if (isString(predicate)) {
            if (predicate.charAt(0) == '+' || predicate.charAt(0) == '-') {
              descending = predicate.charAt(0) == '-';
              predicate = predicate.substring(1);
            }
            get = $parse(predicate);
          }
          return reverseComparator(function (a, b) {
            return compare(get(a), get(b));
          }, descending);
        });
        var arrayCopy = [];
        for (var i = 0; i < array.length; i++) {
          arrayCopy.push(array[i]);
        }
        return arrayCopy.sort(reverseComparator(comparator, reverseOrder));
        function comparator(o1, o2) {
          for (var i = 0; i < sortPredicate.length; i++) {
            var comp = sortPredicate[i](o1, o2);
            if (comp !== 0)
              return comp;
          }
          return 0;
        }
        function reverseComparator(comp, descending) {
          return toBoolean(descending) ? function (a, b) {
            return comp(b, a);
          } : comp;
        }
        function compare(v1, v2) {
          var t1 = typeof v1;
          var t2 = typeof v2;
          if (t1 == t2) {
            if (t1 == 'string') {
              v1 = v1.toLowerCase();
              v2 = v2.toLowerCase();
            }
            if (v1 === v2)
              return 0;
            return v1 < v2 ? -1 : 1;
          } else {
            return t1 < t2 ? -1 : 1;
          }
        }
      };
    }
    function ngDirective(directive) {
      if (isFunction(directive)) {
        directive = { link: directive };
      }
      directive.restrict = directive.restrict || 'AC';
      return valueFn(directive);
    }
    var htmlAnchorDirective = valueFn({
        restrict: 'E',
        compile: function (element, attr) {
          if (msie <= 8) {
            if (!attr.href && !attr.name) {
              attr.$set('href', '');
            }
            element.append(document.createComment('IE fix'));
          }
          return function (scope, element) {
            element.bind('click', function (event) {
              if (!element.attr('href')) {
                event.preventDefault();
              }
            });
          };
        }
      });
    var ngAttributeAliasDirectives = {};
    forEach(BOOLEAN_ATTR, function (propName, attrName) {
      var normalized = directiveNormalize('ng-' + attrName);
      ngAttributeAliasDirectives[normalized] = function () {
        return {
          priority: 100,
          compile: function () {
            return function (scope, element, attr) {
              scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
                attr.$set(attrName, !!value);
              });
            };
          }
        };
      };
    });
    forEach([
      'src',
      'href'
    ], function (attrName) {
      var normalized = directiveNormalize('ng-' + attrName);
      ngAttributeAliasDirectives[normalized] = function () {
        return {
          priority: 99,
          link: function (scope, element, attr) {
            attr.$observe(normalized, function (value) {
              if (!value)
                return;
              attr.$set(attrName, value);
              if (msie)
                element.prop(attrName, attr[attrName]);
            });
          }
        };
      };
    });
    var nullFormCtrl = {
        $addControl: noop,
        $removeControl: noop,
        $setValidity: noop,
        $setDirty: noop
      };
    FormController.$inject = [
      '$element',
      '$attrs',
      '$scope'
    ];
    function FormController(element, attrs) {
      var form = this, parentForm = element.parent().controller('form') || nullFormCtrl, invalidCount = 0, errors = form.$error = {};
      form.$name = attrs.name || attrs.ngForm;
      form.$dirty = false;
      form.$pristine = true;
      form.$valid = true;
      form.$invalid = false;
      parentForm.$addControl(form);
      element.addClass(PRISTINE_CLASS);
      toggleValidCss(true);
      function toggleValidCss(isValid, validationErrorKey) {
        validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
        element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
      }
      form.$addControl = function (control) {
        if (control.$name && !form.hasOwnProperty(control.$name)) {
          form[control.$name] = control;
        }
      };
      form.$removeControl = function (control) {
        if (control.$name && form[control.$name] === control) {
          delete form[control.$name];
        }
        forEach(errors, function (queue, validationToken) {
          form.$setValidity(validationToken, true, control);
        });
      };
      form.$setValidity = function (validationToken, isValid, control) {
        var queue = errors[validationToken];
        if (isValid) {
          if (queue) {
            arrayRemove(queue, control);
            if (!queue.length) {
              invalidCount--;
              if (!invalidCount) {
                toggleValidCss(isValid);
                form.$valid = true;
                form.$invalid = false;
              }
              errors[validationToken] = false;
              toggleValidCss(true, validationToken);
              parentForm.$setValidity(validationToken, true, form);
            }
          }
        } else {
          if (!invalidCount) {
            toggleValidCss(isValid);
          }
          if (queue) {
            if (includes(queue, control))
              return;
          } else {
            errors[validationToken] = queue = [];
            invalidCount++;
            toggleValidCss(false, validationToken);
            parentForm.$setValidity(validationToken, false, form);
          }
          queue.push(control);
          form.$valid = false;
          form.$invalid = true;
        }
      };
      form.$setDirty = function () {
        element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
        form.$dirty = true;
        form.$pristine = false;
        parentForm.$setDirty();
      };
    }
    var formDirectiveFactory = function (isNgForm) {
      return [
        '$timeout',
        function ($timeout) {
          var formDirective = {
              name: 'form',
              restrict: 'E',
              controller: FormController,
              compile: function () {
                return {
                  pre: function (scope, formElement, attr, controller) {
                    if (!attr.action) {
                      var preventDefaultListener = function (event) {
                        event.preventDefault ? event.preventDefault() : event.returnValue = false;
                      };
                      addEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                      formElement.bind('$destroy', function () {
                        $timeout(function () {
                          removeEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                        }, 0, false);
                      });
                    }
                    var parentFormCtrl = formElement.parent().controller('form'), alias = attr.name || attr.ngForm;
                    if (alias) {
                      scope[alias] = controller;
                    }
                    if (parentFormCtrl) {
                      formElement.bind('$destroy', function () {
                        parentFormCtrl.$removeControl(controller);
                        if (alias) {
                          scope[alias] = undefined;
                        }
                        extend(controller, nullFormCtrl);
                      });
                    }
                  }
                };
              }
            };
          return isNgForm ? extend(copy(formDirective), { restrict: 'EAC' }) : formDirective;
        }
      ];
    };
    var formDirective = formDirectiveFactory();
    var ngFormDirective = formDirectiveFactory(true);
    var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
    var inputType = {
        'text': textInputType,
        'number': numberInputType,
        'url': urlInputType,
        'email': emailInputType,
        'radio': radioInputType,
        'checkbox': checkboxInputType,
        'hidden': noop,
        'button': noop,
        'submit': noop,
        'reset': noop
      };
    function isEmpty(value) {
      return isUndefined(value) || value === '' || value === null || value !== value;
    }
    function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
      var listener = function () {
        var value = trim(element.val());
        if (ctrl.$viewValue !== value) {
          scope.$apply(function () {
            ctrl.$setViewValue(value);
          });
        }
      };
      if ($sniffer.hasEvent('input')) {
        element.bind('input', listener);
      } else {
        var timeout;
        var deferListener = function () {
          if (!timeout) {
            timeout = $browser.defer(function () {
              listener();
              timeout = null;
            });
          }
        };
        element.bind('keydown', function (event) {
          var key = event.keyCode;
          if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40)
            return;
          deferListener();
        });
        element.bind('change', listener);
        if ($sniffer.hasEvent('paste')) {
          element.bind('paste cut', deferListener);
        }
      }
      ctrl.$render = function () {
        element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
      };
      var pattern = attr.ngPattern, patternValidator;
      var validate = function (regexp, value) {
        if (isEmpty(value) || regexp.test(value)) {
          ctrl.$setValidity('pattern', true);
          return value;
        } else {
          ctrl.$setValidity('pattern', false);
          return undefined;
        }
      };
      if (pattern) {
        if (pattern.match(/^\/(.*)\/$/)) {
          pattern = new RegExp(pattern.substr(1, pattern.length - 2));
          patternValidator = function (value) {
            return validate(pattern, value);
          };
        } else {
          patternValidator = function (value) {
            var patternObj = scope.$eval(pattern);
            if (!patternObj || !patternObj.test) {
              throw new Error('Expected ' + pattern + ' to be a RegExp but was ' + patternObj);
            }
            return validate(patternObj, value);
          };
        }
        ctrl.$formatters.push(patternValidator);
        ctrl.$parsers.push(patternValidator);
      }
      if (attr.ngMinlength) {
        var minlength = int(attr.ngMinlength);
        var minLengthValidator = function (value) {
          if (!isEmpty(value) && value.length < minlength) {
            ctrl.$setValidity('minlength', false);
            return undefined;
          } else {
            ctrl.$setValidity('minlength', true);
            return value;
          }
        };
        ctrl.$parsers.push(minLengthValidator);
        ctrl.$formatters.push(minLengthValidator);
      }
      if (attr.ngMaxlength) {
        var maxlength = int(attr.ngMaxlength);
        var maxLengthValidator = function (value) {
          if (!isEmpty(value) && value.length > maxlength) {
            ctrl.$setValidity('maxlength', false);
            return undefined;
          } else {
            ctrl.$setValidity('maxlength', true);
            return value;
          }
        };
        ctrl.$parsers.push(maxLengthValidator);
        ctrl.$formatters.push(maxLengthValidator);
      }
    }
    function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
      textInputType(scope, element, attr, ctrl, $sniffer, $browser);
      ctrl.$parsers.push(function (value) {
        var empty = isEmpty(value);
        if (empty || NUMBER_REGEXP.test(value)) {
          ctrl.$setValidity('number', true);
          return value === '' ? null : empty ? value : parseFloat(value);
        } else {
          ctrl.$setValidity('number', false);
          return undefined;
        }
      });
      ctrl.$formatters.push(function (value) {
        return isEmpty(value) ? '' : '' + value;
      });
      if (attr.min) {
        var min = parseFloat(attr.min);
        var minValidator = function (value) {
          if (!isEmpty(value) && value < min) {
            ctrl.$setValidity('min', false);
            return undefined;
          } else {
            ctrl.$setValidity('min', true);
            return value;
          }
        };
        ctrl.$parsers.push(minValidator);
        ctrl.$formatters.push(minValidator);
      }
      if (attr.max) {
        var max = parseFloat(attr.max);
        var maxValidator = function (value) {
          if (!isEmpty(value) && value > max) {
            ctrl.$setValidity('max', false);
            return undefined;
          } else {
            ctrl.$setValidity('max', true);
            return value;
          }
        };
        ctrl.$parsers.push(maxValidator);
        ctrl.$formatters.push(maxValidator);
      }
      ctrl.$formatters.push(function (value) {
        if (isEmpty(value) || isNumber(value)) {
          ctrl.$setValidity('number', true);
          return value;
        } else {
          ctrl.$setValidity('number', false);
          return undefined;
        }
      });
    }
    function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
      textInputType(scope, element, attr, ctrl, $sniffer, $browser);
      var urlValidator = function (value) {
        if (isEmpty(value) || URL_REGEXP.test(value)) {
          ctrl.$setValidity('url', true);
          return value;
        } else {
          ctrl.$setValidity('url', false);
          return undefined;
        }
      };
      ctrl.$formatters.push(urlValidator);
      ctrl.$parsers.push(urlValidator);
    }
    function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
      textInputType(scope, element, attr, ctrl, $sniffer, $browser);
      var emailValidator = function (value) {
        if (isEmpty(value) || EMAIL_REGEXP.test(value)) {
          ctrl.$setValidity('email', true);
          return value;
        } else {
          ctrl.$setValidity('email', false);
          return undefined;
        }
      };
      ctrl.$formatters.push(emailValidator);
      ctrl.$parsers.push(emailValidator);
    }
    function radioInputType(scope, element, attr, ctrl) {
      if (isUndefined(attr.name)) {
        element.attr('name', nextUid());
      }
      element.bind('click', function () {
        if (element[0].checked) {
          scope.$apply(function () {
            ctrl.$setViewValue(attr.value);
          });
        }
      });
      ctrl.$render = function () {
        var value = attr.value;
        element[0].checked = value == ctrl.$viewValue;
      };
      attr.$observe('value', ctrl.$render);
    }
    function checkboxInputType(scope, element, attr, ctrl) {
      var trueValue = attr.ngTrueValue, falseValue = attr.ngFalseValue;
      if (!isString(trueValue))
        trueValue = true;
      if (!isString(falseValue))
        falseValue = false;
      element.bind('click', function () {
        scope.$apply(function () {
          ctrl.$setViewValue(element[0].checked);
        });
      });
      ctrl.$render = function () {
        element[0].checked = ctrl.$viewValue;
      };
      ctrl.$formatters.push(function (value) {
        return value === trueValue;
      });
      ctrl.$parsers.push(function (value) {
        return value ? trueValue : falseValue;
      });
    }
    var inputDirective = [
        '$browser',
        '$sniffer',
        function ($browser, $sniffer) {
          return {
            restrict: 'E',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
              if (ctrl) {
                (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser);
              }
            }
          };
        }
      ];
    var VALID_CLASS = 'ng-valid', INVALID_CLASS = 'ng-invalid', PRISTINE_CLASS = 'ng-pristine', DIRTY_CLASS = 'ng-dirty';
    var NgModelController = [
        '$scope',
        '$exceptionHandler',
        '$attrs',
        '$element',
        '$parse',
        function ($scope, $exceptionHandler, $attr, $element, $parse) {
          this.$viewValue = Number.NaN;
          this.$modelValue = Number.NaN;
          this.$parsers = [];
          this.$formatters = [];
          this.$viewChangeListeners = [];
          this.$pristine = true;
          this.$dirty = false;
          this.$valid = true;
          this.$invalid = false;
          this.$name = $attr.name;
          var ngModelGet = $parse($attr.ngModel), ngModelSet = ngModelGet.assign;
          if (!ngModelSet) {
            throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + $attr.ngModel + ' (' + startingTag($element) + ')');
          }
          this.$render = noop;
          var parentForm = $element.inheritedData('$formController') || nullFormCtrl, invalidCount = 0, $error = this.$error = {};
          $element.addClass(PRISTINE_CLASS);
          toggleValidCss(true);
          function toggleValidCss(isValid, validationErrorKey) {
            validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
            $element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
          }
          this.$setValidity = function (validationErrorKey, isValid) {
            if ($error[validationErrorKey] === !isValid)
              return;
            if (isValid) {
              if ($error[validationErrorKey])
                invalidCount--;
              if (!invalidCount) {
                toggleValidCss(true);
                this.$valid = true;
                this.$invalid = false;
              }
            } else {
              toggleValidCss(false);
              this.$invalid = true;
              this.$valid = false;
              invalidCount++;
            }
            $error[validationErrorKey] = !isValid;
            toggleValidCss(isValid, validationErrorKey);
            parentForm.$setValidity(validationErrorKey, isValid, this);
          };
          this.$setViewValue = function (value) {
            this.$viewValue = value;
            if (this.$pristine) {
              this.$dirty = true;
              this.$pristine = false;
              $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
              parentForm.$setDirty();
            }
            forEach(this.$parsers, function (fn) {
              value = fn(value);
            });
            if (this.$modelValue !== value) {
              this.$modelValue = value;
              ngModelSet($scope, value);
              forEach(this.$viewChangeListeners, function (listener) {
                try {
                  listener();
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
            }
          };
          var ctrl = this;
          $scope.$watch(function ngModelWatch() {
            var value = ngModelGet($scope);
            if (ctrl.$modelValue !== value) {
              var formatters = ctrl.$formatters, idx = formatters.length;
              ctrl.$modelValue = value;
              while (idx--) {
                value = formatters[idx](value);
              }
              if (ctrl.$viewValue !== value) {
                ctrl.$viewValue = value;
                ctrl.$render();
              }
            }
          });
        }
      ];
    var ngModelDirective = function () {
      return {
        require: [
          'ngModel',
          '^?form'
        ],
        controller: NgModelController,
        link: function (scope, element, attr, ctrls) {
          var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
          formCtrl.$addControl(modelCtrl);
          element.bind('$destroy', function () {
            formCtrl.$removeControl(modelCtrl);
          });
        }
      };
    };
    var ngChangeDirective = valueFn({
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
          ctrl.$viewChangeListeners.push(function () {
            scope.$eval(attr.ngChange);
          });
        }
      });
    var requiredDirective = function () {
      return {
        require: '?ngModel',
        link: function (scope, elm, attr, ctrl) {
          if (!ctrl)
            return;
          attr.required = true;
          var validator = function (value) {
            if (attr.required && (isEmpty(value) || value === false)) {
              ctrl.$setValidity('required', false);
              return;
            } else {
              ctrl.$setValidity('required', true);
              return value;
            }
          };
          ctrl.$formatters.push(validator);
          ctrl.$parsers.unshift(validator);
          attr.$observe('required', function () {
            validator(ctrl.$viewValue);
          });
        }
      };
    };
    var ngListDirective = function () {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
          var match = /\/(.*)\//.exec(attr.ngList), separator = match && new RegExp(match[1]) || attr.ngList || ',';
          var parse = function (viewValue) {
            var list = [];
            if (viewValue) {
              forEach(viewValue.split(separator), function (value) {
                if (value)
                  list.push(trim(value));
              });
            }
            return list;
          };
          ctrl.$parsers.push(parse);
          ctrl.$formatters.push(function (value) {
            if (isArray(value)) {
              return value.join(', ');
            }
            return undefined;
          });
        }
      };
    };
    var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
    var ngValueDirective = function () {
      return {
        priority: 100,
        compile: function (tpl, tplAttr) {
          if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
            return function (scope, elm, attr) {
              attr.$set('value', scope.$eval(attr.ngValue));
            };
          } else {
            return function (scope, elm, attr) {
              scope.$watch(attr.ngValue, function valueWatchAction(value) {
                attr.$set('value', value);
              });
            };
          }
        }
      };
    };
    var ngBindDirective = ngDirective(function (scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.ngBind);
        scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
          element.text(value == undefined ? '' : value);
        });
      });
    var ngBindTemplateDirective = [
        '$interpolate',
        function ($interpolate) {
          return function (scope, element, attr) {
            var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
            element.addClass('ng-binding').data('$binding', interpolateFn);
            attr.$observe('ngBindTemplate', function (value) {
              element.text(value);
            });
          };
        }
      ];
    var ngBindHtmlUnsafeDirective = [function () {
          return function (scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
            scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
              element.html(value || '');
            });
          };
        }];
    function classDirective(name, selector) {
      name = 'ngClass' + name;
      return ngDirective(function (scope, element, attr) {
        var oldVal = undefined;
        scope.$watch(attr[name], ngClassWatchAction, true);
        attr.$observe('class', function (value) {
          var ngClass = scope.$eval(attr[name]);
          ngClassWatchAction(ngClass, ngClass);
        });
        if (name !== 'ngClass') {
          scope.$watch('$index', function ($index, old$index) {
            var mod = $index & 1;
            if (mod !== old$index & 1) {
              if (mod === selector) {
                addClass(scope.$eval(attr[name]));
              } else {
                removeClass(scope.$eval(attr[name]));
              }
            }
          });
        }
        function ngClassWatchAction(newVal) {
          if (selector === true || scope.$index % 2 === selector) {
            if (oldVal && !equals(newVal, oldVal)) {
              removeClass(oldVal);
            }
            addClass(newVal);
          }
          oldVal = copy(newVal);
        }
        function removeClass(classVal) {
          if (isObject(classVal) && !isArray(classVal)) {
            classVal = map(classVal, function (v, k) {
              if (v)
                return k;
            });
          }
          element.removeClass(isArray(classVal) ? classVal.join(' ') : classVal);
        }
        function addClass(classVal) {
          if (isObject(classVal) && !isArray(classVal)) {
            classVal = map(classVal, function (v, k) {
              if (v)
                return k;
            });
          }
          if (classVal) {
            element.addClass(isArray(classVal) ? classVal.join(' ') : classVal);
          }
        }
      });
    }
    var ngClassDirective = classDirective('', true);
    var ngClassOddDirective = classDirective('Odd', 0);
    var ngClassEvenDirective = classDirective('Even', 1);
    var ngCloakDirective = ngDirective({
        compile: function (element, attr) {
          attr.$set('ngCloak', undefined);
          element.removeClass('ng-cloak');
        }
      });
    var ngControllerDirective = [function () {
          return {
            scope: true,
            controller: '@'
          };
        }];
    var ngCspDirective = [
        '$sniffer',
        function ($sniffer) {
          return {
            priority: 1000,
            compile: function () {
              $sniffer.csp = true;
            }
          };
        }
      ];
    var ngEventDirectives = {};
    forEach('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave submit'.split(' '), function (name) {
      var directiveName = directiveNormalize('ng-' + name);
      ngEventDirectives[directiveName] = [
        '$parse',
        function ($parse) {
          return function (scope, element, attr) {
            var fn = $parse(attr[directiveName]);
            element.bind(lowercase(name), function (event) {
              scope.$apply(function () {
                fn(scope, { $event: event });
              });
            });
          };
        }
      ];
    });
    var ngIncludeDirective = [
        '$http',
        '$templateCache',
        '$anchorScroll',
        '$compile',
        function ($http, $templateCache, $anchorScroll, $compile) {
          return {
            restrict: 'ECA',
            terminal: true,
            compile: function (element, attr) {
              var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || '', autoScrollExp = attr.autoscroll;
              return function (scope, element) {
                var changeCounter = 0, childScope;
                var clearContent = function () {
                  if (childScope) {
                    childScope.$destroy();
                    childScope = null;
                  }
                  element.html('');
                };
                scope.$watch(srcExp, function ngIncludeWatchAction(src) {
                  var thisChangeId = ++changeCounter;
                  if (src) {
                    $http.get(src, { cache: $templateCache }).success(function (response) {
                      if (thisChangeId !== changeCounter)
                        return;
                      if (childScope)
                        childScope.$destroy();
                      childScope = scope.$new();
                      element.html(response);
                      $compile(element.contents())(childScope);
                      if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                        $anchorScroll();
                      }
                      childScope.$emit('$includeContentLoaded');
                      scope.$eval(onloadExp);
                    }).error(function () {
                      if (thisChangeId === changeCounter)
                        clearContent();
                    });
                  } else
                    clearContent();
                });
              };
            }
          };
        }
      ];
    var ngInitDirective = ngDirective({
        compile: function () {
          return {
            pre: function (scope, element, attrs) {
              scope.$eval(attrs.ngInit);
            }
          };
        }
      });
    var ngNonBindableDirective = ngDirective({
        terminal: true,
        priority: 1000
      });
    var ngPluralizeDirective = [
        '$locale',
        '$interpolate',
        function ($locale, $interpolate) {
          var BRACE = /{}/g;
          return {
            restrict: 'EA',
            link: function (scope, element, attr) {
              var numberExp = attr.count, whenExp = element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp), whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol();
              forEach(whens, function (expression, key) {
                whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + '-' + offset + endSymbol));
              });
              scope.$watch(function ngPluralizeWatch() {
                var value = parseFloat(scope.$eval(numberExp));
                if (!isNaN(value)) {
                  if (!(value in whens))
                    value = $locale.pluralCat(value - offset);
                  return whensExpFns[value](scope, element, true);
                } else {
                  return '';
                }
              }, function ngPluralizeWatchAction(newVal) {
                element.text(newVal);
              });
            }
          };
        }
      ];
    var ngRepeatDirective = ngDirective({
        transclude: 'element',
        priority: 1000,
        terminal: true,
        compile: function (element, attr, linker) {
          return function (scope, iterStartElement, attr) {
            var expression = attr.ngRepeat;
            var match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/), lhs, rhs, valueIdent, keyIdent;
            if (!match) {
              throw Error('Expected ngRepeat in form of \'_item_ in _collection_\' but got \'' + expression + '\'.');
            }
            lhs = match[1];
            rhs = match[2];
            match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
            if (!match) {
              throw Error('\'item\' in \'item in collection\' should be identifier or (key, value) but got \'' + lhs + '\'.');
            }
            valueIdent = match[3] || match[1];
            keyIdent = match[2];
            var lastOrder = new HashQueueMap();
            scope.$watch(function ngRepeatWatch(scope) {
              var index, length, collection = scope.$eval(rhs), cursor = iterStartElement, nextOrder = new HashQueueMap(), arrayBound, childScope, key, value, array, last;
              if (!isArray(collection)) {
                array = [];
                for (key in collection) {
                  if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                    array.push(key);
                  }
                }
                array.sort();
              } else {
                array = collection || [];
              }
              arrayBound = array.length - 1;
              for (index = 0, length = array.length; index < length; index++) {
                key = collection === array ? index : array[index];
                value = collection[key];
                last = lastOrder.shift(value);
                if (last) {
                  childScope = last.scope;
                  nextOrder.push(value, last);
                  if (index === last.index) {
                    cursor = last.element;
                  } else {
                    last.index = index;
                    cursor.after(last.element);
                    cursor = last.element;
                  }
                } else {
                  childScope = scope.$new();
                }
                childScope[valueIdent] = value;
                if (keyIdent)
                  childScope[keyIdent] = key;
                childScope.$index = index;
                childScope.$first = index === 0;
                childScope.$last = index === arrayBound;
                childScope.$middle = !(childScope.$first || childScope.$last);
                if (!last) {
                  linker(childScope, function (clone) {
                    cursor.after(clone);
                    last = {
                      scope: childScope,
                      element: cursor = clone,
                      index: index
                    };
                    nextOrder.push(value, last);
                  });
                }
              }
              for (key in lastOrder) {
                if (lastOrder.hasOwnProperty(key)) {
                  array = lastOrder[key];
                  while (array.length) {
                    value = array.pop();
                    value.element.remove();
                    value.scope.$destroy();
                  }
                }
              }
              lastOrder = nextOrder;
            });
          };
        }
      });
    var ngShowDirective = ngDirective(function (scope, element, attr) {
        scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
          element.css('display', toBoolean(value) ? '' : 'none');
        });
      });
    var ngHideDirective = ngDirective(function (scope, element, attr) {
        scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
          element.css('display', toBoolean(value) ? 'none' : '');
        });
      });
    var ngStyleDirective = ngDirective(function (scope, element, attr) {
        scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
          if (oldStyles && newStyles !== oldStyles) {
            forEach(oldStyles, function (val, style) {
              element.css(style, '');
            });
          }
          if (newStyles)
            element.css(newStyles);
        }, true);
      });
    var NG_SWITCH = 'ng-switch';
    var ngSwitchDirective = valueFn({
        restrict: 'EA',
        require: 'ngSwitch',
        controller: [
          '$scope',
          function ngSwitchController() {
            this.cases = {};
          }
        ],
        link: function (scope, element, attr, ctrl) {
          var watchExpr = attr.ngSwitch || attr.on, selectedTransclude, selectedElement, selectedScope;
          scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
            if (selectedElement) {
              selectedScope.$destroy();
              selectedElement.remove();
              selectedElement = selectedScope = null;
            }
            if (selectedTransclude = ctrl.cases['!' + value] || ctrl.cases['?']) {
              scope.$eval(attr.change);
              selectedScope = scope.$new();
              selectedTransclude(selectedScope, function (caseElement) {
                selectedElement = caseElement;
                element.append(caseElement);
              });
            }
          });
        }
      });
    var ngSwitchWhenDirective = ngDirective({
        transclude: 'element',
        priority: 500,
        require: '^ngSwitch',
        compile: function (element, attrs, transclude) {
          return function (scope, element, attr, ctrl) {
            ctrl.cases['!' + attrs.ngSwitchWhen] = transclude;
          };
        }
      });
    var ngSwitchDefaultDirective = ngDirective({
        transclude: 'element',
        priority: 500,
        require: '^ngSwitch',
        compile: function (element, attrs, transclude) {
          return function (scope, element, attr, ctrl) {
            ctrl.cases['?'] = transclude;
          };
        }
      });
    var ngTranscludeDirective = ngDirective({
        controller: [
          '$transclude',
          '$element',
          function ($transclude, $element) {
            $transclude(function (clone) {
              $element.append(clone);
            });
          }
        ]
      });
    var ngViewDirective = [
        '$http',
        '$templateCache',
        '$route',
        '$anchorScroll',
        '$compile',
        '$controller',
        function ($http, $templateCache, $route, $anchorScroll, $compile, $controller) {
          return {
            restrict: 'ECA',
            terminal: true,
            link: function (scope, element, attr) {
              var lastScope, onloadExp = attr.onload || '';
              scope.$on('$routeChangeSuccess', update);
              update();
              function destroyLastScope() {
                if (lastScope) {
                  lastScope.$destroy();
                  lastScope = null;
                }
              }
              function clearContent() {
                element.html('');
                destroyLastScope();
              }
              function update() {
                var locals = $route.current && $route.current.locals, template = locals && locals.$template;
                if (template) {
                  element.html(template);
                  destroyLastScope();
                  var link = $compile(element.contents()), current = $route.current, controller;
                  lastScope = current.scope = scope.$new();
                  if (current.controller) {
                    locals.$scope = lastScope;
                    controller = $controller(current.controller, locals);
                    element.children().data('$ngControllerController', controller);
                  }
                  link(lastScope);
                  lastScope.$emit('$viewContentLoaded');
                  lastScope.$eval(onloadExp);
                  $anchorScroll();
                } else {
                  clearContent();
                }
              }
            }
          };
        }
      ];
    var scriptDirective = [
        '$templateCache',
        function ($templateCache) {
          return {
            restrict: 'E',
            terminal: true,
            compile: function (element, attr) {
              if (attr.type == 'text/ng-template') {
                var templateUrl = attr.id, text = element[0].text;
                $templateCache.put(templateUrl, text);
              }
            }
          };
        }
      ];
    var ngOptionsDirective = valueFn({ terminal: true });
    var selectDirective = [
        '$compile',
        '$parse',
        function ($compile, $parse) {
          var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/, nullModelCtrl = { $setViewValue: noop };
          return {
            restrict: 'E',
            require: [
              'select',
              '?ngModel'
            ],
            controller: [
              '$element',
              '$scope',
              '$attrs',
              function ($element, $scope, $attrs) {
                var self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl, nullOption, unknownOption;
                self.databound = $attrs.ngModel;
                self.init = function (ngModelCtrl_, nullOption_, unknownOption_) {
                  ngModelCtrl = ngModelCtrl_;
                  nullOption = nullOption_;
                  unknownOption = unknownOption_;
                };
                self.addOption = function (value) {
                  optionsMap[value] = true;
                  if (ngModelCtrl.$viewValue == value) {
                    $element.val(value);
                    if (unknownOption.parent())
                      unknownOption.remove();
                  }
                };
                self.removeOption = function (value) {
                  if (this.hasOption(value)) {
                    delete optionsMap[value];
                    if (ngModelCtrl.$viewValue == value) {
                      this.renderUnknownOption(value);
                    }
                  }
                };
                self.renderUnknownOption = function (val) {
                  var unknownVal = '? ' + hashKey(val) + ' ?';
                  unknownOption.val(unknownVal);
                  $element.prepend(unknownOption);
                  $element.val(unknownVal);
                  unknownOption.prop('selected', true);
                };
                self.hasOption = function (value) {
                  return optionsMap.hasOwnProperty(value);
                };
                $scope.$on('$destroy', function () {
                  self.renderUnknownOption = noop;
                });
              }
            ],
            link: function (scope, element, attr, ctrls) {
              if (!ctrls[1])
                return;
              var selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = false, emptyOption, optionTemplate = jqLite(document.createElement('option')), optGroupTemplate = jqLite(document.createElement('optgroup')), unknownOption = optionTemplate.clone();
              for (var i = 0, children = element.children(), ii = children.length; i < ii; i++) {
                if (children[i].value == '') {
                  emptyOption = nullOption = children.eq(i);
                  break;
                }
              }
              selectCtrl.init(ngModelCtrl, nullOption, unknownOption);
              if (multiple && (attr.required || attr.ngRequired)) {
                var requiredValidator = function (value) {
                  ngModelCtrl.$setValidity('required', !attr.required || value && value.length);
                  return value;
                };
                ngModelCtrl.$parsers.push(requiredValidator);
                ngModelCtrl.$formatters.unshift(requiredValidator);
                attr.$observe('required', function () {
                  requiredValidator(ngModelCtrl.$viewValue);
                });
              }
              if (optionsExp)
                Options(scope, element, ngModelCtrl);
              else if (multiple)
                Multiple(scope, element, ngModelCtrl);
              else
                Single(scope, element, ngModelCtrl, selectCtrl);
              function Single(scope, selectElement, ngModelCtrl, selectCtrl) {
                ngModelCtrl.$render = function () {
                  var viewValue = ngModelCtrl.$viewValue;
                  if (selectCtrl.hasOption(viewValue)) {
                    if (unknownOption.parent())
                      unknownOption.remove();
                    selectElement.val(viewValue);
                    if (viewValue === '')
                      emptyOption.prop('selected', true);
                  } else {
                    if (isUndefined(viewValue) && emptyOption) {
                      selectElement.val('');
                    } else {
                      selectCtrl.renderUnknownOption(viewValue);
                    }
                  }
                };
                selectElement.bind('change', function () {
                  scope.$apply(function () {
                    if (unknownOption.parent())
                      unknownOption.remove();
                    ngModelCtrl.$setViewValue(selectElement.val());
                  });
                });
              }
              function Multiple(scope, selectElement, ctrl) {
                var lastView;
                ctrl.$render = function () {
                  var items = new HashMap(ctrl.$viewValue);
                  forEach(selectElement.find('option'), function (option) {
                    option.selected = isDefined(items.get(option.value));
                  });
                };
                scope.$watch(function selectMultipleWatch() {
                  if (!equals(lastView, ctrl.$viewValue)) {
                    lastView = copy(ctrl.$viewValue);
                    ctrl.$render();
                  }
                });
                selectElement.bind('change', function () {
                  scope.$apply(function () {
                    var array = [];
                    forEach(selectElement.find('option'), function (option) {
                      if (option.selected) {
                        array.push(option.value);
                      }
                    });
                    ctrl.$setViewValue(array);
                  });
                });
              }
              function Options(scope, selectElement, ctrl) {
                var match;
                if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
                  throw Error('Expected ngOptions in form of \'_select_ (as _label_)? for (_key_,)?_value_ in _collection_\'' + ' but got \'' + optionsExp + '\'.');
                }
                var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), optionGroupsCache = [[{
                        element: selectElement,
                        label: ''
                      }]];
                if (nullOption) {
                  $compile(nullOption)(scope);
                  nullOption.removeClass('ng-scope');
                  nullOption.remove();
                }
                selectElement.html('');
                selectElement.bind('change', function () {
                  scope.$apply(function () {
                    var optionGroup, collection = valuesFn(scope) || [], locals = {}, key, value, optionElement, index, groupIndex, length, groupLength;
                    if (multiple) {
                      value = [];
                      for (groupIndex = 0, groupLength = optionGroupsCache.length; groupIndex < groupLength; groupIndex++) {
                        optionGroup = optionGroupsCache[groupIndex];
                        for (index = 1, length = optionGroup.length; index < length; index++) {
                          if ((optionElement = optionGroup[index].element)[0].selected) {
                            key = optionElement.val();
                            if (keyName)
                              locals[keyName] = key;
                            locals[valueName] = collection[key];
                            value.push(valueFn(scope, locals));
                          }
                        }
                      }
                    } else {
                      key = selectElement.val();
                      if (key == '?') {
                        value = undefined;
                      } else if (key == '') {
                        value = null;
                      } else {
                        locals[valueName] = collection[key];
                        if (keyName)
                          locals[keyName] = key;
                        value = valueFn(scope, locals);
                      }
                    }
                    ctrl.$setViewValue(value);
                  });
                });
                ctrl.$render = render;
                scope.$watch(render);
                function render() {
                  var optionGroups = { '': [] }, optionGroupNames = [''], optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, modelValue = ctrl.$modelValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, groupLength, length, groupIndex, index, locals = {}, selected, selectedSet = false, lastElement, element, label;
                  if (multiple) {
                    selectedSet = new HashMap(modelValue);
                  }
                  for (index = 0; length = keys.length, index < length; index++) {
                    locals[valueName] = values[keyName ? locals[keyName] = keys[index] : index];
                    optionGroupName = groupByFn(scope, locals) || '';
                    if (!(optionGroup = optionGroups[optionGroupName])) {
                      optionGroup = optionGroups[optionGroupName] = [];
                      optionGroupNames.push(optionGroupName);
                    }
                    if (multiple) {
                      selected = selectedSet.remove(valueFn(scope, locals)) != undefined;
                    } else {
                      selected = modelValue === valueFn(scope, locals);
                      selectedSet = selectedSet || selected;
                    }
                    label = displayFn(scope, locals);
                    label = label === undefined ? '' : label;
                    optionGroup.push({
                      id: keyName ? keys[index] : index,
                      label: label,
                      selected: selected
                    });
                  }
                  if (!multiple) {
                    if (nullOption || modelValue === null) {
                      optionGroups[''].unshift({
                        id: '',
                        label: '',
                        selected: !selectedSet
                      });
                    } else if (!selectedSet) {
                      optionGroups[''].unshift({
                        id: '?',
                        label: '',
                        selected: true
                      });
                    }
                  }
                  for (groupIndex = 0, groupLength = optionGroupNames.length; groupIndex < groupLength; groupIndex++) {
                    optionGroupName = optionGroupNames[groupIndex];
                    optionGroup = optionGroups[optionGroupName];
                    if (optionGroupsCache.length <= groupIndex) {
                      existingParent = {
                        element: optGroupTemplate.clone().attr('label', optionGroupName),
                        label: optionGroup.label
                      };
                      existingOptions = [existingParent];
                      optionGroupsCache.push(existingOptions);
                      selectElement.append(existingParent.element);
                    } else {
                      existingOptions = optionGroupsCache[groupIndex];
                      existingParent = existingOptions[0];
                      if (existingParent.label != optionGroupName) {
                        existingParent.element.attr('label', existingParent.label = optionGroupName);
                      }
                    }
                    lastElement = null;
                    for (index = 0, length = optionGroup.length; index < length; index++) {
                      option = optionGroup[index];
                      if (existingOption = existingOptions[index + 1]) {
                        lastElement = existingOption.element;
                        if (existingOption.label !== option.label) {
                          lastElement.text(existingOption.label = option.label);
                        }
                        if (existingOption.id !== option.id) {
                          lastElement.val(existingOption.id = option.id);
                        }
                        if (lastElement[0].selected !== option.selected) {
                          lastElement.prop('selected', existingOption.selected = option.selected);
                        }
                      } else {
                        if (option.id === '' && nullOption) {
                          element = nullOption;
                        } else {
                          (element = optionTemplate.clone()).val(option.id).attr('selected', option.selected).text(option.label);
                        }
                        existingOptions.push(existingOption = {
                          element: element,
                          label: option.label,
                          id: option.id,
                          selected: option.selected
                        });
                        if (lastElement) {
                          lastElement.after(element);
                        } else {
                          existingParent.element.append(element);
                        }
                        lastElement = element;
                      }
                    }
                    index++;
                    while (existingOptions.length > index) {
                      existingOptions.pop().element.remove();
                    }
                  }
                  while (optionGroupsCache.length > groupIndex) {
                    optionGroupsCache.pop()[0].element.remove();
                  }
                }
              }
            }
          };
        }
      ];
    var optionDirective = [
        '$interpolate',
        function ($interpolate) {
          var nullSelectCtrl = {
              addOption: noop,
              removeOption: noop
            };
          return {
            restrict: 'E',
            priority: 100,
            compile: function (element, attr) {
              if (isUndefined(attr.value)) {
                var interpolateFn = $interpolate(element.text(), true);
                if (!interpolateFn) {
                  attr.$set('value', element.text());
                }
              }
              return function (scope, element, attr) {
                var selectCtrlName = '$selectController', parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                if (selectCtrl && selectCtrl.databound) {
                  element.prop('selected', false);
                } else {
                  selectCtrl = nullSelectCtrl;
                }
                if (interpolateFn) {
                  scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                    attr.$set('value', newVal);
                    if (newVal !== oldVal)
                      selectCtrl.removeOption(oldVal);
                    selectCtrl.addOption(newVal);
                  });
                } else {
                  selectCtrl.addOption(attr.value);
                }
                element.bind('$destroy', function () {
                  selectCtrl.removeOption(attr.value);
                });
              };
            }
          };
        }
      ];
    var styleDirective = valueFn({
        restrict: 'E',
        terminal: true
      });
    bindJQuery();
    publishExternalAPI(angular);
    jqLite(document).ready(function () {
      angularInit(document, bootstrap);
    });
  }(window, document));
  angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none !important;}ng\\:form{display:block;}</style>');
  define('angular', function (global) {
    return function () {
      var ret, fn;
      return ret || global.angular;
    };
  }(this));
  define('controllers/module', ['angular'], function (ng) {
    'use strict';
    return ng.module('app.controllers', []);
  });
  define('controllers/main', ['./module'], function (controllers) {
    'use strict';
    controllers.controller('MainCtrl', [
      '$scope',
      'game',
      function ($scope, game) {
        $scope.game = game;
        $scope.clickPixel = game.clickPixel($scope);
        game.loop($scope);
      }
    ]);
  });
  define('controllers/navigation', ['./module'], function (controllers) {
    'use strict';
    controllers.controller('NavigationCtrl', [
      '$scope',
      function ($scope) {
        $scope.tabs = [
          {
            title: 'Shop',
            content: 'views/navigation/shop.html'
          },
          {
            title: 'Menu',
            content: 'views/navigation/menu.html'
          },
          {
            title: 'Stats',
            content: 'views/navigation/stats.html'
          },
          {
            title: 'Updates',
            content: 'views/navigation/updates.html'
          },
          {
            title: 'About',
            content: 'views/navigation/about.html'
          }
        ];
        $scope.navType = 'pills';
      }
    ]);
  });
  define('controllers/navigation/about', ['../module'], function (controllers) {
    'use strict';
    controllers.controller('AboutCtrl', [
      '$scope',
      function ($scope) {
        $scope.content = 'About';
      }
    ]);
  });
  define('controllers/navigation/menu', ['../module'], function (controllers) {
    'use strict';
    controllers.controller('MenuCtrl', [
      '$scope',
      function ($scope) {
        $scope.content = 'Menu';
      }
    ]);
  });
  define('controllers/navigation/shop', ['../module'], function (controllers) {
    'use strict';
    controllers.controller('ShopCtrl', [
      '$scope',
      'game',
      function ($scope, game) {
        $scope.content = 'Shop';
      }
    ]);
  });
  define('controllers/navigation/stats', ['../module'], function (controllers) {
    'use strict';
    controllers.controller('StatsCtrl', [
      '$scope',
      function ($scope) {
        $scope.content = 'Stats';
      }
    ]);
  });
  define('controllers/navigation/updates', ['../module'], function (controllers) {
    'use strict';
    controllers.controller('UpdatesCtrl', [
      '$scope',
      function ($scope) {
        $scope.content = 'Updates';
      }
    ]);
  });
  define('controllers/navigation/index', [
    './about',
    './menu',
    './shop',
    './stats',
    './updates'
  ], function () {
  });
  define('controllers/index', [
    './main',
    './navigation',
    './navigation/index'
  ], function () {
  });
  define('services/module', ['angular'], function (ng) {
    'use strict';
    return ng.module('app.services', []);
  });
  define('services/game', ['./module'], function (services) {
    'use strict';
    services.service('game', [
      'products',
      function Game(products) {
        return new function (products) {
          var self = this;
          this.title = 'Pixel Clicker';
          this.numberOfClicks = 0;
          this.products = products.getProducts();
          this.formatNumber = function (x, decimal) {
            var parts = x.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            if (decimal) {
              if (parts[1]) {
                parts[1] = parts[1][0];
              } else {
                parts[1] = 0;
              }
            }
            return parts.join('.');
          };
          this.formatInt = function (x) {
            return self.formatNumber(x, false);
          };
          this.formatDecimal = function (x) {
            return self.formatNumber(x, true);
          };
          this.getTitle = function () {
            return self.title;
          };
          this.loop = function (scope) {
            setInterval(function () {
              scope.$apply(function () {
                self.numberOfClicks += self.calculateIncrement();
                scope.numberOfClicks = self.numberOfClicks;
                scope.$root.numberOfClicks = self.formatDecimal(self.numberOfClicks);
              });
            }, 1000 / 60);
          };
          this.clickPixel = function (scope) {
            return function () {
              self.numberOfClicks++;
              scope.numberOfClicks = self.numberOfClicks;
            };
          };
          this.getNumberOfClicks = function () {
            return this.numberOfClicks;
          };
          this.getProducts = function () {
            return this.products;
          };
          this.calculateIncrement = function () {
            var increment = 0;
            var products = this.getProducts();
            for (var product in products) {
              increment += products[product].calculateIncrement();
            }
            return increment;
          };
          this.buy = function (type) {
            var price = products.getProductByType(type).currentPrice;
            if (this.getNumberOfClicks() >= price) {
              products.getProductByType(type).buy();
              this.numberOfClicks -= price;
            }
          };
          this.sell = function (type) {
            var price = products.getProductByType(type).currentPrice;
            products.getProductByType(type).sell();
            this.numberOfClicks += price;
          };
          this.canProductBeBought = function (type) {
            var result = false;
            if (this.getNumberOfClicks() >= products.getProductByType(type).currentPrice) {
              result = true;
            }
            return result;
          };
          this.canProductBeSoled = function (type) {
            return products.getProductByType(type).items.length > 0;
          };
          return this;
        }(products);
      }
    ]);
  });
  define('services/products', ['./module'], function (services) {
    'use strict';
    services.service('products', function Products() {
      var self = this;
      this.buy = function (items) {
        items.items.push({ price: items.currentPrice });
        items.currentPrice += items.currentPrice;
      };
      this.sell = function (items) {
        if (items.items.length >= 1) {
          var current = items.items.pop();
          items.currentPrice = current.price;
        }
      };
      this.calculateIncrement = function (items) {
        return items.items.length * items.productivity;
      };
      this.cursors = {
        name: 'cursors',
        title: 'Cursor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
        image: 'http://placehold.it/100x100',
        quantity: function () {
          return self.getCursors().items.length;
        },
        icon: 'glyphicon-hand-up',
        currentPrice: 10,
        productivity: 0.1,
        items: [],
        buy: function () {
          var items = self.getCursors();
          self.buy(items);
        },
        sell: function () {
          var items = self.getCursors();
          self.sell(items);
        },
        calculateIncrement: function () {
          var items = self.getCursors();
          return self.calculateIncrement(items);
        }
      };
      this.grannies = {
        name: 'grannies',
        title: 'Granny',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
        image: 'http://placehold.it/100x100',
        quantity: function () {
          return self.getGrannies().items.length;
        },
        icon: 'glyphicon-user',
        currentPrice: 200,
        productivity: 0.5,
        items: [],
        buy: function () {
          var items = self.getGrannies();
          self.buy(items);
        },
        sell: function () {
          var items = self.getGrannies();
          self.sell(items);
        },
        calculateIncrement: function () {
          var items = self.getGrannies();
          return self.calculateIncrement(items);
        }
      };
      this.farms = {
        name: 'farms',
        title: 'Farm',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        image: 'http://placehold.it/100x100',
        quantity: function () {
          return self.getFarms().items.length;
        },
        icon: 'glyphicon-cutlery',
        currentPrice: 300,
        productivity: 2,
        items: [],
        buy: function () {
          var items = self.getFarms();
          self.buy(items);
        },
        sell: function () {
          var items = self.getFarms();
          self.sell(items);
        },
        calculateIncrement: function () {
          var items = self.getFarms();
          return self.calculateIncrement(items);
        }
      };
      this.factories = {
        name: 'factories',
        title: 'Factory',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
        image: 'http://placehold.it/100x100',
        quantity: function () {
          return self.getFactories().items.length;
        },
        icon: 'glyphicon-star-empty',
        currentPrice: 400,
        productivity: 10,
        items: [],
        buy: function () {
          var items = self.getFactories();
          self.buy(items);
        },
        sell: function () {
          var items = self.getFactories();
          self.sell(items);
        },
        calculateIncrement: function () {
          var items = self.getFactories();
          return self.calculateIncrement(items);
        }
      };
      this.deliveries = {
        name: 'deliveries',
        title: 'Delivery',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
        image: 'http://placehold.it/100x100',
        quantity: function () {
          return self.getDeliveries().items.length;
        },
        icon: 'glyphicon-plane',
        currentPrice: 500,
        productivity: 40,
        items: [],
        buy: function () {
          var items = self.getDeliveries();
          self.buy(items);
        },
        sell: function () {
          var items = self.getDeliveries();
          self.sell(items);
        },
        calculateIncrement: function () {
          var items = self.getDeliveries();
          return self.calculateIncrement(items);
        }
      };
      this.labs = {
        name: 'labs',
        title: 'Lab',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        image: 'http://placehold.it/100x100',
        quantity: function () {
          return self.getLabs().items.length;
        },
        icon: 'glyphicon-dashboard',
        currentPrice: 600,
        productivity: 100,
        items: [],
        buy: function () {
          var items = self.getLabs();
          self.buy(items);
        },
        sell: function () {
          var items = self.getLabs();
          self.sell(items);
        },
        calculateIncrement: function () {
          var items = self.getLabs();
          return self.calculateIncrement(items);
        }
      };
      this.portals = {
        name: 'portals',
        title: 'Portal',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
        image: 'http://placehold.it/100x100',
        quantity: function () {
          return self.getPortals().items.length;
        },
        icon: 'glyphicon-fire',
        currentPrice: 700,
        productivity: 6666,
        items: [],
        buy: function () {
          var items = self.getPortals();
          self.buy(items);
        },
        sell: function () {
          var items = self.getPortals();
          self.sell(items);
        },
        calculateIncrement: function () {
          var items = self.getPortals();
          return self.calculateIncrement(items);
        }
      };
      this.timeMachines = {
        name: 'timeMachines',
        title: 'Time Machine',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        image: 'http://placehold.it/100x100',
        quantity: function () {
          return self.getTimeMachines().items.length;
        },
        icon: 'glyphicon-certificate',
        currentPrice: 800,
        productivity: 90000,
        items: [],
        buy: function () {
          var items = self.getTimeMachines();
          self.buy(items);
        },
        sell: function () {
          var items = self.getTimeMachines();
          self.sell(items);
        },
        calculateIncrement: function () {
          var items = self.getTimeMachines();
          return self.calculateIncrement(items);
        }
      };
      this.getCursors = function () {
        return this.cursors;
      };
      this.getGrannies = function () {
        return this.grannies;
      };
      this.getFarms = function () {
        return this.farms;
      };
      this.getFactories = function () {
        return this.factories;
      };
      this.getDeliveries = function () {
        return this.deliveries;
      };
      this.getLabs = function () {
        return this.labs;
      };
      this.getPortals = function () {
        return this.portals;
      };
      this.getTimeMachines = function () {
        return this.timeMachines;
      };
      this.getProducts = function () {
        return this.products;
      };
      this.getProductByType = function (type) {
        return this[type];
      };
      this.products = [
        this.getCursors(),
        this.getGrannies(),
        this.getFarms(),
        this.getFactories(),
        this.getDeliveries(),
        this.getLabs(),
        this.getPortals(),
        this.getTimeMachines()
      ];
    });
  });
  define('services/index', [
    './game',
    './products'
  ], function () {
  });
  define('directives/module', ['angular'], function (ng) {
    'use strict';
    return ng.module('app.directives', []);
  });
  (function (window) {
    'use strict';
    var docElem = document.documentElement;
    var bind = function () {
    };
    if (docElem.addEventListener) {
      bind = function (obj, type, fn) {
        obj.addEventListener(type, fn, false);
      };
    } else if (docElem.attachEvent) {
      bind = function (obj, type, fn) {
        obj[type + fn] = fn.handleEvent ? function () {
          var event = window.event;
          event.target = event.target || event.srcElement;
          fn.handleEvent.call(fn, event);
        } : function () {
          var event = window.event;
          event.target = event.target || event.srcElement;
          fn.call(obj, event);
        };
        obj.attachEvent('on' + type, obj[type + fn]);
      };
    }
    var unbind = function () {
    };
    if (docElem.removeEventListener) {
      unbind = function (obj, type, fn) {
        obj.removeEventListener(type, fn, false);
      };
    } else if (docElem.detachEvent) {
      unbind = function (obj, type, fn) {
        obj.detachEvent('on' + type, obj[type + fn]);
        try {
          delete obj[type + fn];
        } catch (err) {
          obj[type + fn] = undefined;
        }
      };
    }
    var eventie = {
        bind: bind,
        unbind: unbind
      };
    if (typeof define === 'function' && define.amd) {
      define('eventie/eventie', eventie);
    } else {
      window.eventie = eventie;
    }
  }(this));
  (function (window) {
    'use strict';
    var document = window.document;
    var queue = [];
    function docReady(fn) {
      if (typeof fn !== 'function') {
        return;
      }
      if (docReady.isReady) {
        fn();
      } else {
        queue.push(fn);
      }
    }
    docReady.isReady = false;
    function init(event) {
      var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
      if (docReady.isReady || isIE8NotReady) {
        return;
      }
      docReady.isReady = true;
      for (var i = 0, len = queue.length; i < len; i++) {
        var fn = queue[i];
        fn();
      }
    }
    function defineDocReady(eventie) {
      eventie.bind(document, 'DOMContentLoaded', init);
      eventie.bind(document, 'readystatechange', init);
      eventie.bind(window, 'load', init);
      return docReady;
    }
    if (typeof define === 'function' && define.amd) {
      docReady.isReady = typeof requirejs === 'function';
      define('doc-ready/doc-ready', ['eventie/eventie'], defineDocReady);
    } else {
      window.docReady = defineDocReady(window.eventie);
    }
  }(this));
  (function () {
    'use strict';
    function EventEmitter() {
    }
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;
    function indexOfListener(listeners, listener) {
      var i = listeners.length;
      while (i--) {
        if (listeners[i].listener === listener) {
          return i;
        }
      }
      return -1;
    }
    function alias(name) {
      return function aliasClosure() {
        return this[name].apply(this, arguments);
      };
    }
    proto.getListeners = function getListeners(evt) {
      var events = this._getEvents();
      var response;
      var key;
      if (typeof evt === 'object') {
        response = {};
        for (key in events) {
          if (events.hasOwnProperty(key) && evt.test(key)) {
            response[key] = events[key];
          }
        }
      } else {
        response = events[evt] || (events[evt] = []);
      }
      return response;
    };
    proto.flattenListeners = function flattenListeners(listeners) {
      var flatListeners = [];
      var i;
      for (i = 0; i < listeners.length; i += 1) {
        flatListeners.push(listeners[i].listener);
      }
      return flatListeners;
    };
    proto.getListenersAsObject = function getListenersAsObject(evt) {
      var listeners = this.getListeners(evt);
      var response;
      if (listeners instanceof Array) {
        response = {};
        response[evt] = listeners;
      }
      return response || listeners;
    };
    proto.addListener = function addListener(evt, listener) {
      var listeners = this.getListenersAsObject(evt);
      var listenerIsWrapped = typeof listener === 'object';
      var key;
      for (key in listeners) {
        if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
          listeners[key].push(listenerIsWrapped ? listener : {
            listener: listener,
            once: false
          });
        }
      }
      return this;
    };
    proto.on = alias('addListener');
    proto.addOnceListener = function addOnceListener(evt, listener) {
      return this.addListener(evt, {
        listener: listener,
        once: true
      });
    };
    proto.once = alias('addOnceListener');
    proto.defineEvent = function defineEvent(evt) {
      this.getListeners(evt);
      return this;
    };
    proto.defineEvents = function defineEvents(evts) {
      for (var i = 0; i < evts.length; i += 1) {
        this.defineEvent(evts[i]);
      }
      return this;
    };
    proto.removeListener = function removeListener(evt, listener) {
      var listeners = this.getListenersAsObject(evt);
      var index;
      var key;
      for (key in listeners) {
        if (listeners.hasOwnProperty(key)) {
          index = indexOfListener(listeners[key], listener);
          if (index !== -1) {
            listeners[key].splice(index, 1);
          }
        }
      }
      return this;
    };
    proto.off = alias('removeListener');
    proto.addListeners = function addListeners(evt, listeners) {
      return this.manipulateListeners(false, evt, listeners);
    };
    proto.removeListeners = function removeListeners(evt, listeners) {
      return this.manipulateListeners(true, evt, listeners);
    };
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
      var i;
      var value;
      var single = remove ? this.removeListener : this.addListener;
      var multiple = remove ? this.removeListeners : this.addListeners;
      if (typeof evt === 'object' && !(evt instanceof RegExp)) {
        for (i in evt) {
          if (evt.hasOwnProperty(i) && (value = evt[i])) {
            if (typeof value === 'function') {
              single.call(this, i, value);
            } else {
              multiple.call(this, i, value);
            }
          }
        }
      } else {
        i = listeners.length;
        while (i--) {
          single.call(this, evt, listeners[i]);
        }
      }
      return this;
    };
    proto.removeEvent = function removeEvent(evt) {
      var type = typeof evt;
      var events = this._getEvents();
      var key;
      if (type === 'string') {
        delete events[evt];
      } else if (type === 'object') {
        for (key in events) {
          if (events.hasOwnProperty(key) && evt.test(key)) {
            delete events[key];
          }
        }
      } else {
        delete this._events;
      }
      return this;
    };
    proto.removeAllListeners = alias('removeEvent');
    proto.emitEvent = function emitEvent(evt, args) {
      var listeners = this.getListenersAsObject(evt);
      var listener;
      var i;
      var key;
      var response;
      for (key in listeners) {
        if (listeners.hasOwnProperty(key)) {
          i = listeners[key].length;
          while (i--) {
            listener = listeners[key][i];
            if (listener.once === true) {
              this.removeListener(evt, listener.listener);
            }
            response = listener.listener.apply(this, args || []);
            if (response === this._getOnceReturnValue()) {
              this.removeListener(evt, listener.listener);
            }
          }
        }
      }
      return this;
    };
    proto.trigger = alias('emitEvent');
    proto.emit = function emit(evt) {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(evt, args);
    };
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
      this._onceReturnValue = value;
      return this;
    };
    proto._getOnceReturnValue = function _getOnceReturnValue() {
      if (this.hasOwnProperty('_onceReturnValue')) {
        return this._onceReturnValue;
      } else {
        return true;
      }
    };
    proto._getEvents = function _getEvents() {
      return this._events || (this._events = {});
    };
    EventEmitter.noConflict = function noConflict() {
      exports.EventEmitter = originalGlobalValue;
      return EventEmitter;
    };
    if (typeof define === 'function' && define.amd) {
      define('eventEmitter/EventEmitter', [], function () {
        return EventEmitter;
      });
    } else if (typeof module === 'object' && module.exports) {
      module.exports = EventEmitter;
    } else {
      this.EventEmitter = EventEmitter;
    }
  }.call(this));
  (function (window) {
    'use strict';
    var prefixes = 'Webkit Moz ms Ms O'.split(' ');
    var docElemStyle = document.documentElement.style;
    function getStyleProperty(propName) {
      if (!propName) {
        return;
      }
      if (typeof docElemStyle[propName] === 'string') {
        return propName;
      }
      propName = propName.charAt(0).toUpperCase() + propName.slice(1);
      var prefixed;
      for (var i = 0, len = prefixes.length; i < len; i++) {
        prefixed = prefixes[i] + propName;
        if (typeof docElemStyle[prefixed] === 'string') {
          return prefixed;
        }
      }
    }
    if (typeof define === 'function' && define.amd) {
      define('get-style-property/get-style-property', [], function () {
        return getStyleProperty;
      });
    } else if (typeof exports === 'object') {
      module.exports = getStyleProperty;
    } else {
      window.getStyleProperty = getStyleProperty;
    }
  }(window));
  (function (window, undefined) {
    'use strict';
    var defView = document.defaultView;
    var isComputedStyle = defView && defView.getComputedStyle;
    var getStyle = isComputedStyle ? function (elem) {
        return defView.getComputedStyle(elem, null);
      } : function (elem) {
        return elem.currentStyle;
      };
    function getStyleSize(value) {
      var num = parseFloat(value);
      var isValid = value.indexOf('%') === -1 && !isNaN(num);
      return isValid && num;
    }
    var measurements = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth'
      ];
    function getZeroSize() {
      var size = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        };
      for (var i = 0, len = measurements.length; i < len; i++) {
        var measurement = measurements[i];
        size[measurement] = 0;
      }
      return size;
    }
    function defineGetSize(getStyleProperty) {
      var boxSizingProp = getStyleProperty('boxSizing');
      var isBoxSizeOuter;
      (function () {
        if (!boxSizingProp) {
          return;
        }
        var div = document.createElement('div');
        div.style.width = '200px';
        div.style.padding = '1px 2px 3px 4px';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px 2px 3px 4px';
        div.style[boxSizingProp] = 'border-box';
        var body = document.body || document.documentElement;
        body.appendChild(div);
        var style = getStyle(div);
        isBoxSizeOuter = getStyleSize(style.width) === 200;
        body.removeChild(div);
      }());
      function getSize(elem) {
        if (typeof elem === 'string') {
          elem = document.querySelector(elem);
        }
        if (!elem || typeof elem !== 'object' || !elem.nodeType) {
          return;
        }
        var style = getStyle(elem);
        if (style.display === 'none') {
          return getZeroSize();
        }
        var size = {};
        size.width = elem.offsetWidth;
        size.height = elem.offsetHeight;
        var isBorderBox = size.isBorderBox = !!(boxSizingProp && style[boxSizingProp] && style[boxSizingProp] === 'border-box');
        for (var i = 0, len = measurements.length; i < len; i++) {
          var measurement = measurements[i];
          var value = style[measurement];
          value = mungeNonPixel(elem, value);
          var num = parseFloat(value);
          size[measurement] = !isNaN(num) ? num : 0;
        }
        var paddingWidth = size.paddingLeft + size.paddingRight;
        var paddingHeight = size.paddingTop + size.paddingBottom;
        var marginWidth = size.marginLeft + size.marginRight;
        var marginHeight = size.marginTop + size.marginBottom;
        var borderWidth = size.borderLeftWidth + size.borderRightWidth;
        var borderHeight = size.borderTopWidth + size.borderBottomWidth;
        var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
        var styleWidth = getStyleSize(style.width);
        if (styleWidth !== false) {
          size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
        }
        var styleHeight = getStyleSize(style.height);
        if (styleHeight !== false) {
          size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
        }
        size.innerWidth = size.width - (paddingWidth + borderWidth);
        size.innerHeight = size.height - (paddingHeight + borderHeight);
        size.outerWidth = size.width + marginWidth;
        size.outerHeight = size.height + marginHeight;
        return size;
      }
      function mungeNonPixel(elem, value) {
        if (isComputedStyle || value.indexOf('%') === -1) {
          return value;
        }
        var style = elem.style;
        var left = style.left;
        var rs = elem.runtimeStyle;
        var rsLeft = rs && rs.left;
        if (rsLeft) {
          rs.left = elem.currentStyle.left;
        }
        style.left = value;
        value = style.pixelLeft;
        style.left = left;
        if (rsLeft) {
          rs.left = rsLeft;
        }
        return value;
      }
      return getSize;
    }
    if (typeof define === 'function' && define.amd) {
      define('get-size/get-size', ['get-style-property/get-style-property'], defineGetSize);
    } else if (typeof exports === 'object') {
      module.exports = defineGetSize(require('get-style-property'));
    } else {
      window.getSize = defineGetSize(window.getStyleProperty);
    }
  }(window));
  (function (global, ElemProto) {
    'use strict';
    var matchesMethod = function () {
        if (ElemProto.matchesSelector) {
          return 'matchesSelector';
        }
        var prefixes = [
            'webkit',
            'moz',
            'ms',
            'o'
          ];
        for (var i = 0, len = prefixes.length; i < len; i++) {
          var prefix = prefixes[i];
          var method = prefix + 'MatchesSelector';
          if (ElemProto[method]) {
            return method;
          }
        }
      }();
    function match(elem, selector) {
      return elem[matchesMethod](selector);
    }
    function checkParent(elem) {
      if (elem.parentNode) {
        return;
      }
      var fragment = document.createDocumentFragment();
      fragment.appendChild(elem);
    }
    function query(elem, selector) {
      checkParent(elem);
      var elems = elem.parentNode.querySelectorAll(selector);
      for (var i = 0, len = elems.length; i < len; i++) {
        if (elems[i] === elem) {
          return true;
        }
      }
      return false;
    }
    function matchChild(elem, selector) {
      checkParent(elem);
      return match(elem, selector);
    }
    var matchesSelector;
    if (matchesMethod) {
      var div = document.createElement('div');
      var supportsOrphans = match(div, 'div');
      matchesSelector = supportsOrphans ? match : matchChild;
    } else {
      matchesSelector = query;
    }
    if (typeof define === 'function' && define.amd) {
      define('matches-selector/matches-selector', [], function () {
        return matchesSelector;
      });
    } else {
      window.matchesSelector = matchesSelector;
    }
  }(this, Element.prototype));
  (function (window) {
    'use strict';
    var defView = document.defaultView;
    var getStyle = defView && defView.getComputedStyle ? function (elem) {
        return defView.getComputedStyle(elem, null);
      } : function (elem) {
        return elem.currentStyle;
      };
    function extend(a, b) {
      for (var prop in b) {
        a[prop] = b[prop];
      }
      return a;
    }
    function isEmptyObj(obj) {
      for (var prop in obj) {
        return false;
      }
      prop = null;
      return true;
    }
    function toDash(str) {
      return str.replace(/([A-Z])/g, function ($1) {
        return '-' + $1.toLowerCase();
      });
    }
    function outlayerItemDefinition(EventEmitter, getSize, getStyleProperty) {
      var transitionProperty = getStyleProperty('transition');
      var transformProperty = getStyleProperty('transform');
      var supportsCSS3 = transitionProperty && transformProperty;
      var is3d = !!getStyleProperty('perspective');
      var transitionEndEvent = {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'otransitionend',
          transition: 'transitionend'
        }[transitionProperty];
      var prefixableProperties = [
          'transform',
          'transition',
          'transitionDuration',
          'transitionProperty'
        ];
      var vendorProperties = function () {
          var cache = {};
          for (var i = 0, len = prefixableProperties.length; i < len; i++) {
            var prop = prefixableProperties[i];
            var supportedProp = getStyleProperty(prop);
            if (supportedProp && supportedProp !== prop) {
              cache[prop] = supportedProp;
            }
          }
          return cache;
        }();
      function Item(element, layout) {
        if (!element) {
          return;
        }
        this.element = element;
        this.layout = layout;
        this.position = {
          x: 0,
          y: 0
        };
        this._create();
      }
      extend(Item.prototype, EventEmitter.prototype);
      Item.prototype._create = function () {
        this._transition = {
          ingProperties: {},
          clean: {},
          onEnd: {}
        };
        this.css({ position: 'absolute' });
      };
      Item.prototype.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      Item.prototype.getSize = function () {
        this.size = getSize(this.element);
      };
      Item.prototype.css = function (style) {
        var elemStyle = this.element.style;
        for (var prop in style) {
          var supportedProp = vendorProperties[prop] || prop;
          elemStyle[supportedProp] = style[prop];
        }
      };
      Item.prototype.getPosition = function () {
        var style = getStyle(this.element);
        var layoutOptions = this.layout.options;
        var isOriginLeft = layoutOptions.isOriginLeft;
        var isOriginTop = layoutOptions.isOriginTop;
        var x = parseInt(style[isOriginLeft ? 'left' : 'right'], 10);
        var y = parseInt(style[isOriginTop ? 'top' : 'bottom'], 10);
        x = isNaN(x) ? 0 : x;
        y = isNaN(y) ? 0 : y;
        var layoutSize = this.layout.size;
        x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
        y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
        this.position.x = x;
        this.position.y = y;
      };
      Item.prototype.layoutPosition = function () {
        var layoutSize = this.layout.size;
        var layoutOptions = this.layout.options;
        var style = {};
        if (layoutOptions.isOriginLeft) {
          style.left = this.position.x + layoutSize.paddingLeft + 'px';
          style.right = '';
        } else {
          style.right = this.position.x + layoutSize.paddingRight + 'px';
          style.left = '';
        }
        if (layoutOptions.isOriginTop) {
          style.top = this.position.y + layoutSize.paddingTop + 'px';
          style.bottom = '';
        } else {
          style.bottom = this.position.y + layoutSize.paddingBottom + 'px';
          style.top = '';
        }
        this.css(style);
        this.emitEvent('layout', [this]);
      };
      var translate = is3d ? function (x, y) {
          return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
        } : function (x, y) {
          return 'translate(' + x + 'px, ' + y + 'px)';
        };
      Item.prototype._transitionTo = function (x, y) {
        this.getPosition();
        var curX = this.position.x;
        var curY = this.position.y;
        var compareX = parseInt(x, 10);
        var compareY = parseInt(y, 10);
        var didNotMove = compareX === this.position.x && compareY === this.position.y;
        this.setPosition(x, y);
        if (didNotMove && !this.isTransitioning) {
          this.layoutPosition();
          return;
        }
        var transX = x - curX;
        var transY = y - curY;
        var transitionStyle = {};
        var layoutOptions = this.layout.options;
        transX = layoutOptions.isOriginLeft ? transX : -transX;
        transY = layoutOptions.isOriginTop ? transY : -transY;
        transitionStyle.transform = translate(transX, transY);
        this.transition({
          to: transitionStyle,
          onTransitionEnd: { transform: this.layoutPosition },
          isCleaning: true
        });
      };
      Item.prototype.goTo = function (x, y) {
        this.setPosition(x, y);
        this.layoutPosition();
      };
      Item.prototype.moveTo = supportsCSS3 ? Item.prototype._transitionTo : Item.prototype.goTo;
      Item.prototype.setPosition = function (x, y) {
        this.position.x = parseInt(x, 10);
        this.position.y = parseInt(y, 10);
      };
      Item.prototype._nonTransition = function (args) {
        this.css(args.to);
        if (args.isCleaning) {
          this._removeStyles(args.to);
        }
        for (var prop in args.onTransitionEnd) {
          args.onTransitionEnd[prop].call(this);
        }
      };
      Item.prototype._transition = function (args) {
        if (!parseFloat(this.layout.options.transitionDuration)) {
          this._nonTransition(args);
          return;
        }
        var _transition = this._transition;
        for (var prop in args.onTransitionEnd) {
          _transition.onEnd[prop] = args.onTransitionEnd[prop];
        }
        for (prop in args.to) {
          _transition.ingProperties[prop] = true;
          if (args.isCleaning) {
            _transition.clean[prop] = true;
          }
        }
        if (args.from) {
          this.css(args.from);
          var h = this.element.offsetHeight;
          h = null;
        }
        this.enableTransition(args.to);
        this.css(args.to);
        this.isTransitioning = true;
      };
      var itemTransitionProperties = transformProperty && toDash(transformProperty) + ',opacity';
      Item.prototype.enableTransition = function () {
        if (this.isTransitioning) {
          return;
        }
        this.css({
          transitionProperty: itemTransitionProperties,
          transitionDuration: this.layout.options.transitionDuration
        });
        this.element.addEventListener(transitionEndEvent, this, false);
      };
      Item.prototype.transition = Item.prototype[transitionProperty ? '_transition' : '_nonTransition'];
      Item.prototype.onwebkitTransitionEnd = function (event) {
        this.ontransitionend(event);
      };
      Item.prototype.onotransitionend = function (event) {
        this.ontransitionend(event);
      };
      var dashedVendorProperties = {
          '-webkit-transform': 'transform',
          '-moz-transform': 'transform',
          '-o-transform': 'transform'
        };
      Item.prototype.ontransitionend = function (event) {
        if (event.target !== this.element) {
          return;
        }
        var _transition = this._transition;
        var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
        delete _transition.ingProperties[propertyName];
        if (isEmptyObj(_transition.ingProperties)) {
          this.disableTransition();
        }
        if (propertyName in _transition.clean) {
          this.element.style[event.propertyName] = '';
          delete _transition.clean[propertyName];
        }
        if (propertyName in _transition.onEnd) {
          var onTransitionEnd = _transition.onEnd[propertyName];
          onTransitionEnd.call(this);
          delete _transition.onEnd[propertyName];
        }
        this.emitEvent('transitionEnd', [this]);
      };
      Item.prototype.disableTransition = function () {
        this.removeTransitionStyles();
        this.element.removeEventListener(transitionEndEvent, this, false);
        this.isTransitioning = false;
      };
      Item.prototype._removeStyles = function (style) {
        var cleanStyle = {};
        for (var prop in style) {
          cleanStyle[prop] = '';
        }
        this.css(cleanStyle);
      };
      var cleanTransitionStyle = {
          transitionProperty: '',
          transitionDuration: ''
        };
      Item.prototype.removeTransitionStyles = function () {
        this.css(cleanTransitionStyle);
      };
      Item.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element);
        this.emitEvent('remove', [this]);
      };
      Item.prototype.remove = function () {
        if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
          this.removeElem();
          return;
        }
        var _this = this;
        this.on('transitionEnd', function () {
          _this.removeElem();
          return true;
        });
        this.hide();
      };
      Item.prototype.reveal = function () {
        delete this.isHidden;
        this.css({ display: '' });
        var options = this.layout.options;
        this.transition({
          from: options.hiddenStyle,
          to: options.visibleStyle,
          isCleaning: true
        });
      };
      Item.prototype.hide = function () {
        this.isHidden = true;
        this.css({ display: '' });
        var options = this.layout.options;
        this.transition({
          from: options.visibleStyle,
          to: options.hiddenStyle,
          isCleaning: true,
          onTransitionEnd: {
            opacity: function () {
              this.css({ display: 'none' });
            }
          }
        });
      };
      Item.prototype.destroy = function () {
        this.css({
          position: '',
          left: '',
          right: '',
          top: '',
          bottom: '',
          transition: '',
          transform: ''
        });
      };
      return Item;
    }
    if (typeof define === 'function' && define.amd) {
      define('outlayer/item', [
        'eventEmitter/EventEmitter',
        'get-size/get-size',
        'get-style-property/get-style-property'
      ], outlayerItemDefinition);
    } else {
      window.Outlayer = {};
      window.Outlayer.Item = outlayerItemDefinition(window.EventEmitter, window.getSize, window.getStyleProperty);
    }
  }(window));
  (function (window) {
    'use strict';
    var document = window.document;
    var console = window.console;
    var jQuery = window.jQuery;
    var noop = function () {
    };
    function extend(a, b) {
      for (var prop in b) {
        a[prop] = b[prop];
      }
      return a;
    }
    var objToString = Object.prototype.toString;
    function isArray(obj) {
      return objToString.call(obj) === '[object Array]';
    }
    function makeArray(obj) {
      var ary = [];
      if (isArray(obj)) {
        ary = obj;
      } else if (obj && typeof obj.length === 'number') {
        for (var i = 0, len = obj.length; i < len; i++) {
          ary.push(obj[i]);
        }
      } else {
        ary.push(obj);
      }
      return ary;
    }
    var isElement = typeof HTMLElement === 'object' ? function isElementDOM2(obj) {
        return obj instanceof HTMLElement;
      } : function isElementQuirky(obj) {
        return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
      };
    var indexOf = Array.prototype.indexOf ? function (ary, obj) {
        return ary.indexOf(obj);
      } : function (ary, obj) {
        for (var i = 0, len = ary.length; i < len; i++) {
          if (ary[i] === obj) {
            return i;
          }
        }
        return -1;
      };
    function removeFrom(obj, ary) {
      var index = indexOf(ary, obj);
      if (index !== -1) {
        ary.splice(index, 1);
      }
    }
    function toDashed(str) {
      return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
        return $1 + '-' + $2;
      }).toLowerCase();
    }
    function outlayerDefinition(eventie, docReady, EventEmitter, getSize, matchesSelector, Item) {
      var GUID = 0;
      var instances = {};
      function Outlayer(element, options) {
        if (typeof element === 'string') {
          element = document.querySelector(element);
        }
        if (!element || !isElement(element)) {
          if (console) {
            console.error('Bad ' + this.settings.namespace + ' element: ' + element);
          }
          return;
        }
        this.element = element;
        this.options = extend({}, this.options);
        this.option(options);
        var id = ++GUID;
        this.element.outlayerGUID = id;
        instances[id] = this;
        this._create();
        if (this.options.isInitLayout) {
          this.layout();
        }
      }
      Outlayer.prototype.settings = {
        namespace: 'outlayer',
        item: Item
      };
      Outlayer.prototype.options = {
        containerStyle: { position: 'relative' },
        isInitLayout: true,
        isOriginLeft: true,
        isOriginTop: true,
        isResizeBound: true,
        transitionDuration: '0.4s',
        hiddenStyle: {
          opacity: 0,
          transform: 'scale(0.001)'
        },
        visibleStyle: {
          opacity: 1,
          transform: 'scale(1)'
        }
      };
      extend(Outlayer.prototype, EventEmitter.prototype);
      Outlayer.prototype.option = function (opts) {
        extend(this.options, opts);
      };
      Outlayer.prototype._create = function () {
        this.reloadItems();
        this.stamps = [];
        this.stamp(this.options.stamp);
        extend(this.element.style, this.options.containerStyle);
        if (this.options.isResizeBound) {
          this.bindResize();
        }
      };
      Outlayer.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      };
      Outlayer.prototype._itemize = function (elems) {
        var itemElems = this._filterFindItemElements(elems);
        var Item = this.settings.item;
        var items = [];
        for (var i = 0, len = itemElems.length; i < len; i++) {
          var elem = itemElems[i];
          var item = new Item(elem, this);
          items.push(item);
        }
        return items;
      };
      Outlayer.prototype._filterFindItemElements = function (elems) {
        elems = makeArray(elems);
        var itemSelector = this.options.itemSelector;
        var itemElems = [];
        for (var i = 0, len = elems.length; i < len; i++) {
          var elem = elems[i];
          if (!isElement(elem)) {
            continue;
          }
          if (itemSelector) {
            if (matchesSelector(elem, itemSelector)) {
              itemElems.push(elem);
            }
            var childElems = elem.querySelectorAll(itemSelector);
            for (var j = 0, jLen = childElems.length; j < jLen; j++) {
              itemElems.push(childElems[j]);
            }
          } else {
            itemElems.push(elem);
          }
        }
        return itemElems;
      };
      Outlayer.prototype.getItemElements = function () {
        var elems = [];
        for (var i = 0, len = this.items.length; i < len; i++) {
          elems.push(this.items[i].element);
        }
        return elems;
      };
      Outlayer.prototype.layout = function () {
        this._resetLayout();
        this._manageStamps();
        var isInstant = this.options.isLayoutInstant !== undefined ? this.options.isLayoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, isInstant);
        this._isLayoutInited = true;
      };
      Outlayer.prototype._init = Outlayer.prototype.layout;
      Outlayer.prototype._resetLayout = function () {
        this.getSize();
      };
      Outlayer.prototype.getSize = function () {
        this.size = getSize(this.element);
      };
      Outlayer.prototype._getMeasurement = function (measurement, size) {
        var option = this.options[measurement];
        var elem;
        if (!option) {
          this[measurement] = 0;
        } else {
          if (typeof option === 'string') {
            elem = this.element.querySelector(option);
          } else if (isElement(option)) {
            elem = option;
          }
          this[measurement] = elem ? getSize(elem)[size] : option;
        }
      };
      Outlayer.prototype.layoutItems = function (items, isInstant) {
        items = this._getItemsForLayout(items);
        this._layoutItems(items, isInstant);
        this._postLayout();
      };
      Outlayer.prototype._getItemsForLayout = function (items) {
        var layoutItems = [];
        for (var i = 0, len = items.length; i < len; i++) {
          var item = items[i];
          if (!item.isIgnored) {
            layoutItems.push(item);
          }
        }
        return layoutItems;
      };
      Outlayer.prototype._layoutItems = function (items, isInstant) {
        if (!items || !items.length) {
          this.emitEvent('layoutComplete', [
            this,
            items
          ]);
          return;
        }
        this._itemsOn(items, 'layout', function onItemsLayout() {
          this.emitEvent('layoutComplete', [
            this,
            items
          ]);
        });
        var queue = [];
        for (var i = 0, len = items.length; i < len; i++) {
          var item = items[i];
          var position = this._getItemLayoutPosition(item);
          position.item = item;
          position.isInstant = isInstant;
          queue.push(position);
        }
        this._processLayoutQueue(queue);
      };
      Outlayer.prototype._getItemLayoutPosition = function () {
        return {
          x: 0,
          y: 0
        };
      };
      Outlayer.prototype._processLayoutQueue = function (queue) {
        for (var i = 0, len = queue.length; i < len; i++) {
          var obj = queue[i];
          this._positionItem(obj.item, obj.x, obj.y, obj.isInstant);
        }
      };
      Outlayer.prototype._positionItem = function (item, x, y, isInstant) {
        if (isInstant) {
          item.goTo(x, y);
        } else {
          item.moveTo(x, y);
        }
      };
      Outlayer.prototype._postLayout = function () {
        var size = this._getContainerSize();
        if (size) {
          this._setContainerMeasure(size.width, true);
          this._setContainerMeasure(size.height, false);
        }
      };
      Outlayer.prototype._getContainerSize = noop;
      Outlayer.prototype._setContainerMeasure = function (measure, isWidth) {
        if (measure === undefined) {
          return;
        }
        var elemSize = this.size;
        if (elemSize.isBorderBox) {
          measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
        }
        measure = Math.max(measure, 0);
        this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
      };
      Outlayer.prototype._itemsOn = function (items, eventName, callback) {
        var doneCount = 0;
        var count = items.length;
        var _this = this;
        function tick() {
          doneCount++;
          if (doneCount === count) {
            callback.call(_this);
          }
          return true;
        }
        for (var i = 0, len = items.length; i < len; i++) {
          var item = items[i];
          item.on(eventName, tick);
        }
      };
      Outlayer.prototype.ignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
          item.isIgnored = true;
        }
      };
      Outlayer.prototype.unignore = function (elem) {
        var item = this.getItem(elem);
        if (item) {
          delete item.isIgnored;
        }
      };
      Outlayer.prototype.stamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
          return;
        }
        this.stamps = this.stamps.concat(elems);
        for (var i = 0, len = elems.length; i < len; i++) {
          var elem = elems[i];
          this.ignore(elem);
        }
      };
      Outlayer.prototype.unstamp = function (elems) {
        elems = this._find(elems);
        if (!elems) {
          return;
        }
        for (var i = 0, len = elems.length; i < len; i++) {
          var elem = elems[i];
          removeFrom(elem, this.stamps);
          this.unignore(elem);
        }
      };
      Outlayer.prototype._find = function (elems) {
        if (!elems) {
          return;
        }
        if (typeof elems === 'string') {
          elems = this.element.querySelectorAll(elems);
        }
        elems = makeArray(elems);
        return elems;
      };
      Outlayer.prototype._manageStamps = function () {
        if (!this.stamps || !this.stamps.length) {
          return;
        }
        this._getBoundingRect();
        for (var i = 0, len = this.stamps.length; i < len; i++) {
          var stamp = this.stamps[i];
          this._manageStamp(stamp);
        }
      };
      Outlayer.prototype._getBoundingRect = function () {
        var boundingRect = this.element.getBoundingClientRect();
        var size = this.size;
        this._boundingRect = {
          left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
          top: boundingRect.top + size.paddingTop + size.borderTopWidth,
          right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
          bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
        };
      };
      Outlayer.prototype._manageStamp = noop;
      Outlayer.prototype._getElementOffset = function (elem) {
        var boundingRect = elem.getBoundingClientRect();
        var thisRect = this._boundingRect;
        var size = getSize(elem);
        var offset = {
            left: boundingRect.left - thisRect.left - size.marginLeft,
            top: boundingRect.top - thisRect.top - size.marginTop,
            right: thisRect.right - boundingRect.right - size.marginRight,
            bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
          };
        return offset;
      };
      Outlayer.prototype.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      Outlayer.prototype.bindResize = function () {
        if (this.isResizeBound) {
          return;
        }
        eventie.bind(window, 'resize', this);
        this.isResizeBound = true;
      };
      Outlayer.prototype.unbindResize = function () {
        eventie.unbind(window, 'resize', this);
        this.isResizeBound = false;
      };
      Outlayer.prototype.onresize = function () {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }
        var _this = this;
        function delayed() {
          _this.resize();
          delete _this.resizeTimeout;
        }
        this.resizeTimeout = setTimeout(delayed, 100);
      };
      Outlayer.prototype.resize = function () {
        var size = getSize(this.element);
        var hasSizes = this.size && size;
        if (hasSizes && size.innerWidth === this.size.innerWidth) {
          return;
        }
        this.layout();
      };
      Outlayer.prototype.addItems = function (elems) {
        var items = this._itemize(elems);
        if (items.length) {
          this.items = this.items.concat(items);
        }
        return items;
      };
      Outlayer.prototype.appended = function (elems) {
        var items = this.addItems(elems);
        if (!items.length) {
          return;
        }
        this.layoutItems(items, true);
        this.reveal(items);
      };
      Outlayer.prototype.prepended = function (elems) {
        var items = this._itemize(elems);
        if (!items.length) {
          return;
        }
        var previousItems = this.items.slice(0);
        this.items = items.concat(previousItems);
        this._resetLayout();
        this._manageStamps();
        this.layoutItems(items, true);
        this.reveal(items);
        this.layoutItems(previousItems);
      };
      Outlayer.prototype.reveal = function (items) {
        if (!items || !items.length) {
          return;
        }
        for (var i = 0, len = items.length; i < len; i++) {
          var item = items[i];
          item.reveal();
        }
      };
      Outlayer.prototype.hide = function (items) {
        if (!items || !items.length) {
          return;
        }
        for (var i = 0, len = items.length; i < len; i++) {
          var item = items[i];
          item.hide();
        }
      };
      Outlayer.prototype.getItem = function (elem) {
        for (var i = 0, len = this.items.length; i < len; i++) {
          var item = this.items[i];
          if (item.element === elem) {
            return item;
          }
        }
      };
      Outlayer.prototype.getItems = function (elems) {
        if (!elems || !elems.length) {
          return;
        }
        var items = [];
        for (var i = 0, len = elems.length; i < len; i++) {
          var elem = elems[i];
          var item = this.getItem(elem);
          if (item) {
            items.push(item);
          }
        }
        return items;
      };
      Outlayer.prototype.remove = function (elems) {
        elems = makeArray(elems);
        var removeItems = this.getItems(elems);
        if (!removeItems || !removeItems.length) {
          return;
        }
        this._itemsOn(removeItems, 'remove', function () {
          this.emitEvent('removeComplete', [
            this,
            removeItems
          ]);
        });
        for (var i = 0, len = removeItems.length; i < len; i++) {
          var item = removeItems[i];
          item.remove();
          removeFrom(item, this.items);
        }
      };
      Outlayer.prototype.destroy = function () {
        var style = this.element.style;
        style.height = '';
        style.position = '';
        style.width = '';
        for (var i = 0, len = this.items.length; i < len; i++) {
          var item = this.items[i];
          item.destroy();
        }
        this.unbindResize();
        delete this.element.outlayerGUID;
        if (jQuery) {
          jQuery.removeData(this.element, this.settings.namespace);
        }
      };
      Outlayer.data = function (elem) {
        var id = elem && elem.outlayerGUID;
        return id && instances[id];
      };
      function copyOutlayerProto(obj, property) {
        obj.prototype[property] = extend({}, Outlayer.prototype[property]);
      }
      Outlayer.create = function (namespace, options) {
        function Layout() {
          Outlayer.apply(this, arguments);
        }
        extend(Layout.prototype, Outlayer.prototype);
        copyOutlayerProto(Layout, 'options');
        copyOutlayerProto(Layout, 'settings');
        extend(Layout.prototype.options, options);
        Layout.prototype.settings.namespace = namespace;
        Layout.data = Outlayer.data;
        Layout.Item = function LayoutItem() {
          Item.apply(this, arguments);
        };
        Layout.Item.prototype = new Item();
        Layout.prototype.settings.item = Layout.Item;
        docReady(function () {
          var dashedNamespace = toDashed(namespace);
          var elems = document.querySelectorAll('.js-' + dashedNamespace);
          var dataAttr = 'data-' + dashedNamespace + '-options';
          for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            var attr = elem.getAttribute(dataAttr);
            var options;
            try {
              options = attr && JSON.parse(attr);
            } catch (error) {
              if (console) {
                console.error('Error parsing ' + dataAttr + ' on ' + elem.nodeName.toLowerCase() + (elem.id ? '#' + elem.id : '') + ': ' + error);
              }
              continue;
            }
            var instance = new Layout(elem, options);
            if (jQuery) {
              jQuery.data(elem, namespace, instance);
            }
          }
        });
        if (jQuery && jQuery.bridget) {
          jQuery.bridget(namespace, Layout);
        }
        return Layout;
      };
      Outlayer.Item = Item;
      return Outlayer;
    }
    if (typeof define === 'function' && define.amd) {
      define('outlayer/outlayer', [
        'eventie/eventie',
        'doc-ready/doc-ready',
        'eventEmitter/EventEmitter',
        'get-size/get-size',
        'matches-selector/matches-selector',
        './item'
      ], outlayerDefinition);
    } else {
      window.Outlayer = outlayerDefinition(window.eventie, window.docReady, window.EventEmitter, window.getSize, window.matchesSelector, window.Outlayer.Item);
    }
  }(window));
  (function (window) {
    'use strict';
    var indexOf = Array.prototype.indexOf ? function (items, value) {
        return items.indexOf(value);
      } : function (items, value) {
        for (var i = 0, len = items.length; i < len; i++) {
          var item = items[i];
          if (item === value) {
            return i;
          }
        }
        return -1;
      };
    function masonryDefinition(Outlayer, getSize) {
      var Masonry = Outlayer.create('masonry');
      Masonry.prototype._resetLayout = function () {
        this.getSize();
        this._getMeasurement('columnWidth', 'outerWidth');
        this._getMeasurement('gutter', 'outerWidth');
        this.measureColumns();
        var i = this.cols;
        this.colYs = [];
        while (i--) {
          this.colYs.push(0);
        }
        this.maxY = 0;
      };
      Masonry.prototype.measureColumns = function () {
        this.getContainerWidth();
        if (!this.columnWidth) {
          var firstItem = this.items[0];
          var firstItemElem = firstItem && firstItem.element;
          this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth;
        }
        this.columnWidth += this.gutter;
        this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth);
        this.cols = Math.max(this.cols, 1);
      };
      Masonry.prototype.getContainerWidth = function () {
        var container = this.options.isFitWidth ? this.element.parentNode : this.element;
        var size = getSize(container);
        this.containerWidth = size && size.innerWidth;
      };
      Masonry.prototype._getItemLayoutPosition = function (item) {
        item.getSize();
        var colSpan = Math.ceil(item.size.outerWidth / this.columnWidth);
        colSpan = Math.min(colSpan, this.cols);
        var colGroup = this._getColGroup(colSpan);
        var minimumY = Math.min.apply(Math, colGroup);
        var shortColIndex = indexOf(colGroup, minimumY);
        var position = {
            x: this.columnWidth * shortColIndex,
            y: minimumY
          };
        var setHeight = minimumY + item.size.outerHeight;
        var setSpan = this.cols + 1 - colGroup.length;
        for (var i = 0; i < setSpan; i++) {
          this.colYs[shortColIndex + i] = setHeight;
        }
        return position;
      };
      Masonry.prototype._getColGroup = function (colSpan) {
        if (colSpan < 2) {
          return this.colYs;
        }
        var colGroup = [];
        var groupCount = this.cols + 1 - colSpan;
        for (var i = 0; i < groupCount; i++) {
          var groupColYs = this.colYs.slice(i, i + colSpan);
          colGroup[i] = Math.max.apply(Math, groupColYs);
        }
        return colGroup;
      };
      Masonry.prototype._manageStamp = function (stamp) {
        var stampSize = getSize(stamp);
        var offset = this._getElementOffset(stamp);
        var firstX = this.options.isOriginLeft ? offset.left : offset.right;
        var lastX = firstX + stampSize.outerWidth;
        var firstCol = Math.floor(firstX / this.columnWidth);
        firstCol = Math.max(0, firstCol);
        var lastCol = Math.floor(lastX / this.columnWidth);
        lastCol = Math.min(this.cols - 1, lastCol);
        var stampMaxY = (this.options.isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
        for (var i = firstCol; i <= lastCol; i++) {
          this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
        }
      };
      Masonry.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var size = { height: this.maxY };
        if (this.options.isFitWidth) {
          size.width = this._getContainerFitWidth();
        }
        return size;
      };
      Masonry.prototype._getContainerFitWidth = function () {
        var unusedCols = 0;
        var i = this.cols;
        while (--i) {
          if (this.colYs[i] !== 0) {
            break;
          }
          unusedCols++;
        }
        return (this.cols - unusedCols) * this.columnWidth - this.gutter;
      };
      Masonry.prototype.resize = function () {
        var previousWidth = this.containerWidth;
        this.getContainerWidth();
        if (previousWidth === this.containerWidth) {
          return;
        }
        this.layout();
      };
      return Masonry;
    }
    if (typeof define === 'function' && define.amd) {
      define('masonry', [
        'outlayer/outlayer',
        'get-size/get-size'
      ], masonryDefinition);
    } else {
      window.Masonry = masonryDefinition(window.Outlayer, window.getSize);
    }
  }(window));
  (function (window) {
    'use strict';
    var $ = window.jQuery;
    var console = window.console;
    var hasConsole = typeof console !== 'undefined';
    function extend(a, b) {
      for (var prop in b) {
        a[prop] = b[prop];
      }
      return a;
    }
    var objToString = Object.prototype.toString;
    function isArray(obj) {
      return objToString.call(obj) === '[object Array]';
    }
    function makeArray(obj) {
      var ary = [];
      if (isArray(obj)) {
        ary = obj;
      } else if (typeof obj.length === 'number') {
        for (var i = 0, len = obj.length; i < len; i++) {
          ary.push(obj[i]);
        }
      } else {
        ary.push(obj);
      }
      return ary;
    }
    function defineImagesLoaded(EventEmitter, eventie) {
      function ImagesLoaded(elem, options, onAlways) {
        if (!(this instanceof ImagesLoaded)) {
          return new ImagesLoaded(elem, options);
        }
        if (typeof elem === 'string') {
          elem = document.querySelectorAll(elem);
        }
        this.elements = makeArray(elem);
        this.options = extend({}, this.options);
        if (typeof options === 'function') {
          onAlways = options;
        } else {
          extend(this.options, options);
        }
        if (onAlways) {
          this.on('always', onAlways);
        }
        this.getImages();
        if ($) {
          this.jqDeferred = new $.Deferred();
        }
        var _this = this;
        setTimeout(function () {
          _this.check();
        });
      }
      ImagesLoaded.prototype = new EventEmitter();
      ImagesLoaded.prototype.options = {};
      ImagesLoaded.prototype.getImages = function () {
        this.images = [];
        for (var i = 0, len = this.elements.length; i < len; i++) {
          var elem = this.elements[i];
          if (elem.nodeName === 'IMG') {
            this.addImage(elem);
          }
          var childElems = elem.querySelectorAll('img');
          for (var j = 0, jLen = childElems.length; j < jLen; j++) {
            var img = childElems[j];
            this.addImage(img);
          }
        }
      };
      ImagesLoaded.prototype.addImage = function (img) {
        var loadingImage = new LoadingImage(img);
        this.images.push(loadingImage);
      };
      ImagesLoaded.prototype.check = function () {
        var _this = this;
        var checkedCount = 0;
        var length = this.images.length;
        this.hasAnyBroken = false;
        if (!length) {
          this.complete();
          return;
        }
        function onConfirm(image, message) {
          if (_this.options.debug && hasConsole) {
            console.log('confirm', image, message);
          }
          _this.progress(image);
          checkedCount++;
          if (checkedCount === length) {
            _this.complete();
          }
          return true;
        }
        for (var i = 0; i < length; i++) {
          var loadingImage = this.images[i];
          loadingImage.on('confirm', onConfirm);
          loadingImage.check();
        }
      };
      ImagesLoaded.prototype.progress = function (image) {
        this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
        var _this = this;
        setTimeout(function () {
          _this.emit('progress', _this, image);
          if (_this.jqDeferred) {
            _this.jqDeferred.notify(_this, image);
          }
        });
      };
      ImagesLoaded.prototype.complete = function () {
        var eventName = this.hasAnyBroken ? 'fail' : 'done';
        this.isComplete = true;
        var _this = this;
        setTimeout(function () {
          _this.emit(eventName, _this);
          _this.emit('always', _this);
          if (_this.jqDeferred) {
            var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
            _this.jqDeferred[jqMethod](_this);
          }
        });
      };
      if ($) {
        $.fn.imagesLoaded = function (options, callback) {
          var instance = new ImagesLoaded(this, options, callback);
          return instance.jqDeferred.promise($(this));
        };
      }
      var cache = {};
      function LoadingImage(img) {
        this.img = img;
      }
      LoadingImage.prototype = new EventEmitter();
      LoadingImage.prototype.check = function () {
        var cached = cache[this.img.src];
        if (cached) {
          this.useCached(cached);
          return;
        }
        cache[this.img.src] = this;
        if (this.img.complete && this.img.naturalWidth !== undefined) {
          this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
          return;
        }
        var proxyImage = this.proxyImage = new Image();
        eventie.bind(proxyImage, 'load', this);
        eventie.bind(proxyImage, 'error', this);
        proxyImage.src = this.img.src;
      };
      LoadingImage.prototype.useCached = function (cached) {
        if (cached.isConfirmed) {
          this.confirm(cached.isLoaded, 'cached was confirmed');
        } else {
          var _this = this;
          cached.on('confirm', function (image) {
            _this.confirm(image.isLoaded, 'cache emitted confirmed');
            return true;
          });
        }
      };
      LoadingImage.prototype.confirm = function (isLoaded, message) {
        this.isConfirmed = true;
        this.isLoaded = isLoaded;
        this.emit('confirm', this, message);
      };
      LoadingImage.prototype.handleEvent = function (event) {
        var method = 'on' + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      LoadingImage.prototype.onload = function () {
        this.confirm(true, 'onload');
        this.unbindProxyEvents();
      };
      LoadingImage.prototype.onerror = function () {
        this.confirm(false, 'onerror');
        this.unbindProxyEvents();
      };
      LoadingImage.prototype.unbindProxyEvents = function () {
        eventie.unbind(this.proxyImage, 'load', this);
        eventie.unbind(this.proxyImage, 'error', this);
      };
      return ImagesLoaded;
    }
    if (typeof define === 'function' && define.amd) {
      define('imagesLoaded', [
        'eventEmitter/EventEmitter',
        'eventie/eventie'
      ], defineImagesLoaded);
    } else {
      window.imagesLoaded = defineImagesLoaded(window.EventEmitter, window.eventie);
    }
  }(window));
  ;
  (function () {
    var undefined;
    var arrayPool = [], objectPool = [];
    var idCounter = 0;
    var keyPrefix = +new Date() + '';
    var largeArraySize = 75;
    var maxPoolSize = 40;
    var whitespace = ' \t\x0B\f\xa0\ufeff' + '\n\r\u2028\u2029' + '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000';
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reFuncName = /^function[ \n\r\t]+\w/;
    var reInterpolate = /<%=([\s\S]+?)%>/g;
    var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');
    var reNoMatch = /($^)/;
    var reThis = /\bthis\b/;
    var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;
    var contextProps = [
        'Array',
        'Boolean',
        'Date',
        'Function',
        'Math',
        'Number',
        'Object',
        'RegExp',
        'String',
        '_',
        'attachEvent',
        'clearTimeout',
        'isFinite',
        'isNaN',
        'parseInt',
        'setImmediate',
        'setTimeout'
      ];
    var templateCounter = 0;
    var argsClass = '[object Arguments]', arrayClass = '[object Array]', boolClass = '[object Boolean]', dateClass = '[object Date]', funcClass = '[object Function]', numberClass = '[object Number]', objectClass = '[object Object]', regexpClass = '[object RegExp]', stringClass = '[object String]';
    var cloneableClasses = {};
    cloneableClasses[funcClass] = false;
    cloneableClasses[argsClass] = cloneableClasses[arrayClass] = cloneableClasses[boolClass] = cloneableClasses[dateClass] = cloneableClasses[numberClass] = cloneableClasses[objectClass] = cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;
    var debounceOptions = {
        'leading': false,
        'maxWait': 0,
        'trailing': false
      };
    var descriptor = {
        'configurable': false,
        'enumerable': false,
        'value': null,
        'writable': false
      };
    var objectTypes = {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
      };
    var stringEscapes = {
        '\\': '\\',
        '\'': '\'',
        '\n': 'n',
        '\r': 'r',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      };
    var root = objectTypes[typeof window] && window || this;
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
    var freeGlobal = objectTypes[typeof global] && global;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
      root = freeGlobal;
    }
    function baseIndexOf(array, value, fromIndex) {
      var index = (fromIndex || 0) - 1, length = array ? array.length : 0;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function cacheIndexOf(cache, value) {
      var type = typeof value;
      cache = cache.cache;
      if (type == 'boolean' || value == null) {
        return cache[value] ? 0 : -1;
      }
      if (type != 'number' && type != 'string') {
        type = 'object';
      }
      var key = type == 'number' ? value : keyPrefix + value;
      cache = (cache = cache[type]) && cache[key];
      return type == 'object' ? cache && baseIndexOf(cache, value) > -1 ? 0 : -1 : cache ? 0 : -1;
    }
    function cachePush(value) {
      var cache = this.cache, type = typeof value;
      if (type == 'boolean' || value == null) {
        cache[value] = true;
      } else {
        if (type != 'number' && type != 'string') {
          type = 'object';
        }
        var key = type == 'number' ? value : keyPrefix + value, typeCache = cache[type] || (cache[type] = {});
        if (type == 'object') {
          (typeCache[key] || (typeCache[key] = [])).push(value);
        } else {
          typeCache[key] = true;
        }
      }
    }
    function charAtCallback(value) {
      return value.charCodeAt(0);
    }
    function compareAscending(a, b) {
      var ac = a.criteria, bc = b.criteria;
      if (ac !== bc) {
        if (ac > bc || typeof ac == 'undefined') {
          return 1;
        }
        if (ac < bc || typeof bc == 'undefined') {
          return -1;
        }
      }
      return a.index - b.index;
    }
    function createCache(array) {
      var index = -1, length = array.length, first = array[0], mid = array[length / 2 | 0], last = array[length - 1];
      if (first && typeof first == 'object' && mid && typeof mid == 'object' && last && typeof last == 'object') {
        return false;
      }
      var cache = getObject();
      cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;
      var result = getObject();
      result.array = array;
      result.cache = cache;
      result.push = cachePush;
      while (++index < length) {
        result.push(array[index]);
      }
      return result;
    }
    function escapeStringChar(match) {
      return '\\' + stringEscapes[match];
    }
    function getArray() {
      return arrayPool.pop() || [];
    }
    function getObject() {
      return objectPool.pop() || {
        'array': null,
        'cache': null,
        'criteria': null,
        'false': false,
        'index': 0,
        'null': false,
        'number': null,
        'object': null,
        'push': null,
        'string': null,
        'true': false,
        'undefined': false,
        'value': null
      };
    }
    function noop() {
    }
    function releaseArray(array) {
      array.length = 0;
      if (arrayPool.length < maxPoolSize) {
        arrayPool.push(array);
      }
    }
    function releaseObject(object) {
      var cache = object.cache;
      if (cache) {
        releaseObject(cache);
      }
      object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
      if (objectPool.length < maxPoolSize) {
        objectPool.push(object);
      }
    }
    function slice(array, start, end) {
      start || (start = 0);
      if (typeof end == 'undefined') {
        end = array ? array.length : 0;
      }
      var index = -1, length = end - start || 0, result = Array(length < 0 ? 0 : length);
      while (++index < length) {
        result[index] = array[start + index];
      }
      return result;
    }
    function runInContext(context) {
      context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
      var Array = context.Array, Boolean = context.Boolean, Date = context.Date, Function = context.Function, Math = context.Math, Number = context.Number, Object = context.Object, RegExp = context.RegExp, String = context.String, TypeError = context.TypeError;
      var arrayRef = [];
      var objectProto = Object.prototype;
      var oldDash = context._;
      var reNative = RegExp('^' + String(objectProto.valueOf).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/valueOf|for [^\]]+/g, '.+?') + '$');
      var ceil = Math.ceil, clearTimeout = context.clearTimeout, floor = Math.floor, fnToString = Function.prototype.toString, getPrototypeOf = reNative.test(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf, hasOwnProperty = objectProto.hasOwnProperty, now = reNative.test(now = Date.now) && now || function () {
          return +new Date();
        }, push = arrayRef.push, setImmediate = context.setImmediate, setTimeout = context.setTimeout, splice = arrayRef.splice, toString = objectProto.toString, unshift = arrayRef.unshift;
      var defineProperty = function () {
          try {
            var o = {}, func = reNative.test(func = Object.defineProperty) && func, result = func(o, o, o) && func;
          } catch (e) {
          }
          return result;
        }();
      var nativeBind = reNative.test(nativeBind = toString.bind) && nativeBind, nativeCreate = reNative.test(nativeCreate = Object.create) && nativeCreate, nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray, nativeIsFinite = context.isFinite, nativeIsNaN = context.isNaN, nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys, nativeMax = Math.max, nativeMin = Math.min, nativeParseInt = context.parseInt, nativeRandom = Math.random, nativeSlice = arrayRef.slice;
      var isIeOpera = reNative.test(context.attachEvent), isV8 = nativeBind && !/\n|true/.test(nativeBind + isIeOpera);
      var ctorByClass = {};
      ctorByClass[arrayClass] = Array;
      ctorByClass[boolClass] = Boolean;
      ctorByClass[dateClass] = Date;
      ctorByClass[funcClass] = Function;
      ctorByClass[objectClass] = Object;
      ctorByClass[numberClass] = Number;
      ctorByClass[regexpClass] = RegExp;
      ctorByClass[stringClass] = String;
      function lodash(value) {
        return value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__') ? value : new lodashWrapper(value);
      }
      function lodashWrapper(value, chainAll) {
        this.__chain__ = !!chainAll;
        this.__wrapped__ = value;
      }
      lodashWrapper.prototype = lodash.prototype;
      var support = lodash.support = {};
      support.fastBind = nativeBind && !isV8;
      support.funcDecomp = !reNative.test(context.WinRTError) && reThis.test(runInContext);
      support.funcNames = typeof Function.name == 'string';
      lodash.templateSettings = {
        'escape': /<%-([\s\S]+?)%>/g,
        'evaluate': /<%([\s\S]+?)%>/g,
        'interpolate': reInterpolate,
        'variable': '',
        'imports': { '_': lodash }
      };
      function baseClone(value, deep, callback, stackA, stackB) {
        if (callback) {
          var result = callback(value);
          if (typeof result != 'undefined') {
            return result;
          }
        }
        var isObj = isObject(value);
        if (isObj) {
          var className = toString.call(value);
          if (!cloneableClasses[className]) {
            return value;
          }
          var ctor = ctorByClass[className];
          switch (className) {
          case boolClass:
          case dateClass:
            return new ctor(+value);
          case numberClass:
          case stringClass:
            return new ctor(value);
          case regexpClass:
            result = ctor(value.source, reFlags.exec(value));
            result.lastIndex = value.lastIndex;
            return result;
          }
        } else {
          return value;
        }
        var isArr = isArray(value);
        if (deep) {
          var initedStack = !stackA;
          stackA || (stackA = getArray());
          stackB || (stackB = getArray());
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == value) {
              return stackB[length];
            }
          }
          result = isArr ? ctor(value.length) : {};
        } else {
          result = isArr ? slice(value) : assign({}, value);
        }
        if (isArr) {
          if (hasOwnProperty.call(value, 'index')) {
            result.index = value.index;
          }
          if (hasOwnProperty.call(value, 'input')) {
            result.input = value.input;
          }
        }
        if (!deep) {
          return result;
        }
        stackA.push(value);
        stackB.push(result);
        (isArr ? forEach : forOwn)(value, function (objValue, key) {
          result[key] = baseClone(objValue, deep, callback, stackA, stackB);
        });
        if (initedStack) {
          releaseArray(stackA);
          releaseArray(stackB);
        }
        return result;
      }
      function baseCreateCallback(func, thisArg, argCount) {
        if (typeof func != 'function') {
          return identity;
        }
        if (typeof thisArg == 'undefined') {
          return func;
        }
        var bindData = func.__bindData__ || support.funcNames && !func.name;
        if (typeof bindData == 'undefined') {
          var source = reThis && fnToString.call(func);
          if (!support.funcNames && source && !reFuncName.test(source)) {
            bindData = true;
          }
          if (support.funcNames || !bindData) {
            bindData = !support.funcDecomp || reThis.test(source);
            setBindData(func, bindData);
          }
        }
        if (bindData !== true && (bindData && bindData[1] & 1)) {
          return func;
        }
        switch (argCount) {
        case 1:
          return function (value) {
            return func.call(thisArg, value);
          };
        case 2:
          return function (a, b) {
            return func.call(thisArg, a, b);
          };
        case 3:
          return function (value, index, collection) {
            return func.call(thisArg, value, index, collection);
          };
        case 4:
          return function (accumulator, value, index, collection) {
            return func.call(thisArg, accumulator, value, index, collection);
          };
        }
        return bind(func, thisArg);
      }
      function baseFlatten(array, isShallow, isArgArrays, fromIndex) {
        var index = (fromIndex || 0) - 1, length = array ? array.length : 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value && typeof value == 'object' && typeof value.length == 'number' && (isArray(value) || isArguments(value))) {
            if (!isShallow) {
              value = baseFlatten(value, isShallow, isArgArrays);
            }
            var valIndex = -1, valLength = value.length, resIndex = result.length;
            result.length += valLength;
            while (++valIndex < valLength) {
              result[resIndex++] = value[valIndex];
            }
          } else if (!isArgArrays) {
            result.push(value);
          }
        }
        return result;
      }
      function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
        if (callback) {
          var result = callback(a, b);
          if (typeof result != 'undefined') {
            return !!result;
          }
        }
        if (a === b) {
          return a !== 0 || 1 / a == 1 / b;
        }
        var type = typeof a, otherType = typeof b;
        if (a === a && !(a && objectTypes[type]) && !(b && objectTypes[otherType])) {
          return false;
        }
        if (a == null || b == null) {
          return a === b;
        }
        var className = toString.call(a), otherClass = toString.call(b);
        if (className == argsClass) {
          className = objectClass;
        }
        if (otherClass == argsClass) {
          otherClass = objectClass;
        }
        if (className != otherClass) {
          return false;
        }
        switch (className) {
        case boolClass:
        case dateClass:
          return +a == +b;
        case numberClass:
          return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;
        case regexpClass:
        case stringClass:
          return a == String(b);
        }
        var isArr = className == arrayClass;
        if (!isArr) {
          if (hasOwnProperty.call(a, '__wrapped__ ') || hasOwnProperty.call(b, '__wrapped__')) {
            return baseIsEqual(a.__wrapped__ || a, b.__wrapped__ || b, callback, isWhere, stackA, stackB);
          }
          if (className != objectClass) {
            return false;
          }
          var ctorA = a.constructor, ctorB = b.constructor;
          if (ctorA != ctorB && !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB)) {
            return false;
          }
        }
        var initedStack = !stackA;
        stackA || (stackA = getArray());
        stackB || (stackB = getArray());
        var length = stackA.length;
        while (length--) {
          if (stackA[length] == a) {
            return stackB[length] == b;
          }
        }
        var size = 0;
        result = true;
        stackA.push(a);
        stackB.push(b);
        if (isArr) {
          length = a.length;
          size = b.length;
          result = size == a.length;
          if (!result && !isWhere) {
            return result;
          }
          while (size--) {
            var index = length, value = b[size];
            if (isWhere) {
              while (index--) {
                if (result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB)) {
                  break;
                }
              }
            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
              break;
            }
          }
          return result;
        }
        forIn(b, function (value, key, b) {
          if (hasOwnProperty.call(b, key)) {
            size++;
            return result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB);
          }
        });
        if (result && !isWhere) {
          forIn(a, function (value, key, a) {
            if (hasOwnProperty.call(a, key)) {
              return result = --size > -1;
            }
          });
        }
        if (initedStack) {
          releaseArray(stackA);
          releaseArray(stackB);
        }
        return result;
      }
      function baseMerge(object, source, callback, stackA, stackB) {
        (isArray(source) ? forEach : forOwn)(source, function (source, key) {
          var found, isArr, result = source, value = object[key];
          if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
            var stackLength = stackA.length;
            while (stackLength--) {
              if (found = stackA[stackLength] == source) {
                value = stackB[stackLength];
                break;
              }
            }
            if (!found) {
              var isShallow;
              if (callback) {
                result = callback(value, source);
                if (isShallow = typeof result != 'undefined') {
                  value = result;
                }
              }
              if (!isShallow) {
                value = isArr ? isArray(value) ? value : [] : isPlainObject(value) ? value : {};
              }
              stackA.push(source);
              stackB.push(value);
              if (!isShallow) {
                baseMerge(value, source, callback, stackA, stackB);
              }
            }
          } else {
            if (callback) {
              result = callback(value, source);
              if (typeof result == 'undefined') {
                result = source;
              }
            }
            if (typeof result != 'undefined') {
              value = result;
            }
          }
          object[key] = value;
        });
      }
      function baseUniq(array, isSorted, callback) {
        var index = -1, indexOf = getIndexOf(), length = array ? array.length : 0, result = [];
        var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf, seen = callback || isLarge ? getArray() : result;
        if (isLarge) {
          var cache = createCache(seen);
          if (cache) {
            indexOf = cacheIndexOf;
            seen = cache;
          } else {
            isLarge = false;
            seen = callback ? seen : (releaseArray(seen), result);
          }
        }
        while (++index < length) {
          var value = array[index], computed = callback ? callback(value, index, array) : value;
          if (isSorted ? !index || seen[seen.length - 1] !== computed : indexOf(seen, computed) < 0) {
            if (callback || isLarge) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
        if (isLarge) {
          releaseArray(seen.array);
          releaseObject(seen);
        } else if (callback) {
          releaseArray(seen);
        }
        return result;
      }
      function createAggregator(setter) {
        return function (collection, callback, thisArg) {
          var result = {};
          callback = lodash.createCallback(callback, thisArg, 3);
          var index = -1, length = collection ? collection.length : 0;
          if (typeof length == 'number') {
            while (++index < length) {
              var value = collection[index];
              setter(result, value, callback(value, index, collection), collection);
            }
          } else {
            forOwn(collection, function (value, key, collection) {
              setter(result, value, callback(value, key, collection), collection);
            });
          }
          return result;
        };
      }
      function createBound(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
        var isBind = bitmask & 1, isBindKey = bitmask & 2, isCurry = bitmask & 4, isCurryBound = bitmask & 8, isPartial = bitmask & 16, isPartialRight = bitmask & 32, key = func;
        if (!isBindKey && !isFunction(func)) {
          throw new TypeError();
        }
        if (isPartial && !partialArgs.length) {
          bitmask &= ~16;
          isPartial = partialArgs = false;
        }
        if (isPartialRight && !partialRightArgs.length) {
          bitmask &= ~32;
          isPartialRight = partialRightArgs = false;
        }
        var bindData = func && func.__bindData__;
        if (bindData) {
          if (isBind && !(bindData[1] & 1)) {
            bindData[4] = thisArg;
          }
          if (!isBind && bindData[1] & 1) {
            bitmask |= 8;
          }
          if (isCurry && !(bindData[1] & 4)) {
            bindData[5] = arity;
          }
          if (isPartial) {
            push.apply(bindData[2] || (bindData[2] = []), partialArgs);
          }
          if (isPartialRight) {
            push.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
          }
          bindData[1] |= bitmask;
          return createBound.apply(null, bindData);
        }
        if (isBind && !(isBindKey || isCurry || isPartialRight) && (support.fastBind || nativeBind && isPartial)) {
          if (isPartial) {
            var args = [thisArg];
            push.apply(args, partialArgs);
          }
          var bound = isPartial ? nativeBind.apply(func, args) : nativeBind.call(func, thisArg);
        } else {
          bound = function () {
            var args = arguments, thisBinding = isBind ? thisArg : this;
            if (isCurry || isPartial || isPartialRight) {
              args = nativeSlice.call(args);
              if (isPartial) {
                unshift.apply(args, partialArgs);
              }
              if (isPartialRight) {
                push.apply(args, partialRightArgs);
              }
              if (isCurry && args.length < arity) {
                bitmask |= 16 & ~32;
                return createBound(func, isCurryBound ? bitmask : bitmask & ~3, args, null, thisArg, arity);
              }
            }
            if (isBindKey) {
              func = thisBinding[key];
            }
            if (this instanceof bound) {
              thisBinding = createObject(func.prototype);
              var result = func.apply(thisBinding, args);
              return isObject(result) ? result : thisBinding;
            }
            return func.apply(thisBinding, args);
          };
        }
        setBindData(bound, nativeSlice.call(arguments));
        return bound;
      }
      function createObject(prototype) {
        return isObject(prototype) ? nativeCreate(prototype) : {};
      }
      if (!nativeCreate) {
        createObject = function (prototype) {
          if (isObject(prototype)) {
            noop.prototype = prototype;
            var result = new noop();
            noop.prototype = null;
          }
          return result || {};
        };
      }
      function escapeHtmlChar(match) {
        return htmlEscapes[match];
      }
      function getIndexOf() {
        var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
        return result;
      }
      var setBindData = !defineProperty ? noop : function (func, value) {
          descriptor.value = value;
          defineProperty(func, '__bindData__', descriptor);
        };
      function shimIsPlainObject(value) {
        var ctor, result;
        if (!(value && toString.call(value) == objectClass) || (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
          return false;
        }
        forIn(value, function (value, key) {
          result = key;
        });
        return typeof result == 'undefined' || hasOwnProperty.call(value, result);
      }
      function unescapeHtmlChar(match) {
        return htmlUnescapes[match];
      }
      function isArguments(value) {
        return value && typeof value == 'object' && typeof value.length == 'number' && toString.call(value) == argsClass || false;
      }
      var isArray = nativeIsArray || function (value) {
          return value && typeof value == 'object' && typeof value.length == 'number' && toString.call(value) == arrayClass || false;
        };
      var shimKeys = function (object) {
        var index, iterable = object, result = [];
        if (!iterable)
          return result;
        if (!objectTypes[typeof object])
          return result;
        for (index in iterable) {
          if (hasOwnProperty.call(iterable, index)) {
            result.push(index);
          }
        }
        return result;
      };
      var keys = !nativeKeys ? shimKeys : function (object) {
          if (!isObject(object)) {
            return [];
          }
          return nativeKeys(object);
        };
      var htmlEscapes = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          '\'': '&#39;'
        };
      var htmlUnescapes = invert(htmlEscapes);
      var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'), reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');
      var assign = function (object, source, guard) {
        var index, iterable = object, result = iterable;
        if (!iterable)
          return result;
        var args = arguments, argsIndex = 0, argsLength = typeof guard == 'number' ? 2 : args.length;
        if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
          var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
        } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
          callback = args[--argsLength];
        }
        while (++argsIndex < argsLength) {
          iterable = args[argsIndex];
          if (iterable && objectTypes[typeof iterable]) {
            var ownIndex = -1, ownProps = objectTypes[typeof iterable] && keys(iterable), length = ownProps ? ownProps.length : 0;
            while (++ownIndex < length) {
              index = ownProps[ownIndex];
              result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
            }
          }
        }
        return result;
      };
      function clone(value, deep, callback, thisArg) {
        if (typeof deep != 'boolean' && deep != null) {
          thisArg = callback;
          callback = deep;
          deep = false;
        }
        return baseClone(value, deep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
      }
      function cloneDeep(value, callback, thisArg) {
        return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
      }
      var defaults = function (object, source, guard) {
        var index, iterable = object, result = iterable;
        if (!iterable)
          return result;
        var args = arguments, argsIndex = 0, argsLength = typeof guard == 'number' ? 2 : args.length;
        while (++argsIndex < argsLength) {
          iterable = args[argsIndex];
          if (iterable && objectTypes[typeof iterable]) {
            var ownIndex = -1, ownProps = objectTypes[typeof iterable] && keys(iterable), length = ownProps ? ownProps.length : 0;
            while (++ownIndex < length) {
              index = ownProps[ownIndex];
              if (typeof result[index] == 'undefined')
                result[index] = iterable[index];
            }
          }
        }
        return result;
      };
      function findKey(object, callback, thisArg) {
        var result;
        callback = lodash.createCallback(callback, thisArg, 3);
        forOwn(object, function (value, key, object) {
          if (callback(value, key, object)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function findLastKey(object, callback, thisArg) {
        var result;
        callback = lodash.createCallback(callback, thisArg, 3);
        forOwnRight(object, function (value, key, object) {
          if (callback(value, key, object)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      var forIn = function (collection, callback, thisArg) {
        var index, iterable = collection, result = iterable;
        if (!iterable)
          return result;
        if (!objectTypes[typeof iterable])
          return result;
        callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        for (index in iterable) {
          if (callback(iterable[index], index, collection) === false)
            return result;
        }
        return result;
      };
      function forInRight(object, callback, thisArg) {
        var pairs = [];
        forIn(object, function (value, key) {
          pairs.push(key, value);
        });
        var length = pairs.length;
        callback = baseCreateCallback(callback, thisArg, 3);
        while (length--) {
          if (callback(pairs[length--], pairs[length], object) === false) {
            break;
          }
        }
        return object;
      }
      var forOwn = function (collection, callback, thisArg) {
        var index, iterable = collection, result = iterable;
        if (!iterable)
          return result;
        if (!objectTypes[typeof iterable])
          return result;
        callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        var ownIndex = -1, ownProps = objectTypes[typeof iterable] && keys(iterable), length = ownProps ? ownProps.length : 0;
        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (callback(iterable[index], index, collection) === false)
            return result;
        }
        return result;
      };
      function forOwnRight(object, callback, thisArg) {
        var props = keys(object), length = props.length;
        callback = baseCreateCallback(callback, thisArg, 3);
        while (length--) {
          var key = props[length];
          if (callback(object[key], key, object) === false) {
            break;
          }
        }
        return object;
      }
      function functions(object) {
        var result = [];
        forIn(object, function (value, key) {
          if (isFunction(value)) {
            result.push(key);
          }
        });
        return result.sort();
      }
      function has(object, property) {
        return object ? hasOwnProperty.call(object, property) : false;
      }
      function invert(object) {
        var index = -1, props = keys(object), length = props.length, result = {};
        while (++index < length) {
          var key = props[index];
          result[object[key]] = key;
        }
        return result;
      }
      function isBoolean(value) {
        return value === true || value === false || toString.call(value) == boolClass;
      }
      function isDate(value) {
        return value ? typeof value == 'object' && toString.call(value) == dateClass : false;
      }
      function isElement(value) {
        return value ? value.nodeType === 1 : false;
      }
      function isEmpty(value) {
        var result = true;
        if (!value) {
          return result;
        }
        var className = toString.call(value), length = value.length;
        if (className == arrayClass || className == stringClass || className == argsClass || className == objectClass && typeof length == 'number' && isFunction(value.splice)) {
          return !length;
        }
        forOwn(value, function () {
          return result = false;
        });
        return result;
      }
      function isEqual(a, b, callback, thisArg) {
        return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
      }
      function isFinite(value) {
        return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
      }
      function isFunction(value) {
        return typeof value == 'function';
      }
      function isObject(value) {
        return !!(value && objectTypes[typeof value]);
      }
      function isNaN(value) {
        return isNumber(value) && value != +value;
      }
      function isNull(value) {
        return value === null;
      }
      function isNumber(value) {
        return typeof value == 'number' || toString.call(value) == numberClass;
      }
      var isPlainObject = function (value) {
        if (!(value && toString.call(value) == objectClass)) {
          return false;
        }
        var valueOf = value.valueOf, objProto = typeof valueOf == 'function' && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
        return objProto ? value == objProto || getPrototypeOf(value) == objProto : shimIsPlainObject(value);
      };
      function isRegExp(value) {
        return value ? typeof value == 'object' && toString.call(value) == regexpClass : false;
      }
      function isString(value) {
        return typeof value == 'string' || toString.call(value) == stringClass;
      }
      function isUndefined(value) {
        return typeof value == 'undefined';
      }
      function merge(object) {
        var args = arguments, length = 2;
        if (!isObject(object)) {
          return object;
        }
        if (typeof args[2] != 'number') {
          length = args.length;
        }
        if (length > 3 && typeof args[length - 2] == 'function') {
          var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
        } else if (length > 2 && typeof args[length - 1] == 'function') {
          callback = args[--length];
        }
        var sources = nativeSlice.call(arguments, 1, length), index = -1, stackA = getArray(), stackB = getArray();
        while (++index < length) {
          baseMerge(object, sources[index], callback, stackA, stackB);
        }
        releaseArray(stackA);
        releaseArray(stackB);
        return object;
      }
      function omit(object, callback, thisArg) {
        var indexOf = getIndexOf(), isFunc = typeof callback == 'function', result = {};
        if (isFunc) {
          callback = lodash.createCallback(callback, thisArg, 3);
        } else {
          var props = baseFlatten(arguments, true, false, 1);
        }
        forIn(object, function (value, key, object) {
          if (isFunc ? !callback(value, key, object) : indexOf(props, key) < 0) {
            result[key] = value;
          }
        });
        return result;
      }
      function pairs(object) {
        var index = -1, props = keys(object), length = props.length, result = Array(length);
        while (++index < length) {
          var key = props[index];
          result[index] = [
            key,
            object[key]
          ];
        }
        return result;
      }
      function pick(object, callback, thisArg) {
        var result = {};
        if (typeof callback != 'function') {
          var index = -1, props = baseFlatten(arguments, true, false, 1), length = isObject(object) ? props.length : 0;
          while (++index < length) {
            var key = props[index];
            if (key in object) {
              result[key] = object[key];
            }
          }
        } else {
          callback = lodash.createCallback(callback, thisArg, 3);
          forIn(object, function (value, key, object) {
            if (callback(value, key, object)) {
              result[key] = value;
            }
          });
        }
        return result;
      }
      function transform(object, callback, accumulator, thisArg) {
        var isArr = isArray(object);
        callback = baseCreateCallback(callback, thisArg, 4);
        if (accumulator == null) {
          if (isArr) {
            accumulator = [];
          } else {
            var ctor = object && object.constructor, proto = ctor && ctor.prototype;
            accumulator = createObject(proto);
          }
        }
        (isArr ? forEach : forOwn)(object, function (value, index, object) {
          return callback(accumulator, value, index, object);
        });
        return accumulator;
      }
      function values(object) {
        var index = -1, props = keys(object), length = props.length, result = Array(length);
        while (++index < length) {
          result[index] = object[props[index]];
        }
        return result;
      }
      function at(collection) {
        var args = arguments, index = -1, props = baseFlatten(args, true, false, 1), length = args[2] && args[2][args[1]] === collection ? 1 : props.length, result = Array(length);
        while (++index < length) {
          result[index] = collection[props[index]];
        }
        return result;
      }
      function contains(collection, target, fromIndex) {
        var index = -1, indexOf = getIndexOf(), length = collection ? collection.length : 0, result = false;
        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
        if (isArray(collection)) {
          result = indexOf(collection, target, fromIndex) > -1;
        } else if (typeof length == 'number') {
          result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
        } else {
          forOwn(collection, function (value) {
            if (++index >= fromIndex) {
              return !(result = value === target);
            }
          });
        }
        return result;
      }
      var countBy = createAggregator(function (result, value, key) {
          hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1;
        });
      function every(collection, callback, thisArg) {
        var result = true;
        callback = lodash.createCallback(callback, thisArg, 3);
        var index = -1, length = collection ? collection.length : 0;
        if (typeof length == 'number') {
          while (++index < length) {
            if (!(result = !!callback(collection[index], index, collection))) {
              break;
            }
          }
        } else {
          forOwn(collection, function (value, index, collection) {
            return result = !!callback(value, index, collection);
          });
        }
        return result;
      }
      function filter(collection, callback, thisArg) {
        var result = [];
        callback = lodash.createCallback(callback, thisArg, 3);
        var index = -1, length = collection ? collection.length : 0;
        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            if (callback(value, index, collection)) {
              result.push(value);
            }
          }
        } else {
          forOwn(collection, function (value, index, collection) {
            if (callback(value, index, collection)) {
              result.push(value);
            }
          });
        }
        return result;
      }
      function find(collection, callback, thisArg) {
        callback = lodash.createCallback(callback, thisArg, 3);
        var index = -1, length = collection ? collection.length : 0;
        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            if (callback(value, index, collection)) {
              return value;
            }
          }
        } else {
          var result;
          forOwn(collection, function (value, index, collection) {
            if (callback(value, index, collection)) {
              result = value;
              return false;
            }
          });
          return result;
        }
      }
      function findLast(collection, callback, thisArg) {
        var result;
        callback = lodash.createCallback(callback, thisArg, 3);
        forEachRight(collection, function (value, index, collection) {
          if (callback(value, index, collection)) {
            result = value;
            return false;
          }
        });
        return result;
      }
      function forEach(collection, callback, thisArg) {
        var index = -1, length = collection ? collection.length : 0;
        callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        if (typeof length == 'number') {
          while (++index < length) {
            if (callback(collection[index], index, collection) === false) {
              break;
            }
          }
        } else {
          forOwn(collection, callback);
        }
        return collection;
      }
      function forEachRight(collection, callback, thisArg) {
        var length = collection ? collection.length : 0;
        callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        if (typeof length == 'number') {
          while (length--) {
            if (callback(collection[length], length, collection) === false) {
              break;
            }
          }
        } else {
          var props = keys(collection);
          length = props.length;
          forOwn(collection, function (value, key, collection) {
            key = props ? props[--length] : --length;
            return callback(collection[key], key, collection);
          });
        }
        return collection;
      }
      var groupBy = createAggregator(function (result, value, key) {
          (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
        });
      var indexBy = createAggregator(function (result, value, key) {
          result[key] = value;
        });
      function invoke(collection, methodName) {
        var args = nativeSlice.call(arguments, 2), index = -1, isFunc = typeof methodName == 'function', length = collection ? collection.length : 0, result = Array(typeof length == 'number' ? length : 0);
        forEach(collection, function (value) {
          result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
        });
        return result;
      }
      function map(collection, callback, thisArg) {
        var index = -1, length = collection ? collection.length : 0;
        callback = lodash.createCallback(callback, thisArg, 3);
        if (typeof length == 'number') {
          var result = Array(length);
          while (++index < length) {
            result[index] = callback(collection[index], index, collection);
          }
        } else {
          result = [];
          forOwn(collection, function (value, key, collection) {
            result[++index] = callback(value, key, collection);
          });
        }
        return result;
      }
      function max(collection, callback, thisArg) {
        var computed = -Infinity, result = computed;
        if (!callback && isArray(collection)) {
          var index = -1, length = collection.length;
          while (++index < length) {
            var value = collection[index];
            if (value > result) {
              result = value;
            }
          }
        } else {
          callback = !callback && isString(collection) ? charAtCallback : lodash.createCallback(callback, thisArg, 3);
          forEach(collection, function (value, index, collection) {
            var current = callback(value, index, collection);
            if (current > computed) {
              computed = current;
              result = value;
            }
          });
        }
        return result;
      }
      function min(collection, callback, thisArg) {
        var computed = Infinity, result = computed;
        if (!callback && isArray(collection)) {
          var index = -1, length = collection.length;
          while (++index < length) {
            var value = collection[index];
            if (value < result) {
              result = value;
            }
          }
        } else {
          callback = !callback && isString(collection) ? charAtCallback : lodash.createCallback(callback, thisArg, 3);
          forEach(collection, function (value, index, collection) {
            var current = callback(value, index, collection);
            if (current < computed) {
              computed = current;
              result = value;
            }
          });
        }
        return result;
      }
      function pluck(collection, property) {
        var index = -1, length = collection ? collection.length : 0;
        if (typeof length == 'number') {
          var result = Array(length);
          while (++index < length) {
            result[index] = collection[index][property];
          }
        }
        return result || map(collection, property);
      }
      function reduce(collection, callback, accumulator, thisArg) {
        if (!collection)
          return accumulator;
        var noaccum = arguments.length < 3;
        callback = baseCreateCallback(callback, thisArg, 4);
        var index = -1, length = collection.length;
        if (typeof length == 'number') {
          if (noaccum) {
            accumulator = collection[++index];
          }
          while (++index < length) {
            accumulator = callback(accumulator, collection[index], index, collection);
          }
        } else {
          forOwn(collection, function (value, index, collection) {
            accumulator = noaccum ? (noaccum = false, value) : callback(accumulator, value, index, collection);
          });
        }
        return accumulator;
      }
      function reduceRight(collection, callback, accumulator, thisArg) {
        var noaccum = arguments.length < 3;
        callback = baseCreateCallback(callback, thisArg, 4);
        forEachRight(collection, function (value, index, collection) {
          accumulator = noaccum ? (noaccum = false, value) : callback(accumulator, value, index, collection);
        });
        return accumulator;
      }
      function reject(collection, callback, thisArg) {
        callback = lodash.createCallback(callback, thisArg, 3);
        return filter(collection, function (value, index, collection) {
          return !callback(value, index, collection);
        });
      }
      function sample(collection, n, guard) {
        var length = collection ? collection.length : 0;
        if (typeof length != 'number') {
          collection = values(collection);
        }
        if (n == null || guard) {
          return collection ? collection[random(length - 1)] : undefined;
        }
        var result = shuffle(collection);
        result.length = nativeMin(nativeMax(0, n), result.length);
        return result;
      }
      function shuffle(collection) {
        var index = -1, length = collection ? collection.length : 0, result = Array(typeof length == 'number' ? length : 0);
        forEach(collection, function (value) {
          var rand = random(++index);
          result[index] = result[rand];
          result[rand] = value;
        });
        return result;
      }
      function size(collection) {
        var length = collection ? collection.length : 0;
        return typeof length == 'number' ? length : keys(collection).length;
      }
      function some(collection, callback, thisArg) {
        var result;
        callback = lodash.createCallback(callback, thisArg, 3);
        var index = -1, length = collection ? collection.length : 0;
        if (typeof length == 'number') {
          while (++index < length) {
            if (result = callback(collection[index], index, collection)) {
              break;
            }
          }
        } else {
          forOwn(collection, function (value, index, collection) {
            return !(result = callback(value, index, collection));
          });
        }
        return !!result;
      }
      function sortBy(collection, callback, thisArg) {
        var index = -1, length = collection ? collection.length : 0, result = Array(typeof length == 'number' ? length : 0);
        callback = lodash.createCallback(callback, thisArg, 3);
        forEach(collection, function (value, key, collection) {
          var object = result[++index] = getObject();
          object.criteria = callback(value, key, collection);
          object.index = index;
          object.value = value;
        });
        length = result.length;
        result.sort(compareAscending);
        while (length--) {
          var object = result[length];
          result[length] = object.value;
          releaseObject(object);
        }
        return result;
      }
      function toArray(collection) {
        if (collection && typeof collection.length == 'number') {
          return slice(collection);
        }
        return values(collection);
      }
      var where = filter;
      function compact(array) {
        var index = -1, length = array ? array.length : 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result.push(value);
          }
        }
        return result;
      }
      function difference(array) {
        var index = -1, indexOf = getIndexOf(), length = array ? array.length : 0, seen = baseFlatten(arguments, true, true, 1), result = [];
        var isLarge = length >= largeArraySize && indexOf === baseIndexOf;
        if (isLarge) {
          var cache = createCache(seen);
          if (cache) {
            indexOf = cacheIndexOf;
            seen = cache;
          } else {
            isLarge = false;
          }
        }
        while (++index < length) {
          var value = array[index];
          if (indexOf(seen, value) < 0) {
            result.push(value);
          }
        }
        if (isLarge) {
          releaseObject(seen);
        }
        return result;
      }
      function findIndex(array, callback, thisArg) {
        var index = -1, length = array ? array.length : 0;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length) {
          if (callback(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function findLastIndex(array, callback, thisArg) {
        var length = array ? array.length : 0;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (length--) {
          if (callback(array[length], length, array)) {
            return length;
          }
        }
        return -1;
      }
      function first(array, callback, thisArg) {
        var n = 0, length = array ? array.length : 0;
        if (typeof callback != 'number' && callback != null) {
          var index = -1;
          callback = lodash.createCallback(callback, thisArg, 3);
          while (++index < length && callback(array[index], index, array)) {
            n++;
          }
        } else {
          n = callback;
          if (n == null || thisArg) {
            return array ? array[0] : undefined;
          }
        }
        return slice(array, 0, nativeMin(nativeMax(0, n), length));
      }
      function flatten(array, isShallow, callback, thisArg) {
        if (typeof isShallow != 'boolean' && isShallow != null) {
          thisArg = callback;
          callback = !(thisArg && thisArg[isShallow] === array) ? isShallow : null;
          isShallow = false;
        }
        if (callback != null) {
          array = map(array, callback, thisArg);
        }
        return baseFlatten(array, isShallow);
      }
      function indexOf(array, value, fromIndex) {
        if (typeof fromIndex == 'number') {
          var length = array ? array.length : 0;
          fromIndex = fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0;
        } else if (fromIndex) {
          var index = sortedIndex(array, value);
          return array[index] === value ? index : -1;
        }
        return baseIndexOf(array, value, fromIndex);
      }
      function initial(array, callback, thisArg) {
        var n = 0, length = array ? array.length : 0;
        if (typeof callback != 'number' && callback != null) {
          var index = length;
          callback = lodash.createCallback(callback, thisArg, 3);
          while (index-- && callback(array[index], index, array)) {
            n++;
          }
        } else {
          n = callback == null || thisArg ? 1 : callback || n;
        }
        return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
      }
      function intersection(array) {
        var args = arguments, argsLength = args.length, argsIndex = -1, caches = getArray(), index = -1, indexOf = getIndexOf(), length = array ? array.length : 0, result = [], seen = getArray();
        while (++argsIndex < argsLength) {
          var value = args[argsIndex];
          caches[argsIndex] = indexOf === baseIndexOf && (value ? value.length : 0) >= largeArraySize && createCache(argsIndex ? args[argsIndex] : seen);
        }
        outer:
          while (++index < length) {
            var cache = caches[0];
            value = array[index];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
              argsIndex = argsLength;
              (cache || seen).push(value);
              while (--argsIndex) {
                cache = caches[argsIndex];
                if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
                  continue outer;
                }
              }
              result.push(value);
            }
          }
        while (argsLength--) {
          cache = caches[argsLength];
          if (cache) {
            releaseObject(cache);
          }
        }
        releaseArray(caches);
        releaseArray(seen);
        return result;
      }
      function last(array, callback, thisArg) {
        var n = 0, length = array ? array.length : 0;
        if (typeof callback != 'number' && callback != null) {
          var index = length;
          callback = lodash.createCallback(callback, thisArg, 3);
          while (index-- && callback(array[index], index, array)) {
            n++;
          }
        } else {
          n = callback;
          if (n == null || thisArg) {
            return array ? array[length - 1] : undefined;
          }
        }
        return slice(array, nativeMax(0, length - n));
      }
      function lastIndexOf(array, value, fromIndex) {
        var index = array ? array.length : 0;
        if (typeof fromIndex == 'number') {
          index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
        }
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function pull(array) {
        var args = arguments, argsIndex = 0, argsLength = args.length, length = array ? array.length : 0;
        while (++argsIndex < argsLength) {
          var index = -1, value = args[argsIndex];
          while (++index < length) {
            if (array[index] === value) {
              splice.call(array, index--, 1);
              length--;
            }
          }
        }
        return array;
      }
      function range(start, end, step) {
        start = +start || 0;
        step = typeof step == 'number' ? step : +step || 1;
        if (end == null) {
          end = start;
          start = 0;
        }
        var index = -1, length = nativeMax(0, ceil((end - start) / (step || 1))), result = Array(length);
        while (++index < length) {
          result[index] = start;
          start += step;
        }
        return result;
      }
      function remove(array, callback, thisArg) {
        var index = -1, length = array ? array.length : 0, result = [];
        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length) {
          var value = array[index];
          if (callback(value, index, array)) {
            result.push(value);
            splice.call(array, index--, 1);
            length--;
          }
        }
        return result;
      }
      function rest(array, callback, thisArg) {
        if (typeof callback != 'number' && callback != null) {
          var n = 0, index = -1, length = array ? array.length : 0;
          callback = lodash.createCallback(callback, thisArg, 3);
          while (++index < length && callback(array[index], index, array)) {
            n++;
          }
        } else {
          n = callback == null || thisArg ? 1 : nativeMax(0, callback);
        }
        return slice(array, n);
      }
      function sortedIndex(array, value, callback, thisArg) {
        var low = 0, high = array ? array.length : low;
        callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
        value = callback(value);
        while (low < high) {
          var mid = low + high >>> 1;
          callback(array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
      }
      function union(array) {
        return baseUniq(baseFlatten(arguments, true, true));
      }
      function uniq(array, isSorted, callback, thisArg) {
        if (typeof isSorted != 'boolean' && isSorted != null) {
          thisArg = callback;
          callback = !(thisArg && thisArg[isSorted] === array) ? isSorted : null;
          isSorted = false;
        }
        if (callback != null) {
          callback = lodash.createCallback(callback, thisArg, 3);
        }
        return baseUniq(array, isSorted, callback);
      }
      function without(array) {
        return difference(array, nativeSlice.call(arguments, 1));
      }
      function zip() {
        var array = arguments.length > 1 ? arguments : arguments[0], index = -1, length = array ? max(pluck(array, 'length')) : 0, result = Array(length < 0 ? 0 : length);
        while (++index < length) {
          result[index] = pluck(array, index);
        }
        return result;
      }
      function zipObject(keys, values) {
        var index = -1, length = keys ? keys.length : 0, result = {};
        while (++index < length) {
          var key = keys[index];
          if (values) {
            result[key] = values[index];
          } else if (key) {
            result[key[0]] = key[1];
          }
        }
        return result;
      }
      function after(n, func) {
        if (!isFunction(func)) {
          throw new TypeError();
        }
        return function () {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function bind(func, thisArg) {
        return arguments.length > 2 ? createBound(func, 17, nativeSlice.call(arguments, 2), null, thisArg) : createBound(func, 1, null, null, thisArg);
      }
      function bindAll(object) {
        var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object), index = -1, length = funcs.length;
        while (++index < length) {
          var key = funcs[index];
          object[key] = createBound(object[key], 1, null, null, object);
        }
        return object;
      }
      function bindKey(object, key) {
        return arguments.length > 2 ? createBound(key, 19, nativeSlice.call(arguments, 2), null, object) : createBound(key, 3, null, null, object);
      }
      function compose() {
        var funcs = arguments, length = funcs.length;
        while (length--) {
          if (!isFunction(funcs[length])) {
            throw new TypeError();
          }
        }
        return function () {
          var args = arguments, length = funcs.length;
          while (length--) {
            args = [funcs[length].apply(this, args)];
          }
          return args[0];
        };
      }
      function createCallback(func, thisArg, argCount) {
        var type = typeof func;
        if (func == null || type == 'function') {
          return baseCreateCallback(func, thisArg, argCount);
        }
        if (type != 'object') {
          return function (object) {
            return object[func];
          };
        }
        var props = keys(func), key = props[0], a = func[key];
        if (props.length == 1 && a === a && !isObject(a)) {
          return function (object) {
            var b = object[key];
            return a === b && (a !== 0 || 1 / a == 1 / b);
          };
        }
        return function (object) {
          var length = props.length, result = false;
          while (length--) {
            if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
              break;
            }
          }
          return result;
        };
      }
      function curry(func, arity) {
        arity = typeof arity == 'number' ? arity : +arity || func.length;
        return createBound(func, 4, null, null, null, arity);
      }
      function debounce(func, wait, options) {
        var args, maxTimeoutId, result, stamp, thisArg, timeoutId, trailingCall, lastCalled = 0, maxWait = false, trailing = true;
        if (!isFunction(func)) {
          throw new TypeError();
        }
        wait = nativeMax(0, wait) || 0;
        if (options === true) {
          var leading = true;
          trailing = false;
        } else if (isObject(options)) {
          leading = options.leading;
          maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
          trailing = 'trailing' in options ? options.trailing : trailing;
        }
        var delayed = function () {
          var remaining = wait - (now() - stamp);
          if (remaining <= 0) {
            if (maxTimeoutId) {
              clearTimeout(maxTimeoutId);
            }
            var isCalled = trailingCall;
            maxTimeoutId = timeoutId = trailingCall = undefined;
            if (isCalled) {
              lastCalled = now();
              result = func.apply(thisArg, args);
            }
          } else {
            timeoutId = setTimeout(delayed, remaining);
          }
        };
        var maxDelayed = function () {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          maxTimeoutId = timeoutId = trailingCall = undefined;
          if (trailing || maxWait !== wait) {
            lastCalled = now();
            result = func.apply(thisArg, args);
          }
        };
        return function () {
          args = arguments;
          stamp = now();
          thisArg = this;
          trailingCall = trailing && (timeoutId || !leading);
          if (maxWait === false) {
            var leadingCall = leading && !timeoutId;
          } else {
            if (!maxTimeoutId && !leading) {
              lastCalled = stamp;
            }
            var remaining = maxWait - (stamp - lastCalled);
            if (remaining <= 0) {
              if (maxTimeoutId) {
                maxTimeoutId = clearTimeout(maxTimeoutId);
              }
              lastCalled = stamp;
              result = func.apply(thisArg, args);
            } else if (!maxTimeoutId) {
              maxTimeoutId = setTimeout(maxDelayed, remaining);
            }
          }
          if (!timeoutId && wait !== maxWait) {
            timeoutId = setTimeout(delayed, wait);
          }
          if (leadingCall) {
            result = func.apply(thisArg, args);
          }
          return result;
        };
      }
      function defer(func) {
        if (!isFunction(func)) {
          throw new TypeError();
        }
        var args = nativeSlice.call(arguments, 1);
        return setTimeout(function () {
          func.apply(undefined, args);
        }, 1);
      }
      if (isV8 && moduleExports && typeof setImmediate == 'function') {
        defer = function (func) {
          if (!isFunction(func)) {
            throw new TypeError();
          }
          return setImmediate.apply(context, arguments);
        };
      }
      function delay(func, wait) {
        if (!isFunction(func)) {
          throw new TypeError();
        }
        var args = nativeSlice.call(arguments, 2);
        return setTimeout(function () {
          func.apply(undefined, args);
        }, wait);
      }
      function memoize(func, resolver) {
        if (!isFunction(func)) {
          throw new TypeError();
        }
        var memoized = function () {
          var cache = memoized.cache, key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];
          return hasOwnProperty.call(cache, key) ? cache[key] : cache[key] = func.apply(this, arguments);
        };
        memoized.cache = {};
        return memoized;
      }
      function once(func) {
        var ran, result;
        if (!isFunction(func)) {
          throw new TypeError();
        }
        return function () {
          if (ran) {
            return result;
          }
          ran = true;
          result = func.apply(this, arguments);
          func = null;
          return result;
        };
      }
      function partial(func) {
        return createBound(func, 16, nativeSlice.call(arguments, 1));
      }
      function partialRight(func) {
        return createBound(func, 32, null, nativeSlice.call(arguments, 1));
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (!isFunction(func)) {
          throw new TypeError();
        }
        if (options === false) {
          leading = false;
        } else if (isObject(options)) {
          leading = 'leading' in options ? options.leading : leading;
          trailing = 'trailing' in options ? options.trailing : trailing;
        }
        debounceOptions.leading = leading;
        debounceOptions.maxWait = wait;
        debounceOptions.trailing = trailing;
        var result = debounce(func, wait, debounceOptions);
        return result;
      }
      function wrap(value, wrapper) {
        if (!isFunction(wrapper)) {
          throw new TypeError();
        }
        return function () {
          var args = [value];
          push.apply(args, arguments);
          return wrapper.apply(this, args);
        };
      }
      function escape(string) {
        return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
      }
      function identity(value) {
        return value;
      }
      function mixin(object, source) {
        var ctor = object, isFunc = !source || isFunction(ctor);
        if (!source) {
          ctor = lodashWrapper;
          source = object;
          object = lodash;
        }
        forEach(functions(source), function (methodName) {
          var func = object[methodName] = source[methodName];
          if (isFunc) {
            ctor.prototype[methodName] = function () {
              var value = this.__wrapped__, args = [value];
              push.apply(args, arguments);
              var result = func.apply(object, args);
              if (value && typeof value == 'object' && value === result) {
                return this;
              }
              result = new ctor(result);
              result.__chain__ = this.__chain__;
              return result;
            };
          }
        });
      }
      function noConflict() {
        context._ = oldDash;
        return this;
      }
      var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function (value, radix) {
          return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
        };
      function random(min, max, floating) {
        var noMin = min == null, noMax = max == null;
        if (floating == null) {
          if (typeof min == 'boolean' && noMax) {
            floating = min;
            min = 1;
          } else if (!noMax && typeof max == 'boolean') {
            floating = max;
            noMax = true;
          }
        }
        if (noMin && noMax) {
          max = 1;
        }
        min = +min || 0;
        if (noMax) {
          max = min;
          min = 0;
        } else {
          max = +max || 0;
        }
        var rand = nativeRandom();
        return floating || min % 1 || max % 1 ? nativeMin(min + rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1))), max) : min + floor(rand * (max - min + 1));
      }
      function result(object, property) {
        if (object) {
          var value = object[property];
          return isFunction(value) ? object[property]() : value;
        }
      }
      function template(text, data, options) {
        var settings = lodash.templateSettings;
        text || (text = '');
        options = defaults({}, options, settings);
        var imports = defaults({}, options.imports, settings.imports), importsKeys = keys(imports), importsValues = values(imports);
        var isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = '__p += \'';
        var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
        text.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            source += '\' +\n__e(' + escapeValue + ') +\n\'';
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += '\';\n' + evaluateValue + ';\n__p += \'';
          }
          if (interpolateValue) {
            source += '\' +\n((__t = (' + interpolateValue + ')) == null ? \'\' : __t) +\n\'';
          }
          index = offset + match.length;
          return match;
        });
        source += '\';\n';
        var variable = options.variable, hasVariable = variable;
        if (!hasVariable) {
          variable = 'obj';
          source = 'with (' + variable + ') {\n' + source + '\n}\n';
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
        source = 'function(' + variable + ') {\n' + (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') + 'var __t, __p = \'\', __e = _.escape' + (isEvaluating ? ', __j = Array.prototype.join;\n' + 'function print() { __p += __j.call(arguments, \'\') }\n' : ';\n') + source + 'return __p\n}';
        var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + templateCounter++ + ']') + '\n*/';
        try {
          var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
        } catch (e) {
          e.source = source;
          throw e;
        }
        if (data) {
          return result(data);
        }
        result.source = source;
        return result;
      }
      function times(n, callback, thisArg) {
        n = (n = +n) > -1 ? n : 0;
        var index = -1, result = Array(n);
        callback = baseCreateCallback(callback, thisArg, 1);
        while (++index < n) {
          result[index] = callback(index);
        }
        return result;
      }
      function unescape(string) {
        return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return String(prefix == null ? '' : prefix) + id;
      }
      function chain(value) {
        value = new lodashWrapper(value);
        value.__chain__ = true;
        return value;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function wrapperChain() {
        this.__chain__ = true;
        return this;
      }
      function wrapperToString() {
        return String(this.__wrapped__);
      }
      function wrapperValueOf() {
        return this.__wrapped__;
      }
      lodash.after = after;
      lodash.assign = assign;
      lodash.at = at;
      lodash.bind = bind;
      lodash.bindAll = bindAll;
      lodash.bindKey = bindKey;
      lodash.chain = chain;
      lodash.compact = compact;
      lodash.compose = compose;
      lodash.countBy = countBy;
      lodash.createCallback = createCallback;
      lodash.curry = curry;
      lodash.debounce = debounce;
      lodash.defaults = defaults;
      lodash.defer = defer;
      lodash.delay = delay;
      lodash.difference = difference;
      lodash.filter = filter;
      lodash.flatten = flatten;
      lodash.forEach = forEach;
      lodash.forEachRight = forEachRight;
      lodash.forIn = forIn;
      lodash.forInRight = forInRight;
      lodash.forOwn = forOwn;
      lodash.forOwnRight = forOwnRight;
      lodash.functions = functions;
      lodash.groupBy = groupBy;
      lodash.indexBy = indexBy;
      lodash.initial = initial;
      lodash.intersection = intersection;
      lodash.invert = invert;
      lodash.invoke = invoke;
      lodash.keys = keys;
      lodash.map = map;
      lodash.max = max;
      lodash.memoize = memoize;
      lodash.merge = merge;
      lodash.min = min;
      lodash.omit = omit;
      lodash.once = once;
      lodash.pairs = pairs;
      lodash.partial = partial;
      lodash.partialRight = partialRight;
      lodash.pick = pick;
      lodash.pluck = pluck;
      lodash.pull = pull;
      lodash.range = range;
      lodash.reject = reject;
      lodash.remove = remove;
      lodash.rest = rest;
      lodash.shuffle = shuffle;
      lodash.sortBy = sortBy;
      lodash.tap = tap;
      lodash.throttle = throttle;
      lodash.times = times;
      lodash.toArray = toArray;
      lodash.transform = transform;
      lodash.union = union;
      lodash.uniq = uniq;
      lodash.values = values;
      lodash.where = where;
      lodash.without = without;
      lodash.wrap = wrap;
      lodash.zip = zip;
      lodash.zipObject = zipObject;
      lodash.collect = map;
      lodash.drop = rest;
      lodash.each = forEach;
      lodash.eachRight = forEachRight;
      lodash.extend = assign;
      lodash.methods = functions;
      lodash.object = zipObject;
      lodash.select = filter;
      lodash.tail = rest;
      lodash.unique = uniq;
      lodash.unzip = zip;
      mixin(lodash);
      lodash.clone = clone;
      lodash.cloneDeep = cloneDeep;
      lodash.contains = contains;
      lodash.escape = escape;
      lodash.every = every;
      lodash.find = find;
      lodash.findIndex = findIndex;
      lodash.findKey = findKey;
      lodash.findLast = findLast;
      lodash.findLastIndex = findLastIndex;
      lodash.findLastKey = findLastKey;
      lodash.has = has;
      lodash.identity = identity;
      lodash.indexOf = indexOf;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isBoolean = isBoolean;
      lodash.isDate = isDate;
      lodash.isElement = isElement;
      lodash.isEmpty = isEmpty;
      lodash.isEqual = isEqual;
      lodash.isFinite = isFinite;
      lodash.isFunction = isFunction;
      lodash.isNaN = isNaN;
      lodash.isNull = isNull;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isPlainObject = isPlainObject;
      lodash.isRegExp = isRegExp;
      lodash.isString = isString;
      lodash.isUndefined = isUndefined;
      lodash.lastIndexOf = lastIndexOf;
      lodash.mixin = mixin;
      lodash.noConflict = noConflict;
      lodash.parseInt = parseInt;
      lodash.random = random;
      lodash.reduce = reduce;
      lodash.reduceRight = reduceRight;
      lodash.result = result;
      lodash.runInContext = runInContext;
      lodash.size = size;
      lodash.some = some;
      lodash.sortedIndex = sortedIndex;
      lodash.template = template;
      lodash.unescape = unescape;
      lodash.uniqueId = uniqueId;
      lodash.all = every;
      lodash.any = some;
      lodash.detect = find;
      lodash.findWhere = find;
      lodash.foldl = reduce;
      lodash.foldr = reduceRight;
      lodash.include = contains;
      lodash.inject = reduce;
      forOwn(lodash, function (func, methodName) {
        if (!lodash.prototype[methodName]) {
          lodash.prototype[methodName] = function () {
            var args = [this.__wrapped__], chainAll = this.__chain__;
            push.apply(args, arguments);
            var result = func.apply(lodash, args);
            return chainAll ? new lodashWrapper(result, chainAll) : result;
          };
        }
      });
      lodash.first = first;
      lodash.last = last;
      lodash.sample = sample;
      lodash.take = first;
      lodash.head = first;
      forOwn(lodash, function (func, methodName) {
        var callbackable = methodName !== 'sample';
        if (!lodash.prototype[methodName]) {
          lodash.prototype[methodName] = function (n, guard) {
            var chainAll = this.__chain__, result = func(this.__wrapped__, n, guard);
            return !chainAll && (n == null || guard && !(callbackable && typeof n == 'function')) ? result : new lodashWrapper(result, chainAll);
          };
        }
      });
      lodash.VERSION = '2.2.1';
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.toString = wrapperToString;
      lodash.prototype.value = wrapperValueOf;
      lodash.prototype.valueOf = wrapperValueOf;
      forEach([
        'join',
        'pop',
        'shift'
      ], function (methodName) {
        var func = arrayRef[methodName];
        lodash.prototype[methodName] = function () {
          var chainAll = this.__chain__, result = func.apply(this.__wrapped__, arguments);
          return chainAll ? new lodashWrapper(result, chainAll) : result;
        };
      });
      forEach([
        'push',
        'reverse',
        'sort',
        'unshift'
      ], function (methodName) {
        var func = arrayRef[methodName];
        lodash.prototype[methodName] = function () {
          func.apply(this.__wrapped__, arguments);
          return this;
        };
      });
      forEach([
        'concat',
        'slice',
        'splice'
      ], function (methodName) {
        var func = arrayRef[methodName];
        lodash.prototype[methodName] = function () {
          return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
        };
      });
      return lodash;
    }
    var _ = runInContext();
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      root._ = _;
      define('lodash', [], function () {
        return _;
      });
    } else if (freeExports && freeModule) {
      if (moduleExports) {
        (freeModule.exports = _)._ = _;
      } else {
        freeExports._ = _;
      }
    } else {
      root._ = _;
    }
  }.call(this));
  define('directives/masonry', [
    './module',
    'masonry',
    'imagesLoaded',
    'lodash'
  ], function (directives, Masonry, imagesLoaded, _) {
    'use strict';
    directives.directive('masonryWallDir', function () {
      return {
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ($scope, $element, $attrs) {
            var wallContainer, masonryOptions;
            wallContainer = $element[0];
            masonryOptions = _.assign({}, $scope.$eval($attrs.masonryWallOptions), { itemSelector: $attrs.masonryWallDir });
            this.masonry = new Masonry(wallContainer, masonryOptions);
            this.masonry.bindResize();
            var self = this;
            this.debouncedReload = _.debounce(function () {
              self.masonry.reloadItems();
              self.masonry.layout();
            }, 100);
          }
        ]
      };
    });
    directives.directive('masonryItemDir', function () {
      return {
        require: '^masonryWallDir',
        link: function (scope, element, attributes, masonryWallDirCtrl) {
          imagesLoaded(element, function () {
            if (scope.$first) {
              masonryWallDirCtrl.masonry.prepended(element);
            } else {
              masonryWallDirCtrl.masonry.appended(element);
            }
          });
          scope.$on('$destroy', masonryWallDirCtrl.debouncedReload);
        }
      };
    });
  });
  define('directives/index', ['./masonry'], function () {
  });
  angular.module('ui.bootstrap', [
    'ui.bootstrap.tpls',
    'ui.bootstrap.transition',
    'ui.bootstrap.collapse',
    'ui.bootstrap.accordion',
    'ui.bootstrap.alert',
    'ui.bootstrap.buttons',
    'ui.bootstrap.carousel',
    'ui.bootstrap.position',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.dialog',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.modal',
    'ui.bootstrap.pagination',
    'ui.bootstrap.tooltip',
    'ui.bootstrap.popover',
    'ui.bootstrap.progressbar',
    'ui.bootstrap.rating',
    'ui.bootstrap.tabs',
    'ui.bootstrap.timepicker',
    'ui.bootstrap.typeahead'
  ]);
  angular.module('ui.bootstrap.tpls', [
    'template/accordion/accordion-group.html',
    'template/accordion/accordion.html',
    'template/alert/alert.html',
    'template/carousel/carousel.html',
    'template/carousel/slide.html',
    'template/datepicker/datepicker.html',
    'template/datepicker/popup.html',
    'template/dialog/message.html',
    'template/pagination/pager.html',
    'template/pagination/pagination.html',
    'template/tooltip/tooltip-html-unsafe-popup.html',
    'template/tooltip/tooltip-popup.html',
    'template/popover/popover.html',
    'template/progressbar/bar.html',
    'template/progressbar/progress.html',
    'template/rating/rating.html',
    'template/tabs/tab.html',
    'template/tabs/tabset-titles.html',
    'template/tabs/tabset.html',
    'template/timepicker/timepicker.html',
    'template/typeahead/typeahead-match.html',
    'template/typeahead/typeahead-popup.html'
  ]);
  angular.module('ui.bootstrap.transition', []).factory('$transition', [
    '$q',
    '$timeout',
    '$rootScope',
    function ($q, $timeout, $rootScope) {
      var $transition = function (element, trigger, options) {
        options = options || {};
        var deferred = $q.defer();
        var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];
        var transitionEndHandler = function (event) {
          $rootScope.$apply(function () {
            element.unbind(endEventName, transitionEndHandler);
            deferred.resolve(element);
          });
        };
        if (endEventName) {
          element.bind(endEventName, transitionEndHandler);
        }
        $timeout(function () {
          if (angular.isString(trigger)) {
            element.addClass(trigger);
          } else if (angular.isFunction(trigger)) {
            trigger(element);
          } else if (angular.isObject(trigger)) {
            element.css(trigger);
          }
          if (!endEventName) {
            deferred.resolve(element);
          }
        });
        deferred.promise.cancel = function () {
          if (endEventName) {
            element.unbind(endEventName, transitionEndHandler);
          }
          deferred.reject('Transition cancelled');
        };
        return deferred.promise;
      };
      var transElement = document.createElement('trans');
      var transitionEndEventNames = {
          'WebkitTransition': 'webkitTransitionEnd',
          'MozTransition': 'transitionend',
          'OTransition': 'oTransitionEnd',
          'transition': 'transitionend'
        };
      var animationEndEventNames = {
          'WebkitTransition': 'webkitAnimationEnd',
          'MozTransition': 'animationend',
          'OTransition': 'oAnimationEnd',
          'transition': 'animationend'
        };
      function findEndEventName(endEventNames) {
        for (var name in endEventNames) {
          if (transElement.style[name] !== undefined) {
            return endEventNames[name];
          }
        }
      }
      $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
      $transition.animationEndEventName = findEndEventName(animationEndEventNames);
      return $transition;
    }
  ]);
  angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition']).directive('collapse', [
    '$transition',
    function ($transition) {
      var fixUpHeight = function (scope, element, height) {
        element.removeClass('collapse');
        element.css({ height: height });
        var x = element[0].offsetWidth;
        element.addClass('collapse');
      };
      return {
        link: function (scope, element, attrs) {
          var isCollapsed;
          var initialAnimSkip = true;
          scope.$watch(function () {
            return element[0].scrollHeight;
          }, function (value) {
            if (element[0].scrollHeight !== 0) {
              if (!isCollapsed) {
                if (initialAnimSkip) {
                  fixUpHeight(scope, element, element[0].scrollHeight + 'px');
                } else {
                  fixUpHeight(scope, element, 'auto');
                }
              }
            }
          });
          scope.$watch(attrs.collapse, function (value) {
            if (value) {
              collapse();
            } else {
              expand();
            }
          });
          var currentTransition;
          var doTransition = function (change) {
            if (currentTransition) {
              currentTransition.cancel();
            }
            currentTransition = $transition(element, change);
            currentTransition.then(function () {
              currentTransition = undefined;
            }, function () {
              currentTransition = undefined;
            });
            return currentTransition;
          };
          var expand = function () {
            if (initialAnimSkip) {
              initialAnimSkip = false;
              if (!isCollapsed) {
                fixUpHeight(scope, element, 'auto');
              }
            } else {
              doTransition({ height: element[0].scrollHeight + 'px' }).then(function () {
                if (!isCollapsed) {
                  fixUpHeight(scope, element, 'auto');
                }
              });
            }
            isCollapsed = false;
          };
          var collapse = function () {
            isCollapsed = true;
            if (initialAnimSkip) {
              initialAnimSkip = false;
              fixUpHeight(scope, element, 0);
            } else {
              fixUpHeight(scope, element, element[0].scrollHeight + 'px');
              doTransition({ 'height': '0' });
            }
          };
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse']).constant('accordionConfig', { closeOthers: true }).controller('AccordionController', [
    '$scope',
    '$attrs',
    'accordionConfig',
    function ($scope, $attrs, accordionConfig) {
      this.groups = [];
      this.closeOthers = function (openGroup) {
        var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        if (closeOthers) {
          angular.forEach(this.groups, function (group) {
            if (group !== openGroup) {
              group.isOpen = false;
            }
          });
        }
      };
      this.addGroup = function (groupScope) {
        var that = this;
        this.groups.push(groupScope);
        groupScope.$on('$destroy', function (event) {
          that.removeGroup(groupScope);
        });
      };
      this.removeGroup = function (group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
          this.groups.splice(this.groups.indexOf(group), 1);
        }
      };
    }
  ]).directive('accordion', function () {
    return {
      restrict: 'EA',
      controller: 'AccordionController',
      transclude: true,
      replace: false,
      templateUrl: 'template/accordion/accordion.html'
    };
  }).directive('accordionGroup', [
    '$parse',
    '$transition',
    '$timeout',
    function ($parse, $transition, $timeout) {
      return {
        require: '^accordion',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: 'template/accordion/accordion-group.html',
        scope: { heading: '@' },
        controller: [
          '$scope',
          function ($scope) {
            this.setHeading = function (element) {
              this.heading = element;
            };
          }
        ],
        link: function (scope, element, attrs, accordionCtrl) {
          var getIsOpen, setIsOpen;
          accordionCtrl.addGroup(scope);
          scope.isOpen = false;
          if (attrs.isOpen) {
            getIsOpen = $parse(attrs.isOpen);
            setIsOpen = getIsOpen.assign;
            scope.$watch(function watchIsOpen() {
              return getIsOpen(scope.$parent);
            }, function updateOpen(value) {
              scope.isOpen = value;
            });
            scope.isOpen = getIsOpen ? getIsOpen(scope.$parent) : false;
          }
          scope.$watch('isOpen', function (value) {
            if (value) {
              accordionCtrl.closeOthers(scope);
            }
            if (setIsOpen) {
              setIsOpen(scope.$parent, value);
            }
          });
        }
      };
    }
  ]).directive('accordionHeading', function () {
    return {
      restrict: 'EA',
      transclude: true,
      template: '',
      replace: true,
      require: '^accordionGroup',
      compile: function (element, attr, transclude) {
        return function link(scope, element, attr, accordionGroupCtrl) {
          accordionGroupCtrl.setHeading(transclude(scope, function () {
          }));
        };
      }
    };
  }).directive('accordionTransclude', function () {
    return {
      require: '^accordionGroup',
      link: function (scope, element, attr, controller) {
        scope.$watch(function () {
          return controller[attr.accordionTransclude];
        }, function (heading) {
          if (heading) {
            element.html('');
            element.append(heading);
          }
        });
      }
    };
  });
  angular.module('ui.bootstrap.alert', []).directive('alert', function () {
    return {
      restrict: 'EA',
      templateUrl: 'template/alert/alert.html',
      transclude: true,
      replace: true,
      scope: {
        type: '=',
        close: '&'
      },
      link: function (scope, iElement, iAttrs, controller) {
        scope.closeable = 'close' in iAttrs;
      }
    };
  });
  angular.module('ui.bootstrap.buttons', []).constant('buttonConfig', {
    activeClass: 'active',
    toggleEvent: 'click'
  }).directive('btnRadio', [
    'buttonConfig',
    function (buttonConfig) {
      var activeClass = buttonConfig.activeClass || 'active';
      var toggleEvent = buttonConfig.toggleEvent || 'click';
      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
          ngModelCtrl.$render = function () {
            element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
          };
          element.bind(toggleEvent, function () {
            if (!element.hasClass(activeClass)) {
              scope.$apply(function () {
                ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                ngModelCtrl.$render();
              });
            }
          });
        }
      };
    }
  ]).directive('btnCheckbox', [
    'buttonConfig',
    function (buttonConfig) {
      var activeClass = buttonConfig.activeClass || 'active';
      var toggleEvent = buttonConfig.toggleEvent || 'click';
      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
          function getTrueValue() {
            var trueValue = scope.$eval(attrs.btnCheckboxTrue);
            return angular.isDefined(trueValue) ? trueValue : true;
          }
          function getFalseValue() {
            var falseValue = scope.$eval(attrs.btnCheckboxFalse);
            return angular.isDefined(falseValue) ? falseValue : false;
          }
          ngModelCtrl.$render = function () {
            element.toggleClass(activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
          };
          element.bind(toggleEvent, function () {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(element.hasClass(activeClass) ? getFalseValue() : getTrueValue());
              ngModelCtrl.$render();
            });
          });
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition']).controller('CarouselController', [
    '$scope',
    '$timeout',
    '$transition',
    '$q',
    function ($scope, $timeout, $transition, $q) {
      var self = this, slides = self.slides = [], currentIndex = -1, currentTimeout, isPlaying;
      self.currentSlide = null;
      self.select = function (nextSlide, direction) {
        var nextIndex = slides.indexOf(nextSlide);
        if (direction === undefined) {
          direction = nextIndex > currentIndex ? 'next' : 'prev';
        }
        if (nextSlide && nextSlide !== self.currentSlide) {
          if ($scope.$currentTransition) {
            $scope.$currentTransition.cancel();
            $timeout(goNext);
          } else {
            goNext();
          }
        }
        function goNext() {
          if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
            nextSlide.$element.addClass(direction);
            nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth;
            angular.forEach(slides, function (slide) {
              angular.extend(slide, {
                direction: '',
                entering: false,
                leaving: false,
                active: false
              });
            });
            angular.extend(nextSlide, {
              direction: direction,
              active: true,
              entering: true
            });
            angular.extend(self.currentSlide || {}, {
              direction: direction,
              leaving: true
            });
            $scope.$currentTransition = $transition(nextSlide.$element, {});
            (function (next, current) {
              $scope.$currentTransition.then(function () {
                transitionDone(next, current);
              }, function () {
                transitionDone(next, current);
              });
            }(nextSlide, self.currentSlide));
          } else {
            transitionDone(nextSlide, self.currentSlide);
          }
          self.currentSlide = nextSlide;
          currentIndex = nextIndex;
          restartTimer();
        }
        function transitionDone(next, current) {
          angular.extend(next, {
            direction: '',
            active: true,
            leaving: false,
            entering: false
          });
          angular.extend(current || {}, {
            direction: '',
            active: false,
            leaving: false,
            entering: false
          });
          $scope.$currentTransition = null;
        }
      };
      self.indexOfSlide = function (slide) {
        return slides.indexOf(slide);
      };
      $scope.next = function () {
        var newIndex = (currentIndex + 1) % slides.length;
        if (!$scope.$currentTransition) {
          return self.select(slides[newIndex], 'next');
        }
      };
      $scope.prev = function () {
        var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
        if (!$scope.$currentTransition) {
          return self.select(slides[newIndex], 'prev');
        }
      };
      $scope.select = function (slide) {
        self.select(slide);
      };
      $scope.isActive = function (slide) {
        return self.currentSlide === slide;
      };
      $scope.slides = function () {
        return slides;
      };
      $scope.$watch('interval', restartTimer);
      function restartTimer() {
        if (currentTimeout) {
          $timeout.cancel(currentTimeout);
        }
        function go() {
          if (isPlaying) {
            $scope.next();
            restartTimer();
          } else {
            $scope.pause();
          }
        }
        var interval = +$scope.interval;
        if (!isNaN(interval) && interval >= 0) {
          currentTimeout = $timeout(go, interval);
        }
      }
      $scope.play = function () {
        if (!isPlaying) {
          isPlaying = true;
          restartTimer();
        }
      };
      $scope.pause = function () {
        if (!$scope.noPause) {
          isPlaying = false;
          if (currentTimeout) {
            $timeout.cancel(currentTimeout);
          }
        }
      };
      self.addSlide = function (slide, element) {
        slide.$element = element;
        slides.push(slide);
        if (slides.length === 1 || slide.active) {
          self.select(slides[slides.length - 1]);
          if (slides.length == 1) {
            $scope.play();
          }
        } else {
          slide.active = false;
        }
      };
      self.removeSlide = function (slide) {
        var index = slides.indexOf(slide);
        slides.splice(index, 1);
        if (slides.length > 0 && slide.active) {
          if (index >= slides.length) {
            self.select(slides[index - 1]);
          } else {
            self.select(slides[index]);
          }
        } else if (currentIndex > index) {
          currentIndex--;
        }
      };
    }
  ]).directive('carousel', [function () {
      return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        controller: 'CarouselController',
        require: 'carousel',
        templateUrl: 'template/carousel/carousel.html',
        scope: {
          interval: '=',
          noTransition: '=',
          noPause: '='
        }
      };
    }]).directive('slide', [
    '$parse',
    function ($parse) {
      return {
        require: '^carousel',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: 'template/carousel/slide.html',
        scope: {},
        link: function (scope, element, attrs, carouselCtrl) {
          if (attrs.active) {
            var getActive = $parse(attrs.active);
            var setActive = getActive.assign;
            var lastValue = scope.active = getActive(scope.$parent);
            scope.$watch(function parentActiveWatch() {
              var parentActive = getActive(scope.$parent);
              if (parentActive !== scope.active) {
                if (parentActive !== lastValue) {
                  lastValue = scope.active = parentActive;
                } else {
                  setActive(scope.$parent, parentActive = lastValue = scope.active);
                }
              }
              return parentActive;
            });
          }
          carouselCtrl.addSlide(scope, element);
          scope.$on('$destroy', function () {
            carouselCtrl.removeSlide(scope);
          });
          scope.$watch('active', function (active) {
            if (active) {
              carouselCtrl.select(scope);
            }
          });
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.position', []).factory('$position', [
    '$document',
    '$window',
    function ($document, $window) {
      var mouseX, mouseY;
      $document.bind('mousemove', function mouseMoved(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
      });
      function getStyle(el, cssprop) {
        if (el.currentStyle) {
          return el.currentStyle[cssprop];
        } else if ($window.getComputedStyle) {
          return $window.getComputedStyle(el)[cssprop];
        }
        return el.style[cssprop];
      }
      function isStaticPositioned(element) {
        return (getStyle(element, 'position') || 'static') === 'static';
      }
      var parentOffsetEl = function (element) {
        var docDomEl = $document[0];
        var offsetParent = element.offsetParent || docDomEl;
        while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docDomEl;
      };
      return {
        position: function (element) {
          var elBCR = this.offset(element);
          var offsetParentBCR = {
              top: 0,
              left: 0
            };
          var offsetParentEl = parentOffsetEl(element[0]);
          if (offsetParentEl != $document[0]) {
            offsetParentBCR = this.offset(angular.element(offsetParentEl));
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
          }
          return {
            width: element.prop('offsetWidth'),
            height: element.prop('offsetHeight'),
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
          };
        },
        offset: function (element) {
          var boundingClientRect = element[0].getBoundingClientRect();
          return {
            width: element.prop('offsetWidth'),
            height: element.prop('offsetHeight'),
            top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop),
            left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft)
          };
        },
        mouse: function () {
          return {
            x: mouseX,
            y: mouseY
          };
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.position']).constant('datepickerConfig', {
    dayFormat: 'dd',
    monthFormat: 'MMMM',
    yearFormat: 'yyyy',
    dayHeaderFormat: 'EEE',
    dayTitleFormat: 'MMMM yyyy',
    monthTitleFormat: 'yyyy',
    showWeeks: true,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null
  }).controller('DatepickerController', [
    '$scope',
    '$attrs',
    'dateFilter',
    'datepickerConfig',
    function ($scope, $attrs, dateFilter, dtConfig) {
      var format = {
          day: getValue($attrs.dayFormat, dtConfig.dayFormat),
          month: getValue($attrs.monthFormat, dtConfig.monthFormat),
          year: getValue($attrs.yearFormat, dtConfig.yearFormat),
          dayHeader: getValue($attrs.dayHeaderFormat, dtConfig.dayHeaderFormat),
          dayTitle: getValue($attrs.dayTitleFormat, dtConfig.dayTitleFormat),
          monthTitle: getValue($attrs.monthTitleFormat, dtConfig.monthTitleFormat)
        }, startingDay = getValue($attrs.startingDay, dtConfig.startingDay), yearRange = getValue($attrs.yearRange, dtConfig.yearRange);
      this.minDate = dtConfig.minDate ? new Date(dtConfig.minDate) : null;
      this.maxDate = dtConfig.maxDate ? new Date(dtConfig.maxDate) : null;
      function getValue(value, defaultValue) {
        return angular.isDefined(value) ? $scope.$parent.$eval(value) : defaultValue;
      }
      function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
      }
      function getDates(startDate, n) {
        var dates = new Array(n);
        var current = startDate, i = 0;
        while (i < n) {
          dates[i++] = new Date(current);
          current.setDate(current.getDate() + 1);
        }
        return dates;
      }
      function makeDate(date, format, isSelected, isSecondary) {
        return {
          date: date,
          label: dateFilter(date, format),
          selected: !!isSelected,
          secondary: !!isSecondary
        };
      }
      this.modes = [
        {
          name: 'day',
          getVisibleDates: function (date, selected) {
            var year = date.getFullYear(), month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1);
            var difference = startingDay - firstDayOfMonth.getDay(), numDisplayedFromPreviousMonth = difference > 0 ? 7 - difference : -difference, firstDate = new Date(firstDayOfMonth), numDates = 0;
            if (numDisplayedFromPreviousMonth > 0) {
              firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
              numDates += numDisplayedFromPreviousMonth;
            }
            numDates += getDaysInMonth(year, month + 1);
            numDates += (7 - numDates % 7) % 7;
            var days = getDates(firstDate, numDates), labels = new Array(7);
            for (var i = 0; i < numDates; i++) {
              var dt = new Date(days[i]);
              days[i] = makeDate(dt, format.day, selected && selected.getDate() === dt.getDate() && selected.getMonth() === dt.getMonth() && selected.getFullYear() === dt.getFullYear(), dt.getMonth() !== month);
            }
            for (var j = 0; j < 7; j++) {
              labels[j] = dateFilter(days[j].date, format.dayHeader);
            }
            return {
              objects: days,
              title: dateFilter(date, format.dayTitle),
              labels: labels
            };
          },
          compare: function (date1, date2) {
            return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
          },
          split: 7,
          step: { months: 1 }
        },
        {
          name: 'month',
          getVisibleDates: function (date, selected) {
            var months = new Array(12), year = date.getFullYear();
            for (var i = 0; i < 12; i++) {
              var dt = new Date(year, i, 1);
              months[i] = makeDate(dt, format.month, selected && selected.getMonth() === i && selected.getFullYear() === year);
            }
            return {
              objects: months,
              title: dateFilter(date, format.monthTitle)
            };
          },
          compare: function (date1, date2) {
            return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
          },
          split: 3,
          step: { years: 1 }
        },
        {
          name: 'year',
          getVisibleDates: function (date, selected) {
            var years = new Array(yearRange), year = date.getFullYear(), startYear = parseInt((year - 1) / yearRange, 10) * yearRange + 1;
            for (var i = 0; i < yearRange; i++) {
              var dt = new Date(startYear + i, 0, 1);
              years[i] = makeDate(dt, format.year, selected && selected.getFullYear() === dt.getFullYear());
            }
            return {
              objects: years,
              title: [
                years[0].label,
                years[yearRange - 1].label
              ].join(' - ')
            };
          },
          compare: function (date1, date2) {
            return date1.getFullYear() - date2.getFullYear();
          },
          split: 5,
          step: { years: yearRange }
        }
      ];
      this.isDisabled = function (date, mode) {
        var currentMode = this.modes[mode || 0];
        return this.minDate && currentMode.compare(date, this.minDate) < 0 || this.maxDate && currentMode.compare(date, this.maxDate) > 0 || $scope.dateDisabled && $scope.dateDisabled({
          date: date,
          mode: currentMode.name
        });
      };
    }
  ]).directive('datepicker', [
    'dateFilter',
    '$parse',
    'datepickerConfig',
    '$log',
    function (dateFilter, $parse, datepickerConfig, $log) {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/datepicker/datepicker.html',
        scope: { dateDisabled: '&' },
        require: [
          'datepicker',
          '?^ngModel'
        ],
        controller: 'DatepickerController',
        link: function (scope, element, attrs, ctrls) {
          var datepickerCtrl = ctrls[0], ngModel = ctrls[1];
          if (!ngModel) {
            return;
          }
          var mode = 0, selected = new Date(), showWeeks = datepickerConfig.showWeeks;
          if (attrs.showWeeks) {
            scope.$parent.$watch($parse(attrs.showWeeks), function (value) {
              showWeeks = !!value;
              updateShowWeekNumbers();
            });
          } else {
            updateShowWeekNumbers();
          }
          if (attrs.min) {
            scope.$parent.$watch($parse(attrs.min), function (value) {
              datepickerCtrl.minDate = value ? new Date(value) : null;
              refill();
            });
          }
          if (attrs.max) {
            scope.$parent.$watch($parse(attrs.max), function (value) {
              datepickerCtrl.maxDate = value ? new Date(value) : null;
              refill();
            });
          }
          function updateShowWeekNumbers() {
            scope.showWeekNumbers = mode === 0 && showWeeks;
          }
          function split(arr, size) {
            var arrays = [];
            while (arr.length > 0) {
              arrays.push(arr.splice(0, size));
            }
            return arrays;
          }
          function refill(updateSelected) {
            var date = null, valid = true;
            if (ngModel.$modelValue) {
              date = new Date(ngModel.$modelValue);
              if (isNaN(date)) {
                valid = false;
                $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
              } else if (updateSelected) {
                selected = date;
              }
            }
            ngModel.$setValidity('date', valid);
            var currentMode = datepickerCtrl.modes[mode], data = currentMode.getVisibleDates(selected, date);
            angular.forEach(data.objects, function (obj) {
              obj.disabled = datepickerCtrl.isDisabled(obj.date, mode);
            });
            ngModel.$setValidity('date-disabled', !date || !datepickerCtrl.isDisabled(date));
            scope.rows = split(data.objects, currentMode.split);
            scope.labels = data.labels || [];
            scope.title = data.title;
          }
          function setMode(value) {
            mode = value;
            updateShowWeekNumbers();
            refill();
          }
          ngModel.$render = function () {
            refill(true);
          };
          scope.select = function (date) {
            if (mode === 0) {
              var dt = new Date(ngModel.$modelValue);
              dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
              ngModel.$setViewValue(dt);
              refill(true);
            } else {
              selected = date;
              setMode(mode - 1);
            }
          };
          scope.move = function (direction) {
            var step = datepickerCtrl.modes[mode].step;
            selected.setMonth(selected.getMonth() + direction * (step.months || 0));
            selected.setFullYear(selected.getFullYear() + direction * (step.years || 0));
            refill();
          };
          scope.toggleMode = function () {
            setMode((mode + 1) % datepickerCtrl.modes.length);
          };
          scope.getWeekNumber = function (row) {
            return mode === 0 && scope.showWeekNumbers && row.length === 7 ? getISO8601WeekNumber(row[0].date) : null;
          };
          function getISO8601WeekNumber(date) {
            var checkDate = new Date(date);
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
          }
        }
      };
    }
  ]).constant('datepickerPopupConfig', {
    dateFormat: 'yyyy-MM-dd',
    closeOnDateSelection: true
  }).directive('datepickerPopup', [
    '$compile',
    '$parse',
    '$document',
    '$position',
    'dateFilter',
    'datepickerPopupConfig',
    function ($compile, $parse, $document, $position, dateFilter, datepickerPopupConfig) {
      return {
        restrict: 'EA',
        require: 'ngModel',
        link: function (originalScope, element, attrs, ngModel) {
          var closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection;
          var dateFormat = attrs.datepickerPopup || datepickerPopupConfig.dateFormat;
          var scope = originalScope.$new();
          originalScope.$on('$destroy', function () {
            scope.$destroy();
          });
          function formatDate(value) {
            return value ? dateFilter(value, dateFormat) : null;
          }
          ngModel.$formatters.push(formatDate);
          function parseDate(value) {
            if (value) {
              var date = new Date(value);
              if (!isNaN(date)) {
                return date;
              }
            }
            return value;
          }
          ngModel.$parsers.push(parseDate);
          var getIsOpen, setIsOpen;
          if (attrs.open) {
            getIsOpen = $parse(attrs.open);
            setIsOpen = getIsOpen.assign;
            originalScope.$watch(getIsOpen, function updateOpen(value) {
              scope.isOpen = !!value;
            });
          }
          scope.isOpen = getIsOpen ? getIsOpen(originalScope) : false;
          function setOpen(value) {
            if (setIsOpen) {
              setIsOpen(originalScope, !!value);
            } else {
              scope.isOpen = !!value;
            }
          }
          var documentClickBind = function (event) {
            if (scope.isOpen && event.target !== element[0]) {
              scope.$apply(function () {
                setOpen(false);
              });
            }
          };
          var elementFocusBind = function () {
            scope.$apply(function () {
              setOpen(true);
            });
          };
          var popupEl = angular.element('<datepicker-popup-wrap><datepicker></datepicker></datepicker-popup-wrap>');
          popupEl.attr({
            'ng-model': 'date',
            'ng-change': 'dateSelection()'
          });
          var datepickerEl = popupEl.find('datepicker');
          if (attrs.datepickerOptions) {
            datepickerEl.attr(angular.extend({}, originalScope.$eval(attrs.datepickerOptions)));
          }
          var $setModelValue = $parse(attrs.ngModel).assign;
          scope.dateSelection = function () {
            $setModelValue(originalScope, scope.date);
            if (closeOnDateSelection) {
              setOpen(false);
            }
          };
          scope.$watch(function () {
            return ngModel.$modelValue;
          }, function (value) {
            if (angular.isString(value)) {
              var date = parseDate(value);
              if (value && !date) {
                $setModelValue(originalScope, null);
                throw new Error(value + ' cannot be parsed to a date object.');
              } else {
                value = date;
              }
            }
            scope.date = value;
            updatePosition();
          });
          function addWatchableAttribute(attribute, scopeProperty, datepickerAttribute) {
            if (attribute) {
              originalScope.$watch($parse(attribute), function (value) {
                scope[scopeProperty] = value;
              });
              datepickerEl.attr(datepickerAttribute || scopeProperty, scopeProperty);
            }
          }
          addWatchableAttribute(attrs.min, 'min');
          addWatchableAttribute(attrs.max, 'max');
          if (attrs.showWeeks) {
            addWatchableAttribute(attrs.showWeeks, 'showWeeks', 'show-weeks');
          } else {
            scope.showWeeks = true;
            datepickerEl.attr('show-weeks', 'showWeeks');
          }
          if (attrs.dateDisabled) {
            datepickerEl.attr('date-disabled', attrs.dateDisabled);
          }
          function updatePosition() {
            scope.position = $position.position(element);
            scope.position.top = scope.position.top + element.prop('offsetHeight');
          }
          scope.$watch('isOpen', function (value) {
            if (value) {
              updatePosition();
              $document.bind('click', documentClickBind);
              element.unbind('focus', elementFocusBind);
              element.focus();
            } else {
              $document.unbind('click', documentClickBind);
              element.bind('focus', elementFocusBind);
            }
            if (setIsOpen) {
              setIsOpen(originalScope, value);
            }
          });
          scope.today = function () {
            $setModelValue(originalScope, new Date());
          };
          scope.clear = function () {
            $setModelValue(originalScope, null);
          };
          element.after($compile(popupEl)(scope));
        }
      };
    }
  ]).directive('datepickerPopupWrap', [function () {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'template/datepicker/popup.html',
        link: function (scope, element, attrs) {
          element.bind('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
          });
        }
      };
    }]);
  var dialogModule = angular.module('ui.bootstrap.dialog', ['ui.bootstrap.transition']);
  dialogModule.controller('MessageBoxController', [
    '$scope',
    'dialog',
    'model',
    function ($scope, dialog, model) {
      $scope.title = model.title;
      $scope.message = model.message;
      $scope.buttons = model.buttons;
      $scope.close = function (res) {
        dialog.close(res);
      };
    }
  ]);
  dialogModule.provider('$dialog', function () {
    var defaults = {
        backdrop: true,
        dialogClass: 'modal',
        backdropClass: 'modal-backdrop',
        transitionClass: 'fade',
        triggerClass: 'in',
        resolve: {},
        backdropFade: false,
        dialogFade: false,
        keyboard: true,
        backdropClick: true
      };
    var globalOptions = {};
    var activeBackdrops = { value: 0 };
    this.options = function (value) {
      globalOptions = value;
    };
    this.$get = [
      '$http',
      '$document',
      '$compile',
      '$rootScope',
      '$controller',
      '$templateCache',
      '$q',
      '$transition',
      '$injector',
      function ($http, $document, $compile, $rootScope, $controller, $templateCache, $q, $transition, $injector) {
        var body = $document.find('body');
        function createElement(clazz) {
          var el = angular.element('<div>');
          el.addClass(clazz);
          return el;
        }
        function Dialog(opts) {
          var self = this, options = this.options = angular.extend({}, defaults, globalOptions, opts);
          this._open = false;
          this.backdropEl = createElement(options.backdropClass);
          if (options.backdropFade) {
            this.backdropEl.addClass(options.transitionClass);
            this.backdropEl.removeClass(options.triggerClass);
          }
          this.modalEl = createElement(options.dialogClass);
          if (options.dialogFade) {
            this.modalEl.addClass(options.transitionClass);
            this.modalEl.removeClass(options.triggerClass);
          }
          this.handledEscapeKey = function (e) {
            if (e.which === 27) {
              self.close();
              e.preventDefault();
              self.$scope.$apply();
            }
          };
          this.handleBackDropClick = function (e) {
            self.close();
            e.preventDefault();
            self.$scope.$apply();
          };
        }
        Dialog.prototype.isOpen = function () {
          return this._open;
        };
        Dialog.prototype.open = function (templateUrl, controller) {
          var self = this, options = this.options;
          if (templateUrl) {
            options.templateUrl = templateUrl;
          }
          if (controller) {
            options.controller = controller;
          }
          if (!(options.template || options.templateUrl)) {
            throw new Error('Dialog.open expected template or templateUrl, neither found. Use options or open method to specify them.');
          }
          this._loadResolves().then(function (locals) {
            var $scope = locals.$scope = self.$scope = locals.$scope ? locals.$scope : $rootScope.$new();
            self.modalEl.html(locals.$template);
            if (self.options.controller) {
              var ctrl = $controller(self.options.controller, locals);
              self.modalEl.children().data('ngControllerController', ctrl);
            }
            $compile(self.modalEl)($scope);
            self._addElementsToDom();
            setTimeout(function () {
              if (self.options.dialogFade) {
                self.modalEl.addClass(self.options.triggerClass);
              }
              if (self.options.backdropFade) {
                self.backdropEl.addClass(self.options.triggerClass);
              }
            });
            self._bindEvents();
          });
          this.deferred = $q.defer();
          return this.deferred.promise;
        };
        Dialog.prototype.close = function (result) {
          var self = this;
          var fadingElements = this._getFadingElements();
          if (fadingElements.length > 0) {
            for (var i = fadingElements.length - 1; i >= 0; i--) {
              $transition(fadingElements[i], removeTriggerClass).then(onCloseComplete);
            }
            return;
          }
          this._onCloseComplete(result);
          function removeTriggerClass(el) {
            el.removeClass(self.options.triggerClass);
          }
          function onCloseComplete() {
            if (self._open) {
              self._onCloseComplete(result);
            }
          }
        };
        Dialog.prototype._getFadingElements = function () {
          var elements = [];
          if (this.options.dialogFade) {
            elements.push(this.modalEl);
          }
          if (this.options.backdropFade) {
            elements.push(this.backdropEl);
          }
          return elements;
        };
        Dialog.prototype._bindEvents = function () {
          if (this.options.keyboard) {
            body.bind('keydown', this.handledEscapeKey);
          }
          if (this.options.backdrop && this.options.backdropClick) {
            this.backdropEl.bind('click', this.handleBackDropClick);
          }
        };
        Dialog.prototype._unbindEvents = function () {
          if (this.options.keyboard) {
            body.unbind('keydown', this.handledEscapeKey);
          }
          if (this.options.backdrop && this.options.backdropClick) {
            this.backdropEl.unbind('click', this.handleBackDropClick);
          }
        };
        Dialog.prototype._onCloseComplete = function (result) {
          this._removeElementsFromDom();
          this._unbindEvents();
          this.deferred.resolve(result);
        };
        Dialog.prototype._addElementsToDom = function () {
          body.append(this.modalEl);
          if (this.options.backdrop) {
            if (activeBackdrops.value === 0) {
              body.append(this.backdropEl);
            }
            activeBackdrops.value++;
          }
          this._open = true;
        };
        Dialog.prototype._removeElementsFromDom = function () {
          this.modalEl.remove();
          if (this.options.backdrop) {
            activeBackdrops.value--;
            if (activeBackdrops.value === 0) {
              this.backdropEl.remove();
            }
          }
          this._open = false;
        };
        Dialog.prototype._loadResolves = function () {
          var values = [], keys = [], templatePromise, self = this;
          if (this.options.template) {
            templatePromise = $q.when(this.options.template);
          } else if (this.options.templateUrl) {
            templatePromise = $http.get(this.options.templateUrl, { cache: $templateCache }).then(function (response) {
              return response.data;
            });
          }
          angular.forEach(this.options.resolve || [], function (value, key) {
            keys.push(key);
            values.push(angular.isString(value) ? $injector.get(value) : $injector.invoke(value));
          });
          keys.push('$template');
          values.push(templatePromise);
          return $q.all(values).then(function (values) {
            var locals = {};
            angular.forEach(values, function (value, index) {
              locals[keys[index]] = value;
            });
            locals.dialog = self;
            return locals;
          });
        };
        return {
          dialog: function (opts) {
            return new Dialog(opts);
          },
          messageBox: function (title, message, buttons) {
            return new Dialog({
              templateUrl: 'template/dialog/message.html',
              controller: 'MessageBoxController',
              resolve: {
                model: function () {
                  return {
                    title: title,
                    message: message,
                    buttons: buttons
                  };
                }
              }
            });
          }
        };
      }
    ];
  });
  angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', [
    '$document',
    '$location',
    function ($document, $location) {
      var openElement = null, closeMenu = angular.noop;
      return {
        restrict: 'CA',
        link: function (scope, element, attrs) {
          scope.$watch('$location.path', function () {
            closeMenu();
          });
          element.parent().bind('click', function () {
            closeMenu();
          });
          element.bind('click', function (event) {
            var elementWasOpen = element === openElement;
            event.preventDefault();
            event.stopPropagation();
            if (!!openElement) {
              closeMenu();
            }
            if (!elementWasOpen) {
              element.parent().addClass('open');
              openElement = element;
              closeMenu = function (event) {
                if (event) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                $document.unbind('click', closeMenu);
                element.parent().removeClass('open');
                closeMenu = angular.noop;
                openElement = null;
              };
              $document.bind('click', closeMenu);
            }
          });
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.modal', ['ui.bootstrap.dialog']).directive('modal', [
    '$parse',
    '$dialog',
    function ($parse, $dialog) {
      return {
        restrict: 'EA',
        terminal: true,
        link: function (scope, elm, attrs) {
          var opts = angular.extend({}, scope.$eval(attrs.uiOptions || attrs.bsOptions || attrs.options));
          var shownExpr = attrs.modal || attrs.show;
          var setClosed;
          opts = angular.extend(opts, {
            template: elm.html(),
            resolve: {
              $scope: function () {
                return scope;
              }
            }
          });
          var dialog = $dialog.dialog(opts);
          elm.remove();
          if (attrs.close) {
            setClosed = function () {
              $parse(attrs.close)(scope);
            };
          } else {
            setClosed = function () {
              if (angular.isFunction($parse(shownExpr).assign)) {
                $parse(shownExpr).assign(scope, false);
              }
            };
          }
          scope.$watch(shownExpr, function (isShown, oldShown) {
            if (isShown) {
              dialog.open().then(function () {
                setClosed();
              });
            } else {
              if (dialog.isOpen()) {
                dialog.close();
              }
            }
          });
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.pagination', []).controller('PaginationController', [
    '$scope',
    '$interpolate',
    function ($scope, $interpolate) {
      this.currentPage = 1;
      this.noPrevious = function () {
        return this.currentPage === 1;
      };
      this.noNext = function () {
        return this.currentPage === $scope.numPages;
      };
      this.isActive = function (page) {
        return this.currentPage === page;
      };
      this.reset = function () {
        $scope.pages = [];
        this.currentPage = parseInt($scope.currentPage, 10);
        if (this.currentPage > $scope.numPages) {
          $scope.selectPage($scope.numPages);
        }
      };
      var self = this;
      $scope.selectPage = function (page) {
        if (!self.isActive(page) && page > 0 && page <= $scope.numPages) {
          $scope.currentPage = page;
          $scope.onSelectPage({ page: page });
        }
      };
      this.getAttributeValue = function (attribute, defaultValue, interpolate) {
        return angular.isDefined(attribute) ? interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute) : defaultValue;
      };
    }
  ]).constant('paginationConfig', {
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    rotate: true
  }).directive('pagination', [
    'paginationConfig',
    function (config) {
      return {
        restrict: 'EA',
        scope: {
          numPages: '=',
          currentPage: '=',
          maxSize: '=',
          onSelectPage: '&'
        },
        controller: 'PaginationController',
        templateUrl: 'template/pagination/pagination.html',
        replace: true,
        link: function (scope, element, attrs, paginationCtrl) {
          var boundaryLinks = paginationCtrl.getAttributeValue(attrs.boundaryLinks, config.boundaryLinks), directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks), firstText = paginationCtrl.getAttributeValue(attrs.firstText, config.firstText, true), previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true), nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, true), lastText = paginationCtrl.getAttributeValue(attrs.lastText, config.lastText, true), rotate = paginationCtrl.getAttributeValue(attrs.rotate, config.rotate);
          function makePage(number, text, isActive, isDisabled) {
            return {
              number: number,
              text: text,
              active: isActive,
              disabled: isDisabled
            };
          }
          scope.$watch('numPages + currentPage + maxSize', function () {
            paginationCtrl.reset();
            var startPage = 1, endPage = scope.numPages;
            var isMaxSized = angular.isDefined(scope.maxSize) && scope.maxSize < scope.numPages;
            if (isMaxSized) {
              if (rotate) {
                startPage = Math.max(paginationCtrl.currentPage - Math.floor(scope.maxSize / 2), 1);
                endPage = startPage + scope.maxSize - 1;
                if (endPage > scope.numPages) {
                  endPage = scope.numPages;
                  startPage = endPage - scope.maxSize + 1;
                }
              } else {
                startPage = (Math.ceil(paginationCtrl.currentPage / scope.maxSize) - 1) * scope.maxSize + 1;
                endPage = Math.min(startPage + scope.maxSize - 1, scope.numPages);
              }
            }
            for (var number = startPage; number <= endPage; number++) {
              var page = makePage(number, number, paginationCtrl.isActive(number), false);
              scope.pages.push(page);
            }
            if (isMaxSized && !rotate) {
              if (startPage > 1) {
                var previousPageSet = makePage(startPage - 1, '...', false, false);
                scope.pages.unshift(previousPageSet);
              }
              if (endPage < scope.numPages) {
                var nextPageSet = makePage(endPage + 1, '...', false, false);
                scope.pages.push(nextPageSet);
              }
            }
            if (directionLinks) {
              var previousPage = makePage(paginationCtrl.currentPage - 1, previousText, false, paginationCtrl.noPrevious());
              scope.pages.unshift(previousPage);
              var nextPage = makePage(paginationCtrl.currentPage + 1, nextText, false, paginationCtrl.noNext());
              scope.pages.push(nextPage);
            }
            if (boundaryLinks) {
              var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
              scope.pages.unshift(firstPage);
              var lastPage = makePage(scope.numPages, lastText, false, paginationCtrl.noNext());
              scope.pages.push(lastPage);
            }
          });
        }
      };
    }
  ]).constant('pagerConfig', {
    previousText: '\xab Previous',
    nextText: 'Next \xbb',
    align: true
  }).directive('pager', [
    'pagerConfig',
    function (config) {
      return {
        restrict: 'EA',
        scope: {
          numPages: '=',
          currentPage: '=',
          onSelectPage: '&'
        },
        controller: 'PaginationController',
        templateUrl: 'template/pagination/pager.html',
        replace: true,
        link: function (scope, element, attrs, paginationCtrl) {
          var previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true), nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, true), align = paginationCtrl.getAttributeValue(attrs.align, config.align);
          function makePage(number, text, isDisabled, isPrevious, isNext) {
            return {
              number: number,
              text: text,
              disabled: isDisabled,
              previous: align && isPrevious,
              next: align && isNext
            };
          }
          scope.$watch('numPages + currentPage', function () {
            paginationCtrl.reset();
            var previousPage = makePage(paginationCtrl.currentPage - 1, previousText, paginationCtrl.noPrevious(), true, false);
            scope.pages.unshift(previousPage);
            var nextPage = makePage(paginationCtrl.currentPage + 1, nextText, paginationCtrl.noNext(), false, true);
            scope.pages.push(nextPage);
          });
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.tooltip', ['ui.bootstrap.position']).provider('$tooltip', function () {
    var defaultOptions = {
        placement: 'top',
        animation: true,
        popupDelay: 0
      };
    var triggerMap = {
        'mouseenter': 'mouseleave',
        'click': 'click',
        'focus': 'blur'
      };
    var globalOptions = {};
    this.options = function (value) {
      angular.extend(globalOptions, value);
    };
    this.setTriggers = function setTriggers(triggers) {
      angular.extend(triggerMap, triggers);
    };
    function snake_case(name) {
      var regexp = /[A-Z]/g;
      var separator = '-';
      return name.replace(regexp, function (letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
      });
    }
    this.$get = [
      '$window',
      '$compile',
      '$timeout',
      '$parse',
      '$document',
      '$position',
      '$interpolate',
      function ($window, $compile, $timeout, $parse, $document, $position, $interpolate) {
        return function $tooltip(type, prefix, defaultTriggerShow) {
          var options = angular.extend({}, defaultOptions, globalOptions);
          function getTriggers(trigger) {
            var show = trigger || options.trigger || defaultTriggerShow;
            var hide = triggerMap[show] || show;
            return {
              show: show,
              hide: hide
            };
          }
          var directiveName = snake_case(type);
          var startSym = $interpolate.startSymbol();
          var endSym = $interpolate.endSymbol();
          var template = '<' + directiveName + '-popup ' + 'title="' + startSym + 'tt_title' + endSym + '" ' + 'content="' + startSym + 'tt_content' + endSym + '" ' + 'placement="' + startSym + 'tt_placement' + endSym + '" ' + 'animation="tt_animation()" ' + 'is-open="tt_isOpen"' + '>' + '</' + directiveName + '-popup>';
          return {
            restrict: 'EA',
            scope: true,
            link: function link(scope, element, attrs) {
              var tooltip = $compile(template)(scope);
              var transitionTimeout;
              var popupTimeout;
              var $body;
              var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
              var triggers = getTriggers(undefined);
              var hasRegisteredTriggers = false;
              scope.tt_isOpen = false;
              function toggleTooltipBind() {
                if (!scope.tt_isOpen) {
                  showTooltipBind();
                } else {
                  hideTooltipBind();
                }
              }
              function showTooltipBind() {
                if (scope.tt_popupDelay) {
                  popupTimeout = $timeout(show, scope.tt_popupDelay);
                } else {
                  scope.$apply(show);
                }
              }
              function hideTooltipBind() {
                scope.$apply(function () {
                  hide();
                });
              }
              function show() {
                var position, ttWidth, ttHeight, ttPosition;
                if (!scope.tt_content) {
                  return;
                }
                if (transitionTimeout) {
                  $timeout.cancel(transitionTimeout);
                }
                tooltip.css({
                  top: 0,
                  left: 0,
                  display: 'block'
                });
                if (appendToBody) {
                  $body = $body || $document.find('body');
                  $body.append(tooltip);
                } else {
                  element.after(tooltip);
                }
                position = appendToBody ? $position.offset(element) : $position.position(element);
                ttWidth = tooltip.prop('offsetWidth');
                ttHeight = tooltip.prop('offsetHeight');
                switch (scope.tt_placement) {
                case 'mouse':
                  var mousePos = $position.mouse();
                  ttPosition = {
                    top: mousePos.y,
                    left: mousePos.x
                  };
                  break;
                case 'right':
                  ttPosition = {
                    top: position.top + position.height / 2 - ttHeight / 2,
                    left: position.left + position.width
                  };
                  break;
                case 'bottom':
                  ttPosition = {
                    top: position.top + position.height,
                    left: position.left + position.width / 2 - ttWidth / 2
                  };
                  break;
                case 'left':
                  ttPosition = {
                    top: position.top + position.height / 2 - ttHeight / 2,
                    left: position.left - ttWidth
                  };
                  break;
                default:
                  ttPosition = {
                    top: position.top - ttHeight,
                    left: position.left + position.width / 2 - ttWidth / 2
                  };
                  break;
                }
                ttPosition.top += 'px';
                ttPosition.left += 'px';
                tooltip.css(ttPosition);
                scope.tt_isOpen = true;
              }
              function hide() {
                scope.tt_isOpen = false;
                $timeout.cancel(popupTimeout);
                if (angular.isDefined(scope.tt_animation) && scope.tt_animation()) {
                  transitionTimeout = $timeout(function () {
                    tooltip.remove();
                  }, 500);
                } else {
                  tooltip.remove();
                }
              }
              attrs.$observe(type, function (val) {
                scope.tt_content = val;
              });
              attrs.$observe(prefix + 'Title', function (val) {
                scope.tt_title = val;
              });
              attrs.$observe(prefix + 'Placement', function (val) {
                scope.tt_placement = angular.isDefined(val) ? val : options.placement;
              });
              attrs.$observe(prefix + 'Animation', function (val) {
                scope.tt_animation = angular.isDefined(val) ? $parse(val) : function () {
                  return options.animation;
                };
              });
              attrs.$observe(prefix + 'PopupDelay', function (val) {
                var delay = parseInt(val, 10);
                scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;
              });
              attrs.$observe(prefix + 'Trigger', function (val) {
                if (hasRegisteredTriggers) {
                  element.unbind(triggers.show, showTooltipBind);
                  element.unbind(triggers.hide, hideTooltipBind);
                }
                triggers = getTriggers(val);
                if (triggers.show === triggers.hide) {
                  element.bind(triggers.show, toggleTooltipBind);
                } else {
                  element.bind(triggers.show, showTooltipBind);
                  element.bind(triggers.hide, hideTooltipBind);
                }
                hasRegisteredTriggers = true;
              });
              attrs.$observe(prefix + 'AppendToBody', function (val) {
                appendToBody = angular.isDefined(val) ? $parse(val)(scope) : appendToBody;
              });
              if (appendToBody) {
                scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess() {
                  if (scope.tt_isOpen) {
                    hide();
                  }
                });
              }
              scope.$on('$destroy', function onDestroyTooltip() {
                if (scope.tt_isOpen) {
                  hide();
                } else {
                  tooltip.remove();
                }
              });
            }
          };
        };
      }
    ];
  }).directive('tooltipPopup', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        content: '@',
        placement: '@',
        animation: '&',
        isOpen: '&'
      },
      templateUrl: 'template/tooltip/tooltip-popup.html'
    };
  }).directive('tooltip', [
    '$tooltip',
    function ($tooltip) {
      return $tooltip('tooltip', 'tooltip', 'mouseenter');
    }
  ]).directive('tooltipHtmlUnsafePopup', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        content: '@',
        placement: '@',
        animation: '&',
        isOpen: '&'
      },
      templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
    };
  }).directive('tooltipHtmlUnsafe', [
    '$tooltip',
    function ($tooltip) {
      return $tooltip('tooltipHtmlUnsafe', 'tooltip', 'mouseenter');
    }
  ]);
  angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip']).directive('popoverPopup', function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        title: '@',
        content: '@',
        placement: '@',
        animation: '&',
        isOpen: '&'
      },
      templateUrl: 'template/popover/popover.html'
    };
  }).directive('popover', [
    '$compile',
    '$timeout',
    '$parse',
    '$window',
    '$tooltip',
    function ($compile, $timeout, $parse, $window, $tooltip) {
      return $tooltip('popover', 'popover', 'click');
    }
  ]);
  angular.module('ui.bootstrap.progressbar', ['ui.bootstrap.transition']).constant('progressConfig', {
    animate: true,
    autoType: false,
    stackedTypes: [
      'success',
      'info',
      'warning',
      'danger'
    ]
  }).controller('ProgressBarController', [
    '$scope',
    '$attrs',
    'progressConfig',
    function ($scope, $attrs, progressConfig) {
      var animate = angular.isDefined($attrs.animate) ? $scope.$eval($attrs.animate) : progressConfig.animate;
      var autoType = angular.isDefined($attrs.autoType) ? $scope.$eval($attrs.autoType) : progressConfig.autoType;
      var stackedTypes = angular.isDefined($attrs.stackedTypes) ? $scope.$eval('[' + $attrs.stackedTypes + ']') : progressConfig.stackedTypes;
      this.makeBar = function (newBar, oldBar, index) {
        var newValue = angular.isObject(newBar) ? newBar.value : newBar || 0;
        var oldValue = angular.isObject(oldBar) ? oldBar.value : oldBar || 0;
        var type = angular.isObject(newBar) && angular.isDefined(newBar.type) ? newBar.type : autoType ? getStackedType(index || 0) : null;
        return {
          from: oldValue,
          to: newValue,
          type: type,
          animate: animate
        };
      };
      function getStackedType(index) {
        return stackedTypes[index];
      }
      this.addBar = function (bar) {
        $scope.bars.push(bar);
        $scope.totalPercent += bar.to;
      };
      this.clearBars = function () {
        $scope.bars = [];
        $scope.totalPercent = 0;
      };
      this.clearBars();
    }
  ]).directive('progress', function () {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'ProgressBarController',
      scope: {
        value: '=percent',
        onFull: '&',
        onEmpty: '&'
      },
      templateUrl: 'template/progressbar/progress.html',
      link: function (scope, element, attrs, controller) {
        scope.$watch('value', function (newValue, oldValue) {
          controller.clearBars();
          if (angular.isArray(newValue)) {
            for (var i = 0, n = newValue.length; i < n; i++) {
              controller.addBar(controller.makeBar(newValue[i], oldValue[i], i));
            }
          } else {
            controller.addBar(controller.makeBar(newValue, oldValue));
          }
        }, true);
        scope.$watch('totalPercent', function (value) {
          if (value >= 100) {
            scope.onFull();
          } else if (value <= 0) {
            scope.onEmpty();
          }
        }, true);
      }
    };
  }).directive('progressbar', [
    '$transition',
    function ($transition) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          width: '=',
          old: '=',
          type: '=',
          animate: '='
        },
        templateUrl: 'template/progressbar/bar.html',
        link: function (scope, element) {
          scope.$watch('width', function (value) {
            if (scope.animate) {
              element.css('width', scope.old + '%');
              $transition(element, { width: value + '%' });
            } else {
              element.css('width', value + '%');
            }
          });
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.rating', []).constant('ratingConfig', { max: 5 }).directive('rating', [
    'ratingConfig',
    '$parse',
    function (ratingConfig, $parse) {
      return {
        restrict: 'EA',
        scope: {
          value: '=',
          onHover: '&',
          onLeave: '&'
        },
        templateUrl: 'template/rating/rating.html',
        replace: true,
        link: function (scope, element, attrs) {
          var maxRange = angular.isDefined(attrs.max) ? scope.$parent.$eval(attrs.max) : ratingConfig.max;
          scope.range = [];
          for (var i = 1; i <= maxRange; i++) {
            scope.range.push(i);
          }
          scope.rate = function (value) {
            if (!scope.readonly) {
              scope.value = value;
            }
          };
          scope.enter = function (value) {
            if (!scope.readonly) {
              scope.val = value;
            }
            scope.onHover({ value: value });
          };
          scope.reset = function () {
            scope.val = angular.copy(scope.value);
            scope.onLeave();
          };
          scope.reset();
          scope.$watch('value', function (value) {
            scope.val = value;
          });
          scope.readonly = false;
          if (attrs.readonly) {
            scope.$parent.$watch($parse(attrs.readonly), function (value) {
              scope.readonly = !!value;
            });
          }
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.tabs', []).directive('tabs', function () {
    return function () {
      throw new Error('The `tabs` directive is deprecated, please migrate to `tabset`. Instructions can be found at http://github.com/angular-ui/bootstrap/tree/master/CHANGELOG.md');
    };
  }).controller('TabsetController', [
    '$scope',
    '$element',
    function TabsetCtrl($scope, $element) {
      var ctrl = this, tabs = ctrl.tabs = $scope.tabs = [];
      ctrl.select = function (tab) {
        angular.forEach(tabs, function (tab) {
          tab.active = false;
        });
        tab.active = true;
      };
      ctrl.addTab = function addTab(tab) {
        tabs.push(tab);
        if (tabs.length === 1 || tab.active) {
          ctrl.select(tab);
        }
      };
      ctrl.removeTab = function removeTab(tab) {
        var index = tabs.indexOf(tab);
        if (tab.active && tabs.length > 1) {
          var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
          ctrl.select(tabs[newActiveIndex]);
        }
        tabs.splice(index, 1);
      };
    }
  ]).directive('tabset', function () {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      require: '^tabset',
      scope: {},
      controller: 'TabsetController',
      templateUrl: 'template/tabs/tabset.html',
      compile: function (elm, attrs, transclude) {
        return function (scope, element, attrs, tabsetCtrl) {
          scope.vertical = angular.isDefined(attrs.vertical) ? scope.$eval(attrs.vertical) : false;
          scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
          scope.direction = angular.isDefined(attrs.direction) ? scope.$parent.$eval(attrs.direction) : 'top';
          scope.tabsAbove = scope.direction != 'below';
          tabsetCtrl.$scope = scope;
          tabsetCtrl.$transcludeFn = transclude;
        };
      }
    };
  }).directive('tab', [
    '$parse',
    '$http',
    '$templateCache',
    '$compile',
    function ($parse, $http, $templateCache, $compile) {
      return {
        require: '^tabset',
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/tabs/tab.html',
        transclude: true,
        scope: {
          heading: '@',
          onSelect: '&select',
          onDeselect: '&deselect'
        },
        controller: function () {
        },
        compile: function (elm, attrs, transclude) {
          return function postLink(scope, elm, attrs, tabsetCtrl) {
            var getActive, setActive;
            if (attrs.active) {
              getActive = $parse(attrs.active);
              setActive = getActive.assign;
              scope.$parent.$watch(getActive, function updateActive(value) {
                scope.active = !!value;
              });
              scope.active = getActive(scope.$parent);
            } else {
              setActive = getActive = angular.noop;
            }
            scope.$watch('active', function (active) {
              setActive(scope.$parent, active);
              if (active) {
                tabsetCtrl.select(scope);
                scope.onSelect();
              } else {
                scope.onDeselect();
              }
            });
            scope.disabled = false;
            if (attrs.disabled) {
              scope.$parent.$watch($parse(attrs.disabled), function (value) {
                scope.disabled = !!value;
              });
            }
            scope.select = function () {
              if (!scope.disabled) {
                scope.active = true;
              }
            };
            tabsetCtrl.addTab(scope);
            scope.$on('$destroy', function () {
              tabsetCtrl.removeTab(scope);
            });
            if (scope.active) {
              setActive(scope.$parent, true);
            }
            scope.$transcludeFn = transclude;
          };
        }
      };
    }
  ]).directive('tabHeadingTransclude', [function () {
      return {
        restrict: 'A',
        require: '^tab',
        link: function (scope, elm, attrs, tabCtrl) {
          scope.$watch('headingElement', function updateHeadingElement(heading) {
            if (heading) {
              elm.html('');
              elm.append(heading);
            }
          });
        }
      };
    }]).directive('tabContentTransclude', [
    '$compile',
    '$parse',
    function ($compile, $parse) {
      return {
        restrict: 'A',
        require: '^tabset',
        link: function (scope, elm, attrs) {
          var tab = scope.$eval(attrs.tabContentTransclude);
          tab.$transcludeFn(tab.$parent, function (contents) {
            angular.forEach(contents, function (node) {
              if (isTabHeading(node)) {
                tab.headingElement = node;
              } else {
                elm.append(node);
              }
            });
          });
        }
      };
      function isTabHeading(node) {
        return node.tagName && (node.hasAttribute('tab-heading') || node.hasAttribute('data-tab-heading') || node.tagName.toLowerCase() === 'tab-heading' || node.tagName.toLowerCase() === 'data-tab-heading');
      }
    }
  ]).directive('tabsetTitles', function ($http) {
    return {
      restrict: 'A',
      require: '^tabset',
      templateUrl: 'template/tabs/tabset-titles.html',
      replace: true,
      link: function (scope, elm, attrs, tabsetCtrl) {
        if (!scope.$eval(attrs.tabsetTitles)) {
          elm.remove();
        } else {
          tabsetCtrl.$transcludeFn(tabsetCtrl.$scope.$parent, function (node) {
            elm.append(node);
          });
        }
      }
    };
  });
  ;
  angular.module('ui.bootstrap.timepicker', []).filter('pad', function () {
    return function (input) {
      if (angular.isDefined(input) && input.toString().length < 2) {
        input = '0' + input;
      }
      return input;
    };
  }).constant('timepickerConfig', {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: true,
    meridians: [
      'AM',
      'PM'
    ],
    readonlyInput: false,
    mousewheel: true
  }).directive('timepicker', [
    'padFilter',
    '$parse',
    'timepickerConfig',
    function (padFilter, $parse, timepickerConfig) {
      return {
        restrict: 'EA',
        require: 'ngModel',
        replace: true,
        templateUrl: 'template/timepicker/timepicker.html',
        scope: { model: '=ngModel' },
        link: function (scope, element, attrs, ngModelCtrl) {
          var selected = new Date(), meridians = timepickerConfig.meridians;
          var hourStep = timepickerConfig.hourStep;
          if (attrs.hourStep) {
            scope.$parent.$watch($parse(attrs.hourStep), function (value) {
              hourStep = parseInt(value, 10);
            });
          }
          var minuteStep = timepickerConfig.minuteStep;
          if (attrs.minuteStep) {
            scope.$parent.$watch($parse(attrs.minuteStep), function (value) {
              minuteStep = parseInt(value, 10);
            });
          }
          scope.showMeridian = timepickerConfig.showMeridian;
          if (attrs.showMeridian) {
            scope.$parent.$watch($parse(attrs.showMeridian), function (value) {
              scope.showMeridian = !!value;
              if (!scope.model) {
                var dt = new Date(selected);
                var hours = getScopeHours();
                if (angular.isDefined(hours)) {
                  dt.setHours(hours);
                }
                scope.model = new Date(dt);
              } else {
                refreshTemplate();
              }
            });
          }
          function getScopeHours() {
            var hours = parseInt(scope.hours, 10);
            var valid = scope.showMeridian ? hours > 0 && hours < 13 : hours >= 0 && hours < 24;
            if (!valid) {
              return;
            }
            if (scope.showMeridian) {
              if (hours === 12) {
                hours = 0;
              }
              if (scope.meridian === meridians[1]) {
                hours = hours + 12;
              }
            }
            return hours;
          }
          var inputs = element.find('input');
          var hoursInputEl = inputs.eq(0), minutesInputEl = inputs.eq(1);
          var mousewheel = angular.isDefined(attrs.mousewheel) ? scope.$eval(attrs.mousewheel) : timepickerConfig.mousewheel;
          if (mousewheel) {
            var isScrollingUp = function (e) {
              if (e.originalEvent) {
                e = e.originalEvent;
              }
              var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
              return e.detail || delta > 0;
            };
            hoursInputEl.bind('mousewheel wheel', function (e) {
              scope.$apply(isScrollingUp(e) ? scope.incrementHours() : scope.decrementHours());
              e.preventDefault();
            });
            minutesInputEl.bind('mousewheel wheel', function (e) {
              scope.$apply(isScrollingUp(e) ? scope.incrementMinutes() : scope.decrementMinutes());
              e.preventDefault();
            });
          }
          var keyboardChange = false;
          scope.readonlyInput = angular.isDefined(attrs.readonlyInput) ? scope.$eval(attrs.readonlyInput) : timepickerConfig.readonlyInput;
          if (!scope.readonlyInput) {
            scope.updateHours = function () {
              var hours = getScopeHours();
              if (angular.isDefined(hours)) {
                keyboardChange = 'h';
                if (scope.model === null) {
                  scope.model = new Date(selected);
                }
                scope.model.setHours(hours);
              } else {
                scope.model = null;
                scope.validHours = false;
              }
            };
            hoursInputEl.bind('blur', function (e) {
              if (scope.validHours && scope.hours < 10) {
                scope.$apply(function () {
                  scope.hours = padFilter(scope.hours);
                });
              }
            });
            scope.updateMinutes = function () {
              var minutes = parseInt(scope.minutes, 10);
              if (minutes >= 0 && minutes < 60) {
                keyboardChange = 'm';
                if (scope.model === null) {
                  scope.model = new Date(selected);
                }
                scope.model.setMinutes(minutes);
              } else {
                scope.model = null;
                scope.validMinutes = false;
              }
            };
            minutesInputEl.bind('blur', function (e) {
              if (scope.validMinutes && scope.minutes < 10) {
                scope.$apply(function () {
                  scope.minutes = padFilter(scope.minutes);
                });
              }
            });
          } else {
            scope.updateHours = angular.noop;
            scope.updateMinutes = angular.noop;
          }
          scope.$watch(function getModelTimestamp() {
            return +scope.model;
          }, function (timestamp) {
            if (!isNaN(timestamp) && timestamp > 0) {
              selected = new Date(timestamp);
              refreshTemplate();
            }
          });
          function refreshTemplate() {
            var hours = selected.getHours();
            if (scope.showMeridian) {
              hours = hours === 0 || hours === 12 ? 12 : hours % 12;
            }
            scope.hours = keyboardChange === 'h' ? hours : padFilter(hours);
            scope.validHours = true;
            var minutes = selected.getMinutes();
            scope.minutes = keyboardChange === 'm' ? minutes : padFilter(minutes);
            scope.validMinutes = true;
            scope.meridian = scope.showMeridian ? selected.getHours() < 12 ? meridians[0] : meridians[1] : '';
            keyboardChange = false;
          }
          function addMinutes(minutes) {
            var dt = new Date(selected.getTime() + minutes * 60000);
            selected.setHours(dt.getHours());
            selected.setMinutes(dt.getMinutes());
            scope.model = new Date(selected);
          }
          scope.incrementHours = function () {
            addMinutes(hourStep * 60);
          };
          scope.decrementHours = function () {
            addMinutes(-hourStep * 60);
          };
          scope.incrementMinutes = function () {
            addMinutes(minuteStep);
          };
          scope.decrementMinutes = function () {
            addMinutes(-minuteStep);
          };
          scope.toggleMeridian = function () {
            addMinutes(12 * 60 * (selected.getHours() < 12 ? 1 : -1));
          };
        }
      };
    }
  ]);
  angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position']).factory('typeaheadParser', [
    '$parse',
    function ($parse) {
      var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
      return {
        parse: function (input) {
          var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
          if (!match) {
            throw new Error('Expected typeahead specification in form of \'_modelValue_ (as _label_)? for _item_ in _collection_\'' + ' but got \'' + input + '\'.');
          }
          return {
            itemName: match[3],
            source: $parse(match[4]),
            viewMapper: $parse(match[2] || match[1]),
            modelMapper: $parse(match[1])
          };
        }
      };
    }
  ]).directive('typeahead', [
    '$compile',
    '$parse',
    '$q',
    '$timeout',
    '$document',
    '$position',
    'typeaheadParser',
    function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {
      var HOT_KEYS = [
          9,
          13,
          27,
          38,
          40
        ];
      return {
        require: 'ngModel',
        link: function (originalScope, element, attrs, modelCtrl) {
          var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;
          var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;
          var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
          var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;
          var onSelectCallback = $parse(attrs.typeaheadOnSelect);
          var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;
          var $setModelValue = $parse(attrs.ngModel).assign;
          var parserResult = typeaheadParser.parse(attrs.typeahead);
          var popUpEl = angular.element('<typeahead-popup></typeahead-popup>');
          popUpEl.attr({
            matches: 'matches',
            active: 'activeIdx',
            select: 'select(activeIdx)',
            query: 'query',
            position: 'position'
          });
          if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
            popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
          }
          var scope = originalScope.$new();
          originalScope.$on('$destroy', function () {
            scope.$destroy();
          });
          var resetMatches = function () {
            scope.matches = [];
            scope.activeIdx = -1;
          };
          var getMatchesAsync = function (inputValue) {
            var locals = { $viewValue: inputValue };
            isLoadingSetter(originalScope, true);
            $q.when(parserResult.source(scope, locals)).then(function (matches) {
              if (inputValue === modelCtrl.$viewValue) {
                if (matches.length > 0) {
                  scope.activeIdx = 0;
                  scope.matches.length = 0;
                  for (var i = 0; i < matches.length; i++) {
                    locals[parserResult.itemName] = matches[i];
                    scope.matches.push({
                      label: parserResult.viewMapper(scope, locals),
                      model: matches[i]
                    });
                  }
                  scope.query = inputValue;
                  scope.position = $position.position(element);
                  scope.position.top = scope.position.top + element.prop('offsetHeight');
                } else {
                  resetMatches();
                }
                isLoadingSetter(originalScope, false);
              }
            }, function () {
              resetMatches();
              isLoadingSetter(originalScope, false);
            });
          };
          resetMatches();
          scope.query = undefined;
          var timeoutPromise;
          modelCtrl.$parsers.push(function (inputValue) {
            resetMatches();
            if (inputValue && inputValue.length >= minSearch) {
              if (waitTime > 0) {
                if (timeoutPromise) {
                  $timeout.cancel(timeoutPromise);
                }
                timeoutPromise = $timeout(function () {
                  getMatchesAsync(inputValue);
                }, waitTime);
              } else {
                getMatchesAsync(inputValue);
              }
            }
            return isEditable ? inputValue : undefined;
          });
          modelCtrl.$formatters.push(function (modelValue) {
            var candidateViewValue, emptyViewValue;
            var locals = {};
            if (inputFormatter) {
              locals['$model'] = modelValue;
              return inputFormatter(originalScope, locals);
            } else {
              locals[parserResult.itemName] = modelValue;
              candidateViewValue = parserResult.viewMapper(originalScope, locals);
              emptyViewValue = parserResult.viewMapper(originalScope, {});
              return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
            }
          });
          scope.select = function (activeIdx) {
            var locals = {};
            var model, item;
            locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
            model = parserResult.modelMapper(originalScope, locals);
            $setModelValue(originalScope, model);
            onSelectCallback(originalScope, {
              $item: item,
              $model: model,
              $label: parserResult.viewMapper(originalScope, locals)
            });
            resetMatches();
            element[0].focus();
          };
          element.bind('keydown', function (evt) {
            if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
              return;
            }
            evt.preventDefault();
            if (evt.which === 40) {
              scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
              scope.$digest();
            } else if (evt.which === 38) {
              scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
              scope.$digest();
            } else if (evt.which === 13 || evt.which === 9) {
              scope.$apply(function () {
                scope.select(scope.activeIdx);
              });
            } else if (evt.which === 27) {
              evt.stopPropagation();
              resetMatches();
              scope.$digest();
            }
          });
          $document.bind('click', function () {
            resetMatches();
            scope.$digest();
          });
          element.after($compile(popUpEl)(scope));
        }
      };
    }
  ]).directive('typeaheadPopup', function () {
    return {
      restrict: 'E',
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '=',
        select: '&'
      },
      replace: true,
      templateUrl: 'template/typeahead/typeahead-popup.html',
      link: function (scope, element, attrs) {
        scope.templateUrl = attrs.templateUrl;
        scope.isOpen = function () {
          return scope.matches.length > 0;
        };
        scope.isActive = function (matchIdx) {
          return scope.active == matchIdx;
        };
        scope.selectActive = function (matchIdx) {
          scope.active = matchIdx;
        };
        scope.selectMatch = function (activeIdx) {
          scope.select({ activeIdx: activeIdx });
        };
      }
    };
  }).directive('typeaheadMatch', [
    '$http',
    '$templateCache',
    '$compile',
    '$parse',
    function ($http, $templateCache, $compile, $parse) {
      return {
        restrict: 'E',
        scope: {
          index: '=',
          match: '=',
          query: '='
        },
        link: function (scope, element, attrs) {
          var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
          $http.get(tplUrl, { cache: $templateCache }).success(function (tplContent) {
            element.replaceWith($compile(tplContent.trim())(scope));
          });
        }
      };
    }
  ]).filter('typeaheadHighlight', function () {
    function escapeRegexp(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
    return function (matchItem, query) {
      return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : query;
    };
  });
  angular.module('template/accordion/accordion-group.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/accordion/accordion-group.html', '<div class="accordion-group">\n' + '  <div class="accordion-heading" ><a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a></div>\n' + '  <div class="accordion-body" collapse="!isOpen">\n' + '    <div class="accordion-inner" ng-transclude></div>  </div>\n' + '</div>');
    }
  ]);
  angular.module('template/accordion/accordion.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/accordion/accordion.html', '<div class="accordion" ng-transclude></div>');
    }
  ]);
  angular.module('template/alert/alert.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/alert/alert.html', '<div class=\'alert\' ng-class=\'type && "alert-" + type\'>\n' + '    <button ng-show=\'closeable\' type=\'button\' class=\'close\' ng-click=\'close()\'>&times;</button>\n' + '    <div ng-transclude></div>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/carousel/carousel.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/carousel/carousel.html', '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n' + '    <ol class="carousel-indicators" ng-show="slides().length > 1">\n' + '        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n' + '    </ol>\n' + '    <div class="carousel-inner" ng-transclude></div>\n' + '    <a ng-click="prev()" class="carousel-control left" ng-show="slides().length > 1">&lsaquo;</a>\n' + '    <a ng-click="next()" class="carousel-control right" ng-show="slides().length > 1">&rsaquo;</a>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/carousel/slide.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/carousel/slide.html', '<div ng-class="{\n' + '    \'active\': leaving || (active && !entering),\n' + '    \'prev\': (next || active) && direction==\'prev\',\n' + '    \'next\': (next || active) && direction==\'next\',\n' + '    \'right\': direction==\'prev\',\n' + '    \'left\': direction==\'next\'\n' + '  }" class="item" ng-transclude></div>\n' + '');
    }
  ]);
  angular.module('template/datepicker/datepicker.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/datepicker/datepicker.html', '<table>\n' + '  <thead>\n' + '    <tr class="text-center">\n' + '      <th><button type="button" class="btn pull-left" ng-click="move(-1)"><i class="icon-chevron-left"></i></button></th>\n' + '      <th colspan="{{rows[0].length - 2 + showWeekNumbers}}"><button type="button" class="btn btn-block" ng-click="toggleMode()"><strong>{{title}}</strong></button></th>\n' + '      <th><button type="button" class="btn pull-right" ng-click="move(1)"><i class="icon-chevron-right"></i></button></th>\n' + '    </tr>\n' + '    <tr class="text-center" ng-show="labels.length > 0">\n' + '      <th ng-show="showWeekNumbers">#</th>\n' + '      <th ng-repeat="label in labels">{{label}}</th>\n' + '    </tr>\n' + '  </thead>\n' + '  <tbody>\n' + '    <tr ng-repeat="row in rows">\n' + '      <td ng-show="showWeekNumbers" class="text-center"><em>{{ getWeekNumber(row) }}</em></td>\n' + '      <td ng-repeat="dt in row" class="text-center">\n' + '        <button type="button" style="width:100%;" class="btn" ng-class="{\'btn-info\': dt.selected}" ng-click="select(dt.date)" ng-disabled="dt.disabled"><span ng-class="{muted: dt.secondary}">{{dt.label}}</span></button>\n' + '      </td>\n' + '    </tr>\n' + '  </tbody>\n' + '</table>\n' + '');
    }
  ]);
  angular.module('template/datepicker/popup.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/datepicker/popup.html', '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" class="dropdown-menu">\n' + '\t<li ng-transclude></li>\n' + '\t<li class="divider"></li>\n' + '\t<li style="padding: 9px;">\n' + '\t\t<span class="btn-group">\n' + '\t\t\t<button class="btn btn-small btn-inverse" ng-click="today()">Today</button>\n' + '\t\t\t<button class="btn btn-small btn-info" ng-click="showWeeks = ! showWeeks" ng-class="{active: showWeeks}">Weeks</button>\n' + '\t\t\t<button class="btn btn-small btn-danger" ng-click="clear()">Clear</button>\n' + '\t\t</span>\n' + '\t\t<button class="btn btn-small btn-success pull-right" ng-click="isOpen = false">Close</button>\n' + '\t</li>\n' + '</ul>');
    }
  ]);
  angular.module('template/dialog/message.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/dialog/message.html', '<div class="modal-header">\n' + '\t<h3>{{ title }}</h3>\n' + '</div>\n' + '<div class="modal-body">\n' + '\t<p>{{ message }}</p>\n' + '</div>\n' + '<div class="modal-footer">\n' + '\t<button ng-repeat="btn in buttons" ng-click="close(btn.result)" class="btn" ng-class="btn.cssClass">{{ btn.label }}</button>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/modal/backdrop.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/modal/backdrop.html', '<div class="modal-backdrop fade in"></div>');
    }
  ]);
  angular.module('template/modal/window.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/modal/window.html', '<div class="modal in" ng-transclude></div>');
    }
  ]);
  angular.module('template/pagination/pager.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/pagination/pager.html', '<div class="pager">\n' + '  <ul>\n' + '    <li ng-repeat="page in pages" ng-class="{disabled: page.disabled, previous: page.previous, next: page.next}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n' + '  </ul>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/pagination/pagination.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/pagination/pagination.html', '<div class="pagination"><ul>\n' + '  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n' + '  </ul>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/tooltip/tooltip-html-unsafe-popup.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/tooltip/tooltip-html-unsafe-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="tooltip-arrow"></div>\n' + '  <div class="tooltip-inner" ng-bind-html-unsafe="content"></div>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/tooltip/tooltip-popup.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/tooltip/tooltip-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="tooltip-arrow"></div>\n' + '  <div class="tooltip-inner" ng-bind="content"></div>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/popover/popover.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/popover/popover.html', '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n' + '  <div class="arrow"></div>\n' + '\n' + '  <div class="popover-inner">\n' + '      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n' + '      <div class="popover-content" ng-bind="content"></div>\n' + '  </div>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/progressbar/bar.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/progressbar/bar.html', '<div class="bar" ng-class=\'type && "bar-" + type\'></div>');
    }
  ]);
  angular.module('template/progressbar/progress.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/progressbar/progress.html', '<div class="progress"><progressbar ng-repeat="bar in bars" width="bar.to" old="bar.from" animate="bar.animate" type="bar.type"></progressbar></div>');
    }
  ]);
  angular.module('template/rating/rating.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/rating/rating.html', '<span ng-mouseleave="reset()">\n' + '\t<i ng-repeat="number in range" ng-mouseenter="enter(number)" ng-click="rate(number)" ng-class="{\'icon-star\': number <= val, \'icon-star-empty\': number > val}"></i>\n' + '</span>');
    }
  ]);
  angular.module('template/tabs/pane.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/tabs/pane.html', '<div class="tab-pane" ng-class="{active: selected}" ng-show="selected" ng-transclude></div>\n' + '');
    }
  ]);
  angular.module('template/tabs/tab.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/tabs/tab.html', '<li ng-class="{active: active, disabled: disabled}">\n' + '  <a ng-click="select()" tab-heading-transclude>{{heading}}</a>\n' + '</li>\n' + '');
    }
  ]);
  angular.module('template/tabs/tabs.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/tabs/tabs.html', '<div class="tabbable">\n' + '  <ul class="nav nav-tabs">\n' + '    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">\n' + '      <a ng-click="select(pane)">{{pane.heading}}</a>\n' + '    </li>\n' + '  </ul>\n' + '  <div class="tab-content" ng-transclude></div>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/tabs/tabset-titles.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/tabs/tabset-titles.html', '<ul class="nav {{type && \'nav-\' + type}}" ng-class="{\'nav-stacked\': vertical}">\n' + '</ul>\n' + '');
    }
  ]);
  angular.module('template/tabs/tabset.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/tabs/tabset.html', '\n' + '<div class="tabbable" ng-class="{\'tabs-right\': direction == \'right\', \'tabs-left\': direction == \'left\', \'tabs-below\': direction == \'below\'}">\n' + '  <div tabset-titles="tabsAbove"></div>\n' + '  <div class="tab-content">\n' + '    <div class="tab-pane" \n' + '         ng-repeat="tab in tabs" \n' + '         ng-class="{active: tab.active}"\n' + '         tab-content-transclude="tab">\n' + '    </div>\n' + '  </div>\n' + '  <div tabset-titles="!tabsAbove"></div>\n' + '</div>\n' + '');
    }
  ]);
  angular.module('template/timepicker/timepicker.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/timepicker/timepicker.html', '<table class="form-inline">\n' + '\t<tr class="text-center">\n' + '\t\t<td><a ng-click="incrementHours()" class="btn btn-link"><i class="icon-chevron-up"></i></a></td>\n' + '\t\t<td>&nbsp;</td>\n' + '\t\t<td><a ng-click="incrementMinutes()" class="btn btn-link"><i class="icon-chevron-up"></i></a></td>\n' + '\t\t<td ng-show="showMeridian"></td>\n' + '\t</tr>\n' + '\t<tr>\n' + '\t\t<td class="control-group" ng-class="{\'error\': !validHours}"><input type="text" ng-model="hours" ng-change="updateHours()" class="span1 text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2" /></td>\n' + '\t\t<td>:</td>\n' + '\t\t<td class="control-group" ng-class="{\'error\': !validMinutes}"><input type="text" ng-model="minutes" ng-change="updateMinutes()" class="span1 text-center" ng-readonly="readonlyInput" maxlength="2"></td>\n' + '\t\t<td ng-show="showMeridian"><button ng-click="toggleMeridian()" class="btn text-center">{{meridian}}</button></td>\n' + '\t</tr>\n' + '\t<tr class="text-center">\n' + '\t\t<td><a ng-click="decrementHours()" class="btn btn-link"><i class="icon-chevron-down"></i></a></td>\n' + '\t\t<td>&nbsp;</td>\n' + '\t\t<td><a ng-click="decrementMinutes()" class="btn btn-link"><i class="icon-chevron-down"></i></a></td>\n' + '\t\t<td ng-show="showMeridian"></td>\n' + '\t</tr>\n' + '</table>');
    }
  ]);
  angular.module('template/typeahead/typeahead-match.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/typeahead/typeahead-match.html', '<a tabindex="-1" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>');
    }
  ]);
  angular.module('template/typeahead/typeahead-popup.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/typeahead/typeahead-popup.html', '<ul class="typeahead dropdown-menu" ng-style="{display: isOpen()&&\'block\' || \'none\', top: position.top+\'px\', left: position.left+\'px\'}">\n' + '    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)">\n' + '        <typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></typeahead-match>\n' + '    </li>\n' + '</ul>');
    }
  ]);
  angular.module('template/typeahead/typeahead.html', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('template/typeahead/typeahead.html', '<ul class="typeahead dropdown-menu" ng-style="{display: isOpen()&&\'block\' || \'none\', top: position.top+\'px\', left: position.left+\'px\'}">\n' + '    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)">\n' + '        <a tabindex="-1" ng-click="selectMatch($index)" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>\n' + '    </li>\n' + '</ul>');
    }
  ]);
  define('ui.bootstrap', ['angular'], function () {
  });
  define('app', [
    'angular',
    './controllers/index',
    './services/index',
    './directives/index',
    'ui.bootstrap'
  ], function (ng) {
    'use strict';
    return ng.module('app', [
      'app.services',
      'app.controllers',
      'app.directives',
      'ui.bootstrap'
    ]);
  });
  define('routes', ['./app'], function (app) {
    'use strict';
    return app.config([
      '$routeProvider',
      '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        }).otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
      }
    ]);
  });
  define('domReady', [], function () {
    'use strict';
    var isTop, testDiv, scrollIntervalId, isBrowser = typeof window !== 'undefined' && window.document, isPageLoaded = !isBrowser, doc = isBrowser ? document : null, readyCalls = [];
    function runCallbacks(callbacks) {
      var i;
      for (i = 0; i < callbacks.length; i += 1) {
        callbacks[i](doc);
      }
    }
    function callReady() {
      var callbacks = readyCalls;
      if (isPageLoaded) {
        if (callbacks.length) {
          readyCalls = [];
          runCallbacks(callbacks);
        }
      }
    }
    function pageLoaded() {
      if (!isPageLoaded) {
        isPageLoaded = true;
        if (scrollIntervalId) {
          clearInterval(scrollIntervalId);
        }
        callReady();
      }
    }
    if (isBrowser) {
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', pageLoaded, false);
        window.addEventListener('load', pageLoaded, false);
      } else if (window.attachEvent) {
        window.attachEvent('onload', pageLoaded);
        testDiv = document.createElement('div');
        try {
          isTop = window.frameElement === null;
        } catch (e) {
        }
        if (testDiv.doScroll && isTop && window.external) {
          scrollIntervalId = setInterval(function () {
            try {
              testDiv.doScroll();
              pageLoaded();
            } catch (e) {
            }
          }, 30);
        }
      }
      if (document.readyState === 'complete') {
        pageLoaded();
      }
    }
    function domReady(callback) {
      if (isPageLoaded) {
        callback(doc);
      } else {
        readyCalls.push(callback);
      }
      return domReady;
    }
    domReady.version = '2.0.1';
    domReady.load = function (name, req, onLoad, config) {
      if (config.isBuild) {
        onLoad(null);
      } else {
        domReady(onLoad);
      }
    };
    return domReady;
  });
  define('bootstrap', [
    'require',
    'angular',
    'app',
    'routes'
  ], function (require, ng) {
    'use strict';
    require(['domReady!'], function (document) {
      ng.bootstrap(document, ['app']);
    });
  });
  require.config({
    paths: {
      'domReady': '../bower_components/requirejs-domready/domReady',
      'angular': '../bower_components/angular/angular',
      'jquery': '../bower_components/jquery/jquery',
      'masonry': '../bower_components/masonry/masonry',
      'lodash': '../bower_components/lodash/dist/lodash',
      'doc-ready/doc-ready': '../bower_components/doc-ready/doc-ready',
      'get-style-property/get-style-property': '../bower_components/get-style-property/get-style-property',
      'matches-selector/matches-selector': '../bower_components/matches-selector/matches-selector',
      'outlayer/item': '../bower_components/outlayer/item',
      'outlayer/outlayer': '../bower_components/outlayer/outlayer',
      'get-size/get-size': '../bower_components/get-size/get-size',
      'eventie/eventie': '../bower_components/eventie/eventie',
      'eventEmitter/EventEmitter': '../bower_components/eventEmitter/EventEmitter',
      'imagesLoaded': '../bower_components/imagesloaded/imagesloaded',
      'ui.bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
      'store': '../bower_components/store/store'
    },
    shim: {
      'angular': { exports: 'angular' },
      'ui.bootstrap': { deps: ['angular'] }
    },
    deps: ['./bootstrap']
  });
  define('main', function () {
  });
}());