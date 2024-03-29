import {
  require_react
} from "./chunk-FLAVOKRJ.js";
import {
  __commonJS,
  __toESM
} from "./chunk-AC2VUBZ6.js";

// node_modules/bezier-easing/src/index.js
var require_src = __commonJS({
  "node_modules/bezier-easing/src/index.js"(exports, module) {
    var NEWTON_ITERATIONS = 4;
    var NEWTON_MIN_SLOPE = 1e-3;
    var SUBDIVISION_PRECISION = 1e-7;
    var SUBDIVISION_MAX_ITERATIONS = 10;
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    var float32ArraySupported = typeof Float32Array === "function";
    function A(aA1, aA2) {
      return 1 - 3 * aA2 + 3 * aA1;
    }
    function B(aA1, aA2) {
      return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
      return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX, currentT, i = 0;
      do {
        currentT = aA + (aB - aA) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
      return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0) {
          return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function LinearEasing(x) {
      return x;
    }
    module.exports = function bezier(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        throw new Error("bezier x values must be in [0, 1] range");
      }
      if (mX1 === mY1 && mX2 === mY2) {
        return LinearEasing;
      }
      var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }
      return function BezierEasing2(x) {
        if (x === 0) {
          return 0;
        }
        if (x === 1) {
          return 1;
        }
        return calcBezier(getTForX(x), mY1, mY2);
      };
    };
  }
});

// node_modules/window-scroll-manager/index.js
var require_window_scroll_manager = __commonJS({
  "node_modules/window-scroll-manager/index.js"(exports, module) {
    "use strict";
    (function() {
      var instance = null;
      var instancesCount = 0;
      var ticking = false;
      var EVENT_NAME = "window-scroll";
      var isWindowDefined = typeof window !== "undefined";
      function detectPassiveEvents() {
        if (isWindowDefined && typeof window.addEventListener === "function") {
          var passive = false;
          var options = Object.defineProperty({}, "passive", {
            get: function() {
              passive = true;
            }
          });
          var noop = function() {
          };
          window.addEventListener("TEST_PASSIVE_EVENT_SUPPORT", noop, options);
          window.removeEventListener("TEST_PASSIVE_EVENT_SUPPORT", noop, options);
          return passive;
        }
        return false;
      }
      var supportsPassiveEvents = detectPassiveEvents();
      var supportsCustomEvents = isWindowDefined && typeof window.CustomEvent === "function";
      function ScrollManager2() {
        if (typeof window === "undefined") {
          return null;
        }
        instancesCount++;
        if (instance) {
          return instance;
        }
        instance = this;
        this.handleScroll = this.handleScroll.bind(this);
        this.eventListenerOptions = supportsPassiveEvents ? { passive: true } : true;
        window.addEventListener("scroll", this.handleScroll, this.eventListenerOptions);
      }
      ScrollManager2.prototype.removeListener = function() {
        instancesCount--;
        if (instancesCount === 0) {
          this.destroy();
        }
      };
      ScrollManager2.prototype.destroy = function() {
        window.removeEventListener("scroll", this.handleScroll, this.eventListenerOptions);
        instance = null;
        instancesCount = 0;
      };
      ScrollManager2.prototype.getScrollPosition = function() {
        var scrollPositionY = window.scrollY || document.documentElement.scrollTop;
        var scrollPositionX = window.scrollX || document.documentElement.scrollLeft;
        if (scrollPositionY < 0) {
          scrollPositionY = 0;
        }
        if (scrollPositionX < 0) {
          scrollPositionX = 0;
        }
        return {
          // Alias for scrollPositionY for backwards compatibility
          scrollPosition: scrollPositionY,
          scrollPositionY,
          scrollPositionX
        };
      };
      ScrollManager2.prototype.handleScroll = function() {
        if (!ticking) {
          ticking = true;
          var event;
          if (supportsCustomEvents) {
            event = new CustomEvent(EVENT_NAME, {
              detail: this.getScrollPosition()
            });
          } else {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(EVENT_NAME, false, false, this.getScrollPosition());
          }
          window.dispatchEvent(event);
          window.requestAnimationFrame(function() {
            ticking = false;
          });
        }
      };
      if (typeof module !== "undefined" && module.exports) {
        ScrollManager2.default = ScrollManager2;
        module.exports = ScrollManager2;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("window-scroll-manager", [], function() {
          return ScrollManager2;
        });
      } else {
        window.ScrollManager = ScrollManager2;
      }
    }).call(exports);
  }
});

// node_modules/react-plx/dist/esm/index.js
var import_react = __toESM(require_react());
var import_bezier_easing = __toESM(require_src());
var import_window_scroll_manager = __toESM(require_window_scroll_manager());
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var START_END_DURATION_REGEX = /^-?\d+(\.\d+)?(px|vh|%)?$/;
var DEFAULT_UNIT = "px";
var DEFAULT_ANGLE_UNIT = "deg";
var ANGLE_PROPERTIES = ["rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY", "skewZ", "hueRotate"];
var EASINGS = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86]
};
var REGEX_0_255 = "(1?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])";
var REGEX_0_1 = "([01](\\.\\d+)?)";
var REGEX_TWO_HEX_DIGITS = "([a-f\\d]{2})";
var HEX_REGEX = new RegExp(`^#${REGEX_TWO_HEX_DIGITS}${REGEX_TWO_HEX_DIGITS}${REGEX_TWO_HEX_DIGITS}$`, "i");
var RGB_REGEX = new RegExp(`^rgb\\(${REGEX_0_255},${REGEX_0_255},${REGEX_0_255}\\)$`, "i");
var RGBA_REGEX = new RegExp(`^rgba\\(${REGEX_0_255},${REGEX_0_255},${REGEX_0_255},${REGEX_0_1}\\)$`, "i");
var SCROLL_OFFSET = 50;
var RESIZE_DEBOUNCE_TIMEOUT = 150;
var TRANSFORM_MAP = {
  rotate: (value, unit = DEFAULT_ANGLE_UNIT) => `rotate(${value}${unit})`,
  rotateX: (value, unit = DEFAULT_ANGLE_UNIT) => `rotateX(${value}${unit})`,
  rotateY: (value, unit = DEFAULT_ANGLE_UNIT) => `rotateY(${value}${unit})`,
  rotateZ: (value, unit = DEFAULT_ANGLE_UNIT) => `rotateZ(${value}${unit})`,
  scale: (value) => `scale(${value})`,
  scaleX: (value) => `scaleX(${value})`,
  scaleY: (value) => `scaleY(${value})`,
  scaleZ: (value) => `scaleZ(${value})`,
  skew: (value, unit = DEFAULT_UNIT) => `skew(${value}${unit})`,
  skewX: (value, unit = DEFAULT_UNIT) => `skewX(${value}${unit})`,
  skewY: (value, unit = DEFAULT_UNIT) => `skewY(${value}${unit})`,
  skewZ: (value, unit = DEFAULT_UNIT) => `skewZ(${value}${unit})`,
  translateX: (value, unit = DEFAULT_UNIT) => `translateX(${value}${unit})`,
  translateY: (value, unit = DEFAULT_UNIT) => `translateY(${value}${unit})`,
  translateZ: (value, unit = DEFAULT_UNIT) => `translateZ(${value}${unit})`
};
var ORDER_OF_TRANSFORMS = [
  "translateX",
  "translateY",
  "translateZ",
  "skew",
  "skewX",
  "skewY",
  "skewZ",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ"
];
var COLOR_PROPERTIES = [
  "backgroundColor",
  "borderBottomColor",
  "borderColor",
  "borderLeftColor",
  "borderRightColor",
  "borderTopColor",
  "color",
  "fill",
  "stroke"
];
var FILTER_MAP = {
  blur: (value, unit = DEFAULT_UNIT) => `blur(${value}${unit})`,
  brightness: (value) => `brightness(${value})`,
  contrast: (value) => `contrast(${value})`,
  grayscale: (value) => `grayscale(${value})`,
  hueRotate: (value, unit = DEFAULT_ANGLE_UNIT) => `hue-rotate(${value}${unit})`,
  invert: (value) => `invert(${value})`,
  opacityFilter: (value) => `opacity(${value})`,
  saturate: (value) => `saturate(${value})`,
  sepia: (value) => `sepia(${value})`
};
var FILTER_PROPERTIES = [
  "blur",
  "brightness",
  "contrast",
  "grayscale",
  "hueRotate",
  "invert",
  "opacityFilter",
  "saturate",
  "sepia"
];
function getElementTop(el) {
  let top = 0;
  let element = el;
  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);
  return top;
}
function getUnit(property, unit) {
  let propertyUnit = unit || DEFAULT_UNIT;
  if (ANGLE_PROPERTIES.indexOf(property) >= 0) {
    propertyUnit = unit || DEFAULT_ANGLE_UNIT;
  }
  return propertyUnit;
}
function getValueInPx(value, maxScroll) {
  var _a;
  const floatValue = parseFloat(value);
  const unit = ((_a = value.match(START_END_DURATION_REGEX)) === null || _a === void 0 ? void 0 : _a[2]) || null;
  const vh = window.innerHeight / 100;
  let valueInPx;
  switch (unit) {
    case "vh":
      valueInPx = vh * floatValue;
      break;
    case "%":
      valueInPx = maxScroll * floatValue / 100;
      break;
    default:
      valueInPx = floatValue;
  }
  return valueInPx;
}
function convertPropToPixels(propName, propValue, maxScroll, offset = 0) {
  let propValueInPx = propValue;
  const isElement = propValue instanceof HTMLElement;
  const keyCodes = {
    ZERO: 48,
    NINE: 57
  };
  if (typeof propValue === "number") {
    propValueInPx = propValue;
  } else if (START_END_DURATION_REGEX.test(propValue)) {
    propValueInPx = getValueInPx(propValue, maxScroll);
  } else if (isElement || typeof propValue === "string" && (propValue.charCodeAt(0) < keyCodes.ZERO || propValue.charCodeAt(0) > keyCodes.NINE)) {
    const element = isElement ? propValue : document.querySelector(propValue);
    if (!element) {
      console.warn(`Plx, ERROR: ${propName} selector matches no elements: "${propValue}"`);
      return null;
    }
    if (propName === "start" || propName === "end") {
      propValueInPx = getElementTop(element) - window.innerHeight;
    } else if (propName === "duration") {
      propValueInPx = element.offsetHeight;
    }
  } else {
    console.warn(`Plx, ERROR: "${propValue}" is not a valid ${propName} value, check documentation`);
    return null;
  }
  let offsetInPx = 0;
  if (typeof offset === "number") {
    offsetInPx = offset;
  } else if (START_END_DURATION_REGEX.test(offset)) {
    offsetInPx = getValueInPx(offset, maxScroll);
  }
  propValueInPx += offsetInPx;
  if (propValueInPx < 0) {
    propValueInPx = 0;
  }
  return propValueInPx;
}
function hexToObject(hex) {
  const color = hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex;
  const result = HEX_REGEX.exec(color);
  if (!result) {
    console.warn(`Plx, ERROR: hex color is not in the right format: "${hex}"`);
    return null;
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 1
  };
}
function rgbToObject(rgb) {
  const isRgba = rgb.toLowerCase().indexOf("rgba") === 0;
  const color = rgb.replace(/ /g, "");
  const result = isRgba ? RGBA_REGEX.exec(color) : RGB_REGEX.exec(color);
  if (!result) {
    console.warn(`Plx, ERROR: rgb or rgba color is not in the right format: "${rgb}"`);
    return null;
  }
  return {
    r: parseInt(result[1], 10),
    g: parseInt(result[2], 10),
    b: parseInt(result[3], 10),
    a: isRgba ? parseFloat(result[4]) : 1
  };
}
function parallax(scrollPosition, start, duration, startValue, endValue, easing) {
  if (typeof startValue !== "number") {
    console.warn(`Plx, ERROR: startValue is not a number (type: "${typeof endValue}", value: "${endValue}")`);
    return 0;
  }
  if (typeof endValue !== "number") {
    console.warn(`Plx, ERROR: endValue is not a number (type: "${typeof endValue}", value: "${endValue}")`);
    return 0;
  }
  if (typeof duration !== "number" || duration === 0) {
    console.warn(`Plx, ERROR: duration is zero or not a number (type: "${typeof duration}", value: "${duration}")`);
    return 0;
  }
  let min = startValue;
  let max = endValue;
  const invert = startValue > endValue;
  if (invert) {
    min = endValue;
    max = startValue;
  }
  let percentage = (scrollPosition - start) / duration;
  if (percentage > 1) {
    percentage = 1;
  } else if (percentage < 0) {
    percentage = 0;
  }
  if (easing) {
    if (Array.isArray(easing)) {
      percentage = (0, import_bezier_easing.default)(easing[0], easing[1], easing[2], easing[3])(percentage);
    } else if (typeof easing === "string" && EASINGS[easing]) {
      percentage = (0, import_bezier_easing.default)(EASINGS[easing][0], EASINGS[easing][1], EASINGS[easing][2], EASINGS[easing][3])(percentage);
    } else if (typeof easing === "function") {
      percentage = easing(percentage);
    }
  }
  let value = percentage * (max - min);
  if (invert) {
    value = max - value;
  } else {
    value += min;
  }
  return Math.floor(value * 1e4) / 1e4;
}
function colorParallax(scrollPosition, start, duration, startValue, endValue, easing) {
  let startObject = null;
  let endObject = null;
  if (typeof startValue === "string") {
    if (startValue[0].toLowerCase() === "r") {
      startObject = rgbToObject(startValue);
    } else {
      startObject = hexToObject(startValue);
    }
  }
  if (typeof endValue === "string") {
    if (endValue[0].toLowerCase() === "r") {
      endObject = rgbToObject(endValue);
    } else {
      endObject = hexToObject(endValue);
    }
  }
  if (startObject && endObject) {
    const r = parallax(scrollPosition, start, duration, startObject.r, endObject.r, easing);
    const g = parallax(scrollPosition, start, duration, startObject.g, endObject.g, easing);
    const b = parallax(scrollPosition, start, duration, startObject.b, endObject.b, easing);
    const a = parallax(scrollPosition, start, duration, startObject.a, endObject.a, easing);
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
  }
  return "";
}
function applyPropertyToStyle(scrollPosition, propertyData, startPosition, duration, style, transforms, filters, easing) {
  const { startValue, endValue, property, unit } = propertyData;
  const isColor = COLOR_PROPERTIES.indexOf(property) > -1;
  const parallaxMethod = isColor ? colorParallax : parallax;
  const value = parallaxMethod(scrollPosition, startPosition, duration, startValue, endValue, easing);
  const transformMethod = TRANSFORM_MAP[property];
  const filterMethod = FILTER_MAP[property];
  const newStyle = style;
  if (transformMethod) {
    const propertyUnit = getUnit(property, unit);
    transforms[property] = transformMethod(value, propertyUnit);
  } else if (filterMethod) {
    const propertyUnit = getUnit(property, unit);
    filters[property] = filterMethod(value, propertyUnit);
  } else {
    newStyle[property] = value;
    if (unit) {
      newStyle[property] += unit;
    }
  }
}
function getClasses(lastSegmentScrolledBy, isInSegment, parallaxData) {
  let cssClasses = "";
  if (lastSegmentScrolledBy === null) {
    cssClasses = "Plx--above";
  } else if (lastSegmentScrolledBy === parallaxData.length - 1 && !isInSegment) {
    cssClasses = "Plx--below";
  } else if (lastSegmentScrolledBy !== null && isInSegment) {
    const segmentName = parallaxData[lastSegmentScrolledBy].name || lastSegmentScrolledBy;
    cssClasses = `Plx--active Plx--in Plx--in-${segmentName}`;
  } else if (lastSegmentScrolledBy !== null && !isInSegment) {
    const segmentName = parallaxData[lastSegmentScrolledBy].name || lastSegmentScrolledBy;
    const nextSegmentName = parallaxData[lastSegmentScrolledBy + 1].name || lastSegmentScrolledBy + 1;
    cssClasses = `Plx--active Plx--between Plx--between-${segmentName}-and-${nextSegmentName}`;
  }
  return cssClasses;
}
function checkIsActive(classes) {
  return classes.indexOf("Plx--active") > -1;
}
function updateDOM(scrollPosition, props, showElement, propsUsedInParallax, plxStyleRef, plxStateClassesRef, elementRef) {
  const { animateWhenNotInViewport, disabled, freeze, parallaxData, className, onPlxEnd, onPlxStart, style } = props;
  const plxStyle = plxStyleRef.current;
  const plxStateClasses = plxStateClassesRef.current;
  const element = elementRef.current;
  if (freeze && showElement || !element || disabled) {
    return;
  }
  if (!animateWhenNotInViewport) {
    const rect = element.getBoundingClientRect();
    const isTopAboveBottomEdge = rect.top < window.innerHeight + SCROLL_OFFSET;
    const isBottomBelowTopEdge = rect.top + rect.height > -SCROLL_OFFSET;
    if (!isTopAboveBottomEdge || !isBottomBelowTopEdge) {
      return;
    }
  }
  let newStyle = {};
  const transforms = {};
  const filters = {};
  const appliedProperties = [];
  const segments = [];
  let isInSegment = false;
  let lastSegmentScrolledBy = null;
  const bodyHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const maxScroll = bodyHeight - window.innerHeight;
  for (let i = 0; i < parallaxData.length; i++) {
    const { duration, easing, endOffset, properties, startOffset } = parallaxData[i];
    const start = parallaxData[i].start === "self" ? element : parallaxData[i].start;
    const end = parallaxData[i].end === "self" ? element : parallaxData[i].end;
    const startInPx = convertPropToPixels("start", start, maxScroll, startOffset);
    let durationInPx;
    let endInPx;
    if (typeof end !== "undefined") {
      endInPx = convertPropToPixels("end", end, maxScroll, endOffset);
      durationInPx = endInPx - startInPx;
    } else {
      durationInPx = convertPropToPixels("duration", duration, maxScroll);
      endInPx = startInPx + durationInPx;
    }
    if (scrollPosition < startInPx) {
      break;
    }
    const isScrolledByStart = scrollPosition >= startInPx;
    if (isScrolledByStart) {
      lastSegmentScrolledBy = i;
    }
    if (scrollPosition >= startInPx && scrollPosition <= endInPx) {
      isInSegment = true;
      properties.forEach((propertyData) => {
        const { property } = propertyData;
        appliedProperties.push(property);
        applyPropertyToStyle(scrollPosition, propertyData, startInPx, durationInPx, newStyle, transforms, filters, easing);
      });
    } else {
      segments.push({
        easing,
        durationInPx,
        properties,
        startInPx
      });
    }
  }
  segments.forEach((data) => {
    const { easing, durationInPx, properties, startInPx } = data;
    properties.forEach((propertyData) => {
      const { property } = propertyData;
      if (appliedProperties.indexOf(property) > -1) {
        return;
      }
      applyPropertyToStyle(scrollPosition, propertyData, startInPx, durationInPx, newStyle, transforms, filters, easing);
    });
  });
  const transformsOrdered = [];
  ORDER_OF_TRANSFORMS.forEach((transformKey) => {
    if (transforms[transformKey]) {
      transformsOrdered.push(transforms[transformKey]);
    }
  });
  newStyle.transform = transformsOrdered.join(" ");
  newStyle.webkitTransform = newStyle.transform;
  const filtersArray = [];
  FILTER_PROPERTIES.forEach((filterKey) => {
    if (filters[filterKey]) {
      filtersArray.push(filters[filterKey]);
    }
  });
  newStyle.filter = filtersArray.join(" ");
  newStyle.webkitFilter = newStyle.filter;
  if (JSON.stringify(plxStyle) !== JSON.stringify(newStyle)) {
    requestAnimationFrame(() => {
      for (const property in style) {
        element.style[property] = style[property];
      }
      propsUsedInParallax.forEach((property) => {
        element.style[property] = typeof newStyle[property] === "undefined" ? "" : newStyle[property];
      });
    });
    plxStyleRef.current = newStyle;
  }
  const newPlxStateClasses = getClasses(lastSegmentScrolledBy, isInSegment, parallaxData);
  if (newPlxStateClasses !== plxStateClasses) {
    const newClassName = `${className} Plx ${newPlxStateClasses}`;
    if (newClassName !== element.className) {
      const wasActive = checkIsActive(element.className);
      const isActive = checkIsActive(newClassName);
      element.className = newClassName;
      if (!wasActive && isActive) {
        onPlxStart === null || onPlxStart === void 0 ? void 0 : onPlxStart();
      } else if (wasActive && !isActive) {
        onPlxEnd === null || onPlxEnd === void 0 ? void 0 : onPlxEnd();
      }
    }
    plxStateClassesRef.current = newPlxStateClasses;
  }
}
var Plx = (props) => {
  const { animateWhenNotInViewport = false, children, className = "", disabled = false, freeze = false, parallaxData, style = {}, onPlxStart, onPlxEnd, tagName: ElementTag = "div" } = props, elementProps = __rest(props, ["animateWhenNotInViewport", "children", "className", "disabled", "freeze", "parallaxData", "style", "onPlxStart", "onPlxEnd", "tagName"]);
  const scrollManager = (0, import_react.useRef)();
  const resizeTimeout = (0, import_react.useRef)();
  const element = (0, import_react.useRef)(null);
  const plxStyle = (0, import_react.useRef)({});
  const plxStyleClasses = (0, import_react.useRef)("");
  const [showElement, setShowElement] = (0, import_react.useState)(false);
  const propsUsedInParallax = (0, import_react.useMemo)(() => {
    const properties = [];
    parallaxData.forEach((segment) => {
      segment.properties.forEach(({ property }) => {
        const transformMethod = TRANSFORM_MAP[property];
        const filterMethod = FILTER_MAP[property];
        if (transformMethod) {
          if (!properties.includes("transform")) {
            properties.push("transform", "webkitTransform");
          }
        } else if (filterMethod) {
          if (!properties.includes("filter")) {
            properties.push("filter", "webkitFilter");
          }
        } else {
          if (!properties.includes(property)) {
            properties.push(property);
          }
        }
      });
    });
    return properties;
  }, [parallaxData]);
  (0, import_react.useEffect)(() => {
    if (element.current) {
      element.current.style.willChange = propsUsedInParallax.map((str) => {
        return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace("webkit", "-webkit");
      }).join(",");
    }
  }, [element, propsUsedInParallax]);
  const update = (0, import_react.useCallback)((scrollPosition = null) => {
    const currentScrollPosition = scrollPosition === null ? scrollManager.current.getScrollPosition().scrollPositionY : scrollPosition;
    updateDOM(currentScrollPosition, props, showElement, propsUsedInParallax, plxStyle, plxStyleClasses, element);
  }, [props]);
  const handleResize = (0, import_react.useCallback)(() => {
    clearTimeout(resizeTimeout.current);
    resizeTimeout.current = setTimeout(() => {
      update();
    }, RESIZE_DEBOUNCE_TIMEOUT);
  }, [props]);
  (0, import_react.useEffect)(() => {
    if (scrollManager.current) {
      if (disabled) {
        propsUsedInParallax.forEach((property) => {
          if (element.current) {
            element.current.style[property] = "";
          }
        });
      } else {
        update();
      }
    }
  }, [disabled]);
  const handleScrollChange = (0, import_react.useCallback)((e) => {
    update(e.detail.scrollPositionY);
  }, [props]);
  (0, import_react.useEffect)(() => {
    scrollManager.current = new import_window_scroll_manager.default();
    window.addEventListener("window-scroll", handleScrollChange);
    window.addEventListener("resize", handleResize);
    update();
    setShowElement(true);
    return () => {
      clearTimeout(resizeTimeout.current);
      window.removeEventListener("window-scroll", handleScrollChange);
      window.removeEventListener("resize", handleResize);
      scrollManager.current.removeListener();
    };
  }, [props]);
  (0, import_react.useEffect)(() => {
    update();
  }, []);
  let elementStyle = style;
  if (!disabled) {
    elementStyle = Object.assign(Object.assign({}, style), {
      // Hide element before until it is rendered
      // This prevents jumps if page is scrolled and then refreshed
      visibility: showElement ? void 0 : "hidden"
    });
  }
  return import_react.default.createElement(ElementTag, Object.assign({}, elementProps, { className: `${className} Plx`, style: elementStyle, ref: element }), children);
};
var esm_default = Plx;
export {
  esm_default as default
};
//# sourceMappingURL=react-plx.js.map
