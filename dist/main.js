/*!
 * Snippet-Actions v1.0.28
 * 文本片段处理工具集。
 * Author: 稻米鼠
 * Created: 2025-04-02 18:07:00
 * Updated: 2025-04-03 20:43:44
 * Repository: https://github.com/dmscode/Snippet-Actions.git
 */
var SA = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // package.json
  var require_package = __commonJS({
    "package.json"(exports, module) {
      module.exports = {
        name: "Snippet-Actions",
        version: "1.0.28",
        description: "\u6587\u672C\u7247\u6BB5\u5904\u7406\u5DE5\u5177\u96C6\u3002",
        main: "dist/main.js",
        repository: "https://github.com/dmscode/Snippet-Actions.git",
        author: "\u7A3B\u7C73\u9F20",
        scripts: {
          build: "yarn version --patch && node build.js",
          test: "jest",
          "test:watch": "jest --watch"
        },
        devDependencies: {
          "@types/jest": "^29.5.14",
          esbuild: "^0.19.11",
          "fs-extra": "^11.3.0",
          jest: "^29.7.0",
          "jest-html-reporters": "^3.1.7",
          "ts-jest": "^29.3.1",
          typescript: "^5.8.2"
        },
        license: "UNLICENSED"
      };
    }
  });

  // src/main.ts
  var main_exports = {};
  __export(main_exports, {
    SnippetActions: () => SnippetActions
  });

  // src/actions/RemoveZeroWidthChars.ts
  function RemoveZeroWidthChars(input) {
    if (!input)
      return "";
    const pattern = /[\u200B-\u200F\uFEFF\u061C\u2060-\u2069\uFFF9-\uFFFB]+/g;
    return input.replace(pattern, "");
  }

  // src/actions/CorrectCase.ts
  var CASE_SENSITIVE_WORDS = [
    "AI",
    "Obsidian",
    "Excalidraw",
    "Notion",
    "Roam Research",
    "Logseq",
    "Typora",
    "iOS",
    "iPad",
    "iPhone",
    "Android",
    "MacOS",
    "Windows",
    "Linux",
    "Ubuntu",
    "Fedora",
    "Debian",
    "CentOS",
    "openSUSE",
    "Arch",
    "Gentoo",
    "VS Code",
    "Sublime Text",
    "Atom",
    "Vim",
    "Emacs",
    "Neovim",
    "Trae",
    "Cursor",
    "Zettlr"
  ];
  var wordMap = (dict) => {
    const map = /* @__PURE__ */ new Map();
    dict.forEach((word) => {
      map.set(word.toLowerCase(), word);
      if (word.match(/\s+/))
        map.set(word.toLowerCase().replace(/\s+/g, ""), word);
    });
    return map;
  };
  function CorrectCase(input, dict = CASE_SENSITIVE_WORDS) {
    if (!input)
      return "";
    const dictMap = wordMap(dict);
    const pattern = new RegExp(`\\b(${Array.from(dictMap.keys()).join("|")})\\b`, "gi");
    return input.replace(pattern, (match) => dictMap.get(match.toLowerCase()) || match);
  }

  // src/actions/EmojiMarkdown.ts
  var markdownRender = class {
    constructor(content) {
      // 定义处理器数组，包含标题、无序列表和有序列表的处理方法
      this.handlers = [
        this.titleHandler.bind(this),
        this.codeBlockHandler.bind(this),
        this.blockquoteHandler.bind(this),
        this.hrHandler.bind(this),
        this.unorderedListHandler.bind(this),
        this.orderedListHandler.bind(this),
        this.spanTextHandler.bind(this),
        this.urlHandler.bind(this)
      ];
      this.content = content;
    }
    /**
     * 渲染方法，依次执行所有处理器
     */
    render() {
      return this.handlers.reduce((content, handler) => handler(content), this.content);
    }
    /**
     * 标题处理器，将 Markdown 标题转换为带表情符号的格式
     */
    titleHandler(content) {
      return content.replace(/^(#+)\s(.*)/gm, (match, level, title) => {
        title = title.replace(/\s+#+$/g, "");
        const levelStr = (character) => new Array(Math.max(4 - level.length, 1)).fill(character).join("");
        const titleMark = levelStr("\u{1F4CC}");
        return `${titleMark}${levelStr(">")} ${title} ${levelStr("<")}${titleMark}

`;
      });
    }
    /**
     * 代码块处理器，将代码块转换为带表情符号的格式
     */
    codeBlockHandler(content) {
      return content.replace(/^`{3,}(\w*)\n+([\s\S]*?)\n`{3,}\n/gm, (match, language, code) => {
        return `\u{1F4BB}${language.length ? language + " " : ""}Code\u{1F4BB}
${code}
\u{1F4BB}Code End!\u{1F4BB}`;
      });
    }
    /**
     * 引用块处理器，将引用块转换为带表情符号的格式
     */
    blockquoteHandler(content) {
      return content.replace(/^>\s(.*)/gm, (match, text) => {
        return `\u{1F4DC}\u27A4 ${text}`;
      });
    }
    /**
     * 分隔线处理器，将分隔线转换为带表情符号的格式
    */
    hrHandler(content) {
      return content.replace(/^-{3,}|_{3,}|\*{3,}$/gm, () => {
        return `\u2B50 \u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u2B50 \u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u2B50`;
      });
    }
    /**
     * 无序列表处理器，将无序列表项转换为带表情符号的格式
     */
    unorderedListHandler(content) {
      const taskStatus = {
        " ": "\u2B1C",
        // 待办
        "/": "\u{1F6A7}",
        // 未完成
        "x": "\u2705",
        // 已完成
        "-": "\u274C",
        // 已取消
        ">": "\u2197\uFE0F",
        // 已转发
        "<": "\u{1F4C5}",
        // 日程安排
        "?": "\u2753",
        // 问题
        "!": "\u2757",
        // 重要
        "*": "\u2B50",
        // 星标
        '"': "\u{1F4AC}",
        // 引用
        "l": "\u{1F4CD}",
        // 位置
        "b": "\u{1F516}",
        // 书签
        "i": "\u2139\uFE0F",
        // 信息
        "S": "\u{1F4B0}",
        // 储蓄
        "I": "\u{1F4A1}",
        // 想法
        "p": "\u{1F44D}",
        // 优点
        "c": "\u{1F44E}",
        // 缺点
        "f": "\u{1F525}",
        // 火热
        "k": "\u{1F511}",
        // 关键
        "w": "\u{1F3C6}",
        // 胜利
        "u": "\u{1F4C8}",
        // 上升
        "d": "\u{1F4C9}"
        // 下降
      };
      return content.replace(/^([ \t]*)[-+*] +(.*)/gm, (match, space, text) => {
        let isTask = false;
        text = text.replace(/^\[(.)\]\s+/, (match2, status) => {
          isTask = true;
          return (taskStatus[status] || `\u3010${status}\u3011`) + " ";
        });
        return `${space.length ? "\u{1F539}" : "\u{1F53B}"}${isTask ? "" : " "}${text}`;
      });
    }
    /**
     * 有序列表处理器，将数字编号转换为表情符号数字
     */
    orderedListHandler(content) {
      return content.replace(/^([ \t]*)(\d+)\. (.*)/gm, (match, space, index, text) => {
        const numMarks = ["0\uFE0F\u20E3", "1\uFE0F\u20E3", "2\uFE0F\u20E3", "3\uFE0F\u20E3", "4\uFE0F\u20E3", "5\uFE0F\u20E3", "6\uFE0F\u20E3", "7\uFE0F\u20E3", "8\uFE0F\u20E3", "9\uFE0F\u20E3"];
        const indexMark = index.split("").map((num) => numMarks[parseInt(num)]).join("");
        return `${space}${indexMark} ${text}`;
      });
    }
    /**
     * 行内文本样式处理器，将 Markdown 行内标记转换为带表情符号的格式
     * @param content 需要处理的文本内容
     * @returns 处理后的文本
     */
    spanTextHandler(content) {
      return content.replace(/\*\*(.+?)\*\*/g, "\u3010$1\u3011").replace(/__(.+?)__/g, "\u3010$1\u3011").replace(/\*(.+?)\*/g, "\u300E$1\u300F").replace(/_(.+?)_/g, "\u300E$1\u300F").replace(/~~(.+?)~~/g, "\u274C$1\u274C").replace(/==(.+?)==/g, "\u{1F4A1}$1\u{1F4A1}").replace(/`+(.+?)`+/g, "\u{1F4BB}$1\u{1F4BB}");
    }
    /**
     * 链接处理器，将 Markdown 链接转换为带表情符号的格式
     * @param content 需要处理的文本内容
     * @returns 处理后的文本
     */
    urlHandler(content) {
      return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "\u{1F517}\u3010$1\u3011( $2 )").replace(/\[([^\]]+)\]\[\^?([^\]]+)\]/g, "\u{1F517}\u3010$1\u3011[\u{1F4CD}$2]");
    }
  };
  var EmojiMarkdown = (input) => {
    if (!input)
      return "";
    return new markdownRender(input).render();
  };

  // src/actions/WhiteSpace.ts
  var replacer = (content) => content.replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])|([a-zA-Z0-9])([\u4e00-\u9fa5])/g, "$1$3 $2$4");
  var WhiteSpace = (input) => {
    if (input === "")
      return "";
    return replacer(replacer(input));
  };

  // src/main.ts
  var pkg = require_package();
  var SnippetActions = class {
    /**
     * 初始化代码片段处理类
     * @param input 输入文本，为空时默认为空字符串
     */
    constructor(input) {
      // 可用的处理方法集合
      this.actions = {
        RemoveZeroWidthChars: {
          name: "\u79FB\u9664\u96F6\u5BBD\u5B57\u7B26",
          description: "\u79FB\u9664\u6587\u672C\u4E2D\u7684\u96F6\u5BBD\u5B57\u7B26",
          action: RemoveZeroWidthChars
        },
        CorrectCase: {
          name: "\u4FEE\u6B63\u7279\u5B9A\u8BCD\u6C47\u7684\u5927\u5C0F\u5199",
          description: "\u4FEE\u6B63\u6587\u672C\u4E2D\u7279\u5B9A\u8BCD\u6C47\u7684\u5927\u5C0F\u5199",
          action: CorrectCase
        },
        EmojiMarkdown: {
          name: "Markdown \u6587\u672C\u5316",
          description: "\u5C06 Markdown \u8F6C\u6362\u4E3A\u7528 Emoji \u8FDB\u884C\u6807\u8BB0\u7684\u7EAF\u6587\u672C\u683C\u5F0F",
          action: EmojiMarkdown
        },
        WhiteSpace: {
          name: "\u76D8\u53E4\u4E4B\u767D",
          description: "\u5728\u4E2D\u6587\u548C\u82F1\u6587/\u6570\u5B57\u4E4B\u95F4\u6DFB\u52A0\u7A7A\u683C",
          action: WhiteSpace
        }
      };
      this.workflows = {
        Markdown: {
          name: "Markdown \u6587\u672C\u5316",
          description: "\u5C06 Markdown \u8F6C\u6362\u4E3A\u7528 Emoji \u8FDB\u884C\u6807\u8BB0\u7684\u7EAF\u6587\u672C\u683C\u5F0F",
          actions: ["RemoveZeroWidthChars", "WhiteSpace", "CorrectCase", "EmojiMarkdown"]
        },
        Format: {
          name: "\u683C\u5F0F\u5316",
          description: "\u79FB\u9664\u96F6\u5BBD\u5B57\u7B26\u3001\u5728\u4E2D\u6587\u548C\u82F1\u6587/\u6570\u5B57\u4E4B\u95F4\u6DFB\u52A0\u7A7A\u683C",
          actions: ["RemoveZeroWidthChars", "WhiteSpace", "CorrectCase"]
        }
      };
      // 版本
      this.version = pkg.version;
      this.input = input || "";
    }
    /**
     * 执行单个处理方法
     * @param actionName 处理方法名称
     * @returns 处理后的结果
     */
    runAction(actionName) {
      return this.actions[actionName].action(this.input);
    }
    /**
     * 执行指定的工作流程
     * @param workflowName 工作流名称
     * @returns 按工作流中定义的动作顺序处理后的结果
     */
    runWorkflow(workflowName) {
      return this.chain(this.workflows[workflowName].actions);
    }
    /**
     * 链式调用多个处理方法
     * @param actions 处理方法数组
     * @returns 处理后的结果
     */
    chain(actions) {
      return actions.reduce((result, actionName) => {
        return this.actions[actionName].action(result);
      }, this.input);
    }
    /**
     * 获取所有可用的动作列表
     * @returns 包含所有可用动作信息的对象
     */
    getActions() {
      return Object.entries(this.actions).reduce((acc, [key, value]) => {
        acc[key] = {
          name: value.name,
          description: value.description
        };
        return acc;
      }, {});
    }
    /**
     * 获取所有可用的工作流列表
     * @returns 包含所有可用工作流信息的对象，每个工作流包含 name 和 description 属性
     */
    getWorkflows() {
      return Object.entries(this.workflows).reduce((acc, [key, value]) => {
        acc[key] = {
          name: value.name,
          description: value.description
        };
        return acc;
      }, {});
    }
  };
  return __toCommonJS(main_exports);
})();
//# sourceMappingURL=main.js.map
