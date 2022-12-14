# stylelint-order

## 说明

基于stylelint的样式排序插件，也可以用于HBuilder X编译器中的css、less、sass样式格式化。

## 使用说明

1. 安装插件后，在HBuilde X中打开html、vue、nvue、css、less、scss、sass等文件
2. 右击选择【样式格式化】即可对样式进行自动格式化

## 配置文件，如何配置选项？

配置文件是.stylelintrc.js，如果项目中存在.stylelintrc.js文件，以项目中的配置为准。
点击菜单工具 -> 插件配置 -> stylelint-order -> .stylelintrc.js，即可打开配置文件。

> 经过测试HBuilderX 中使用ctrl+s不会触发保存时自动格式化，具体原因未知，可能是编译器的限制导致的。

## 样式排序顺序
使用的是Bootstrap的CSS排序规则，相关的属性声明应当归为一组，并按照下面的顺序排列：

1. Positioning
2. Box model
3. Typographic
4. Visual
5. Misc

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

其他属性只是影响组件的 内部 或者是不影响前两组属性，因此排在后面。

## 如何修改规则？

修改.stylelintrc.js文件，在`rules`属性中调整规则，在`order/properties-order`属性中调整排序规则。
默认规则如下: 

```javascript
module.exports = {
  extends: "stylelint-config-standard",
  overrides: [{
  	customSyntax: "postcss-scss",
  	files: ["**/*.css", "**/*.scss"]
  }, {
  	customSyntax: "postcss-less",
  	files: ["**/*.less"]
  }, {
  	customSyntax: "postcss-html",
  	files: ["**/*.html", "**/*.vue", "**/*.nvue"]
  }],
  plugins: ["stylelint-order"],
  rules: {
	// 禁止未知单位
	"unit-no-unknown": false,
	// 为适用的颜色功能指定现代或传统符号
	"color-function-notation": "legacy",
	// 禁止无效的十六进制颜色
	"color-no-invalid-hex": true,
	// 不允许未知的规则
	"at-rule-no-unknown": [true, {
		ignoreAtRules: ["content", "each", "error", "extend", "for", "function", "if", "include",
			"mixin", "return", "while", "tailwind", "apply", "variants", "responsive", "screen"
		]
	}],
    "order/properties-order": [
      {
        // Must be first.
        properties: ["all"]
      },
      {
        // Position.
        properties: [
          "position",
          "inset",
          "inset-block",
          "inset-inline",
          "top",
          "right",
          "bottom",
          "left",
          "z-index"
        ]
      },
      {
        // Display mode.
        properties: ["box-sizing", "display"]
      },
      {
        // Flexible boxes.
        properties: [
          "flex",
          "flex-basis",
          "flex-direction",
          "flex-flow",
          "flex-grow",
          "flex-shrink",
          "flex-wrap"
        ]
      },
      {
        // Grid layout.
        properties: [
          "grid",
          "grid-area",
          "grid-template",
          "grid-template-areas",
          "grid-template-rows",
          "grid-template-columns",
          "grid-row",
          "grid-row-start",
          "grid-row-end",
          "grid-column",
          "grid-column-start",
          "grid-column-end",
          "grid-auto-rows",
          "grid-auto-columns",
          "grid-auto-flow",
          "grid-gap",
          "grid-row-gap",
          "grid-column-gap"
        ]
      },
      {
        // Gap.
        properties: ["gap", "row-gap", "column-gap"]
      },
      {
        // Layout alignment.
        properties: [
          "place-content",
          "place-items",
          "place-self",
          "align-content",
          "align-items",
          "align-self",
          "justify-content",
          "justify-items",
          "justify-self"
        ]
      },
      {
        // Order.
        properties: ["order"]
      },
      {
        // Box model.
        properties: [
          "float",
          "width",
          "min-width",
          "max-width",
          "height",
          "min-height",
          "max-height",
          "aspect-ratio",
          "padding",
          "padding-block",
          "padding-block-start",
          "padding-block-end",
          "padding-inline",
          "padding-inline-start",
          "padding-inline-end",
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
          "margin",
          "margin-block",
          "margin-block-start",
          "margin-block-end",
          "margin-inline",
          "margin-inline-start",
          "margin-inline-end",
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
          "overflow",
          "overflow-x",
          "overflow-y",
          "-webkit-overflow-scrolling",
          "-ms-overflow-x",
          "-ms-overflow-y",
          "-ms-overflow-style",
          "overscroll-behavior",
          "overscroll-behavior-x",
          "overscroll-behavior-y",
          "overscroll-behavior-inline",
          "overscroll-behavior-block",
          "clip",
          "clip-path",
          "clear"
        ]
      },
      {
        // Typography.
        properties: [
          "font",
          "font-family",
          "font-size",
          "font-variation-settings",
          "font-style",
          "font-weight",
          "font-feature-settings",
          "font-optical-sizing",
          "font-kerning",
          "font-variant",
          "font-variant-ligatures",
          "font-variant-caps",
          "font-variant-alternates",
          "font-variant-numeric",
          "font-variant-east-asian",
          "font-variant-position",
          "font-size-adjust",
          "font-stretch",
          "font-effect",
          "font-emphasize",
          "font-emphasize-position",
          "font-emphasize-style",
          "-webkit-font-smoothing",
          "-moz-osx-font-smoothing",
          "font-smooth",
          "hyphens",
          "line-height",
          "color",
          "text-align",
          "text-align-last",
          "text-emphasis",
          "text-emphasis-color",
          "text-emphasis-style",
          "text-emphasis-position",
          "text-decoration",
          "text-decoration-line",
          "text-decoration-thickness",
          "text-decoration-style",
          "text-decoration-color",
          "text-underline-position",
          "text-underline-offset",
          "text-indent",
          "text-justify",
          "text-outline",
          "-ms-text-overflow",
          "text-overflow",
          "text-overflow-ellipsis",
          "text-overflow-mode",
          "text-shadow",
          "text-transform",
          "text-wrap",
          "-webkit-text-size-adjust",
          "-ms-text-size-adjust",
          "letter-spacing",
          "word-break",
          "word-spacing",
          "word-wrap", // Legacy name for `overflow-wrap`
          "overflow-wrap",
          "tab-size",
          "white-space",
          "vertical-align",

          "list-style",
          "list-style-position",
          "list-style-type",
          "list-style-image",

          "src",
          "font-display",
          "unicode-range",
          "size-adjust",
          "ascent-override",
          "descent-override",
          "line-gap-override"
        ]
      },
      {
        // Accessibility & Interactions.
        properties: [
          "pointer-events",
          "-ms-touch-action",
          "touch-action",
          "cursor",
          "visibility",
          "zoom",
          "table-layout",
          "empty-cells",
          "caption-side",
          "border-spacing",
          "border-collapse",
          "content",
          "quotes",
          "counter-reset",
          "counter-increment",
          "resize",
          "user-select",
          "nav-index",
          "nav-up",
          "nav-right",
          "nav-down",
          "nav-left"
        ]
      },
      {
        // Background & Borders.
        properties: [
          "background",
          "background-color",
          "background-image",
          "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
          "filter:progid:DXImageTransform.Microsoft.gradient",
          "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
          "filter",
          "background-repeat",
          "background-attachment",
          "background-position",
          "background-position-x",
          "background-position-y",
          "background-clip",
          "background-origin",
          "background-size",
          "background-blend-mode",
          "isolation",
          "border",
          "border-color",
          "border-style",
          "border-width",
          "border-block",
          "border-block-start",
          "border-block-start-color",
          "border-block-start-style",
          "border-block-start-width",
          "border-block-end",
          "border-block-end-color",
          "border-block-end-style",
          "border-block-end-width",
          "border-inline",
          "border-inline-start",
          "border-inline-start-color",
          "border-inline-start-style",
          "border-inline-start-width",
          "border-inline-end",
          "border-inline-end-color",
          "border-inline-end-style",
          "border-inline-end-width",
          "border-top",
          "border-top-color",
          "border-top-style",
          "border-top-width",
          "border-right",
          "border-right-color",
          "border-right-style",
          "border-right-width",
          "border-bottom",
          "border-bottom-color",
          "border-bottom-style",
          "border-bottom-width",
          "border-left",
          "border-left-color",
          "border-left-style",
          "border-left-width",
          "border-radius",
          "border-start-start-radius",
          "border-start-end-radius",
          "border-end-start-radius",
          "border-end-end-radius",
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-right-radius",
          "border-bottom-left-radius",
          "border-image",
          "border-image-source",
          "border-image-slice",
          "border-image-width",
          "border-image-outset",
          "border-image-repeat",
          "outline",
          "outline-width",
          "outline-style",
          "outline-color",
          "outline-offset",
          "box-shadow",
          "mix-blend-mode",
          "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity",
          "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
          "opacity",
          "-ms-interpolation-mode"
        ]
      },
      {
        // SVG Presentation Attributes.
        properties: [
          "alignment-baseline",
          "baseline-shift",
          "dominant-baseline",
          "text-anchor",
          "word-spacing",
          "writing-mode",

          "fill",
          "fill-opacity",
          "fill-rule",
          "stroke",
          "stroke-dasharray",
          "stroke-dashoffset",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-miterlimit",
          "stroke-opacity",
          "stroke-width",

          "color-interpolation",
          "color-interpolation-filters",
          "color-profile",
          "color-rendering",
          "flood-color",
          "flood-opacity",
          "image-rendering",
          "lighting-color",
          "marker-start",
          "marker-mid",
          "marker-end",
          "mask",
          "shape-rendering",
          "stop-color",
          "stop-opacity"
        ]
      },
      {
        // Transitions & Animation.
        properties: [
          "transition",
          "transition-delay",
          "transition-timing-function",
          "transition-duration",
          "transition-property",
          "transform",
          "transform-origin",
          "animation",
          "animation-name",
          "animation-duration",
          "animation-play-state",
          "animation-timing-function",
          "animation-delay",
          "animation-iteration-count",
          "animation-direction"
        ]
      }
    ]
  }
};
```