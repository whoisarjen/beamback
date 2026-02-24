/* Beamback Feedback Widget — v1.0 */
/* Cache-Control: public, max-age=86400 */
(function() {
  "use strict";

  var scripts = document.getElementsByTagName("script");
  var script = scripts[scripts.length - 1];
  var apiKey = script.getAttribute("data-api-key");
  var position = script.getAttribute("data-position") || "bottom-right";
  var color = script.getAttribute("data-color") || "#3A82FF";
  var buttonText = script.getAttribute("data-button-text") || "Feedback";
  var appUrl = "https://beamback.whoisarjen.com";

  if (!apiKey) {
    console.warn("[Beamback] Missing data-api-key attribute on script tag.");
    return;
  }

  // Utility: apply multiple styles
  function applyStyles(el, styles) {
    for (var key in styles) {
      if (styles.hasOwnProperty(key)) {
        el.style[key] = styles[key];
      }
    }
  }

  // Utility: compute contrasting text color
  function getContrastColor(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  }

  var textColor = getContrastColor(color);

  // Create floating trigger button
  var btn = document.createElement("button");
  btn.setAttribute("aria-label", "Open feedback form");
  btn.textContent = buttonText;

  var btnStyles = {
    position: "fixed",
    zIndex: "2147483646",
    border: "none",
    borderRadius: "28px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    cursor: "pointer",
    backgroundColor: color,
    color: textColor,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    outline: "none",
    minWidth: "44px",
    minHeight: "44px",
    lineHeight: "1"
  };

  if (position === "bottom-left") {
    btnStyles.bottom = "20px";
    btnStyles.left = "20px";
    btnStyles.right = "auto";
  } else {
    btnStyles.bottom = "20px";
    btnStyles.right = "20px";
    btnStyles.left = "auto";
  }

  applyStyles(btn, btnStyles);

  btn.addEventListener("mouseenter", function() {
    btn.style.transform = "scale(1.05)";
    btn.style.boxShadow = "0 6px 32px rgba(0, 0, 0, 0.35), 0 3px 12px rgba(0, 0, 0, 0.25)";
  });

  btn.addEventListener("mouseleave", function() {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)";
  });

  var iframe = null;
  var backdrop = null;
  var isOpen = false;
  var isMobile = window.innerWidth <= 480;

  window.addEventListener("resize", function() {
    isMobile = window.innerWidth <= 480;
    if (iframe) {
      if (isMobile) {
        applyStyles(iframe, mobileIframeStyles());
      } else {
        applyStyles(iframe, desktopIframeStyles());
      }
    }
  });

  function mobileIframeStyles() {
    return {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      width: "100%",
      height: "100%",
      maxWidth: "none",
      maxHeight: "none",
      borderRadius: "0",
      border: "none",
      zIndex: "2147483647"
    };
  }

  function desktopIframeStyles() {
    var styles = {
      position: "fixed",
      width: "380px",
      height: "460px",
      maxWidth: "calc(100vw - 40px)",
      maxHeight: "calc(100vh - 100px)",
      borderRadius: "16px",
      border: "1px solid rgba(30, 42, 69, 0.6)",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3)",
      zIndex: "2147483647",
      bottom: "80px",
      top: "auto"
    };

    if (position === "bottom-left") {
      styles.left = "20px";
      styles.right = "auto";
    } else {
      styles.right = "20px";
      styles.left = "auto";
    }

    return styles;
  }

  function createBackdrop() {
    backdrop = document.createElement("div");
    applyStyles(backdrop, {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: "2147483645",
      display: "none"
    });
    backdrop.addEventListener("click", function() {
      close();
    });
    document.body.appendChild(backdrop);
  }

  function open() {
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.src = appUrl + "/widget/" + encodeURIComponent(apiKey);
      iframe.title = "Beamback Feedback Form";
      iframe.setAttribute("sandbox", "allow-scripts allow-forms allow-same-origin");
      iframe.setAttribute("loading", "lazy");

      var baseStyles = {
        display: "block",
        backgroundColor: "#0C1120",
        overflow: "hidden"
      };

      applyStyles(iframe, baseStyles);

      if (isMobile) {
        applyStyles(iframe, mobileIframeStyles());
      } else {
        applyStyles(iframe, desktopIframeStyles());
      }

      document.body.appendChild(iframe);
    } else {
      iframe.style.display = "block";
    }

    if (!backdrop) {
      createBackdrop();
    }

    if (isMobile) {
      backdrop.style.display = "block";
    } else {
      backdrop.style.display = "none";
    }

    isOpen = true;
    btn.textContent = "\u2715";
    btn.setAttribute("aria-label", "Close feedback form");
  }

  function close() {
    if (iframe) {
      iframe.style.display = "none";
    }
    if (backdrop) {
      backdrop.style.display = "none";
    }
    isOpen = false;
    btn.textContent = buttonText;
    btn.setAttribute("aria-label", "Open feedback form");
    btn.focus();
  }

  btn.addEventListener("click", function() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  });

  // Listen for close message from iframe
  window.addEventListener("message", function(event) {
    if (event.data === "feedback-widget-close") {
      close();
    }
  });

  // Keyboard: Escape to close
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && isOpen) {
      close();
    }
  });

  document.body.appendChild(btn);
})();
